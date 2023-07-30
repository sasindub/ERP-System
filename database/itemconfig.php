<?php

require_once "database.php";
class Item extends Database{

    

    public function saveItem($data){
      
        try{
            $stmt = $this->conn->prepare("INSERT INTO item VALUES (:id, :item_code , :item_category, :item_subcategory, :item_name, :quantity, :unit_price)");

            $stmt->bindValue(":id", "");
            $stmt->bindValue(":item_code", $data['itemCode']);
            $stmt->bindValue(":item_category", $data['category']);
            $stmt->bindValue(":item_subcategory", $data['subCategory']);
            $stmt->bindValue(":item_name", $data['itemName']);
            $stmt->bindValue(":quantity", $data['quantity']);
            $stmt->bindValue(":unit_price", $data['unitPrice']);

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

    public function getItem(){
        try{
            $stmt = $this->conn->prepare("SELECT item.id, item.item_code, item_category.category, item_subcategory.sub_category, item.item_name,  item.quantity, item.unit_price FROM item INNER JOIN item_category ON item.item_category = item_category.id INNER JOIN item_subcategory ON item.item_subcategory = item_subcategory.id ORDER BY item.id DESC");
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

    public function deleteItem($id){
        try{
            $stmt = $this->conn->prepare("DELETE FROM item WHERE id = :id");
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

    public function updateItem($data){
        try{
            
            $itemCode = $data['itemCode'];
            $category = $data['category'];
            $subCategory = $data['subCategory'];
            $itemName = $data['itemName'];
            $unitPrice = $data['unitPrice'];
            $quantity = $data['quantity'];

            $stmt = $this->conn->prepare("UPDATE item SET item_name = '$itemName', item_code = '$itemCode', unit_price = '$unitPrice', quantity = '$quantity', item_category = '$category', item_subcategory = '$subCategory' WHERE id = ".$data['id']);

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

    public function searchItem($keyword){
        try{
            $stmt = $this->conn->prepare("SELECT item.id, item.item_code, item_category.category, item_subcategory.sub_category, item.item_name,  item.quantity, item.unit_price FROM item INNER JOIN item_category ON item.item_category = item_category.id INNER JOIN item_subcategory ON item.item_subcategory = item_subcategory.id WHERE item.item_code LIKE '%$keyword%' OR item.item_name LIKE '%$keyword%' OR item_category.category LIKE '%$keyword%' OR item_subcategory.sub_category LIKE '%$keyword%' OR item.quantity LIKE '%$keyword%' OR item.unit_price LIKE '%$keyword%'");
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

}

$item = new Item();

