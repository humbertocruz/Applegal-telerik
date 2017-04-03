Controller('documentosTiposFormView',{
	rendered:function(){
		if (id = FlowRouter.getParam('id')){
			var tipo = Tipo.findOne(id);
			$('#tiposForm').form('set values',tipo);
		}
	},
	helpers:{
		header:function(){
			return {
				title:(FlowRouter.getParam('id')==undefined?'Inserir Tipo':'Editar Tipo'),
				icon:'sidebar',
				corner:'add'
			}
		},
		saveLink:function(){
			return {
				title:'Salvar',
				icon:'save',
				form:'tiposForm'
			}
		},
		extraLinks:function(){
			return [
				{
					title:'Cancelar',
					route:'documentosTiposRoute',
					icon:'close'
				}
			]
		}
	},
	events:{
		'submit #tiposForm'(e,t){
			e.preventDefault();
			var fields = $(e.target).form('get values');
			var id = FlowRouter.getParam('id');
			if (id) fields.id = id;
			Meteor.call("tiposForm",fields, FlowRouter.getParam('aplicativoId'), function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					 Bert.alert('O tipo foi salvo com sucesso!','success');
					 FlowRouter.go('documentosTiposRoute')
				}
			});
		}
	}
});
