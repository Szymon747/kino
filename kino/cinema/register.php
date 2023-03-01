<html>

<head>
    <link rel="stylesheet" href="style.css" />
    <title>Formularz rejestracji</title>
</head>

<body>
    <div id="register-form">
        <h1>Rejestracja</h1>
        <form class="login-form" action="<?= $_SERVER['PHP_SELF'] ?>" method="post">
            <div class="form-group">
                <label for="usernameInput">Login:</label>
                <input id="usernameInput" class="form-control" type="text" name="username" />
            </div>
            <div class="form-group">
                <label for="passwordInput">Password:</label>
                <input id="passwordInput" class="form-control" type="password" name="password" />
            </div>
            <div class="form-group">
                <label for="telNumInput">Phone number:</label>
                <input id="telNumInput" class="form-control" type="text" name="phonenumber" />
            </div>
            <div class="form-group">
                <label for="mailInput">Mail:</label>
                <input id="mailInput" class="form-control" type="mail" name="mail" />
            </div>
            <input type="submit" class="btn btn-default" name="submit" value="Zarejestruj" />
        </form>
        <?php
        if (isset($_POST["submit"])) {
            require_once  './config.php';
            $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
            $username = $_POST['username'];
            $password = md5($_POST['password']);
            $phonenumber = $_POST['phonenumber'];
            $mail = $_POST['mail'];
            if (empty($username) || empty($password)) {
                echo '<p class="red">Login, hasło i email nie mogą być puste</p>';
            } else {
                if ($mysqli->query("INSERT  INTO users ( username, password, phonenumber, mail) 
                    VALUES ( '$username', '$password', '$phonenumber', '$mail')")) {
                    header('Location: index.php');
                } else {
                    echo "<p class='red' '>Wystąpił błąd podczas dodawania użytkownika: </p>";
                    exit();
                }
            }
        }
        ?>
    </div>
</body>

</html>