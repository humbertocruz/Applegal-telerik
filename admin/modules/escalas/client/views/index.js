Controller('escalasView', {
	created:function() {
		sint = 0;
		searchEscalasVar = new ReactiveVar({});
		Tracker.autorun(function(){
			allEscalas = Meteor.subscribe('allEscalas', searchEscalasVar.get(),aplicativoVar.get()._id);
		});
	},
	rendered:function(){
	},
	destroyed:function() {
	},
	helpers: {
		ready:function(){
			return allEscalas.ready();
		},
		header:function(){
			return {
				title:'Escalas',
				icon:'file text outline'
			}
		},
		newLink:function(){
			return {
				title:'Adicionar'
			}
		},
		extraLinks:function(){
			return [
				{
					title:'Serviços',
					route:'escalasServicosRoute',
					icon:'sidebar'
				}
			]
		},
		escalas: function() {
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			var qtd = 10;
			var escalas = Escala.find(searchEscalasVar.get(),{sort:{date:-1},limit:qtd,skip:(page-1)*qtd}).fetch();

			$('.ui.progress').progress({
				duration	: 200,
				total			: Math.ceil(Counts.get('allEscalas')/qtd),
				value			: page
			});
			return {
				page: FlowRouter.getQueryParam('page'),
				data: escalas,
				count: Counts.get('allEscalas'),
				pages: Math.ceil(Counts.get('allEscalas')/qtd)
			};
		}
	},
	events: {
		'keyup .titulo.search.item input.prompt':function(e,t){
			Meteor.clearTimeout(sint);
			sint = Meteor.setTimeout(function(){
				var titulo = $('.titulo input.prompt').val();
				searchEscalasVar.set({titulo:{$regex:titulo,$options: 'i'}});
			},1000);
		},
		'click .titulo.search.item .close.link.icon':function(e,t){
			e.preventDefault();
			$('.titulo.search.item input.prompt').val('');
			searchEscalasVar.set({});
		},
		'click #addBtn':function(e,t){
			FlowRouter.go('escalasInsertRoute');
		},
		'click .removeBtn':function(e,t){
			var me = this;
			htmlConfirm('Aviso','Você tem certeza?',function(){
				Meteor.call("escalasRemove", me._id, aplicativoVar.get()._id, function(error, result){
					if(error){
						console.log("error", error);
					}
					if(result){
						 Bert.alert('Notícia excluída com sucesso','success');
					}
				});
			});
		}
	}
});
