Controller('escalasServicosView',{
	created:function() {
		sint = 0;
		servicosSearchVar = new ReactiveVar({});
	},
	helpers:{
		ready:function(){
			return true;
		},
		header:function(){
			return {
				title:'Serviços de Escala',
				icon:'sidebar'
			}
		},
		newLink:function(){
			return false;
		},
		extraLinks:function(){
			return [
				{
					title:'Voltar',
					route:'escalasRoute',
					icon:'left chevron'
				},
				{
					title:'Adicionar',
					route:'escalasServicosInsertRoute',
					icon:'add'
				}
			]
		},
		servicos:function(){
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			var qtd = 10;
			var servicos = Servico.find({},{sort:{name:1}}).fetch();

			return {
				page:page,
				count:Counts.get('allServicos'),
				data:servicos,
				pages:Math.ceil(Counts.get('allServicos')/qtd)
			}
		}
	}
});
