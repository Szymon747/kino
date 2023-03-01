<html>

<head>
    <link rel="stylesheet" href="style.css" />
    <title>Strona logowania</title>
</head>

<body>
    <div id="login-form">
        <h1>Zaloguj się</h1>
        <form class="login-form" action="index.php" method="post">
            <div class="form-group">
                <label for="usernameInput">Login:</label>
                <input class="form-control" id="usernameInput" type="text" name="username" /><br />
            </div>
            <div class="form-group">
                <label for="passwordInput">Hasło:</label>
                <input class="form-control" type="password" name="password" /><br />
            </div>
            <input type="submit" name="submit" style="margin:15px;" value="Login" />
        </form>
        <p> <a href="register.php">Zarejestruj się</a> </p>
        <p><a href="list.php">Podgląd bez logowania </a> </p>
        <?php
        if (isset($_POST['submit'])) {
            require_once "./config.php";
            $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
            if ($mysqli->connect_error) {
                echo "<p>Wystąpił błąd podczas lączenia z bazą danych: {$mysqli->connect_error}</p>";
                exit();
            }
            $username = $_POST['username'];
            $password = md5($_POST['password']);
            $sql = "SELECT id from users WHERE username LIKE '$username' AND password LIKE '$password' LIMIT 1";
            $result = $mysqli->query($sql);
            // echo $sql;
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $user = $row;
                $_SESSION['user'] = $user;
                header('Location: index.php');
            } else {
                echo '<p>Zły login lub hasło!</p>';
            }
        }
        ?>
    </div>
</body>

</html>