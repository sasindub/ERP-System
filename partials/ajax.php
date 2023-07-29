<?php
require_once '../database/customerconfig.php';

if(isset($_POST['method'])){
    if($_POST['method'] == "saveCust"){
       $customer->saveCustomer($_POST['data']);
    }
}