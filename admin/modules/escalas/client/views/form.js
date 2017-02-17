Controller('escalasFormView',{
	created:function(){
		oneEscala = Meteor.subscribe('oneEscala', FlowRouter.getQueryParam('id'),aplicativoVar.get()._id);
	},
	rendered:function(){
		$('.ui.dropdown').dropdown();
		var $input = $('#dateField').pickadate();
		var picker = $input.pickadate('picker');
		picker.set('min',moment().toDate());

		if (id = FlowRouter.getParam('id')) {
			var escala = Escala.findOne(id);
			$('#escalasForm').form('set values', escala);
			$('#escalasForm').form('set value', 'dateField', moment(escala.date).format('DD/MM/YYYY'));

			var dropZone = $(".escalas.dropzone").dropzone({
				url: location.origin+'/upload/escalas/'+FlowRouter.getParam('id'),
				dictDefaultMessage:'Clique ou arraste e solte a Escala aqui para enviar ao servidor.',
				dictInvalidFileType:'Apenas arquivos PDF.',
				dictFileTooBig:'Arquivo muito grande',
				paramName: 'file',
				maxFilesize: 25,
				method:'post',
				acceptedFiles:'.pdf'
			});
		}
	},
	helpers:{
		escala_id:function(){
			return FlowRouter.getParam('id');
		},
		header:function(){
			return {
				title:(FlowRouter.getParam('id')==undefined?'Inserir Escala':'Editar Escala'),
				icon:'file text outline',
				corner:'add'
			}
		},
		saveLink:function(){
			return {
				title:'Salvar',
				icon:'save',
				form:'escalasForm'
			}
		},
		extraLinks:function(){
			return [
				{
					title:'Cancelar',
					route:'escalasRoute',
					icon:'left chevron'
				}
			]
		},
		servicos:function(){
			return Servico.find({},{sort:{name:1}}).fetch();
		}
	},
	events:{
		'submit #escalasForm'(e,t){
			e.preventDefault();
			var fields = $(e.target).form('get values');
			var id = FlowRouter.getParam('id');
			if (id) fields.id = id;
			fields.date = moment(fields.date,'DD/MM/YYYY').toDate();
			Meteor.call("escalasForm",fields, aplicativoVar.get()._id, function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					Bert.alert('A Escala foi salva com sucesso!','success');
				 if (FlowRouter.getParam('id')) {
					 FlowRouter.go('escalasRoute')
				 } else {
					 FlowRouter.go('escalasUpdateRoute',{id:result});
					 var dropZone = $(".escalas.dropzone").dropzone({
		 				url: location.origin+'/upload/escalas/'+FlowRouter.getParam('id'),
		 				dictDefaultMessage:'Clique ou arraste e solte a Escala aqui para enviar ao servidor.',
		 				dictInvalidFileType:'Apenas arquivos PDF.',
		 				dictFileTooBig:'Arquivo muito grande',
		 				paramName: 'file',
		 				maxFilesize: 25,
		 				method:'post',
		 				acceptedFiles:'.pdf'
		 			});
				 }
				}
			});
		}
	}
});
