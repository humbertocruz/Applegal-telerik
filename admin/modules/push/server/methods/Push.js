Meteor.methods({
	pushTest:function(){
		var push = Push.send({
		from: 'Gremio',
		title: 'Grêmio Pioneiro',
		text: 'Nova Galeria de Fotos!',
		gcm: {
			// gcm specific overwrites
			image: 'https://admin.gremiopioneiro.com.br/fotoDaGaleria/ZyDsoKgiwAHGK8jZt'
		},
		count: 1,
		query: {}
		});
		return true;
	},
	pushSend:function(obj){
		if (obj.userId) {
			query = {
				userId:obj.userId
			};
		} else {
			query = {};
		}
		var push = Push.send({
			from: obj.from,
			title: obj.title,
			text: obj.text,
			count: 1,
			query: query
		});
		return push;
	}

});
