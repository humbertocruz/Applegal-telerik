Meteor.methods({
	appChangeBgColor:function(data){
		return Aplicativo.update(data.appId,{
			$set:{
				wallpaper:data.rgb
			}
		})
	},
	appRemoveAll:function(aplicativoId){

		// Removendo Arquivos
		Arquivo.remove({
			aplicativoId:aplicativoId
		});
		// Removendo Modulos do Aplicativo
		AplicativoPlugin.remove({
			aplicativoId:aplicativoId
		});
		// Removendo dados do Cloudinary
		AppCloudinary.remove({
			aplicativoId:aplicativoId
		});
		// Removendo dados de Redes Sociais
		Social.remove({
			aplicativoId:aplicativoId
		});
		// Removendo Modulo Documentos
		Documento.remove({
			aplicativoId:aplicativoId
		});
		// Removendo Tipos de Documentos
		Tipo.remove({
			aplicativoId:aplicativoId
		});
		// Removendo Enquetes
		Enquete.remove({
			aplicativoId:aplicativoId
		});
		//Removendo Respostas das Enquetes
		EnqueteResposta.remove({
			aplicativoId:aplicativoId
		});
		// Removendo Galerias
		Galeria.remove({
			aplicativoId:aplicativoId
		});
		// Removendo Assuntos de Noticias
		Assunto.remove({
			aplicativoId:aplicativoId
		});
		// Removendo Noticias
		Noticia.remove({
			aplicativoId:aplicativoId
		});
		// Removendo Aplicativo
		Aplicativo.remove({
			_id:aplicativoId
		});

		// Removendo permissoes de cada usuário do app
		var users = Meteor.users.find({
			roles:aplicativoId
		}).fetch();
		_.each(users,function(u){
			var roles = Roles.getRolesForUser(u._id, aplicativoId);
			Roles.removeUsersFromRoles(u._ud,roles,aplicativoId);
		});
		return true;
	},
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

		if (!fields._id) {
			fields.createdAt = moment().toDate();
			fields.createddBy = Meteor.userId();
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
