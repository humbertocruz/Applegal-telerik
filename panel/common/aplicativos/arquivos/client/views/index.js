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
		var tipoArquivo = $('#typeField').val();
		arquivoUploadMetadataVar.set({
			aplicativoId: false,
			public: false,
			tipoArquivo:tipoArquivo
		});
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
			var qtd = 10;
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			var arquivos = Arquivo.find({},
				{
					limit:qtd,
					skip: (page - 1) * qtd
				}).fetch();
			return {
				page:page,
				count:Counts.get('appArquivos'),
				data:arquivos,
				pages:Math.ceil(Counts.get('appArquivos')/qtd)
			}
		}
	},
	events:{
		'click .removeBtn':function(e,t){
			var me = this;
			htmlConfirm('Aviso','Você tem certeza?',function(){
				Meteor.call("arquivosRemove", me._id, function(error, result){
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
