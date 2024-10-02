import chess, chess.pgn, numpy
from functions import *
from io import StringIO 

# depth of Stockfish evaluation
STOCKFISH_DEPTH = 0

# initialize matrices in memory
x_train = []
y_train = []

games = read_pgn_file("chess_solver\\data\\Carlsen.pgn")

# read a board from a game and evaluate the move played
for i, pgn_string in enumerate(games):
    pgn = chess.pgn.read_game(StringIO(pgn_string))
    board = pgn.board()

    for move in pgn.mainline_moves():
        board.push(move)
        
        evaluation = stockfish(board, STOCKFISH_DEPTH)
        if evaluation is not None:
            board_3d = split_dims(board)
            x_train.append(board_3d)
            y_train.append(evaluation)
            break
    print(i+1, '/', len(games))
print('Done')

# save as compressed .npz file
x_train = numpy.array(x_train)
y_train = numpy.array(y_train)
numpy.savez_compressed('dataset_2.npz', x_train=x_train, y_train=y_train)
