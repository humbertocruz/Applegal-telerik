/*
** Configura opções da plataforma
**
*/
Controller('optionsView',{
	created:function() {
		subMenuTitleVar.set({
			title:'Options',
			icon:'options'
		});
		// Subscribe para receber os dados configurados da plataforma
		Tracker.autorun(function(){
			allOptions = Meteor.subscribe("allOptions");
		});
	},
	rendered:function(){
		// Quando aparecer um dado, preencher o formulario
		Option.find().observe({
			added:function(newOptions){
				$('#optionsForm').form('set values',newOptions);
			}
		});
	},
	destroyed:function(){
		// Ao sair da "route" de configuração das opções, remover dados da memória
		allOptions.stop();
	},
	events:{
		// Ao salvar os dados, inserior ou atualizar as informações
		// Não há a opção de apagar os dados pois a plataforma não funciona sem eles
		'submit #optionsForm':function(e,t){
			e.preventDefault();
			var fields = $(e.currentTarget).form('get values');
			var curOption = Option.findOne();
			if (curOption) {
				Option.update(curOption._id, {
					$set:fields
				}, function(err,res){
					if(err){
						console.log("error", err);
					}
					if(res){
						Bert.alert('Configurações salvas com sucesso.','success');
					}
				});
			} else {
				Option.insert(fields, function(err,res){
					if(err){
						console.log("error", err);
					}
					if(res){
						Bert.alert('Configurações salvas com sucesso.','success');
					}
				});
			}
		}
	}
});
