Template.registerHelper("paginatorHelper", function(args){
	var qtd = args.hash.pages;
	var page = parseInt(FlowRouter.getQueryParam('page')?FlowRouter.getQueryParam('page'):1);

	var ini = page - 2;
	if (ini < 1) ini = 1;
	var end = page + 2;
	if (end > qtd) end = qtd;

	if(page<3) {
		ini = 1;
		end = (qtd>5?5:qtd);
	} else if(page>qtd-2){
		end = qtd;
		ini = (end-4<1?1:end-4);
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
