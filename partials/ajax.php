<?php
require_once '../database/customerconfig.php';

if(isset($_POST['method'])){
    if($_POST['method'] == "saveCust"){
       $customer->saveCustomer($_POST['data']);
    }

    if($_POST['method'] == "updateCust"){
        $customer->updateCustomer($_POST['data']);
        
     }
}

if(isset($_GET['get'])){
    if($_GET['get'] == "customerData"){
        $customer->getCustomer();
    }
    if($_GET['get'] == "search"){
        $customer->searchCustomer($_GET['keyword']);
    }
}

if(isset($_GET['deleteCust'])){
    $customer->deleteCustomer($_GET['deleteCust']);
}

