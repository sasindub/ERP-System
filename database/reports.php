<?php
require_once "database.php";

class Report extends Database{
    //invoice report
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

    //invoice item report
    public function getinvoiceItemReport(){
        try{
            $stmt = $this->conn->prepare("SELECT invoice_master.invoice_no, invoice_master.unit_price, invoice_master.amount, item.item_name, item_category.category, item.item_code, invoice.date, customer.first_name, customer.last_name FROM invoice_master INNER JOIN item ON invoice_master.item_id = item.id INNER JOIN invoice ON invoice_master.invoice_no = invoice.invoice_no INNER JOIN customer ON invoice.customer = customer.id INNER JOIN item_category ON item.item_category = item_category.id");
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

    public function searchInvoiceItemReport($keyword){
        try{
            $stmt = $this->conn->prepare("SELECT invoice_master.invoice_no, invoice_master.unit_price, invoice_master.amount, item.item_name, item_category.category, item.item_code, invoice.date, customer.first_name, customer.last_name FROM invoice_master INNER JOIN item ON invoice_master.item_id = item.id INNER JOIN invoice ON invoice_master.invoice_no = invoice.invoice_no INNER JOIN customer ON invoice.customer = customer.id INNER JOIN item_category ON item.item_category = item_category.id WHERE invoice_master.invoice_no LIKE '%$keyword%' OR invoice_master.unit_price LIKE '%$keyword%' OR invoice.date LIKE '%$keyword%' OR item_category.category LIKE '%$keyword%' OR customer.first_name LIKE '%$keyword%' OR item.item_name LIKE '%$keyword%' OR item.item_code LIKE '%$keyword%'");

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

    public function filterInvoiceItemReport($startDate, $endDate){
        try{
            $stmt =$this->conn->prepare("SELECT invoice_master.invoice_no, invoice_master.unit_price, invoice_master.amount, item.item_name, item_category.category, item.item_code, invoice.date, customer.first_name, customer.last_name FROM invoice_master INNER JOIN item ON invoice_master.item_id = item.id INNER JOIN invoice ON invoice_master.invoice_no = invoice.invoice_no INNER JOIN customer ON invoice.customer = customer.id INNER JOIN item_category ON item.item_category = item_category.id WHERE invoice.date  BETWEEN '$startDate' AND '$endDate'");
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

    //item report
    public function getitemReport(){
        try{
            $stmt = $this->conn->prepare("SELECT item.item_name, item.id, item.item_code, item_category.category, item_subcategory.sub_category, SUM(item.quantity) as quantity FROM item INNER JOIN item_category ON item.item_category = item_category.id INNER JOIN item_subcategory ON item.item_subcategory = item_subcategory.id GROUP BY item.item_name ORDER BY item.id");
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

    public function searchItemReport($keyword){
        try{
            $stmt = $this->conn->prepare("SELECT item.item_name, item.id, item.item_code, item_category.category, item_subcategory.sub_category, SUM(item.quantity) as quantity FROM item INNER JOIN item_category ON item.item_category = item_category.id INNER JOIN item_subcategory ON item.item_subcategory = item_subcategory.id WHERE item.item_name LIKE '%$keyword%' OR item.item_code LIKE '%$keyword%' OR item_category.category LIKE '%$keyword%' OR item_subcategory.sub_category LIKE '%$keyword%' GROUP BY item.item_name");

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

}

$report = new Report();