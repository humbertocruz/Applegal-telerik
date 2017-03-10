Controller('aplicativosArquivosView',{
	created:function() {
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

		arquivosSearchVar = new ReactiveVar({});
		Tracker.autorun(function(){
			var page = FlowRouter.getQueryParam('page');
			var search = arquivosSearchVar.get();
			var aplicativoId = FlowRouter.getParam('aplicativoId');
			Meteor.subscribe("appArquivos", page, aplicativoId);
			Meteor.subscribe("AppCloudinary", aplicativoId);
		});
	},
	rendered:function(){
		$('.ui.dropdown').dropdown();
		AppCloudinary.find({
			aplicativoId:FlowRouter.getParam('aplicativoId')
		}).observe({
			added:function(appC){
				$('#cloudinaryForm').form('set values',appC);
			}
		})
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
					},{
						tags:{
							$all:[
								FlowRouter.getParam('aplicativoId'),
								'noticia'
							]
						}
					}
				]
			},{
				limit:8
			});
			return {
				page:page,
				count:Counts.get('appArquivos'),
				data:arquivos.fetch(),
				pages:Math.ceil(Counts.get('appArquivos')/qtd)
			}
		},
		cl:function(){
			return cloudinary.Cloudinary.new({cloud_name:'technotronics'});
		}
	},
	events:{
		'submit #cloudinaryForm':function(e,t){
			e.preventDefault();
			var fields = $(e.currentTarget).form('get values');
			fields.aplicativoId = FlowRouter.getParam('aplicativoId');
			Meteor.call("configCloudinary", fields, function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					Bert.alert('Repositório de Arquivos configurado com sucesso','success');
				}
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
