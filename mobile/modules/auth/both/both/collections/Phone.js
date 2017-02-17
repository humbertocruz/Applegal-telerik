Phone = new Mongo.Collection('phones');
Phone.allow({
	insert: function(){
		return true;
	}
});
