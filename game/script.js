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
let abc = "abcdefgh"

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
                                '" id="' + abc[x] + (height-y) + 
                                '" width="' + scale + 
                                '" height="' + scale + 
                                '" style="fill:' + color + '" />'
    };
};

// putting pieces onto the board
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

for(let y=0; y<height; y++){
    for(let x=0; x<width; x++){
        if(startboard[y][x] !== ""){
            svgInnerHTMl += '<image href="assets/' + startboard[y][x] + '.svg'
                                      + '" x="' + (x*scale)
                                      + '" y="' + (y*scale)
                                      + '" height="' + (scale)
                                      + '" width="' + (scale) 
                                      + '" class="' + startboard[y][x] + '" />';
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

// play input
const white = document.getElementById('enter_W');
const black = document.getElementById('enter_B');
const w_input = document.getElementById('white');
const b_input = document.getElementById('black');
let w_moves = [];
let b_moves = [];
let value = "";
let run = true;

white.addEventListener('click', function (e) {
    if(next.innerText === "White"){
        value = w_input.value;
        run = identifyChessNotation(value,"white",scale);
        if(run){
            w_moves.push(value);
            console.log(value); //debug
            addToHistory(w_moves,b_moves);
            
            w_input.value = ""
            next.innerText = "Black";
        }
    };
});

black.addEventListener('click', function (e) {
    if(next.innerText === "Black"){
        value = b_input.value;
        run = identifyChessNotation(value,"black",scale);
        if(run){
            b_moves.push(value);
            console.log(value); //debug
            addToHistory(w_moves,b_moves);
            
            b_input.value = ""
            next.innerText = "White";
        }
    };
});

// print button
const printBourd = document.getElementById('print');

printBourd.addEventListener('click', function (e) {
    console.log(JSON.stringify(getBoard(scale)));
});
