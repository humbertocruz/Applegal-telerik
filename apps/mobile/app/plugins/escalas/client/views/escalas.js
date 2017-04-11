Controller('escalasView',{
	created:function(){
		topTitleVar.set('Escalas');
		fromDateVar = ReactiveVar(moment().toDate());;
		Tracker.autorun(function(){
			pubEscalas = Meteor.subscribe('pubEscalas',fromDateVar.get());
		});
	},
	rendered:function(){
	},
	helpers:{
		escalas:function(){
			var escalas = Escala.find({
				date:fromDateVar.get()
			},{
				sort:{
					date:-1}
				}
			).fetch();
			return {
				data:escalas,
				count:escalas.length
			}
		}
	},
	events:{
		'change #dateField':function(e,t){
			var date = $(e.currentTarget).val();
			fromDateVar.set(moment(date,'DD/MM/YYYY').tz('America/Sao_Paulo').toDate());
		}
	}
});
