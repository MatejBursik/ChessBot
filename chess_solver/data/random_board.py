import chess, numpy
from functions import *

# set length of dataset and depth of Stockfish evaluation
NUM_TO_SIM = 10000
STOCKFISH_DEPTH = 0

# initialize matrices in memory
x_train = numpy.full((NUM_TO_SIM, 14, 8, 8), 0)
y_train = numpy.full(NUM_TO_SIM, 0)

# generate data
for i in range(NUM_TO_SIM):
    # generate a random board that has a valid evaluation
    while 1:
        board = random_board()
        evaluation = stockfish(board, STOCKFISH_DEPTH)
        if evaluation is not None:
            board = split_dims(board)
            x_train[i, :, :, :] = board
            y_train[i] = evaluation
            break

    print(round((i / NUM_TO_SIM) * 100, 6))
print('Done')

# save as compressed .npz file
numpy.savez_compressed('dataset_2.npz', x_train=x_train, y_train=y_train)