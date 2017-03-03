Controller('arquivosView',{
	created:function() {
		arquivosSearchVar = new ReactiveVar({});
		arquivosPageVar = new ReactiveVar(1);
		Tracker.autorun(function(){
			allWallpapers = Meteor.subscribe("allWallpapers", FlowRouter.getQueryParam('page'));
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
					title:'Tipos',
					//route:'arquivosTiposRoute',
					icon:'sidebar'
				}
			]
		},
		ready: function(){
			return allWallpapers.ready();
		},
		arquivos:function(){
			var qtd = 10;
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			var arquivos = Arquivo.find();
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
