console.log("To edit new things, just use this command: 'noDataEdd.click();'");

var button1 = document.getElementById("sndButton1");
var backBtn = document.getElementById("mButton3");

var firstChild = document.querySelector(".firstChild");
var secondChild = document.querySelector(".secondChild");
var crChild1 = document.querySelector(".crChild1");
var crChildI = document.querySelector(".crChildI");

button1.addEventListener("click", function() {
    firstChild.classList.remove("openAni");
    firstChild.classList.add("closeAni");
    secondChild.setAttribute("style","");
    secondChild.classList.add("openAni");
});

backBtn.addEventListener("click", function() {
    secondChild.classList.remove("openAni");
    secondChild.classList.add("closeAni");
    firstChild.classList.add("openAni");
});

firstChild.style.display = "none";
secondChild.style.display = "none";
crChild1.style.display = "none";
crChildI.style.display = "block";


var enterBtn = document.getElementById("crChildIB");
var answerKey = document.getElementById("crChildIA");
var questionKey = document.getElementById("crChildID");
var noData = document.getElementById("noData");

//Loading the Data Source
let answerArray;
let questionArray;
addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("preDataAnswers") == null || localStorage.getItem("preDataAnswers") == "[]") {
    localStorage.setItem("preDataAnswers", "[]");
    localStorage.setItem("preDataQuestions", "[]");
    answerArray = [];
    questionArray = [];
    noData.style.display = "block";
  } else {
    noData.style.display = "none";
    answerArray = JSON.parse(localStorage.getItem("preDataAnswers"));
    questionArray = JSON.parse(localStorage.getItem("preDataQuestions"));
  }
  preview();
  placeholderChange();
});
var pData = "";

//Change the placeholder both for the answerkey and description
let val1;
let val2;
{function placeholderChange() {
  val1 = answerArray;
  val2 = questionArray;
    let placehAns = document.getElementById("crChildIA");
    let placehQtn = document.getElementById("crChildID");
    if (val1.length !== 0 || val2.length !== 0) {
  const ansArray = val1;
  const qtnArray = val2;
  let random = Math.floor(Math.random() * ansArray.length);
  placehAns.setAttribute("placeholder", ansArray[random]);
  placehQtn.setAttribute("placeholder", qtnArray[random]);
  } else {
    placehAns.setAttribute("placeholder", "Enter the answer Key");
    placehQtn.setAttribute("placeholder", "Enter the question");
  }
}}

//Entering Data
enterBtn.addEventListener("click", () => {
  if (answerKey.value !== "" && questionKey.value !== "") {
    answerKey.focus();
    answerArray.push(answerKey.value);
    questionArray.push(questionKey.value);
    const stringAnsArray = JSON.stringify(answerArray);
    const stringQtnArray = JSON.stringify(questionArray);
    localStorage.setItem("preDataAnswers", stringAnsArray);
    localStorage.setItem("preDataQuestions", stringQtnArray);

    //Auto add into preview the new answers & questions
    while(previewTable.firstChild) {
      previewTable.removeChild(previewTable.firstChild);
    }
    preview();
    placeholderChange();
    noData.style.display = "none";

    answerKey.value = "";
    questionKey.value = "";
  } else {
    alert("You haven't entered any data yet")
  }
});


//Preview of the Data
let prevAnswer = "";
let prevQuestion = "";
let previewAnsQtn = "";
let classIndi = 0;

