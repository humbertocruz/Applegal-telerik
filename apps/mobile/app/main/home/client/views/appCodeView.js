Controller('appCodeView',{
	rendered:function(){
		$('#appCodeForm').form({
			onFailure:function(){
				Bert.alert('O Código deve ter 6 dígitos!','danger');
			},
			fields:{
				code:{
					indentifier:'codeField',
					rules:[
						{
							type:'minLength[6]',
							prompt:'O Código deve ter 6 dígitos!'
						},
						{
							type:'maxLength[6]',
							prompt:'O Código deve ter 6 dígitos!'
						}
					]
				}
			}
		});
	},
	events:{
		'submit #appCodeForm':function(e,t){
			e.preventDefault();
			var code = $(e.currentTarget).form('get values');
			Meteor.call('loadAppByCode', code, function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					loadedApp.set(true);
					clientApp = Meteor.subscribe("clientApp", {identifier:result.store.appInfoId});
				}
			});
		}
	}
});
