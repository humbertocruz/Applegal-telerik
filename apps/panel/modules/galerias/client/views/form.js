Controller('formGaleriasView',{
	created:function(){
		Tracker.autorun(function(){
			oneGaleria = Meteor.subscribe('oneGaleria',FlowRouter.getParam('id'),FlowRouter.getParam('aplicativoId'));
		});
	},
	rendered:function(){
		$('#noticiasForm .ui.dropdown').dropdown();
		$('#formGaleriasView').form({
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
			var galeria = Galeria.findOne(id);
			if (!galeria) return false;
			$('#galeriasForm').form('set values',galeria);
			$('#galeriasForm').form('set value','dateField',moment(galeria.date).format('YYYY-MM-DD'));
		} else {
			$('#galeriasForm').form('set value','dateField',moment().format('YYYY-MM-DD'));
		}
		// Upload - Configurando variaveis
		Arquivo.resumable.assignBrowse($(".fotoBrowse"));
		arquivoUploadProgressIdVar = '#galeriasFotoProgress';
		arquivoUploadMetadataVar.set({
			type: 'photo',
			aplicativoId: FlowRouter.getParam('aplicativoId'),
			galeriaId: FlowRouter.getParam('id')
		});
	},
	helpers:{
		galeria_id:function(){
			return FlowRouter.getParam('id');
		},
		locationOrigin:function(){
			return location.origin;
		},
		fotos:function(){
			if (!FlowRouter.getParam('id')) return false;
			var galeria = Galeria.findOne(FlowRouter.getParam('id'));
			if (!galeria) return false;
			return galeria.fotos();
		},
		capa_id:function(){
			if (!FlowRouter.getParam('id')) return false;
			var galeria = Galeria.findOne(FlowRouter.getParam('id'));
			return galeria.capa_id;
		},
		header:function(){
			return {
				title:(FlowRouter.getParam('id')==undefined?'Inserir Galeria':'Editar Galeria'),
				icon:'picture',
				corner:'add'
			}
		},
		saveLink:function(){
			return {
				title:'Salvar',
				icon:'save',
				form:'galeriasForm'
			}
		},
		extraLinks:function(){
			return [
				{
					title:'Cancelar',
					params:{
						aplicativoId:FlowRouter.getParam('aplicativoId')
					},
					route:'galeriasRoute',
					icon:'left chevron'
				}
			]
		}
	},
	events:{
		'click .capaBtn'(e,t){
			var fields = {
				_id:FlowRouter.getParam('id'),
				capa_id:this._id
			}
			Meteor.call("galeriasForm", fields, FlowRouter.getParam('aplicativoId'), function(error, result){
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
				Meteor.call("fotosRemove", me._id, FlowRouter.getParam('aplicativoId'), function(error, result){
					if(error){
						console.log("error", error);
					}
					if(result){
						Bert.alert('Foto excluida com sucesso.','success');
					}
				});
			});
		},
		'submit #galeriasForm'(e,t){
			e.preventDefault();
			var fields = $(e.target).form('get values');
			var id = FlowRouter.getParam('id');
			if (id) fields._id = id;
			Meteor.call("galeriasForm",fields, FlowRouter.getParam('aplicativoId'), function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					Bert.alert('A galeria foi salva com sucesso!','success');
					if (FlowRouter.getParam('id')){
						FlowRouter.go('galeriasRoute',{aplicativoId:FlowRouter.getParam('aplicativoId')});
					} else {
						FlowRouter.go('galeriasUpdateRoute',{id:result,aplicativoId:FlowRouter.getParam('aplicativoId')});
					}
				}
			});
		}
	}
});
