AplicativoPlugin = new Mongo.Collection('aplicativos_plugins');
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
