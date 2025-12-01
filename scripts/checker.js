//var board = [8, 2, 5, 3, 1, 7, 4, 6]

function columnChecker(board)
{
    if (board.length == [...new Set(board)].length) {return true;}
    else {return false;}
}

function dcheck(board)
{
    for (var i = 0; i < board.length; i++)
    {
        var current = board[i];
        for (var j = i + 1; j < board.length; j++)
        {
            var checkers = board[j];
            if (current == (checkers + (j - i))) {return false;}
            else if (current == (checkers - (j - i))) {return false;}
        }
    }
    return true;
}

function grandChecker(board)
{
    if (columnChecker(board))
    {
        if (dcheck(board)) {return true;}
    }
    return false
}

//console.log(grandChecker(board))
