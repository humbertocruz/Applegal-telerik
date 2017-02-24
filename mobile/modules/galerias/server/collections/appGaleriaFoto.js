appGaleriaFoto.allow({
	// The creator of a file owns it. UserId may be null.
	insert: function (userId, file) {
		return false;
	},
	// Only owners can remove a file
	remove: function (userId, file) {
		return false;
	},
	// Only owners can retrieve a file via HTTP GET
	read: function (userId, file) {
		//return (userId === file.metadata.owner);
		return true;
	},
	// This rule secures the HTTP REST interfaces' PUT/POST
	// Necessary to support Resumable.js
	write: function (userId, file, fields) {
		// Only owners can upload file data
		return false;
	}
});
