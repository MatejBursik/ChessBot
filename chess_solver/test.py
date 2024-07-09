import numpy, chess
from play import *

# game test
board = chess.Board()

while True:
    move = get_ai_move(board, 1)
    print(type(move))
    board.push(move)
    print(f'\n{board}')
    if board.is_game_over():
        break

    r = input('Next move: ')
