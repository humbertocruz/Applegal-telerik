Controller('arquivosView',{
	created:function() {
		Cloudinary.collection.find().observe({
			changed:function(newc,oldc){
				$('#progress_'+newc._id).progress({
					percent: newc.percent_uploaded
				});
			}
		});
		uploadTypeVar = new ReactiveVar();
		Tracker.autorun(function(){
			var page = FlowRouter.getQueryParam('page');
			allWallpapers = Meteor.subscribe("allWallpapers", page);
		});
	},
	rendered:function(){
		$('.ui.dropdown').dropdown();
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
		htmlItems:function(){
			return [
				{
					html:'Eviar Arquivo<i class="dropdown icon"></i><div class="menu"><a class="item uploadEvent" data-value="logotype">Logotipo</a><a class="item uploadEvent" data-value="wallpaper">Papel de Parede</a></div>'
				}
			]
		},
		arquivos: function(){
			var page = FlowRouter.getQueryParam('page');
			var qtd = 8;
			var arquivos = Arquivo.find({
				tags:{
					$all:['public']
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
		'click .uploadEvent':function(e,t){
			uploadTypeVar.set($(e.currentTarget).data('value'));
			$('#uploadField').click();
		},
		'change #uploadField': function(e) {
			var files = e.currentTarget.files;
			_.each(files,function(ff,idx){
				Cloudinary.upload(ff,
					{
						type: 'authenticated',
						folder:'shared',
						tags:[uploadTypeVar.get(),'public'],
					},
					function(err,res) {
						if (err) {
							console.log(err);
						} else {
							Arquivo.insert(res);
						}
					}
				);
			});
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
