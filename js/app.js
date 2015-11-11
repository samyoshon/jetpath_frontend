angular
	.module('jetpathApp', ['ngResource', 'ui.router'])
	.config(MainRouter);

MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

function MainRouter($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/");

		$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'views/home.html'
		})
		.state('jobs', {
			url: '/jobs',
			templateUrl: 'views/job.html',
			// controller: "jobsController"
		})
		// .state('saved', {
		// 	url: '/jobs/saved',
		// 	templateUrl: 'saved.html',
		// 	// controller: "jobsController"
		// })
		.state('new', {
			url: '/new',
			templateUrl: 'views/new.html',
			// controller: "jobsController"
		})
		// .state('candidates', {
		// 	url: '/candidates',
		// 	templateUrl: 'candidates.html',
		// 	// controller: "jobsController"
		// })
		// .state('applicants', {
		// 	url: '/applicants',
		// 	templateUrl: 'applicants.html'
		// })
		.state('login', {
			url: '/login',
			templateUrl: 'views/login.html'
		});
}