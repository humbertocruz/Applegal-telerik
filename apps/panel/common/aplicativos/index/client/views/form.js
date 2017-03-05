Controller('aplicativosFormView',{
	created:function(){
		arquivosPageVar = new ReactiveVar(1);
		wallPageVar = new ReactiveVar(1);
		logotiposPageVar = new ReactiveVar(1);
		uploadType = new ReactiveVar(); // logo ou wallpaper
		bgSelectedVar = new ReactiveVar(false);
		logoSelectedVar = new ReactiveVar(false);
		Tracker.autorun(function(){
			var page = arquivosPageVar.get();
			var pup = wallPageVar.get();
			var plogo = logotiposPageVar.get();
			allWallpapers = Meteor.subscribe("allWallpapers", page);
			allWallpapers = Meteor.subscribe("appWallpapers", pup, FlowRouter.getParam('aplicativoId'));
			appLogotipos = Meteor.subscribe("appLogotipos", plogo, FlowRouter.getParam('aplicativoId'));
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
			language: 'pt_BR',
			skin_url: '/packages/teamon_tinymce/skins/lightgray',
		});

		// Upload do Logotipo
		Arquivo.resumable.assignBrowse($("#logoBrowse"));
		arquivoUploadMetadataVar.set({
			type: 'logotype',
			aplicativoId: FlowRouter.getParam('aplicativoId')
		});
	},
	helpers:{
		ready:function(){
			return allWallpapers.ready();
		},
		aplicativoId:function(){
			return FlowRouter.getParam('aplicativoId');
		},
		isBgSelected:function(){
			if (this._id == bgSelectedVar.get()) return 'red';
			else return '';
		},
		isLogoSelected:function(){
			if (this._id == logoSelectedVar.get()) return 'red';
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
		saveLink:function(){
			return {
				title:'Salvar',
				icon:'save',
				form:'aplicativosForm'
			}
		},
		wallpapers:function(){
			var wallpapers = Arquivo.find({
				'metadata.type':'wallpaper',
				'metadata.aplicativoId':false,
				'metadata.public':true
			},{limit:8});
			return {
				page:FlowRouter.getQueryParam('page'),
				count:Counts.get('allWallpapers'),
				data:wallpapers.fetch(),
				pages: 8
			}
		},
		wallpapersUp:function(){
			var wallpapers = Arquivo.find({
				'metadata.type':'wallpaper',
				'metadata.aplicativoId':FlowRouter.getParam('aplicativoId'),
			},{limit:8});
			return {
				page:FlowRouter.getQueryParam('page'),
				count:Counts.get('appWallpapers'),
				data:wallpapers.fetch(),
				pages: 8
			}
		},
		logotipos:function(){
			var logotipos = Arquivo.find({
				'metadata.type':'logotype'
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
		'click #logoBrowse':function(e,t){
			uploadType.set('logotype');
		},
		'click #bgUpEvent':function(e,t){
			var max = Math.ceil(Counts.get('allArquivos')/5);
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
			bgSelectedVar.set(this._id);
		},
		'click .logoSelectEvent':function(e,t){
			logoSelectedVar.set(this._id);
		},
		'submit #aplicativosForm':function(e,t){
			e.preventDefault();
			//isLoadingVar.set('Salvando Aplicativo!');
			var fields = $(e.target).form('get values');
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
		}
	}
});
