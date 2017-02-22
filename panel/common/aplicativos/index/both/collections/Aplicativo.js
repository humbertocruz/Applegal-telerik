Aplicativo = new Mongo.Collection('aplicativos');
Aplicativo.helpers({
	appModulos:function(){
		return AplicativoModulo.find({
			aplicativoId:this._id
		},{
			sort:{
				order:1
			}
		}).fetch();
	},
	appLogo:function(){
		return appLogo.findOne({'metadata.aplicativoId':this._id});
	},
	appBg:function(){
		return appBg.findOne({'metadata.aplicativoId':this._id});
	}
});
