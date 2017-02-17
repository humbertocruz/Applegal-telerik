Controller('talkView',{
	created:function(){
		oneChamado = Meteor.subscribe("oneChamado", FlowRouter.getParam('id',aplicativoVar.get()._id));
	},
	helpers:{
		header:function(){
			return {
				title:(FlowRouter.getParam('id')==undefined?'Mensagens do Chamado':'Mensagens do Chamado'),
				icon:'comments outline',
				corner:'add'
			}
		},
		extraLinks:function(){
			return [
				{
					title:'Cancelar',
					route:'chamadosRoute',
					icon:'close'
				}
			]
		},
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
			Meteor.call("insertMensagem", fields, aplicativoVar.get()._id);
		}
	}
});
