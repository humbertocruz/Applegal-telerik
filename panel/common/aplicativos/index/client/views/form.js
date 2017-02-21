Controller('aplicativosFormView',{
	created:function(){
		UploadProgressVar = new ReactiveVar();
		Tracker.autorun(function(){
			Meteor.subscribe("oneAplicativo", FlowRouter.getParam('aplicativoId'));
		});
	},
	rendered:function(){
		if (id = FlowRouter.getParam('aplicativoId')){
			var aplicativo = Aplicativo.findOne(id);
			$('#aplicativosForm').form('set values',aplicativo);
		} else {
			$('#aplicativosForm').form('set values', {
				headerField: 'blue',
				sidebarField: 'violet',
				itemsPerPageField:10,
				emailField:Meteor.user().emails[0].address
			});
		}
		$('.tabular.menu .item').tab();
		tinymce.remove();
		tinymce.init({
			height:400,
			selector: 'textarea',
			language: 'pt_BR',
			skin_url: '/packages/teamon_tinymce/skins/lightgray',
		});

		// Uploado do Logotipo
		appLogo.resumable.assignBrowse($(".logoBrowse"));
		// Update the upload progress session variable
		appLogo.resumable.on('fileProgress', function(file) {
			UploadProgressVar.set(Math.floor(100*file.progress()));
		});

		// Finish the upload progress in the session variable
		appLogo.resumable.on('fileSuccess', function(file) {
			UploadProgressVar.set(undefined);
		});

		// More robust error handling needed!
		appLogo.resumable.on('fileError', function(file) {
			UploadProgressVar.set(undefined);
		});

		appLogo.resumable.on('fileAdded', function (file) {
			// Verifica se já existe um logo do aplicativo
			var logos = appLogo.find({
				'metadata.aplicativoId':FlowRouter.getParam('aplicativoId')
			}).fetch();
			if (logos) {
				_.each(logos,function(logo){
					appLogo.remove(logo._id);
				});
			}
			UploadProgressVar.set(0);
			// Create a new file in the file collection to upload
			appLogo.insert({
				_id: file.uniqueIdentifier,  // This is the ID resumable will use
				filename: file.fileName,
				contentType: file.file.type,
				metadata:{
					aplicativoId: FlowRouter.getParam('aplicativoId')
				}
			}, function (err, _id) {  // Callback to .insert
				if (err) { return console.error("File creation failed!", err); }
				// Once the file exists on the server, start uploading
				appLogo.resumable.upload();
			});
		});
		Deps.autorun(function () {
			// Sending userId prevents a race condition
			Meteor.subscribe('appLogo', FlowRouter.getParam('aplicativoId'));
			// $.cookie() assumes use of "jquery-cookie" Atmosphere package.
			// You can use any other cookie package you may prefer...
			$.cookie('X-Auth-Token', Accounts._storedLoginToken(), { path: '/' });
		});
	},
	helpers:{
		aplicativoId:function(){
			return FlowRouter.getParam('aplicativoId');
		},
		header:function(){
			return {
				title:(FlowRouter.getParam('aplicativoId')==undefined?'Criar Aplicativo':'Editar Aplicativo'),
				icon:'android',
				corner:'add'
			}
		},
		semanticColors:function(){
			return _.sortBy(semanticColors,'title');
		},
		saveLink:function(){
			return {
				title:'Salvar',
				icon:'save',
				form:'aplicativosForm'
			}
		},
		extraLinks:function(){
			return [
				{
					title:'Cancelar',
					route:'aplicativosRoute',
					icon:'close'
				}
			]
		},
		logoLink:function(){
			var md5 = Aplicativo.findOne(FlowRouter.getParam('aplicativoId')).appLogo();
			if (!md5) return false;
			if (md5.md5 != 'd41d8cd98f00b204e9800998ecf8427e') {
				return appLogo.baseURL + '/md5/' + md5.md5;
			} else {
				return false;
			}
		}
	},
	events:{
		'click .logoNotBrowse'(e,t){
			Bert.alert('Você precisa salvar o App para poder alterar seu Logotipo.','info');
		},
		'submit #aplicativosForm'(e,t){
			e.preventDefault();
			var fields = $(e.target).form('get values');
			var id = FlowRouter.getParam('aplicativoId');
			if (id) fields._id = id;
			Meteor.call("aplicativosForm",fields, function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					Bert.alert('O aplicativo foi salvo com sucesso!','success');
					FlowRouter.go('aplicativosUpdateRoute',{aplicativoId:result});
				}
			});
		}
	}
});
