Meteor.publishComposite('',function(){
	return {
		find:function(){
			var enquetes = Enquete.find({active:true},{sort:{date:-1},limit:10});
			return enquetes;
		},
		children:[
			{
				find:function(enquete){
					return EnqueteResposta.find({enquete_id:enquete._id,user_id:this.userId});
				}
			}
		]
	}
});
