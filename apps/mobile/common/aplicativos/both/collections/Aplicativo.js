Aplicativo = new Mongo.Collection('aplicativos');
Aplicativo.helpers({
	modulos:function(){
		return AplicativoPlugin.find({
			aplicativoId:this._id
		}).fetch();
	}
});
