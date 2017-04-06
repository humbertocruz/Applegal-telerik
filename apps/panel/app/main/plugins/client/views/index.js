Controller('pluginsView',{
	created:function() {
		var me = this;
		subMenuTitleVar.set({
			title:'Plugins',
			icon:'puzzle'
		});
		me.autorun(function(){
			allPlugins = me.subscribe("allPlugins", {
				page:FlowRouter.getQueryParam('page'),
				aplicativoId: FlowRouter.getParam('aplicativoId')
			});
		});
	},
	helpers:{
		plugins:function(){
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			var qtd = 10;
			var plugins = Plugin.find({

			},{
				limit:qtd,
				sort:{
					title:1
				}
			}).fetch();

			return {
				page:page,
				count:Counts.get('allPlugins'),
				data:plugins,
				pages:Math.ceil(Counts.get('allPlugins')/qtd)
			}
		}
	},
	events:{
		'click .removeBtn':function(e,t){
			var me = this;
			htmlConfirm('Aviso','Você tem certeza?',function(){
				Meteor.call("pluginsRemove", me._id, function(error, result){
					if(error){
						console.log("error", error);
					}
					if(result){
						Bert.alert('Plugin excluído com sucesso','success');
					}
				});
			});
		}
	}
});
