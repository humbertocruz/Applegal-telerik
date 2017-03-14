/*
** Publica todos os Arquivos públicos na conta Cloudinary do APP Principal
** Paginação de 8 em 8
** Não faz nenhum tipo de check de permissão
*/
Meteor.publishComposite('allWallpapers', function (aplicativoId, page, qtd) {
	if (!page) page = 1;
	var search = {
		aplicativoId:aplicativoId,
		tags: {
			$in:['public']
		}
	};
	return {
		find:function(){
			Counts.publish(this, 'allWallpapers', Arquivo.find(search), {
				noReady: true
			});
			var arqs = Arquivo.find(search,{
				limit:qtd,
				skip:(page-1)*qtd
			});
			console.log(arqs.count());
			return arqs;
		}
	}
});

/*
** Publica um arquivo especificado pelo "public_id" do Cloudinary
** Não faz nenhum tipo de check de permissão
*/
Meteor.publish('oneArquivo', function (public_id) {
	if (public_id) return Arquivo.find({public_id:public_id});
	else return false;
});
