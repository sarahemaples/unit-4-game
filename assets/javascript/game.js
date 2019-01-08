// console.log('linked');

$(document).ready(function() 
{
	// console.log("loaded");

// constructor
function Character(firstName, health, attackPower, counterPower, srcImg)
{
    this.name = firstName;
    this.hp = health;
    this.attack = attackPower;
    this.counterAttack = counterPower;
    this.pic = srcImg;

}
// creating the characters we will use
var buffy = new Character("Buffy", 150, 10, 15, "assets/images/buffy.png");
var willow = new Character("Willow", 140, 15, 10, "assets/images/darkWillow.png");
var giles = new Character("Giles", 170, 4, 10, "assets/images/giles.jpg");
var spike = new Character("Spike", 100, 12, 12, "assets/images/spike.jpg");

//console.log(buffy.attack);
// i put all the players in an array so it is easier to acces them
var players = [buffy, willow, giles, spike];

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
    charCard.append('<br>'+players[i].hp);
    //<button class="characterCards cardButton" id=players[i].name>players[i].name<br>
    //<img src="players[i].pic">
    //<br>players[i].hp</button>
    $("#allCharacters").append(charCard);
    //charCard apperars on the allCharacters div
}

//on click stuff!

var defender;
//this is a function that allows you to choose your player:
function pickPlayer(){
    alert('pick your player!');
    $(".cardButton").on('click', function()
    {
        $("#yourCharacter").append($(this));
        $(this).addClass('mainCharacter');
        return $(this);
    });
}

var mainChar = pickPlayer();
console.log(mainChar);
//console.log('your character still is: '+mainChar);

});

