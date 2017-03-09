Meteor.methods({
	setServerAppId:function(aplicativoId){
		aplicativoIdServerVar = aplicativoId;
	},
	checkApp:function(aplicativoId){
		if (Aplicativo.findOne(aplicativoId)) return true;
		else return false;
	},
	aplicativosUploadLogo:function(file,aplicativoId){
		file = new Meteor.Collection.ObjectID(file);
		return Aplicativo.update({_id:aplicativoId},{
			$set:{
				appLogo:file
			}
		});
	},
	aplicativosForm: function(fields) {
		var user = Meteor.users.findOne(this.userId);
		fields.createdAt = moment().toDate();
		if (!fields._id) {
			// Grava aplicativo
			var appId = Aplicativo.insert(fields);
			// Se nao for usuario ADMIN
			if (!Roles.userIsInRole(this.userId,'admin')) {
				// Faz usuario atual MANAGER do aplicativo criado
				Roles.addUsersToRoles(this.userId, ['manager'], appId);
			}
			return appId;
		} else {
			fields.updatedAt = moment().toDate();
			fields.updatedBy = Meteor.userId();
			Aplicativo.update(fields._id, {
				$set: fields
			});
			return fields._id;
		}
	},
	aplicativosRemove: function(id) {
		if (!this.userId) return false;
		return Aplicativo.remove(id);
	}
});
