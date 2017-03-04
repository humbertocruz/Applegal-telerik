Controller('enquetesResponderView',{
	created:function(){
		topTitleVar.set('Enquete');
	},
	rendered:function(){

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
