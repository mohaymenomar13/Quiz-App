<!DOCTYPE html>
<html>
<head>
    <title>Quiz App - Add Questions</title>
    <style>
        body {
            text-align: center;
        }
    </style>
</head>
<body>
    <h1>Add Questions</h1>
    <form id="question-form" action="save-questions.php" method="post">
        <label for="question-input">Question:</label>
        <input type="text" id="question-input" name="question" required>

        <label for="answer-input">Answer:</label>
        <input type="text" id="answer-input" name="answer" required>

        <button type="submit">Add Question</button>
    </form>
</body>
</html>
