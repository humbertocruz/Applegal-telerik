Controller('noticiasView', {
	created:function() {
		sint = 0;
		noticiasSearchVar = new ReactiveVar({});
		Tracker.autorun(function(){
			var appId = FlowRouter.getParam('aplicativoId');
			Meteor.subscribe("appNoticias", noticiasSearchVar.get(), FlowRouter.getQueryParam('page'), appId);
		});
	},
	rendered:function(){
	},
	destroyed:function() {
	},
	helpers: {
		ready:function(){
			return true;
		},
		header:function(){
			return {
				title:'Notícias',
				icon:'newspaper'
			}
		},
		newLink:function(){
			return {}
		},
		extraLinks:function(){
			return [
				{
					title:'Assuntos',
					route:'noticiasAssuntosRoute',
					icon:'sidebar',
					params:{
						aplicativoId:FlowRouter.getParam('aplicativoId')
					}
				},
				{
					title:'Adicionar',
					route:'noticiasInsertRoute',
					icon:'add',
					params:{
						aplicativoId:FlowRouter.getParam('aplicativoId')
					}
				}
			]
		},
		searchFields:function(){
			return noticiasSearchVar.get();
		},
		noticias: function() {
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			var qtd = 10;
			var noticias = Noticia.find(noticiasSearchVar.get(),{sort:{date:-1},limit:qtd,skip:(page-1)*qtd}).fetch();

			$('.ui.progress').progress({
				duration	: 200,
				total			: Math.ceil(Counts.get('allNoticias')/qtd),
				value			: page
			});
			return {
				page: FlowRouter.getQueryParam('page'),
				data: noticias,
				count: Counts.get('allNoticias'),
				pages: Math.ceil(Counts.get('allNoticias')/qtd)
			};
		}
	},
	events: {
		'click #addBtn':function(e,t){
			FlowRouter.go('noticiasInsertRoute');
		},
		'click #activateEvent':function(e,t){
			Meteor.call("noticiasActivate", $(e.currentTarget).data('id'), FlowRouter.getParam('aplicativoId'), function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					Bert.alert('Notícia Ativada com sucesso.','success');
					var noticia = Noticia.findOne($(e.currentTarget).data('id'));
					pushObj = {
						id: $(e.currentTarget).data('id'),
						from:'gremio',
						title:'Nova notícia do Grêmio.',
						text:noticia.title
					};
					Meteor.setTimeout(function(){
						Meteor.call("pushSend", pushObj, function(error, result){
							if(error){
								console.log("error", error);
							}
							if(result){
								Bert.alert('Mensagens "Push" enviadas com sucesso.','success');
							}
						});
					}, 1000);
				}
			});
		},
		'click #deactivateEvent':function(e,t){
			Meteor.call("noticiasDeactivate", $(e.currentTarget).data('id'), FlowRouter.getParam('aplicativoId'), function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){

				}
			});
		},
		'click .removeBtn':function(e,t){
			var me = this;
			htmlConfirm('Aviso','Você tem certeza?',function(){
				Meteor.call("removeNoticia", me._id, FlowRouter.getParam('aplicativoId'), function(error, result){
					if(error){
						console.log("error", error);
					}
					if(result){
						 Bert.alert('Notícia excluída com sucess','success','growl-top-right');
					}
				});
			});
		}
	}
});
