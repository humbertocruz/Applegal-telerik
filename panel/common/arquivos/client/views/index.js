Controller('arquivosView',{
	created:function() {
		arquivosSearchVar = new ReactiveVar({});
		arquivosPageVar = new ReactiveVar(1);
		Tracker.autorun(function(){
			allWallpapers = Meteor.subscribe("allWallpapers", FlowRouter.getQueryParam('page'));
		});
	},
	rendered:function(){
		Arquivo.resumable.assignBrowse($("#arquivoBrowse"));
		// Excutar ao fim do envio do arquivo
		Arquivo.resumable.on('fileSuccess', function(file) {
			Bert.alert('Arquivo enviado com sucesso.','success');
			arquivoUploadProgressVar.set(undefined);
		});
		Arquivo.resumable.on('fileAdded', function (file) {
			if (!_.contains(['image/png','image/jpeg'],file.file.type)){
				Bert.alert('Só são permitidos arquivos PNG ou JPG!','warning');
				return false;
			}
			console.log('show modal');
			$('#uploadProgressModal').modal('show');
			arquivoUploadProgressVar.set(0);
			// Create a new file in the file collection to upload

			Arquivo.insert({
				_id: file.uniqueIdentifier,  // This is the ID resumable will use
				filename: file.fileName,
				contentType: file.file.type,
				metadata:{
					aplicativoId: false,
					public: true,
					type:'wallpaper'
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
			return true;
		},
		header:function(){
			return {
				title:'Arquivos',
				icon:'file'
			}
		},
		newLink:function(){
			return false;
		},
		extraLinks:function(){
			return [
				{
					title:'Tipos',
					//route:'arquivosTiposRoute',
					icon:'sidebar'
				}
			]
		},
		ready: function(){
			return allWallpapers.ready();
		},
		arquivos:function(){
			var qtd = 10;
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			var arquivos = Arquivo.find();
			return {
				page:page,
				count:Counts.get('allWallpapers'),
				data:arquivos.fetch(),
				pages:Math.ceil(Counts.get('allWallpapers')/qtd)
			}
		},
		arquivoPath:function(){
			return '/gridfs/arquivos/md5/'+this.md5;
		}
	},
	events:{
		'click .arquivoRemoveEvent':function(e,t){
			var me = this;
			htmlConfirm('Aviso','Você tem certeza?',function(){
				Arquivo.remove(me._id,function(error, result){
					if(error){
						console.log("error", error);
					}
					if(result){
						Bert.alert('Arquivo excluído com sucesso','success');
					}
				});
			});
		}
	}
});
