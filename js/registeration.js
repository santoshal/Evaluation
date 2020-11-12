$("document").ready(() => {
  


  if(sessionStorage.getItem("user")!=null)
  {
    $(".searchbar").show();
    $("#texteditor").hide();
    $("#mylogButton").hide();
    $("#createPost").show();
    $("#mysingUpButton").hide();
    $("#mylogOutButton").show();
    $('#profileid').show();
    $(".editMyProfile").hide();

  }
  else
  {
    $('#profileid').hide();
    $("#mylogOutButton").hide();
    $(".editMyProfile").hide();
  }

//  Not Registered? Create Account
$(".createAcc").click(() => {
  
  location.assign('registeration.html');
 
});



   //confirm password
   $("#cPassword").keyup(() => {
    var passw = $("#password").val();
    console.log(passw);
    console.log($("#cPassword").val());
    var cpv = $("#cPassword").val();
    if (passw != cpv) {
      $("#cp").html("Password Not Matching").css("color", "red");

      $('#sub').prop('disabled', true);
    }
    else {

      $("#cp").html("Password Matching").css("color", "green");

      $('#sub').removeAttr("disabled");
    }

  });


  //check if mail is present
  $("#mymail").keyup(() => {
   

    let Currentmail = $("#mymail").val();

    // console.log(data);
    $.getJSON("http://localhost:3000/profile", (data) => {
      for (var i = 0; i < data.length; i++) {
        if (data[i].email == Currentmail) {
       
          $("#mailCheck").html("This mail Id Already Exists");

          $("#password").prop('disabled', true);

          break;
        }
        else {
          
          // var mail = $("#mymail").val();  

          $('#password').removeAttr('disabled');
          $("#mailCheck").html(" ");

        }
      }
    })



  });




//logout 
$("#mylogOutButton").click(()=>{
  sessionStorage.removeItem("user");
  $("#mylogOutButton").hide();
  
    $('#mysingUpButton').show();         
   $('#mylogButton').show(); 
   $('#texteditor').hide();
   $('.createblog').hide();
   $('.myprofileDisp').hide();
   $('#profileid').hide();
   $('main').show();
   

});

  //registeration form
  $("#registerationForm").submit((a) => {
    a.preventDefault();  //to prevent auto submission of form
    debugger;
    var pass1 = $("#password").val();
    var hash = CryptoJS.MD5(pass1);
    document.getElementById('password').value = hash;
    var name = $("#name").val();
    var mail = $("#mymail").val();
    var pass = $("#password").val();
    var gend = $('input[name="gender"]:checked').val();
  
    $.ajax({
      url: "http://localhost:3000/profile",
      method: "POST",
      data: {
        
        "name": name,
        "email": mail,
        "password": pass,
        "gender": gend

      },
      success: (x) => {
      
        location.assign('index.html');
        
      },
      error:(err)=>{
        console.log(err);
      }
    
      

    })

  });


  //login Form
  $("#loginForm").submit((a) => {
    a.preventDefault();  //to prevent auto submission of form
    var pass2 = $("#loginPassword").val();
    var hash = CryptoJS.MD5(pass2);
    document.getElementById('loginPassword').value = hash;
    var mail = $("#loginMail").val();
    var pass = $("#loginPassword").val();
  
    $.getJSON("http://localhost:3000/profile", (data) => {
      for (var i = 0; i < data.length; i++) {


        if (data[i].email == mail && data[i].password == pass) {

          sessionStorage.setItem("user", JSON.stringify(data[i]));

 
             
          $('.login').hide();   
          $("#mylogOutButton").show();
          $(".searchbar").show();
          $(".createblog").show();
          $('#profileid').show();
        
          
          // var a = JSON.parse(sessionStorage.getItem("user"));
          // console.log("hello" + a.name);
          location.assign('index.html');
          // break;
          
        }
        if (data[i].email != mail && data[i].password != pass) {
          $("#validLogin").html("please check your email and password").css('color', 'red');
        }
      }
    })

  });





// profile js 
$(".myprofile").click(()=>{
          
 
    $("main").hide();
     $(".myprofileDisp").show();
     $(".editMyProfile").hide();
        
       var sessionName = JSON.parse(sessionStorage.getItem("user"));

 $("#userName").html(sessionName.name);

 $("p#sp1").append(sessionName.name);
 $("p#sp2").append(sessionName.email);
 $("p#sp3").append(sessionName.gender);

 $.getJSON("http://localhost:3000/posts", function (data) {

  $.each(data, function (key, value) {
    if (value.author ==  sessionName.name) 
    {     
      const content = `
        <blockquote id='${value.id}' class='quote-card'><p>${value.Content}</p></blockquote>
       <button  type="button" id='${value.id}' class="deleteContent" >Delete</button>`;
      //  var id=value.id;
       //alert(id);

       document.getElementById("post-column").innerHTML += content;

       $(".deleteContent").click((a)=>{
      // a.preventDefault();
        $.ajax({
          url: "http://localhost:3000/posts/" + value.id,
          method: "DELETE",
          success: function () {
            
    
          },
          error: function (error) {
            alert(error);
          },
        });
      
      });//delete end
     
    } 
    
  });
 
  $(".editP").click(()=>{
    var sessionName = JSON.parse(sessionStorage.getItem("user"));
 
    $("main").hide();
         
    $(".myprofileDisp").hide();
    $(".editMyProfile").show();     

    document.getElementById("nameOfUser").innerHTML=sessionName.name;
    document.getElementById("emailOfUser").innerHTML=sessionName.email;
    document.getElementById("showName").placeholder =sessionName.name;
    document.getElementById("showEmail").placeholder =sessionName.email ;
    document.getElementById("showGender").placeholder =sessionName.gender ;

    $("#saveInfo").click(function(){
     var newname= $("#showName").val();
      var url1="http://localhost:3000/profile/"+ sessionName.id;
      console.log(url1);
      $.ajax({
        url:url1 ,
        method: "PATCH",
        data:{
          "name":newname
        },
        success: function (x) {
        //  a.preventDefault();
          alert("User information updated successfully!!!");
         
        },
        error: function (error) {
          alert(error);
        },
      });
    
     })



  })




 })





 });




 });








 




