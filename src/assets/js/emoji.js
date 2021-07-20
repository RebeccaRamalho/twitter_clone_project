/*I-Emojis appear*/

//Retreival of the element where the event click occur:
const htmlEmo = Array.from(document.getElementById("emoji").children);
//=>[<div>, <div>, ... ]

htmlEmo.forEach((element, index) => {
  let emoInDiv = htmlEmo[index]; //looping through the htmlEmo array. Result=> <div>"😋"</div>

  let emoInString = htmlEmo[index].textContent; //Result => "😋"

  emoInDiv.addEventListener("click", function () {
    //the user must click on an html element
    let boxMessage = document.getElementById("message").value; //<e retreive the textArea value where we want to add the emoji

    const tweets = boxMessage + emoInString; //adding the emoji selected to the textArea value

    document.getElementById("message").value = tweets; //we inject the new value to the textArea
  });
});

/*II_Emoji change opacity*/

const originalEmo = document.getElementById("appearEmo"); //html el where we gonna click to make appear all the emoji
const EmojiId = document.getElementById("emoji");

originalEmo.addEventListener("click", function () {
  EmojiId.style.opacity = 1;
});

/*III_Random Emoji*/

getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}; //getting radom int between 1 an 2

/******/

let emojiIndex = getRandomInt(3); //i retreive a number between 0 and 2
const randomEmoji = document.querySelector("#appearEmo").children; //i retreive all the emoji

/***/

let htmlRandomeEmo = document.querySelector("#randomEmoAppear"); //html el where emo is pushed
// let gg = document.querySelector("#randomEmoAppearsss"); //element where the is hover event
let em = randomEmoji[emojiIndex].textContent; //random emo between 1 an 2 index
let re = randomEmoji[emojiIndex]; //random emo where my mouse is on
console.log("random emo", htmlRandomeEmo);

/***/
function myScript(htmlRandomeEmo) {
  htmlRandomeEmo.innerHTML = randomEmoji[emojiIndex].textContent; //i insert a random number in the emoji index
}
/***/
htmlRandomeEmo.addEventListener("mouseover", function () {
  myScript(htmlRandomeEmo);
  console.log("hummm", htmlRandomeEmo);
});
/***/
