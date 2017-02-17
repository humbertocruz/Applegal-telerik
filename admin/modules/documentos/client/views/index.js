Controller('documentosView', {
	created:function() {
		sint = 0;
		searchDocumentosVar = new ReactiveVar({});
		Tracker.autorun(function(){
			Meteor.subscribe("allDocumentos", searchDocumentosVar.get(),FlowRouter.getQueryParam('page'),aplicativoVar.get()._id);
		});
	},
	rendered:function(){
	},
	destroyed:function() {
	},
	helpers: {
		ready:function(){
			return true;
		},
		header:function(){
			return {
				title:'Documentos',
				icon:'file word outline'
			}
		},
		newLink:function(){
			return {
				title:'Adicionar'
			}
		},
		extraLinks:function(){
			return [
				{
					title:'Tipos',
					route:'documentosTiposRoute',
					icon:'sidebar'
				}
			]
		},
		documentos: function() {
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			var qtd = 10;
			var documentos = Documento.find(searchDocumentosVar.get(),{sort:{date:-1},limit:qtd,skip:(page-1)*qtd}).fetch();

			$('.ui.progress').progress({
				duration	: 200,
				total			: Math.ceil(Counts.get('allDocumentos')/qtd),
				value			: page
			});
			return {
				page: FlowRouter.getQueryParam('page'),
				data: documentos,
				count: Counts.get('allDocumentos'),
				pages: Math.ceil(Counts.get('allDocumentos')/qtd)
			};
		}
	},
	events: {
		'click #addBtn':function(e,t){
			FlowRouter.go('documentosInsertRoute');
		},
		'click #activateEvent':function(e,t){
			Meteor.call("documentosActivate", $(e.currentTarget).data('id'), aplicativoVar.get()._id, function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					Bert.alert('Documento ativado!','success');
				}
			});
		},
		'click #deactivateEvent':function(e,t){
			Meteor.call("documentosDeactivate", $(e.currentTarget).data('id'), aplicativoVar.get()._id, function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					Bert.alert('Documento desativado!','warning');
				}
			});
		},
		'click .removeBtn':function(e,t){
			var me = this;
			htmlConfirm('Aviso','Você tem certeza?',function(){
				Meteor.call("documentosRemove", me._id, function(error, result){
					if(error){
						console.log("error", error);
					}
					if(result){
						 Bert.alert('Documento excluído com sucesso','success');
					}
				});
			});
		}
	}
});
