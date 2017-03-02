Controller 'formGaleriasView',
	created: ->
		Tracker.autorun ->
			oneGaleria = Meteor.subscribe('oneGaleria', FlowRouter.getParam('id'), FlowRouter.getParam('aplicativoId'))
			return
		return
	rendered: ->
		$('#noticiasForm .ui.dropdown').dropdown()
		$('#formGaleriasView').form
			onFailure: (prompts, values) ->
				false
			inline: true
			fields: subjectField:
				indentifier: 'titleField'
				rules: [ {
					type: 'empty'
					prompt: 'O título não deve estar vazio'
				} ]
		if id = FlowRouter.getParam('id')
			galeria = Galeria.findOne(id)
			if !galeria
				return false
			$('#galeriasForm').form 'set values', galeria
			$('#galeriasForm').form 'set value', 'dateField', moment(galeria.date).format('YYYY-MM-DD')
		else
			$('#galeriasForm').form 'set value', 'dateField', moment().format('YYYY-MM-DD')
		# Upload
		Arquivo.resumable.assignBrowse $('.fotoBrowse')
		Arquivo.resumable.on 'fileAdded', (file) ->
			if !_.contains([
					'image/png'
					'image/jpeg'
				], file.file.type)
				Bert.alert 'Só são permitidos arquivos PNG ou JPG!', 'warning'
				return false
			arquivosUploadProgressVar.set 0
			# Create a new file in the file collection to upload
			Arquivo.insert {
				_id: file.uniqueIdentifier
				filename: file.fileName
				contentType: file.file.type
				metadata:
					type: 'foto'
					aplicativoId: FlowRouter.getParam('aplicativoId')
					galeriaId: FlowRouter.getParam('galeriaId')
			}, (err, _id) ->
				# Callback to .insert
				if err
					return console.error('Erro ao enviar o arquivo!', err)
				# Once the file exists on the server, start uploading
				Arquivo.resumable.upload()
				return
			return
		return
	helpers:
		galeria_id: ->
			FlowRouter.getParam 'id'
		locationOrigin: ->
			location.origin
		fotos: ->
			if !FlowRouter.getParam('id')
				return false
			galeria = Galeria.findOne(FlowRouter.getParam('id'))
			if !galeria
				return false
			galeria.fotos()
		capa_id: ->
			if !FlowRouter.getParam('id')
				return false
			galeria = Galeria.findOne(FlowRouter.getParam('id'))
			galeria.capa_id
		header: ->
			{
				title: if FlowRouter.getParam('id') == undefined then 'Inserir Galeria' else 'Editar Galeria'
				icon: 'picture'
				corner: 'add'
			}
		saveLink: ->
			{
				title: 'Salvar'
				icon: 'save'
				form: 'galeriasForm'
			}
		extraLinks: ->
			[ {
				title: 'Cancelar'
				params: aplicativoId: FlowRouter.getParam('aplicativoId')
				route: 'galeriasRoute'
				icon: 'left chevron'
			} ]
	events:
		'click .capaBtn': (e, t) ->
			fields =
				_id: FlowRouter.getParam('id')
				capa_id: @_id
			Meteor.call 'galeriasForm', fields, FlowRouter.getParam('aplicativoId'), (error, result) ->
				if error
					console.log 'error', error
				if result
					Bert.alert 'Foto marcada como capa com sucesso.', 'success'
				return
			return
		'click .deleteBtn': (e, t) ->
			me = this
			htmlConfirm 'Excluir', 'Você tem certeza?', ->
				Meteor.call 'fotosRemove', me._id, FlowRouter.getParam('aplicativoId'), (error, result) ->
					if error
						console.log 'error', error
					if result
						Bert.alert 'Foto excluida com sucesso.', 'success'
					return
				return
			return
		'submit #galeriasForm': (e, t) ->
			e.preventDefault()
			fields = $(e.target).form('get values')
			id = FlowRouter.getParam('id')
			if id
				fields._id = id
			Meteor.call 'galeriasForm', fields, FlowRouter.getParam('aplicativoId'), (error, result) ->
				if error
					console.log 'error', error
				if result
					Bert.alert 'A galeria foi salva com sucesso!', 'success'
					if FlowRouter.getParam('id')
						FlowRouter.go 'galeriasRoute', aplicativoId: FlowRouter.getParam('aplicativoId')
					else
						FlowRouter.go 'galeriasUpdateRoute',
							id: result
							aplicativoId: FlowRouter.getParam('aplicativoId')
				return
			return
