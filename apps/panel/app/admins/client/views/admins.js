Controller('adminsView', {
	created:function() {
		adminsSearchVar = new ReactiveVar({});
		Meteor.autorun(function() {
			allAdmins = Meteor.subscribe('allAdmins', adminsSearchVar.get());
		});
		subMenuTitleVar.set({
			title:'Admins',
			icon:'users'
		});
	},
	helpers: {
		ready: function() {
			return allAdmins.ready();
		},
		header: function() {
			return {
				title: 'Admins',
				icon: 'users'
			}
		},
		newLink: function() {
			return {
				title: 'Adicionar'
			}
		},
		extraLinks: function() {
			return false;
		},
		admins: function() {
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			var qtd = 10;
			var usuarios = Meteor.users.find({},{
				skip:(page-1)*qtd,
				limit: qtd
			});

			$('.ui.progress').progress({
				duration: 200,
				total: Math.ceil(Counts.get('allAdmins') / qtd),
				value: page
			});
			return {
				page: page,
				data: usuarios.fetch(),
				pages: Math.ceil(Counts.get('allAdmins') / qtd),
				count: Counts.get('allAdmins')
			}
		}
	},
	events: {
		'click #addBtn': function() {
			FlowRouter.go('adminsInsertRoute');
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
		'click .removeBtn': function(e, t) {
			var me = this;
			htmlConfirm('Excluir Admin', 'Você tem certeza?', function() {
				Meteor.call('removeAdmin', me._id, function(err, result) {
					Bert.alert('Admin removido com sucesso!', 'success');
				});
			});
		}
	}
});
