Controller('formNoticiasView',{
	created:function(){
		Tracker.autorun(function(){
			Meteor.subscribe("oneNoticia", FlowRouter.getParam('noticiaId'));
			Meteor.subscribe("appAssuntos", FlowRouter.getParam('aplicativoId'));
		});
	},
	rendered:function(){
		$('#noticiasForm .ui.dropdown').dropdown();
		if (id = FlowRouter.getParam('noticiaId')) {
			var noticia = Noticia.findOne(id);
			if (!noticia) return false;
			$('#noticiasForm').form('set values',noticia);
			$('#dateField').val(moment(noticia.date).format('YYYY-MM-DD'));
		} else {
			$('#dateField').val(moment().format('YYYY-MM-DD'));
		}

		tinymce.remove();
		tinymce.init({
			selector: 'textarea',
			//language: 'pt_BR',
			skin_url: '/packages/teamon_tinymce/skins/lightgray',
		});
	},
	helpers:{
		semanticColors:function(){
			return _.sortBy(semanticColors,'title');
		},
		noticia:function(){
			return Noticia.findOne(FlowRouter.getParam('noticiaId'));
		},
		assuntos:function(){
			return Assunto.find({},{sort:{name:1}}).fetch();
		},
		header:function(){
			return {
				title:(FlowRouter.getParam('noticiaId')==undefined?'Inserir Notícia':'Editar Notícia'),
				icon:'newspaper',
				corner:'add'
			}
		},
		saveLink:function(){
			return {
				title:'Salvar',
				icon:'save',
				form:'noticiasForm'
			}
		},
		extraLinks:function(){
			return [
				{
					title:'Cancelar',
					route:'noticiasRoute',
					params: {
						aplicativoId: FlowRouter.getParam('aplicativoId')
					},
					icon:'close'
				},
				{
					title:'Assuntos',
					params: {
						aplicativoId: FlowRouter.getParam('aplicativoId')
					},
					route:'noticiasAssuntosRoute',
					icon:'sidebar'
				}
			]
		}
	},
	events:{
		'submit #noticiasForm'(e,t){
			e.preventDefault();
			var fields = $(e.target).form('get values');
			var id = FlowRouter.getParam('noticiaId');
			if (id) fields._id = id;
			Meteor.call("noticiasForm",fields, FlowRouter.getParam('aplicativoId'), function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					 Bert.alert('A notícia foi salva com sucesso!','success');
					 FlowRouter.go('noticiasRoute',{aplicativoId:FlowRouter.getParam('aplicativoId')})
				}
			});
		}
	}
});
