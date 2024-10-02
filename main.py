from flask import Flask, render_template, request, jsonify
from chess_solver.data.functions import *
from chess_solver.play import *
import chess

app = Flask(__name__)

# dashboard to "train" or "play" the bot
@app.route("/")
def index():
    return render_template("index.html")

# play against the bot or specatate the bot play against its self
@app.route("/play", methods=['POST'])
def play():
    return render_template("play.html", userOption=request.form['userOption'])

# update the board based on player input
@app.route("/updatePlayerMove", methods=['POST'])
def updatePlayerMove():
    board = json_to_board(request.get_json())
    move = request.get_json()['move']
    
    try:
        board.push_san(move)
        out = board_to_json(board)
        out['move'] = move
    except:
        print('ERROR: Invalid chess notation')
        out = board_to_json(board)
        out['move'] = False

    return jsonify(out)

# bots response to a board position
@app.route("/botMove", methods=['POST'])
def botMove():
    board = json_to_board(request.get_json())
    
    move = get_ai_move(board, 1)
    board.push(move)

    out = board_to_json(board)
    out['move'] = move.uci()
    print(out)
    
    return jsonify(out)

# continue trainnig the bot
@app.route("/train")
def train():
    return render_template("train.html")

app.run(host="127.0.0.1", port="5500", debug=True)
