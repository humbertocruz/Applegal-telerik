Meteor.methods({
  alunoChangeNota:function(data){
     var aluno = Aluno.findOne(data.alunoId);
     var idx = false;
     _.each(aluno.notas,function(nota,nidx){
       if (moment(nota.date).format('YYYY_MM_DD') == moment(data.date).format('YYYY_MM_DD')) idx = nidx;
     });
     if (idx) aluno.notas.splice(idx,1);
     aluno.notas.push({
       nota:data.nota,
       date:data.date
     });
     return Aluno.update(data.alunoId,{
       $set:aluno
     });
  }
});
