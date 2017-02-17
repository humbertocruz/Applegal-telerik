Controller('documentosTiposView',{
	created:function() {
		sint = 0;
		tiposSearchVar = new ReactiveVar({});
	},
	helpers:{
		ready:function(){
			return true;
		},
		header:function(){
			return {
				title:'Tipos',
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
					route:'documentosRoute',
					icon:'close'
				},
				{
					title:'Adicionar',
					route:'documentosTiposInsertRoute',
					icon:'add'
				}
			]
		},
		tipos:function(){
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			var qtd = 10;
			var tipos = Tipo.find({},{sort:{name:1}}).fetch();

			return {
				page:page,
				count:Counts.get('allTipos'),
				data:tipos,
				pages:Math.ceil(Counts.get('allTipos')/qtd)
			}
		}
	},
	events:{
		'click .removeBtn':function(e,t){
			var me = this;
			htmlConfirm('Aviso','Você tem certeza?',function(){
				Meteor.call("tiposRemove", me._id, aplicativoVar.get()._id, function(error, result){
					if(error){
						console.log("error", error);
					}
					if(result){
						 Bert.alert('Tipo excluído com sucesso','success');
					}
				});
			});
		}
	}
});
