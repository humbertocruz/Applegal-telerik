Controller('uploadStatus',{
	created:function(){
		uploadStatusVar = new ReactiveVar(false);
		Tracker.autorun(function(){
			var stat = uploadStatusVar.get();
			if (stat){
				var rest = Cloudinary.collection.find({status:'uploading'}).count();
				if (rest == 0) {
					Cloudinary.collection.remove({});
					uploadStatusVar.set(false);
				}
			}
		});
	},
	rendered:function(){
	},
	helpers:{
		isUploading:function(){
			var count = Cloudinary.collection.find({status:'uploading'}).count();
			if (count > 0) {
				uploadStatusVar.set(true);
			}
			return count > 0;
		},
		restantes:function(){
			return Cloudinary.collection.find({status:'uploading'}).count();
		},
		total:function(){
			return Cloudinary.collection.find().count();
		}
	}
});
