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

    public function getCustomer(){
        try{
            $stmt = $this->conn->prepare("SELECT customer.id, customer.title, customer.first_name, customer.last_name, customer.contact_no,  district.district, customer.district FROM customer INNER JOIN district ON customer.district = district.id ORDER BY id DESC");
            $stmt->execute();
            if($stmt->rowCount() != 0){
                $row = $stmt->fetchAll();

                $myJSON = json_encode($row);

                echo $myJSON;
            }else{
                echo 1;
            }
     
        }catch(PDOException $e){
            $this->conn->rollBack();
            echo $e->getMessage();
        }
    }

    public function deleteCustomer($id){
        try{
            $stmt = $this->conn->prepare("DELETE FROM customer WHERE id = :id");
            $stmt->bindValue(":id", $id);

            if($stmt->execute()){
                echo 0;
            }else{
                echo 1;
            }

        }catch(PDOException $e){
            echo $e->getMessage();
            $this->conn->rollBack();
        }
    }

    public function updateCustomer($data){
        try{
            
            $title = $data['title'];
            $fname = $data['fname'];
            $lname = $data['lname'];
            $contact = $data['contact'];
            $dist = $data['district'];

            $stmt = $this->conn->prepare("UPDATE customer SET title = '$title', first_name = '$fname', last_name = '$lname', contact_no = '$contact', district = '$dist' WHERE id = ".$data['id']);

            // $stmt->bindParam(":id", $data['id']);
            // $stmt->bindParam(":title", $data['title']);
            // $stmt->bindParam(":fname", $data['fname']);
            // $stmt->bindParam(":lname", $data['lname']);
            // $stmt->bindParam(":contact", $data['contact']);
            // $stmt->bindParam(":dist", $data['district']);

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

    public function searchCustomer($keyword){
        try{
            $stmt = $this->conn->prepare("SELECT customer.id, customer.title, customer.first_name, customer.last_name, customer.contact_no,  district.district, customer.district FROM customer INNER JOIN district ON customer.district = district.id WHERE customer.id LIKE '%$keyword%' OR customer.title LIKE '%$keyword%' OR customer.first_name LIKE '%$keyword%' OR customer.contact_no LIKE '%$keyword%' OR district.district LIKE '%$keyword%' OR customer.last_name LIKE '%$keyword%'");
            $stmt->execute();
            if($stmt->rowCount() > 0){
                $row = $stmt->fetchAll();

                $myJSON = json_encode($row);

                echo $myJSON;
            }else{
                echo 1;
            }
     
        }catch(PDOException $e){
            $this->conn->rollBack();
            echo $e->getMessage();
        }
    }

    //all counts
    public function getCount(){
        try{
            $stmt = $this->conn->prepare("SELECT count(id) as custCount FROM customer;");
            $stmt->execute();

            $stmt1 = $this->conn->prepare("SELECT count(id) as itemCount FROM item;");
            $stmt1->execute();

            
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            $result1 = $stmt1->fetch(PDO::FETCH_ASSOC);

            $dataArray = [$result, $result1];
            $myJSON = json_encode($dataArray);
            echo $myJSON;


        }catch(PDOException $e){
            $this->conn->rollBack();
            echo $e->getMessage();
        }
    }

}

$customer = new Customer();

