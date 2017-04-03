Template.registerHelper("addClassIf", function(retClass,var1,var2,op){
	if (!op) op = 'eq';
	if (op == 'eq')
		if (var1 == var2) return retClass;
	if (op == 'ne')
		if (var1 != var2) return retClass;
	if (op == 'gt')
		if (var1 > var2) return retClass;
	if (op == 'lt')
		if (var1 < var2) return retClass;
	if (op == 'empty')
		if (_.isEmpty(var1)) return retClass;
	if (op == '!empty')
		if (!_.isEmpty(var1)) return retClass;
	return '';
});
