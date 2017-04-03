Controller('albunsView', {
	created:function() {
		var me = this;
		Meteor.call("setServerAppId", FlowRouter.getParam('aplicativoId'));
		sint = 0;
		me.autorun(function(){
			appAlbuns = me.subscribe('appAlbuns',{},FlowRouter.getQueryParam('page'),FlowRouter.getParam('aplicativoId'));
		});
	},
	helpers: {
		albuns: function() {
			if (!appAlbuns.ready()) return [];
			var qtd = 10;
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			var albuns = Album.find(
				{
					aplicativoId:FlowRouter.getParam('aplicativoId')
				},
				{
					sort:{
						date:-1
					},
					limit:qtd
				}
			).fetch();
			return {
				data: albuns,
				page: page,
				count: Counts.get('appAlbuns'),
				pages: Math.ceil(Counts.get('appAlbuns')/qtd)
			};
		}
	},
	events: {
		'click #addBtn':function(e,t){
			FlowRouter.go('albunsInsertRoute',{aplicativoId:FlowRouter.getParam('aplicativoId')});
		},
		'click #activateEvent':function(e,t){
			Meteor.call("albunsActivate", $(e.currentTarget).data('id'), FlowRouter.getParam('aplicativoId'), function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					Bert.alert('Álbum Ativado com sucesso.','success');
					var album = Album.findOne($(e.currentTarget).data('id'));

					pushObj = {
						id: $(e.currentTarget).data('id'),
						from:FlowRouter.getParam('aplicativoId'),
						title:'Nova Álbum de fotos.',
						text:album.title
					};
					/*Meteor.setTimeout(function(){

						Meteor.call("pushSend", pushObj, function(error, result){
							if(error){
								console.log("error", error);
							}
							if(result){
								Bert.alert('Mensagens "Push" enviadas com sucesso.','success');
							}
						});
					}, 1000);
					*/
				}
			});
		},
		'click #deactivateEvent':function(e,t){
			Meteor.call("albunsDeactivate", $(e.currentTarget).data('id'), FlowRouter.getParam('aplicativoId'), function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					Bert.alert('Álbum desativado!','warning');
				}
			});
		},
		'click .removeBtn':function(e,t){
			var me = this;
			htmlConfirm('Aviso','Você tem certeza? A Galeria e todas as fotos serão excluídas.',function(){
				Meteor.call("albunsRemove", me._id, function(error, result){
					if(error){
						console.log("error", error);
					}
					if(result){
						 Bert.alert('Álbum excluído com sucesso','success');
					}
				});
			});
		}
	}
});
