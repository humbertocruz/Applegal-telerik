Controller('talkView',{
	created:function(){
		Tracker.autorun(function(){
			oneChamado = Meteor.subscribe("oneChamado", FlowRouter.getParam('id'),FlowRouter.getParam('aplicativoId'));
		});
	},
	helpers:{
		header:function(){
			return {
				title:'Mensagens do Chamado',
				icon:'comments outline',
				corner:'add'
			}
		},
		extraLinks:function(){
			return [
				{
					title:'Cancelar',
					params:{
						aplicativoId:FlowRouter.getParam('aplicativoId')
					},
					route:'chamadosRoute',
					icon:'close'
				}
			]
		},
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
