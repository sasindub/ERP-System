$(document).ready(function(){
    //validation
   $("#errValidate").hide();
   $("#success").hide();
   getItem();
    let insertDiv = $("#insertItem");
    insertDiv.hide();
    //add new item btn
   $("#btnaddItem").on('click', function(e){
        insertDiv.toggle(1000);
        $("#errValidate").hide();
        $("#itemFrm").trigger("reset");
        $("#itemCode").css({
            "borderColor":"#ebeced"
        });
    

 
        $("#itemName").css({
            "borderColor":"#ebeced"
        });
    

   
        $("#category").css({
            "borderColor":"#ebeced"
        });
    

   
        $("#subCategory").css({
            "borderColor":"#ebeced"
        });
    
  
        $("#quantity").css({
            "borderColor":"#ebeced"
        });

        $("#unitPrice").css({
            "borderColor":"#ebeced"
        });
       
   });

   //submit
    $("#itemFrm").submit(function(e){
        e.preventDefault();
        $("#errValidate").hide();
        $("#itemCode").css({
            "borderColor":"#ebeced"
        });
    

 
        $("#itemName").css({
            "borderColor":"#ebeced"
        });
    

   
        $("#category").css({
            "borderColor":"#ebeced"
        });
    

   
        $("#subCategory").css({
            "borderColor":"#ebeced"
        });
    
  
        $("#quantity").css({
            "borderColor":"#ebeced"
        });

        $("#unitPrice").css({
            "borderColor":"#ebeced"
        });



        //get values
        let itemName = $("#itemName").val();
        let itemCode = $("#itemCode").val();
        let subCategory = $("#subCategory").val();
        let category = $("#category").val();
        let quantity = $("#quantity").val();
        let unitPrice = $("#unitPrice").val();

        let data = {
            "itemName" : itemName,
            "itemCode" : itemCode,
            "subCategory" : subCategory,
            "category" : category,
            "quantity" : quantity,
            "unitPrice" : unitPrice,
        }

        //validation
      
        if(itemName != "" && itemCode != "" && subCategory != "0" && category != "0" && quantity != "" && unitPrice != ""){
            //send data 

            $.ajax({
                url:"../partials/ajax.php",
                method:"post",
                data:{data:data,
                "method":"saveItem"},
                success:function(data){
                    $("#itemFrm").trigger("reset");
                   
                    if(data == 0){
                        $("#success").show();
                        setTimeout(function(){
                            $("#success").hide();
                        },5000);
                       getItem();
                        
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
            if(itemName == ""){
                $("#itemName").css({
                    "borderColor":"red"
                });
            }

            if(itemCode == ""){
                $("#itemCode").css({
                    "borderColor":"red"
                });
            }

            if(unitPrice == ""){
                $("#unitPrice").css({
                    "borderColor":"red"
                });
            }

            if(category == "0"){
                $("#category").css({
                    "borderColor":"red"
                });
            }

            if(quantity == ""){
                $("#quantity").css({
                    "borderColor":"red"
                });
            }

            if(subCategory == "0"){
                $("#subCategory").css({
                    "borderColor":"red"
                });
            }

        }

      
    

      
    });

    //clear
    $("#frmClear").on("click", function(e){
        e.preventDefault();
        $("#itemFrm").trigger("reset");
    });

    //get customers
    function getItem(){
        $.ajax({
            url:"../partials/ajax.php?get=itemData",
            method:"get",
            success:function(data){
            
              
            if(data != 1){
                const myObj = JSON.parse(data);
                let itm = null;
                for(let row in myObj){
                    itm += `<tr>
                    <th scope="row">${myObj[row][0]}</th>
                    <th scope="row">${myObj[row][1]}</th>
                    <td>${myObj[row][4]}</td>
                    <td>${myObj[row][2]}</td>
                    <td>${myObj[row][3]}</td>
                    <td>${myObj[row][5]}</td>
                    <td>${myObj[row][6]}</td>
                    <td>
                        <i class="fa-solid fa-trash del" style="color:red;" id="${myObj[row][0]}" data-toggle="modal" data-target="#delModel" quantity="Delete"></i>
                    </td>
                    <td>
                        
                        <i class="fa-solid fa-pen-to-square up" style="color:green;" quantity="Update"></i>
                    </td>
                    
                </tr>`;
                }

                $("#tbody").html(itm);
                    
                }else{
                    var itm = `<tr>
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
                $("#tbody").html(itm);
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
            url:"../partials/ajax.php?deleteItem="+$("#cusId").val(),
            method:"delete",
            success:function(data){
              
                getItem();
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
        
        var id = $(this).find('th:eq(0)').text();
        var itemCode = $(this).find('th:eq(1)').text();

        var quantity = $(this).find('td:eq(3)').text();
        var itemName = $(this).find('td:eq(0)').text();
        var subCategory = $(this).find('td:eq(2)').text();
        var category = $(this).find('td:eq(1)').text();
        var unitPrice = $(this).find('td:eq(4)').text();

        
        $("#quantity").val(quantity);
        $("#itemName").val(itemName);
        $("#itemCode").val(itemCode);
        $("#category").val("0");
         $("#subCategory").val("0");
         $("#unitPrice").val(unitPrice);

         $("#cusId").val(id);

         insertDiv.show(1000);
    });

    //update
    $("#update").on('click', function(e){
        
        $("#errValidate").hide();
        $("#itemCode").css({
            "borderColor":"#ebeced"
        });
    

 
        $("#itemName").css({
            "borderColor":"#ebeced"
        });
    

   
        $("#category").css({
            "borderColor":"#ebeced"
        });
    

   
        $("#subCategory").css({
            "borderColor":"#ebeced"
        });
    
  
        $("#quantity").css({
            "borderColor":"#ebeced"
        });

        $("#unitPrice").css({
            "borderColor":"#ebeced"
        });



       //get values
       let itemName = $("#itemName").val();
       let itemCode = $("#itemCode").val();
       let subCategory = $("#subCategory").val();
       let category = $("#category").val();
       let quantity = $("#quantity").val();
       let unitPrice = $("#unitPrice").val();

       let data = {
            "id":$("#cusId").val(),
           "itemName" : itemName,
           "itemCode" : itemCode,
           "subCategory" : subCategory,
           "category" : category,
           "quantity" : quantity,
           "unitPrice" : unitPrice,
       }
        //validation
      
        if( $("#cusId").val() != "" && itemName != "" && itemCode != "" && subCategory != "0" && category != "0" && quantity != "" && unitPrice != ""){
            //send data 

            $.ajax({
                url:"../partials/ajax.php",
                method:"post",
                data:{data:data,
                "method":"updateItem"},
                success:function(data){
                    $("#itemFrm").trigger("reset");
                 
                    if(data == 0){
                       alert("Updated!");
                       getItem();
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

            if($("#cusId").val() == ""){
                alert("Please select an item to update!!");
             }

            if(itemName == ""){
                $("#itemName").css({
                    "borderColor":"red"
                });
            }

            if(itemCode == ""){
                $("#itemCode").css({
                    "borderColor":"red"
                });
            }

            if(unitPrice == ""){
                $("#unitPrice").css({
                    "borderColor":"red"
                });
            }
            
            if(category == "0"){
                $("#category").css({
                    "borderColor":"red"
                });
            }

            if(quantity == ""){
                $("#quantity").css({
                    "borderColor":"red"
                });
            }

            if(subCategory == "0"){
                $("#subCategory").css({
                    "borderColor":"red"
                });
            }


        }

    });

    //search
    $("#search").keyup(function(e){
        if($("#search").val() == ""){
            getItem();
        }else{
            $.ajax({
                url:"../partials/ajax.php?get=searchItem&keyword="+ $("#search").val(),
                method:"get",
                success:function(data){
                    if(data != 1){
                        const myObj = JSON.parse(data);
                        let itm = null;
                        for(let row in myObj){
                            itm += `<tr>
                            <th scope="row">${myObj[row][0]}</th>
                            <th scope="row">${myObj[row][1]}</th>
                            <td>${myObj[row][4]}</td>
                            <td>${myObj[row][2]}</td>
                            <td>${myObj[row][3]}</td>
                            <td>${myObj[row][5]}</td>
                            <td>${myObj[row][6]}</td>
                            <td>
                                <i class="fa-solid fa-trash del" style="color:red;" id="${myObj[row][0]}" data-toggle="modal" data-target="#delModel" quantity="Delete"></i>
                            </td>
                            <td>
                                
                                <i class="fa-solid fa-pen-to-square up" style="color:green;" quantity="Update"></i>
                            </td>
                            
                        </tr>`;
                        }
        
                        $("#tbody").html(itm);
                            
                        }else{
                            var itm = `<tr>
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
                        $("#tbody").html(itm);
                        }
                
                    
                },error:function(error){
                    alert(error);
                }

            });
        }
    });

});