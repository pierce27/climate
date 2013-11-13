var projectApp = angular.module('projectApp', []);

$(function() {
  $( "#datepicker" ).datepicker();
});



// -------------------------------------------TASK CONTROLLER -------------------------------------------//
     
projectApp.controller('TaskListCtrl', function TaskListCtrl($scope, $http) {
  
   



  //GET TASKS FOR MAIN
  $http.get('/findTasks').success(function(data){

    console.log(data)
    $scope.tasks = data;
    //$scope.$apply();

  });

  //GET MY USER INFO
  $http.get('/getMe').success(function(data){

    console.log(data)
    $scope.me = data;
    //$scope.$apply();
    console.log($scope.me)

  });
  
  //FILTER
  $scope.orderProp = 'name';


  //REFRESH BUTTON
  $( ".refresh" ).click(function() {$scope.apply});


  //DATE PICKER
  $(function() {
    $('#datepicker')
        .datepicker()   
        .on('changeDate', function(e){    
            $scope.dueDate = $('#datepicker').val();    

        });
  });



  //SAVE TASK
  $scope.saveTask = function() {
      console.log('saving')
      idx = $scope.idx
      i = $scope.tasks.length + 1
      var task_to_save = {name: $scope.name, description: $scope.description, details: $scope.details, id: $scope.id, dueDate: $scope.dueDate};
      console.log('date')
      console.log($scope.dueDate)
      // this.tasks.push(newTask);
      if ($scope.id == 0){
        $http.post('/newTask', task_to_save).success(function(data){
          console.log('Saved');
          $scope.tasks.push(data);
          $('#createTaskArea').modal('hide')

          
        });
      } else {
      $http.post('/updateTask', task_to_save).success(function(data){
      
          console.log('Saved');
          $scope.tasks[idx].details = $scope.details
          $scope.details = ''
          $scope.tasks[idx].dueDate = $scope.dueDate 
          $scope.dueDate = ''
          $scope.tasks[idx].name = $scope.name
          $scope.name = ''
          $scope.tasks[idx].description = $scope.description
          $scope.description = ''
          $scope.idx = 0
          $scope.id = 0
          $scope.apply
          $('#createTaskArea').modal('hide')

          
        });
      }
      
  };




  //DELETE TASK
  $scope.deleteTask = function ( idx ) {
  
    console.log($scope.tasks[idx])
    var task_to_delete = $scope.tasks[idx];

    $http.post('/deleteTask', task_to_delete).success(function(data){
      console.log('success');
      $scope.tasks.splice(idx, 1);
      // console.log(data);
      $scope.apply

    });
      
  };

  
  $scope.showEdit = function(idx){

    $scope.id = $scope.tasks[idx]._id
    $scope.idx = idx
    $scope.details = $scope.tasks[idx].details
    $scope.dueDate = $scope.tasks[idx].dueDate
    $scope.name = $scope.tasks[idx].name
    $scope.description = $scope.tasks[idx].description
    // $('#createTask').addClass('hide')
    // $('#editTask').removeClass('hide')
    $('#createTaskArea').modal('show')

  }

  $scope.showNew = function(){

    $scope.idx = 0
    $scope.id = 0
    $('#createTaskArea').modal('show')


  }




});




// -------------------------------------------WEDDING CONTROLLER -------------------------------------------//

projectApp.controller('WeddingsCtrl', function WeddingCtrl($scope, $http) {

  $http.get('/findWedding').success(function(data){

    $scope.weddings = data;
    console.log('Wedding')
    console.log($scope.weddings)
    // $scope.$apply();


  });


  //LOGOUT

  $scope.logout = function(){
    console.log('loggin out')

    $http.get('/logout').success(function(data){
      console.log('heres data')
      window.location = '/login'
      // console.log(data);

    });
  }





})






