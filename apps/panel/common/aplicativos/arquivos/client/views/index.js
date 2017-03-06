Controller('aplicativosArquivosView',{
	created:function() {
		// Monitora os arquivos enviados
		Cloudinary.collection.find().observe({
			changed:function(newc,oldc){
				$('#progress_'+newc._id).progress({
					percent: newc.percent_uploaded
				});
			}
		});

		arquivosSearchVar = new ReactiveVar({});
		Tracker.autorun(function(){
			var page = FlowRouter.getQueryParam('page');
			var search = arquivosSearchVar.get();
			var aplicativoId = FlowRouter.getParam('aplicativoId');
			Meteor.subscribe("appArquivos", page, aplicativoId);
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
		uploads:function(){
			var arquivos = Cloudinary.collection.find({
				//status:'uploading'
			});
			return {
				data:arquivos.fetch(),
			};
		},
		arquivos:function(){
			var qtd = 8;
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			var arquivos = Arquivo.find({
				$or:[
					{
						tags:{
							$all:[
								FlowRouter.getParam('aplicativoId'),
								'logotype'
							]
						}
					},{
						tags:{
							$all:[
								FlowRouter.getParam('aplicativoId'),
								'wallpaper'
							]
						}
					}
				]
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
		'click .removePreviewEvent':function(e,t){
			Cloudinary.collection.remove(this._id);
		},
		'change #uploadField': function(e) {
			var files = e.currentTarget.files;
			Cloudinary.upload(files,
				{
					folder:FlowRouter.getParam('aplicativoId'),
					tags:[$('#typeField').val(),FlowRouter.getParam('aplicativoId')],
				},
				function(err,res) {
					if (err) {
						console.log(err);
					} else {
						res.preview = Cloudinary.collection.findOne({
							'response.public_id':res.public_id
						}).preview;
						Arquivo.insert(res);
					}
				}
			);
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
						Cloudinary.delete(me.public_id,function(err,result){
							console.log(err);
							console.log(result);
						});
					}
				});
			});
		}
	}
});
