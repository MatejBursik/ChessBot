import chess, numpy, random, chess.engine

def json_to_board(json):
    fen = ''

    for line in json['board']:
        empty = 0
        for square in line:
            if square == '': #empty
                empty += 1
            else:
                if empty > 0:
                    fen += str(empty)
                if square[1] == 'l': # white
                    fen += square[0].upper()
                    empty = 0
                elif square[1] == 'd': # black
                    fen += square[0]
                    empty = 0
        if empty > 0:
            fen += str(empty)
        fen += '/'
    
    fen = fen[0:-1] + ' ' + json['color'][0] # !!! issues that castling and number of moves are not represented in fen

    return chess.Board(fen=fen)

def board_to_json(board):
    fen = board.fen()
    json = {'board' : []}
    line = []

    for c in fen:
        if c == '/':
            json['board'].append(line.copy())
            line = []
        elif c.isdigit():
            for _ in range(int(c)):
                line.append('')
        elif c.isupper():
            line.append(c.lower() + 'l')
        elif c.islower():
            line.append(c.lower() + 'd')
        elif c == ' ':
            json['board'].append(line.copy())
            break

    return json

def random_board():
    board = chess.Board()
    # set number of turns to randomly play
    depth = random.randrange(0, 200)
    # play a random move until either the game ends or the depth is reached
    for _ in range(depth):
        all_moves = list(board.legal_moves)
        random_move = random.choice(all_moves)
        board.push(random_move)
        if board.is_game_over():
            break

    return board

# evaluate the board using Stockfish at the specified depth
def stockfish(board, depth):
    with chess.engine.SimpleEngine.popen_uci(r'C:\Users\matej\Desktop\Programing\ChessBot\chess_solver\stockfish\stockfish-windows-x86-64-avx2.exe') as sf:
        result = sf.analyse(board, chess.engine.Limit(depth=depth))
        score = result['score'].white().score()
    
    return score

# board indices
squares_index = {
    'a': 0,
    'b': 1,
    'c': 2,
    'd': 3,
    'e': 4,
    'f': 5,
    'g': 6,
    'h': 7
}

def square_to_index(square):
    letter = chess.square_name(square)
    return 8 - int(letter[1]), squares_index[letter[0]]

def split_dims(board):
    # 3d matrix representation of the board
    board_3d = numpy.zeros((14, 8, 8), dtype=numpy.int8)

    # adding piece's to matrix
    for piece in chess.PIECE_TYPES:
        # white
        for square in board.pieces(piece, chess.WHITE):
            idx = numpy.unravel_index(square, (8, 8))
            board_3d[piece - 1][7 - idx[0]][idx[1]] = 1
        # black
        for square in board.pieces(piece, chess.BLACK):
            idx = numpy.unravel_index(square, (8, 8))
            board_3d[piece + 5][7 - idx[0]][idx[1]] = 1

    # adding attacks and valid moves
    current_turn = board.turn
    board.turn = chess.WHITE
    for move in board.legal_moves:
        i, j = square_to_index(move.to_square)
        board_3d[12][i][j] = 1

    board.turn = chess.BLACK
    for move in board.legal_moves:
        i, j = square_to_index(move.to_square)
        board_3d[13][i][j] = 1
    board.turn = current_turn

    return board_3d

def read_pgn_file(path):
    games = []

    with open(path) as pgn_file:
        blocks = []
        game = """"""
        for line in pgn_file:
            if line == '\n':
                blocks.append(game)
                game = """"""
                if len(blocks) == 2:
                    games.append("""\n""".join(blocks))
                    blocks = []
                continue
            game += line

    return games