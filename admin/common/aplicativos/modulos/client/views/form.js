Controller('modulosFormView',{
	rendered:function(){
		if (id = FlowRouter.getParam('id')){
			Tracker.autorun(function(){
				oneModulos = Meteor.subscribe('oneModulos', id);
				var modulo = Modulo.findOne(id);
				$('#modulosForm').form('set values',modulo);
			});
		}
	},
	helpers:{
		header:function(){
			return {
				title:(FlowRouter.getParam('id')==undefined?'Inserir Módulo':'Editar Módulo'),
				icon:'puzzle',
				corner:'add'
			}
		},
		saveLink:function(){
			return {
				title:'Salvar',
				icon:'save',
				form:'modulosForm'
			}
		},
		extraLinks:function(){
			return [
				{
					title:'Cancelar',
					route:'modulosRoute',
					icon:'close'
				}
			]
		}
	},
	events:{
		'submit #modulosForm'(e,t){
			e.preventDefault();
			var fields = $(e.target).form('get values');
			var id = FlowRouter.getParam('id');
			if (id) fields._id = id;
			Meteor.call("modulosForm",fields, function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					 Bert.alert('O módulo foi salvo com sucesso!','success');
					 FlowRouter.go('modulosRoute')
				}
			});
		}
	}
});
