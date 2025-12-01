var board = [];
var boardNumber = 8;

var board_history = []

var availableQueens = []
var rowAttempts = []

var solutionNumbers = []

//
// Create an array of Queens
// This list is used later to 'pick' from
// as we place queens on the board.
//
for (var i = 1; i <= boardNumber; i++)
{
    availableQueens.push(i)
    rowAttempts.push([])
}

var solutionCount = 0;

//
// Check a partial or full solution - the check is split
// into two parts; the first part checks that no two queens
// are in the same column.  The second part checks for any
// diagonal attacks.
//
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
    availableQueens.sort()
    //console.log("queenPlacer, availableQueens: ", availableQueens)
    for (var i = 0; i < availableQueens.length; i++)
    {
        const queen = availableQueens[i]

        if (rowAttempts[board.length].includes(queen)) {continue;}

        rowAttempts[board.length].push(queen)
        board.push(queen)

        board_history.push([...board])

        var valid = check(board)

        if (valid)
        {
            availableQueens.splice(i, 1)
            //console.log("queenPlacer, valid: ", board)
            return true;
        }
        else
        {
            //console.log("queenPlacer, invalid: ", board)
            board.pop()
        }
    }
    return false;
}

function backtrack()
{
    var isBacktrack = true;

    //console.log("Backtracking")
    
    while (isBacktrack && board.length > 0)
    {
        if (board.length < boardNumber)
        {
            rowAttempts[board.length] = []
        }

        availableQueens.push(board.pop())
        //board_history.push([...board])

        for (queen of availableQueens)
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
            solutionNumbers.push(board_history.length)
            // console.log(board)
            running = backtrack()
        }
        else if (!hasPlaced)
        {
            running = backtrack()
        }
    }
    //console.log(board_history)
    return [board_history, solutionNumbers]
}
