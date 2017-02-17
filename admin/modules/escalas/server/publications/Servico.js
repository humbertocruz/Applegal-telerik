Meteor.publishComposite('allServicos', function(search){
	if (typeof(DomainAppVar) == 'undefined') return false;
	return {
		find:function(){
			if (!search) search = {};
			search.appGroup = DomainAppVar.appGroup;
			Counts.publish(this,'allServicos',Servico.find(search), { noReady: true });
			var servicos = Servico.find(search,{sort:{name:1}});
			return servicos;
		}
	}
});
