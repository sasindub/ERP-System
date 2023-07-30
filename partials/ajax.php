<?php
require_once '../database/customerconfig.php';
require_once '../database/itemconfig.php';
require_once '../database/counts.php';
require_once '../database/reports.php';

if(isset($_POST['method'])){

    //save data
    if($_POST['method'] == "saveCust"){
       $customer->saveCustomer($_POST['data']);
    }
    if($_POST['method'] == "saveItem"){
        
        $item->saveItem($_POST['data']);
     }

     //update data
    if($_POST['method'] == "updateCust"){
        $customer->updateCustomer($_POST['data']);
    }
    if($_POST['method'] == "updateItem"){
        $item->updateItem($_POST['data']);
        
     }
}

if(isset($_GET['get'])){
    //get data
    if($_GET['get'] == "customerData"){
        $customer->getCustomer();
    }
    if($_GET['get'] == "itemData"){
        $item->getItem();
    }

    //search
    if($_GET['get'] == "search"){
        $customer->searchCustomer($_GET['keyword']);
    }
    if($_GET['get'] == "searchItem"){
        $item->searchItem($_GET['keyword']);
    }
    if($_GET['get'] == "searchInvoiceReport"){
        $report->searchInvoiceReport($_GET['keyword']);
    }
    if($_GET['get'] == "searchInvoiceItemReport"){
        $report->searchInvoiceItemReport($_GET['keyword']);
    }
    if($_GET['get'] == "searchItemReport"){
        $report->searchItemReport($_GET['keyword']);
    }
}

if(isset($_GET['deleteCust'])){
    $customer->deleteCustomer($_GET['deleteCust']);
}
if(isset($_GET['deleteItem'])){
    $item->deleteItem($_GET['deleteItem']);
    
}


//get counts
if(isset($_GET['count'])){ 
        $count->getCount();
}   


//report data
if(isset($_GET['report'])){
    if($_GET['report'] == "invoiceReportAll"){
       $report->getinvoiceReport();
    }
    if($_GET['report'] == "invoiceItemReportAll"){
        $report->getinvoiceItemReport();
     }
    if($_GET['report'] == "itemReportAll"){
        $report->getitemReport();
    }
}

//date filter
if(isset($_GET['startDate']) && isset($_GET['endDate'])){

    if($_GET['filter'] == 'invoiceReport'){
        $report->filterInvoiceReport($_GET['startDate'], $_GET['endDate']);
       
    }
    if($_GET['filter'] == 'invoiceItemReport'){
        $report->filterInvoiceItemReport($_GET['startDate'], $_GET['endDate']);
        
    }
}
