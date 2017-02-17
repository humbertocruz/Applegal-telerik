Tracker.autorun(function() {
	publicFiliais = Filial.find({public:true}).fetch();
	ids = [];
	_.each(publicFiliais,function(fil){
		ids.push(fil._id);
	});
	ids.push(currentFilialVar.get());
	filialSearch = {
		filialId: {
			$in: ids
		}
	};
});
