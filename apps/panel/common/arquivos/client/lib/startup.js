Meteor.startup(function(){
	arquivoUploadProgressVar = new ReactiveVar();
	arquivoUploadProgressIdVar = new ReactiveVar();
	arquivoUploadFilesAllowedVar = new ReactiveVar(['image/png','image/jpeg']);
	arquivoUploadFilesAllowedErrorVar = new ReactiveVar('Só são permitidos arquivos PNG ou JPG!','warning');
	arquivoUploadMetadataVar = new ReactiveVar({
		type: 'photo',
		aplicativoId: FlowRouter.getParam('aplicativoId'),
		galeriaId: FlowRouter.getParam('galeriaId')
	});

	if (!_.contains(Arquivo.resumable.events,'fileSuccess')) {
		Arquivo.resumable.on('fileSuccess', function(file) {
			Bert.alert('Arquivo enviado com sucesso.','success');
			arquivoUploadProgressVar.set(undefined);
		});
	}

	if (!_.contains(Arquivo.resumable.events,'fileprogress')) {
		Arquivo.resumable.on('fileProgress', function(file) {
			var progress = Math.floor(100*file.progress());
			arquivoUploadProgressVar.set(progress);
		});
	}
	if (!_.contains(Arquivo.resumable.events,'complete')) {
		Arquivo.resumable.on('complete', function(file) {
			arquivoUploadProgressVar.set(undefined);
		});
	}
	if (!_.contains(Arquivo.resumable.events,'fileerror')) {
		Arquivo.resumable.on('fileError', function(file) {
			Bert.alert('Houve um erro ao enviar o arquivo.','danger');
			arquivoUploadProgressVar.set(undefined);
		});
	}
	//if (!_.contains(Arquivo.resumable.events,'fileadded')) {
		// Arquivo Adicionado
		Arquivo.resumable.on('fileAdded', function (file) {
			if (!_.contains(arquivoUploadFilesAllowedVar.get(),file.file.type)){
				Bert.alert(arquivoUploadFilesAllowedErrorVar.get());
				return false;
			}
			arquivoUploadProgressVar.set(0);
			// Create a new file in the file collection to upload
			console.log(arquivoUploadMetadataVar.get());
			Arquivo.insert({
				_id: file.uniqueIdentifier,  // This is the ID resumable will use
				filename: file.fileName,
				contentType: file.file.type,
				metadata:arquivoUploadMetadataVar.get()
			}, function (err, _id) {  // Callback to .insert
				if (err) { return console.error("Erro ao enviar o arquivo!", err); }
				// Once the file exists on the server, start uploading
				Arquivo.resumable.upload();
			});
		});
	//}
	Deps.autorun(function () {
		$.cookie('X-Auth-Token', Accounts._storedLoginToken(), { path: '/' });
	});
});
