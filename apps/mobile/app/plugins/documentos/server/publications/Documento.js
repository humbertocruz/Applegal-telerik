Meteor.publishComposite('',function(){
	return {
		find:function(){
			var documento = Documento.find({active:true},{sort:{date:-1},limit:10});
			return documento;
		},
		children:[
			{
				find:function(documento){
					return Tipo.find(documento._id);
				}
			}
		]
	}
});
