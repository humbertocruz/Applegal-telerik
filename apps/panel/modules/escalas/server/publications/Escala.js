Meteor.publishComposite('allEscalas', function(search,page){
	if (typeof(DomainAppVar) == 'undefined') return false;
	return {
		find:function(){
			if (!search) search = {};
			search.appGroup = DomainAppVar.appGroup;
			if (!page) page = 1;
			var pages = 10;
			Counts.publish(this,'allEscalas',Escala.find(search), { noReady: true });
			var escalas = Escala.find(search,{sort:{data:-1},limit:pages,skip:(page-1)*pages});
			return escalas;
		},
		children:[
			{
				find:function(escala){
					return Servico.find({
						_id:escala.servico_id,
						appGroup:DomainAppVar.appGroup
					});
				}
			}
		]
	}
});

Meteor.publishComposite('oneEscala', function(id){
	return {
		find:function(){
			var escala = Escala.find({
				_id:id,
				appGroup:DomainAppVar.appGroup
			});
			return escala;
		}
	}
});
