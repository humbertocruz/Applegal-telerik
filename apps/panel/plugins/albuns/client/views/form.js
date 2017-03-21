Controller('formAlbunsView',{
	created:function(){
		Meteor.call("setServerAppId", FlowRouter.getParam('aplicativoId'));
		/*Cloudinary.collection.find().observe({
			changed:function(newc,oldc){
				$('#progress_'+newc._id).progress({
					percent: newc.percent_uploaded
				});
			}
		});*/
		bibliotecaTypesVar.set([
			'album'
		]);
		Tracker.autorun(function(){
			oneFoto = Meteor.subscribe('oneAlbum', FlowRouter.getParam('id'), FlowRouter.getParam('aplicativoId'));
		});
	},
	rendered:function(){
		$('.ui.dropdown').dropdown();
		$('#formAlbunsView').form({
			onFailure(prompts,values){
				return false;
			},
			inline:true,
			fields:{
				subjectField:{
					indentifier:'titleField',
					rules:[
						{
							type:'empty',
							prompt:'O título não deve estar vazio'
						}
					]
				}
			}
		});
		if (id = FlowRouter.getParam('id')) {
			var album = Album.findOne(id);
			if (!album) return false;
			$('#albunsForm').form('set values',album);
			$('#albunsForm').form('set value','dateField',moment(album.date).format('YYYY-MM-DD'));
		} else {
			$('#albunsForm').form('set value','dateField',moment().format('YYYY-MM-DD'));
		}
	},
	helpers:{
		fotoId:function(){
			return FlowRouter.getParam('id');
		}
	},
	events:{
		'click .capaBtn'(e,t){
			var fields = {
				_id:FlowRouter.getParam('id'),
				capaId:this.public_id
			}
			Meteor.call("albunsForm", fields, FlowRouter.getParam('aplicativoId'), function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					Bert.alert('Foto marcada como capa com sucesso.','success');
				}
			});
		},
		'click .deleteBtn'(e,t){
			var me = this;
			htmlConfirm('Excluir','Você tem certeza?',function(){
				Meteor.call("albunsRemove", me._id, FlowRouter.getParam('aplicativoId'), function(error, result){
					if(error){
						console.log("error", error);
					}
					if(result){
						Bert.alert('Foto excluida com sucesso.','success');
					}
				});
			});
		},
		'submit #albunsForm'(e,t){
			e.preventDefault();
			var fields = $(e.target).form('get values');
			var id = FlowRouter.getParam('id');
			if (id) fields._id = id;
			Meteor.call("albunsForm",fields, FlowRouter.getParam('aplicativoId'), function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					Bert.alert('O Álbum foi salvo com sucesso!','success');
					if (FlowRouter.getParam('id')){
						FlowRouter.go('albunsRoute',{aplicativoId:FlowRouter.getParam('aplicativoId')});
					} else {
						FlowRouter.go('albunsUpdateRoute',{id:result, aplicativoId:FlowRouter.getParam('aplicativoId')});
					}
				}
			});
		}
	}
});
