Controller('arquivosView',{
	created:function() {
		Cloudinary.collection.find().observe({
			changed:function(newc,oldc){
				$('#progress_'+newc._id).progress({
					percent: newc.percent_uploaded
				});
			}
		});
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
		extraLinks:function(){
			return [
				{
					title:'Enviar Arquivo',
					icon:'upload',
					id:'enviarArquivoEvent'
				}
			]
		},
		arquivos: function(){
			var page = FlowRouter.getQueryParam('page');
			var qtd = 8;
			var arquivos = Arquivo.find({
				tags:{
					$all:['wallpaper','public']
				}
			},{
				limit:qtd,
			});
			return {
				page:page,
				count: Counts.get('allWallpapers'),
				data: arquivos.fetch(),
				pages: Math.ceil(Counts.get('allWallpapers')/qtd)
			};
		},
		uploads:function(){
			var arquivos = Cloudinary.collection.find({
				status:'uploading'
			});
			return {
				data:arquivos.fetch(),
			};
		}
	},
	events:{
		'click #enviarArquivoEvent':function(e,t){
			$('#uploadField').click();
		},
		'change #uploadField': function(e) {
			var files = e.currentTarget.files;
			Cloudinary.upload(files,
				{
					folder:"shared",
					tags:['wallpaper','public'],
				},
				function(err,res) {
					if (err) {
						console.log(err);
					} else {
						Arquivo.insert(res);
					}
				}
			);
		},
		'click .removeArquivoEvent':function(e,t){
			var me = this;
			htmlConfirm('Aviso','Você tem certeza?',function(){
				Cloudinary.delete(me.public_id,function(err,result){
					Arquivo.remove(me._id,function(error, result){
						if(error){
							console.log("error", error);
						}
						if(result){
							Bert.alert('Arquivo excluído com sucesso','success');
						}
					});
				});
			});
		}
	}
});
