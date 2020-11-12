var all_blogs = [];
var allposts;
var count=[0,0,0,0];
var ulist;

const responsive = {
    0: {
        items: 1
    },
    320: {
        items: 1
    },
    560: {
        items: 2
    },
    960: {
        items: 3
    }
}




$(document).ready(function () {
    $('.content').richText();

    $nav = $('.nav');
    $toggleCollapse = $('.toggle-collapse');

    $toggleCollapse.click(function () {
        $nav.toggleClass('collapse');
    });

    $.ajax({
        url:"http://localhost:3000/posts",
        method:"GET",
        success:(x)=>{
           
            x.forEach(key => {
                console.log(key.category);
                if(key.category=="Travel")
                {
                    count[0]++;   
                }
                if(key.category=="Fashion")
                {
                    count[1]++;    
                }
                if(key.category=="Technology")
                {
                    count[2]++;    
                }
                if(key.category=="Educational")
                {
                    count[3]++;    
                }
        })
        }
    });



    $.ajax({
        url:"http://localhost:3000/posts",
        method :"get",
        success:(x)=>{
            allposts=x;
            var mainc=$('<nav></nav>').appendTo('#myCarousel').attr('aria-label',"Page navigation example");
             ulist=$('<ul></ul>').appendTo(mainc).addClass('pagination').addClass('justify-content-center');
           let c="#c"
           let index="#myCarousel";
           displayGetdata(x,c,index);
        }
      
    })




    //owl-crousel blog 
    $('.owl-carousel').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 10000,
        dots: false,
        nav: true,
        responsive: responsive
    });

