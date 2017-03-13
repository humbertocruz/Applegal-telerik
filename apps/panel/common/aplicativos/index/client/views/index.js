Controller('aplicativosView',{
	created:function() {
		subMenuTitleVar.set({
			title:'Seus Apps',
			icon:'list'
		});
		sint = 0;
		aplicativosSearchVar = new ReactiveVar({});
		if (Roles.userIsInRole(Meteor.userId(),'admin')) {
			Tracker.autorun(function(){
				Meteor.subscribe("allAplicativos", aplicativosSearchVar.get(),FlowRouter.getQueryParam('page'));
			});
		}
	},
	rendered:function(){
		$('.ui.dropdown').dropdown();
		$('#addAppModal').modal({
			onApprove:function(){
				var name = $('#nameField').val();
				Meteor.call("aplicativosForm", {name:name}, function(error, result){
					if(error){
						console.log("error", error);
					}
					if(result){
						Bert.alert('Aplicativo criado com sucesso','success');
					}
				});
			}
		});
		$('.usernameField').mask('999.999.999-99');
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
		'click .selectAppEvent':function(e,t){
			// Todo
			FlowRouter.go('aplicativosUpdateRoute',{aplicativoId:this._id});
		},
		'click #addAppEvent':function(e,t){
			$('#addAppModal').modal('show');
		}
	}
});
