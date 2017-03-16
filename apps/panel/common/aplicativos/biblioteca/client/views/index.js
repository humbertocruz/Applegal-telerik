Controller('aplicativosBibliotecaView',{
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
		publicityVar = new ReactiveVar('private');
		if (FlowRouter.getRouteName() == 'aplicativosBibliotecaRoute') {
			Tracker.autorun(function(){
				var page = FlowRouter.getQueryParam('page');
				var aplicativoId = FlowRouter.getParam('aplicativoId');
				appBiblioteca = Meteor.subscribe("appBiblioteca", page, aplicativoId, 12);
			});
		}
	},
	rendered:function(){

	},
	helpers:{
		ready:function(){
			return appBiblioteca.ready();
		},
		/*uploads:function(){
			var arquivos = Cloudinary.collection.find({
				status:'uploading'
			});
			return {
				data:arquivos.fetch(),
			};
		},*/
		biblioteca:function(){
			var qtd = 12;
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			var biblioteca = Biblioteca.find({},{
				limit:12
			});
			var data = biblioteca.fetch();
			return {
				page:page,
				count:Counts.get('appBiblioteca'),
				data:data,
				pages:Math.ceil(Counts.get('appBiblioteca')/qtd)
			}
		}
	},
	events:{
		'click #prevPageEvent':function(e,t){
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			if (page == 1) return false;
			page--;
			FlowRouter.go(FlowRouter.getRouteName(),{aplicativoId:FlowRouter.getParam('aplicativoId')},{page:page});
		},
		'click #nextPageEvent':function(e,t){
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			var maxPages = Math.ceil(Counts.get('appBiblioteca')/12);
			if (page == maxPages) return false;
			page++;
			FlowRouter.go(FlowRouter.getRouteName(),{aplicativoId:FlowRouter.getParam('aplicativoId')},{page:page});
		},
		'click .useOnAppEvent':function(e,t){
			var me = this;
			htmlConfirm('Aviso','Você tem certeza?',function(){
				var doc = me.public_id;
				if (_.contains(me.tags,'wallpaper')) {
					var data = {
						_id:FlowRouter.getParam('aplicativoId'),
						appBg:doc
					};
				}
				if (_.contains(me.tags,'logotype')) {
					var data = {
						_id:FlowRouter.getParam('aplicativoId'),
						appLogo:doc
					};
				}
				Meteor.call("aplicativosForm", data, function(error, result){
					if(error){
						console.log("error", error);
					}
					if(result){
						Bert.alert('Aplicativo alterado com sucesso.','success');
					}
				});
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
		'click .uploadEvent':function(e,t){
			uploadTypeVar.set($(e.currentTarget).data('value'));
			$('#uploadField').click();
		},
		'change #publicityField':function(e,t){
			publicityVar.set($(e.currentTarget).val());
		},
		'change #uploadField': function(e) {
			var files = e.currentTarget.files;
			_.each(files,function(ff,idx){
				Cloudinary.upload(ff,
					{
						folder:uploadTypeVar.get(),
						tags:[uploadTypeVar.get(),publicityVar.get()]
					},
					function(err,res) {
						if (err) {
							console.log(err);
						} else {
							res.cloud_name = $.cloudinary.config.cloud_name;
							res.aplicativoId = FlowRouter.getParam('aplicativoId');
							Biblioteca.insert(res);
						}
					}
				);
			});
		},
		'click .RemoveEvent':function(e,t){
			var me = this;
			htmlConfirm('Aviso','Você tem certeza?',function(){
				Cloudinary.delete(me.public_id,function(err,result){
					if (err) {
						console.log(err);
					} else {
						Biblioteca.remove(me._id,function(error, result){
							if(error){
								console.log("error", error);
							}
							if(result){
								Bert.alert('Documento excluído com sucesso','success');
							}
						});
					}
				});
			});
		}
	}
});
