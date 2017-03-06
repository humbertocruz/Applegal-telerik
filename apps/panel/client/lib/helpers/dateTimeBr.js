Template.registerHelper("dateTimeBr", function(date){
	if (!date) return '--xx--';
	var date = moment(new Date(date));
	return date.format('DD/MM/YYYY HH:mm');
});
