Meteor.methods({
	alunosApproved:function(data){
		return Aluno.update({
			_id:data.id
		},{
			$set:{
				approved:data.value
			}
		});
	},
  alunoChangeNota:function(data){
     var aluno = Aluno.findOne(data.alunoId);
     var idx = false;
     _.each(aluno.provas,function(prova,nidx){
       if (moment(prova.date).format('YYYY_MM_DD') == moment(data.date).format('YYYY_MM_DD')) idx = nidx;
     });
     if (idx) aluno.provas.splice(idx,1);
     aluno.provas.push({
       nota:parseFloat(data.nota),
       date:data.date
     });
     return Aluno.update(data.alunoId,{
       $set:aluno
     });
  }
});
