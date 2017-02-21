Aplicativo = new Mongo.Collection('aplicativos');
Aplicativo.helpers({
	appModulos:function(){
		return AplicativoModulo.find({
			aplicativoId:this._id
		}).fetch();
	},
	appLogo:function(){
		return appLogo.findOne({'metadata.aplicativoId':this._id});
	}
});
