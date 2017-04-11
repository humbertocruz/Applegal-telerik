AplicativoPlugin = new Mongo.Collection('app_aplicativosPlugins');
AplicativoPlugin.helpers({
	plugin:function(){
		return Plugin.findOne({
			_id:this.pluginId
		});
	},
	aplicativo:function(){
		return Aplicativo.findOne({
			_id:this.aplicativoId
		});
	}
});
