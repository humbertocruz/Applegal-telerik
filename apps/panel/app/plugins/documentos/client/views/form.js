Controller('documentosFormView',{
	created:function(){
		Meteor.subscribe("oneDocumento", FlowRouter.getParam('id'),FlowRouter.getParam('aplicativoId'));
	},
	rendered:function(){
		$('.ui.dropdown').dropdown();
		var $input = $('#dateField').pickadate();
		var picker = $input.pickadate('picker');
		//picker.set('min',moment().add(1,'day').toDate());

		if (id = FlowRouter.getParam('id')) {
			var documento = Documento.findOne(id);
			$('#documentosForm').form('set values',documento);
			$('#documentosForm').form('set value','dateField',moment(documento.date).format('DD/MM/YYYY'));
		}
		var dropZone = $("div.documentos.dropzone").dropzone({
			url: location.origin+'/upload/documentos/'+FlowRouter.getParam('id'),
			dictDefaultMessage:'Clique ou arraste e solte o Documento aqui para enviar ao servidor.',
			dictInvalidFileType:'Apenas arquivos PDF, Word, Excel ou PowerPoint.',
			dictFileTooBig:'Arquivo muito grande',
			paramName: 'file',
			maxFilesize: 25,
			method:'post',
			acceptedFiles:'.doc,.pdf,.docx,.xls,.xlsx,.ppt,.pptx'
		});
	},
	helpers:{
		documento_id:function(){
			return FlowRouter.getParam('id');
		},
		header:function(){
			return {
				title:(FlowRouter.getParam('id')==undefined?'Inserir Documento':'Editar Documento'),
				icon:'file word outline',
				corner:'add'
			}
		},
		saveLink:function(){
			return {
				title:'Salvar',
				icon:'save',
				form:'documentosForm'
			}
		},
		extraLinks:function(){
			return [
				{
					title:'Cancelar',
					route:'documentosRoute',
					icon:'left chevron'
				},
				{
					title:'Tipos',
					route:'documentosTiposRoute',
					icon:'sidebar'
				}
			]

		},
		tipos:function(){
			return Tipo.find().fetch({},{sort:{name:1}});
		}
	},
	events:{
		'submit #documentosForm'(e,t){
			e.preventDefault();
			var fields = $(e.target).form('get values');
			fields._id = FlowRouter.getParam('id');
			Meteor.call("documentosForm",fields, FlowRouter.getParam('aplicativoId'), function(error, result){
				if(error){
					console.log("error", error);
					Bert.alert('Houve um erro ao salvar o Documento!','error');
				}
				if(result){
					if (FlowRouter.getParam('id')) {
						FlowRouter.go('documentosRoute')
					} else {
						FlowRouter.go('documentosUpdateRoute',{id:result});
						var dropZone = $("div.documentos.dropzone").dropzone({
							url: location.origin+'/upload/documentos/'+FlowRouter.getParam('id'),
							dictDefaultMessage:'Clique ou arraste e solte o Documento aqui para enviar ao servidor.',
							dictInvalidFileType:'Apenas arquivos PDF, Word, Excel ou PowerPoint.',
							dictFileTooBig:'Arquivo muito grande',
							paramName: 'file',
							maxFilesize: 25,
							method:'post',
							acceptedFiles:'.doc,.pdf,.docx,.xls,.xlsx,.ppt,.pptx'
						});
					}
					Bert.alert('O Documento foi salvo com sucesso!','success');
				}
			});
		}
	}
});
