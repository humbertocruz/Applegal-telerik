Controller('leftMenu',{
	created:function(){
		var me = this;
		me.autorun(function(){
			me.subscribe("allAplicativos", {
				_id:FlowRouter.getParam('aplicativoId')
			});
		});
	},
	rendered:function(){
		$('.ui.accordion').accordion({
			exclusive:true,
			onOpening:function(){
				if (this[0].id == 'admin') {
					FlowRouter.go('aplicativosRoute');
				}
				return true;
			}
		});
	},
	helpers:{
		isManagerOrAdmin:function(){
			if (Roles.userIsInRole(Meteor.userId(),'admin')) return true;
			if (Roles.userIsInRole(Meteor.userId(),'manager', FlowRouter.getParam('aplicativoId'))) return true;
			return false;
		},
		isAdmin:function(){
			if (Roles.userIsInRole(Meteor.userId(),'admin')) return true;
			return false;
		},
		appPlugins:function(){
			var app = Aplicativo.findOne(FlowRouter.getParam('aplicativoId'));
			if (app) return app.appPlugins();
		},
		userHasPerm:function(plugin){
			if (Roles.userIsInRole(Meteor.userId(),'admin')) return true;
			if (Roles.userIsInRole(Meteor.userId(),'manager',FlowRouter.getParam('aplicativoId'))) return true;
			if (Roles.userIsInRole(Meteor.userId(),plugin,FlowRouter.getParam('aplicativoId'))) return true;
			return false;
		}
	},
	events:{
	}
});
