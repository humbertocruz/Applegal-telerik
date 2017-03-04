Template.registerHelper("addClassIf", function(retClass,var1,var2,op){
	if (!op) op = 'eq';
	if (op == 'eq')
		if (var1 == var2) return retClass;
		else return '';
	if (op == 'ne')
		if (var1 != var2) return retClass;
		else return '';
	if (op == 'gt')
		if (var1 > var2) return retClass;
		else return '';
	if (op == 'lt')
		if (var1 < var2) return retClass;
		else return '';
});
