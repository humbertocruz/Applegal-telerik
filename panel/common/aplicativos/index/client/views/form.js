Controller('aplicativosFormView',{
	created:function(){
		arquivosPageVar = new ReactiveVar(1);
		uploadType = new ReactiveVar(); // logo ou wallpaper
		bgSelectedVar = new ReactiveVar(false);
		Tracker.autorun(function(){
			var page = arquivosPageVar.get();
			allWallpapers = Meteor.subscribe("allWallpapers", page);
		});
	},
	rendered:function(){
		var loadApp = function(aplicativo){
			$('#aplicativosForm').form('set values',aplicativo);
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
		Arquivo.resumable.assignBrowse($("#logoBrowse"));
		//Arquivo.resumable.assignBrowse($('#wallpaperBrowse'));

		// Excutar ao fim do envio do arquivo
		Arquivo.resumable.on('fileSuccess', function(file) {
			Bert.alert('Arquivo enviado com sucesso.','success');
			arquivoUploadProgressVar.set(undefined);
			if (uploadType.get() == 'logotype') {
				Meteor.call("aplicativosUploadLogo", file.file.uniqueIdentifier, FlowRouter.getParam('aplicativoId'),function(err,result){
				});
			}
		});

		Arquivo.resumable.on('fileAdded', function (file) {
			if (!_.contains(['image/png','image/jpeg'],file.file.type)){
				Bert.alert('Só são permitidos arquivos PNG ou JPG!','warning');
				return false;
			}
			arquivoUploadProgressVar.set(0);
			// Se já estiver enviando, cancela.
			if (Arquivo.resumable.isUploading()) return false;
			// Create a new file in the file collection to upload
			Arquivo.insert({
				_id: file.uniqueIdentifier,  // This is the ID resumable will use
				filename: file.fileName,
				contentType: file.file.type,
				metadata:{
					type: uploadType.get(),
					aplicativoId: FlowRouter.getParam('aplicativoId')
				}
			}, function (err, _id) {  // Callback to .insert
				if (err) { return console.error("Erro ao enviar o arquivo!", err); }
				// Once the file exists on the server, start uploading
				Arquivo.resumable.upload();
			});
		});
	},
	helpers:{
		ready:function(){
			return allWallpapers.ready();
		},
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
		wallpapers:function(){
			var wallpapers = Arquivo.find({
				'metadata.type':'wallpaper'
			});
			return {
				page:FlowRouter.getQueryParam('page'),
				count:Counts.get('allWallpapers'),
				data:wallpapers.fetch(),
				pages: 10
			}
		}
	},
	events:{
		'click #logoBrowse':function(e,t){
			uploadType.set('logotype');
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
			fields.appBg = bgSelectedVar.get();
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
