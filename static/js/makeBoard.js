function isOdd(n) { return n & 1;};

function makeBoard(h, w, s, board) {
    let color = "white";
    let abc = "abcdefgh";
    let out = "";

    // generating game board
    for (let y=0; y<h; y++) {
        for (let x=0; x<w; x++) {
            if (isOdd(y)) {
                if (isOdd(x)) {
                    color = "white";
                } else {
                    color = "#303030";
                };
            } else {
                if (!isOdd(x)) {
                    color = "white";
                } else {
                    color = "#303030";
                };
            };
            out += '<rect x="' + (x*s) + 
                                    '" y="' + (y*s) + 
                                    '" id="' + abc[x] + (h-y) + 
                                    '" width="' + s + 
                                    '" height="' + s + 
                                    '" style="fill:' + color + '" />'
        };
    };

    // putting pieces onto the board
    for(let y=0; y<h; y++){
        for(let x=0; x<w; x++){
            if(board[y][x] !== ""){
                out += '<image href="/static/assets/' + board[y][x] + '.svg'
                                          + '" x="' + (x*s)
                                          + '" y="' + (y*s)
                                          + '" height="' + (s)
                                          + '" width="' + (s) 
                                          + '" class="' + board[y][x] + '" />';
            };
        };
    };
    
    return out;
}

