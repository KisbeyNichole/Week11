$(document).ready(function() {
    let currentPlayer = 'X';
    let turnCount = 0;
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    $('.cell').on('click', function() {
        if ($(this).text() === '') {
            $(this).text(currentPlayer);
            turnCount++;
            updateProgressBar();
            if (checkWin(currentPlayer)) {
                showAlert(`${currentPlayer} wins!`);
            } else if (turnCount === 9) {
                showAlert('It\'s a draw!');
            } else {
                switchPlayer();
            }
        } else {
            showAlert('Cell already taken! Choose another cell.');
        }
    });

    $('#restart-button').on('click', function() {
        resetGame();
    });

    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        $('#turn-indicator').text(`Player ${currentPlayer === 'X' ? 1 : 2}'s turn`);
    }

    function checkWin(player) {
        const cells = $('.cell').map((index, cell) => $(cell).text()).get();
        return winningCombinations.some(combination => 
            combination.every(index => cells[index] === player)
        );
    }

    function showAlert(message) {
        $('#alert-message').text(message);
        $('#alert-box').removeClass('hidden').show();
        $('.cell').off('click');
    }

    function resetGame() {
        $('.cell').text('').on('click', function() {
            if ($(this).text() === '') {
                $(this).text(currentPlayer);
                turnCount++;
                updateProgressBar();
                if (checkWin(currentPlayer)) {
                    showAlert(`${currentPlayer} wins!`);
                } else if (turnCount === 9) {
                    showAlert('It\'s a draw!');
                } else {
                    switchPlayer();
                }
            } else {
                showAlert('Cell already taken! Choose another cell.');
            }
        });
        currentPlayer = 'X';
        turnCount = 0;
        updateProgressBar();
        $('#turn-indicator').text(`Player 1's turn`);
        $('#alert-box').addClass('hidden').hide();
    }

    function updateProgressBar() {
        const progress = (turnCount / 9) * 100;
        $('#progress-bar').css('width', `${progress}%`);
    }
});
