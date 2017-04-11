Curso = new Mongo.Collection('plg_ensino_cursos');
Curso.helpers({
	cursoRequisito:function(){
		return Curso.findOne(this.requisito);
	}
});
