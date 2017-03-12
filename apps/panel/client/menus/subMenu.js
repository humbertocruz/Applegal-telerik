Controller('subMenu',{
	events:{
		'click #headerSaveEvent':function(e,t){
			var save = headerSaveVar.get();
			save(e,t);
		}
	}
})
