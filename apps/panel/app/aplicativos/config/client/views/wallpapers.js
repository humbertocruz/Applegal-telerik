Controller('pubWallpapersView',{
	created:function() {
		var me = this;
		me.currentPage = function(){return FlowRouter.getQueryParam('page');};
		me.autorun(function(){
			pubBiblioteca = me.subscribe("pubGaleria", me.currentPage(), 12, ['wallpaper']);
		});
	},
	rendered:function(){
	},
	helpers:{
		galeria:function(){
			if (!pubBiblioteca.ready()) return [];
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
			var data = {
				page:page,
				count:Counts.get('pubGaleria'),
				data:galeria.fetch(),
				pages:Math.ceil(Counts.get('pubGaleria')/12)
			};
			console.log(data);
			return data;
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
