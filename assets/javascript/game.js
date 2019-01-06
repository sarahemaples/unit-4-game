//<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

function Character(firstName, health, attackPower, counterPower, srcImg){
    this.name = firstName;
    this.hp = health;
    this.attack = attackPower;
    this.counterAttack = counterPower;
    this.pic = srcImg;
}

var buffy = new Character("Buffy", 150, 10, 15, "../images/buffy.png");
//console.log(buffy.attack);

// this is me attempting to create a card then add it to the html
var buffyCard = $()
