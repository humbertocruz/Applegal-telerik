Aplicativo = new Mongo.Collection('aplicativos');
Aplicativo.helpers({
	modulos:function(){
		return AplicativoModulo.find({
			aplicativoId:this._id
		}).fetch();
	},
	appLogo:function(){
		return appLogo.findOne({
			'metadata.aplicativoId':this._id
		});
	},
	appBg:function(){
		return appBg.findOne({
			'metadata.aplicativoId':this._id
		});
	}
});
