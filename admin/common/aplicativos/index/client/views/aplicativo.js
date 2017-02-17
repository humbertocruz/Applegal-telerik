Controller('aplicativosIndexView',{
	helpers:{
		aplicativo:function(){
			return Aplicativo.findOne(FlowRouter.geParam('id'));
		}
	}
});
