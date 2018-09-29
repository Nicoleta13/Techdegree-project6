    let missed  = 0;
    const overlay = document.querySelector('#overlay');
    const keyboard = document.getElementById('qwerty');
    const startButton = document.querySelector('.btn__reset');
    const ul = document.querySelector('#phrase ul');
    const letters = document.getElementsByClassName('letter');
    const lives = document.querySelectorAll('.tries img');
    const show = document.querySelectorAll('.show');
    const title = document.querySelector('.title');
    const keyrow = document.querySelectorAll('.keyrow button');

    const phrases = [
      "start somewhere",
      "never give up",
      "work hard",
      "have fun",
      "smile more"
    ];

        //hide the start screen overlay.
    startButton.addEventListener('click', () => {
      overlay.style.display = 'none';
    });

        //choose a phrase and split it into a new array of characters
    function getRandomPhraseAsArray(arr) {
      const phrase = phrases[(Math.random()*phrases.length)|0];
      const characters = phrase.split('');
      return characters;
    }

        //create new list items of characters
    function addPhraseToDisplay (arr) {
      for(let i = 0; i <arr.length; i += 1) {
        const listItem = document.createElement('li');
        let character = arr[i];
        listItem.textContent = character;

        if (character === ' ' ) {
          listItem.className = 'space';
        } else {
          listItem.className = 'letter';
        }
        ul.appendChild(listItem);
      }
    }
        //call the above functions
    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
    console.log(phraseArray);

        //check if the letter from the phrase match the one from the button clicked
    function checkLetter(button) {
      let matched = null;
      const buttonClicked = button.target;
      for(let i = 0; i < letters.length; i += 1) {
        if (buttonClicked.textContent === letters[i].textContent) {
          letters[i].className = 'show';
          const letterMatched = letters[i];
          matched = true;
        }
      }
      return matched;
    }
      //change the overlay screen and propreties if the user wn or lost the game
    function checkWin() {
      if(show.length === letters.length) {
        overlay.style.display = 'flex';
        overlay.className = 'win';
        title.textContent = 'You won the game!!';
        startButton.textContent = 'Play again';
      }
      if (missed === 5) {
        overlay.style.display = 'flex';
        overlay.className = 'lose';
        title.textContent = 'Game over!!';
        startButton.textContent = 'Play again';
      }
    }


    keyboard.addEventListener('click', (e) => {
        //disable the chosen buttons
      if (e.target.tagName === 'BUTTON') {
        e.target.className = 'chosen';
        e.target.disabled = true;

        const letterFound =  checkLetter(e);

          //Count the missed guesses in the game.
        if (letterFound === null) {
          let lifeLost = missed;
          lives[lifeLost].setAttribute('src', 'images/lostHeart.png' );
          missed += 1;
        }
      }
      checkWin();
    });

      //EXTRA CREDIT
    startButton.addEventListener('click', (e) => {
      if(e.target.textContent === 'Play again') {

          //set the number of misses to zero
        missed = 0;

        //reset the listItem
        ul.innerHTML = '';

          //recreate the buttons in the keyboard
        for (let i=0; i < keyrow.length; i += 1) {
        keyrow[i].className = "";
        keyrow[i].disabled = false;
        }

          //reset the lives
        for(let i = 0; i < lives.length; i += 1 ){
        lives[i].src = 'images/liveHeart.png';
        }

          //generate a new random phrase
        const phraseArray = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(phraseArray);

        console.log(missed);
        console.log(phraseArray);
      }
    });
