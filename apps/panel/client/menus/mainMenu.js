Controller('mainMenu',{
	created:function() {
	},
	rendered:function(){
		$('.ui.dropdown').dropdown();
		$('#adminSubMenuShow').popup({
			inline:true,
			hoverable:true,
			position: 'bottom right'
		});
		$('#profileSubMenuShow').popup({
			inline:true,
			hoverable:true,
			position: 'bottom right'
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
