pushConfig = function(senderID) {
	Push.Configure({
		android: {
			senderID: senderID,
			alert: true,
			badge: true,
			sound: true,
			vibrate: true,
			clearNotifications: true
		},
		ios: {
			alert: true,
			badge: true,
			sound: true
		}
	});
}
