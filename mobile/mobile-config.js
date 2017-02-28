App.info({
	id: 'br.com.applegal.gremio',
	name: 'AppLegal',
	description: "App Legal",
	author: 'Humberto Cruz',
	email: 'humberto.cruz@gmail.com',
	website: 'https://applegal.com.br',
	version: '0.0.1'
});
App.icons({
	'android_mdpi': '../../src/Android/res/drawable-mdpi/icon.png',
	'android_hdpi': '../../src/Android/res/drawable-hdpi/icon.png',
	'android_xhdpi': '../../src/Android/res/drawable-xhdpi/icon.png',
	'android_xxhdpi': '../../src/Android/res/drawable-xxhdpi/icon.png',
	'android_xxxhdpi': '../../src/Android/res/drawable-xxxhdpi/icon.png'
});
App.launchScreens({
	'android_mdpi_portrait': '../../src/Android/res/drawable-mdpi/screen.png',
	'android_hdpi_portrait': '../../src/Android/res/drawable-hdpi/screen.png',
	'android_xhdpi_portrait': '../../src/Android/res/drawable-xhdpi/screen.png',
	'android_xxhdpi_portrait': '../../src/Android/res/drawable-xxhdpi/screen.png'
});
App.setPreference('android-minSdkVersion', '16');
App.setPreference('BackgroundColor', '0xffffffff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'portrait');
App.setPreference('EnableWebGL', true);

App.configurePlugin('phonegap-plugin-push', {
	SENDER_ID: 862875202989
});

App.accessRule("blob:*");

// Permite acesso a alguns sites importantes e uteis
App.accessRule('https://m.facebook.com/*');
App.accessRule('https://facebook.com/*');
App.accessRule('https://plus.google.com/*');
App.accessRule('https://www.youtube.com/*');
App.accessRule('https://youtube.com/*');
