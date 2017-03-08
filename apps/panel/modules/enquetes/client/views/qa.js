Controller('enquetesQAView',{
	created:function(){
		Meteor.call("setServerAppId", FlowRouter.getParam('aplicativoId'));
		perguntaAtualVar = new ReactiveVar('none');
		Tracker.autorun(function(){
			oneEnquete = Meteor.subscribe('oneEnquete', FlowRouter.getParam('id'), FlowRouter.getParam('aplicativoId'));
			enqueteVar = new ReactiveVar(Enquete.findOne(
				{
				_id:FlowRouter.getParam('id'),
				aplicativoId:FlowRouter.getParam('aplicativoId')
				}
			));
		});
	},
	rendered:function(){

	},
	events:{
		'click #enquetesRemoveOpcaoEvent':function(e,t){
			var me = this;
			htmlConfirm('Aviso','Você tem certeza?',function(){
				Meteor.call("enquetesRemoveOpcao", FlowRouter.getParam('id'), perguntaAtualVar.get(), me.order, FlowRouter.getParam('aplicativoId'), function(error, result){
					if(error){
						console.log("error", error);
					}
					if(result){
						 Bert.alert('Opção excluída com sucesso.','success');
					}
				});
			});
		},
		'click #enquetesSelecionaPerguntaEvent':function(e,t){
			var me = this;
			perguntaAtualVar.set(me.order);
		},
		'click #enquetesRemovePerguntaEvent':function(e,t){
			var me = this;
			htmlConfirm('Aviso','Você tem certeza?',function(){
				Meteor.call("enquetesRemovePergunta", FlowRouter.getParam('id'), me.order, FlowRouter.getParam('aplicativoId'), function(error, result){
					if(error){
						console.log("error", error);
					}
					if(result){
						 Bert.alert('Pergunta excluída com sucesso.','success');
					}
				});
			});
		},
		'submit #enqueteFormPergunta':function(e,t){
			e.preventDefault();
			var fields = $(e.currentTarget).form('get values');
			var perguntas = enqueteVar.get().perguntas;
			var pergunta = {
				order:perguntas.length,
				title:fields.pergunta,
				opcoes:[]
			};
			perguntas.push(pergunta);
			Meteor.call("enquentesUpdatePerguntas", FlowRouter.getParam('id'), perguntas, FlowRouter.getParam('aplicativoId'), function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					Bert.alert('Pergunta inserida com sucesso!','success');
					$(e.currentTarget).form('clear');
				}
			});
		},
		'submit #enqueteFormOpcao':function(e,t){
			e.preventDefault();
			var ordem = perguntaAtualVar.get();
			var fields = $(e.currentTarget).form('get values');
			var perguntas = enqueteVar.get().perguntas;
			var opcoes = enqueteVar.get().perguntas[ordem].opcoes;
			var opcao = {
				order:opcoes.length,
				title:fields.opcao
			};
			opcoes.push(opcao);
			Meteor.call("enquentesUpdateOpcoes", FlowRouter.getParam('id'), ordem, perguntas, opcoes, FlowRouter.getParam('aplicativoId'), function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					Bert.alert('Opção inserida com sucesso!','success');
					$(e.currentTarget).form('clear');
				}
			});
		}
	},
	helpers:{
		header:function(){
			return {
				title:'Perguntas e Respostas',
				icon:'wizard',
				corner:'question'
			}
		},
		saveLink:function(){
			return {
				title:'Salvar',
				icon:'save',
				form:'enquetesForm'
			}
		},
		extraLinks:function(){
			return [
				{
					title:'Cancelar',
					route:'enquetesRoute',
					icon:'left chevron',
					params:{
						aplicativoId:FlowRouter.getParam('aplicativoId')
					}
				}
			]
		},
		perguntaAtual:function(){
			return perguntaAtualVar.get();
		},
		perguntas:function(){
			if (!oneEnquete.ready()) return false;
			return Enquete.findOne(FlowRouter.getParam('id')).perguntas;
		}
	}
})
