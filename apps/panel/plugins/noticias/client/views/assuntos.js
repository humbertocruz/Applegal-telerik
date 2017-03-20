Controller('noticiasAssuntosView',{
	created:function() {
		Meteor.call("setServerAppId", FlowRouter.getParam('aplicativoId'));
		Tracker.autorun(function(){
			Meteor.subscribe("appAssuntos", FlowRouter.getQueryParam('page'), FlowRouter.getParam('aplicativoId'));
		});
	},
	helpers:{
		ready:function(){
			return true;
		},
		assuntos:function(){
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			var qtd = 10;
			var assuntos = Assunto.find({},{sort:{name:1}}).fetch();

			return {
				page:page,
				count:Counts.get('allAssuntos'),
				data:assuntos,
				pages:Math.ceil(Counts.get('allAssuntos')/qtd)
			}
		}
	}
});
