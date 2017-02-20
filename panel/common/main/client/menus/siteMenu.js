Controller('siteMenu', {
	helpers: {
		userId: function() {
			return Meteor.userId();
		}
	}
});
