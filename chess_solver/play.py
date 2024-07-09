import numpy, chess
#from functions import * # for test.py
from chess_solver.functions import *
from tensorflow.keras.models import load_model

def minimax_eval(board):
    board_3d = split_dims(board)
    board_3d = numpy.expand_dims(board_3d, 0)
    model = load_model('chess_solver/model_v1.h5')

    return model.predict(board_3d)[0][0]

def minimax(board, depth, alpha, beta, maximizing_player):
    if depth == 0 or board.is_game_over():
        return minimax_eval(board)
    
    if maximizing_player:
        max_eval = -numpy.inf
        for move in board.legal_moves:
            board.push(move)
            eval = minimax(board, depth-1, alpha, beta, False)
            board.pop()
            max_eval= max(max_eval, eval)
            alpha = max(alpha, eval)
            if beta <= alpha:
                break

        return max_eval
    else:
        min_eval = numpy.inf
        for move in board.legal_moves:
            board.push(move)
            eval = minimax(board, depth-1, alpha, beta, True)
            board.pop()
            min_eval= min(min_eval, eval)
            beta = min(beta, eval)
            if beta <= alpha:
                break

        return min_eval
    
def get_ai_move(board, depth):
    max_move = None
    max_eval = -numpy.inf

    for move in board.legal_moves:
        board.push(move)
        eval = minimax(board, depth-1, -numpy.inf, numpy.inf, False)
        board.pop()
        if eval > max_eval:
            max_eval = eval
            max_move = move

    return max_move
