Meteor.publish('appAniversariantes', function(aplicativoId){
	var search = {
		'profile.birth_month':parseInt(moment().format('MM')),
		'roles':{
			$in:[aplicativoId]
		}
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
