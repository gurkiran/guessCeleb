var app = angular.module('app',[]);



app.service('quote',['$http',function($http){
    
    function getQuote(){
        return $http.get('http://quotes.rest/qod.json')
    }
        return {
            getQuote : getQuote
        }
    
}]);


app.controller('mainCtrl',['$scope','$window','$timeout','quote', function($scope,$window,$timeout,quote){
    
     var something = quote.getQuote().then(function(data){
           $scope.quote = data.data.contents.quotes[0].quote;
           $scope.author = data.data.contents.quotes[0].author;
       });
    
    $scope.score = 0;
    
    $scope.celebs = [
        {
            name:'winona ryder',
            url:'http://www.beyondanxietyanddepression.com/sites/beyondanxietyanddepression.com/files/styles/large/public/winona-ryder%E2%80%99s-battle-anxiety-and-depression.jpg?itok=_nZG9QXJ'
        },
        {
            name:'leonardo di caprio',
            url:'https://resizing.flixster.com/TOzK9PiZXQFjPgyvJejwhowrhJA=/500x500/v1.cjs0ODAyOTtqOzE2OTc5OzIwNDg7NTAwOzUwMA'
        },
        {
            name:'christian bale',
            url:'http://media3.s-nbcnews.com/i/streams/2013/January/130124/1C5696424-120909-christian-bale.jpg'
        },
        {
            name:'anne hathaway',
            url:'http://cdni.condenast.co.uk/592x888/a_c/anne-hathaway-glamour-12jan15-getty_592x888.jpg'
        },
        {
            name:'jessica alba',
            url:'http://cdn-img.instyle.com/sites/default/files/styles/320x384/public/images/2016/03/032916-jessica-alba-lead.jpg?itok=31GWc1WX'
        },
        {
            name:'robert de niro',
            url:'http://aspenpeak-magazine.com/get/files/image/migration/11670_content_robert-deniro-aspen-peak-1-1.jpg'
        },
        {
            name:'al pacino',
            url:'https://upload.wikimedia.org/wikipedia/commons/9/98/Al_Pacino.jpg'
        }
        
    ];

    $scope.start = function(){
      
        document.getElementById('reset').style.display='block';
        document.getElementById('reset').style.display='block';
        var pic = document.getElementById('pic');
        $scope.l = $scope.celebs.length-1;
       
        $scope.random = Math.round($scope.l* Math.random());      
        pic.setAttribute('src',$scope.celebs[$scope.random].url);
        
        
    
    }
    
     $scope.loadAnswers = function(){
        var randomanswer = Math.round(3*Math.random());
        console.log(randomanswer);
        
//        console.log($scope.celebs[5].name);
        
       var b = document.querySelectorAll('.answer');
      
        
        for(var i=0;i<4;i++){
            if(i === randomanswer) {
                b[i].innerHTML = $scope.celebs[$scope.random].name;                
            }else {
//                console.log(b[i]);
                 b[i].innerHTML = $scope.celebs[Math.round($scope.l*Math.random())].name;
            }
//           
        }
    }
     

    $scope.check = function(event){
        
        
        var id = document.getElementById(event.target.id);
      
        if(id.textContent === $scope.celebs[$scope.random].name){
            console.log('finally');
            document.getElementById(event.target.id).style.backgroundColor='green';
            $scope.score++;
        }else{
            console.log('lost!');
            document.getElementById(event.target.id).style.backgroundColor='red';
        }
        
       
       
        $timeout(function(){
             document.getElementById(event.target.id).style.backgroundColor='#C0C0C0';
            $scope.start();
            $scope.loadAnswers();
        
            },100)

        };

}]);