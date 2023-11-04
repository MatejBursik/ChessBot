let height = 8;
let width = 8;
let scale = 50;

// generating game board
const svg = document.getElementById('svg');
svg.setAttribute('width',(width*scale));
svg.setAttribute('height',(height*scale));
let svgInnerHTMl = svg.innerHTML;

function isOdd(n) { return n & 1;};
let color = "white";
//if(isOdd(y)){}

for(let y=0; y<height; y++){
    for(let x=0; x<width; x++){
        if(isOdd(y)){
            if(isOdd(x)){
                color = "white";
            } else {
                color = "#303030";
            };
        } else {
            if(!isOdd(x)){
                color = "white";
            } else {
                color = "#303030";
            };
        };
        svgInnerHTMl += '<rect x="' + (x*scale) + 
                                '" y="' + (y*scale) + 
                                '" id="' + y + '-' + x + 
                                '" width="' + scale + 
                                '" height="' + scale + 
                                '" style="fill:' + color + '" />'
    };
};

// putting pieces onto the board
let id;
let board = [
    ["rd","knd","bd","qd","kd","bd","knd","rd"],
    ["pd","pd","pd","pd","pd","pd","pd","pd"],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["pl","pl","pl","pl","pl","pl","pl","pl"],
    ["rl","knl","bl","ql","kl","bl","knl","rl"]
];

for(let y=0; y<height; y++){
    for(let x=0; x<width; x++){
        if(board[y][x] !== ""){
            id = board[y][x];
            if(board[y][x] === "pl" || board[y][x] === "pd"){
                id = (x+1) + board[y][x];
            } else {id = board[y][x];};
            svgInnerHTMl += '<image href="assets/' + board[y][x] + '.svg'
                                      + '" x="' + (x*scale)
                                      + '" y="' + (y*scale)
                                      + '" height="' + (scale)
                                      + '" width="' + (scale) 
                                      + '" id="' + id + '" />';
        };
    };
};

svg.innerHTML = svgInnerHTMl;

// display moves played
const table = document.getElementById('history');
const next = document.getElementById('next');
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

function move() {}

// play the input
const white = document.getElementById('enter_W');
const black = document.getElementById('enter_B');
const w_input = document.getElementById('white');
const b_input = document.getElementById('black');
let w_moves = [];
let b_moves = [];
let value = "";

white.addEventListener('click', function (e) {
    if(next.innerText === "White"){
        value = w_input.value;
        if(!value){value = "";};
        w_moves.push(value);

        console.log(value); //debug
        move();

        addToHistory(w_moves,b_moves);
        console.log(w_moves); //debug
        console.log(b_moves); //debug
        w_input.value = ""
        next.innerText = "Black";
    };
});

black.addEventListener('click', function (e) {
    if(next.innerText === "Black"){
        value = b_input.value;
        if(!value){value = "";};
        b_moves.push(value);

        console.log(value); //debug
        move();

        addToHistory(w_moves,b_moves);
        console.log(w_moves); //debug
        console.log(b_moves); //debug
        b_input.value = ""
        next.innerText = "White";
    };
});
