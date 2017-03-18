Controller('aplicativosView',{
	created:function() {
		subMenuTitleVar.set({
			title:(Roles.userIsInRole(Meteor.userId(),'admin'))?'Apps':'Seus Apps',
			icon:'list'
		});
		Tracker.autorun(function(){
			var page = FlowRouter.getQueryParam('page');
			Meteor.subscribe('allAplicativos', page);
		});
	},
	rendered:function(){
		$('.ui.dropdown').dropdown();
		$('#addAppShow').popup({
			inline:true,
			hoverable:true,
			position: 'right center'
		});
	},
	helpers:{
		ready:function(){
			return true;
		},
		aplicativos:function(){
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			var qtd = 10;
			var aplicativos = Aplicativo.find({},{sort:{name:1}}).fetch();
			return {
				page:page,
				count:Counts.get('allAplicativos'),
				data:aplicativos,
				pages:Math.ceil(Counts.get('allAplicativos')/qtd)
			}
		}
	},
	events:{
		'submit #addAppForm':function(e,t){
			e.preventDefault();
			var fields = $(e.currentTarget).form('get values');
			Meteor.call("aplicativosForm", {info:fields}, function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					Bert.alert('Aplicativo criado com sucesso.','success');
					FlowRouter.go('aplicativosUpdateInfoRoute',{aplicativoId:result})
				}
			});
		},
		'click .selectAppEvent':function(e,t){
			// Todo
			FlowRouter.go('aplicativosUpdateInfoRoute',{aplicativoId:this._id});
		}
	}
});
