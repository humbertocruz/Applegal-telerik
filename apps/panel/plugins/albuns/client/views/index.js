Controller('albunsView', {
	created:function() {
		Meteor.call("setServerAppId", FlowRouter.getParam('aplicativoId'));
		sint = 0;
		Tracker.autorun(function(){
			allGalerias = Meteor.subscribe('allAlbuns',{},FlowRouter.getQueryParam('page'),FlowRouter.getParam('aplicativoId'));
		});
	},
	rendered:function(){
	},
	destroyed:function() {
	},
	helpers: {
		albuns: function() {
			var qtd = 10;
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			var albuns = Album.find({},{sort:{date:-1},limit:qtd,skip:(page-1)*qtd}).fetch();

			$('.ui.progress').progress({
				duration	: 200,
				total			: Math.ceil(Counts.get('allAlbuns')/qtd),
				value			: page
			});
			return {
				data: albuns,
				count: Counts.get('allAlbuns'),
				pages: Math.ceil(Counts.get('allAlbuns')/qtd)
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
