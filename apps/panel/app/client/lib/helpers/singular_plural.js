Template.registerHelper("singular_plural", function(val,singular,plural){
	if (val == 1) return val+' '+singular;
	else return val+' '+plural;
});
