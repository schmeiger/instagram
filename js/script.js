angular.module('myApp', [])
    .config(function($httpProvider) {
        //These have been added for CORS support, but instagram does not support CORS, so we need to use JSONP.
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    })
	.controller('instagramRequest', function($scope, $http, $location, $window) {
        if ($location.path().indexOf('/access_token=') == -1) {
            var clientId = '948bc6f0f8d5452196436abf6c1cb743';
            var targetUri = encodeURIComponent('http://127.0.0.1:43048/ANGULAR-JS/students/natali/instagram/index.html');
            $window.location.href = 'https://instagram.com/oauth/authorize/?client_id=' + clientId + '&redirect_uri=' + targetUri + '&response_type=token&scope=public_content';
            return;
        };
    
        $scope.code = $location.path().substring(14);
    
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
            var url = 'https://api.instagram.com/v1/tags/search' +
                         '?q=' + searchWord + 
                         '&access_token=' + $scope.code + 
                         '&callback=JSON_CALLBACK';
            
			$http.jsonp(url)
			  .then(function(json) {
			    console.log('Success!');
			    // called when the data is available
			  },
			  function(error) {
			    console.log('Failure :(');
			    // called when an error occurs or
			    // the server returns data with an error status
			});
	  	};

	});