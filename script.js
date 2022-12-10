const operand1 = document.querySelector('#operand1');
const operand2 = document.querySelector('#operand2');
const operator = document.querySelector('#operator');
const option1 = document.querySelector('#option1');
const option2 = document.querySelector('#option2');
const option3 = document.querySelector('#option3');
const option4 = document.querySelector('#option4');
const msgbox = document.querySelector('#msgbox');

let indexOfAns;
let interval;
const options = [option1, option2, option3, option4];

const generateNumber = (lower, upper) => {
    const randomNumber = Math.ceil(Math.random()*(upper-lower)) + lower;
    return randomNumber;
}
const generateOperator = () => {
    const arrayOfOperator = ['+', '-', '*', '/'];
    let randomNumber = generateNumber(-1, arrayOfOperator.length-1);
    return arrayOfOperator[randomNumber];
}

const generateQuestion = () => {
    operand1.innerHTML = generateNumber(-50, 50);
    operand2.innerHTML = generateNumber(-50, 50);
    operator.innerHTML = generateOperator();
    for(let i=0; i<options.length; i++) {
        options[i].setAttribute("style", "background-color: rgb(77,62,71);");
        options[i].removeAttribute("disabled");
    }
    msgbox.innerHTML = "Result";
}

const generateAnswer = () => {
    generateQuestion();
    let a = parseInt(operand1.innerHTML);
    let b = parseInt(operand2.innerHTML);
    let op = operator.innerHTML;
    let ans = eval(a+op+b);
    indexOfAns = generateNumber(0,options.length)-1;
    for(let i=0; i<options.length; i++) {
        if(i != indexOfAns) {
            if(op == '/') {
                options[i].innerHTML = generateNumber(ans, ans+50).toFixed(2);          
            } else {
                options[i].innerHTML = generateNumber(ans, ans+50);
            }
        } else {
            if(op == '/') {
                options[i].innerHTML = ans.toFixed(2);
            } else {
                options[i].innerHTML = ans;
            }
        }
    }
    clearInterval(interval);
}

for(let i=0; i<options.length; i++) {
    options[i].addEventListener("click",function(){
        for(let j=0; j<options.length; j++) {
            if(j == indexOfAns) {
                options[j].setAttribute("style","background-color: green;");
            } else {
                options[j].setAttribute("style","background-color: red;");
            }
            options[j].setAttribute("disabled","true");
        }
        if(i == indexOfAns) {
            msgbox.innerHTML = "Correct Answer";
        } else {
            msgbox.innerHTML = "Wrong Answer";
        }
        interval = setInterval(generateAnswer,2500);
    });
}

generateAnswer();