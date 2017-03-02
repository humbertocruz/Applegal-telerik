Controller('formNoticiasView',{
	created:function(){
		Tracker.autorun(function(){
			Meteor.subscribe("oneNoticia", FlowRouter.getQueryParam('noticiaId'));
			Meteor.subscribe("allAssuntos");
		});
	},
	rendered:function(){
		$('#noticiasForm .ui.dropdown').dropdown();
		if (id = FlowRouter.getParam('noticiaId')) {
			var noticia = Noticia.findOne(id);
			$('#noticiasForm').form('set values',noticia);
			$('#dateField').val(moment(noticia.date).format('YYYY-MM-DD'));
		} else {
			$('#dateField').val(moment().format('YYYY-MM-DD'));
		}

		tinymce.remove();
		tinymce.init({
			selector: 'textarea',
			language: 'pt_BR',
			skin_url: '/packages/teamon_tinymce/skins/lightgray',
		});

		// Upload do Logotipo
		Arquivo.resumable.assignBrowse($("#imagemBrowse"));
		// Excutar ao fim do envio do arquivo
		Arquivo.resumable.on('fileSuccess', function(file) {
			Bert.alert('Foto enviada com sucesso.','success');
			arquivoUploadProgressVar.set(undefined);
			Meteor.call("noticiasUploadFoto", file.file.uniqueIdentifier, FlowRouter.getParam('aplicativoId'), FlowRouter.getParam('noticiaId'));
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
					type: 'noticias',
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
		semanticColors:function(){
			return _.sortBy(semanticColors,'title');
		},
		noticia:function(){
			return Noticia.findOne(FlowRouter.getParam('noticiaId'));
		},
		assuntos:function(){
			return Assunto.find({},{sort:{name:1}}).fetch();
		},
		header:function(){
			return {
				title:(FlowRouter.getParam('noticiaId')==undefined?'Inserir Notícia':'Editar Notícia'),
				icon:'newspaper',
				corner:'add'
			}
		},
		saveLink:function(){
			return {
				title:'Salvar',
				icon:'save',
				form:'noticiasForm'
			}
		},
		extraLinks:function(){
			return [
				{
					title:'Cancelar',
					route:'noticiasRoute',
					params: {
						aplicativoId: FlowRouter.getParam('aplicativoId')
					},
					icon:'close'
				},
				{
					title:'Assuntos',
					params: {
						aplicativoId: FlowRouter.getParam('aplicativoId')
					},
					route:'noticiasAssuntosRoute',
					icon:'sidebar'
				}
			]
		}
	},
	events:{
		'submit #noticiasForm'(e,t){
			e.preventDefault();
			var fields = $(e.target).form('get values');
			var id = FlowRouter.getParam('noticiaId');
			if (id) fields._id = id;
			Meteor.call("noticiasForm",fields, FlowRouter.getParam('aplicativoId'), function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					 Bert.alert('A notícia foi salva com sucesso!','success');
					 FlowRouter.go('noticiasRoute',{aplicativoId:FlowRouter.getParam('aplicativoId')})
				}
			});
		}
	}
});
