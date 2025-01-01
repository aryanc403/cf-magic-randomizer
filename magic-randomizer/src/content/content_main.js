import * as settings from '../util/settings.js';

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

const getColors = async () => {
    const ratingDistribution = await settings.ratingDistribution()
    return [
        {
            color:"user-4000",
            enTitle:"Tourist",
            ruTitle:"Tourist",
            precentCutoff:parseFloat(ratingDistribution.touristPercent),
        },
        {
            color:"user-legendary",
            enTitle:"Legendary Grandmaster",
            ruTitle:"Легендарный гроссмейстер",
            precentCutoff:parseFloat(ratingDistribution.lgmPercent),
        },
        {
            color:"user-red",
            enTitle:"International Grandmaster",
            ruTitle:"Международный гроссмейстер",
            precentCutoff:parseFloat(ratingDistribution.igmPercent),
        },
        {
            color:"user-red",
            enTitle:"Grandmaster",
            ruTitle:"Гроссмейстер",
            precentCutoff:parseFloat(ratingDistribution.gmPercent),
        },
        {
            color:"user-orange",
            enTitle:"International master",
            ruTitle:"Международный мастер",
            precentCutoff:parseFloat(ratingDistribution.imPercent),
        },
        {
            color:"user-orange",
            enTitle:"Master",
            ruTitle:"Мастер",
            precentCutoff:parseFloat(ratingDistribution.masterPercent),
        },
        {
            color:"user-violet",
            enTitle:"Candidate Master",
            ruTitle:"Кандидат в мастера",
            precentCutoff:parseFloat(ratingDistribution.cmPercent),
        },
        {
            color:"user-blue",
            enTitle:"Expert",
            ruTitle:"Эксперт",
            precentCutoff:parseFloat(ratingDistribution.expertPercent),
        },
        {
            color:"user-cyan",
            enTitle:"Specialist",
            ruTitle:"Специалист",
            precentCutoff:parseFloat(ratingDistribution.specialistPercent),
        },
        {
            color:"user-green",
            enTitle:"Pupil",
            ruTitle:"Ученик",
            precentCutoff:parseFloat(ratingDistribution.pupilPercent),
        },
        {
            color:"user-gray",
            enTitle:"Newbie",
            ruTitle:"Новичок",
            precentCutoff:parseFloat(ratingDistribution.newbiePercent),
        },
    ]
}

const getRandomColor = async () => {
    const colorData = await getColors();
    var totalPercent = 1;
    for(let idx=0;idx<colorData.length;idx++){
        totalPercent+=colorData[idx].precentCutoff;
    }
    var percentIdx = Math.floor(Math.random() * totalPercent);
    for(let idx=0;idx<colorData.length;idx++){
        percentIdx-=colorData[idx].precentCutoff;
        if(percentIdx<=0){
            return colorData[idx];
        }
    }
    return colorData[0];
}

const updateColor = (user,newColor) => {
    if(newColor==="user-4000"){
       makeTourist(user);
     } else if(newColor==="user-legendary"){
         makeLegendary(user);
     } else {
         makeNotLegendary(user);
     }
}

const getUsername = (user) => {
    return user.attributes["href"].textContent.slice(9);
}

function shuffleArray(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

class RandomizeMagic {
    constructor() {
        this.users = document.getElementsByClassName('rated-user');
        this.userColorsCache = {};
        this.isGlobalLocale = document.getElementsByClassName("menu-list-container")[0].children[0].children[0].textContent == "Home"
        this.newUsernameCache = {};
    }

    populateUsernamesPermutation() {
        const users = this.users;
        var usernamesDictionary = {};
        for (let i = 0; i < users.length; ++i) {
            usernamesDictionary[getUsername(users[i])]=1;
        }
        const usernames = Object.keys(usernamesDictionary);
        var shuffledUsernames = Object.keys(usernamesDictionary);
        shuffleArray(shuffledUsernames);
        var newUsernameCacheLocal = {}
        for (let i = 0; i < usernames.length; ++i) {
            newUsernameCacheLocal[usernames[i]]=shuffledUsernames[i];
        }
        this.newUsernameCache=newUsernameCacheLocal;
    }

    async populateUserColors() {
        const users = this.users;
        var usernamesDictionary = {};
        for (let i = 0; i < users.length; ++i) {
            usernamesDictionary[getUsername(users[i])]=1;
        }
        const usernames = Object.keys(usernamesDictionary);
        var newUserColorsCacheLocal = {}
        for (let i = 0; i < usernames.length; ++i) {
            newUserColorsCacheLocal[usernames[i]]=await getRandomColor();
        }
        this.userColorsCache=newUserColorsCacheLocal;
    }

    async updateUser(user) {
        const username = getUsername(user);
        const newUsername = (username in this.newUsernameCache?this.newUsernameCache[username]:username);
        const newColor = this.userColorsCache[username];
        var currentColor = "";
        user.classList.forEach(function(title) {
            if (!title.startsWith("user-")) {
                return;
            }
            currentColor = title;
        });
        user.classList.replace(currentColor, newColor.color);
        user.title = (this.isGlobalLocale ? newColor.enTitle : newColor.ruTitle) + " " + user.textContent;
        updateColor(user,newColor);
        if (newUsername !== username) {
            user["href"]="/profile/"+newUsername;
            user.textContent=newUsername;
        }
    }

    updateUsers() {
        for (let i = 0; i < this.users.length; ++i) {
            this.updateUser(this.users[i]);
        }
    }

    async run() {
        if(await settings.enableShuffleUsernames()){
            this.populateUsernamesPermutation()
        }
        await this.populateUserColors();
        this.updateUsers();
    }
}

export const main = async () => {
    const r = new RandomizeMagic()
    await r.run();
}
