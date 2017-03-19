Controller('optionsView',{
	created:function() {
		subMenuTitleVar.set({
			title:'Options',
			icon:'options'
		});
		Tracker.autorun(function(){
			Meteor.subscribe("allOptions");
		});
	},
	rendered:function(){
		Option.find().observe({
			added:function(newOptions){
				$('#optionsForm').form('set values',newOptions);
			}
		})

	},
	events:{
		'submit #optionsForm':function(e,t){
			e.preventDefault();
			var fields = $(e.currentTarget).form('get values');
			Meteor.call("optionsForm", fields, function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					Bert.alert('Configurações salvas com sucesso.','success');
				}
			});
		}
	}
});
