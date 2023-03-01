<?php
session_start();
$conn = new mysqli("localhost", "root", "", "kino") ;

    $row=(int)$_POST["row"];
    $seat=(int)$_POST["seat"];
    $movie= $_POST["movie"];
    $user=$_SESSION["user"]["id"];


    $sql = "INSERT INTO reservations (`row`,`seat`,`movie`,`user`) VALUES ('$row','$seat','$movie','$user')";

    if($conn->query($sql)===TRUE){
        echo("success");
    }
    else{
        echo "$row\n";
        echo "$seat\n";
        echo("error".$conn->error);
    }
?>