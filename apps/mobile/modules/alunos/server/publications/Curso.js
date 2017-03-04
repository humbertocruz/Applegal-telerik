Meteor.publishComposite('', function() {
	return {
		find: function() {
			var cursos = Curso.find({}, {
				sort: {
					name: 1
				}
			});
			return cursos;
		},
		children: []
	}
});
