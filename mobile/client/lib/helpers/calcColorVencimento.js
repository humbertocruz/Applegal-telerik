Template.registerHelper("calcColorVencimento", function(venc){
  if (!venc) return 'green';
  var hoje = moment();
  var venc = moment(venc,'YYYY-MM-DDTHH:mm:ss.SSSSZ');
  var dias = venc.diff(hoje,'days');
  if (dias > 15) return 'green';
  if (dias > 5) return 'yellow';
  return 'red';
});
