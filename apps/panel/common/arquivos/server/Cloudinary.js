Meteor.methods({
	setCloudinary:function(aplicativoId){
		if (!this.userId) return 'technotronics';
		if (!aplicativoId) return 'technotronics';
		var Cl = AppCloudinary.findOne({
			aplicativoId:aplicativoId
		});
		if (!Cl) return 'technotronics';

		needReconf = true;
		if (Cloudinary.config() && Cloudinary.config().cloud_name == Cl.cloud_name) needReconf = false;

		//else if (Cloudinary.config().cloud_name != Cl.cloud_name) needReconf = true;

		if (needReconf) {
			Cloudinary.config({
				cloud_name: Cl.cloud_name,
				api_key: Cl.api_key,
				api_secret: Cl.api_secret
			});
			console.log('Config Cloudinary: '+Cl.cloud_name);
			return Cl.cloud_name;
		} else {
			return 'technotronics';
		}

	}
});

Meteor.startup(function(){
	//Cloudinary.config({
	//	cloud_name: 'technotronics',
	//	api_key: '682511396465386',
	//	api_secret: 'DGYelhLmboXBQ2MvRlUI49kKU1o'
	//});
});
