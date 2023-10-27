const sequence = [68, 68, 74];
const sequence2 = [68, 68, 74, 71, 71, 65];
const sequence3 = [68, 74, 83, 70, 65, 76, 71];
const playerSequence = [];

let currentLevel = 1; // Track the current level

const soundMapping = {
    65: 'clap',
    83: 'hihat',
    68: 'kick',
    70: 'openhat',
    71: 'boom',
    72: 'ride',
    74: 'snare',
    75: 'tom',
    76: 'tink',
};

const images = ["lebron.jpg", "steph.png", "magic.jpg", "michael.jpg"];
const quotes = ["To be the best, you have to work the hardest. You have to chase what seems impossible over and over and over again, because giving up is not an option, and when you feel like you've reached your limit, it's only the beginning, that's when it's time to dig deep, to find the courage to push some more", "If you don't fall how are you going to know what getting up is like", "You don’t have to be Magic to be special. You’re already special, you’re you", "I've failed over and over and over again in my life. And that is why I succeed"];

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.style.display = 'none';
  }
  
  // An array to store all the media elements you want to preload.
  const mediaToPreload = [
    'bg.jpg',
    'lvl1.mp3',
    'lvl2.mp3',
    'lvl3.mp3',
    // Add other media assets you want to preload here.
  ];
  
  // Variable to keep track of loaded media.
  let mediaLoaded = 0;
  
  // Function to preload media.
  function preloadMedia(src) {
    const media = new Image();
    media.onload = mediaLoadedHandler;
    media.src = src;
  }
  
  // Function to handle loaded media.
  function mediaLoadedHandler() {
    mediaLoaded++;
    if (mediaLoaded === mediaToPreload.length) {
      // All media is loaded.
      hideLoadingScreen();
    }
  }
  
  // Preload all media.
  mediaToPreload.forEach(preloadMedia);
  
function getSoundFromDataKey(dataKey) {
    return soundMapping[dataKey];
}

const sequenceDisplay = document.getElementById('sequenceDisplay');
function updateSequenceDisplay() {
    sequenceDisplay.textContent = '';
    const soundSequence = playerSequence.map(dataKey => getSoundFromDataKey(dataKey)).join(', ');
    sequenceDisplay.textContent += soundSequence;
}



function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);

    if (!audio) return;

    // Add the key code to the player's sequence
    playerSequence.push(e.keyCode);

    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();

    updateSequenceDisplay();

    // Check if the player's sequence matches the predefined sequence
    checkSequence();
}

function checkSequence() {
    let currentSequence;

    // Determine the current sequence based on the current level
    switch (currentLevel) {
        case 1:
            currentSequence = sequence;
            break;
        case 2:
            currentSequence = sequence2;
            break;
        case 3:
            currentSequence = sequence3;
            break;
    }

    if (playerSequence.join(',') === currentSequence.join(',')) {
        // Display modal message for each level
        const modal = document.getElementById('myModal');
        const modalMessage = document.getElementById('modal-message');

        modal.style.display = 'block';
        modalMessage.textContent = `Level ${currentLevel} completed! Here's a small message!`;
        if(currentLevel == 1){
            let div = document.createElement("div");
            div.id = "letter";
            modalMessage.appendChild(div);
            let heading = document.createElement("h3");
            heading.innerHTML = "First up: A letter";
            let el = document.createElement("p");
            el.innerHTML = "Hey you! Sorry I could just come up with this, thoda messy h, kaam chala le! I never thought that we would be where we are right now when we first started talking. But here we are, aren't we? That first day I met you in Jaipur, I knew that you were going to my close friend, very dear to me and part of my inner circle. You know, I never allow people into my safe space, it's a coping mechanism for me. Darr bhi kafi lagta h, you know. I never really learned to trust people. But there are a rare few jinki wajahse I don't find people that horrible too. One of those people is you. You are this amazing, understanding, talented ray of sunshine with two bottles of moonlight that it becomes so unreal for me to even believe that I met you. I am grateful for everything you have done for me, for everything you do, for being there and for your existence! We might be different, we might deal differently but I know that we are for life and primarily, I know that you are meant to shine, prosper and create a difference, which you will. And I will try my best to extend support. I love you. Happy birthday, Janejahan!";
            div.appendChild(heading);
            div.appendChild(el);
        }else if(currentLevel == 2){
            let div = document.createElement("div");
            div.id = "affirm";
            modalMessage.appendChild(div);
            let p = document.createElement("p");
            p.innerHTML = "Because you don't listen to me";
            modalMessage.appendChild(p);
            for(let i = 0; i < 4; i++){
                let div2 = document.createElement("div");
                div2.class = "messageBox";
                let img = document.createElement("img");
                img.src = images[i];
                img.class = "imagePlayer";
                let p = document.createElement("p");
                p.innerHTML = quotes[i];
                p.class = "playerQuote";
                div2.appendChild(img);
                div2.appendChild(p);
                div.appendChild(div2);
            }
        }

        // Move to the next level or end the game after level 3
        if (currentLevel < 3) {
            currentLevel++;
        } else {
            modalMessage.textContent = 'Congratulations! You completed all levels!';
            let div = document.createElement("div");
            div.id = "endGameContent";
            let img = document.createElement("img");
            img.src = "Archive.png";
            let link = document.createElement("a");
            link.id = "wish";
            link.href = "animation.html";
            link.target = "_blank";
            link.innerHTML = "Click Here!";
            div.appendChild(img);
            div.appendChild(link);
            modalMessage.appendChild(div);
        }

        playerSequence.length = 0; // Reset the player's sequence

        // Close the modal when the user clicks the "X" button
        const closeButton = document.querySelector('.close');
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
}


const resetButton = document.getElementById('resetButton');

resetButton.addEventListener('click', () => {
    playerSequence.length = 0; // Reset the player's sequence
    sequenceDisplay.textContent = '';
});


const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);
