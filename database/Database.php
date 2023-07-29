<?php

class Database{
    private $host = "localhost";
    private $password = "";
    private $dbname = "assignment";
    private $useName = "root";

    protected $conn;

    public function __construct(){
        $dns = "mysql:host=$this->host;dbname=$this->dbname";

        try{
            $pdo = new PDO($dns, $this->useName, $this->password);
            $this->conn = $pdo;
           
        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }
}