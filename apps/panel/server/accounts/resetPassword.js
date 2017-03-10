Accounts.emailTemplates.siteName = "AppLegal";
Accounts.emailTemplates.from = "Suporte <surpote@applegal.com.br>";
Accounts.emailTemplates.resetPassword.subject = function (user) {
	return "Reset da senha para " + user.profile.name;
};
Accounts.emailTemplates.resetPassword.text = function (user, url) {
	return "Você solicitou o \"reset\" da sua senha!\n\n"
		+ " Clique no link abaixo para criar uma nova:\n\n"
		+ url;
};
Accounts.emailTemplates.resetPassword.from = function () {
	// Overrides value set in Accounts.emailTemplates.from when resetting passwords
	return "Suporte Applegal <suporte@applegal.com.br>";
};
