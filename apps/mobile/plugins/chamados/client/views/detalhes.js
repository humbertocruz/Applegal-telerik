Controller('mensagensView',{
	created:function(){
		backBtnRouteVar.set({
			route:'chamadosRoute',
			params:{}
		});
		Tracker.autorun(function(){
			var app = Aplicativo.findOne();
			if (!app) return false;
			Meteor.subscribe("appChamados", app._id);
		});
	},
	helpers:{
		chamado:function(){
			var chamado = Chamado.findOne(FlowRouter.getParam('id'));
			return chamado;
		}
	},
	events:{
		'click #sendRespostaBtn':function(e,t){
			e.preventDefault();
			var resposta = $('#respostaField').val();
			var fields = {
				user_id:Meteor.userId(),
				mensagem:resposta,
				date:moment().toDate(),
				chamado_id:FlowRouter.getParam('id')
			};
			$('#respostaField').val('');
			Meteor.call("insertMensagem", fields);
		}
	}
});
