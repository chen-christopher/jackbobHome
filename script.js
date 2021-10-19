//variables
let switchStatus = false;
let counter = 0; //keep track of which div we're on
let maxNum = 5; //total number of divs, to make sure we don't exceed
let playable = true; //boolean to see if animation for on/off is playing

//getting reference to elements
let playButton = document.querySelector(".playButton");
let jackbobImg = document.getElementById("jackbobImg");
let powerButton = document.getElementById("powerButton");
let leftButton = document.getElementById("leftButton");
let rightButton = document.getElementById("rightButton");
let jackbobStory = document.querySelector(".jackbobCanvas");
let jackbobChannel = document.querySelector(".channelSwitch");

//power button to turn on tv
powerButton.addEventListener("click", function () {
  if (playable) {
    //check boolean, if it is currently playable (no animation playing) we run the code
    console.log("hello");
    if (switchStatus == false) {
      //if turned off, we turn it on
      jackbobImg.src = "./images/Turn_On.gif";
      switchStatus = true; //change to turned on
      if (counter != 0 && counter != maxNum - 1) {
        //to make sure the play button is hidden
        playButton.classList.remove("empty");
      }
    } else if (switchStatus == true) {
      //else turn off
      jackbobImg.src = "./images/Turn_Off.gif";
      playButton.classList.add("empty");
      switchStatus = false;
    }
    playable = false;
  }
  //to ensure the gif finishes playing
  setTimeout(() => {
    console.log("playing");
    playable = true;
  }, 600);
});

//left button to change channel (decrement)
leftButton.addEventListener("click", function () {
  if (switchStatus) {
    //if turned on check the counter (since if u press - at 0, it'll go to negative)
    if (counter == 0) {
      //edge case where I change it back to the last element instead to loop
      counter = maxNum - 1;
      changeChannel(counter, 0); //function to change channel
    } else {
      let prevNum = counter; //just normally decrement and % by maxNum so we loop
      counter = (counter - 1) % maxNum;
      console.log(counter);
      changeChannel(counter, prevNum);
    }
  }
});
//same as above
rightButton.addEventListener("click", function () {
  if (switchStatus) {
    let prevNum = counter;
    counter = (counter + 1) % maxNum;
    console.log(counter);
    changeChannel(counter, prevNum);
  }
});
//changes channel by turning all children of the jackbobCanvas div to display none then removing that class
//on the one that is currently playing (kept track by counter)
function changeChannel(channelNum, prevNum) {
  for (let i = 0; i < jackbobStory.children.length; i++) {
    jackbobStory.children[i].classList.add("empty");
  }
  playButton.classList.add("empty");
  jackbobChannel.classList.remove("empty");
  jackbobStory.children[counter].classList.remove("empty");

  //this is to play the switch channel animation
  setTimeout(() => {
    jackbobChannel.classList.add("empty");
    // jackbobStory.children[counter].classList.remove("empty");
    if (counter != 0 && counter != maxNum - 1) {
      if (counter > 1) {
        playButton.classList.add("airingSoon");
      } else {
        playButton.classList.remove("airingSoon");
      }
      playButton.classList.remove("empty");
    }
  }, 300);
  // jackbobStory.children[counter].classList.remove("empty");
}

//to open the comic
playButton.addEventListener("click", function () {
  if (counter == 1) {
    window.open("https://chen-christopher.github.io/jackbob", "_blank");
  }
});
