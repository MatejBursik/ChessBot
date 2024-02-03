function canMoveThere(pType, p_x, p_y, t_x, t_y, scale){
    // based on pType(piece type) check if the piece(p_x,p_y) can reach tile(t_x,t_y)
    let moves = [];
    let stop;
    let board = getBoard(scale);

    switch (pType[0]){
        case "r":
            // rook movement
            stop = [true,true,true,true];
            for(let i=0; i<4; i++){
                for(let j=1; j<8; j++){
                    switch (i){
                        case 0: // up
                            if ((p_y/scale)-j < 0){
                                stop[i] = false;
                            } else if (pType[1] === "l" && board[(p_y/scale)-j][p_x/scale][1] === "l" && stop[i]){
                                stop[i] = false;
                            } else if (pType[1] === "l" && board[(p_y/scale)-j][p_x/scale][1] === "d" && stop[i]){
                                moves.push([p_x,p_y-(j*scale)]);
                                stop[i] = false;
                            } else if (pType[1] === "d" && board[(p_y/scale)-j][p_x/scale][1] === "d" && stop[i]){
                                stop[i] = false;
                            } else if (pType[1] === "d" && board[(p_y/scale)-j][p_x/scale][1] === "l" && stop[i]){
                                moves.push([p_x,p_y-(j*scale)]);
                                stop[i] = false;
                            } else if (stop[i]) {
                                moves.push([p_x,p_y-(j*scale)]);
                            }
                            break;
                        case 1: // down
                            if ((p_y/scale)+j > 7){
                                stop[i] = false;
                            } else if (pType[1] === "l" && board[(p_y/scale)+j][p_x/scale][1] === "l" && stop[i]){
                                stop[i] = false;
                            } else if (pType[1] === "l" && board[(p_y/scale)+j][p_x/scale][1] === "d" && stop[i]){
                                moves.push([p_x,p_y+(j*scale)]);
                                stop[i] = false;
                            } else if (pType[1] === "d" && board[(p_y/scale)+j][p_x/scale][1] === "d" && stop[i]){
                                stop[i] = false;
                            } else if (pType[1] === "d" && board[(p_y/scale)+j][p_x/scale][1] === "l" && stop[i]){
                                moves.push([p_x,p_y+(j*scale)]);
                                stop[i] = false;
                            } else if (stop[i]) {
                                moves.push([p_x,p_y+(j*scale)]);
                            }
                            break;
                        case 2: // left
                            if ((p_x/scale)-j < 0){
                                stop[i] = false;
                            } else if (pType[1] === "l" && board[p_y/scale][(p_x/scale)-j][1] === "l" && stop[i]){
                                stop[i] = false;
                            } else if (pType[1] === "l" && board[p_y/scale][(p_x/scale)-j][1] === "d" && stop[i]){
                                moves.push([p_x-(j*scale),p_y]);
                                stop[i] = false;
                            } else if (pType[1] === "d" && board[p_y/scale][(p_x/scale)-j][1] === "d" && stop[i]){
                                stop[i] = false;
                            } else if (pType[1] === "d" && board[p_y/scale][(p_x/scale)-j][1] === "l" && stop[i]){
                                moves.push([p_x-(j*scale),p_y]);
                                stop[i] = false;
                            } else if (stop[i]) {
                                moves.push([p_x-(j*scale),p_y]);
                            }
                            break;
                        case 3: // right
                            if ((p_x/scale)+j > 7){
                                stop[i] = false;
                            } else if (pType[1] === "l" && board[p_y/scale][(p_x/scale)+j][1] === "l" && stop[i]){
                                stop[i] = false;
                            } else if (pType[1] === "l" && board[p_y/scale][(p_x/scale)+j][1] === "d" && stop[i]){
                                moves.push([p_x+(j*scale),p_y]);
                                stop[i] = false;
                            } else if (pType[1] === "d" && board[p_y/scale][(p_x/scale)+j][1] === "d" && stop[i]){
                                stop[i] = false;
                            } else if (pType[1] === "d" && board[p_y/scale][(p_x/scale)+j][1] === "l" && stop[i]){
                                moves.push([p_x+(j*scale),p_y]);
                                stop[i] = false;
                            } else if (stop[i]) {
                                moves.push([p_x+(j*scale),p_y]);
                            }
                            break;
                    }
                }
            }
            break;

        case "n":
            // knight movement
            moves = [
                [p_x+(2*scale),p_y+(1*scale)],
                [p_x+(1*scale),p_y+(2*scale)],
                [p_x-(2*scale),p_y+(1*scale)],
                [p_x-(1*scale),p_y+(2*scale)],
                [p_x-(2*scale),p_y-(1*scale)],
                [p_x-(1*scale),p_y-(2*scale)],
                [p_x+(2*scale),p_y-(1*scale)],
                [p_x+(1*scale),p_y-(2*scale)]];
            break;

        case "b":
            // bishop movement
            stop = [true,true,true,true];
            for(let i=0; i<4; i++){
                for(let j=1; j<8; j++){
                    switch (i){
                        case 0: // up,left
                            if ((p_x/scale)-j < 0 || (p_y/scale)-j < 0){
                                stop[i] = false;
                            } else if (pType[1] === "l" && board[(p_y/scale)-j][(p_x/scale)-j][1] === "l" && stop[i]){
                                stop[i] = false;
                            } else if (pType[1] === "l" && board[(p_y/scale)-j][(p_x/scale)-j][1] === "d" && stop[i]){
                                moves.push([p_x-(j*scale),p_y-(j*scale)]);
                                stop[i] = false;
                            } else if (pType[1] === "d" && board[(p_y/scale)-j][(p_x/scale)-j][1] === "d" && stop[i]){
                                stop[i] = false;
                            } else if (pType[1] === "d" && board[(p_y/scale)-j][(p_x/scale)-j][1] === "l" && stop[i]){
                                moves.push([p_x-(j*scale),p_y-(j*scale)]);
                                stop[i] = false;
                            } else if (stop[i]) {
                                moves.push([p_x-(j*scale),p_y-(j*scale)]);
                            }
                            break;
                        case 1: // up,right
                            if ((p_x/scale)+j > 7 || (p_y/scale)-j < 0){
                                stop[i] = false;
                            } else if (pType[1] === "l" && board[(p_y/scale)-j][(p_x/scale)+j][1] === "l" && stop[i]){
                                stop[i] = false;
                            } else if (pType[1] === "l" && board[(p_y/scale)-j][(p_x/scale)+j][1] === "d" && stop[i]){
                                moves.push([p_x+(j*scale),p_y-(j*scale)]);
                                stop[i] = false;
                            } else if (pType[1] === "d" && board[(p_y/scale)-j][(p_x/scale)+j][1] === "d" && stop[i]){
                                stop[i] = false;
                            } else if (pType[1] === "d" && board[(p_y/scale)-j][(p_x/scale)+j][1] === "l" && stop[i]){
                                moves.push([p_x+(j*scale),p_y-(j*scale)]);
                                stop[i] = false;
                            } else if (stop[i]) {
                                moves.push([p_x+(j*scale),p_y-(j*scale)]);
                            }
                            break;
                        case 2: // down,left
                            if ((p_x/scale)-j < 0 || (p_y/scale)+j > 7){
                                stop[i] = false;
                            } else if (pType[1] === "l" && board[(p_y/scale)+j][(p_x/scale)-j][1] === "l" && stop[i]){
                                stop[i] = false;
                            } else if (pType[1] === "l" && board[(p_y/scale)+j][(p_x/scale)-j][1] === "d" && stop[i]){
                                moves.push([p_x-(j*scale),p_y+(j*scale)]);
                                stop[i] = false;
                            } else if (pType[1] === "d" && board[(p_y/scale)+j][(p_x/scale)-j][1] === "d" && stop[i]){
                                stop[i] = false;
                            } else if (pType[1] === "d" && board[(p_y/scale)+j][(p_x/scale)-j][1] === "l" && stop[i]){
                                moves.push([p_x-(j*scale),p_y+(j*scale)]);
                                stop[i] = false;
                            } else if (stop[i]){
                                moves.push([p_x-(j*scale),p_y+(j*scale)]);
                            }
                            break;
                        case 3: // down,right
                            if ((p_x/scale)+j > 7 || (p_y/scale)+j > 7){
                                stop[i] = false;
                            } else if (pType[1] === "l" && board[(p_y/scale)+j][(p_x/scale)+j][1] === "l" && stop[i]){
                                stop[i] = false;
                            } else if (pType[1] === "l" && board[(p_y/scale)+j][(p_x/scale)+j][1] === "d" && stop[i]){
                                moves.push([p_x+(j*scale),p_y+(j*scale)]);
                                stop[i] = false;
                            } else if (pType[1] === "d" && board[(p_y/scale)+j][(p_x/scale)+j][1] === "d" && stop[i]){
                                stop[i] = false;
                            } else if (pType[1] === "d" && board[(p_y/scale)+j][(p_x/scale)+j][1] === "l" && stop[i]){
                                moves.push([p_x+(j*scale),p_y+(j*scale)]);
                                stop[i] = false;
                            } else if (stop[i]) {
                                moves.push([p_x+(j*scale),p_y+(j*scale)]);
                            }
                            break;                            
                    }
                }
            }
            break;

        case "q":
            // queen movement
            stop = [true,true,true,true,true,true,true,true];
            for(let i=0; i<8; i++){
                for(let j=1; j<8; j++){
                    switch (i){
                        case 0: // up
                            if ((p_y/scale)-j < 0){
                                stop[i] = false;
                            } else if (pType[1] === "l" && board[(p_y/scale)-j][p_x/scale][1] === "l" && stop[i]){
                                stop[i] = false;
                            } else if (pType[1] === "l" && board[(p_y/scale)-j][p_x/scale][1] === "d" && stop[i]){
                                moves.push([p_x,p_y-(j*scale)]);
                                stop[i] = false;
                            } else if (pType[1] === "d" && board[(p_y/scale)-j][p_x/scale][1] === "d" && stop[i]){
                                stop[i] = false;
                            } else if (pType[1] === "d" && board[(p_y/scale)-j][p_x/scale][1] === "l" && stop[i]){
                                moves.push([p_x,p_y-(j*scale)]);
                                stop[i] = false;
                            } else if (stop[i]) {
                                moves.push([p_x,p_y-(j*scale)]);
                            }
                            break;
                        case 1: // down
                            if ((p_y/scale)+j > 7){
                                stop[i] = false;
                            } else if (pType[1] === "l" && board[(p_y/scale)+j][p_x/scale][1] === "l" && stop[i]){
                                stop[i] = false;
                            } else if (pType[1] === "l" && board[(p_y/scale)+j][p_x/scale][1] === "d" && stop[i]){
                                moves.push([p_x,p_y+(j*scale)]);
                                stop[i] = false;
                            } else if (pType[1] === "d" && board[(p_y/scale)+j][p_x/scale][1] === "d" && stop[i]){
                                stop[i] = false;
                            } else if (pType[1] === "d" && board[(p_y/scale)+j][p_x/scale][1] === "l" && stop[i]){
                                moves.push([p_x,p_y+(j*scale)]);
                                stop[i] = false;
                            } else if (stop[i]) {
                                moves.push([p_x,p_y+(j*scale)]);
                            }
                            break;
                        case 2: // left
                            if ((p_x/scale)-j < 0){
                                stop[i] = false;
                            } else if (pType[1] === "l" && board[p_y/scale][(p_x/scale)-j][1] === "l" && stop[i]){
                                stop[i] = false;
                            } else if (pType[1] === "l" && board[p_y/scale][(p_x/scale)-j][1] === "d" && stop[i]){
                                moves.push([p_x-(j*scale),p_y]);
                                stop[i] = false;
                            } else if (pType[1] === "d" && board[p_y/scale][(p_x/scale)-j][1] === "d" && stop[i]){
                                stop[i] = false;
                            } else if (pType[1] === "d" && board[p_y/scale][(p_x/scale)-j][1] === "l" && stop[i]){
                                moves.push([p_x-(j*scale),p_y]);
                                stop[i] = false;
                            } else if (stop[i]) {
                                moves.push([p_x-(j*scale),p_y]);
                            }
                            break;
                        case 3: // right
                            if ((p_x/scale)+j > 7){
                                stop[i] = false;
                            } else if (pType[1] === "l" && board[p_y/scale][(p_x/scale)+j][1] === "l" && stop[i]){
                                stop[i] = false;
                            } else if (pType[1] === "l" && board[p_y/scale][(p_x/scale)+j][1] === "d" && stop[i]){
                                moves.push([p_x+(j*scale),p_y]);
                                stop[i] = false;
                            } else if (pType[1] === "d" && board[p_y/scale][(p_x/scale)+j][1] === "d" && stop[i]){
                                stop[i] = false;
                            } else if (pType[1] === "d" && board[p_y/scale][(p_x/scale)+j][1] === "l" && stop[i]){
                                moves.push([p_x+(j*scale),p_y]);
                                stop[i] = false;
                            } else if (stop[i]) {
                                moves.push([p_x+(j*scale),p_y]);
                            }
                            break;
                        case 4: // up,left
                            if ((p_x/scale)-j < 0 || (p_y/scale)-j < 0){
                                stop[i] = false;
                            } else if (pType[1] === "l" && board[(p_y/scale)-j][(p_x/scale)-j][1] === "l" && stop[i]){
                                stop[i] = false;
                            } else if (pType[1] === "l" && board[(p_y/scale)-j][(p_x/scale)-j][1] === "d" && stop[i]){
                                moves.push([p_x-(j*scale),p_y-(j*scale)]);
                                stop[i] = false;
                            } else if (pType[1] === "d" && board[(p_y/scale)-j][(p_x/scale)-j][1] === "d" && stop[i]){
                                stop[i] = false;
                            } else if (pType[1] === "d" && board[(p_y/scale)-j][(p_x/scale)-j][1] === "l" && stop[i]){
                                moves.push([p_x-(j*scale),p_y-(j*scale)]);
                                stop[i] = false;
                            } else if (stop[i]) {
                                moves.push([p_x-(j*scale),p_y-(j*scale)]);
                            }
                            break;
                        case 5: // up,right
                            if ((p_x/scale)+j > 7 || (p_y/scale)-j < 0){
                                stop[i] = false;
                            } else if (pType[1] === "l" && board[(p_y/scale)-j][(p_x/scale)+j][1] === "l" && stop[i]){
                                stop[i] = false;
                            } else if (pType[1] === "l" && board[(p_y/scale)-j][(p_x/scale)+j][1] === "d" && stop[i]){
                                moves.push([p_x+(j*scale),p_y-(j*scale)]);
                                stop[i] = false;
                            } else if (pType[1] === "d" && board[(p_y/scale)-j][(p_x/scale)+j][1] === "d" && stop[i]){
                                stop[i] = false;
                            } else if (pType[1] === "d" && board[(p_y/scale)-j][(p_x/scale)+j][1] === "l" && stop[i]){
                                moves.push([p_x+(j*scale),p_y-(j*scale)]);
                                stop[i] = false;
                            } else if (stop[i]) {
                                moves.push([p_x+(j*scale),p_y-(j*scale)]);
                            }
                            break;
                        case 6: // down,left
                            if ((p_x/scale)-j < 0 || (p_y/scale)+j > 7){
                                stop[i] = false;
                            } else if (pType[1] === "l" && board[(p_y/scale)+j][(p_x/scale)-j][1] === "l" && stop[i]){
                                stop[i] = false;
                            } else if (pType[1] === "l" && board[(p_y/scale)+j][(p_x/scale)-j][1] === "d" && stop[i]){
                                moves.push([p_x-(j*scale),p_y+(j*scale)]);
                                stop[i] = false;
                            } else if (pType[1] === "d" && board[(p_y/scale)+j][(p_x/scale)-j][1] === "d" && stop[i]){
                                stop[i] = false;
                            } else if (pType[1] === "d" && board[(p_y/scale)+j][(p_x/scale)-j][1] === "l" && stop[i]){
                                moves.push([p_x-(j*scale),p_y+(j*scale)]);
                                stop[i] = false;
                            } else if (stop[i]){
                                moves.push([p_x-(j*scale),p_y+(j*scale)]);
                            }
                            break;
                        case 7: // down,right
                            if ((p_x/scale)+j > 7 || (p_y/scale)+j > 7){
                                stop[i] = false;
                            } else if (pType[1] === "l" && board[(p_y/scale)+j][(p_x/scale)+j][1] === "l" && stop[i]){
                                stop[i] = false;
                            } else if (pType[1] === "l" && board[(p_y/scale)+j][(p_x/scale)+j][1] === "d" && stop[i]){
                                moves.push([p_x+(j*scale),p_y+(j*scale)]);
                                stop[i] = false;
                            } else if (pType[1] === "d" && board[(p_y/scale)+j][(p_x/scale)+j][1] === "d" && stop[i]){
                                stop[i] = false;
                            } else if (pType[1] === "d" && board[(p_y/scale)+j][(p_x/scale)+j][1] === "l" && stop[i]){
                                moves.push([p_x+(j*scale),p_y+(j*scale)]);
                                stop[i] = false;
                            } else if (stop[i]) {
                                moves.push([p_x+(j*scale),p_y+(j*scale)]);
                            }
                            break;
                    }
                }
            }
            break;

        case "k":
            // king movement
            moves = [
                [p_x+(1*scale),p_y+(1*scale)],
                [p_x+(1*scale),p_y],
                [p_x+(1*scale),p_y-(1*scale)],
                [p_x,p_y-(1*scale)],
                [p_x-(1*scale),p_y-(1*scale)],
                [p_x-(1*scale),p_y],
                [p_x-(1*scale),p_y+(1*scale)],
                [p_x,p_y+(1*scale)]];
            break;
    }
    
    // return True || False
    for(let i=0; i<moves.length; i++){
        if(moves[i][0]==t_x && moves[i][1]==t_y){
            return true;
        }
    }
    return false;
}