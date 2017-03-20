Meteor.methods({
	rebuildPubCloudinary: function(){
		Future = Npm.require('fibers/future');
		var myFuture = new Future();

		// Remover Arquivos do App
		PubGaleria.remove({});
		// Lê Arquivos da conta Cloudinary
		Cloudinary.api.resources(Meteor.bindEnvironment(function(result){
			var saved = 0;
			// Para cada arquivo, grava um registro local
			_.each(result.resources,function(document){
				if (!_.contains(document.tags,'wallpaper')) return;
				document.cloud_name = Cloudinary.config().cloud_name;
				PubGaleria.insert(document);
				saved++;
			});
			// Retorna as informações dos dados salvos
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
	setPubCloudinary:function(){
		if (!this.userId) return 'technoapp';
		var options = Option.findOne();
		Cloudinary.config({
			cloud_name: options.cloud_name,
			api_key: options.api_key,
			api_secret: options.api_secret
		});
		return options.cloud_name;
	}
});
