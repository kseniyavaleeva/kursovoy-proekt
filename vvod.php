<meta charset="utf-8">
<?php
	require_once 'connect.php';
?>
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<title>VVOD</title>
<link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
</head>
<style>
	body{
    text-align: center;
    font-family: 'Raleway', sans-serif;
    font-size: 25px;
    color: #fff;
    margin-top: 255px;
    background-color: #bc92ab;
    background-image: -moz-linear-gradient(top,#ec9cb5,#75839d);
    background-image: -webkit-gradient(linear,0 0,0 100%,from(#ec9cb5),to(#75839d));
    background-image: -webkit-linear-gradient(top,#009688,rgba(0, 150, 136, 0));
    background-repeat: no-repeat;
    background-position: top;
	}
	.but{
	text-align: center;
}

button, input[type=reset], input[type=submit] {
    background: #2196f3;
    border: 1px solid rgba(0,0,0,.12);
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    width: 13%;
    height: 7%;
    display: inline-block;
    margin: 7px;
    padding: 8px 16px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
}

</style>
<body>
<?php
	$slovo = isset($_POST['slovo']) ? 
		trim(mysqli_real_escape_string($link, $_POST['slovo'])) : '';
	
	if (!empty($slovo)) {
		$link->query("INSERT INTO newsletter(slovo) VALUES ('{$slovo}')");
		
		if ($link->affected_rows == 1)
			echo '<h1>Ваше слово или фраза сохранена в Базе Данных!</h1>';
		else
			echo '<p>Что-то пошло не так...</p>';
	}
?>
<div class="but">
                   <a href="index.html"><button>Вернуться к переводу</button></a>
               </div>
</body>
</html>
