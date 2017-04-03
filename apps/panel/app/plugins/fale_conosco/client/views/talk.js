Controller('talkView',{
	created:function(){
		var me = this;
		me.appId = function(){return FlowRouter.getParam('aplicativoId');};
		me.chamadoId = function(){return FlowRouter.getParam('id');};
		me.autorun(function(){
			oneChamado = me.subscribe('oneChamado', me.chamadoId(), me.appId());
		});
	},
	helpers:{
		chamado:function(){
			var chamado = Chamado.findOne({
				_id:FlowRouter.getParam('id'),
				aplicativoId:FlowRouter.getParam('aplicativoId')
			});
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
			Meteor.call("insertMensagem", fields, FlowRouter.getParam('aplicativoId'));
		}
	}
});
