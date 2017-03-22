Controller('formNoticiasView',{
	created:function(){
		Meteor.call("setServerAppId", FlowRouter.getParam('aplicativoId'));
		bibliotecaTypesVar.set([
			'noticia'
		]);
		Tracker.autorun(function(){
			var page = FlowRouter.getQueryParam('page');
			Meteor.subscribe("oneNoticia", FlowRouter.getParam('noticiaId'));
			Meteor.subscribe("appAssuntos", page, FlowRouter.getParam('aplicativoId'));
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
		noticiaId:function(){
			return FlowRouter.getParam('noticiaId');
		},
		semanticColors:function(){
			return _.sortBy(semanticColors,'title');
		},
		uploaded:function(){
			return Cloudinary.collection.find({},{
				limit:1,
				sort:{
					created_at:-1
				}
			}).fetch();
		},
		noticia:function(){
			return Noticia.findOne(FlowRouter.getParam('noticiaId'));
		},
		assuntos:function(){
			return Assunto.find({},{sort:{name:1}}).fetch();
		}
	},
	events:{
		'click .fotoBtn'(e,t){
			var fields = {
				_id:FlowRouter.getParam('noticiaId'),
				fotoId:this.public_id
			}
			Meteor.call("noticiasForm", fields, FlowRouter.getParam('aplicativoId'), function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					Bert.alert('Foto inserida na notícia com sucesso.','success');
				}
			});
		},
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
