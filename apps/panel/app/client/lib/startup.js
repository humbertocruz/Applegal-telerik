// Configura o FlowRouter para esperar até o carregamento da aplicação
FlowRouter.wait();
Meteor.startup(function() {
	// Configura Blaze
	BlazeLayout.setRoot('body');
	// Configura Bart Alert
	Bert.defaults = {
		hideDelay: 3500,
		style: 'growl-top-right',
		type: 'default'
	};
	$.fn.form.settings.rules.cpf = function(value) {
		return TestaCPF(value);
	};
	$.fn.datepicker.language['pt-BR'] = {
    days: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    daysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    daysMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar',
    dateFormat: 'dd/mm/yyyy',
    timeFormat: 'hh:ii',
    firstDay: 0
	};
	Tracker.autorun(function(){
		// subscribe apps pelo dominio acessado
		appByDomainSubs = Meteor.subscribe("appByDomain", location.protocol, location.hostname);
		// subscribe o app quando seu ID estiver na URL
		var appId = FlowRouter.getParam('aplicativoId');
		if (appId) {
			Meteor.subscribe("oneAplicativo", appId,function(err,result){
				if (result){
					appInfoVar.set(result);
				}
			});
		}
	});
});
