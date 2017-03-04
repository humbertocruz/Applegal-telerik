Meteor.startup(function(){
	Accounts.emailTemplates.siteName = "AppLegal";
	Accounts.emailTemplates.from = "AppLegal <admin@applegal.com.br>";
	Accounts.emailTemplates.resetPassword.from = function () {
		return "Resetar senha <admin@applegal.com.br>";
	};
});
