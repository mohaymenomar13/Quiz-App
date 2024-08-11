<!DOCTYPE html>
<html>
<head>
    <title>Quiz App - Take Quiz</title>
    <style>
        body {
            text-align: center;
        }
    </style>
</head>
<?php 
$conn = mysqli_connect('localhost','root','','quiz_app');
?>
<body>
    <h1>Quiz</h1>
    <div id="question-container">
        <h3 id="current"></h3>
        <h2 id="question-text"></h2>
        <input type="radio" name="choice" id="choice0">
        <label for="label0" id="label0"></label>
        <input type="radio" name="choice" id="choice1">
        <label for="label1" id="label1"></label>
        <input type="radio" name="choice" id="choice2">
        <label for="label2" id="label2"></label>
        <input type="radio" name="choice" id="choice3">
        <label for="label3" id="label3"></label>

        <br><br>
        <button onclick="checkAnswer()" id="btn">Submit Answer</button>

        <h3 id="result"></h3>
        <h3 id="result2"></h3>
    </div>


    <script>
    var current = document.getElementById("current");
    
    var questionText = document.getElementById("question-text");
    var questions = [<?php 
                $sql = "SELECT * FROM finaldata WHERE 1";
                $result = mysqli_query($conn, $sql);
                while ($row = mysqli_fetch_assoc($result)) {
                    $id=$row['id'];
                    $questions=$row['questions'];
                    echo '"'.$questions.'",';
                };
            ?>];
    var answers = [<?php 
                $sqll = "SELECT * FROM finaldata WHERE 1";
                $resultt = mysqli_query($conn, $sqll);
                while ($row = mysqli_fetch_assoc($resultt)) {
                    $id=$row['id'];
                    $answers=$row['answers'];
                    echo '"'.$answers.'",';
                }
            ?>];
    var answers1 = [<?php 
                $ans1 = "SELECT * FROM finaldata WHERE 1";
                $resultt = mysqli_query($conn, $ans1);
                while ($row = mysqli_fetch_assoc($resultt)) {
                    $id=$row['id'];
                    $answers=$row['answers1'];
                    echo '"'.$answers.'",';
                }
            ?>];
    var answers2 = [<?php 
                $ans2 = "SELECT * FROM finaldata WHERE 1";
                $resultt = mysqli_query($conn, $ans2);
                while ($row = mysqli_fetch_assoc($resultt)) {
                    $id=$row['id'];
                    $answers=$row['answers2'];
                    echo '"'.$answers.'",';
                }
            ?>];
    var answers3 = [<?php 
                $ans3 = "SELECT * FROM finaldata WHERE 1";
                $resultt = mysqli_query($conn, $ans3);
                while ($row = mysqli_fetch_assoc($resultt)) {
                    $id=$row['id'];
                    $answers=$row['answers3'];
                    echo '"'.$answers.'",';
                }
            ?>];

    var questAnswered = [];
    var questShown = [];
    var questionWrong = [];
    var questRanValue = "";
    let questionsMax = questions.length;
    let questionsFinished = 1;


    let correct = 0;
    let wrong = 0;

    let answersArrays = [answers, answers1, answers2, answers3];
    let shuffledAnsArys = [...Array(answersArrays.length).keys()].sort(() => Math.random() - 0.5);

    questionText.innerHTML = questRanValue = questions[Math.floor(Math.random() * questions.length)];
    questShown.push(questRanValue);
    let indexQuestions = questions.indexOf(questRanValue);
    questAnswered.push(indexQuestions);
    var leftQuestions = questions.filter((value) => !questShown.includes(value));

    for (let i = 0; i < answersArrays.length; i++) {
    let arrayIndex = shuffledAnsArys[i];
    let values = answersArrays[arrayIndex][indexQuestions];
    document.getElementById("label"+[i]).innerHTML = values;
    document.getElementById("choice"+[i]).value = values;
    }

    var label0 = document.getElementById("label0");
    var label1 = document.getElementById("label1");
    var label2 = document.getElementById("label2");
    var label3 = document.getElementById("label3");

    label0.addEventListener("click", function() {
            document.getElementById("choice0").checked = true;
    });
    label1.addEventListener("click", function() {
        document.getElementById("choice1").checked = true;
    });
    label2.addEventListener("click", function() {
        document.getElementById("choice2").checked = true;
    });
    label3.addEventListener("click", function() {
        document.getElementById("choice3").checked = true;
    });

    var result = document.getElementById("result");
    var userAnswer = null;
    var indexAnswers = null;
    function checkAnswer() {
        userAnswer = document.querySelector("input[name='choice']:checked");
        indexAnswers = answers.indexOf(userAnswer.value);
        if (indexQuestions !== indexAnswers) {
            result.innerHTML = "Your answer is wrong. The correct answer is: "+answers[indexQuestions];
            wrong++;
            questionWrong.push(indexQuestions);
        } else {
            result.innerHTML = "Your answer is correct"; 
            correct++;
        }
        console.log("Answer: "+userAnswer.value);
        questionsFinished++;
        current.innerHTML = questionsFinished+"/"+questionsMax;
        userAnswer.checked = false;
        nextQuestion();
    };

    function nextQuestion() {
        questionText.innerHTML = questRanValue = leftQuestions[Math.floor(Math.random() * leftQuestions.length)];
        questShown.push(questRanValue);
        indexQuestions = questions.indexOf(questRanValue);
        questAnswered.push(indexQuestions);
        leftQuestions = questions.filter((value) => !questShown.includes(value));

        shuffledAnsArys = [...Array(answersArrays.length).keys()].sort(() => Math.random() - 0.5);
        for (let i = 0; i < answersArrays.length; i++) {
        let arrayIndex = shuffledAnsArys[i];
        let values = answersArrays[arrayIndex][indexQuestions];
        document.getElementById("label"+[i]).innerHTML = values;
        document.getElementById("choice"+[i]).value = values;
        };
        console.log("Questions Finished: "+questionsFinished);
        console.log("Left Questoins: "+leftQuestions.length);
        console.log("Questions Shown: "+questShown.length);
        document.querySelector("input[name='choice']").select

        /*
        questionText.innerHTML = questRanValue = questions[Math.floor(Math.random() * questions.length)];
        indexQuestions = questions.indexOf(questRanValue);
        */
        
        if (questionsFinished === questionsMax) {
            result.innerHTML = "Your score: "+correct+"/"+questionsMax;
            questionText.innerHTML = "All questions have answered";

            for (let i=0;i<4;i++) {
                document.getElementById("label"+[i]).style = "display:none";
                document.getElementById("choice"+[i]).style = "display:none";
                document.getElementById("btn").style = "display:none";
            }
            document.getElementById("result2").innerHTML = "Below are the questions you've answered incorrectly.<br>"+questionWrong;
        }
    };
    current.innerHTML = questionsFinished+"/"+questionsMax;
</script>
</body>
</html>
