Meteor.methods({
	rebuildCloudinary: function(aplicativoId){
		Future = Npm.require('fibers/future');
		var myFuture = new Future();

		// Remover Arquivos do App
		Arquivo.remove({
			aplicativoId:aplicativoId
		});
		Cloudinary.api.resources(Meteor.bindEnvironment(function(result){
			var saved = 0;
			_.each(result.resources,function(image){
				if (image.tags.length > 0) {
					image.aplicativoId = aplicativoId;
					image.cloud_name = Cloudinary.config().cloud_name;
					Arquivo.insert(image);
					saved++;
				}
			});
			myFuture.return({
				saved:saved,
				returned:result.resources.length
			});
		}),{
			max_results:500,
			type:'upload',
			tags:true
		});
		return myFuture.wait();
	},
	setCloudinary:function(aplicativoId){
		if (!this.userId) return 'technotronics';
		if (!aplicativoId) return 'technotronics';
		var Cl = AppCloudinary.findOne({
			aplicativoId:aplicativoId
		});
		if (!Cl) return 'technotronics';

		needReconf = true;
		//if (Cloudinary.config() && Cloudinary.config().cloud_name == Cl.cloud_name) needReconf = false;

		//else if (Cloudinary.config().cloud_name != Cl.cloud_name) needReconf = true;

		if (needReconf) {
			Cloudinary.config({
				cloud_name: Cl.cloud_name,
				api_key: Cl.api_key,
				api_secret: Cl.api_secret
			});
			console.log('Config Cloudinary: '+Cl.cloud_name);
			return Cl.cloud_name;
		}

	},
	configCloudinary:function(fields){
		var config = AppCloudinary.findOne({
			aplicativoId:fields.aplicativoId
		});
		if (config) {
			return AppCloudinary.update(config._id,{
				$set:fields
			});
		} else {
			return AppCloudinary.insert(fields);
		}
	}
});
