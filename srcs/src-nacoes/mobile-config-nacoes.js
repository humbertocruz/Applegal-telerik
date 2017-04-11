App.info({
	id: 'br.com.technotronics.igreja',
	name: 'Escola das Nações',
	description: "Escola das Nações",
	author: 'Humberto Cruz',
	email: 'humberto.cruz@gmail.com',
	website: 'https://applegal.com.br',
	version: '0.2.2'
});
App.icons({
	'android_mdpi': '../../srcs/src-nacoes/Android/res/drawable-mdpi/icon.png',
	'android_hdpi': '../../srcs/src-nacoes/Android/res/drawable-hdpi/icon.png',
	'android_xhdpi': '../../srcs/src-nacoes/Android/res/drawable-xhdpi/icon.png',
	'android_xxhdpi': '../../srcs/src-nacoes/Android/res/drawable-xxhdpi/icon.png',
	'android_xxxhdpi': '../../srcs/src-nacoes/Android/res/drawable-xxxhdpi/icon.png',
	'iphone_2x': '../../srcs/src-nacoes/iOS/Resources/icons/icon-60@2x.png',
	'iphone_3x': '../../srcs/src-nacoes/iOS/Resources/icons/icon-60@3x.png',
});
App.launchScreens({
	'android_mdpi_portrait': '../../srcs/src-nacoes/Android/res/drawable-mdpi/screen.png',
	'android_hdpi_portrait': '../../srcs/src-nacoes/Android/res/drawable-hdpi/screen.png',
	'android_xhdpi_portrait': '../../srcs/src-nacoes/Android/res/drawable-xhdpi/screen.png',
	'android_xxhdpi_portrait': '../../srcs/src-nacoes/Android/res/drawable-xxhdpi/screen.png',
	'iphone_2x': '../../srcs/src-nacoes/iOS/Resources/splash/Default@2x~iphone_640x960.png',
	'iphone5': '../../srcs/src-nacoes/iOS/Resources/splash/Default-568h@2x~iphone_640x1136.png',
	'iphone6': '../../srcs/src-nacoes/iOS/Resources/splash/Default-750@2x~iphone6-landscape_1334x750.png',
});

App.setPreference('android-minSdkVersion', '19');
App.setPreference('BackgroundColor', '0xffffffff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'portrait');
App.setPreference('EnableWebGL', true);
//App.setPreference('StatusBarOverlaysWebView', 'true');
//App.setPreference('StatusBarBackgroundColor', 'transparent');

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
