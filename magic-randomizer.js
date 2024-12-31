// ==UserScript==
// @name         CF Magic Randomizer
// @namespace    http://tampermonkey.net/
// @version      2023-12-27
// @description  script to remove sensitive info
// @author       aryanc403
// @homepage     aryanc403.com
// @match        https://codeforces.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=codeforces.com
// @run-at       document-start
// @grant        none
// ==/UserScript==

const userColorsCache = {};

const colorData = [
    {
        color:"user-4000",
        enTitle:"Tourist",
        ruTitle:"Tourist",
        precentCutoff:9,
    },
    {
        color:"user-legendary",
        enTitle:"Legendary Grandmaster",
        ruTitle:"Легендарный гроссмейстер",
        precentCutoff:18,
    },
    {
        color:"user-red",
        enTitle:"International Grandmaster",
        ruTitle:"Международный гроссмейстер",
        precentCutoff:27,
    },
    {
        color:"user-red",
        enTitle:"Grandmaster",
        ruTitle:"Гроссмейстер",
        precentCutoff:36,
    },
    {
        color:"user-orange",
        enTitle:"International master",
        ruTitle:"Международный мастер",
        precentCutoff:45,
    },
    {
        color:"user-orange",
        enTitle:"Master",
        ruTitle:"Мастер",
        precentCutoff:54,
    },
    {
        color:"user-violet",
        enTitle:"Candidate Master",
        ruTitle:"Кандидат в мастера",
        precentCutoff:63,
    },
    {
        color:"user-blue",
        enTitle:"Expert",
        ruTitle:"Эксперт",
        precentCutoff:72,
    },
    {
        color:"user-cyan",
        enTitle:"Specialist",
        ruTitle:"Специалист",
        precentCutoff:82,
    },
    {
        color:"user-green",
        enTitle:"Pupil",
        ruTitle:"Ученик",
        precentCutoff:91,
    },
    {
        color:"user-gray",
        enTitle:"Newbie",
        ruTitle:"Новичок",
        precentCutoff:100,
    },
]

var _cfLocaleGlobal = false;

function makeNotLegendary(user) {
    if (user.childNodes.length > 1) {
        user.childNodes[1].textContent = user.childNodes[0].textContent + user.childNodes[1].textContent;
        user.removeChild(user.childNodes[0]);
    }
}

function makeTourist(user) {
    if (user.childNodes.length == 1) {
        var span = document.createElement('span');
        span.classList.add("user-4000-first-letter");
        span.textContent = user.firstChild.textContent[0];
        user.firstChild.textContent = user.firstChild.textContent.slice(1);
        user.insertBefore(span, user.firstChild);
    }
}

function makeLegendary(user) {
    if (user.childNodes.length == 1) {
        var span = document.createElement('span');
        span.classList.add("legendary-user-first-letter");
        span.textContent = user.firstChild.textContent[0];
        user.firstChild.textContent = user.firstChild.textContent.slice(1);
        user.insertBefore(span, user.firstChild);
    }
}

const getRandomColor = () => {
    const percentIdx = Math.floor(Math.random() * 100);
    console.log('percentIdx',percentIdx);
    for(let idx=0;idx<colorData.length;idx++){
        if(percentIdx<colorData[idx].precentCutoff){
           return colorData[idx];
        }
    }
    return colorData[0];
}

const getColor = (username) => {
    if(!(username in userColorsCache)){
        userColorsCache[username]=getRandomColor();
    }
    return userColorsCache[username];
};

const updateColor = (user,newColor) => {
    if(newColor==="user-4000"){
       makeTourist(user);
     } else if(newColor==="user-legendary"){
         makeLegendary(user);
     } else {
         makeNotLegendary(user);
     }
}

const fixUser = (user) => {
    const username = user.attributes["href"].textContent.slice(9);
    const newColor = getColor(username);

    var currentColor = "";
    user.classList.forEach(function(title) {
            if (!title.startsWith("user-")) {
                return;
            }
            currentColor = title;
        });
    user.classList.replace(currentColor, newColor.color);
    user.title = (_cfLocaleGlobal ? newColor.enTitle : newColor.ruTitle) + " " + user.textContent;
    updateColor(user,newColor);
    return user;
}

const populateUsernamesPermutation = (users) => {

}

const randomizeMagic = () => {
    const CFLocale = (document.getElementsByClassName("menu-list-container")[0].children[0].children[0].textContent == "Home");
    _cfLocaleGlobal = CFLocale
    var users = document.getElementsByClassName('rated-user');
    for (var i = 0; i < users.length; ++i) {
        users[i]=fixUser(users[i]);
    }
}

(function() {
    'use strict'
    window.addEventListener("load", function() {randomizeMagic()});
})();