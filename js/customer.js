$(document).ready(function(){
    //validation
   $("#errValidate").hide();
   $("#success").hide();

   //submit
    $("#customerFrm").submit(function(e){
        e.preventDefault();
        $("#errValidate").hide();
        $("#fname").css({
            "borderColor":"#ebeced"
        });
    

 
        $("#lname").css({
            "borderColor":"#ebeced"
        });
    

   
        $("#district").css({
            "borderColor":"#ebeced"
        });
    

   
        $("#title").css({
            "borderColor":"#ebeced"
        });
    
  
        $("#contact").css({
            "borderColor":"#ebeced"
        });



        //get values
        let fname = $("#fname").val();
        let lname = $("#lname").val();
        let contact = $("#contact").val();
        let district = $("#district").val();
        let title = $("#title").val();
        var phoneno = /^\d{10}$/;

        let data = {
            "fname" : fname,
            "lname" : lname,
            "contact" : contact,
            "district" : district,
            "title" : title,
        }

        //validation
      
        if(fname != "" && lname != "" && contact.match(phoneno) && district != "" && title != "0"  ){
            //send data 

            $.ajax({
                url:"../partials/ajax.php",
                method:"post",
                data:{data:data,
                "method":"saveCust"},
                success:function(data){
                    $("#customerFrm").trigger("reset");
                    if(data == 0){
                        $("#success").show();
                        setTimeout(function(){
                            $("#success").hide();
                        },5000);
                       
                        
                    }else{
                        alert("Sometrhing went wrong!");
                    }
                },
                error: function(error){
                    console.log(error);
                }
            });
        }else{
            $("#errValidate").show();
            //error msgs
            if(fname == ""){
                $("#fname").css({
                    "borderColor":"red"
                });
            }

            if(lname == ""){
                $("#lname").css({
                    "borderColor":"red"
                });
            }

            if(district == ""){
                $("#district").css({
                    "borderColor":"red"
                });
            }

            if(title == "0"){
                $("#title").css({
                    "borderColor":"red"
                });
            }

            if(!contact.match(phoneno)){
                $("#contact").css({
                    "borderColor":"red"
                });
            }

        }

      
    

      
    });

    //clear
    $("#frmClear").on("click", function(e){
        e.preventDefault();
        $("#customerFrm").trigger("reset");
    });



});