Mensagem = new Mongo.Collection('mensagens');
Mensagem.helpers({
  remetente:function(){
    return Meteor.users.findOne(this.user_id,FlowRouter.getParam('aplicativoId'));
  }
});
