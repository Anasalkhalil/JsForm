const questions = [
{question: 'Enter Your First Name'},
{question: 'Enter Your Last Name'},
{question: 'Enter Your Email' , pattern: /\S+@\S+\.\S+/},
{question: 'Create A Password', type: 'password'},
];

const shakeTime = 100;
const switchTime = 200;

// init position at first Question
let position = 0;

// Init Dom Elements
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');

// Events
// get Questions on Dom Load 
document.addEventListener('DOMContentLoaded', getQuestion);

// next Button Click
nextBtn.addEventListener('click', validate)
// prev Button Click
prevBtn.addEventListener('click', prevQuestion)
// Input Enter Click
inputField.addEventListener('keyup', e =>{
    if(e.keyCode == 13){
        validate();
    }
})
// Finction

// Get Question 
function getQuestion(){
    
    inputLabel.innerHTML = questions[position].question;
    // get current type
    inputField.type = questions[position].type || 'text';
    // get current answer
    inputField.value = questions[position].answer || '';
    //Focus On Element
    inputField.focus();

    progress.style.width = (position * 100) / questions.length + '%';

    prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';
    
   
    showQuestion();

}
function showQuestion(){
    
    inputGroup.style.opacity = 1;
    inputProgress.style.transition = '';
    inputProgress.style.width = '100%';

}

// hide Quistion

function hideQuestion(){
    inputGroup.style.opacity = 0;
    inputLabel.style.marginLeft = 0;
    inputProgress.style.width = 0;
    inputProgress.style.transition = 'none';
    inputGroup.style.border = null;
}
// transform to create shake motion
function transform(x,y){
    console.log(x+' '+y)
    formBox.style.transform = `translate(${x}px, ${y}px)`;
}

function prevQuestion(){
    if (position < 1) return; 
    formBox.className = '';
    setTimeout(transform, shakeTime * 0 ,0,10);
    setTimeout(transform, shakeTime * 1 ,0,0);
    position--;
    // Store Answer
    if(questions[position]){
        hideQuestion();
        getQuestion();
    }else{
        // No more questions
        hideQuestion();
        formBox.className = 'close';
        progress.style.width = '100%';
    }

}
function validate(){
    // make sure pattern match
    if(!inputField.value.match(questions[position].pattern || /.+/)){
        inputFail();
    }else{
        inputPass();
    }
}
function inputFail(){
    formBox.className = 'error';
    // repeat Shake Motion
    for(let i=0 ; i<6 ; i++){
        setTimeout(transform, shakeTime * i,((i % 2) * 2 -1) * 20 ,0);
        setTimeout(transform, shakeTime * 6, 0 ,0);
        inputField.focus();
    }
}
function inputPass(){
    formBox.className = '';
    setTimeout(transform, shakeTime * 0 ,0,10);
    setTimeout(transform, shakeTime * 1 ,0,0);

    // Store Answer
    questions[position].answer = inputField.value;
    console.log(questions[position].answer);
    position++;

    if(questions[position]){
        hideQuestion();
        getQuestion();
    }else{
        // No more questions
        hideQuestion();
        formBox.className = 'close';
        progress.style.width = '100%';

        // Form Compleate 

        formComplete()
    }
}
// form Compleate
function formComplete(){
    console.log(questions);
    const h1= document.createElement('h1');
    h1.classList.add('end');
    h1.appendChild(document.createTextNode(`Thanks ${questions[0].answer} 
    You are registered and will get an email shortly`));
    setTimeout(()=> {
        formBox.parentElement.appendChild(h1);
        setTimeout(()=> h1.style.opacity = 1 , 50 )
    },1000)
}