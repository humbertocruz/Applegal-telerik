App.info({
	id: 'br.com.gremiopioneiro.gremio',
	name: 'Grêmio Pioneiro',
	description: "Grêmio Pioneiro",
	author: 'Humberto Cruz',
	email: 'humberto.cruz@gmail.com',
	website: 'https://applegal.com.br',
	version: '0.3.1'
});
App.icons({
	'android_mdpi': '../../../src-gremio/Android/res/drawable-mdpi/icon.png',
	'android_hdpi': '../../../src-gremio/Android/res/drawable-hdpi/icon.png',
	'android_xhdpi': '../../../src-gremio/Android/res/drawable-xhdpi/icon.png',
	'android_xxhdpi': '../../../src-gremio/Android/res/drawable-xxhdpi/icon.png',
	'android_xxxhdpi': '../../../src-gremio/Android/res/drawable-xxxhdpi/icon.png'
});
App.launchScreens({
	'android_mdpi_portrait': '../../../src-gremio/Android/res/drawable-mdpi/screen.png',
	'android_hdpi_portrait': '../../../src-gremio/Android/res/drawable-hdpi/screen.png',
	'android_xhdpi_portrait': '../../../src-gremio/Android/res/drawable-xhdpi/screen.png',
	'android_xxhdpi_portrait': '../../../src-gremio/Android/res/drawable-xxhdpi/screen.png'
});
App.setPreference('android-minSdkVersion', '19');
App.setPreference('BackgroundColor', '0xffffffff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'portrait');
App.setPreference('EnableWebGL', true);
App.setPreference('StatusBarOverlaysWebView', 'true');
App.setPreference('StatusBarBackgroundColor', 'transparent');

App.configurePlugin('phonegap-plugin-push', {
	SENDER_ID: 1000788241076
});

// Acesso as imagens GridFS
App.accessRule('*', true)
App.accessRule('blob:*')
App.accessRule('data:*', { type: 'navigation' })
// Permite acesso a alguns sites importantes e uteis
App.accessRule('https://res.cloudinary.com/*');
App.accessRule('https://panel.applegal.com.br/*');
App.accessRule('https://m.facebook.com/*');
App.accessRule('https://facebook.com/*');
App.accessRule('https://plus.google.com/*');
App.accessRule('https://www.youtube.com/*');
App.accessRule('https://youtube.com/*');
App.accessRule('http://*');
App.accessRule('https://*');
