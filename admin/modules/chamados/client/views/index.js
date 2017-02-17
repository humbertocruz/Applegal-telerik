Controller('chamadosView', {
	created:function() {
		chamadosSearchVar = new ReactiveVar({});
		Tracker.autorun(function(){
			Meteor.subscribe("allChamados", chamadosSearchVar.get(), FlowRouter.getQueryParam('page'),aplicativoVar.get()._id);
		});
	},
	rendered:function() {
	},
	helpers: {
		ready:function(){
			return true;
		},
		header:function(){
			return {
				title:'Chamados',
				icon:'comments outline'
			}
		},
		newLink:function(){
			return {
				title:'Adicionar'
			}
		},
		extraLinks:function(){
			return false;
		},
		chamados: function() {
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			var qtd = 10;
			var chamados = Chamado.find(chamadosSearchVar.get(),{sort:{date:-1},limit:qtd,skip:(page-1)*qtd}).fetch();

			$('.ui.progress').progress({
				duration	: 200,
				total			: Math.ceil(Counts.get('allChamados')/qtd),
				value			: page
			});
			return {
				page: FlowRouter.getQueryParam('page'),
				data: chamados,
				count: Counts.get('allChamados'),
				pages: Math.ceil(Counts.get('allChamados')/qtd)
			};
		}
	},
	events: {
		'click #addBtn':function(e,t){
			FlowRouter.go('chamadosInsertRoute');
		},
		'click .ctrlChamadoEvent':function(e,t){
			var me = this;
			Meteor.call("chamadosCtrl", this._id, this.close, aplicativoVar.get()._id, function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					var chamado = Chamado.findOne(result);
					if (!me.close) {
						Bert.alert('Chamado fechado com sucesso.','success');
						pushObj = {
							from:'gremio',
							title:'Seu chamado foi encerrado!',
							text:moment(chamado.date).format('DD/MM/YYYY HH:mm'),
							userId: chamado.user_id
						};
					} else {
						Bert.alert('Chamado reaberta com sucesso.','success');
						pushObj = {
							from: aplicativoVar.get().pushFrom,
							title:'Seu chamado foi reaberto!',
							text:moment(chamado.date).format('DD/MM/YYYY HH:mm'),
							userId: chamado.user_id
						};
					}
					Meteor.setTimeout(function(){
						Meteor.call("pushSend", pushObj, function(error, result){
							if(error){
								console.log("error", error);
							}
							if(result){
								Bert.alert('Mensagem "Push" enviada com sucesso.','success');
							}
						});
					}, 1000);
				}
			});
		}
	}
});
