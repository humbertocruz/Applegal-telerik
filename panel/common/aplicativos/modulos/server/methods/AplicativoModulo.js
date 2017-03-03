Meteor.methods({
	aplicativosUpdateModulo:function(fields){

		// se não estiver logado
		if (!this.userId) return false;
		// se não for Gerente do aplicativo ou Admin
		var canDoIt = false;
		if (Roles.userIsInRole(this.userId,'manager',fields.aplicativoId)) canDoIt = true;
		if (Roles.userIsInRole(this.userId,'admin')) canDoIt = true;
		if (!canDoIt) return false;
		fields.order = parseInt(fields.order); // order campo numerico
		return AplicativoModulo.update(fields._id, {$set:fields});
	},
	aplicativosAddModulo:function(fields){
		// se não estiver logado
		if (!this.userId) return false;
		// se não for Gerente do aplicativo ou Admin
		var canDoIt = false;

		if (Roles.userIsInRole(this.userId,'manager',fields.aplicativoId)) canDoIt = true;
		if (Roles.userIsInRole(this.userId,'admin')) canDoIt = true;

		if (!canDoIt) return false;

		var mod = Modulo.findOne(fields.moduloId);
		var lastMod = AplicativoModulo.findOne({
			aplicativoId:fields.aplicativoId
		},{
			order:{
				order:-1,
				limit:1
			}
		});
		if (lastMod) order = lastMod.order+10;
		else order = 10;
		fields.title = mod.title;
		fields.icon = mod.icon;
		fields.order = order;
		return AplicativoModulo.insert(fields);
	}
});
