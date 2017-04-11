Meteor.publish('appCursos', function(params) {
	var search = {};
	if (params.aplicativoId) search.aplicativoId = params.aplicativoId;
	if (params._id) search._id = params._id;
	var cursos = Curso.find(search, {
		sort: {
			order: 1
		}
	});
	return [cursos];
});
/*
		},
		children: [{
			find:function(curso){
				return Turma.find({
					cursoId:curso._id
				});
			}
		},{
			find:function(curso){
				return Curso.find({
					_id:curso.requisito
				});
			}
		}]
	}
});
*/
