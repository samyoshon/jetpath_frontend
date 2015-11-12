angular.module('jetpathApp')
	.controller('JobsController', JobsController);

JobsController.$inject = ['$http', 'jobsFactory', '$timeout'];

function JobsController ($http, jobsFactory, $timeout){
	var self = this;

	self.all = [];
	self.newJob = {};

	self.getJobs = getJobs;
	self.postJob = postJob;
	self.jobApply = jobApply;

	getJobs();
	// maxLength();
	
	// function maxLength() {
	// 	var text_max = 700;
	// 	$('#textarea_feedback').html(text_max + ' characters remaining');

	// 	$('#textarea').keyup(function() {
	// 		var text_length = $('#textarea').val().length;
	// 		var text_remaining = text_max - text_length;
	// 		$('#textarea_feedback').html(text_remaining + ' characters remaining');
	// 	});
	// }

	//SET UP $HTTP REQUEST TO GET ALL JOBS //
	function getJobs(){
		$http
			.get('http://localhost:3000/jobs')
			.then(function(response){
				self.all = response.data.jobs;
				// ALLOWS FILTER BY COUNTRIES
				self.countries = getUnique(self.all, 'country');
				self.selectedCountry = self.countries[0];
		});
	}
	// END //

		//SET UP TO FILTER BY COUNTRIES //
		function getUnique(arr, field) {
			var obj = {};
			arr.forEach(function(e){
				obj[e[field]] = true;
			});
			
			return Object.keys(obj).sort();
		}
		// END //

	//SET UP TO TRANSITION BETWEEN PAGES //
	self.transition = function () {
		self.isTransitioning = true;
		$timeout(function () {
			self.isTransitioning = false;
		}, 100);
	};
	// END //

	//ALLOW EMPLOYERS TO POST JOBS //
	function postJob() {
		$http.post('http://localhost:3000/jobs', self.newJob)
			.then(function(response){
			console.log(response);
			getJobs();
		});
		self.newJob = {};
	}
	// END //

	//USER APPLIES TO JOB //
	function jobApply(job) {
		// var url = 'http://localhost:3000/apply/' + job._id;
		var curr_user = JSON.parse(window.localStorage.getItem("curr_user"));
		$http
			.post('http://localhost:3000/apply', {job: job, user: curr_user})
			.then(function(response){
				console.log(response);
		});
	}
	// END //

}
