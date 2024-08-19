let levelNumber = document.getElementById("levelNumber");
let displayLetters = document.querySelector(".displayLetters");
let inputBtns = document.querySelectorAll(".inputBtns");
let userDisplay = document.querySelectorAll(".userDisplay");
let display = document.getElementById("display");
let scoreBtn = document.getElementById("score");
let skipBtn = document.getElementById("skipBtn");
let restartBtn = document.getElementById("restartBtn");
let deleteLetters = document.querySelector(".deleteBtn");
let nextBtn = document.getElementById("nextBtn");
let clueText = document.getElementById("clueText");

let content = [];
let displayed;
let buttonArray = [];

const answer = ["ANIMAL", "SCHOOL", "HOSPITAL", "HAPPINESS", "BREAD", "DAVID", "GIRAFFE", "COMPUTER", "OCEAN", "MOUNTAIN", "BOOK", "TREE", "CAR", "DOG", "CAT", "PHONE", "CHAIR", "PLANE", "CLOUD", "RIVER", "BRIDGE", "CAMERA", "HOUSE", "SHOE", "MOON", "SUN", "MUSIC", "PAINTING", "SOCCER", "BASKETBALL", "PIZZA", "COFFEE", "SCHOOL", "TEACHER", "DOCTOR", "LAWYER", "SAILBOAT", "TRAIN", "BICYCLE", "MOVIE", "THEATER", "LIBRARY", "PARK", "MUSEUM", "CLOCK", "GUITAR", "DANCE", "FISH", "BIRD", "BUTTERFLY", "BEACH", "MOUNTAIN", "SPACE", "ROBOT", "FIRE", "RAIN"];
const clueArray = ["HOMO SAPIENS KINGDOM CLASSIFICATION", "WHERE YOU GO TO LEARN, EVEN THOUGH YOU HATE IT", "WHERE SICK PEOPLE GO", "UNLIMITED JOY MAKING YOU FEEL GOOD", "WHAT YOU EAT TOGETHER WITH BUTTER", "DEVELOPER OF THE GAME", "TALL MAMMAL", "ELECTRONIC DEVICE", "LARGE BODY OF WATER", "TALL LANDFORM", "COLLECTION OF PAGES", "WOODY PLANT", "MOTOR VEHICLE", "DOMESTIC ANIMAL", "SMALL FELINE", "COMMUNICATION DEVICE", "SEATING FURNITURE", "AIRCRAFT", "VISIBLE MASS OF WATER DROPLETS", "NATURAL FLOWING WATERCOURSE", "STRUCTURE OVER A GAP OR OBSTACLE", "DEVICE FOR CAPTURING IMAGES", "RESIDENTIAL BUILDING", "FOOTWEAR", "EARTH'S NATURAL SATELLITE", "STAR AT THE CENTER OF THE SOLAR SYSTEM", "ART FORM OF SOUND", "VISUAL ART FORM", "FOOTBALL GAME", "BALL GAME", "SAVORY DISH", "HOT BEVERAGE", "EDUCATIONAL INSTITUTION", "EDUCATOR", "MEDICAL PROFESSIONAL", "LEGAL PROFESSIONAL", "BOAT WITH SAILS", "LOCOMOTIVE TRANSPORTATION", "TWO-WHEELED VEHICLE", "CINEMATIC PRODUCTION", "VENUE FOR PERFORMANCES", "COLLECTION OF BOOKS", "LAND FOR PUBLIC RECREATION", "INSTITUTION FOR ART AND HISTORY", "TIMEKEEPING DEVICE", "STRINGED MUSICAL INSTRUMENT", "ART FORM OF MOVEMENT", "AQUATIC ANIMAL", "FEATHERED CREATURE", "INSECT WITH COLORFUL WINGS", "SANDY SHORE BY THE SEA", "TALL LANDFORM", "UNIVERSE BEYOND EARTH'S ATMOSPHERE", "AUTOMATED MACHINE", "COMBUSTION PROCESS", "PRECIPITATION"];
let randomizer = Math.floor(Math.random() * answer.length);
let points = 0;


