Meteor.publish('allPlugins', function(data) {

	if (!securityCheck(this.userId,null,null)) return this.ready();
	if (!data.search) data.search = {};
	if (data._id) data.search = id;
	Counts.publish(this, 'allPlugins', Plugin.find(data.search), {
		noReady: true
	});
	var plugins = Plugin.find(data.search, {
		limit:10,
		skip:Math.ceil(data.page-1)*10,
		sort: {
			title: 1
		}
	});
	console.log(plugins.fetch());
	return [plugins];

});
