Template.registerHelper("appLogoByDomain", function(){
  appByDomainSubs = Meteor.subscribe("appByDomain", location.protocol, location.hostname);
  var appByDomain = Aplicativo.findOne({
    domain: location.protocol+'//'+location.hostname
  });
  if (appByDomain) {
    return '/gridfs/logos/md5/'+appByDomain.appLogo().md5;
  } else {
    return '/images/technotronics.png';

  }
});
