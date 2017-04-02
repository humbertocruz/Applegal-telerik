Controller('usuariosFormView', {
	created:function() {
		Meteor.call("setServerAppId", FlowRouter.getParam('aplicativoId'));
		Tracker.autorun(function(){
			oneUsuario = Meteor.subscribe("oneUsuarioApp", FlowRouter.getParam('userId'));
		});
	},
	rendered:function() {
		$('#usuariosForm .ui.dropdown').dropdown({
			multiple: true
		});
		$('#usuariosForm .ui.checkbox').checkbox();
		$('#phoneField').mask('(99) 99999-9999');


		if (id = FlowRouter.getParam('userId')) {
			var fields = Meteor.users.findOne(id);
			if (!fields) return false;
			var usuario = {
				username: fields.username,
				nome: fields.profile.name,
				roles: fields.roles[FlowRouter.getParam('aplicativoId')],
				birth: moment(fields.profile.birth).format('YYYY-MM-DD'),
				phone: fields.profile.phone
			};
			$('#usuariosForm').form('set values', usuario);
			//$('#usuariosForm').form('set value','rolesField',fields.roles[FlowRouter.getParam('aplicativoId')]);
		}
	},
	helpers: {
		isNew: function() {
			return FlowRouter.getParam('userId');
		},
		ready: function() {
			return oneUsuario.ready();
		},
		header: function() {
			return {
				title: (FlowRouter.getParam('userId') == undefined ? 'Inserir Usuário' : 'Editar Usuário'),
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
				route: 'aplicativosUsuariosRoute',
				icon: 'close',
				params: {
					aplicativoId: FlowRouter.getParam('aplicativoId')
				}
			}]
		},
		appRoles: function(){
			var app = Aplicativo.findOne(FlowRouter.getParam('aplicativoId'));
			if (!app) return false;
			return app.appPlugins();
		}
	},
	events: {
		'submit #addPerguntaForm':function(e,t){
			e.preventDefault();
			console.log('addPerguntaForm');
		},
		'submit #usuariosForm':function(e, t) {
			e.preventDefault();
			var fields = $(e.target).form('get values');
			var usuario = {
				_id: FlowRouter.getParam('userId'),
				email: fields.email,
				username: fields.username,
				password: fields.password1,
				roles: fields.roles,
				profile: {
					name: fields.nome,
					birth: fields.birth,
					phone: fields.phone
				}
			};
			Meteor.call('usuariosAppForm', usuario, Aplicativo.findOne(FlowRouter.getParam('aplicativoId'))._id, function(error, result) {
				if (error) {
					if (error.reason == 'Email already exists.') {
						Bert.alert('Já existe um usuário cadastrado com este email!', 'danger');
					} else if (error.reason == 'Username already exists.') {
						Bert.alert('Já existe um usuário cadastrado com este CPF!', 'danger');
					} else {
						Bert.alert('Houve um erro ao tentar adicionar o usuário!', 'danger');
					}
				}
				if (result) {
					FlowRouter.go('aplicativosUsuariosRoute',{aplicativoId:FlowRouter.getParam('aplicativoId')});
					Bert.alert('Usuário adicionado com sucesso!', 'success');
				}
			});
		}
	}
});
