<?php

require_once "database.php";
class Customer extends Database{

    

    public function saveCustomer($data){
        try{
            $stmt = $this->conn->prepare("INSERT INTO customer VALUES (:id, :title , :fname, :lname, :contact, :dist)");

            $stmt->bindValue(":id", "");
            $stmt->bindValue(":title", $data['title']);
            $stmt->bindValue(":fname", $data['fname']);
            $stmt->bindValue(":lname", $data['lname']);
            $stmt->bindValue(":contact", $data['contact']);
            $stmt->bindValue(":dist", $data['district']);

            $this->conn->beginTransaction();

            if($stmt->execute()){
                $this->conn->commit();
                echo 0;
            }else{
                $this->conn->rollBack();
                echo 1;
            }
         
        }catch(PDOException $e){
            $this->conn->rollBack();
            echo $e->getMessage();

        }
    }

}

$customer = new Customer();