function preview() {
  //Showing the noData if no data is existed
  if (localStorage.getItem("preDataAnswers") == null || localStorage.getItem("preDataAnswers") == "[]") {
    noData.style.display = "block";
  } else {
    noData.style.display = "none";
  }

  var answerPrev = document.getElementById("crChildITabTh1");
  var questionPrev = document.getElementById("crChildITabTh2");
  var previewTable = document.getElementById("previewTable");
  var preDataAnswers = localStorage.getItem("preDataAnswers");
  var preDataQuestions = localStorage.getItem("preDataQuestions");
  const parsedAnswer = JSON.parse(preDataAnswers);
  const parsedQuestion = JSON.parse(preDataQuestions);


  for (let i = 0; i < parsedAnswer.length; i++) {
    const newTr = document.createElement("tr");
    newTr.setAttribute("onclick", "openDialog("+i+");");
    if (classIndi === 0) {
      newTr.classList.add("prevTr2");
      classIndi = 1;
    } else {
      newTr.classList.add("prevTr3");
      classIndi = 0;
    }

    const newTd = document.createElement("td");
    newTd.classList.add("prevAnswer");
    newTd.textContent = parsedAnswer[i];
    newTr.appendChild(newTd);

    const newTd1 = document.createElement("td");
    newTd1.classList.add("prevQuestion");
    newTd1.textContent = parsedQuestion[i];
    newTr.appendChild(newTd1);

    previewTable.appendChild(newTr);
  };
}

//Dialog for Editing Data (Answer and Question)
const dialogEdit = document.getElementById("dialogEditData");
const diaQuestion = document.getElementById("diaQuestion");
const diaAnswer = document.getElementById("diaAnswer");
const diaEnter = document.getElementById("diaEnter");
const diaDelete = document.getElementById("diaDelete");
const diaCancel = document.getElementById("diaCancel");


//Open Dialog
let diaIndex;
function openDialog(ind) {
  diaIndex = ind;
  dialogEdit.showModal();
  diaAnswer.value = answerArray[ind];
  diaQuestion.value = questionArray[ind];
}

//Enter new Edited Data
diaEnter.addEventListener("click", () => {
  answerArray[diaIndex] = diaAnswer.value;
  questionArray[diaIndex] = diaQuestion.value;
  const stringAnsArray = JSON.stringify(answerArray);
  const stringQtnArray = JSON.stringify(questionArray);
  localStorage.setItem("preDataAnswers", stringAnsArray);
  localStorage.setItem("preDataQuestions", stringQtnArray);
  
  while(previewTable.firstChild) {
    previewTable.removeChild(previewTable.firstChild);
  }
  preview();
  dialogEdit.close();
});

//Cancel Dialog
diaCancel.addEventListener("click", () => {
  dialogEdit.close();
  diaSave.close();
});

//Delete the selected row of Answer and Question
diaDelete.addEventListener("click", () => {
  answerArray.splice(diaIndex, 1);
  questionArray.splice(diaIndex, 1);

  const stringAnsArray = JSON.stringify(answerArray);
  const stringQtnArray = JSON.stringify(questionArray);
  localStorage.setItem("preDataAnswers", stringAnsArray);
  localStorage.setItem("preDataQuestions", stringQtnArray);

  while(previewTable.firstChild) {
    previewTable.removeChild(previewTable.firstChild);
  }
  if (localStorage.getItem("preDataQuestions") == "[]") {
    noData.style.display = "block";
  }
  preview();
  placeholderChange();
  dialogEdit.close();
});

//Save the Data
let save = document.getElementById("save");
let diaName = document.getElementById("diaName");
let diaSaveEnter = document.getElementById("diaSaveEnter");
let diaSaveCancel = document.getElementById("diaSaveCancel");
let diaSave = document.getElementById("diaSave");
save.addEventListener("click", () => {
  if (answerArray.length !== 0 || questionArray.length !== 0) {
    diaSave.showModal();

    //Generate random name
    const names = [
      "Science Exploration",
      "Math Challenges",
      "Historical Journeys",
      "Literary Insights",
      "Global Geography",
      "Musical Trivia",
      "Sports Insights",
      "General Knowledge Quest",
      "Movie Trivia",
      "Tech Explorations",
      "Animal Adventures",
      "Culinary Delights",
      "Artistic Inspirations",
      "Language Puzzles",
      "Space Discoveries",
      "Nature Wonders",
      "Health Insights",
      "Fashion Discoveries",
      "Mythology Mysteries",
      "Personality Quest"];
    let randomName = Math.floor(Math.random() * names.length);
    diaName.value = names[randomName];
  } else {
    alert("You can't save it unless you puts something in there");
  }
});

