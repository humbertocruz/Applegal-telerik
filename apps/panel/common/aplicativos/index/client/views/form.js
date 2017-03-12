Controller('aplicativosFormView',{
	created:function(){
		subMenuTitleVar.set({
			title:'Configuração do Aplicativo',
			icon:'setting'
		});
		extraLinksVar.set([]);
		saveLinkVar.set({
			title:'Salvar',
			icon:'save'
		});
		var appSave = function(e,t){
			var fields = $('#aplicativosForm').form('get values');
			var id = FlowRouter.getParam('aplicativoId');
			fields.appBg = bgSelectedVar.get();
			fields.appLogo = logoSelectedVar.get();
			if (id) fields._id = id;
			Meteor.call("aplicativosForm",fields, function(error, result){
				if(error){
					console.log("error", error);
					//isLoadingVar.set(false);
				}
				if(result){
					//isLoadingVar.set(false);
					Bert.alert('O aplicativo foi salvo com sucesso!','success');
					FlowRouter.go('aplicativosUpdateRoute',{aplicativoId:result});
				}
			});
		};
		headerSaveVar.set(appSave);

		arquivosPageVar = new ReactiveVar(1);
		arquivosLogoPageVar = new ReactiveVar(1);
		bgSelectedVar = new ReactiveVar(false);
		logoSelectedVar = new ReactiveVar(false);
		Meteor.call("setServerAppId", FlowRouter.getParam('aplicativoId'));

		Tracker.autorun(function(){
			var page = arquivosPageVar.get();
			allWallpapers = Meteor.subscribe("allWallpapers", page);
			var Logopage = arquivosLogoPageVar.get();
			appArquivos = Meteor.subscribe("appArquivos", Logopage, FlowRouter.getParam('aplicativoId'));
		});
	},
	rendered:function(){
		var loadApp = function(aplicativo){
			$('#aplicativosForm').form('set values',aplicativo);
			bgSelectedVar.set(aplicativo.appBg);
			logoSelectedVar.set(aplicativo.appLogo);
		};
		Tracker.autorun(function(){
			var aplicativo = Aplicativo.findOne(FlowRouter.getParam('aplicativoId'));
			if (aplicativo) {
				loadApp(aplicativo);
			} else {
				$('#aplicativosForm').form('set values', {
					headerField: 'blue',
					sidebarField: 'violet',
					itemsPerPageField:10,
					emailField:Meteor.user().emails[0].address
				});
			}
		});
		$('.tabular.menu .item').tab();

		tinymce.remove();
		tinymce.init({
			height:400,
			selector: 'textarea',
			//language: 'pt_BR',
			skin_url: '/packages/teamon_tinymce/skins/lightgray',
		});
	},
	helpers:{
		ready:function(){
			return appArquivos.ready();
		},
		aplicativoId:function(){
			return FlowRouter.getParam('aplicativoId');
		},
		isBgSelected:function(){
			if (this.public_id == bgSelectedVar.get()) return 'red';
			else return '';
		},
		isLogoSelected:function(){
			if (this.public_id == logoSelectedVar.get()) return 'red';
			else return '';
		},
		header:function(){
			return {
				title:(FlowRouter.getParam('aplicativoId')==undefined?'Criar Aplicativo':'Editar Aplicativo'),
				icon:'android',
				corner:'add'
			}
		},
		semanticColors:function(){
			return _.sortBy(semanticColors,'title');
		},
		wallpapers:function(){
			var wallpapers = Arquivo.find({
				tags:{
					$all:[
						'wallpaper',
						'public'
					]
				}
			},{
				limit:8
			});
			return {
				page:arquivosPageVar.get(),
				count:Counts.get('allWallpapers'),
				data:wallpapers.fetch(),
				pages: 8
			}
		},
		wallpapersUp:function(){
			var wallpapers = Arquivo.find({
				tags:{
					$all:[
						'wallpapers',
						FlowRouter.getParam('aplicativoId')
					]
				}
			});
			return {
				page:FlowRouter.getQueryParam('page'),
				count:Counts.get('appWallpapers'),
				data:wallpapers.fetch(),
				pages: 8
			}
		},
		logotipos:function(){
			var logotipos = Arquivo.find({
				tags:{
					$all:[
						'logotype',
						FlowRouter.getParam('aplicativoId')
					]
				}
			});
			return {
				page:FlowRouter.getQueryParam('page'),
				count:Counts.get('appLogotipos'),
				data:logotipos.fetch(),
				pages: 8
			}
		}
	},
	events:{
		'click #bgUpEvent':function(e,t){
			var max = Math.ceil(Counts.get('allWallpapers')/8);
			if (arquivosPageVar.get() == max) return false;
			var num = arquivosPageVar.get()+1;
			arquivosPageVar.set(num);
		},
		'click #bgDownEvent':function(e,t){
			if (arquivosPageVar.get() == 1) return false;
			var num = arquivosPageVar.get()-1;
			arquivosPageVar.set(num);
		},
		'click .bgSelectEvent':function(e,t){
			bgSelectedVar.set(this.public_id);
		},
		'click .logoSelectEvent':function(e,t){
			bgSelectedVar.set(this.public_id);
		},
		'click .logoSelectEvent':function(e,t){
			logoSelectedVar.set(this.public_id);
		}
	}
});
