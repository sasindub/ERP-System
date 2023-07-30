<?php
require_once "database.php";
class Count extends Database{
    //all counts
    public function getCount(){
        try{
            $stmt = $this->conn->prepare("SELECT count(id) as custCount FROM customer;");
            $stmt->execute();

            $stmt1 = $this->conn->prepare("SELECT count(id) as itemCount FROM item;");
            $stmt1->execute();
            
            $stmt2 = $this->conn->prepare("SELECT count(id) as invoiceReportCount FROM invoice;");
            $stmt2->execute();

            
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            $result1 = $stmt1->fetch(PDO::FETCH_ASSOC);
            $result2 = $stmt2->fetch(PDO::FETCH_ASSOC);

            $dataArray = [$result, $result1, $result2];
            $myJSON = json_encode($dataArray);
            echo $myJSON;


        }catch(PDOException $e){
            $this->conn->rollBack();
            echo $e->getMessage();
        }
    }
}

$count = new Count();