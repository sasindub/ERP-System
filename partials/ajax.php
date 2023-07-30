<?php
require_once '../database/customerconfig.php';
require_once '../database/itemconfig.php';
require_once '../database/counts.php';

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

