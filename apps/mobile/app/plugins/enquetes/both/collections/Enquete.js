Enquete = new Mongo.Collection('eplg_enquetes_nquetes');
Enquete.helpers({
	resposta:function(){
		return EnqueteResposta.findOne({enquete_id:this._id});
	}
});

EnqueteResposta = new Mongo.Collection('enquetes_respostas');
EnqueteResposta.helpers({
	user:function(){
		return Meteor.user.findOne(this.user_id);
	}
});
