// here we can fetch any element using custom attribute
const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


//initially
let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
setIndicator("#ccc");


// writing function start

// this function set password length
// yah kewal passwordlengh ko ui pr show krta hai
function handleSlider() {

    inputSlider.value = passwordLength ;
    lengthDisplay.innerText = passwordLength;
//    slider me kitna part colored rhega uske liye code 
     const min = inputSlider.min;
     const max = inputSlider.max;
     inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
     //( (passwordLength - min)*100/(max - min)) =>this part show width of slider
     // "% 100%"=>this part show height of slider that is full
}


// this function will set color of strength

function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;

}


// we know that math.random function generater random number between zero to one
function getrndInteger(min,max){
    return Math.floor(Math.random()*(max-min)) +min;

    // math.floor roundoff the value
}

// writing fucnction that generate random number betwenn one to nine 
function generaterndnumber() {
    return getrndInteger(0,9);
}

function generaterndlowercase()
{
    // string.fromcharcode convert ascii value into character
    return String.fromCharCode(getrndInteger(97,123));
}
function generaternduppercase()
{
    // string.fromcharcode convert ascii value into character
    return String.fromCharCode(getrndInteger(65,91));
}
// generate symbols

function generaterndsymbol() {
    const randNum = getrndInteger(0,symbols.length);
    return symbols.charAt(randNum);
    // charAt ->  ush index pr kaun sa character hai vo provide krta hai
} 

function calStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}
// how to copy on clipboard readyourself

// we want await function so we use async fumtion

async function copyContent()
{
    try{
// tab tak ruko jab tak copy n ho jaye this return a promise 
await navigator.clipboard.writeText(passwordDisplay.value);
// jab copy ho jaye tab coppied show kar dena
copyMsg.innerText = "coppied"


    }
    catch(e)
    {
// jab error show kare to failed show kar dena
     copyMsg.innerText = "Failed";

    }


// to make copy wala span visible
copyMsg.classList.add("active");

setTimeout( ()=> {

    copyMsg.classList.remove("active");

},2000);

}

// teen jagah event listener lagega generatepassword ,slider and copied wale section par

// slider ko slide krne se eik value change hogi jisko hame passwordlength wale variable me copy krnin hai
inputSlider.addEventListener('input',(e) => {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click',()=>{
    // if password is not empty then copy
    if(passwordDisplay.value)
    copyContent();
})


// creating shuffle function 
function shufflePassword(array){
    // fisher yates method -> in this method we can shuffle an array 
    for(let i = array.length-1; i>0 ; i--)
    {
        // here we find a random j between o to i  + 1;
        const j = Math.floor(Math.random()*(i+1));

        // here swapping occurs
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el)=> (str += el));
    return str;

}
// here we are applying event listener on check box we want to maintain count of check box
// because if there is no check box selected then password generate button will noy work

function handlCheckBoxChange(){
    checkCount = 0; 
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked) checkCount++;
    });
    // special condition
    if(passwordLength<checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox)=>{

    // jaise hi check k cnt change ho handlecheckboxchange ko call kr dena
    checkbox.addEventListener('change',handlCheckBoxChange);
})

generateBtn.addEventListener('click',()=>{
    // none of the check box is selected
    if(checkCount == 0) return ;

    if(passwordLength<checkCount)
    {
        passwordLength = checkCount;
        handleSlider();
    }

    // let's start the journey of find new password
    // remove old password
    password = "";
    /// lets put the stuff mentioned by checkboxes
    // if(uppercaseCheck.checked)
    // {
    //     password += generaternduppercase();
    // }
    // if(lowercaseCheckcaseCheck.checked)
    // {
    //     password += generaterndlowercase();
    // }
    // if(numbersCheckCheck.checked)
    // {
    //     password += generaterndnumber();
    // }
    // if(symbolsCheck.checked)
    // {
    //     password += generaternduppercase();
    // }
    // if(uppercaseCheck.checked)
    // {
    //     password += generaterndsymbols();
    // }

let funArr = [];
if(uppercaseCheck.checked)
    funArr.push(generaternduppercase);

if(lowercaseCheck.checked)
    funArr.push(generaterndlowercase);

if(symbolsCheck.checked)
    funArr.push(generaterndsymbol);

if(numbersCheck.checked)
    funArr.push(generaterndnumber);

    // pehle jo chekc unko add kro

    for(let i = 0 ; i<funArr.length ; i++)
{
    password += funArr[i]();
}

// remaining fill kr do ho man chahe till password length

for(let i = 0 ; i< passwordLength-funArr.length ; i++)
{
    let randIndex = getrndInteger(0,funArr.length);
    password += funArr[randIndex]();
}

// now here shuffle all element of password 
password = shufflePassword(Array.from(password));

// show it on display
passwordDisplay.value = password;
// calculate strength
calStrength();
 


})