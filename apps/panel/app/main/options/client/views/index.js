/*
** Configura opções da plataforma
**
*/
Controller('optionsView',{
	created:function() {
		var me = this;
		subMenuTitleVar.set({
			title:'Options',
			icon:'options'
		});
		// Subscribe para receber os dados configurados da plataforma
		me.autorun(function(){
			allOptions = me.subscribe("allOptions");
		});
	},
	rendered:function(){
	},
	helpers:{
		options:function(){
			return Option.findOne();
		}
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
