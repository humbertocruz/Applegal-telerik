Template.registerHelper("resume", function(text, count){
	var ret = _.stripTags(text);
	var pru = _.prune(ret,count);
	return pru;
});
