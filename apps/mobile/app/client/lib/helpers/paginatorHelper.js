Template.registerHelper("paginatorHelper", function(args){
	var itemsPerPage = 2;
	var count = args.hash.count;
	var page = parseInt(FlowRouter.getQueryParam('page')?FlowRouter.getQueryParam('page'):1);
	var qtd = Math.ceil(count/itemsPerPage);

	var ini = page - 2;
	var end = page + 2;

	if(page<3) {
		ini = 1;
		end = (qtd>5?5:qtd);
	} else if(page>qtd-2){
		end = qtd;
		ini = (end-5<1?1:end-5);
	}

	var pages = [];

	for(x=ini;x<=end;x++){
		pages.push({
			page:x,
			active:(page==x?'active':''),
			disabled:(page==x?'readonly':'')
		});
	}

	return pages;
});
