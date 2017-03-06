Controller('arquivosView',{
	created:function() {
		Tracker.autorun(function(){
			var page = FlowRouter.getQueryParam('page');
			allWallpapers = Meteor.subscribe("allWallpapers", page);
		});
	},
	rendered:function(){
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
		}
	},
	events:{
		'change #uploadField': function(e) {
			var files = e.currentTarget.files;
			Cloudinary.upload(files,{
				folder:"shared", // optional parameters described in http://cloudinary.com/documentation/upload_images#remote_upload
				//type:"private", // optional: makes the image accessible only via a signed url. The signed url is available publicly for 1 hour.
				function(err,res) { // optional callback, you can catch with the Cloudinary collection as well
					console.log("Upload Error: #{err}"),
					console.log("Upload Result: #{res}")
				}
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
