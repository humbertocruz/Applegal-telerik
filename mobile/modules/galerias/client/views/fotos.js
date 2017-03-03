Controller('fotosView',{
	created:function(){
		Tracker.autorun(function(){
			galeriaFotos = Meteor.subscribe('oneGaleria',FlowRouter.getParam('id'),Aplicativo.findOne()._id);
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
			return Galeria.findOne(FlowRouter.getParam('id'))
		},
		fotos:function(){
			var gal = Galeria.findOne(FlowRouter.getParam('id'));
			if(!gal) return false;
			return gal.fotos();
		}
	},
	events:{
		'click .fotos':function(e,t){
			$(e.currentTarget).transition('jiggle');
		}
	}
});
