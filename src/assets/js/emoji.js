/*I-Emojis appear*/

//Request to the DOM of the element where the event click occur:
const htmlEmo = Array.from(document.getElementById("emoji").children);
//=>[<div>, <div>, ... ]

htmlEmo.forEach((element, index) => {
  let emoInDiv = htmlEmo[index]; //looping through the htmlEmo array. Result=> <div>"😋"</div>
  let emoInString = htmlEmo[index].textContent; //Result => "😋"

  emoInDiv.addEventListener("click", function () {
    //request to the DOM of the textArea value where we want to add the emoji
    let boxMessage = document.getElementById("message").value;
    //adding the emoji selected to the textArea value
    const tweets = boxMessage + emoInString;
    //we inject the new value to the textArea
    document.getElementById("message").value = tweets;
  });
});

/*II_Emoji change opacity*/

//html el where we gonna click to make appear all the emoji
const originalEmo = document.getElementById("appearEmo");
//
const EmojiId = document.getElementById("emoji");
//
originalEmo.addEventListener("click", function () {
  EmojiId.style.opacity = 1;
});

/*III_Random Emoji*/

getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}; //getting radom int between 1 and 2

/***/
//i retreive a number between 0 and 2
let emojiIndex = getRandomInt(3);
//i retreive all the emoji
const randomEmoji = document.querySelector("#appearEmo").children;

console.log("eee", randomEmoji);

/***/
//request to the DOM of the html element where emo is pushed
let htmlRandomeEmo = document.querySelector("#randomEmoAppear");
// let gg = document.querySelector("#randomEmoAppearsss"); //element where the is hover event
//
//random emo between 1 an 2 index
let em = randomEmoji[emojiIndex].textContent;
let re = randomEmoji[emojiIndex];
let emTest = document.querySelector("#randomEm");
//random emo where my mouse is on
console.log("random emo", em);

/***/
// function myScript(htmlRandomeEmo) {
//   //i insert a random number in the emoji index
//   htmlRandomeEmo.innerHTML = randomEmoji[emojiIndex].textContent;
// }
/***/
emTest.addEventListener("mouseover", function () {
  // myScript(htmlRandomeEmo);
  emTest.textContent = em;
  ///
  // reset the color after a short delay

  ///
});
/***/
