Controller('escalasServicosFormView',{
	rendered:function(){
		if (id = FlowRouter.getParam('id')){
			var servico = Servico.findOne(id);
			$('#servicosForm').form('set values',servico);
		}
	},
	helpers:{
		header:function(){
			return {
				title:(FlowRouter.getParam('id')==undefined?'Inserir Serviço':'Editar Serviço'),
				icon:'sidebar',
				corner:'add'
			}
		},
		saveLink:function(){
			return {
				title:'Salvar',
				icon:'save',
				form:'servicosForm'
			}
		},
		extraLinks:function(){
			return [
				{
					title:'Cancelar',
					route:'escalasServicosRoute',
					icon:'left chevron'
				}
			]
		}
	},
	events:{
		'submit #servicosForm'(e,t){
			e.preventDefault();
			var fields = $(e.target).form('get values');
			var id = FlowRouter.getParam('id');
			if (id) fields.id = id;
			Meteor.call("servicosForm",fields, FlowRouter.getParam('aplicativoId'), function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					 Bert.alert('O serviço foi salvo com sucesso!','success');
					 FlowRouter.go('escalasServicosRoute')
				}
			});
		}
	}
});
