Controller('enquetesFormView',{
	created:function(){
		Tracker.autorun(function(){
			Meteor.subscribe("oneEnquete", FlowRouter.getQueryParam('id'),FlowRouter.getParam('aplicativoId'));
		});
	},
	rendered:function(){
		$('#enquetesForm .ui.dropdown').dropdown();
		if (id = FlowRouter.getParam('id')) {
			var enquete = Enquete.findOne(id);
			$('#enquetesForm').form('set values',enquete);
			$('#enquetesForm').form('set value','date_starting', moment(enquete.date_starting).format('YYYY-MM-DD'));
			$('#enquetesForm').form('set value','date_ending', moment(enquete.date_ending).format('YYYY-MM-DD'));
		}
	},
	helpers:{
		semanticColors:function(){
			return _.sortBy(semanticColors,'title');
		},
		header:function(){
			return {
				title:(FlowRouter.getParam('id')==undefined?'Inserir Enquete':'Editar Enquete'),
				icon:'wizard',
				corner:'add'
			}
		},
		saveLink:function(){
			return {
				title:'Salvar',
				icon:'save',
				form:'enquetesForm'
			}
		},
		extraLinks:function(){
			return [
				{
					title:'Cancelar',
					route:'enquetesRoute',
					icon:'left chevron'
				}
			]
		}
	},
	events:{
		'submit #enquetesForm'(e,t){
			e.preventDefault();
			var fields = $(e.target).form('get values');
			var id = FlowRouter.getParam('id');
			if (id) fields.id = id;
			Meteor.call("enquetesForm",fields, FlowRouter.getParam('aplicativoId'), function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					 Bert.alert('A enquete foi enviada com sucesso!','success');
					 FlowRouter.go('enquetesRoute')
				}
			});
		}
	}
});
