Controller('mainMenu',{
	created:function() {
	},
	rendered:function(){
		$('.ui.dropdown').dropdown();
		$('#userPopupEvent').popup({
			inline:true,
			on:'click'
		});
	},
	helpers:{
		user:function(){
			return Meteor.user();
		}
	},
	events:{
		'click #logoutEvent':function(e,t){
			htmlConfirm('Sair','Você tem certeza?',function(){
				Meteor.logout(function(){
					Bert.alert('Você se desconectou com sucesso.','sucess');
				});
			});
		}
	}
});
