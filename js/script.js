angular.module('myApp', [])
    .config(function($httpProvider) {
        //These have been added for CORS support, but instagram does not support CORS, so we need to use JSONP.
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    })
	.controller('instagramRequest', function($scope, $http, $location, $window) {
        if ($location.path().indexOf('/access_token=') == -1) {
            // var clientId = '681d0c31ac454bdfac1d543911565da7';
            // var targetUri = encodeURIComponent('http://localhost:5757/');
            var clientId = '948bc6f0f8d5452196436abf6c1cb743';
            var targetUri = encodeURIComponent('http://localhost:8080/thinkful/ANGULAR-JS/students/natali/instagram/index.html');
            $window.location.href = 'https://instagram.com/oauth/authorize/?client_id=' + clientId + '&redirect_uri=' + targetUri + '&response_type=token&scope=public_content';
            return;
        }
    
        $scope.code = $location.path().substring(14);
    
		$scope.searchSubmit = function() {
			var searchWord = $scope.data.search;


			/*********************************************
			* Get Tag Names / Works
			**********************************************/

            var url = 'https://api.instagram.com/v1/tags/search' + '?q=' + searchWord + '&access_token=' + $scope.code + '&callback=JSON_CALLBACK';
            $scope.instagramResponse = new Array();
			$http.jsonp(url)
				.then(
				  function(response) {
				  	if (response == null) {
				  		return;
				  	};

				  	for (var i=0; i<response.data.data.length; i++) {
				  		var tag = response.data.data[i];
				  		var url = 'https://api.instagram.com/v1/tags/' + tag.name + '/media/recent?access_token=' + $scope.code + '&callback=JSON_CALLBACK';

				  		$http.jsonp(url)
				  			.then(
				  				function(response) {
				  					if (response == null) {
				  						return;
				  					};

				  					for (var i=0; i<response.data.data.length; i++) {
				  						var media = response.data.data[i];
				  						$scope.instagramResponse[$scope.instagramResponse.length] = media.images.thumbnail;
				  					};				  					
				  				},
				  				function(error) {
				  					console.log('Details Search ' + tag.name + 'Failure :(');
				  				}
				  			);
				  	}
				    
				    // $scope.instagramResponse = response.data;
					// console.log($scope.instagramResponse);
				  },
				  function(error) {
				    console.log('Tag Search Failure :(');
				    // called when an error occurs or
				    // the server returns data with an error status
				  }
				);

			/*********************************************
			* Get The Images / Doesn't work :(
			**********************************************/

			var urlImg = 'https://api.instagram.com/v1/tags/' + searchWord + '/media/recent';

            var request = {
            	access_token : $scope.code,
            	callback : 'JSON_CALLBACK'
            };
			            
				
			$http({
		      method: 'JSONP',
		      url: urlImg,
		      params: request
		    })
			.then(
			  	function(response) {
				    console.log('Success! Got Images!');

				    $scope.instagramImgResponse = response.data;
				    console.log($scope.instagramImgResponse);
				  },
			    function(error) {
				    console.log("Failure!");
				}
			);
	  	}; // End "search Submit" Function

});

/*********************************************
* Nev Code
**********************************************/

// var url = 'https://api.instagram.com/v1/tags/search' +
   //                       '?q=' + searchWord + 
   //                       '&access_token=' + $scope.code + 
   //                       '&callback=JSON_CALLBACK';
            
	// $http.jsonp(url)
	//   .then(function(json) {
	//     console.log('Success!');
	//     // called when the data is available

	//     console.log(json);
	//   },
	//   function(error) {
	//     console.log('Failure :(');
	//     // called when an error occurs or
	//     // the server returns data with an error status
	// });
// 	};



/*********************************************
* My Code
**********************************************/

	 // var url = 'https://api.instagram.com/v1/tags/' + searchWord + 
	 //                         '/media/recent';

	 //            var request = {
	 //            	access_token : $scope.code,
	 //            	callback : 'JSON_CALLBACK'
	 //            };
            
	
	// 		$http({
	// 	      method: 'JSONP',
	// 	      url: url,
	// 	      params: request
	// 	    })
	// 		  .then(
	// 		  	function(response) {
	// 			    console.log('Success!');
	// 			    // called when the data is available
	// 			    $scope.instagramResponse = response;

	// 			    console.log($scope.instagramResponse);
	// 			  },
	// 		    function(error) {
	// 			    console.log("Failure!");
	// 			}
	// 		);
	//   	};