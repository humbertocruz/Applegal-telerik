Template.registerHelper('firstRole',function(roles){
	if (_.size(roles)==0) return false;
	return roles[0];
});

Template.registerHelper('firstEmail',function(emails){
	if (_.size(emails)==0) return false;
	return emails[0].address;
});
