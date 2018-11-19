
$(function(){

//jQuery code goes here
    $("#btn1").on("click", function(){
        var url = "https://api.flickr.com/services/feeds/photos_public.gne?&format=json&jsoncallback=?&tags="
                    +$("#photosearch").val();   
       $.ajax({
           url: url,           
           type: "GET", 
           dataType: "jsonp",   //needed for CORS       
           contentType: "application/json; charset=utf-8",
           crossDomain: true,                   
           success: function(data){
              console.log(data);             
              $.each(data.items, function(i, item){                
                var img = $("<img></img>");
                img.attr("src",item.media.m);
                $("#flikrresults").append(img);
              });              
           }
         });
    });

    $("#btn2").on("click", function(){
        //Go to https://www.petfinder.com/developers/api-key to get an api key
        //Add the API key to the URL
        //PetFinder API Key 551b527add03634ac3a95a7a967367e6
        //PetFinder API Secret 6a5a2731d31fb44b2d2303c7686c5278
        
        const key = "551b527add03634ac3a95a7a967367e6";           
        var animal = $("#breedsearch").val();
        var url = "http://api.petfinder.com/breed.list?format=json&key="+key+"&callback=?&animal="+animal+"&format=json";
       $.ajax({
           url: url,           
           type: "GET", 
           dataType: "jsonp",   //needed for CORS       
           contentType: "application/json; charset=utf-8",
           crossDomain: true,                   
           success: function(data){              
              console.log(data);
              $("ul").remove();
              var ul = $("<ul>Breeds</ul>");
              $("#breedresults").after(ul);
              
              $.each(data.petfinder.breeds.breed,function(i,breed){                  
                    var li = $("<li></li>").text(breed.$t);
                    $("ul").append(li);
              });                      
            }                     

         });//ajax  
    });  //btn click

    $("#btn3").on("click", function () {
        //Go to https://www.petfinder.com/developers/api-key to get an api key
        //Add the API key to the URL
        //PetFinder API Key 551b527add03634ac3a95a7a967367e6
        //PetFinder API Secret 6a5a2731d31fb44b2d2303c7686c5278

        const key = "143beff06781e4d69bffc2a636981ac1";
        var animal = $("#animal").val();
        var breed = $("#breed").val();
        var size = $("#size").val();
        var sex = $("#sex").val();
        var location = $("#location").val();
        var url = "http://api.petfinder.com/pet.find?format=json&key=" + key + "&callback=?&animal=" + animal +
            "&callback=?&breed=" + breed + "&callback=?&size=" + size + "&callback=?&sex=" + sex +
             "&callback=?&location=" + location +"&format=json";
        $.ajax({
            url: url,
            type: "GET",
            dataType: "jsonp",   //needed for CORS       
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            success: function (data) {
                console.log(data);
                $("h1").remove();
                var h1 = $("<h2>Pets</h2>");
                $("#petresults").after();
                $("#petresults").append(h1);

                $.each(data.petfinder.pets.pet, function (i, pet) {
                    console.log(pet.name.$t);
                    var p = $("<section class='pet'></section>").html("<h1>Name:  </h1><p>" + pet.name.$t  + "</p><br>" +
                        "<h1>Id:  </h1><p>" + pet.id.$t + "</p><br>" +
                        "<h1>Description:  </h1><p>" + pet.description.$t + "</p><br>" +
                        "<h1>Contact:  </h1><p>" + pet.contact.phone.$t + "</p><br>");
                    
                    $("#petresults").append(p);
                });
            }

        });//ajax  
    });  //btn click
   
})