//Close the save dialog
diaSaveCancel.addEventListener("click", () => {
  diaSave.close();
});

//Enter the data to save
function getQuizName() {
  let name = diaName.value;
  return name;
};
diaSaveEnter.addEventListener("click", () => {
  const stringAnsArray = JSON.stringify(answerArray);
  const stringQtnArray = JSON.stringify(questionArray);

  let timestamp = new Date();
  let minutes = timestamp.getMinutes();
  if (minutes.length === 1) {
    minutes = 0+minutes;
  }
  let hours = timestamp.getHours();
  if (hours.length === 1) {
    hours = 0+hours;
  }

  const info = {
    "quizName": diaName.value,
    "quizAnswers": stringAnsArray,
    "quizQuestions": stringQtnArray,
    "timeCreated": timestamp,
    "Author": "unknown"
  };

  let sQuizName = "quiz|"+diaName.value+"{"+timestamp.getMonth() + "-" + timestamp.getDate() + "-" + timestamp.getFullYear()+ ", " + hours + ":" + minutes + "}" + "unknown";
  if (sQuizName in localStorage) {
    alert("A Quiz with that name already exists");
  } else {
    localStorage.setItem(sQuizName, JSON.stringify(info));
    localStorage.setItem("preDataAnswers", "[]");
    localStorage.setItem("preDataQuestions", "[]");
    window.location.reload();
  }
});

////////////////////////////////
//Edit Existing Quizzes
let editExistBtn = document.getElementById("mButton2");
let noDataEd = document.getElementById("noDataEd");
let edChildT = document.getElementById("edChildT");
let edChild = document.getElementById("edChild");

editExistBtn.addEventListener("click", () => {
  let quizLS = [];
  let quizNames = [];
  let authors = [];
  let time = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const keys = localStorage.key(i);
    if (keys.startsWith("quiz|")) {

      //Adding to the arrays of the values from localStorage
      quizLS.push(keys);
      let autInd = keys.indexOf("}");
      let auth = keys.slice(autInd+1, keys.length);
      authors.push(auth);
      let timeInd = keys.indexOf("{");
      let timeIndd = keys.indexOf("}");
      let date = keys.slice(timeInd+1, timeIndd);
      time.push(date);
      let quizInd = keys.indexOf("|");
      let quizName = keys.slice(quizInd+1, timeInd);
      quizNames.push(quizName);
    }
  }

  //edChild div, either there is existing data or not.
  if (quizLS.length == 0) {
    noDataEd.style.display = 'block';
  } else {
    noDataEd.style.display = 'none';

    //displaying each of the existing data
      for (let i = 0; i < quizNames.length; i++) {
        let newDiv = document.createElement('div');
        newDiv.innerHTML = "<span class='newDivClass'>Quiz Name: <u>" + quizNames[i] + "</u> </span><br>"
        + "<span class='newDivClass1'>Author: " + authors[i] + " </span><br>"
        + "<span class='newDivClass1'>Time Created: " + time[i] + " </span>";
        newDiv.classList.add("edChildDiv");
        newDiv.setAttribute("onclick", "openEdDialog(" + JSON.stringify(quizLS[i]) + ")");
        edChild.appendChild(newDiv);
      }
  }
});
editExistBtn.click();

