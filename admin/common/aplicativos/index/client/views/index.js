Controller('aplicativosView',{
	created:function() {
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

		$('.usernameField').mask('999.999.999-99');
	},
	helpers:{
		aplicativoId:function(){
			return aplicativoVar.get()._id;
		},
		ready:function(){
			return true;
		},
		header:function(){
			return {
				title:'Aplicativos',
				icon:'android'
			}
		},
		newLink:function(){
			return false;
		},
		extraLinks:function(){
			return [
				{
					title:'Adicionar',
					route:'aplicativosInsertRoute',
					id: 'addBtn',
					icon:'add'
				}
			]
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
		'click #addBtn':function(e,t){
			aplicativoVar.set({_id:undefined});
		},
		'click .editBtn':function(e,t){
			e.preventDefault();
			aplicativoVar.set(Aplicativo.findOne(this._id));
			FlowRouter.go('aplicativosUpdateRoute');
		},
		'click .modulosBtn':function(e,t){
			e.preventDefault();
			aplicativoVar.set(Aplicativo.findOne(this._id));
			FlowRouter.go('aplicativosModulosRoute');
		},
		'click .usuariosBtn':function(e,t){
			e.preventDefault();
			aplicativoVar.set(Aplicativo.findOne(this._id));
			FlowRouter.go('aplicativosUsuariosRoute');
		},
		'click .removeBtn':function(e,t){
			var me = this;
			htmlConfirm('Aviso','Você tem certeza?',function(){
				Meteor.call('aplicativosRemove', me._id, function(error, result){
					if(error){
						console.log("error", error);
					}
					if(result){
						Bert.alert('Aplicativo excluído com sucesso','success');
					}
				});
			});
		}
	}
});
