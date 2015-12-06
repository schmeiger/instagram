// Code goes here

angular.module('myApp', []).
  controller('greetingCtrl', function($scope, $q){
    
    /*var asyncGreet = function(name) {
    var deferred = $q.defer();
  
    setTimeout(function() {
      deferred.notify('About to greet ' + name + '.');
  
      if (okToGreet(name)) {
        deferred.resolve('Hello, ' + name + '!');
      } else {
        deferred.reject('Greeting ' + name + ' is not allowed.');
      }
    }, 1000);
  
    return deferred.promise;
  };
    
    var promise = asyncGreet('Schmeiger');
    
    promise.then(function(greeting) {
      alert('Success: ' + greeting);
    }, function(reason) {
      alert('Failed: ' + reason);
    }, function(update) {
      alert('Got notification: ' + update);
    });*/
    
    function intervalPromise(millis, count) {
        var deferred = $q.defer();
        
        if(count <= 0) {
            deferred.reject("Negative repeat count " + count);
        }
        
        var iteration = 0;
        
        var id = setInterval(function() {
            deferred.notify(++iteration, count);
            if(iteration >= count) {
                clearInterval(id);
                deferred.resolve();
            }
        }, millis);
        
        return deferred.promise();
    }
    
    intervalPromise(500, 4).then(
        function() {
            alert("Done");
        },
        function(e) {
            alert(e);
        },
        function(iteration, total) {
            alert("Completed " + iteration + " of " + total);
        }
    );
      
  });