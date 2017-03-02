Meteor.publishComposite('allArquivos', function (search,page) {
	if (!page) page = 1;
	if (!search) search = {};
	//if (!search.metadata) search.metadata = {};
	search['metadata.public'] = true;
	var pages = 10;
	return {
		find:function(){
			Counts.publish(this, 'allArquivos', Arquivo.find(search), {
				noReady: true
			});
			return Arquivo.find(search,{
				limit:pages,
				skip: (page - 1) * pages
			});
		}
	}
});
