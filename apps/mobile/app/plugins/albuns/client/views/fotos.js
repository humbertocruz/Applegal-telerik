Controller('fotosView',{
	created:function(){
		imageZoomVar = new ReactiveVar();
		Tracker.autorun(function(){
			var albumId = FlowRouter.getParam('id');
			var aplicativoId = aplicativoIdVar.get();
			albumFotos = Meteor.subscribe('oneAlbum',albumId,aplicativoId);
		});
		backBtnRouteVar.set({
			route:'albunsRoute',
			params:{}
		});
	},
	rendered:function(){
		$('.fotos').transition({
			animation: 'fade in',
			durantion: 500,
			interval: 100
		});
	},
	helpers:{
		album:function(){
			return Album.findOne(FlowRouter.getParam('id'));
		},
		fotos:function(){
			var alb = Album.findOne(FlowRouter.getParam('id'));
			if(!alb) return false;
			return alb.fotos();
		},
		hasLiked:function(){
			if (!imageZoomVar.get()) return false;
			return _.contains(userLikesVar.get(),imageZoomVar.get()._id);
		},
		imageZoom:function(){
			return imageZoomVar.get();
		}
	},
	events:{
		'click #imageZoom':function(e,t){
			$('#imageZoomModal').modal('hide');
		},
		'click .fotos img':function(e,t){
			var me = this;
			var foto = $(e.currentTarget);
			imageZoomVar.set(me);
			$('#imageZoom').attr('src',foto.attr('src'));
			$('#imageZoomModal').modal({
				onApprove:function(){
					var likes = me.likes;
					if (!likes) likes = 0;
					var likes = parseInt(likes) + 1;
					Meteor.call("like", me._id, function(error, result){
						if(error){
							console.log("error", error);
						}
						if(result){
							$('#imageZoomModal').modal('hide');
							userLikesVar.get().push(me._id);
							imageZoomVar.set();
							Bert.alert('Obrigado pelo "Like"!','success');
						}
					});
				}
			}).modal('show');
		}
	}
});
