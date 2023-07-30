$(document).ready(function(){
   getAllData();

   //get all data
    function getAllData(){
        $.ajax({
            url: "../partials/ajax.php?report=invoiceReportAll",
            method: "get",
            success: function(data){
                
                let inv = JSON.parse(data);
                let cl = null;
                if(data != "1"){
                    for(let row in inv){
                        cl += ` <tr>
                        <th scope="row">${inv[row]['id']}</th>
                        <td>${inv[row]['invoice_no']}</td>
                        <td>${inv[row]['date']}</td>
                        <td>${inv[row]['first_name']} ${inv[row]['last_name']}</td>
                        <td>${inv[row]['district']}</td>
                        <td>${inv[row]['item_count']}</td>
                        <td>${inv[row]['amount']}</td>
                    </tr>`;
                    }

                    $("#tbdy").html(cl);
                }else{
                    cl = `<tr>
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
                    $("#tbdy").html(cl);
                }

            },error(error){
                console.log(error);
            }
        });
    }

    //search
    $("#search").keyup(function(e){
        if($("#search").val() == ""){
            getAllData();
        }else{
            $.ajax({
                url:"../partials/ajax.php?get=searchInvoiceReport&keyword="+ $("#search").val(),
                method:"get",
                success:function(data){
                   
                if(data != 1){
                    const inv = JSON.parse(data);
                    let cl = null;
                    for(let row in inv){
                        cl += ` <tr>
                        <th scope="row">${inv[row]['id']}</th>
                        <td>${inv[row]['invoice_no']}</td>
                        <td>${inv[row]['date']}</td>
                        <td>${inv[row]['first_name']} ${inv[row]['last_name']}</td>
                        <td>${inv[row]['district']}</td>
                        <td>${inv[row]['item_count']}</td>
                        <td>${inv[row]['amount']}</td>
                    </tr>`;

                   
                    }
                    $("#tbdy").html(cl);
                        
                    }else{
                        cl = `<tr>
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
                    $("#tbdy").html(cl);
                    }

                
                    
                },error:function(error){
                    alert(error);
                }

            });
        }
    });

    //filter
    $("#filter").on('click', function(e){
        e.preventDefault();

        let startDate = $("#startDate").val();
        let endDate = $("#endDate").val();

        if(startDate == "" || endDate == ""){
            alert("Please select the date range!!")
        }else{
            $.ajax({
                url: "../partials/ajax.php?filter=invoiceReport",
                method: "get",
                data: {startDate:startDate,
                endDate:endDate},
                success: function(data){
                    if(data != 1){
                        const inv = JSON.parse(data);
                        let cl = null;
                        for(let row in inv){
                            cl += ` <tr>
                            <th scope="row">${inv[row]['id']}</th>
                            <td>${inv[row]['invoice_no']}</td>
                            <td>${inv[row]['date']}</td>
                            <td>${inv[row]['first_name']} ${inv[row]['last_name']}</td>
                            <td>${inv[row]['district']}</td>
                            <td>${inv[row]['item_count']}</td>
                            <td>${inv[row]['amount']}</td>
                        </tr>`;
    
                       
                        }
                        $("#tbdy").html(cl);
                            
                        }else{
                            cl = `<tr>
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
                        $("#tbdy").html(cl);
                        }
    



                },error: function(error){
                    console.log(error);
                }
            });
        }
        
    });

    $("#startDate").on('click', function(){
        getAllData();
    })
    $("#endDate").on('click', function(){
        getAllData();
    })

    //download
    $("#download").on('click', function(e){
        CreatePDFfromHTML();
    });
    function CreatePDFfromHTML() {
        var HTML_Width = $(".reportTable").width();
        var HTML_Height = $(".reportTable").height();
        var top_left_margin = 15;
        var PDF_Width = HTML_Width + (top_left_margin * 2);
        var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
        var canvas_image_width = HTML_Width;
        var canvas_image_height = HTML_Height;
    
        var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
    
        html2canvas($(".reportTable")[0]).then(function (canvas) {
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
            pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
            for (var i = 1; i <= totalPDFPages; i++) { 
                pdf.addPage(PDF_Width, PDF_Height);
                pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
            }
            pdf.save("Invoice Report.pdf");
            
        });
    }
});