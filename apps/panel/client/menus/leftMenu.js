Controller('leftMenu',{
	created:function(){
		showEmulatorVar = new ReactiveVar(false);
		enteredVar = new ReactiveVar(false);
		mouseVar = new ReactiveVar(false);
		diff = {
			x:0,
			y:0
		};
	},
	helpers:{
		isManagerOrAdmin:function(){
			if (Roles.userIsInRole(Meteor.userId(),'admin')) return true;
			if (Roles.userIsInRole(Meteor.userId(),'manager', FlowRouter.getParam('aplicativoId'))) return true;
			return false;
		},
		aplicativoId:function(){
			return FlowRouter.getParam('aplicativoId');
		},
		isAdmin:function(){
			if (Roles.userIsInRole(Meteor.userId(),'admin')) return true;
			return false;
		},
		appPlugins:function(){
			var app = Aplicativo.findOne(FlowRouter.getParam('aplicativoId'));
			if (app) return app.appPlugins();
		},
		userHasPerm:function(modulo){
			if (Roles.userIsInRole(Meteor.userId(),'admin')) return true;
			if (Roles.userIsInRole(Meteor.userId(),'manager',FlowRouter.getParam('aplicativoId'))) return true;
			if (Roles.userIsInRole(Meteor.userId(),modulo,FlowRouter.getParam('aplicativoId'))) return true;
			return false;
		}
	},
	events:{
		'click #showEmulatorEvent':function(e,t){
			showEmulatorVar.set(!showEmulatorVar.get());
		},
		'mousedown #emulatorFloatDiv':function(e,t){
			e.preventDefault();
			mouseVar.set(true);
			if (enteredVar.get()) {
				var mousePos = {
					x:e.pageX,
					y:e.pageY
				};
				var emuPos = {
					x:parseInt($(e.currentTarget).css('left')),
					y:parseInt($(e.currentTarget).css('top'))
				};
				diff = {
					x:mousePos.x - emuPos.x,
					y:mousePos.y - emuPos.y
				};
			}
		},
		'mouseup #emulatorFloatDiv':function(e,t){
			mouseVar.set(false);
		},
		'mouseenter #emulatorFloatDiv':function(e,t){
			enteredVar.set(true);
			$(e.currentTarget).css('cursor','move');
		},
		'mouseleave #emulatorFloatDiv':function(e,t){
			enteredVar.set(false);
			$(e.currentTarget).css('cursor','');
		}
	}
});
