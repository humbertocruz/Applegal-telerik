Controller('aniversariantesView',{
	created:function(){
		backBtnRouteVar.set({
			route:'homeRoute',
			params:{}
		});
		topTitleVar.set('Aniversariantes');
		Meteor.subscribe("appAniversariantes", Aplicativo.findOne()._id);
	},
	rendered:function(){
	},
	helpers:{
		aniversariantes:function(){
			var anivers = Meteor.users.find({},{sort:{'profile.birth_day':1}}).fetch();
			var anivers2 = [];
			var month = parseInt(moment().format('MM'));
			// recria lista para eliminar usuario logado' se necessário
			_.each(anivers,function(aniv){
				if (aniv.profile.birth_month == month) {
					anivers2.push(aniv);
				}
			});
			return {
				data:anivers2,
				count:anivers2.length
			}
		}
	},
	events:{
	}
});
