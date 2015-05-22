var card_amount = 16;
var deck;
var active_cards;
var zaehler = 0;
var count = 0;
var score;

$(document).ready(function (){
    $('#control button').click(placeCards);
    //if(count == card_amount/2-1 && active_cards.length == 2){
    
    $('#again').click(again);
    
    $('#exit').click(exit);
    
    $('#table').on('click', '.card', function (){
        
        turnoverCard($(this).index());
                
    });
});

function placeCards() {
    reset();
    for (var i = 0; i < card_amount; i++) {
        //document.getElementById('table').innerHTML += '<div class="card" onclick="turnoverCard(' + i + ')"></div>';
        $('#table').append('<div class="card" />');
    }
    generateDeck();
}

function generateDeck() {

    for (var i = 1; i <= card_amount / 2; i++) {
        var paar = 0;

        while (paar < 2) {
            var random_no = random(0, card_amount - 1);

            if (deck[random_no] == null) {
                deck[random_no] = i;
                paar++;
            }

        }

    }

//console.log(deck+'  '+ paar);
}

function turnoverCard(position) {
    score = 0;
    if (active_cards.length < 3) {
        if (active_cards.length == 0) {
            active_cards.push(position);
        }
        else if (active_cards.length == 1) {
            if (active_cards[0] != position) {
                active_cards.push(position);
            }
        }
        else if (active_cards.length == 2) {
            if (active_cards[0] != position && active_cards[1] != position) {
                active_cards.push(position);
            }
        }
        var x = (deck[position] % 4) * 100;
        var y = parseInt(deck[position] / 4) * 100;

        //document.getElementsByClassName('card')[position].style.backgroundPosition = '-' + x + 'px -' + y + 'px';
        $('.card').eq(position).css('background-position', '-' + x + 'px -' + y + 'px');
        memory();
    }
    if (active_cards.length == 3) {
        matchCards();
   }  
   else if(count == card_amount/2-1 && active_cards.length == 2){
        setTimeout(showWinbox, 2000);
        
        console.log(score+' | '+zaehler);
    }
   }



function showWinbox(){
    /*if(score >= zaehler){
            
        score = 0;
        score = zaehler;
        
    }*/
    //$('#tries').html(zaehler);
    document.getElementById('overlay').style.display = 'block';
    //$('#overlay').css('display', 'block');
    //document.getElementById('tries').innerHTML = zaehler;
    $('#tries').html(zaehler);
    document.getElementById('score').innerHTML = 'Highscore: '+score;
    //$('#score').html('Highscore: '+score);
}

function matchCards() {

    if (deck[active_cards[0]] == deck[active_cards[1]]) {
        document.getElementsByClassName('card')[active_cards[0]].onclick = '';
        document.getElementsByClassName('card')[active_cards[0]].style.opacity = '0.0';
        document.getElementsByClassName('card')[active_cards[1]].onclick = '';
        document.getElementsByClassName('card')[active_cards[1]].style.opacity = '0.0';
        count++;
    } else {

        document.getElementsByClassName('card')[active_cards[0]].style.backgroundPosition = '0 0';
        document.getElementsByClassName('card')[active_cards[1]].style.backgroundPosition = '0 0';
    }
    var temp = active_cards[2];
    active_cards = new Array();
    active_cards.push(temp);
}

function memory(){
    if(active_cards.length == 2){
    zaehler++;
    
    document.getElementById('counter').innerHTML = 'Anzahl der Versuche: '+zaehler;
    //$('#counter').html('Anzahl der Versuche '+zaehler);
    }
}

function reset() {
    zaehler = 0;
    document.getElementById('table').innerHTML = '';
    document.getElementById('winnerbox').innerHTML = '';
    document.getElementById('counter').innerHTML = 'Anzahl der Versuche: '+zaehler;
    deck = new Array(card_amount);
    active_cards = new Array();
    count = 0;
    
}

function random(min, max) {


    return (min + parseInt(Math.random() * (max - min + 1)));
}

function exit(){
    reset();
    document.getElementById('overlay').style.display = 'none';

}

function again(){
    placeCards();
    document.getElementById('overlay').style.display = 'none';
}



