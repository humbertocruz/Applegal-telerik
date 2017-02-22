Controller('noticiasAssuntosView',{
	created:function() {
		sint = 0;
		assuntosSearchVar = new ReactiveVar({});
		Tracker.autorun(function(){
			Meteor.subscribe("appAssuntos", assuntosSearchVar.get(), FlowRouter.getQueryParam('page'), FlowRouter.getParam('aplicativoId')); 
		});
	},
	helpers:{
		ready:function(){
			return true;
		},
		header:function(){
			return {
				title:'Assuntos',
				icon:'sidebar'
			}
		},
		newLink:function(){
			return false;
		},
		extraLinks:function(){
			return [
				{
					title:'Voltar',
					route:'noticiasRoute',
					icon:'close'
				},
				{
					title:'Adicionar',
					route:'noticiasAssuntosInsertRoute',
					icon:'add'
				}
			]
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
