Controller('enquetesView', {
	created: function() {
		sint = 0;
		enquetesSearchVar = new ReactiveVar({});
		Tracker.autorun(function() {
			appEnquetes = Meteor.subscribe('appEnquetes', enquetesSearchVar.get(), FlowRouter.getQueryParam('page'),FlowRouter.getParam('aplicativoId'));
		});
	},
	helpers: {
		ready: function() {
			return appEnquetes.ready();
		},
		header: function() {
			return {
				title: 'Enquetes',
				icon: 'wizard'
			}
		},
		search: function() {
			return {}
		},
		newLink: function() {
			return {}
		},
		extraLinks: function() {
			return [
				{
					title:'Adicionar',
					route:'enquetesInsertRoute',
					icon:'add',
					params:{
						aplicativoId:FlowRouter.getParam('aplicativoId')
					}
				}
			];
		},
		enquetes: function() {
			var qtd = 10;
			var page = FlowRouter.getParam('page');
			if (!page) page = 1;
			var enquetes = Enquete.find(enquetesSearchVar.get(), {
				sort: {
					date: -1
				},
				limit: qtd,
			});

			$('.ui.progress').progress({
				duration: 200,
				total: Math.ceil(Counts.get('allEnquetes') / qtd),
				value: page
			});
			return {
				page: FlowRouter.getQueryParam('page'),
				data: enquetes.fetch(),
				count: Counts.get('allEnquetes'),
				pages: Math.ceil(Counts.get('allEnquetes') / qtd)
			};
		}
	},
	events: {
		'click #addBtn': function(e, t) {
			FlowRouter.go('enquetesInsertRoute');
		},
		'click #activateEvent': function(e, t) {
			Meteor.call("enquetesActivate", $(e.currentTarget).data('id'), FlowRouter.getParam('aplicativoId'), function(error, result) {
				if (error) {
					console.log("error", error);
				}
				if (result) {
					Bert.alert('Enquete Ativada com sucesso.', 'success');
					var enquete = Enquete.findOne($(e.currentTarget).data('id'));
					pushObj = {
						id: $(e.currentTarget).data('id'),
						from: aplicativoVar.get().pushFrom,
						title: 'Nova Enquete.',
						text: enquete.title
					};
					/*Meteor.setTimeout(function() {
						Meteor.call("pushSend", pushObj, function(error, result) {
							if (error) {
								console.log("error", error);
							}
							if (result) {
								Bert.alert('Mensagens "Push" enviadas com sucesso.', 'success');
							}
						});
					}, 1000);*/
				}
			});
		},
		'click #deactivateEvent': function(e, t) {
			Meteor.call("enquetesDeactivate", $(e.currentTarget).data('id'), FlowRouter.getParam('aplicativoId'), function(error, result) {
				if (error) {
					console.log("error", error);
				}
				if (result) {

				}
			});
		},
		'click .removeBtn': function(e, t) {
			var me = this;
			htmlConfirm('Aviso', 'Você tem certeza?', function() {
				Meteor.call("enquetesRemove", me._id, FlowRouter.getParam('aplicativoId'), function(error, result) {
					if (error) {
						console.log("error", error);
					}
					if (result) {
						Bert.alert('Enquete excluída com sucesso.', 'success');
					}
				});
			});
		}
	}
});
