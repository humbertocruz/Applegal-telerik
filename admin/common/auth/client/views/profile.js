Controller('profileView', {
	created:function() {
		userIdVar = new ReactiveVar(false);
		Tracker.autorun(function(){
			var userId = FlowRouter.getParam('id');
			if (userId) {
				userIdVar.set(userId);
			} else {
				userIdVar.set(Meteor.userId());
			}
			oneUsuario = Meteor.subscribe("oneUsuario", userIdVar.get());
		});
	},
	rendered:function() {
		$('#profileForm .ui.dropdown').dropdown({
			onRemove:function(removed){
				var me = this;
				if (userIdVar.get() == Meteor.userId()) {
					if (removed == 'gerente') {
						Bert.alert('Você não pode remover a "Gerência" do Aplicativo de você mesmo.','danger');
					}
				}
			}
		});

		$('#profileForm .ui.checkbox').checkbox();
		var fields = {
				nome: {
					identifier: 'nomeField',
					rules: [{
						type: 'empty',
						prompt: 'Digite o nome do usuário!'
					}]
				},
				aniversario: {
					identifier: 'aniversario',
					rules: [{
						type: "regExp[^(19|20)\\d\\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$]",
						prompt: 'Digite uma data válida.'
					}]
				},
				tipo: {
					identifier: 'tipoField',
					rules: [{
						type: 'empty',
						prompt: 'Escolha o tipo de usuário!'
					}]
				},
				tipo: {
					identifier: 'phoneField',
					rules: [{
						type: 'empty',
						prompt: 'Cadastre o telefone do usuário!'
					}]
				}
			};
		$('#profileForm').form({
			onFailure() {
				Bert.alert('Verifique o formulário.', 'danger');
				return false;
			},
			inline: true,
			fields: fields
		});

		$('#usernameField').mask('999.999.999-99');
		$('#password1Field,#password2Field').mask('9999999999999999');
		$('#phoneField').mask('(99) 99999-9999');


		var fields = Meteor.users.findOne(userIdVar.get());
		var usuario = {
			name: fields.profile.name,
			birth: moment(fields.profile.birth).format('YYYY-MM-DD'),
			phone: fields.profile.phone
		};

		$('#profileForm').form('set values', usuario);
		var apps = Roles.getGroupsForUser(userIdVar.get());
		_.each(apps,function(app){
			$('#profileForm').form('set value','app_'+app,Roles.getRolesForUser(userIdVar.get(),app));
		});

	},
	helpers: {
		mySelf:function(){
			return Meteor.userId() == userIdVar.get();
		},
		isNew: function() {
			return FlowRouter.getParam('id');
		},
		userApps: function(){
			if (!Meteor.userId()) return false;
			if (!userIdVar.get()) return false;
			var user = Meteor.users.findOne(userIdVar.get());
			if (user) return user.apps();
		},
		ready: function() {
			return oneUsuario.ready();
		},
		header: function() {
			return {
				title: 'Profile',
				icon: 'user',
				corner: 'add'
			}
		},
		saveLink: function() {
			return {
				title: 'Salvar',
				icon: 'save',
				form: 'profileForm'
			}
		},
		extraLinks: function() {
			return [{
				title: 'Cancelar',
				route: 'usuariosRoute',
				icon: 'close'
			}]
		},
		filiais: function() {
			var filiais = Filial.find({}, {
				sort: {
					name: 1
				}
			}).fetch();
			return filiais;
		}
	},
	events: {
		'click #logoutEvent':function(e,t){
			htmlConfirm('Sair do Sistema', 'Você tem certeza?', function() {
				isLoadingVar.set(true);
				Meteor.logout(function() {
					Bert.alert('Usuário desconectado com sucesso', 'success');
					FlowRouter.go('loginRoute');
					isLoadingVar.set(false);
				});
			});
		},
		'submit #profileForm':function(e, t) {
			e.preventDefault();
			var fields = $(e.target).form('get values');
			fields.id = userIdVar.get();
			fields.apps = [];
			var apps = Roles.getGroupsForUser(userIdVar.get());
			_.each(apps,function(app){
				fields.apps.push({
					app: app,
					perm: $('#app_'+app).val()
				});
			});

			Meteor.call('profileForm', fields, function(error, result) {
				if (error) {
					console.log("error", error);
				}
				if (result) {
					Bert.alert('Profile alterado com sucesso!', 'success');
				}
			});
		}
	}
});
