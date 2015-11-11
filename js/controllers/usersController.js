angular.module('jetpathApp')
	.controller('UsersController', UsersController);

UsersController.$inject = ['$http', 'jobsFactory', '$timeout', '$window'];

function UsersController ($http, jobsFactory, $timeout, $window){
	var self = this;

	self.all = [];
	self.loginUserInfo = {};
	self.registerUserInfo = {};
	self.user = {};
	var curr_user;

	self.getUsers = getUsers;
	self.registerUser = registerUser;
	self.loginUser = loginUser;
	getUsers();

	//SET UP $HTTP REQUEST TO GET ALL JOBS //
	function getUsers(){
		$http
			.get('http://localhost:3000/users')
			.then(function(response){
				self.all = response.data.users;
		});
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
	function registerUser() {
		$http.post('http://localhost:3000/register', self.registerUserInfo)
			.then(function(response){
			curr_user = response;
			console.log(response);
			getUsers();
		});
		self.registerUserInfo = {};
	}
	// END //

	//ALLOW EMPLOYERS TO POST JOBS //
	function loginUser() {
		$http.post('http://localhost:3000/login', self.loginUserInfo)
			.then(function(response){
				curr_user = response.data.user;
			window.localStorage.setItem('curr_user', JSON.stringify(curr_user));
			//var curr_user = JSON.parse(window.localStorage.getItem("curr_user"));
			console.log('curr_user ' + curr_user);
			getUsers();
		});
		self.loginUserInfo = {};
	}
	// END //

}
