Controller('registerView', {
	created: function() {
		registerFormVar = new ReactiveVar();
		registerEmailVar = new ReactiveVar();
	},
	rendered: function() {
		$('#registerForm').form({
			onFailure:function(a,b,c){
				var msg = toSemanticList(a);
				Bert.alert(msg,'danger');
				return false;
			},
			inline: false,
			fields: {
				email: {
					identifier: 'email',
					rules: [{
						type: 'email',
						prompt: 'Email inválido!'
					}]
				}
			}
		});
		$('#usernameField').mask('999.999.999-99');
	},
	events: {
		'click .showPasswordBtn': function(e, t) {
			if ($(e.currentTarget).prev().hasClass('hidePwd')) {
				$(e.currentTarget).prev().removeClass('hidePwd');
			} else {
				$(e.currentTarget).prev().addClass('hidePwd');
			}
		},
		'submit #registerForm': function(e, t) {
			e.preventDefault();
			var fields = $(e.currentTarget).form('get values');
			registerFormVar.set(fields);
			registerEmailVar.set(fields.email);
			Meteor.call("registerCheckEmail", fields, function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					BlazeLayout.render('adminLayout', {
						menu: 'topMenu',
						main: 'registerAuthView',
						technotronics: 'technotronicsMenu'
					});
				} else {
					BlazeLayout.render('adminLayout', {
						menu: 'topMenu',
						main: 'registerOneView',
						technotronics: 'technotronicsMenu'
					});
				}
			});
		}
	}
});

Controller('registerOneView', {
	created: function() {
		registerFormVar = new ReactiveVar();
	},
	rendered: function() {
		$.fn.form.settings.rules.cpf = function(value) {
			return TestaCPF(value);
		};
		$('#registerForm').form({
			inline: false,
			fields: {
				cpf: {
					identifier: 'username',
					rules: [{
						type: 'cpf',
						prompt: 'CPF inválido!'
					}]
				},
				password1: {
					identifier: 'password1',
					rules: [{
						type: 'empty',
						prompt: 'Digite uma senha.'
					}]
				},
				password2: {
					identifier: 'password2',
					rules: [{
						type: 'match[password1]',
						prompt: 'As senha digitadas não são iguais.'
					}]
				}
			}
		});
		$('#usernameField').mask('999.999.999-99');
		$('#password1Field,#password2Field').mask('9999999999999999');
	},
	events: {
		'click .showPasswordBtn': function(e, t) {
			if ($(e.currentTarget).prev().hasClass('hidePwd')) {
				$(e.currentTarget).prev().removeClass('hidePwd');
			} else {
				$(e.currentTarget).prev().addClass('hidePwd');
			}
		},
		'submit #registerOneForm': function(e, t) {
			e.preventDefault();
			var fields = $(e.currentTarget).form('get values');
			registerFormVar.set(fields);
			Meteor.call("registerCheckUsername", fields.username, function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					Bert.alert('Esse CPF já está em uso.','danger');
				} else {
					BlazeLayout.render('adminLayout', {
						menu: 'topMenu',
						main: 'registerTwoView',
						technotronics: 'technotronicsMenu'
					});
				}
			});

		}
	}
});

Controller('registerTwoView', {
	created: function() {
		phoneNumberVar = new ReactiveVar();
		datePickerFieldVar = new ReactiveVar();
		topTitleVar.set('Cadastre-se');
	},
	rendered: function() {
		$.fn.form.settings.rules.cpf = function(value) {
			return TestaCPF(value);
		};
		//$('#aniversarioField').mask('99/99/9999');
		$('#phoneField').mask('(99) 99999-9999');
		$('#registerTwoForm').form({
			inline: false,
			fields: {
				guerra: {
					identifier: 'name',
					rules: [{
						type: 'empty',
						prompt: 'Digite seu nome'
					}]
				},
				email: {
					identifier: 'email',
					rules: [{
						type: 'email',
						prompt: 'Digite um email válido.'
					}]
				},
				aniversario: {
					identifier: 'aniversario',
					rules: [{
						type: "regExp[^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/(19|20)\\d\\d$]",
						prompt: 'Digite uma data válida.'
					}]
				}
			}
		});
		/*
		if(Meteor.isCordova){
			window.plugins.sim.getSimInfo(
				function(result){
					phoneNumberVar.set(result.phoneNumber);
					$('#phoneField').val(result.phoneNumber);
				},
				function(error){
					console.log(error);
				}
			);
		} else {
			phoneNumberVar.set('+5561999999999');
			$('#phoneField').val('+5561999999999');
		}
		*/
	},
	events: {
		'click .toggleDatePicker': function(e, t) {
			datePickerFieldVar.set($(e.currentTarget).data('field'));
			$('.ui.bottom.sidebar#datePickerSidebar').sidebar('show');
		},
		'submit #registerTwoForm': function(e, t) {
			e.preventDefault();
			isLoadingVar.set('Cadastrando novo usuário...');
			var fieldsTwo = $(e.currentTarget).form('get values');
			var fields = registerFormVar.get(fields);
			fieldsTwo.email = registerEmailVar.get();
			Meteor.call('registerUser', fields, fieldsTwo, Aplicativo.findOne()._id, function(error, result) {
				if (error) {
					isLoadingVar.set(false);
					console.log(error);
					Bert.alert('Houve um erro ao tentar se registrar!', 'danger', );
				}
				if (result) {
					Meteor.loginWithPassword(fields.username, fields.password1, function() {
						isLoadingVar.set(false);
						FlowRouter.go('homeRoute');
						Bert.alert('Usuário adicionado com sucesso e registro concluído!', 'success');
					});
				}
			});
		}
	}
});
