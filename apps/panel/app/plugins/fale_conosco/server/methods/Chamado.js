Meteor.methods({
	chamadosCtrl: function(id, status,aplicativoId) {
		return Chamado.update({
			_id:id,
			aplicativoId:aplicativoId
		}, {
			$set: {
				close: !status
			}
		});
	},
	startChamado: function(userId,aplicativoId) {
		var fields = {
			user_id: userId,
			manager_id: this.userId,
			date: moment().toDate(),
			close: false,
			aplicativoId:aplicativoId
		};
		return Chamado.insert(fields);
	},
});
