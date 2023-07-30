$(document).ready(function(){
    getCustomerCount();
    function getCustomerCount(){
        $.ajax({
            url: "partials/ajax.php?count=countAll",
            method: "get",
            success: function(data){
                let count = JSON.parse(data);
                $("#customerCount").text("Ct. "+countPrepare(count[0]['custCount']));
                $("#itemCount").text("Ct. "+countPrepare(count[1]['itemCount']));
                $("#invoiceReportCount").text("Ct. "+countPrepare(count[2]['invoiceReportCount']));
                $("#invoiceItemReportCount").text("Ct. "+countPrepare(count[3]['invoiceItemReportCount']));
                $("#itemReportCount").text("Ct. "+countPrepare(count[4]['itemReportCount']));
            },error(error){
                console.log(error);
            }
        });
    }

    function countPrepare(count){
        if(parseInt(count) < 10){
            return "0"+count;
        }else{
            return count;
        }
    }
});