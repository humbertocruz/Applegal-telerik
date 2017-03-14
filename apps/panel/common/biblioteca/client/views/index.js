Controller('bibliotecaView',{
	created:function() {
		pageVar = new ReactiveVar(1);
		subMenuTitleVar.set({
			title:'Biblioteca',
			icon:'book'
		});
		//Configura App Mestre
		var appM = Aplicativo.findOne({
			appInfoId:'br.com.applegal.applegal'
		});
		if (!appM) {
			FlowRouter.go('aplicativosRoute');
			return true;
		};
		// Configurando Cloudinary no Server Side para acessar a conta correta.
		Meteor.call("setServerAppId", appM._id, function(err,result){
			Meteor.call("setCloudinary", appM._id, function(err,result){
				if (result){
					$.cloudinary.init();
					$.cloudinary.config = {
						cloud_name:result
					};
				}
			});
		});
		// Observa a Collection do Clodinary para mostrar o andamento dos uploads
		Cloudinary.collection.find().observe({
			changed:function(newc,oldc){
				$('#progress_'+newc._id).progress({
					percent: newc.percent_uploaded
				});
			}
		});
		uploadTypeVar = new ReactiveVar();
		// Subscribe de todos dados da biblioteca pública
		Tracker.autorun(function(){
			allWallpapers = Meteor.subscribe("allWallpapers", appM._id, pageVar.get(), 10);
		});

	},
	rendered:function(){
		$('.ui.dropdown').dropdown();
		$('.image.dim').not('.dimmable').dimmer({
			on: 'hover'
		});
	},
	helpers:{
		biblioteca: function(){
			var arquivos = Arquivo.find({
				tags:{
					$in:['public']
				}
			});
			return {
				count: Counts.get('allWallpapers'),
				data: arquivos.fetch()
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
		'click #loadMore':function(e,t){
			var page = pageVar.get();
			page++;
			pageVar.set(page);
		},
		'click .uploadEvent':function(e,t){
			uploadTypeVar.set($(e.currentTarget).data('value'));
			$('#uploadField').click();
		},
		'change #uploadField': function(e) {
			var files = e.currentTarget.files;
			var aplicativoId = Aplicativo.findOne({
				appInfoId:'br.com.applegal.applegal'
			})._id;
			_.each(files,function(ff,idx){
				Cloudinary.upload(ff,
					{
						folder:uploadTypeVar.get(),
						tags:['public'],
					},
					function(err,res) {
						if (err) {
							console.log(err);
						} else {
							res.cloud_name = $.cloudinary.config.cloud_name;
							res.folder = uploadTypeVar.get();
							res.aplicativoId = aplicativoId;
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
		},
		'click #rebuildCloudinary':function(e,t){
			htmlConfirm('Aviso','Você tem certeza?<br>Todas as imagens serão recuperadas da conta Cloudinary do App Padrão.',function(){
				Meteor.call("rebuildCloudinaryPub", function(error, result){
					if(error){
						console.log("error", error);
					}
					if(result){
						Bert.alert('Foram recuperados '+result.saved+' documentos de um total de '+result.returned+'.','success');
					}
				});
			});
		},
		'click .arquivoRemoveEvent':function(e,t){
			var me = this;
			htmlConfirm('Aviso','Você tem certeza?',function(){
				Cloudinary.delete(me.public_id,function(err,result){
					if (err) {
						console.log(err);
					} else {
						$('#imageColumn_'+me._id).transition('fade out');
						Arquivo.remove(me._id,function(error, result){
							if(error){
								console.log("error", error);
							}
							if(result){
								Bert.alert('Arquivo excluído com sucesso','success');
							}
						});
					}
				});
			});
		}
	}
});
