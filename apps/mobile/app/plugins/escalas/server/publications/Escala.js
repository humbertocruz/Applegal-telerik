Meteor.publishComposite('pubEscalas',function(date,aplicativoId){
	return {
		find:function(){
			dia_ini = moment(date).startOf('day').toDate();
			dia_fim = moment(date).endOf('day').toDate();
			var escalas = Escala.find({
				aplicativoId:aplicativoId,
				date:{
					$gte:dia_ini,
					$lte:dia_fim
				}
			},{
				sort:{
					date:-1
				},
				limit:10
			});
			return escalas;
		},
		children:[
			{
				find:function(escala){
					return Servico.find(escala.servico_id);
				}
			}
		]
	}
});
