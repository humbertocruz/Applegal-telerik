Controller('aplicativosArquivosView',{
	created:function() {
		arquivosSearchVar = new ReactiveVar({});
		Tracker.autorun(function(){
			var page = FlowRouter.getQueryParam('page');
			var search = arquivosSearchVar.get();
			var aplicativoId = FlowRouter.getParam('aplicativoId');
			Meteor.subscribe("appArquivos", search, page, aplicativoId);
		});
	},
	rendered:function(){
		Arquivo.resumable.assignBrowse($("#arquivoBrowse"));
	},
	helpers:{
		ready:function(){
			return true;
		},
		header:function(){
			return {
				title:'Arquivos',
				icon:'file'
			}
		},
		arquivos:function(){
			var qtd = 8;
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			var arquivos = Arquivo.find({
				'metadata.aplicativoId':FlowRouter.getParam('aplicativoId'),
				'metadata.type':{
					$in:['logotype','wallpaper']
				}
			});
			return {
				page:page,
				count:Counts.get('appArquivos'),
				data:arquivos.fetch(),
				pages:Math.ceil(Counts.get('appArquivos')/qtd)
			}
		}
	},
	events:{
		'change #typeField':function(e,t){
			arquivoUploadMetadataVar.set({
				aplicativoId: FlowRouter.getParam('aplicativoId'),
				type:$(e.currentTarget).val()
			});
		},
		'click .arquivoRemoveEvent':function(e,t){
			var me = this;
			htmlConfirm('Aviso','Você tem certeza?',function(){
				Arquivo.remove(me._id,function(error, result){
					if(error){
						console.log("error", error);
					}
					if(result){
						Bert.alert('Arquivo excluído com sucesso','success');
					}
				});
			});
		}
	}
});
