import { permRoutes } from '../../../permRoutes.js';

assuntosRoutes = permRoutes.group({
	name: 'assuntosRoutes',
	prefix: '/noticias/assuntos'
});

assuntosRoutes.route('/', {
	name: 'noticiasAssuntosRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenuApp',
			main: 'noticiasAssuntosView'
		});
	}
});

assuntosRoutes.route('/nova', {
	name: 'noticiasAssuntosInsertRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenuApp',
			main: 'noticiasAssuntosFormView'
		});
	}
});

assuntosRoutes.route('/:id', {
	name: 'noticiasAssuntosUpdateRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenuApp',
			main: 'noticiasAssuntosFormView'
		});
	}
});
