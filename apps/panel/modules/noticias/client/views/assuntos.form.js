Controller('noticiasAssuntosFormView',{
	rendered:function(){
		Meteor.call("setServerAppId", FlowRouter.getParam('aplicativoId'));
		if (id = FlowRouter.getParam('id')){
			var assunto = Assunto.findOne(id);
			$('#assuntosForm').form('set values',assunto);
		}
	},
	helpers:{
		header:function(){
			return {
				title:(FlowRouter.getParam('id')==undefined?'Inserir Assunto':'Editar Assunto'),
				icon:'sidebar',
				corner:'add'
			}
		},
		saveLink:function(){
			return {
				title:'Salvar',
				icon:'save',
				form:'assuntosForm'
			}
		},
		extraLinks:function(){
			return [
				{
					title:'Cancelar',
					params: {
						aplicativoId: FlowRouter.getParam('aplicativoId')
					},
					route:'noticiasAssuntosRoute',
					icon:'close'
				}
			]
		}
	},
	events:{
		'submit #assuntosForm'(e,t){
			e.preventDefault();
			var fields = $(e.target).form('get values');
			var id = FlowRouter.getParam('id');
			if (id) fields._id = id;
			Meteor.call("assuntosForm",fields, FlowRouter.getParam('aplicativoId'), function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					 Bert.alert('O assunto foi salvo com sucesso!','success');
					 FlowRouter.go('noticiasAssuntosRoute',{aplicativoId:FlowRouter.getParam('aplicativoId')})
				}
			});
		}
	}
});
