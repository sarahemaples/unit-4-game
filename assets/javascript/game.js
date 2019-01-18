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
//here i will declare all variables: 
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
    var count, charCard, cardImg, divId, defDivId, cardId, mainDivId = null;
    var mainChar = '';
    var defender='';
    //here is a lil boolean so i dont keep overriding the main
    //once another card is clicked
    var secondChoice = false;
    //another boolean for the attack button
    var firstAttack = true;

    $("#restartBtn").hide();


function newGame(){

//resetting variables
    cardsOnScreen = [];
    count, charCard, cardImg, divId, defDivId, cardId, mainDivId = null;
    mainChar = '';
    defender='';
    //here is a lil boolean so i dont keep overriding the main
    //once another card is clicked
    secondChoice = false;
    //another boolean for the attack button
    firstAttack = true;

    //resetting everyone's attack and hp back to their original values
    buffy.hp = 150;
    buffy.attack = 10;

    willow.hp = 140;
    willow.attack = 15;

    giles.hp = 170;
    giles.attack = 4;

    spike.hp = 100;
    spike.attack = 12;

    //resetting the screen
    $("#yourCharacter").text("Your Character:")
    $("#yourCharacter").append("<br>");
    $("#yourCharacter").prepend("<br>");

    $("#enemiesAvailable").text("Enemies Available to Attack");
    $("#enemiesAvailable").append("<br>");
    $("#enemiesAvailable").prepend("<br>");

    $("#defender").text("Defender");
    $("#defender").append("<br>");
    $("#defender").prepend("<br>");

    $("#youAttacked").text('');
    $("#theyAttacked").text('');

    $("#restartBtn").hide();
    // $("#allCharacters").empty();
    $("#allCharacters").show();
    console.log('new game function executed');

    createCards();
}

// //reset cards function that resets hp values displayed
// function resetCards(){
//     console.log(cardsOnScreen);
//     // console.log("reset Cards fcn called"); 
//     // console.log(cardsOnScreen.length); 
//     for (var a = 0; a<cardsOnScreen.length; a++){
//         $("#"+players[a].name+"HP").text(players[a].hp);
//         console.log(a+": "+cardsOnScreen[a].valueOf());
//         $("#allCharacters").append(cardsOnScreen[a].valueOf());
//     }
// }


//this function creates all the cards and appends them to the 
//allCharacters div when the page loads
function createCards(){
    for (var i=0; i<players.length; i++)
    {
        console.log(players[i]);
        charCard = $("<div>");
        //<button></button>
        charCard.addClass("characterCards");
        //<button class="characterCards"></button>
        charCard.attr('id', players[i].name);
        //<button class="characterCards" id=players[i].name></button>
        charCard.append(players[i].name+'<br>');
        //<button class="characterCards" id=players[i].name>players[i].name<br></button>
        
        cardImg = $("<img />");
        //<img>
        cardImg.attr('src', players[i].pic);
        //<img src="players[i].pic">
        charCard.append(cardImg)
        //<button class="characterCards" id=players[i].name>players[i].name<br>
        //<img src="players[i].pic"></button>
        divId = players[i].name+"HP";
        charCard.append('<div id='+divId+'>'+players[i].hp);
        //<button class="characterCards" id=players[i].name>players[i].name<br>
        //<img src="players[i].pic">
        //<br>players[i].hp</button>
        $("#allCharacters").append(charCard);
        cardsOnScreen.push(charCard);
        //charCard apperars on the allCharacters div
    }
    count = cardsOnScreen.length;
    console.log(cardsOnScreen);
}
createCards();


//this is a function that allows you to choose your player:
function pickPlayer(x){
    // console.log(cardsOnScreen);
    if (secondChoice === false){
        mainChar = x.id;
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
            console.log('adding enemies');
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
    $("#youAttacked").text("You attacked "+de.name+" for "+mc.attack+" damage!");
    console.log(de.name+" new hp: "+de.hp);
    //update display
    defDivId = '#'+de.name+'HP';
    $(defDivId).text(de.hp);
    //if the defender is defeated we hide their card and prompt player
    //to pick a new defender
    if (de.hp <= 0){
        cardId = "#"+de.name;
        $(cardId).hide();
        firstAttack = true;
        $("#theyAttacked").text("Pick new defender");
        // alert('you have defeated '+ de.name+'! Pick a new defender');
        count--;
        console.log("count: "+count);
        if (count == 1){
            if (de.hp <= 0){
                $("#theyAttacked").empty();
                $("#youAttacked").text("You defeated all enemies!")
                $("#restartBtn").show();
                console.log(cardsOnScreen);
            }
        }
    }

//next we need to subtract the defend attack from main hp
    //and if we kill defender they dont attack main
    if (de.hp > 0){
        mc.hp = mc.hp - de.counterAttack;
        mainDivId = '#'+mc.name+'HP';
        $("#theyAttacked").text(de.name+" attacked you for "+de.counterAttack+" damage!");
        $(mainDivId).text(mc.hp);
        if (mc.hp <= 0){
            $("#yourCharacter").text("Your Character:");
            $("#theyAttacked").empty();
            $("#youAttacked").text(de.name+" defeated you!")
            $("#restartBtn").show();
        }
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
$("#allCharacters, #enemiesAvailable").on("click", ".characterCards",  function(e){
    console.log('clicked!');
    console.log(e);
    pickPlayer(e.currentTarget);
});

//on click for the attack button that calls the attack function
$("#attackBtn").on("click", function(e){
    getPlayerInfo(mainChar, defender);
});

//on click for the restart btn
$("#restart").on("click", function (){
    newGame();
    console.log('restart btn clicked');
})

});

