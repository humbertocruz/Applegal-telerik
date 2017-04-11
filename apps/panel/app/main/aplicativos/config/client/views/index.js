Controller('aplicativosView',{
	created:function() {
		var me = this;
		subMenuTitleVar.set({
			title:(Roles.userIsInRole(Meteor.userId(),'admin'))?'Apps':'Seus Apps',
			icon:'list'
		});
		me.autorun(function(){
			var params = {
				page:(FlowRouter.getQueryParam('page')?FlowRouter.getQueryParam('page'):1),
				pages:15
			};
			allAplicativos = me.subscribe('allAplicativos', params);
		});
	},
	rendered:function(){
		$('.ui.dropdown').dropdown();
		$('#addAppShow').popup({
			on:'click',
			position: 'right center'
		});
	},
	helpers:{
		aplicativos:function(){
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			var qtd = 15;
			var aplicativos = Aplicativo.find({},{limit:qtd,sort:{name:1}}).fetch();
			return {
				page:page,
				count:Counts.get('allAplicativos'),
				data:aplicativos,
				pages:Math.ceil(Counts.get('allAplicativos')/qtd)
			}
		}
	},
	events:{
		'click #prevPage':function(){
			var page = FlowRouter.getQueryParam('page');
			if (page && page > 1) page--;
			FlowRouter.go(FlowRouter.getRouteName(),FlowRouter.getParam(),{page:page});
		},
		'click #nextPage':function(){
			var page = FlowRouter.getQueryParam('page');
			if (page) page++; else page = 2;
			FlowRouter.go(FlowRouter.getRouteName(),FlowRouter.getParam(),{page:page});
		},
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