//Opening the edDialog after clicking the div of one of the existing data
function openEdDialog(quizKey) {
  edDialog.showModal();
  let stringQuizKey = JSON.stringify(quizKey);
  edDiaTakeQuiz.setAttribute("onclick", "takeQuiz("+ stringQuizKey +")");
  edDiaReview.setAttribute("onclick", "diaReview("+ stringQuizKey +")");
  edDiaEdit.setAttribute("onclick", "diaEdit(" + stringQuizKey + ")");
  edDiaDel.setAttribute("onclick", "diaDel("+ stringQuizKey + ");");
};
//Editing Data
function diaEdit(quizKey) {
  let parLocalSt = JSON.parse(localStorage.getItem(quizKey));
  //Reset the value of preDataQuestions/Answers & answer/questionArray
  localStorage.setItem("preDataQuestions", parLocalSt.quizQuestions);
  localStorage.setItem("preDataAnswers", parLocalSt.quizAnswers);
  answerArray = [];
  questionArray = [];
  answerArray = JSON.parse(localStorage.getItem("preDataAnswers"));
  questionArray = JSON.parse(localStorage.getItem("preDataQuestions"));
  preview();
  noData.style.display = "none";
  noDataEdd.click();
  edDialog.close();
}

//Deleting data
function diaDel(quizKey) {
  localStorage.removeItem(quizKey);
  edDialog.close();
  window.location.reload();
  editExistBtn.click();
}

//Go to creating new Quiz
let noDataEdd = document.getElementById("noDataEdd");

noDataEdd.addEventListener("click", () => {
  edChild.style.display = "none";
  crChild.style.display = "block";
});

//Reviewing Data
function diaReview(quizKey) {
  console.log(quizKey);
  edChild.style.display = "none";
  afterTkChild.style.display = 'block';

  let data = localStorage.getItem(quizKey);
  let parsedData = JSON.parse(data);
  arrayAns = JSON.parse(parsedData.quizAnswers);
  arrayQtn = JSON.parse(parsedData.quizQuestions);

  let newTable = document.createElement('table');
  newTable.classList.add('wrongsTable');
  newTable.innerHTML = "<th>Answer Key</th><th>Description</th>";
  for (let i = 0; i < arrayAns.length; i++) {
    let newTr = document.createElement('tr');
    let newTd = document.createElement('td');
    newTd.innerHTML = arrayAns[i];
    let newTd1 = document.createElement('td');
    newTd1.innerHTML = arrayQtn[i];
    newTr.appendChild(newTd);
    newTr.appendChild(newTd1);
    newTable.appendChild(newTr);
  }
  afterTkChild.appendChild(newTable);
}

//Operations in Edit existing Quiz
let edDialog = document.getElementById("edDialog");
let edDiaTakeQuiz = document.getElementById("edDiaTakeQuiz");
let edDiaReview = document.getElementById("edDiaReview");
let edDiaEdit = document.getElementById("edDiaEdit");
let edDiaDel = document.getElementById("edDiaDel");

//Cancel the delete dialog
edDiaDel.addEventListener("click", () => {
  edDialog.close();
});

//Make a timer while taking Quiz
let i = 0;
let j = 0;
function timer() {
  let minutes = document.getElementById("minutes");
  let seconds = document.getElementById("seconds");
  let timer = setInterval(() => {
    i++;
    seconds.innerHTML = i;
    if (i === 60) {
      i = 0;
      j++;
      minutes.innerHTML = j;
    }
  }, 1000);
};

function random() {
  let random = Math.floor(Math.random() * arrayQtn.length);
  arrayQtnIndi = random;
  return random;
}

let tkChild = document.getElementById("tkChild");
let tkQtn = document.getElementById("tkQtn");
let numbs = document.getElementById("number");
let arrayAns;
let arrayQtn;
let arrayAns2;
let arrayQtn2;
let randomm;
let lengtharrayQtn;
let arrayWrong = [];
let wrongAnswers = [];
let correctAnswers = [];
let previousQtn;
let previousAns;
//taking a Quiz of a certain Object key
function takeQuiz(quizKey) {
  edDialog.close();
  tkChild.style.display = "block";
  edChild.style.display = "none";
  let data = localStorage.getItem(quizKey);
  let parsedData = JSON.parse(data);
  arrayAns = JSON.parse(parsedData.quizAnswers);
  arrayQtn = JSON.parse(parsedData.quizQuestions);
  timer();
  lengtharrayQtn = arrayQtn.length;
  numbs.innerHTML = answered+"/"+lengtharrayQtn;
  

  nextQuestion();
}

