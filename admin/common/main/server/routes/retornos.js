var bodyParser = Npm.require('body-parser');
Picker.middleware(bodyParser.urlencoded({ extended: false }));
Picker.middleware(bodyParser.json());

Picker.route('/notificacao', function(params, req, res, next) {
  console.log(req.body);
  var pagseguro = Meteor.settings.pagseguro;

  if (req.body.notificationCode) notif = req.body.notificationCode
  else {
    console.log('false');
    return res;
  }
  var url = pagseguro.url + notif + '?email=' + pagseguro.email + '&token=' + pagseguro.token;
  HTTP.get(url,function(err, result){
    var parser = new xml2js.Parser({
      explicitArray:false
    });
    parser.parseString(result.content, function (jsError, jsResult) {
      var pag = Pagamento.findOne({"code":{$in:[jsResult.transaction.code]}});
      if (pag) {
        console.log('updating');
        Pagamento.update(pag._id,{$set:jsResult.transaction});
      } else {
        console.log('inserting');
        var user = Accounts.findUserByEmail(jsResult.transaction.sender.email);
        var negocio = Negocio.findOne({"userId":user._id});
        if (!negocio) negocio = false;
        jsResult.transaction.negocio = negocio;
        jsResult.transaction.processed = false;
        Pagamento.insert(jsResult.transaction);
      }
    });
  });
  return;
});
