Controller('pluginsView',{
	created:function() {
		subMenuTitleVar.set({
			title:'Plugins',
			icon:'puzzle'
		});
	},
	helpers:{
		ready:function(){
			return true;
		},
		plugins:function(){
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			var qtd = 10;
			var plugins = Plugin.find({},{sort:{name:1}}).fetch();

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
