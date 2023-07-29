$(document).ready(function(){
    //validation
   $("#errValidate").hide();
   $("#success").hide();
   getCustomer();
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
      
        if(fname != "" && lname != "" && contact.match(phoneno) && district != 0 && title != "0"  ){
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
                       getCustomer();
                        
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

            if(district == 0){
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

    //get customers
    function getCustomer(){
        $.ajax({
            url:"../partials/ajax.php?get=customerData",
            method:"get",
            success:function(data){
            
              
            if(data != 1){
                const myObj = JSON.parse(data);
                let cus = null;
                for(let row in myObj){
                    cus += `<tr>
                    <th scope="row">${myObj[row][0]}</th>
                    <td>${myObj[row][1]}</td>
                    <td>${myObj[row][2]} ${myObj[row][3]}</td>
                    <td>${myObj[row][4]}</td>
                    <td>${myObj[row][5]}</td>
                    <td>
                        <i class="fa-solid fa-trash del" style="color:red;" id="${myObj[row][0]}" data-toggle="modal" data-target="#delModel" title="Delete"></i>
                    </td>
                    <td>
                        
                        <i class="fa-solid fa-pen-to-square up" style="color:green;" title="Update"></i>
                    </td>
                    
                </tr>`;
                }

                $("#tbody").html(cus);
                    
                }else{

                }
            },error:function(error){
                alert(error);
            }

        });
    }

    //delete
    $(document).on("click",".del",function(e){
       $("#cusId").val(this.id);
    });

    $("#modelYes").on('click', function(e){
        $.ajax({
            url:"../partials/ajax.php?deleteCust="+$("#cusId").val(),
            method:"delete",
            success:function(data){
               
                getCustomer();
                $('#delModel').modal('hide');
                alert("Deleted!")
                $("#cusId").val("");
            },
            error: function(error){
                alert(data);    
            }
            
       });
    });



    //update
    $(document).on("click", "#tbl tr", function(){
        var title = $(this).find('td:eq(0)').text();
        const nameArray = ($(this).find('td:eq(1)').text()).split(" ");
        var mobile = $(this).find('td:eq(2)').text();
        var district = $(this).find('td:eq(3)').text();
        var id = $(this).find('th:eq(0)').text();
        
        $("#title").val(title);
        $("#fname").val(nameArray[0]);
        $("#lname").val(nameArray[1]);
        $("#district").val("0");
         $("#contact").val(mobile);

         $("#cusId").val(id);
    });

    //update
    $("#update").on('click', function(e){
        
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
            "id" : $("#cusId").val(),
            "fname" : fname,
            "lname" : lname,
            "contact" : contact,
            "district" : district,
            "title" : title,
        }

        //validation
      
        if($("#cusId").val() != "" &&  fname != "" && lname != "" && contact.match(phoneno) && district != 0 && title != "0"  ){
            //send data 

            $.ajax({
                url:"../partials/ajax.php",
                method:"post",
                data:{data:data,
                "method":"updateCust"},
                success:function(data){
                    $("#customerFrm").trigger("reset");
                    if(data == 0){
                       alert("Updated!");
                       getCustomer();
                       $("#cusId").val("");
                        
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

            if($("#cusId").val() == ""){
               alert("Please select a customer to update!!");
            }

            if(lname == ""){
                $("#lname").css({
                    "borderColor":"red"
                });
            }

            if(district == 0){
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

    //search
    $("#search").keyup(function(e){
        if($("#search").val() == ""){
            getCustomer();
        }else{
            $.ajax({
                url:"../partials/ajax.php?get=search&keyword="+ $("#search").val(),
                method:"get",
                success:function(data){
                if(data != 1){
                    const myObj = JSON.parse(data);
                    let cus = null;
                    for(let row in myObj){
                        cus += `<tr>
                        <th scope="row">${myObj[row][0]}</th>
                        <td>${myObj[row][1]}</td>
                        <td>${myObj[row][2]} ${myObj[row][3]}</td>
                        <td>${myObj[row][4]}</td>
                        <td>${myObj[row][5]}</td>
                        <td>
                            <i class="fa-solid fa-trash del" style="color:red;" id="${myObj[row][0]}" data-toggle="modal" data-target="#delModel" title="Delete"></i>
                        </td>
                        <td>
                            
                            <i class="fa-solid fa-pen-to-square up" style="color:green;" title="Update"></i>
                        </td>
                        
                    </tr>`;
                    }

                    $("#tbody").html(cus);
                        
                    }else{
                        var cus = `<tr>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                        <td><div class="alert alert-dark" role="alert">
                        <center>No Data Found!</center>
                    </div></td>
                        <td></td>
                        <td>
                        
                        </td>
                        <td>
                            
                        
                        </td>
                        
                    </tr>`;
                    $("#tbody").html(cus);
                    }

                
                    
                },error:function(error){
                    alert(error);
                }

            });
        }
    });

});