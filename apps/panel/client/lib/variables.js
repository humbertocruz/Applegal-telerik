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

topTitleVar = new ReactiveVar('Home');
appInfoVar = new ReactiveVar({});
subMenuTitleVar = new ReactiveVar({
	title:'Home',
	icon:'home'
});
