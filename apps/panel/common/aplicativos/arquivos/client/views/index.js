Controller('aplicativosArquivosView',{
	created:function() {
		subMenuTitleVar.set({
			title:'Arquivos do Aplicativo',
			icon:'file'
		});
		Meteor.call("setServerAppId", FlowRouter.getParam('aplicativoId'));
		// Monitora os arquivos enviados
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
			var aplicativoId = FlowRouter.getParam('aplicativoId');
			Meteor.subscribe("appArquivos", page, aplicativoId);
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
		extraLinks:function(){
			return [
				{
					title:'Enviar Arquivo',
					icon:'upload',
					id:'enviarArquivoEvent'
				}
			]
		},
		uploads:function(){
			var arquivos = Cloudinary.collection.find({
				status:'uploading'
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
				tags:{
					$in:[
						'logotype',
						'wallpaper',
						'noticia',
						'documento',
						'galeria',
						'enquete'
					]
				}
			},{
				limit:8
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
		'click .arquivoBackgroudEvent':function(e,t){
			console.log('change bg');
			var bg = this.public_id;
			Meteor.call("aplicativosForm", {_id:FlowRouter.getParam('aplicativoId'), appBg:bg}, function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					Bert.alert('Fundo do Aplicativo alterado com sucesso.','success');
				}
			});
		},
		'click .arquivoLogotypeEvent':function(e,t){
			var lg = this.public_id;
			console.log(lg);
			Meteor.call("aplicativosForm", {_id:FlowRouter.getParam('aplicativoId'), appLogo:lg}, function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					Bert.alert('Logotipo do Aplicativo alterado com sucesso.','success');
				}
			});
		},
		'click #rebuildCloudinary':function(e,t){
			htmlConfirm('Aviso','Você tem certeza?<br>Todas as imagens serão recuperadas da conta Cloudinary.',function(){
				Meteor.call("rebuildCloudinary", FlowRouter.getParam('aplicativoId'), function(error, result){
					if(error){
						console.log("error", error);
					}
					if(result){
						Bert.alert('Foram recuperados '+result.saved+' documentos de um total de '+result.returned+'.','success');
					}
				});
			});
		},
		'click .removePreviewEvent':function(e,t){
			Cloudinary.collection.remove(this._id);
		},
		'click .uploadEvent':function(e,t){
			uploadTypeVar.set($(e.currentTarget).data('value'));
			$('#uploadField').click();
		},
		'change #uploadField': function(e) {
			var files = e.currentTarget.files;
			_.each(files,function(ff,idx){
				Cloudinary.upload(ff,
					{
						folder:FlowRouter.getParam('aplicativoId'),
						tags:[uploadTypeVar.get(),FlowRouter.getParam('aplicativoId')],
					},
					function(err,res) {
						if (err) {
							console.log(err);
						} else {
							res.cloud_name = $.cloudinary.config.cloud_name;
							Arquivo.insert(res);
						}
					}
				);
			});
		},
		'click .arquivoRemoveEvent':function(e,t){
			var me = this;
			htmlConfirm('Aviso','Você tem certeza?',function(){
				Cloudinary.delete(me.public_id,function(err,result){
					if (err) {
						console.log(err);
					} else {
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
