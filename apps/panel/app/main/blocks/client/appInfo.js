Controller('appInfoView',{
	helpers:{
		aplicativoId:function(){
			return FlowRouter.getParam('aplicativoId');
		}
	}
});
