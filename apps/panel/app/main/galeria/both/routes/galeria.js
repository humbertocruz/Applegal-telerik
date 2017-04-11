pubGaleriaRoutes = FlowRouter.group({
	name: 'pubGaleriaRoutes',
	prefix: '/galeria'
});

pubGaleriaRoutes.route('/galeria', {
	name: 'pubGaleriaRoute',
	triggersEnter:[
		function(r){
			Meteor.call('setPubCloudinary', function(err,result){
				if (result){
					$.cloudinary.init();
					$.cloudinary.config({
						cloud_name:result
					});
				}
			});
		}
	],
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenu',
			main: 'pubGaleriaView'
		});
	}
});
