Controller('arquivosView',{
	created:function() {
		Tracker.autorun(function(){
			var page = FlowRouter.getQueryParam('page');
			allWallpapers = Meteor.subscribe("allWallpapers", page);
		});
	},
	rendered:function(){
		Arquivo.resumable.assignBrowse($("#arquivoBrowse"));
		arquivoUploadMetadataVar.set({
			aplicativoId: false,
			public: true,
			type:'wallpaper'
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
		newLink:function(){
			return false;
		},
		extraLinks:function(){
			return [
				{
					title:'Enviar Arquivos',
					id:'arquivoBrowse',
					icon:'upload'
				}
			]
		},
		ready: function(){
			return allWallpapers.ready();
		},
		arquivos:function(){
			var qtd = 8;
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			var arquivos = Arquivo.find({},{limit:qtd});
			return {
				page:page,
				count:Counts.get('allWallpapers'),
				data:arquivos.fetch(),
				pages:Math.ceil(Counts.get('allWallpapers')/qtd)
			}
		},
		arquivoPath:function(){
			return '/gridfs/arquivos/md5/'+this.md5;
		}
	},
	events:{
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
