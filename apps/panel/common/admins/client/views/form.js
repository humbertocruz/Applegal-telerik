Controller('adminsFormView', {
	created:function() {
		Tracker.autorun(function(){
			oneUsuario = Meteor.subscribe("oneUsuario", FlowRouter.getParam('id'));
		});
	},
	rendered:function() {
		$('#adminsForm .ui.dropdown').dropdown();
		$('#adminsForm .ui.checkbox').checkbox();
		if (id = FlowRouter.getParam('id')) {
			var fields = {
				nome: {
					identifier: 'nomeField',
					rules: [{
						type: 'empty',
						prompt: 'Digite o nome do usuário!'
					}]
				}
			};
		} else {
			var fields = {
				username: {
					identifier: 'usernameField',
					rules: [{
						type: 'empty',
						prompt: 'Digite o nome ou CPF do usuário!'
					}]
				},
				nome: {
					identifier: 'nomeField',
					rules: [{
						type: 'empty',
						prompt: 'Digite o nome do usuário!'
					}]
				},
				email: {
					identifier: 'emailField',
					rules: [{
						type: 'email',
						prompt: 'Digite um email válido!'
					}]
				},
				aniversario: {
					identifier: 'aniversario',
					rules: [{
						type: "regExp[^(19|20)\\d\\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$]",
						prompt: 'Digite uma data válida.'
					}]
				},
				password1: {
					identifier: 'password1Field',
					rules: [{
						type: 'minLength[6]',
						prompt: 'Digite uma senha com pelo menos 6 números!'
					}]
				},
				password2: {
					identifier: 'password2Field',
					rules: [{
						type: 'match[password1]',
						prompt: 'As senha digitadas não são iguais!'
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
		}
		$('#usuariosForm').form({
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


		if (id = FlowRouter.getParam('id')) {
			var fields = Meteor.users.findOne(id);
			var usuario = {
				username: fields.username,
				nome: fields.profile.name,
				tipo: fields.roles,
				birth: moment(fields.profile.birth).format('YYYY-MM-DD'),
				phone: fields.profile.phone
			};
			$('#usuariosForm').form('set values', usuario);
		}
	},
	helpers: {
		isNew: function() {
			return FlowRouter.getParam('id');
		},
		ready: function() {
			return oneUsuario.ready();
		},
		header: function() {
			return {
				title: (FlowRouter.getParam('id') == undefined ? 'Inserir Usuário' : 'Editar Usuário'),
				icon: 'user',
				corner: 'add'
			}
		},
		saveLink: function() {
			return {
				title: 'Salvar',
				icon: 'save',
				form: 'usuariosForm'
			}
		},
		extraLinks: function() {
			return [{
				title: 'Cancelar',
				route: 'adminsRoute',
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
		'submit #usuariosForm' (e, t) {
			e.preventDefault();
			var fields = $(e.target).form('get values');
			var usuario = {
				id: FlowRouter.getParam('id'),
				email: fields.email,
				username: fields.username,
				password: fields.password1,
				tipo: fields.tipo,
				profile: {
					name: fields.nome,
					birth: fields.birth,
					phone: fields.phone,
					filialId: fields.filialId
				}
			};
			Meteor.call('formUsuario', usuario, aplicativoVar.get()._id, function(error, result) {
				if (error) {
					console.log("error", error);
					if (error.reason == 'Email already exists.') {
						Bert.alert('Já existe um usuário cadastrado com este email!', 'danger', 'growl-top-right');
					} else if (error.reason == 'Username already exists.') {
						Bert.alert('Já existe um usuário cadastrado com este CPF!', 'danger', 'growl-top-right');
					} else {
						Bert.alert('Houve um erro ao tentar adicionar o usuário!', 'danger', 'growl-top-right');
					}
				}
				if (result) {
					FlowRouter.go('usuariosRoute');
					Bert.alert('Usuário adicionado com sucesso!', 'success', 'growl-top-right');
				}
			});
		}
	}
});
