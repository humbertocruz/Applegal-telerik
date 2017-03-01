Controller('aplicativosFormView',{
	created:function(){
		logoUploadProgressVar = new ReactiveVar();
		arquivosPageVar = new ReactiveVar(1);
		bgUploadProgressVar = new ReactiveVar();
		bgSelectedVar = new ReactiveVar(false);
		Tracker.autorun(function(){
			var page = arquivosPageVar.get();
			Meteor.subscribe("appArquivos", page);
		});
	},
	rendered:function(){
		var loadApp = function(aplicativo){
			$('#aplicativosForm').form('set values',aplicativo);
			if (aplicativo.bgImage) {
				bgSelectedVar.set(aplicativo.bgImage);
			}
		};
		Tracker.autorun(function(){
			var aplicativo = Aplicativo.findOne(FlowRouter.getParam('aplicativoId'));
			if (aplicativo) {
				loadApp(aplicativo);
			} else {
				$('#aplicativosForm').form('set values', {
					headerField: 'blue',
					sidebarField: 'violet',
					itemsPerPageField:10,
					emailField:Meteor.user().emails[0].address
				});
			}
		});
		$('.tabular.menu .item').tab();

		tinymce.remove();
		tinymce.init({
			height:400,
			selector: 'textarea',
			language: 'pt_BR',
			skin_url: '/packages/teamon_tinymce/skins/lightgray',
		});

		// Upload do Logotipo
		appLogo.resumable.assignBrowse($(".logoBrowse"));
		appBg.resumable.assignBrowse($(".bgBrowse"));

		// Update the upload progress session variable
		appLogo.resumable.on('fileProgress', function(file) {
			var progress = Math.floor(100*file.progress());
			logoUploadProgressVar.set(progress);
		});
		appBg.resumable.on('fileProgress', function(file) {
			bgUploadProgressVar.set(Math.floor(100*file.progress()));
		});

		// Finish the upload progress in the session variable
		appLogo.resumable.on('fileSuccess', function(file) {
			Bert.alert('Arquivo do Logotipo enviado com sucesso.','success');
			logoUploadProgressVar.set(undefined);
		});
		appBg.resumable.on('fileSuccess', function(file) {
			bgUploadProgressVar.set(undefined);
		});

		// More robust error handling needed!
		appLogo.resumable.on('fileError', function(file) {
			logoUploadProgressVar.set(undefined);
		});
		appBg.resumable.on('fileError', function(file) {
			bgUploadProgressVar.set(undefined);
		});

		appLogo.resumable.on('fileAdded', function (file) {
			if (!_.contains(['image/png','image/jpeg'],file.file.type)){
				Bert.alert('Só são permitidos arquivos PNG ou JPG!','warning');
				return false;
			}
			// Verifica se já existe um logo do aplicativo
			var logos = appLogo.find({
				'metadata.aplicativoId':FlowRouter.getParam('aplicativoId')
			}).fetch();
			if (logos) {
				_.each(logos,function(logo){
					appLogo.remove(logo._id);
				});
			}
			logoUploadProgressVar.set(0);
			// Create a new file in the file collection to upload
			appLogo.insert({
				_id: file.uniqueIdentifier,  // This is the ID resumable will use
				filename: file.fileName,
				contentType: file.file.type,
				metadata:{
					aplicativoId: FlowRouter.getParam('aplicativoId')
				}
			}, function (err, _id) {  // Callback to .insert
				if (err) { return console.error("Erro ao enviar o arquivo!", err); }
				// Once the file exists on the server, start uploading
				appLogo.resumable.upload();
			});
		});

		appBg.resumable.on('fileAdded', function (file) {
			// Verifica se já existe um logo do aplicativo
			var bgs = appBg.find({
				'metadata.aplicativoId':FlowRouter.getParam('aplicativoId')
			}).fetch();
			if (bgs) {
				_.each(bgs,function(bg){
					appBg.remove(bg._id);
				});
			}
			bgUploadProgressVar.set(0);
			// Create a new file in the file collection to upload
			appBg.insert({
				_id: file.uniqueIdentifier,  // This is the ID resumable will use
				filename: file.fileName,
				contentType: file.file.type,
				metadata:{
					aplicativoId: FlowRouter.getParam('aplicativoId')
				}
			}, function (err, _id) {  // Callback to .insert
				if (err) { return console.error("File creation failed!", err); }
				// Once the file exists on the server, start uploading
				appBg.resumable.upload();
			});
		});

		Deps.autorun(function () {
			// Sending userId prevents a race condition
			Meteor.subscribe('appLogo', FlowRouter.getParam('aplicativoId'));
			Meteor.subscribe('appBg', FlowRouter.getParam('aplicativoId'));
			// $.cookie() assumes use of "jquery-cookie" Atmosphere package.
			// You can use any other cookie package you may prefer...
			$.cookie('X-Auth-Token', Accounts._storedLoginToken(), { path: '/' });
		});
	},
	helpers:{
		aplicativoId:function(){
			return FlowRouter.getParam('aplicativoId');
		},
		isBgSelected:function(){
			if (this._id != bgSelectedVar.get()) return '';
			else return 'disabled';
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
		logoLink:function(){
			var md5 = Aplicativo.findOne(FlowRouter.getParam('aplicativoId'));
			if (!md5) return false;
			if (!md5.appLogo()) return false;
			md5 = md5.appLogo().md5;
			if (md5 != 'd41d8cd98f00b204e9800998ecf8427e') {
				return appLogo.baseURL + '/md5/' + md5;
			} else {
				return false;
			}
		},
		bgLink:function(){
			var md5 = Aplicativo.findOne(FlowRouter.getParam('aplicativoId'));
			if (!md5) return false;
			if (!md5.appBg()) return false;
			md5 = md5.appBg().md5;
			if (md5 != 'd41d8cd98f00b204e9800998ecf8427e') {
				return appBg.baseURL + '/md5/' + md5;
			} else {
				return false;
			}
		},
		logoUploadProgress:function(){
			return logoUploadProgressVar.get();
		},
		bgUploadProgress:function(){
			return bgUploadProgressVar.get();
		},
		wallpapers:function(){
			var wallpapers = Arquivo.find({
				'metadata.tipoArquivo':'wallpaper'
			}).fetch();
			return {
				data:wallpapers
			}
		},
		arquivoPath:function(){
			return '/gridfs/arquivos/md5/'+this.md5;
		}
	},
	events:{
		'click .logoNotBrowse':function(e,t){
			Bert.alert('Você precisa salvar o App para poder alterar seu Logotipo.','info');
		},
		'click .bgNotBrowse':function(e,t){
			Bert.alert('Você precisa salvar o App para poder alterar seu Wallpaper.','info');
		},
		'click #bgUpEvent':function(e,t){
			var max = Math.ceil(Counts.get('allArquivos')/5);
			if (arquivosPageVar.get() == max) return false;
			var num = arquivosPageVar.get()+1;
			arquivosPageVar.set(num);
		},
		'click #bgDownEvent':function(e,t){
			if (arquivosPageVar.get() == 1) return false;
			var num = arquivosPageVar.get()-1;
			arquivosPageVar.set(num);
		},
		'click .bgSelectEvent':function(e,t){
			bgSelectedVar.set(this._id);
		},
		'submit #aplicativosForm':function(e,t){
			e.preventDefault();
			isLoadingVar.set('Salvando Aplicativo!');
			var fields = $(e.target).form('get values');
			var id = FlowRouter.getParam('aplicativoId');
			fields.bgImage = bgSelectedVar.get();
			if (id) fields._id = id;
			Meteor.call("aplicativosForm",fields, function(error, result){
				if(error){
					console.log("error", error);
					isLoadingVar.set(false);
				}
				if(result){
					isLoadingVar.set(false);
					Bert.alert('O aplicativo foi salvo com sucesso!','success');
					FlowRouter.go('aplicativosUpdateRoute',{aplicativoId:result});
				}
			});
		}
	}
});
