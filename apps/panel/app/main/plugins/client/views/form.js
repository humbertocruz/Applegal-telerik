Controller('pluginsFormView',{
	created:function(){
		var me = this;
		subMenuTitleVar.set({
			title:'Plugins',
			icon:'puzzle'
		});
		if (id = FlowRouter.getParam('id')){
			me.autorun(function(){
				allPlugins = me.subscribe('allPlugins', {
					id:id
				});
				var plugin = Plugin.findOne(id);
				$('#pluginsForm').form('set values',plugin);
			});
		}
	},
	rendered:function(){
		$('.ui.checkbox').checkbox();
	},
	helpers:{
		header:function(){
			return {
				title:(FlowRouter.getParam('id')==undefined?'Inserir Plugin':'Editar Plugin'),
				icon:'puzzle',
				corner:'add'
			}
		}
	},
	events:{
		'submit #pluginsForm'(e,t){
			e.preventDefault();
			var fields = $(e.target).form('get values');
			var id = FlowRouter.getParam('id');
			if (id) fields._id = id;
			Meteor.call("pluginsForm",fields, function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					 Bert.alert('O plugin foi salvo com sucesso!','success');
					 FlowRouter.go('pluginsRoute')
				}
			});
		}
	}
});
