<?php
$question = $_POST['question'];
$answer = $_POST['answer'];

$conn = mysqli_connect('localhost','root','','quiz_app');
$sql = "INSERT INTO `data`(`questions`,`answers`) VALUES ('$question','$answer')";
        $insert = mysqli_query($conn, $sql);
        if (!$insert) {
            echo "something went wrong";
        }
        else {
            header("Location: /Quiz_App/add-questions.php");
        }
?>