Meteor.startup(function(){
	Accounts.emailTemplates.siteName = "Business App";
	Accounts.emailTemplates.from = "Business App <admin@technotronics.com.br>";
	Accounts.emailTemplates.resetPassword.from = function () {
		return "Resetar senha <admin@technotronics.com.br>";
	};
});
