AplicativoModulo = new Mongo.Collection('aplicativos_modulos');
AplicativoModulo.helpers({
	modulo:function(){
		return Modulo.findOne({
			_id:this.moduloId
		});
	},
	aplicativo:function(){
		return Aplicativo.findOne({
			_id:this.aplicativoId
		});
	}
});
