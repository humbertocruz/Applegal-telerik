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
	},
	helpers:{
		updateModulo:function(){
			return updatePluginVar.get();
		},
		header:function(){
			return {
				title:'Plugins do Aplicativos',
				icon:'android'
			}
		},
		newLink:function(){
			return false;
		},
		isModAdmin:function(){
			if (Roles.userIsInRole(Meteor.userId(),'admin')) return true;
			return false;
		},
		extraLinks:function(){
			return [
				{
					title:'Retornar',
					route:'aplicativosRoute',
					icon:'close'
				}
			]
		},
		modulos_disponiveis:function(){
			var app = Aplicativo.findOne(FlowRouter.getParam('aplicativoId'));
			if (!app) return false;
			var plugAtivos = _.pluck(app.appPLugins(),'moduloId');
			var plugins = Plugin.find({_id:{$nin:PlugAtivos}}).fetch();
			return plugins;
		},
		modulos_ativos:function(){
			var app = Aplicativo.findOne(FlowRouter.getParam('aplicativoId'));
			if (!app) return false;
			return app.appPlugins();
		}
	},
	events:{
		'submit #appModuloForm':function(e,t){
			var me = this;
			e.preventDefault();
			var fields = $('#appPluginForm').form('get values');
			fields._id = updatePluginVar.get();
			fields.aplicativoId = FlowRouter.getParam('aplicativoId');
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
			updateModuloVar.set(me._id);
			var fields = AplicativoPlugin.findOne(me._id);
			$('#appPluginForm').form('set values',fields);
		},
		'click .addModulo':function(e,t){
			var me = this;
			if (!Roles.userIsInRole(Meteor.userId(),'admin')) return false;
			e.preventDefault();
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
