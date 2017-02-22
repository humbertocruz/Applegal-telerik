Meteor.methods({
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
