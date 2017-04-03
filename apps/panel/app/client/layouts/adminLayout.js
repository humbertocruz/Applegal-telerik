Controller('adminLayout', {
	created:function(){

	},
	rendered:function(){
		$('body').css(
			'backgroundColor',
			_.filter(semanticColors,function(e){return e.className == 'white';})[0].rgb
		);
	},
	helpers: {
	},
	events:{

	}
});
