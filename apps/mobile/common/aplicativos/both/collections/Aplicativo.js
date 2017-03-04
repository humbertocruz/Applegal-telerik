Aplicativo = new Mongo.Collection('aplicativos');
Aplicativo.helpers({
	modulos:function(){
		return AplicativoModulo.find({
			aplicativoId:this._id
		}).fetch();
	}
});
