Controller('adminLayout', {
	helpers: {
		aplicativoId:function(){
			return FlowRouter.getParam('aplicativoId');
		},
		isLoading:function() {
			return isLoadingVar.get();
		}
	}
});
