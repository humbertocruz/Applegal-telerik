Controller('topMenu',{
	created:function(){
	},
	rendered:function(){
		Tracker.autorun(function(){
			if (Reload.isWaitingForResume()) {
				isLoadingVar.set('Atualizando aplicação...');
				window.location.reload();
			}
		});
	},
	helpers:{
		isLogged:function(){
			return Meteor.userId();
		},
		hasUpdate:function(){
			return Reload.isWaitingForResume();
		},
		topTitle:function(){
			return topTitleVar.get();
		}
	},
	events:{
		'click #backRouteEvent':function(e,t){
			FlowRouter.go(backBtnRouteVar.get().route, backBtnRouteVar.get().params);
		},
		'click .toggleSidebar':function(e,t){
			$('.ui.left.sidebar')
			.sidebar('setting', 'transition', 'overlay')
			.sidebar('show');
		},
		'click #logoutBtn':function(e,t){
			htmlConfirm('Atenção','Tem certeza que deseja sair?',function(){
				isLoadingVar.set('Fazendo logout...');
				FlowRouter.go('homeRoute');
				Meteor.logout();
			});
		},
		'click #reloadBtn':function(e,t){
			window.location.reload();
		}
	}
});
