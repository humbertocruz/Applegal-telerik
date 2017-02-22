Controller('aplicativosUsuariosView', {
	created:function() {
		usuariosSearchVar = new ReactiveVar({});
		Meteor.autorun(function() {
			var appId = FlowRouter.getParam('aplicativoId');
			allUsuariosApp = Meteor.subscribe('allUsuariosApp', usuariosSearchVar.get(), FlowRouter.getQueryParam('page'), appId);
		});
	},
	rendered:function(){
		$('#usernameField').mask('999.999.999-99');
		$('#addUsersApp').popup({
			inline:true,
			hoverable:true,
			position: 'right center'
		});
		$('.ui.dropdown').dropdown();
	},
	helpers: {
		aplicativoId: function(){
			return FlowRouter.getParam('aplicativoId');
		},
		appModulos:function(){
			var app = Aplicativo.findOne(FlowRouter.getParam('aplicativoId'));
			if (app) return app.appModulos();
		},
		ready: function() {
			return allUsuariosApp.ready();
		},
		header: function() {
			return {
				title: 'Usuários',
				icon: 'user'
			}
		},
		newLink: function() {
			return {}
		},
		extraLinks: function() {
			return [
				{
					title:'Novo Usuário',
					icon: 'user',
					route: 'aplicativosUsuariosInsertRoute',
					params: {
						aplicativoId:FlowRouter.getParam('aplicativoId')
					}
				}
			];
		},
		usuarios: function() {
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			var qtd = 10;
			var search = usuariosSearchVar.get();
			var app = Aplicativo.findOne(FlowRouter.getParam('aplicativoId'));
			if (app) {
				var thisUserInApp = Roles.getRolesForUser(Meteor.userId(),app._id);
				if (thisUserInApp.length == 0) {
					search._id = {
						$nin:[Meteor.userId()]
					};
				}
			}
			var usuarios = Meteor.users.find(search, {
				limit: qtd,
				skip: (page - 1) * qtd
			});

			$('.ui.progress').progress({
				duration: 200,
				total: Math.ceil(Counts.get('allUsuariosApp') / qtd),
				value: page
			});
			return {
				page: page,
				data: usuarios.fetch(),
				pages: Math.ceil(Counts.get('allUsuariosApp') / qtd),
				count: Counts.get('allUsuariosApp')
			}
		}
	},
	events: {
		'click #addUserToAppEvent':function(e,t){
			e.preventDefault();
			var fields = $('#addUserToAppForm').form('get values');
			fields.aplicativoId = FlowRouter.getParam('aplicativoId');
			Meteor.call("addUserToAppForm", fields, function(error, result){
				if(result){
					Bert.alert(result.msg,(result.status?'success':'danger'));
					if (result.status) {
						$('#addUserToAppForm').form('clear');
						$('#addUsersApp').popup('hide');
					}
				}
			});
		},
		'click #addBtn': function() {
			FlowRouter.go('aplicativosUsuariosInsertRoute');
		},
		'click .chamadoBtn': function(e, t) {
			Meteor.call("startChamado", this._id, function(error, result) {
				if (error) {
					console.log("error", error);
				}
				if (result) {
					Bert.alert('Chamado aberto.', 'success');
					FlowRouter.go('mensagensRoute', {
						id: result
					});
				}
			});
		},
		'click #activateEvent': function(e, t) {
			var me = this;
			var id = $(e.currentTarget).data('id');
			if (id == Meteor.userId()) {
				Bert.alert('Você não pode ativar a sí mesmo.', 'danger');
				return false;
			} else {
				Meteor.call("activateUser", id, function(error, result) {
					if (error) {
						console.log("error", error);
					}
					if (result) {
						Bert.alert('Usuário ativado com sucesso.', 'success');
						return true;
					}
				});
			}
		},
		'click #deactivateEvent': function(e, t) {
			var me = this;
			var id = $(e.currentTarget).data('id');
			if (id == Meteor.userId()) {
				Bert.alert('Você não pode suspender a sí mesmo.', 'danger');
				return false;
			} else {
				Meteor.call("deactivateUser", id, function(error, result) {
					if (error) {
						console.log("error", error);
					}
					if (result) {
						Bert.alert('Usuário desativado com sucesso.', 'success');
						return true;
					}
				});
			}
		},
		'click .removeBtn': function(e, t) {
			var me = this;
			htmlConfirm('Excluir Usuário', 'Você tem certeza?', function() {
				Meteor.call('removeUsuario', me._id, function(err, result) {
					Bert.alert('Usuário removido com sucesso!', 'success');
				});
			});
		}
	}
});
