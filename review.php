<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Review</title>
    <style>
        th, td {
            padding-bottom:20px;
            font-size: 25px;
        }
    </style>
</head>
<body>
    <?php 
    $conn = mysqli_connect('localhost','root','','quiz_app');
    ?>

    <table>
        <tr>
            <th>Answer keys</th>
            <th>Questions</th>
        </tr>
        <?php
            $sql = 'SELECT * FROM `finaldata` WHERE  1';
            $result = mysqli_query($conn, $sql);
            while ($row = mysqli_fetch_assoc($result)) {
                $id=$row['id'];
                echo '<tr>
                        <td>'.$row['id'].'</td>
                        <td>'.$row['answers'].'</td>
                        <td>'.$row['questions'].'</td>
                    </tr>';
                    }
                ?>
    </table>

</body>
</html>