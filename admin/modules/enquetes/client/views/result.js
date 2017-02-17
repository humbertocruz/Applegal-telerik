Controller('enquetesResultView',{
	created:function(){
		Tracker.autorun(function(){
			oneEnquete = Meteor.subscribe('oneEnquete', FlowRouter.getParam('id'), aplicativoVar.get()._id);
		});
	},
	rendered:function(){
		Tracker.autorun(function(){
			if (!oneEnquete.ready()) return false;
			var users = EnqueteResposta.find().fetch();
			var usersRespostas = {};
			_.each(users,function(user){
				_.each(user.respostas,function(resp,idx){
					if (usersRespostas[idx+'_opc_'+resp] == undefined) {
						usersRespostas[idx+'_opc_'+resp] = 1;
					} else {
						usersRespostas[idx+'_opc_'+resp]++;
					}
				});
			});
			Meteor.setTimeout(function(){
				_.each(usersRespostas,function(val,idx){
					var graph = {
						duration	: 200,
						total			: users.length,
						value			: val
					};
					$('#'+idx).progress(graph);
				});
			}, 1000);
		});
	},
	events:{
	},
	helpers:{
		header:function(){
			return {
				title:'Resultados',
				icon:'wizard',
				corner:'browser'
			}
		},
		extraLinks:function(){
			return [
				{
					title:'Voltar',
					route:'enquetesRoute',
					icon:'close'
				}
			]
		},
		perguntas:function(){
			if (!oneEnquete.ready()) return false;
			return Enquete.findOne(FlowRouter.getParam('id')).perguntas;
		}
	}
})
