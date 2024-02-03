function identifyChessNotation(move, player, scale) {
    let worked = true;

    switch (player){
        case "white":
            player = "l";
            break;
        case "black":
            player = "d";
            break;
    }
    console.log(player)

    // regex expression to match chess notation
    const regex = /^([KQRNBP])?([a-h])?([1-8])?x?([a-h])([1-8])(=[NBRQ])?(\+|#)?$/;
    let match = move.match(regex);
    let rooks;
    let king;

    if (move === "O-O-O"){
        console.log('Long castle');
        rooks = document.getElementsByClassName(('R' + player).toLowerCase());
        king = document.getElementsByClassName(('K' + player).toLowerCase());
        switch (player){
            case "l":
                king[0].setAttribute('y', 7*scale);
                king[0].setAttribute('x', 2*scale);
                rooks[0].setAttribute('y', 7*scale);
                rooks[0].setAttribute('x', 3*scale);
                break;
            case "d":
                king[0].setAttribute('y', 0*scale);
                king[0].setAttribute('x', 2*scale);
                rooks[0].setAttribute('y', 0*scale);
                rooks[0].setAttribute('x', 3*scale);
                break;
        }

    } else if (move === "O-O"){
        console.log('Short castle');
        rooks = document.getElementsByClassName(('R' + player).toLowerCase());
        king = document.getElementsByClassName(('K' + player).toLowerCase());
        switch (player){
            case "l":
                king[0].setAttribute('y', 7*scale);
                king[0].setAttribute('x', 6*scale);
                rooks[1].setAttribute('y', 7*scale);
                rooks[1].setAttribute('x', 5*scale);
                break;
            case "d":
                king[0].setAttribute('y', 0*scale);
                king[0].setAttribute('x', 6*scale);
                rooks[1].setAttribute('y', 0*scale);
                rooks[1].setAttribute('x', 5*scale);
                break;
        }

    } else if (match) {
        let piece = match[1] || 'P'; // Default to pawn if no piece is specified
        let fileStart = match[2];
        let rankStart = match[3];
        let fileEnd = match[4];
        let rankEnd = match[5];
        let promotion = match[6];
        let check = match[7]; // + for check || # for checkmate

        // Output the identified components
        console.log('Piece:', piece);
        console.log('Start Square:', fileStart || rankStart || 'None');
        console.log('End Square:', fileEnd + rankEnd);
        console.log('Promotion:', promotion || 'None');
        console.log('Check:', check || 'None');

        let endTile = document.getElementById(fileEnd + rankEnd);
        let selectPieces = document.getElementsByClassName((piece + player).toLowerCase());
        let selection = [];
        let selected;
        let abc = "abcdefgh";

        switch (piece){
            case "P":
                // identify pawn
                if(fileStart || rankStart){ // if there are file or rank indicators
                    if(fileStart && rankStart){ // if there are both file and rank indicators
                        for(let i=0; i<selectPieces.length; i++){
                            p = selectPieces[i];
                            if(p.getAttribute('y') === (abc.indexOf(rankStart)*scale).toString() && p.getAttribute('x') === (abc.indexOf(fileStart)*scale).toString()){
                                selection.push(p);
                            }
                        };
                    } else { // if there is only one, file or rank indicators
                        for(let i=0; i<selectPieces.length; i++){
                            p = selectPieces[i];
                            if(rankStart){
                                if(p.getAttribute('y') === (abc.indexOf(rankStart)*scale).toString()){
                                    selection.push(p);
                                    console.log(p);
                                }
                            }
                            if(fileStart){
                                if(p.getAttribute('x') === (abc.indexOf(fileStart)*scale).toString()){
                                    selection.push(p);
                                }
                            }
                        };
                    }
                    for(let i=0; i<selection.length; i++){
                        p = selection[i];
                        if(player === "l" && parseInt(p.getAttribute('y'))-1*scale === parseInt(endTile.getAttribute('y'))){
                            selected = p
                        } else if(player === "d" && parseInt(p.getAttribute('y'))+1*scale === parseInt(endTile.getAttribute('y'))){
                            selected = p
                        }
                    }
                } else {
                    selection = selectPieces;
                    // if there are no file or rank indicators, look which piece can reach it
                    for(let i=0; i<selection.length; i++){
                        p = selection[i];
                        if(player === "l" && parseInt(p.getAttribute('y'))-1*scale === parseInt(endTile.getAttribute('y')) && p.getAttribute('x') === endTile.getAttribute('x')){
                            selected = p
                        }else if(player === "l" && parseInt(p.getAttribute('y'))-2*scale === parseInt(endTile.getAttribute('y')) && p.getAttribute('x') === endTile.getAttribute('x')){
                            selected = p
                        } else if(player === "d" && parseInt(p.getAttribute('y'))+1*scale === parseInt(endTile.getAttribute('y')) && p.getAttribute('x') === endTile.getAttribute('x')){
                            selected = p
                        } else if(player === "d" && parseInt(p.getAttribute('y'))+2*scale === parseInt(endTile.getAttribute('y')) && p.getAttribute('x') === endTile.getAttribute('x')){
                            selected = p
                        }
                    }
                }
            
                if(selected){
                    // check for capture
                    let capture = document.getElementsByTagName("image");
                    for(let i=0; i<capture.length; i++){
                        if(capture[i].getAttribute('x') === endTile.getAttribute('x') && capture[i].getAttribute('y') === endTile.getAttribute('y')){
                            capture[i].remove();

                            // en passant
                        } else if (player === "l" && parseInt(selected.getAttribute('y')) === 3*scale){
                            if(parseInt(capture[i].getAttribute('x')) === parseInt(endTile.getAttribute('x')) && parseInt(capture[i].getAttribute('y')) - scale === parseInt(endTile.getAttribute('y'))){
                                capture[i].remove();
                            }
                        } else if (player === "d" && parseInt(selected.getAttribute('y')) === 4*scale){
                            if(parseInt(capture[i].getAttribute('x')) === parseInt(endTile.getAttribute('x')) && parseInt(capture[i].getAttribute('y')) + scale === parseInt(endTile.getAttribute('y'))){
                                capture[i].remove();
                            }
                        }
                    }

                    // move the piece
                    selected.setAttribute('x', endTile.getAttribute('x'));
                    selected.setAttribute('y', endTile.getAttribute('y'));

                    // promote
                    if(parseInt(selected.getAttribute('y')) == 0 || parseInt(selected.getAttribute('y')) == 8*scale){
                        selected.setAttribute("href",'assets/' + (promotion[1] + player).toLowerCase() + '.svg');
                        selected.setAttribute("class",promotion[1].toLowerCase());
                    }
                } else {
                    console.log("can't capture, move or promote there");
                    worked = false;
                }
                break;

            default:
                // identify piece
                if(fileStart || rankStart){ // if there are file or rank indicators
                    if(fileStart && rankStart){ // if there are both file and rank indicators
                        for(let i=0; i<selectPieces.length; i++){
                            p = selectPieces[i];
                            if(p.getAttribute('y') === (abc.indexOf(rankStart)*scale).toString() && p.getAttribute('x') === (abc.indexOf(fileStart)*scale).toString()){
                                selection.push(p);
                            }
                        };
                    } else { // if there is only one, file or rank indicators
                        for(let i=0; i<selectPieces.length; i++){
                            p = selectPieces[i];
                            if(rankStart){
                                if(p.getAttribute('y') === (abc.indexOf(rankStart)*scale).toString()){
                                    selection.push(p);
                                }
                            }
                            if(fileStart){
                                if(p.getAttribute('x') === (abc.indexOf(fileStart)*scale).toString()){
                                    selection.push(p);
                                }
                            }
                        };
                    }
                }  else {
                    selection = selectPieces;
                }
                // if there are no file or rank indicators, look which piece can reach it
                for(let i=0; i<selection.length; i++){
                    p = selection[i];
                    if(canMoveThere(p.getAttribute('class'), 
                                    parseInt(p.getAttribute('x')), 
                                    parseInt(p.getAttribute('y')), 
                                    parseInt(endTile.getAttribute('x')), 
                                    parseInt(endTile.getAttribute('y')), 
                                    scale)){
                        selected = p;
                    }
                };

                if(selected){
                    // check for capture
                    let capture = document.getElementsByTagName("image");
                    for(let i=0; i<capture.length; i++){
                        if(capture[i].getAttribute('x') === endTile.getAttribute('x') && capture[i].getAttribute('y') === endTile.getAttribute('y')){
                            capture[i].remove();
                        }
                    }

                    // move the piece
                    selected.setAttribute('x', endTile.getAttribute('x'));
                    selected.setAttribute('y', endTile.getAttribute('y'));
                } else {
                    console.log("can't capture or move there");
                    worked = false;
                }
                break;
        }
    } else {
        console.log('Invalid chess notation');
        worked = false;
    }
    return worked;
}
