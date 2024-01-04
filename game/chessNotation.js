function canMoveThere(pType, p_x, p_y, t_x, t_y, scale){
  // based on pType(piece type) check if the piece(p_x,p_y) can reach tile(t_x,t_y)
  let out = false;
  let moves = [];
  let sum = (p_x+p_y)/scale;
  switch (pType[0]){
    case "r":
      // rook movement
      for(let i=0; i<8; i++){
        moves.push([p_x,i*scale])
        moves.push([i*scale,p_y])
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
      for(let i=0; i<sum; i++){
        moves.push([(sum*scale)-(i*scale),i*scale])
      }
      for(let i=0; i<8; i++){
        moves.push([p_x+(i*scale),p_y+(i*scale)])
        moves.push([p_x-(i*scale),p_y-(i*scale)])
      }
      break;

    case "q":
      // queen movement
      for(let i=0; i<8; i++){
        moves.push([p_x,i*scale])
        moves.push([i*scale,p_y])
      }
      for(let i=0; i<sum; i++){
        moves.push([(sum*scale)-(i*scale),i*scale])
      }
      for(let i=0; i<8; i++){
        moves.push([p_x+(i*scale),p_y+(i*scale)])
        moves.push([p_x-(i*scale),p_y-(i*scale)])
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
      return true
    }
  }
}

function identifyChessNotation(move, player, scale) {
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
  const regex = /^([KQRNBP])?([a-h])?([1-8])?x?([a-h])([1-8])([NBRQ])?(\+|#)?$/;
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
    let selected;

    switch (piece){
      case "P":
        // identify pawn
        if(fileStart || rankStart){ // if there are file or rank indicators
          if(fileStart && rankStart){ // if there are both file and rank indicators
            for(let i=0; i<selectPieces.length; i++){
              p = selectPieces[i];
              if(p.getAttribute('x') === rankStart && p.getAttribute('y') === fileStart){
                selected = p;
              }
            };
          } else { // if there is only one, file or rank indicators
            for(let i=0; i<selectPieces.length; i++){
              p = selectPieces[i];
              if(p.getAttribute('x') === rankStart){
                selected = p;
              } else if(p.getAttribute('y') === fileStart){
                selected = p;
              }
            };
          }
        } else { // if there are no file or rank indicators, look which piece can reach it
          for(let i=0; i<selectPieces.length; i++){
            p = selectPieces[i];
            if(player === "l" && parseInt(p.getAttribute('y')) > parseInt(endTile.getAttribute('y')) && p.getAttribute('x') === endTile.getAttribute('x')){
              selected = p
            } else if(player === "d" && parseInt(p.getAttribute('y')) < parseInt(endTile.getAttribute('y')) && p.getAttribute('x') === endTile.getAttribute('x')){
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
            }
          }

          // move the piece
          selected.setAttribute('x', endTile.getAttribute('x'));
          selected.setAttribute('y', endTile.getAttribute('y'));

          // promote
          if(parseInt(selected.getAttribute('y')) == 0 || parseInt(selected.getAttribute('y')) == 8*scale){
            selected.setAttribute("href",'assets/' + (promotion + player).toLowerCase() + '.svg');
            selected.setAttribute("class",promotion);
          }
        } else {
          console.log("can't capture, move or promote there");
        }
        break;

      default:
        // identify piece
        if(fileStart || rankStart){ // if there are file or rank indicators
          if(fileStart && rankStart){ // if there are both file and rank indicators
            for(let i=0; i<selectPieces.length; i++){
              p = selectPieces[i];
              if(p.getAttribute('x') === rankStart && p.getAttribute('y') === fileStart){
                selected = p;
              }
            };
          } else { // if there is only one, file or rank indicators
            for(let i=0; i<selectPieces.length; i++){
              p = selectPieces[i];
              if(p.getAttribute('x') === rankStart){
                selected = p;
              } else if(p.getAttribute('y') === fileStart){
                selected = p;
              }
            };
          }
        } else { // if there are no file or rank indicators, look which piece can reach it
          for(let i=0; i<selectPieces.length; i++){
            p = selectPieces[i];
            if(canMoveThere(p.getAttribute('class'), 
                            parseInt(p.getAttribute('x')), 
                            parseInt(p.getAttribute('y')), 
                            parseInt(endTile.getAttribute('x')), 
                            parseInt(endTile.getAttribute('y')), 
                            scale)){
              selected = p;
            }
          };
        }

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
        }
        break;
    }

  } else {
    console.log('Invalid chess notation');
  }
}
