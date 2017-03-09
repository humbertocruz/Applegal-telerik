Controller('enquetesFormView',{
	created:function(){
		Meteor.call("setServerAppId", FlowRouter.getParam('aplicativoId'));
		Tracker.autorun(function(){
			oneEnquete = Meteor.subscribe("oneEnquete", FlowRouter.getParam('id'),FlowRouter.getParam('aplicativoId'));
		});
	},
	rendered:function(){
		$('#addPerguntaEvent').popup({
			inline:true,
			hoverable:true,
			position: 'bottom center'
		});

		$('#enquetesForm .ui.dropdown').dropdown();

		// Nova forma de preencher os dados sem problema com o reload
		// Todo: colocar em todos os formulários
		if (id = FlowRouter.getParam('id')) {
			Enquete.find(id).observe({
				added:function(enquete){
					$('#enquetesForm').form('set value','date_starting', moment(enquete.date_starting).format('YYYY-MM-DD'));
					$('#enquetesForm').form('set value','date_ending', moment(enquete.date_ending).format('YYYY-MM-DD'));
					$('#enquetesForm').form('set values',enquete);
				}
			});
		}
	},
	helpers:{
		perguntas:function(){
			if (!oneEnquete.ready() || !FlowRouter.getParam('id')) return false;
			Meteor.setTimeout(function(){
				$('.addOpcaoEvent').popup({
					inline:true,
					hoverable:true,
					position: 'bottom center'
				});
			},500);
			var enquete = Enquete.findOne(FlowRouter.getParam('id'));
			return enquete.perguntas;
		},
		semanticColors:function(){
			return _.sortBy(semanticColors,'title');
		},
		header:function(){
			return {
				title:(FlowRouter.getParam('id')==undefined?'Inserir Enquete':'Editar Enquete'),
				icon:'wizard',
				corner:'add'
			}
		},
		saveLink:function(){
			return {
				title:'Salvar',
				icon:'save',
				form:'enquetesForm'
			}
		},
		extraLinks:function(){
			return [
				{
					title:'Cancelar',
					route:'enquetesRoute',
					icon:'left chevron',
					params:{
						aplicativoId:FlowRouter.getParam('aplicativoId')
					}
				}
			]
		}
	},
	events:{
		'click .removePerguntaEvent':function(e,t){
			var me = this;
			htmlConfirm('Aviso', 'Você tem certeza?', function() {
				Meteor.call("enquetesRemovePergunta", FlowRouter.getParam('id'), me.order, FlowRouter.getParam('aplicativoId'), function(error, result) {
					if (error) {
						console.log("error", error);
					}
					if (result) {
						Bert.alert('Pergunta excluída com sucesso.', 'success');
					}
				});
			});

		},
		'click #addFotoEnqueteEvent':function(e,t){
			$('#uploadField').click();
		},
		'change #uploadField': function(e) {
			var files = e.currentTarget.files;
			Cloudinary.upload(files,
				{
					folder:FlowRouter.getParam('aplicativoId'),
					tags:['enquete',FlowRouter.getParam('aplicativoId')],
				},
				function(err,res) {
					if (err) {
						console.log(err);
					} else {
						res.noticiaId = FlowRouter.getParam('noticiaId');
						Arquivo.insert(res);
						Meteor.call("noticiasAddFoto", res, function(error, result){
							if(error){
								console.log("error", error);
							}
							if(result){

							}
						});
					}
				}
			);
		},
		'submit #addPerguntaForm'(e,t){
			e.preventDefault();
			var fields = $(e.target).form('get values');
			var perguntas = Enquete.findOne(FlowRouter.getParam('id')).perguntas;
			if (perguntas.length == 0) var order = 0;
			else var order = perguntas[perguntas.length-1].order+1
			perguntas.push({
				title:fields.title,
				order:order
			});
			Meteor.call("enquentesUpdatePerguntas", FlowRouter.getParam('id'), perguntas, FlowRouter.getParam('aplicativoId'), function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					$('#titlePerguntaField').val('');
					Bert.alert('A Pergunta foi inserida!','success');
				}
			});
		},
		'submit #enquetesForm'(e,t){
			e.preventDefault();
			var fields = $(e.target).form('get values');
			var id = FlowRouter.getParam('id');
			if (id) fields.id = id;
			Meteor.call("enquetesForm",fields, FlowRouter.getParam('aplicativoId'), function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					 Bert.alert('A enquete foi enviada com sucesso!','success');
					 FlowRouter.go('enquetesRoute',{aplicativoId:FlowRouter.getParam('aplicativoId')});
				}
			});
		}
	}
});