function displayGetdata(x,c,index){
    console.log(x);
           
          
          for(var k=0;k<x.length/4;k++)
          { 
            
             var li= $('<li></li>').appendTo(ulist).addClass('page-item')
             $(`<a>${k+1}</a>`).appendTo(li).addClass('page-link').attr('href','#')
             .attr('data-target',index).attr('data-slide-to',`${k}`).addClass('active');
           
              if(k==0)
              {
                console.log(k);
              
              }
              else{
                console.log(k);
   
              }
          }
      
          var j=1,l=2,m=3;
          for(var i=0;i<x.length;)
          { 
    function carousel(item,i,j,l,m)
                {
                    var content=$('<div></div>').appendTo(item).addClass('container')
                    .attr('id','myContent').addClass('row justify-content-around');
                    var content1=$('<div></div>').appendTo(content).addClass('arrange')
                    .addClass('col-5');
                    $(`<h1>${x[i].title}</h1>`).appendTo(content1).addClass('word-wrap');
                    $(`<p>${x[i].Content.slice(0,100)}</p>`).appendTo(content1).addClass('word-wrap');
                    //$(`<a id='${x[i].id}'>Read More...</a>`).appendTo(content2).addClass('word-wrap');
                    let anchor = document.createElement('a');
     
                    anchor.href = "#";
                    anchor.id = x[i].id;
                   // alert(anchor.id);
                    anchor.innerText = "Read More....";
                    anchor.className="word-wrap";
                    content1.append(anchor);
                    anchor.onclick = function () {
                                getSpecificContent(anchor.id);
                    
                           }
                    if(x[j]!=undefined)
                    {
                        var content2=$('<div></div>').appendTo(content).addClass('arrange')
                        .addClass('col-5');
                        $(`<h1>${x[j].title}</h1>`).appendTo(content2).addClass('word-wrap');
                        //$(`<img src='${x[j].imageurl}'>`).appendTo(content2).addClass('word-wrap');
                        $(`<p>${x[j].Content.slice(0,100)}</p>`).appendTo(content2).addClass('word-wrap');
                       // $(`<a id='${x[j].id}'>Read More...</a>`).appendTo(content2).addClass('word-wrap');
                        let anchor = document.createElement('a');
     
                        anchor.href = "#";
                        anchor.id = x[j].id;
                       // alert(anchor.id);
                        anchor.innerText = "Read More....";
                        anchor.className="word-wrap";
                        content2.append(anchor);
                        anchor.onclick = function () {
                                    getSpecificContent(anchor.id);
                        
                               }
                    }
                    if(x[l]!=undefined)
                    {
                        var content2=$('<div></div>').appendTo(content).addClass('arrange')
                        .addClass('col-5');
                        $(`<h1>${x[l].title}</h1>`).appendTo(content2).addClass('word-wrap');
                        $(`<p>${x[l].Content.slice(0,100)}</p>`).appendTo(content2).addClass('word-wrap');
                       // $(`<a id='${x[l].id}'>Read More...</a>`).appendTo(content2).addClass('word-wrap ab');
                        let anchor = document.createElement('a');
     
                        anchor.href = "#";
                        anchor.id = x[l].id;
                       // alert(anchor.id);
                        anchor.innerText = "Read More....";
                        anchor.className="word-wrap";
                        content2.append(anchor);
                        anchor.onclick = function () {
                                    getSpecificContent(anchor.id);
                        
                               }
                    }
                    if(x[m]!=undefined)
                    {
                        let c = x[m].id;
                        // console.log(c);
                        var content2=$('<div></div>').appendTo(content).addClass('arrange')
                        .addClass('col-5');
                        $(`<h1>${x[m].title}</h1>`).appendTo(content2).addClass('word-wrap');
                        
                        $(`<p>${x[m].Content.slice(0,100)}</p>`).appendTo(content2).addClass('word-wrap');
                     //  $(`<a id='${x[m].id}' onclick="getSpecificContent(${c})">Read More...</a>`).appendTo(content2).addClass('word-wrap');
                        let anchor = document.createElement('a');     
                        anchor.href = "#";
                        anchor.id = x[m].id;
                        anchor.innerText = "Read More....";
                        anchor.className="word-wrap";
                        content2.append(anchor);
                        anchor.onclick = function () {
                                    getSpecificContent(anchor.id);
        
                                }
                    }
                }
            if(i==0){
                var item= $('<div></div>').appendTo(c).addClass('carousel-item')
    .addClass('active');
    carousel(item,i,j,l,m);
            }else{
                var item= $('<div></div>').appendTo(c).addClass('carousel-item');
                carousel(item,i,j,l,m);
            }
            if(j<=x.length)
            {
                j=j+4;
            }
            if(l<=x.length)
            {
                l=l+4;
            }
            if(m<=x.length)
            {
                m=m+4;
            }
    
            i=i+4;
    }
          
    
    
  }

    //click to scroll top
    $('.move-up span').click(function () {
        $("html,body").animate({
            scrollTop: 0
        }, 3000);
    })
    var postsId;

    function getSpecificContent(ids) 
    {
        
        console.log('http://localhost:3000/posts/' + ids);
        $.getJSON('http://localhost:3000/posts/' + ids, (data) => {

           
            if (sessionStorage.getItem('user') != null) {

                localStorage.setItem("readData", JSON.stringify(data));
                location.assign('demo.html');
            }
            else {
                alert("Please Login First !!!");
                location.assign('index.html');
            }
        });
    }


    //Categorywise blog separation Logic
    $(".categoryFilter").click(function () {
        $("#myCarousel").hide();
         $("#c1").empty();
         $(".page-item").empty();
        $("#myCarousel1").show();
     
        var mainc=$('<nav></nav>').appendTo('#myCarousel1').attr('aria-label',"Page navigation example");
        ulist=$('<ul></ul>').appendTo(mainc).addClass('pagination').addClass('justify-content-center');
         let c="#c1";
        let category = $(this).text();
        var categories=[];
        alert(category);
        for (var i = 0; i <allposts.length; i++) {
           
            if (allposts[i].category === category) {
                console.log(allposts[i]);
              
                categories.push(allposts[i]);
            


            }
        }
        console.log(categories);
        let index="#myCarousel1";
        displayGetdata(categories,c,index);
       
    })

    


    //Searching Logic
    $('#searchtitle').keyup(() => {
        var input, filter, ul, li, a, i;
        input = $("#searchtitle");
        filter = input.val().toLowerCase();
        console.log(filter);
        document.getElementById('text').innerText = "";
        for (i = 0; i < allposts.length; i++) {

      
            if (input.val() != "") {

                txtValue = allposts[i].title;

                if (txtValue.toLowerCase().indexOf(filter) > -1) {


                    console.log(allposts[i].title);
                    let imge = document.createElement('a');
                    imge.href = "#";
                    imge.innerHTML = allposts[i].title;
                    let titleid = allposts[i].id;
                    imge.id = "anchor-Tag";

                    imge.onclick = function () {

                        getSpecificContent(titleid);

                    }
                    let br = document.createElement('br');
                    imge.append(br);
                    $('#text').append(imge);



                }

            }

        }
    });



    //text-editor Window display
$(".createblog").click(function(){
    $(".searchbar").hide();
    $("#texteditor").show();
    $(".site-title").hide();
  })
  //Post the blog Ajax call
    //post the blog
    $("#post").click(function(){  
      var sessionObj = JSON.parse(sessionStorage.getItem('user'));
      console.log(sessionObj.name);
      debugger;
      var time= new Date($.now());
      var timestamp=time.getDate()+"-"+(time.getMonth()+1)+"-"+time.getFullYear()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds();   
      if($("#title").val()==="")
      {
        alert("Enter the title of blog");
      }   
      else{
        $.ajax({           
          type: 'POST',
          dataType: 'json',          
          url: 'http://localhost:3000/posts',
          data: {
           "Content":$(".content").val(),
           "category":$("#category :selected").val(),
           "title":$("#title").val(),
           "imageurl":$("#image").val(),
           "timestamp":timestamp,
           "author":sessionObj.name,
           "emailid":sessionObj.email,
           "like":"0"
          
          } ,             
          dataType:'json',
          success: function(result){              
              console.log('result');
          }                     
        })
        $("#texteditor").hide();
        $('.serachbar').show();
       
      }  
    });
  
});