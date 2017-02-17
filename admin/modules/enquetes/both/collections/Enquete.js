Enquete = new Mongo.Collection('enquetes');
Enquete.helpers({
	respostas:function(){
		return EnqueteResposta.find({
			enquete_id:this._id,
			aplicativoId: aplicativoVar.get()._id
		}).fetch();
	}
});

EnqueteResposta = new Mongo.Collection('enquetes_respostas');
EnqueteResposta.helpers({
	user:function(){
		return Meteor.user.findOne(this.userId);
	}
});
