Aplicativo = new Mongo.Collection('aplicativos');
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