let levelIncrement = 1;
let newBtn;
let clue;

document.addEventListener("DOMContentLoaded", displayView); 

function displayView(){
    display.innerHTML = "";
    clueText.innerHTML = "";

    if(levelIncrement >= 1){
        for(let i = 0; i < answer[randomizer].length; i++){
        //    setTimeout(() => {
            newBtn = document.createElement("button");
            newBtn.textContent = "";
            newBtn.classList.add("displayLetters");
        
            display.appendChild(newBtn);
            buttonArray.push(newBtn);
        //    }, (i + 1) * 50);
           
        }

        function clueGiver(){
            clue = document.createElement("p");
            clue.textContent = clueArray[randomizer];
            clueText.appendChild(clue);
       }

       clueGiver();
    }

}


function inputLetters(letter){
    inputBtns.forEach(letterBtn => {

        if(letterBtn.textContent === letter && content.length < answer[randomizer].length){
    
          if(answer[randomizer].length >= (content.length)){
            content.push(letter);
            buttonArray[(content.length - 1)].textContent = letter;
          }
        }
    });
}

   

    document.addEventListener("keyup", event => {
        inputBtns.forEach(alphabets => {
            if(event.key.toUpperCase() === alphabets.textContent){
                   alphabets.classList.remove("addInputStyle");  
                   alphabets.classList.add("inputBtns");
            }
        })
    
        });

document.addEventListener("keydown", event => {
    if(event.key == "Backspace" && content.length > 0){
        deleteBtn();
        deleteLetters.classList.replace("deleteBtn", "activeDeleteBtn");
        deleteLetters.style.backgroundColor = "black";

        
    }
});

document.addEventListener("keyup", event => {
    if(event.key == "Backspace"){
        deleteLetters.classList.replace("activeDeleteBtn", "deleteBtn");
        deleteLetters.style.backgroundColor = "rgb(239, 192, 189)";
    }
    });

function deleteBtn(){  
    if((content.length) >= 1){
     // At this point content.length = 1;
    content.pop();
     // At this point content.length = 0;
    displayed = content.length;
     // So that's how it could clear the first textContent;
    buttonArray[displayed].textContent = "";
    }
}


function checkAns(){
    let correctWord = content.join("");

    displayed = content.length;
    display.innerHTML = "";
    buttonArray = [];

        if(correctWord == answer[randomizer]){

            levelNumber.textContent = levelIncrement;
            answer.splice(randomizer, 1);
            clueArray.splice(randomizer, 1);
             
            content = [];  
            randomizer = Math.floor(Math.random() * answer.length);
            clue.textContent = "";
            clueText.textContent = "";
            points += 5;
            scoreBtn.textContent = `POINTS: ${points}`;
            
            leveler(); 
            displayView();
 
            display.style. border = "none";
        }

    
        else if(correctWord != answer[randomizer]){
        
            // content = content.filter( item => item.trim() !== "");
            content = [];
            buttonArray = [];
            clueText.textContent = "";
            displayView();
        }
}


document.addEventListener("keydown", event => {
    displayed = content.length;
    inputBtns.forEach(alphabets => {
 
        if(answer[randomizer].length >= (content.length +1)){
    
            if(event.key.toUpperCase() === alphabets.textContent){
               content.push(alphabets.textContent);
              
                alphabets.classList.remove("inputBtns");
                alphabets.classList.add("addInputStyle");

               buttonArray[displayed].textContent = content[displayed];
                displayed++;
            }          
        }     
       
 
    });   

});


    const time = setInterval(() => {
        let correctWord = content.join("");
        if(content.join("") == answer[randomizer]){
            display.style.boxShadow = "0px 0px 50px rgb(18, 250, 33)";
            display.style.color = "rgb(18, 250, 33)";
            userDisplay.forEach(letter => {
                letter.style.color = "green";
            })
            setTimeout(() => {
                checkAns();
                display.style.boxShadow = "none";
            }, 900);
        }

        else if(correctWord != answer[randomizer] && answer[randomizer].length == content.length){
            display.style.boxShadow = "0px 0px 50px red";
            setTimeout(() => {
                checkAns();
                display.style.boxShadow = "none";
            }, 900);

        }    
    }, 1000);



