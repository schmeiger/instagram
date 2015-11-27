function callback(data){
	alert(data);
};


angular.module('myApp', []).
	controller('instagramRequest', function($scope, $http){

		$scope.searchSubmit = function() {
			var searchWord = $scope.data.search;
			// var url = "https://api.instagram.com/v1/tags/" + searchWord + "/media/recent?client_id=681d0c31ac454bdfac1d543911565da7&callback=callback";
			//https://api.instagram.com/oauth/authorize/?client_id=681d0c31ac454bdfac1d543911565da7&redirect_uri=http://localhost:5757/&response_type=code
			// var url = "https://api.instagram.com/v1/tags/nofilter/media/recent?access_token=ACCESS_TOKEN";

		   //  var request = {
		   //    // text: searchWord,
		   //    // outputMode: 'json',
		   //    callback: 'JSON_CALLBACK',
			  // client_id: '08a31ac4abd64715a96b38fbb9d419a3'
		   //  };



		    // $http({
		    //   method: 'JSONP',
		    //   url: url,
		    //   params: request
		    // })
		    // .then(function(result) {
		    //   $scope.instagramResponse = result.data;
		    // 		},
		    //   function(result) {
		    //     alert('error');
		    //   });

			// Client ID - 681d0c31ac454bdfac1d543911565da7
			// Access Token - 96ab943cbd594376b97d91bbe0588cb8


			 $http({
			    url: 'https://api.instagram.com/v1/tags/' + searchWord + '/media/recent?access_token=96ab943cbd594376b97d91bbe0588cb8',
			    method: 'GET'
			  })
			  .then(function(response) {
			    console.log('Success!');
			    // called when the data is available
			  },
			  function(response) {
			    console.log('Failure :(');
			    // called when an error occurs or
			    // the server returns data with an error status
			});
	  	};

	});