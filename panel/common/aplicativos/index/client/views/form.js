Controller('aplicativosFormView',{
	created:function(){
		Tracker.autorun(function(){
			Meteor.subscribe("oneAplicativo", FlowRouter.getParam('aplicativoId'));
		});
	},
	rendered:function(){
		if (id = FlowRouter.getParam('aplicativoId')){
			var aplicativo = Aplicativo.findOne(id);
			$('#aplicativosForm').form('set values',aplicativo);
		} else {
			$('#aplicativosForm').form('set values', {
				headerField: 'blue',
				sidebarField: 'violet'
			});
		}
		tinymce.remove();
		tinymce.init({
			selector: 'textarea',
			language: 'pt_BR',
			skin_url: '/packages/teamon_tinymce/skins/lightgray',
		});
	},
	helpers:{
		header:function(){
			return {
				title:(aplicativoVar.get()._id==undefined?'Criar Aplicativo':'Editar Aplicativo'),
				icon:'android',
				corner:'add'
			}
		},
		semanticColors:function(){
			return _.sortBy(semanticColors,'title');
		},
		saveLink:function(){
			return {
				title:'Salvar',
				icon:'save',
				form:'aplicativosForm'
			}
		},
		extraLinks:function(){
			return [
				{
					title:'Cancelar',
					route:'aplicativosRoute',
					icon:'close'
				}
			]
		}
	},
	events:{
		'submit #aplicativosForm'(e,t){
			e.preventDefault();
			var fields = $(e.target).form('get values');
			var id = FlowRouter.getParam('aplicativoId');
			if (id) fields._id = id;
			Meteor.call("aplicativosForm",fields, function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					 Bert.alert('O aplicativo foi salvo com sucesso!','success');
					 FlowRouter.go('aplicativosRoute')
				}
			});
		}
	}
});