function leveler(){
    
    if(levelIncrement >= 0){
        levelIncrement++;
        levelNumber.textContent = `LEVEL: ${levelIncrement}`;

    }
    levelNumber.style.fontWeight = "bold";
}


function skip(){
   let result = confirm('SKIPPING THIS QUESTION WOULD COST YOU 15 POINTS');

    if(result){
        points -= 15;
        scoreBtn.textContent = `POINTS: ${points}`;
        randomizer = Math.floor(Math.random() * answer.length);
        display.innerHTML = "";
        content = [];
        buttonArray = [];
        clueText.textContent = "";
        displayView();
    }
  }





// function restart(){
//     location.reload();
// }

// let correctWord = content.join("");

    // else if(correctWord == answer[randomizer] && correctWord.length == answer[randomizer].length){
    //     buttonArray = [];
    //     console.log(buttonArray.length);
    // }



 // newBtn.textContent = 
            // let displayLetterArray = Array.from(displayLetters);
            // let index = displayLetterArray.findIndex(item => item == newBtn);
            // console.log(index);
// function clueGiver(){
//      clue = document.createElement("p");
//      clue.textContent = clueArray[randomizer];
//      clueText.appendChild(clue);
// }

// clueGiver();

 // displayLetters[displayed].textContent = letter;

            // newBtn.textContent = 
            // let displayLetterArray = Array.from(displayLetters);
            // let index = displayLetterArray.findIndex(item => item == newBtn);
            // console.log(index);

            // console.log(displayed);
        // for(let i = 0; i < answer[randomizer].length; i++){
        //        let newBtn = document.createElement("button");
        //        newBtn.classList.add("displayLetters");
            
            // document.appendChild(newBtn);
// answer[] = randomizer;

// displayLetters.forEach(letter => {
//     letter.addEventListener("click", event => {

//         let letterPosition = content.indexOf(letter.textContent);
//         console.log(letterPosition);
//         console.log(content);

//         content.splice(letterPosition, 1);

//         console.log(content);
//     })
// })

// function clearDisplay(){

// }


// correctAns();
 

//     if()


//     displayLetters.forEach(letter => {
    
//             let alpha = letter.textContent;
//             console.log(alpha);
//             let letterPosition = content.indexOf(alpha);
//             console.log(letterPosition);
//             console.log(content);
    
//             letter.textContent = "";
    
//             content.splice(letterPosition, 1);
//             console.log(content);

//     })

    
// }

// function displayLetter(){
//     if(displayLetters[displayed].textContent != ""){
//         displayed++;

//         console.log(displayed);
//     }


// }

// displayLetter();

       // for(let i = 0; i < answer[randomizer].length; i++){
            //     userDisplay.forEach(display => {
            //        let newBtn = document.createElement("button");

            //        newBtn.classList.add("displayLetters");
               
            //     })
            // }
            //  buttonArray.forEach(button => {
            //     button.style.display = "none";
            //  })

                
    
    // displayLetters.forEach(display => {
    //     display.remove();
    // })




// function hi(){
//     if(levelIncreement == 1){
      
        
//         for(let i = 0; i < answer[randomizer].length; i++){
            

//                 // setTimeout(() => {
//             newBtn = document.createElement("button");
//             newBtn.textContent = "";
//             newBtn.classList.add("displayLetters");
//             display.appendChild(newBtn);
//             buttonArray.push(newBtn);  
//                 // }, (i + 1) * 50);
          
//         }

//         function clueGiver(){
//             clue = document.createElement("p");
//             clue.textContent = clueArray[randomizer];
//             clueText.appendChild(clue);
//        }

//        clueGiver();
//     }
// }

// hi();