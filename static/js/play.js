let height = 8;
let width = 8;
let scale = 50;

// if user is a specatator, remove possibility to enter moves
console.log(userOption);
const moveSect = document.getElementById('moveSect');

if (userOption === 'spectator') {
    moveSect.style.display = 'none';
}

// generating game board
// putting pieces onto the board
const svg = document.getElementById('svg');
svg.setAttribute('width',(width*scale));
svg.setAttribute('height',(height*scale));

let startboard = [
    ["rd","nd","bd","qd","kd","bd","nd","rd"],
    ["pd","pd","pd","pd","pd","pd","pd","pd"],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["pl","pl","pl","pl","pl","pl","pl","pl"],
    ["rl","nl","bl","ql","kl","bl","nl","rl"]
];

svg.innerHTML = makeBoard(height, width, scale, startboard);

// display moves played in a table
const table = document.getElementById('history');
let t_data = "";
let l = 0;

function addToHistory(w_m,b_m) {
    if(b_m.length < w_m.length){
        l=w_m.length;
        b_m.push(" ")
    } else {
        l=b_m.length;
    };

    t_data = "<tbody><tr><th>Turn</th><th>White</th><th>Black</th></tr>";
    
    for(let i=0; i<l; i++){
        t_data += '<tr><td>' + (i+1) + '</td>'
        t_data += '<td>' + w_m[i] + '</td>';
        t_data += '<td>' + b_m[i] + '</td>';
        t_data += '</tr>'
    }
    
    t_data += "</tbody>"
    table.innerHTML = t_data

    if(b_m[b_m.length-1] === " "){b_m.pop();};
};

// player input
const userMoveEnter = document.getElementById('userMoveEnter');
const userInput = document.getElementById('userMove');
let botResponse;
let run = true;
let moves = {
    'white': [],
    'black': []
};
let data = {
    'color': undefined,
    'board': undefined
};

switch (userOption){
    // set bot color
    case 'white':
        data['color'] = 'black';
        break;

    // set bot color and make the first move
    case 'black':
        data['color'] = 'white';

        // make a request to bot for a move since it is going first
        setTimeout(async function () {
            // fetch request is send to flask for bots next move
            // - bot receives json of the board
            // - bot sends json as its move
            data['board'] = getBoard(scale);
            botResponse = await getBotMove(data);
            console.log(botResponse); // debug
    
            // bots move is updated on the board
            svg.innerHTML = makeBoard(height, width, scale, botResponse['board']);
            
        }, 100);
        break;

    // on recursive interval make a move request
    case 'spectator':
        data['color'] = 'white';
        
        (function loop() {
            setTimeout(async function () {
                // fetch request is send to flask for bots next move
                // - bot receives json of the board
                // - bot sends json as its move
                data['board'] = getBoard(scale);
                botResponse = await getBotMove(data);
                console.log(botResponse); // debug

                // bots move is updated on the board
                svg.innerHTML = makeBoard(height, width, scale, botResponse['board']);

                // add history
                moves[data['color']].push(botResponse['move']);
                if (data['color'] === 'black') {
                    addToHistory(moves['white'], moves['black']);
                }

                // switch color for the next turn
                switch (data['color']){
                    case 'white':
                        data['color'] = 'black';
                        break;
                
                    case 'black':
                        data['color'] = 'white';
                }
            
                loop();
            }, 100);
        })();
          
        break;
}

userMoveEnter.addEventListener('click', async function (e) {
    // on click of the button, player sends in the chess notation for their move
    move = await updatePlayerMove( {'board':getBoard(scale), 'color':userOption, 'move':userInput.value} )
    if(move['move']){
        // players move is updated on the board
        svg.innerHTML = makeBoard(height, width, scale, move['board']);

        // add user history
        moves[userOption].push(userInput.value);
        console.log(userInput.value + ' (' + move['move'] + ')'); // debug
        userInput.value = ""

        // fetch request is send to flask for bots next move
        // - bot receives json of the board
        // - bot sends json as its move
        data['board'] = getBoard(scale);
        botResponse = await getBotMove(data);
        console.log(botResponse); // debug

        // bots move is updated on the board
        svg.innerHTML = makeBoard(height, width, scale, botResponse['board']);
        
        // add bot history
        moves[data['color']].push(botResponse['move']);
        addToHistory(moves['white'], moves['black']);

    } else {
        // notify the user that the chess notation was invalid
        alert('Invalid chess notation');
    }
});
