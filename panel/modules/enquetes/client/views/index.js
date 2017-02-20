Controller('enquetesView', {
	created: function() {
		sint = 0;
		enquetesSearchVar = new ReactiveVar({});
		Tracker.autorun(function() {
			allEnquetes = Meteor.subscribe('allEnquetes', enquetesSearchVar.get(), FlowRouter.getQueryParam('page'),aplicativoVar.get()._id,);
		});
	},
	rendered: function() {},
	destroyed: function() {},
	helpers: {
		ready: function() {
			return allEnquetes.ready();
		},
		header: function() {
			return {
				title: 'Enquetes',
				icon: 'wizard'
			}
		},
		search: function() {
			return {
				title: 'Buscar',
				modal: 'enquetesSearchModal'
			}
		},
		newLink: function() {
			return {
				title: 'Adicionar'
			}
		},
		extraLinks: function() {
			return false;
		},
		enquetes: function() {
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			var qtd = 10;
			var enquetes = Enquete.find(enquetesSearchVar.get(), {
				sort: {
					date: -1
				},
				limit: qtd,
				skip: (page - 1) * qtd
			}).fetch();

			$('.ui.progress').progress({
				duration: 200,
				total: Math.ceil(Counts.get('allEnquetes') / qtd),
				value: page
			});
			return {
				page: FlowRouter.getQueryParam('page'),
				data: enquetes,
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
			Meteor.call("enquetesActivate", $(e.currentTarget).data('id'), aplicativoVar.get()._id, function(error, result) {
				if (error) {
					console.log("error", error);
				}
				if (result) {
					Bert.alert('Enquete Ativada com sucesso.', 'success');
					var enquete = Enquete.findOne($(e.currentTarget).data('id'));
					pushObj = {
						id: $(e.currentTarget).data('id'),
						from: aplicativoVar.get().pushFrom,
						title: 'Nova Enquete no Grêmio.',
						text: enquete.title
					};
					Meteor.setTimeout(function() {
						Meteor.call("pushSend", pushObj, function(error, result) {
							if (error) {
								console.log("error", error);
							}
							if (result) {
								Bert.alert('Mensagens "Push" enviadas com sucesso.', 'success');
							}
						});
					}, 1000);
				}
			});
		},
		'click #deactivateEvent': function(e, t) {
			Meteor.call("enquetesDeactivate", $(e.currentTarget).data('id'), aplicativoVar.get()._id, function(error, result) {
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
				Meteor.call("enquetesRemove", me._id, aplicativoVar.get()._id, function(error, result) {
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
