Controller('pubWallpapersView',{
	created:function() {
		Tracker.autorun(function(){
			var page = FlowRouter.getQueryParam('page');
			pubBiblioteca = Meteor.subscribe("pubGaleria", page, 12, ['wallpaper']);
		});
	},
	rendered:function(){
	},
	destroyed:function(){
		pubBiblioteca.stop();
	},
	helpers:{
		galeria:function(){
			var qtd = 12;
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			var search = {
				tags:{
					$in:['wallpaper']
				}
			};
			var galeria = PubGaleria.find(search,{
				limit:12
			});
			var data = galeria.fetch();
			return {
				page:page,
				count:Counts.get('pubBiblioteca'),
				data:data,
				pages:Math.ceil(Counts.get('pubBiblioteca')/qtd)
			}
		}
	},
	events:{
		'click #prevPageEvent':function(e,t){
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			if (page == 1) return false;
			page--;
			FlowRouter.go(FlowRouter.getRouteName(),{aplicativoId:FlowRouter.getParam('aplicativoId'),public:FlowRouter.getParam('public')},{page:page});
		},
		'click #nextPageEvent':function(e,t){
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			var maxPages = Math.ceil(Counts.get('appBiblioteca')/12);
			if (page == maxPages) return false;
			page++;
			FlowRouter.go(FlowRouter.getRouteName(),{aplicativoId:FlowRouter.getParam('aplicativoId'),public:FlowRouter.getParam('public')},{page:page});
		},
		'click .useOnAppEvent':function(e,t){
			var me = this;
			htmlConfirm('Aviso','Você tem certeza?',function(){
				var doc = me.public_id;
				if (_.contains(me.tags,'wallpaper')) {
					var data = {
						_id:FlowRouter.getParam('aplicativoId'),
						wallpaper:{
							public_id:doc,
							cloud_name:me.cloud_name
						}
					};
				}
				if (_.contains(me.tags,'logotype')) {
					var data = {
						_id:FlowRouter.getParam('aplicativoId'),
						logotype:{
							public_id:doc,
							cloud_name:me.cloud_name
						}
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
		}
	}
});
