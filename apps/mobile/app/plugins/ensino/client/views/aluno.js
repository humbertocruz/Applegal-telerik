Controller('alunoView',{
	created:function(){
		var me = this;
		me.autorun(function(){
			me.subscribe("appAluno");
		});
	},
	helpers:{
		aluno:function(){
			return Aluno.find().fetch();
		}
	}
});
