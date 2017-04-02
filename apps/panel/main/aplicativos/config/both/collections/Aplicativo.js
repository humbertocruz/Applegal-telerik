Aplicativo = new Mongo.Collection('app_aplicativos');
Aplicativo.helpers({
	appPlugins:function(){
		return AplicativoPlugin.find({
			aplicativoId:this._id
		},{
			sort:{
				order:1
			}
		}).fetch();
	}
});
