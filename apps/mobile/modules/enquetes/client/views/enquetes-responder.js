Controller('enquetesResponderView',{
	created:function(){
		topTitleVar.set('Enquete');
		backBtnRouteVar.set({
			route:'enquetesRoute',
			params:{}
		});
	},
	rendered:function(){
		$('#salvaRespostasForm').form({
			onFailure:function(){
				console.log('fail');
				return false;
			},
			fields:{
				indentifier:'options',
				rules:[
					{
						type:'checked',
						prompt:'Você deve preencher todas as opções.'
					}
				]
			}
		});
	},
	helpers:{
		enquete:function(){
			var enquete = Enquete.findOne(FlowRouter.getParam('id'));
			return enquete;
		}
	},
	events:{
		'submit #salvaRespostasForm':function(e,t){
			e.preventDefault();
			var fields = $(e.currentTarget).form('get values');
			var respostas = {
				enquete_id:FlowRouter.getParam('id'),
				aplicativoId:aplicativoIdVar.get(),
				respostas:fields
			}
			Meteor.call("enquetesResponder", respostas, function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					Bert.alert('Suas respostas foram salvas com sucesso.','success');
					FlowRouter.go('enquetesRoute')
				}
			});
		}
	}
});
