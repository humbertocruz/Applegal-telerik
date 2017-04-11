App.info({
	id: 'br.com.technotronics.amme',
	name: 'AMME',
	description: "ACAO MISSIONARIA DOS MILITARES EVANGELICOS",
	author: 'Humberto Cruz',
	email: 'humberto.cruz@gmail.com',
	website: 'https://amme.technotronics.com.br',
	version: '0.2.0'
});
App.icons({
	'android_mdpi': '../../srcs/src-amme/Android/res/drawable-mdpi/icon.png',
	'android_hdpi': '../../srcs/src-amme/Android/res/drawable-hdpi/icon.png',
	'android_xhdpi': '../../srcs/src-amme/Android/res/drawable-xhdpi/icon.png',
	'android_xxhdpi': '../../srcs/src-amme/Android/res/drawable-xxhdpi/icon.png',
	'android_xxxhdpi': '../../srcs/src-amme/Android/res/drawable-xxxhdpi/icon.png'
});
App.launchScreens({
	'android_mdpi_portrait': '../../srcs/src-amme/Android/res/drawable-mdpi/screen.png',
	'android_hdpi_portrait': '../../srcs/src-amme/Android/res/drawable-hdpi/screen.png',
	'android_xhdpi_portrait': '../../srcs/src-amme/Android/res/drawable-xhdpi/screen.png',
	'android_xxhdpi_portrait': '../../srcs/src-amme/Android/res/drawable-xxhdpi/screen.png'
});
App.setPreference('android-minSdkVersion', '19');
App.setPreference('BackgroundColor', '0xffffffff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'portrait');
App.setPreference('EnableWebGL', true);
App.setPreference('StatusBarOverlaysWebView', 'true');
App.setPreference('StatusBarBackgroundColor', 'transparent');

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
