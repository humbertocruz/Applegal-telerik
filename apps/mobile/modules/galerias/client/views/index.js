Controller('galeriasView',{
	created:function(){
		topTitleVar.set('Galeria de Fotos');
		backBtnRouteVar.set({
			route:'homeRoute',
			params:{}
		});
		Tracker.autorun(function(){
			var app = Aplicativo.findOne();
			if (!app) return false;
			Meteor.subscribe("appGalerias", app._id);
		});
	},
	rendered:function(){

	},
	helpers:{
		fotoCapaPath:function(){
			var foto = appGaleriaFoto.findOne(this.capa_id);
			if (!foto) return false;
			return '/gridfs/galeria_fotos/md5/'+foto.md5;
		},
		galerias:function(){
			var galerias = Galeria.find({},{sort:{date:-1}});
			return {
				data:galerias.fetch(),
				count:galerias.length
			}
		}
	},
	events:{
	}
});
