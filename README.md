# ChessBot
In this chess application you are able to play against a chess AI or spectate the chess AI play against its self. It has been created using Python TensorFlow Keras and Python Flask with a HTML, CSS and JavaScript front-end. On the landing page, you are able to select whether you want play or train the model. The play feature is fully working but the training feature is work in progress. Other stuff that I am still working on can be found in the sections Future improvements.

## How to use
1. Clone/Download this repository
2. Install Python (pip included)
3. Install necessary Python libraries
    - flask
    - chess
    - numpy
    - tensorflow
4. Run [main.py](main.py)
5. Navigate to [http://127.0.0.1:5500](http://127.0.0.1:5500) (or the specified host and port in the [main.py](main.py))

## Game
The chess web-game is created using plain HTML, CSS, and JavaScript. From JavaScript, there are being calls made to Flask APIs which update the board on player move and the chess AIs move. At the starting dashboard, you are able to select if you want to play are white, black, or just spectate a game. The game is played by inputting the desired move in standard chess notation ([Youtube video](https://www.youtube.com/watch?v=b6PR885Rgb8)) in the open field and then press the button to play your move.

Please, always wait for the chess AIs move before playing your next move.

#### Future improvements
- add select option to which AI models to play/spectate
- add option to play player vs player
- rework process of making and displaying history
- possibility to download history (create a game file)
- fix animation on moves (at the moment the board is always re-drawn after any move, so it doesn't trigger the CSS transition on the pieces)
- fix the issue of sending a request with your next move before the previous one is finished (hide the button at the start of JS EventListener function)

## Neural Network Model
This Neural Network Model is created and trained using Keras from Tensorflow in Python.

### Model architecture
For the 1st version of the model, I have decided to go for a simple convolutional model.
- input shape 14, 8, 8
- 4 conv2D layers with filters set to size 32
- flatten layer
- dense layer to 64 (8*8 in 1d)
- dense layer to 1 (final choise)

### Dataset
For simplicity of storing and using the collected datasets in code, the dataset is compressed to .npz format. You can find more information about all the datasets [here](chess_solver/data/README.md)

#### Future improvements
- make or get better data for training
    - larger size, better quality
    - several specialized sets
    - games played by gm players evaluated by stockfish
- create better model architecture (conv3D, dropout)
- change to pytorch

## Back-end communication
Since I have been using Python to create the model, I decided to use Python Flask library as the back-end communication. I am using it to host the chess web-game, create routes to travel between pages, and to create API route to request a move from the chess AI and to update and verify the chess board with the inputted user move. All data communicated is transferred in JSONs which store current board, color of the player who is playing the next move, and/or the move that is being played.

## Assets
- Chess piece images: [wikimedia](https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces).
- Chess engine to generate learning dataset: [Stockfish engine](https://stockfishchess.org/download/)
