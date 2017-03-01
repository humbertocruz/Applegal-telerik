Controller('arquivosView',{
	created:function() {
		sint = 0;
		arquivosSearchVar = new ReactiveVar({});
		arquivoUploadProgressVar = new ReactiveVar();
		Tracker.autorun(function(){
			var page = FlowRouter.getQueryParam('page');
			var search = arquivosSearchVar.get();
			console.log(page);
			//Meteor.subscribe("allArquivos", search, page);
		});
	},
	rendered:function(){
		Arquivo.resumable.assignBrowse($("#arquivoBrowse"));
		Arquivo.resumable.on('fileProgress', function(file) {
			var progress = Math.floor(100*file.progress());
			arquivoUploadProgressVar.set(progress);
		});
		Arquivo.resumable.on('fileSuccess', function(file) {
			Bert.alert('Arquivo enviado com sucesso.','success');
			arquivoUploadProgressVar.set(undefined);
		});
		Arquivo.resumable.on('fileError', function(file) {
			Bert.alert('Houve um erro na transferência de arquivo.','danger');
			arquivoUploadProgressVar.set(undefined);
		});
		Arquivo.resumable.on('fileAdded', function (file) {
			if (!_.contains(['image/png','image/jpeg'],file.file.type)){
				Bert.alert('Só são permitidos arquivos PNG ou JPG!','warning');
				return false;
			}
			arquivoUploadProgressVar.set(0);
			// Create a new file in the file collection to upload
			Arquivo.insert({
				_id: file.uniqueIdentifier,  // This is the ID resumable will use
				filename: file.fileName,
				contentType: file.file.type,
				metadata:{
					aplicativoId: false,
					public: true,
					tipoArquivo:'wallpaper'
				}
			}, function (err, _id) {  // Callback to .insert
				if (err) { return console.error("Erro ao enviar o arquivo!", err); }
				// Once the file exists on the server, start uploading
				Arquivo.resumable.upload();
			});
		});
		Deps.autorun(function () {
			// Sending userId prevents a race condition
			Meteor.subscribe('appArquivos', arquivosSearchVar.get(), FlowRouter.getQueryParam('page'));
			// $.cookie() assumes use of "jquery-cookie" Atmosphere package.
			// You can use any other cookie package you may prefer...
			$.cookie('X-Auth-Token', Accounts._storedLoginToken(), { path: '/' });
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
		arquivos:function(){
			var qtd = 10;
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			var arquivos = Arquivo.find({
				limit:qtd,
				skip: (page - 1) * qtd
			}).fetch();

			var page = FlowRouter.getQueryParam('page');
			return {
				page:page,
				count:Counts.get('allArquivos'),
				data:arquivos,
				pages:Math.ceil(Counts.get('allArquivos')/qtd)
			}
		},
		arquivoPath:function(){
			return '/gridfs/arquivos/md5/'+this.md5;
		}
	},
	events:{
		'click .removeBtn':function(e,t){
			var me = this;
			htmlConfirm('Aviso','Você tem certeza?',function(){
				Meteor.call("arquivosRemove", me._id, function(error, result){
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
