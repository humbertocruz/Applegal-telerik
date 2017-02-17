Meteor.publish('', function(){
	var search = {
		'profile.birth_month':parseInt(moment().format('MM')),
		'profile.active':true
	};
	var aniversariantes = Meteor.users.find(
		search,
		{
			sort:{
				'profile.birth_day':1
			},
			fields: {
				'profile.name': 1,
				'profile.birth': 1
			}
		});
	return aniversariantes;
});
