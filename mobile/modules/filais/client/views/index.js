Controller('filiaisView', {
	created: function() {
		topTitleVar.set('Congregações');
	},
	rendered: function() {

	},
	helpers: {
		filiais: function() {
			var filiais = Filial.find({
				$or:[
					{public: { $exists: false }},
					{public: false}
				]
			}, {
				sort: {
					name: 1
				}
			}).fetch();
			return {
				data: filiais,
				count: filiais.length
			}
		}
	},
	events: {
		'click .selectFilialEvent': function(e, t) {
			e.preventDefault();
			currentFilialVar.set(this._id);
			FlowRouter.go('homeRoute');
		}
	}
});
