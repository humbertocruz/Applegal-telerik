Meteor.startup(function(){
	arquivoUploadProgressVar = new ReactiveVar();
	Arquivo.resumable.on('fileProgress', function(file) {
		var progress = Math.floor(100*file.progress());
		arquivoUploadProgressVar.set(progress);
	});
	Arquivo.resumable.on('fileSuccess', function(file) {
		Bert.alert('Arquivo do Logotipo enviado com sucesso.','success');
		arquivoUploadProgressVar.set(undefined);
	});
	Arquivo.resumable.on('fileError', function(file) {
		arquivoUploadProgressVar.set(undefined);
	});
	Deps.autorun(function () {
		// Sending userId prevents a race condition
		Meteor.subscribe('Arquivo', FlowRouter.getParam('aplicativoId'));
		// $.cookie() assumes use of "jquery-cookie" Atmosphere package.
		// You can use any other cookie package you may prefer...
		$.cookie('X-Auth-Token', Accounts._storedLoginToken(), { path: '/' });
	});
});
