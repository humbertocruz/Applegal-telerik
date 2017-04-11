Template.registerHelper("compare", function(val1,tipo,val2){
	if (tipo == 'eq') return val1 == val2;
	if (tipo == 'neq') return val1 != val2;
	if (tipo == 'lt') return val1 < val2;
	if (tipo == 'lte') return val1 <= val2;
	if (tipo == 'gt') return val1 > val2;
	if (tipo == 'gte') return val1 >= val2;
	if (tipo == 'true') return val1 == true;
	if (tipo == 'false') return val1 == false;
});
