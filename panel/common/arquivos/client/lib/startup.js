Meteor.startup(function(){
	arquivoUploadProgressVar = new ReactiveVar();
	Arquivo.resumable.on('fileProgress', function(file) {
		var progress = Math.floor(100*file.progress());
		arquivoUploadProgressVar.set(progress);
	});
	Arquivo.resumable.on('complete', function(file) {
		//$('#uploadProgressModal').modal('hide');
		arquivoUploadProgressVar.set(undefined);
	});
	Arquivo.resumable.on('fileError', function(file) {
		Bert.alert('Houve um erro ao enviar o arquivo.','danger');
		arquivoUploadProgressVar.set(undefined);
	});
	Deps.autorun(function () {
		$.cookie('X-Auth-Token', Accounts._storedLoginToken(), { path: '/' });
	});
});
