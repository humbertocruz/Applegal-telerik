Controller('formNoticiasView',{
	created:function(){
		var me = this;
		Meteor.call("setServerAppId", FlowRouter.getParam('aplicativoId'));
		bibliotecaTypesVar.set([
			'noticia'
		]);
		if (FlowRouter.getParam('noticiaId')) {
			me.autorun(function(){
				var page = FlowRouter.getQueryParam('page');
				var appId = FlowRouter.getParam('aplicativoId');
				appNoticia = me.subscribe("appNoticias", {_id:FlowRouter.getParam('noticiaId')},page,appId,FlowRouter.getParam('noticiaId'));
				appAssuntos = me.subscribe("appAssuntos", page, appId);
				var libType = bibliotecaTypesVar.get();
				appBiblioteca = me.subscribe("appBiblioteca", page, appId, 12, libType);
			});
		}
	},
	rendered:function(){
		tinymce.remove();
		tinymce.init({
			selector: 'textarea',
			//language: 'pt_BR',
			skin_url: '/packages/teamon_tinymce/skins/lightgray',
		});
		$('#noticiasForm .ui.dropdown').dropdown();
	},
	helpers:{
		semanticColors:function(){
			return _.sortBy(semanticColors,'title');
		},
		noticia:function(){
			var noticia = Noticia.findOne(FlowRouter.getParam('noticiaId'));
			console.log(noticia);
			return noticia;
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
