Controller('fotosView',{
	created:function(){
		Tracker.autorun(function(){
			var galeriaId = FlowRouter.getParam('id');
			var aplicativoId = aplicativoIdVar.get();
			galeriaFotos = Meteor.subscribe('oneGaleria',galeriaId,aplicativoId);
		});
	},
	rendered:function(){
		$('.fotos').transition({
			animation: 'drop',
			durantion: 500,
			interval: 100
		});
	},
	helpers:{
		galeria:function(){
			return Galeria.findOne(FlowRouter.getParam('id'));
		},
		fotos:function(){
			var gal = Galeria.findOne(FlowRouter.getParam('id'));
			if(!gal) return false;
			return gal.fotos();
		}
	},
	events:{
		'click .fotos img':function(e,t){

		}
	}
});
