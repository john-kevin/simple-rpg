class Game {
    constructor() {
        this.player = {
            health: 200,
            attack: 10,
            defense: 5
        };
        
        this.enemy = {
            health: 50,
            attack: 8,
            defense: 3
        };
        
        this.initializeUI();
    }

    initializeUI() {
        document.getElementById('attack-btn').addEventListener('click', () => this.performBattle());
        this.updateStats();
    }

    performBattle() {
        // Player attacks enemy
        const playerDamage = Math.max(1, this.player.attack - this.enemy.defense);
        this.enemy.health = Math.max(0, this.enemy.health - playerDamage);
        this.log(`Player deals ${playerDamage} damage to enemy!`);

        // Enemy attacks player if still alive
        if (this.enemy.health > 0) {
            const enemyDamage = Math.max(1, this.enemy.attack - this.player.defense);
            this.player.health = Math.max(0, this.player.health - enemyDamage);
            this.log(`Enemy deals ${enemyDamage} damage to player!`);
        }

        this.updateStats();
        this.checkGameEnd();
    }

    updateStats() {
        document.getElementById('player-health').textContent = this.player.health;
        document.getElementById('enemy-health').textContent = this.enemy.health;
    }

    checkGameEnd() {
        if (this.player.health <= 0) {
            this.log('Game Over - You lost!');
            document.getElementById('attack-btn').disabled = true;
        } else if (this.enemy.health <= 0) {
            this.log('Victory! You defeated the enemy!');
            document.getElementById('attack-btn').disabled = true;
        }
    }

    log(message) {
        const battleLog = document.getElementById('battle-log');
        battleLog.innerHTML += `<div>${message}</div>`;
        battleLog.scrollTop = battleLog.scrollHeight;
    }
}

// Start the game when the page loads
window.onload = () => {
    new Game();
};
