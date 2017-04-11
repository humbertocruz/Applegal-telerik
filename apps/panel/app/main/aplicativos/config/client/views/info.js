Controller('aplicativosUpdateInfoView',{
	created:function(){
		var me = this;
		subMenuTitleVar.set({
			title:'Configuração do Aplicativo - Informações',
			icon:'info'
		});
		me.autorun(function(){
			var page = FlowRouter.getQueryParam('page');
			var aplicativoId = FlowRouter.getParam('aplicativoId');
			oneAplicativo = me.subscribe("oneAplicativo", aplicativoId);
			var libType = bibliotecaTypesVar.get();
			appBiblioteca = me.subscribe("appBiblioteca", page, aplicativoId, 12, libType);
		});
	},
	rendered:function(){
		var loadApp = function(aplicativo){
			$('.aplicativosForm').form('set values',aplicativo);
			$('.ui.dropdown').dropdown();
			appInfoVar.set(Aplicativo.findOne(FlowRouter.getParam('aplicativoId')));
			Meteor.call('setCloudinary',FlowRouter.getParam('aplicativoId'), function(err,result){
				$.cloudinary.config({
					cloud_name:result
				});
			});
		};

		Tracker.autorun(function(){
			var aplicativo = Aplicativo.findOne(FlowRouter.getParam('aplicativoId'));
			if (aplicativo) {
				loadApp(aplicativo.info);
			}
		});
	},
	helpers:{
	},
	events:{
		'click #generateCodeEvent':function(e,t){
			var code = parseInt(Random.fraction()*1000000)+'';
			var zeros = 6 - code.length;
			var z = '';
			for (i=0;i<zeros;i++) z+='0';
			$('#codeField').val(z+code);
		},
		'submit .aplicativosForm':function(e,t){
			e.preventDefault();
			var fields = $(e.currentTarget).form('get values');
			fields.code_time = moment().add(4,'hours').toDate();
			Meteor.call("aplicativosForm", {
				_id:FlowRouter.getParam('aplicativoId'),
				info:fields
			}, function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					Bert.alert('O aplicativo foi salvo com sucesso!','success');
				}
			});
		}
	}
});
