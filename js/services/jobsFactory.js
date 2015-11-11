angular.module('jetpathApp')
	.factory('jobsFactory', jobsFactory);

jobsFactory.$inject = ['$resource'];

function jobsFactory($resource) {

	var JobsResource = $resource('http://localhost:3000/jobs/:id',
		{id: '@_id'},
		{'update': {method: 'PATCH'}}
	);

	return JobsResource;
}