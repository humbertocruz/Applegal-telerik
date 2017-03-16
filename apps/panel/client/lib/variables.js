isLoadingVar = new ReactiveVar(false);
//adminIsLoginVar = new ReactiveVar(true);
flowRouterInit = new ReactiveVar(false);
tiposUploadArquivos = {
	logotype:'Logotipo',
	wallpaper:'Papel de Parede',
	photo:'Foto'
};
userRoles = {
	admin:{
		name:'Admin'
	},
	manager:{
		name:'Gerente'
	},
	guest:{
		name:'Visitante'
	},
	subscriber:{
		name:'Assinante'
	}
};

libTypes = {
	logotype:{
		name:'Logotipo',
		icon:'circle'
	},
	wallpaper:{
		name:'Papel de Parede',
		icon:'image'
	},
	galeria:{
		name: 'Foto da Galeria',
		icon: 'image'
	},
	enquete:{
		name: 'Foto da Enquete',
		icon: 'image'
	},
	noticia:{
		name: 'Foto da Notícia',
		icon: 'newspaper'
	},
	documento:{
		name: 'Documento',
		icon: 'file pdf'
	}
};

bibliotecaTypesVar = new ReactiveVar([]);
canRecoverLibVar = new ReactiveVar(false);
topTitleVar = new ReactiveVar('Home');
appInfoVar = new ReactiveVar({});
subMenuTitleVar = new ReactiveVar({
	title:'Home',
	icon:'home'
});
