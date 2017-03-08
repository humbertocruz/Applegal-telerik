Controller('galeriasView', {
	created:function() {
		Meteor.call("setServerAppId", FlowRouter.getParam('aplicativoId'));
		sint = 0;
		Tracker.autorun(function(){
			allGalerias = Meteor.subscribe('allGalerias',{},FlowRouter.getQueryParam('page'),FlowRouter.getParam('aplicativoId'));
		});
	},
	rendered:function(){
	},
	destroyed:function() {
	},
	helpers: {
		ready:function(){
			return allGalerias.ready();
		},
		header:function(){
			return {
				title:'Galerias',
				icon:'picture'
			}
		},
		newLink:function(){
			return {}
		},
		extraLinks:function(){
			return [
				{
					title: 'Adicionar',
					icon: 'plus',
					route: 'galeriasInsertRoute',
					params:{
						aplicativoId:FlowRouter.getParam('aplicativoId')
					}
				}
			]
		},
		galerias: function() {
			var qtd = 10;
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			var galerias = Galeria.find({},{sort:{date:-1},limit:qtd,skip:(page-1)*qtd}).fetch();

			$('.ui.progress').progress({
				duration	: 200,
				total			: Math.ceil(Counts.get('allGalerias')/qtd),
				value			: page
			});
			return {
				data: galerias,
				count: Counts.get('allGalerias'),
				pages: Math.ceil(Counts.get('allGalerias')/qtd)
			};
		},
		fotoLink:function(){
			var foto = appGaleriaFoto.findOne(this.capa_id);
			if (!foto) return false;
			return appGaleriaFoto.baseURL + '/md5/' + foto.md5;
		},
	},
	events: {
		'click #addBtn':function(e,t){
			FlowRouter.go('galeriasInsertRoute',{aplicativoId:FlowRouter.getParam('aplicativoId')});
		},
		'click #activateEvent':function(e,t){
			Meteor.call("galeriasActivate", $(e.currentTarget).data('id'), FlowRouter.getParam('aplicativoId'), function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					Bert.alert('Galeria Ativada com sucesso.','success');
					var galeria = Galeria.findOne($(e.currentTarget).data('id'));

					pushObj = {
						id: $(e.currentTarget).data('id'),
						from:FlowRouter.getParam('aplicativoId'),
						title:'Nova Galeria de fotos do Grêmio.',
						text:galeria.title
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
			Meteor.call("galeriasDeactivate", $(e.currentTarget).data('id'), FlowRouter.getParam('aplicativoId'), function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					Bert.alert('Galeria desativada!','warning');
				}
			});
		},
		'click .removeBtn':function(e,t){
			var me = this;
			htmlConfirm('Aviso','Você tem certeza? A Galeria e todas as fotos serão excluídas.',function(){
				Meteor.call("galeriasRemove", me._id, function(error, result){
					if(error){
						console.log("error", error);
					}
					if(result){
						 Bert.alert('Galeria excluída com sucesso','success','growl-top-right');
					}
				});
			});
		}
	}
});
