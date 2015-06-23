'use strict';

var muteUnmute = function(){
  if(localStorage.getItem('muted')){
    document.querySelector('#disable_it').innerHTML = "Mute";
    localStorage.removeItem('muted');
  }
  else {
    document.querySelector('#disable_it').innerHTML = "Unmute";
    localStorage.setItem('muted', 1);
  }
};

muteUnmute();

document.querySelector('#disable_it').addEventListener('click', function () {
    muteUnmute();
});