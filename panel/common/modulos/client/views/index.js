Controller('modulosView',{
	created:function() {
		sint = 0;
		modulosSearchVar = new ReactiveVar({});
	},
	helpers:{
		ready:function(){
			return true;
		},
		header:function(){
			return {
				title:'Módulos',
				icon:'puzzle'
			}
		},
		newLink:function(){
			return false;
		},
		extraLinks:function(){
			return [
				{
					title:'Adicionar',
					route:'modulosInsertRoute',
					icon:'add'
				}
			]
		},
		modulos:function(){
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			var qtd = 10;
			var modulos = Modulo.find({},{sort:{name:1}}).fetch();

			return {
				page:page,
				count:Counts.get('allModulos'),
				data:modulos,
				pages:Math.ceil(Counts.get('allModulos')/qtd)
			}
		}
	},
	events:{
		'click .removeBtn':function(e,t){
			var me = this;
			htmlConfirm('Aviso','Você tem certeza?',function(){
				Meteor.call("modulosRemove", me._id, function(error, result){
					if(error){
						console.log("error", error);
					}
					if(result){
						Bert.alert('Módulo excluído com sucesso','success');
					}
				});
			});
		}
	}
});
