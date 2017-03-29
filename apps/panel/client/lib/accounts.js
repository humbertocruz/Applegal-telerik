Accounts.onResetPasswordLink(function(token, done) {
    FlowRouter.go('passwordResetRoute', {
        token: token
    });
    done();
});
Accounts.onLogout(function() {
    FlowRouter.go('loginRoute');
    return true;
});
Accounts.onLogin(function() {
    Bert.alert('Login efeutado com sucesso!', 'success');
});
