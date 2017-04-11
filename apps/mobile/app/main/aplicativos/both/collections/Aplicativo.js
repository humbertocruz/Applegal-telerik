Aplicativo = new Mongo.Collection('app_aplicativos');
Aplicativo.helpers({
	modulos:function(){
		return AplicativoPlugin.find({
			aplicativoId:this._id
		}).fetch();
	}
});
