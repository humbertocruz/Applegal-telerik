Controller('escalasView',{
	created:function(){
		topTitleVar.set('Escalas');
		fromDateVar = ReactiveVar(moment().toDate());
		subsEscala = new SubsManager();
		Tracker.autorun(function(){
			pubEscalas = subsEscala.subscribe('pubEscalas',fromDateVar.get());
		});
	},
	rendered:function(){
		var $input = $('#dateField').pickadate({
			selectMonths: 12,
			selectYears: 60
		});
		var picker = $input.pickadate('picker');
		picker.set('min',moment().toDate());
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
