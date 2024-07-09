async function getBotMove(data){
    let r = await fetch("/botMove", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch((error) => {
        console.error('Error:', error);
    });

    return r;
}