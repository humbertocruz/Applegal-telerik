Controller('adminsView', {
	created:function() {
		var me = this;
		subMenuTitleVar.set({
			title:'Admins',
			icon:'users'
		});
		me.currentPage = function(){return FlowRouter.getQueryParam('page');};
		me.autorun(function() {
			allAdmins = me.subscribe('allAdmins', me.currentPage());
		});
	},
	helpers: {
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
