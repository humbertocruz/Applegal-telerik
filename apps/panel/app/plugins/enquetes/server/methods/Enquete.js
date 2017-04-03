Meteor.methods({
	enquetesForm:function(fields,aplicativoId) {
		fields.date_starting = moment(fields.date_starting).toDate();
		fields.date_ending = moment(fields.date_ending).toDate();
		fields.aplicativoId = aplicativoId;
		if (!fields.id) {
			fields.user_created = this.userId;
			fields.date_created = new Date();

			fields.active = false;
			fields.perguntas = [];
			Enquete.insert(fields);
		} else {
			fields.user_updated = this.userId;
			fields.date_updated = new Date();
			Enquete.update(fields.id, {
				$set: fields
			});
		}
		return true;
	},
	enquetesRemove:function(id,aplicativoId) {
		return Enquete.remove({
			_id:id,
			appGroup:DomainAppVar.appGroup
		});
	},
	enquentesUpdatePerguntas:function(enquete_id,perguntas,aplicativoId){
		return Enquete.update({
			_id:enquete_id,
			aplicativoId:aplicativoId
		},{$set:{perguntas:perguntas}});
	},
	enquentesUpdateOpcoes:function(enquete_id,ordem,perguntas,opcoes,aplicativoId){
		perguntas[ordem].opcoes = opcoes;
		return Enquete.update({
			_id:enquete_id,
			aplicativoId:aplicativoId
		},{$set:{perguntas:perguntas}});
	},
	enquetesRemovePergunta:function(enquete_id,order,aplicativoId){
		var enquete = Enquete.findOne({
			_id:enquete_id,
			aplicativoId:aplicativoId
		});
		enquete.perguntas.splice(order,1);
		_.each(enquete.perguntas, function(perg,idx){
			perg.order = idx;
		});
		return Enquete.update({
			_id:enquete_id,
			aplicativoId:aplicativoId
		}, enquete);
	},
	enquetesRemoveOpcao:function(enquete_id,pergunta_order,opcao_order,aplicativoId){
		var enquete = Enquete.findOne({
			_id:enquete_id,
			aplicativoId:aplicativoId
		});
		enquete.perguntas[pergunta_order].opcoes.splice(opcao_order,1);
		_.each(enquete.perguntas[pergunta_order].opcoes, function(opc,idx){
			opc.order = idx;
		});
		return Enquete.update({
			_id:enquete_id,
			aplicativoId:aplicativoId
		}, enquete);
	},
	enquetesActivate:function(id,aplicativoId){
		Enquete.update({
			_id:id,
			aplicativoId:aplicativoId
		}, {
			$set: {
				active:true
			}
		});
	},
	enquetesDeactivate:function(id,aplicativoId){
		Enquete.update({
			_id:id,
			aplicativoId:aplicativoId
		}, {
			$set: {
				active:false
			}
		});
	}
});
