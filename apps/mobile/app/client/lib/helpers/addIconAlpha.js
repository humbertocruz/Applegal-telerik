Template.registerHelper("addIconAlpha", function(e){
	console.log('#icon_'+e);
	console.log($('#icon_'+e).css('backgroundColor'));
	//return 'background-color:rgba(0,0,0,.5) !important;';
	return '';
});
