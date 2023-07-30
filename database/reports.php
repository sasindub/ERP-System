<?php
require_once "database.php";

class Report extends Database{
    public function getinvoiceReport(){
        try{
            $stmt = $this->conn->prepare("SELECT invoice.id, invoice.date, invoice.invoice_no, invoice.item_count, invoice.amount, customer.first_name, customer.last_name, district.district FROM invoice INNER JOIN customer ON invoice.customer = customer.id INNER JOIN district ON customer.district = district.id");
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if($stmt->rowCount() > 0){
                $myJson = json_encode($result);

                echo $myJson;
            }else{
                echo 1;
            }



        }catch(PDOException $e){
            $this->conn->rollBack();
           echo $e->getMessage();
        }
    }

    public function searchInvoiceReport($keyword){
        try{
            $stmt = $this->conn->prepare("SELECT invoice.id, invoice.date, invoice.invoice_no, invoice.item_count, invoice.amount, customer.first_name, customer.last_name, district.district FROM invoice INNER JOIN customer ON invoice.customer = customer.id INNER JOIN district ON customer.district = district.id WHERE invoice.invoice_no LIKE '%$keyword%' OR invoice.date LIKE '%$keyword%' OR invoice.item_count LIKE '%$keyword%' OR invoice.amount LIKE '%$keyword%' OR district.district LIKE '%$keyword%' OR customer.first_name LIKE '%$keyword%' OR customer.last_name LIKE '%$keyword%'");
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if($stmt->rowCount() > 0){
                $myJson = json_encode($result);

                echo $myJson;
            }else{
                echo 1;
            }



        }catch(PDOException $e){
            $this->conn->rollBack();
           echo $e->getMessage();
        }
    }

    public function filterInvoiceReport($startDate, $endDate){
        try{
            $stmt = $this->conn->prepare("SELECT invoice.id, invoice.date, invoice.invoice_no, invoice.item_count, invoice.amount, customer.first_name, customer.last_name, district.district FROM invoice INNER JOIN customer ON invoice.customer = customer.id INNER JOIN district ON customer.district = district.id WHERE invoice.date BETWEEN '$startDate' AND '$endDate'");
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if($stmt->rowCount() > 0){
                $myJson = json_encode($result);

                echo $myJson;
            }else{
                echo 1;
            }



        }catch(PDOException $e){
            
           echo $e->getMessage();
        }
    }
}

$report = new Report();