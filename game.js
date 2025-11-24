class LinkLinkGame {
    constructor() {
        this.board = [];
        this.selectedCells = [];
        this.score = 0;
        this.timeLeft = 300; // 5分钟
        this.timer = null;
        this.isGameOver = false;
        
        // 游戏难度配置
        this.levels = {
            easy: { rows: 6, cols: 6, types: 8 },
            medium: { rows: 8, cols: 8, types: 12 },
            hard: { rows: 10, cols: 10, types: 16 }
        };
        
        this.currentLevel = 'medium';
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.startGame();
    }
    
    bindEvents() {
        // 重新开始按钮
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restartGame();
        });
        
        // 难度选择
        document.getElementById('level').addEventListener('change', (e) => {
            this.currentLevel = e.target.value;
            this.restartGame();
        });
    }
    
    startGame() {
        this.createBoard();
        this.renderBoard();
        this.startTimer();
        this.updateScore();
        this.showMessage('游戏开始！选择两个相同的图标进行连接', 'info');
    }
    
    createBoard() {
        const level = this.levels[this.currentLevel];
        const totalCells = level.rows * level.cols;
        
        // 确保总格子数是偶数
        if (totalCells % 2 !== 0) {
            throw new Error('棋盘格子数必须是偶数');
        }
        
        // 创建图标数组（每个图标出现两次）
        const icons = [];
        for (let i = 0; i < totalCells / 2; i++) {
            const icon = String.fromCharCode(65 + (i % level.types)); // A-Z
            icons.push(icon, icon);
        }
        
        // 随机打乱图标
        this.shuffleArray(icons);
        
        // 创建棋盘
        this.board = [];
        for (let i = 0; i < level.rows; i++) {
            const row = [];
            for (let j = 0; j < level.cols; j++) {
                const index = i * level.cols + j;
                row.push({
                    icon: icons[index],
                    row: i,
                    col: j,
                    matched: false
                });
            }
            this.board.push(row);
        }
    }
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    renderBoard() {
        const gameBoard = document.getElementById('game-board');
        const level = this.levels[this.currentLevel];
        
        // 设置网格布局
        gameBoard.style.gridTemplateColumns = `repeat(${level.cols}, 1fr)`;
        gameBoard.style.gridTemplateRows = `repeat(${level.rows}, 1fr)`;
        
        // 清空棋盘
        gameBoard.innerHTML = '';
        
        // 渲染每个格子
        for (let i = 0; i < level.rows; i++) {
            for (let j = 0; j < level.cols; j++) {
                const cell = this.board[i][j];
                const cellElement = document.createElement('div');
                cellElement.className = 'cell';
                cellElement.textContent = cell.matched ? '' : cell.icon;
                
                if (cell.matched) {
                    cellElement.classList.add('empty');
                }
                
                cellElement.addEventListener('click', () => {
                    this.handleCellClick(i, j);
                });
                
                gameBoard.appendChild(cellElement);
            }
        }
    }
    
    handleCellClick(row, col) {
        if (this.isGameOver) return;
        
        const cell = this.board[row][col];
        
        // 如果格子已经匹配或者是空白的，则忽略点击
        if (cell.matched) return;
        
        // 如果已经选中了这个格子，则取消选中
        if (this.isCellSelected(row, col)) {
            this.deselectCell(row, col);
            return;
        }
        
        // 如果已经选中了两个格子，则清空选择
        if (this.selectedCells.length >= 2) {
            this.clearSelection();
        }
        
        // 选中格子
        this.selectCell(row, col);
        
        // 如果选中了两个格子，检查是否可以连接
        if (this.selectedCells.length === 2) {
            this.checkConnection();
        }
    }
    
    isCellSelected(row, col) {
        return this.selectedCells.some(cell => cell.row === row && cell.col === col);
    }
    
    selectCell(row, col) {
        this.selectedCells.push(this.board[row][col]);
        this.updateCellSelection();
    }
    
    deselectCell(row, col) {
        this.selectedCells = this.selectedCells.filter(
            cell => !(cell.row === row && cell.col === col)
        );
        this.updateCellSelection();
    }
    
    clearSelection() {
        this.selectedCells = [];
        this.updateCellSelection();
    }
    
    updateCellSelection() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => cell.classList.remove('selected'));
        
        this.selectedCells.forEach(cell => {
            const index = cell.row * this.levels[this.currentLevel].cols + cell.col;
            if (cells[index]) {
                cells[index].classList.add('selected');
            }
        });
    }
    
    checkConnection() {
        const [cell1, cell2] = this.selectedCells;
        
        // 检查两个格子是否相同
        if (cell1.icon !== cell2.icon) {
            this.showMessage('图标不匹配！', 'error');
            setTimeout(() => {
                this.clearSelection();
            }, 1000);
            return;
        }
        
        // 检查是否可以连接
        if (this.canConnect(cell1, cell2)) {
            this.matchCells(cell1, cell2);
        } else {
            this.showMessage('无法连接这两个图标！', 'error');
            setTimeout(() => {
                this.clearSelection();
            }, 1000);
        }
    }
    
    canConnect(cell1, cell2) {
        // 简单的直线连接检查（实际连连看游戏需要更复杂的路径检查）
        // 这里简化实现，只检查相邻或直线连接
        
        // 如果是相邻格子
        if ((Math.abs(cell1.row - cell2.row) === 1 && cell1.col === cell2.col) ||
            (Math.abs(cell1.col - cell2.col) === 1 && cell1.row === cell2.row)) {
            return true;
        }
        
        // 如果在同一行且中间没有障碍物
        if (cell1.row === cell2.row) {
            const start = Math.min(cell1.col, cell2.col);
            const end = Math.max(cell1.col, cell2.col);
            for (let col = start + 1; col < end; col++) {
                if (!this.board[cell1.row][col].matched) {
                    return false;
                }
            }
            return true;
        }
        
        // 如果在同一列且中间没有障碍物
        if (cell1.col === cell2.col) {
            const start = Math.min(cell1.row, cell2.row);
            const end = Math.max(cell1.row, cell2.row);
            for (let row = start + 1; row < end; row++) {
                if (!this.board[row][cell1.col].matched) {
                    return false;
                }
            }
            return true;
        }
        
        return false;
    }
    
    matchCells(cell1, cell2) {
        cell1.matched = true;
        cell2.matched = true;
        
        // 更新分数
        this.score += 10;
        this.updateScore();
        
        // 显示匹配动画
        this.showMatchAnimation(cell1, cell2);
        
        // 清空选择
        this.clearSelection();
        
        // 重新渲染棋盘
        setTimeout(() => {
            this.renderBoard();
            this.checkGameStatus();
        }, 500);
        
        this.showMessage('匹配成功！+10分', 'success');
    }
    
    showMatchAnimation(cell1, cell2) {
        const cells = document.querySelectorAll('.cell');
        const level = this.levels[this.currentLevel];
        
        const index1 = cell1.row * level.cols + cell1.col;
        const index2 = cell2.row * level.cols + cell2.col;
        
        if (cells[index1]) cells[index1].classList.add('matched');
        if (cells[index2]) cells[index2].classList.add('matched');
    }
    
    checkGameStatus() {
        // 检查是否所有格子都已匹配
        const allMatched = this.board.every(row => 
            row.every(cell => cell.matched)
        );
        
        if (allMatched) {
            this.gameWin();
        }
    }
    
    gameWin() {
        this.isGameOver = true;
        clearInterval(this.timer);
        this.showMessage(`恭喜！游戏胜利！最终得分: ${this.score}`, 'success');
    }
    
    gameOver() {
        this.isGameOver = true;
        clearInterval(this.timer);
        this.showMessage('时间到！游戏结束', 'error');
    }
    
    startTimer() {
        clearInterval(this.timer);
        this.timeLeft = 300;
        this.updateTimer();
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimer();
            
            if (this.timeLeft <= 0) {
                this.gameOver();
            }
        }, 1000);
    }
    
    updateTimer() {
        document.getElementById('time').textContent = this.timeLeft;
    }
    
    updateScore() {
        document.getElementById('score').textContent = this.score;
    }
    
    showMessage(message, type = 'info') {
        const messageElement = document.getElementById('message');
        messageElement.textContent = message;
        messageElement.className = `game-message ${type}`;
        
        // 3秒后自动清除消息
        setTimeout(() => {
            if (messageElement.textContent === message) {
                messageElement.textContent = '';
                messageElement.className = 'game-message';
            }
        }, 3000);
    }
    
    restartGame() {
        this.selectedCells = [];
        this.score = 0;
        this.isGameOver = false;
        clearInterval(this.timer);
        this.startGame();
    }
}

// 初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    new LinkLinkGame();
});