Controller('filiaisView', {
	created: function() {},
	rendered: function() {},
	helpers: {
		ready: function() {
			return true;
		},
		header: function() {
			return {
				title: 'Filiais',
				icon: 'building'
			}
		},
		newLink: function() {
			return {
				title: 'Adicionar',
				route: 'filiaisInsertRoute'
			}
		},
		extraLinks: function() {
			return [];
		},
		filiais: function() {
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			var total = Counts.get('allFiliais');
			var qtd = 10;
			var filiais = Filial.find({}, {
				sort: {
					name: 1
				},
				limit: qtd,
				skip: (page - 1) * qtd
			}).fetch();

			$('.ui.progress').progress({
				duration: 200,
				total: Math.ceil(total / qtd),
				value: page
			});
			return {
				page: page,
				data: filiais,
				count: total,
				pages: Math.ceil(total / qtd)
			};
		}
	},
	events: {
		'click #addBtn': function(e, t) {

		}
	}
});