function nextQuestion() {
  randomm = random();
  let theQuestion = arrayQtn[randomm];
  let theAnswer = arrayAns[randomm];
  previousQtn = theQuestion;
  previousAns = theAnswer;
  tkQtn.innerHTML = theQuestion;
}

//Check if the answer is correct
let tkBtn = document.getElementById("tkBtn");
let tkInp = document.getElementById("tkInp");
let scrCorrect = document.getElementById("scoreCorrect");
let scrWrong = document.getElementById("scoreWrong");
let arrayQtnIndi;
let correct = 0;
let max = 0;
let wrong = 0;
let answered = 0;
let afterTkChild = document.getElementById("afterTkChild");
tkBtn.addEventListener("click", () => {
  arrayQtn.splice(randomm, 1);
  arrayAns.splice(randomm, 1);
  answered++;
  numbs.innerHTML = answered+"/"+lengtharrayQtn;
  randomm;
  tkInp.focus();
  let lowerC_tkInp = tkInp.value.toLowerCase().replaceAll("s", "").replaceAll(" ", "").replaceAll("-", "");
  let lowerC_previousAns = previousAns.toLowerCase().replaceAll("s", "").replaceAll(" ", "").replaceAll("-", "");
  if (lowerC_tkInp == lowerC_previousAns) {
    correct++;
    scrCorrect.innerHTML = correct;
    console.log(tkInp.value + " is correct");
  } else {
    if (isSkip == false) {
      alert("Your answer is:\n"+ tkInp.value + "\n" + previousAns);
    }
    wrong++;
    scrWrong.innerHTML = wrong;
    arrayWrong.push(previousQtn);
    correctAnswers.push(previousAns);
    if (tkInp.value !== "") {
      wrongAnswers.push(tkInp.value);
    } else {
      wrongAnswers.push("N/A");
    }
    console.log(tkInp.value + " is wrong. It should be " + previousAns);
    console.log("Considered:\n"+lowerC_tkInp+"\n"+lowerC_previousAns);
  }

  //Reviewing the result of the quiz
  if (arrayQtn.length !== 0) {
    nextQuestion();
  } else if (arrayQtn.length == 0) {
    tkChild.style.display = 'none';
    afterTkChild.style.display = 'block';
    let percent = correct - lengtharrayQtn / 100 * 100 + 100;
    let newDiv = document.createElement('div');
    newDiv.innerHTML += "<br><span>Total points: "+correct+"/"+lengtharrayQtn+"</span><br>";
    newDiv.innerHTML += "<span>Percentage: "+percent+"%</span><br>";
    newDiv.innerHTML += "<span>Here are the questions you've mistakenly answered</span>";
    afterTkChild.appendChild(newDiv);
    let newTable = document.createElement('table');
    newTable.classList.add("wrongsTable");
    newTable.innerHTML = "<th>Question</th><th>Answer</th><th>Correct Answer</th>";
    for (let i = 0; i < arrayWrong.length; i++) {
      let newTr = document.createElement('tr');
      let newTd = document.createElement('td');
      newTd.textContent = arrayWrong[i];
      let newTd1 = document.createElement('td');
      newTd1.textContent = wrongAnswers[i];
      let newTd2 = document.createElement('td');
      newTd2.textContent = correctAnswers[i];
      newTr.appendChild(newTd);
      newTr.appendChild(newTd1);
      newTr.appendChild(newTd2);
      newTable.appendChild(newTr);
      console.log("+");
    }
    afterTkChild.appendChild(newTable);
  }
  tkInp.value = "";
});

let isSkip = false;
function skip() {
  isSkip = true;
  for (let i = 0; i < lengtharrayQtn; i++) {
    tkBtn.click();
  }
}