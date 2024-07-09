function getBoard(scale){
    const all = document.getElementsByTagName('image');
    let out = [
        ["","","","","","","",""],
        ["","","","","","","",""],
        ["","","","","","","",""],
        ["","","","","","","",""],
        ["","","","","","","",""],
        ["","","","","","","",""],
        ["","","","","","","",""],
        ["","","","","","","",""]
    ];
  
    for(let i=0; i<all.length; i++){
        out[parseInt(all[i].getAttribute('y'))/scale][parseInt(all[i].getAttribute('x'))/scale] = all[i].getAttribute('class')
    }
    
    return out;
}