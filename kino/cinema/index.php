<?php
session_start();
?>

<html>

<head>
    <link rel="stylesheet" href="style.css" />
    <title>Strona logowania</title>
</head>

<body>
    
    <?php
    define('__ROOT__', dirname(dirname(__FILE__)));
    $islogged = !empty($_SESSION['user']);

    if (isset($_GET['logout'])) {
        unset($_SESSION['user']);
        header('Location: index.php');
    }
    if (isset($_SESSION['user'])) {
        $user = $_SESSION['user'];
    }
    if ($islogged) {
        header('Location: index.html');
    } else {
        require_once 'login.php';
    }

    ?>
</body>

</html>