Controller('fotosView',{
	created:function(){
		Tracker.autorun(function(){
			galeriaFotos = Meteor.subscribe('oneGaleria',FlowRouter.getParam('id'),Aplicativo.findOne());
		});
	},
	helpers:{
		fotoPath:function(){
			var foto = appGaleriaFoto.findOne(this._id);
			if (!foto) return false;
			return '/gridfs/galeria_fotos/md5/'+foto.md5;
		},
		fotos:function(){
			var gal = Galeria.findOne();
			if(!gal) return false;
			return gal.fotos();
		}
	}
});
