Controller('aplicativosPluginsView',{
	created:function(){
		Meteor.call("setServerAppId", FlowRouter.getParam('aplicativoId'));
		updatePluginVar = new ReactiveVar(false);
		subMenuTitleVar.set({
			title:'Plugins',
			icon:'puzzle'
		});
	},
	rendered:function(){
		$('#addAppPlugin').popup({
			inline:true,
			hoverable:true,
			position: 'right center'
		});
		$('.ui.checkbox').checkbox();
	},
	helpers:{
		updateModulo:function(){
			return updatePluginVar.get();
		},
		isModAdmin:function(){
			if (Roles.userIsInRole(Meteor.userId(),'admin')) return true;
			return false;
		},

		plugins_disponiveis:function(){
			var app = Aplicativo.findOne(FlowRouter.getParam('aplicativoId'));
			if (!app) return false;
			var plugAtivos = _.pluck(app.appPlugins(),'pluginId');
			var plugins = Plugin.find({_id:{$nin:plugAtivos}}).fetch();
			return plugins;
		},
		plugins_ativos:function(){
			var app = Aplicativo.findOne(FlowRouter.getParam('aplicativoId'));
			if (!app) return false;
			return app.appPlugins();
		}
	},
	events:{
		'click .activeEvent':function(e,t){
			Meteor.call("aplicativosActivePlugin", this._id, this.active, function(error, result){ 
				if(error){
					console.log("error", error);
				}
				if(result){

				}
			});
		},
		'click .removeEvent':function(e,t){
			e.preventDefault();
			var me = this;
			htmlConfirm('Remover Módulo','Você tem Certeza?',function(){
				Meteor.call("aplicativosRemovePlugin", FlowRouter.getParam('aplicativoId'), me.pluginId, function(error, result){
					if(error){
						console.log("error", error);
					}
					if(result){
						Bert.alert('Plugin removido com sucesso.','success');
					}
				});
			});
		},
		'submit #appPluginForm':function(e,t){
			var me = this;
			e.preventDefault();
			var fields = $('#appPluginForm').form('get values');
			fields._id = updatePluginVar.get();
			fields.aplicativoId = FlowRouter.getParam('aplicativoId');
			fields.active = false;
			Meteor.call("aplicativosUpdatePlugin", fields, function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					Bert.alert('Plugin Adicionado com sucesso!','success');
				}
			});
		},
		'click .updatePlugin':function(e,t){
			var me = this;
			e.preventDefault();
			updatePluginVar.set(me._id);
			var fields = AplicativoPlugin.findOne(me._id);
			$('#appPluginForm').form('set values',fields);
		},
		'click .addPluginEvent':function(e,t){
			e.preventDefault();
			var me = this;
			if (!Roles.userIsInRole(Meteor.userId(),'admin')) return false;
			$('#addAppPlugin').popup('hide');
			htmlConfirm('Adicionar Módulo','Você tem Certeza?',function(){
				var fields = {
					aplicativoId:FlowRouter.getParam('aplicativoId'),
					pluginId: me._id
				}
				Meteor.call("aplicativosAddPlugin", fields, function(error, result){
					if(error){
						console.log("error", error);
					}
					if(result){
						Bert.alert('Plugin Adicionado com sucesso!','success');
					}
				});
			});
		}
	}
});
