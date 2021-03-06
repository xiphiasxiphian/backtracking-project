var board = [];
var boardNumber = 8;

var board_history = []

var avaliableQueens = []
var rowAttempts = []

for (var i = 1; i <= boardNumber; i++)
{
    avaliableQueens.push(i)
    rowAttempts.push([])
}

var solutionCount = 0;

function check(checkBoard)
{
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

    if (grandChecker(checkBoard)) {return true;}
    else {return false;}
}


function queenPlacer()
{
    for (var i = 0; i < avaliableQueens.length; i++)
    {
        const queen = avaliableQueens[i]

        if (rowAttempts[board.length].includes(queen)) {continue;}

        rowAttempts[board.length].push(queen)
        board.push(queen)

        board_history.push([...board])

        var valid = check(board)

        if (valid)
        {
            avaliableQueens.splice(i, 1)
            return true;
        }
        else
        {
            board.pop()
        }
    }
    return false;
}

function backtrack()
{
    var isBacktrack = true;

    while (isBacktrack && board.length > 0)
    {
        if (board.length < boardNumber)
        {
            rowAttempts[board.length] = []
        }

        avaliableQueens.push(board.pop())
        board_history.push([...board])

        for (queen of avaliableQueens)
        {
            if (!(rowAttempts[board.length].includes(queen)))
            {
                isBacktrack = false;
            }
        }
    }

    if (isBacktrack)
    {
        console.log("complete")
        console.log("Found " + solutionCount + " solutions")
        return false;
    }
    return true;
}


function run()
{
    var running = true;
    while (running)
    {
        var hasPlaced = queenPlacer();

        if (hasPlaced && (board.length != boardNumber)) {continue;}
        else if (hasPlaced && (board.length == boardNumber))
        {
            solutionCount++;
            console.log(board)
            running = backtrack()
        }
        else if (!hasPlaced)
        {
            running = backtrack()
        }
    }
    console.log(board_history)
    return board_history
}

run()
