Template.registerHelper("gravatar", function(emails){
	if (!emails) var email = '';
	else var email = emails[0].address; // Primeiro email
	var opt = {
		secure:true,
		default:'mm'
	};
	var url = Gravatar.imageUrl(email,opt);
	return url;
});
