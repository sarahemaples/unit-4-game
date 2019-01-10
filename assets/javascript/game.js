// console.log('linked');

$(document).ready(function() 
{
	// console.log("loaded");

// constructor
function Character(firstName, health, attackPower, counterPower, srcImg, updatedAttack)
{
    this.name = firstName;
    this.hp = health;
    this.ogAttack = attackPower;
    this.counterAttack = counterPower;
    this.pic = srcImg;
    this.attack = updatedAttack;
}
// creating the characters we will use
var buffy = new Character("Buffy", 150, 10, 15, "assets/images/buffy.png", 10);
var willow = new Character("Willow", 140, 15, 10, "assets/images/darkWillow.png", 15);
var giles = new Character("Giles", 170, 4, 10, "assets/images/giles.jpg", 4);
var spike = new Character("Spike", 100, 12, 12, "assets/images/spike.jpg", 12);

//console.log(buffy.attack);
// i put all the players in an array so it is easier to acces them
var players = [buffy, willow, giles, spike];

// this is an array that will hold the cards for each char
var cardsOnScreen = [];

// this is me attempting to create a card then add it to the html
// var buffyCard = $("<div>");

// buffyCard.addClass("characterCards");
// buffyCard.text(buffy.name);

// var buffyCardImg = $("<img />");
// buffyCardImg.attr('src', buffy.pic);
// buffyCard.append('<br>');
// buffyCard.append(buffyCardImg);
// buffyCard.append('<br>');
// buffyCard.append(buffy.hp);

// $("#allCharacters").append(buffyCard);

// okay now that I hardcoded that shit lets try to make a loop 
// for the rest

//this function creates all the cards and appends them to the 
//allCharacters div when the page loads
function createCards(){
    for (var i=0; i<players.length; i++)
    {
        console.log(players[i]);
        var charCard = $("<button>");
        //<button></button>
        charCard.addClass("characterCards cardButton");
        //<button class="characterCards cardButton"></button>
        charCard.attr('id', players[i].name);
        //<button class="characterCards cardButton" id=players[i].name></button>
        charCard.append(players[i].name+'<br>');
        //<button class="characterCards cardButton" id=players[i].name>players[i].name<br></button>
        
        var cardImg = $("<img />");
        //<img>
        cardImg.attr('src', players[i].pic);
        //<img src="players[i].pic">
        charCard.append(cardImg)
        //<button class="characterCards cardButton" id=players[i].name>players[i].name<br>
        //<img src="players[i].pic"></button>
        var divId = players[i].name+"HP";
        charCard.append('<div id='+divId+'>'+players[i].hp);
        //<button class="characterCards cardButton" id=players[i].name>players[i].name<br>
        //<img src="players[i].pic">
        //<br>players[i].hp</button>
        $("#allCharacters").append(charCard);
        cardsOnScreen.push(charCard);
        //charCard apperars on the allCharacters div
    }
}
createCards();

//on click stuff!
// similar to our jquery calculator
// first i will initialize each variable as an empty string

var mainChar = '';
var defender='';
//here is a lil boolean so i dont keep overriding the main
//once another card is clicked
var secondChoice = false;
//another boolean for the attack button
var firstAttack = true;

//this is a function that allows you to choose your player:
function pickPlayer(x){
    // console.log(cardsOnScreen);
    if (secondChoice === false){
        mainChar = mainChar + x.id;
        console.log(mainChar);
        //add card to yourCharacter div
        $("#allCharacters").hide();
        $("#yourCharacter").height(200);
        $("#yourCharacter").append(x);

        //call function to move other cards
        moveEnemyCards(mainChar);
        secondChoice = true;
    } else {
        defender = x.id;
        console.log(defender);
        $("#defender").height(200);
        $("#defender").append(x);
    }
}

// this function is executed once the player picks their
// main character. it moves all other cards to the 'enemies 
// available' div
function moveEnemyCards(mc){
    $("#enemiesAvailable").height(200);
    for (var j = 0; j < cardsOnScreen.length; j++){
        // console.log(j+": "+cardsOnScreen[j].attr('id'));
        if (!(cardsOnScreen[j].attr('id') == mc)){
            $("#enemiesAvailable").append(cardsOnScreen[j]);
        }
    }
}

//this function is called when the attack button is clicked
//if it is the first attack for this char, it will save all the
// data we need then call attack() else it just calls attack()
function getPlayerInfo(mc, de){
    if (firstAttack){
        // console.log("main: "+mc.toLowerCase());
        // console.log("defender: "+de.toLowerCase());
    //first i want to grab the actual objects and not the cards
        for (var k=0; k<players.length; k++){
            if (players[k].name == mc){
                mainChar = players[k];
                // console.log(mc + " found at index: "+k);
                console.log(mainChar);
            }
            if (players[k].name == de){
                defender = players[k];
                console.log(defender);
            }
        }
        attack(mainChar, defender);
        firstAttack = false;
    } else {
        attack(mainChar, defender);
    }
}

//i guess i have no other choice but to begin on the attack function
function attack(mc, de){
//now i am going to need to update the players hp
    console.log(mc.name+" attack: "+mc.attack);
    console.log(de.name+" counter attack: "+de.counterAttack);

//FIRST we need to subtract the main attack from the defender hp
    de.hp = de.hp - mc.attack;
    console.log(de.name+" new hp: "+de.hp);
    //update display
    var defDivId = '#'+de.name+'HP';
    $(defDivId).text(de.hp);
    //if the defender is defeated we hide their card and prompt player
    //to pick a new defender
    if (de.hp <= 0){
        var cardId = "#"+de.name;
        $(cardId).hide();
        firstAttack = true;
        alert('you have defeated '+ de.name+'! Pick a new defender');
    }

//next we need to subtract the defend attack from main hp
    //and if we kill defender they dont attack main
    if (de.hp > 0){
        mc.hp = mc.hp - de.counterAttack;
        var mainDivId = '#'+mc.name+'HP';
        $(mainDivId).text(mc.hp);
    }
    console.log(mc.name+" new hp: "+mc.hp);
    //call the function to update our main characters attack
    updateMainCharAttack(mc);
}

function updateMainCharAttack(mc){
    console.log("main attack: "+mc.attack);
    mc.attack += mc.ogAttack;
    console.log("original attack: "+mc.ogAttack);
    console.log("updated attack: "+mc.attack);
}

//on click function which calls the pickPlayer
$(".characterCards").on("click", function(e){
    pickPlayer(this);
    // console.log(this);
});

//on click for the attack button that calls the attack function
$("#attackBtn").on("click", function(e){
    getPlayerInfo(mainChar, defender);
});

});

