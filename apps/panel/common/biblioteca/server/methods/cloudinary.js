Meteor.methods({
	rebuildCloudinaryPub: function(){
		if (_.isEmpty(Cloudinary.config())) return false;
		Future = Npm.require('fibers/future');
		var myFuture = new Future();
		var aplicativoId = Aplicativo.findOne({
			appInfoId:'br.com.applegal.applegal'
		})._id;
		// Remover Arquivos do App
		Arquivo.remove({
			aplicativoId:aplicativoId
		});
		Cloudinary.api.resources(Meteor.bindEnvironment(function(result){
			var saved = 0;
			_.each(result.resources,function(image){
				console.log(image);
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
});
