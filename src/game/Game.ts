class Game {
    player: {
        health: number;
        maxHealth: number;
        attack: number;
        defense: number;
        level: number;
    };
    enemy: {
        name: string;
        health: number;
        maxHealth: number;
        attack: number;
        defense: number;
    };
    enemyTypes = [
        { name: 'Goblin', health: 50, maxHealth: 50, attack: 8, defense: 3 },
        { name: 'Orc', health: 100, maxHealth: 100, attack: 12, defense: 5 },
        { name: 'Dragon', health: 200, maxHealth: 200, attack: 20, defense: 10 }
    ];

    constructor() {
        this.player = {
            health: 200,
            maxHealth: 200,
            attack: 10,
            defense: 5,
            level: 1
        };

        this.enemy = this.getRandomEnemy();

        this.initializeUI();
    }

    getRandomEnemy() {
        const randomIndex = Math.floor(Math.random() * this.enemyTypes.length);
        return { ...this.enemyTypes[randomIndex] };
    }

    initializeUI() {
        const attackButton = document.getElementById('attack-btn') as HTMLButtonElement | null;
        attackButton?.addEventListener('click', () => this.performBattle());
        this.updateStats();
    }

    performBattle() {
        const playerDamage = Math.max(1, Math.floor(this.player.attack * (0.8 + Math.random() * 0.4)) - this.enemy.defense);
        this.enemy.health = Math.max(0, this.enemy.health - playerDamage);
        this.log(`Player deals ${playerDamage} damage to ${this.enemy.name}!`);

        if (this.enemy.health > 0) {
            const enemyDamage = Math.max(1, Math.floor(this.enemy.attack * (0.8 + Math.random() * 0.4)) - this.player.defense);
            this.player.health = Math.max(0, this.player.health - enemyDamage);
            this.log(`${this.enemy.name} deals ${enemyDamage} damage to player!`);
        } else {
            this.log(`${this.enemy.name} defeated!`);
        }

        this.updateStats();
        this.checkGameEnd();
    }

    updateStats() {
        const playerHealthBar = document.getElementById('player-health-bar') as HTMLProgressElement | null;
        const enemyHealthBar = document.getElementById('enemy-health-bar') as HTMLProgressElement | null;
        const playerHealthText = document.getElementById('player-health-text') as HTMLDivElement | null;
        const enemyHealthText = document.getElementById('enemy-health-text') as HTMLDivElement | null;
        const playerAttack = document.getElementById('player-attack') as HTMLSpanElement | null;
        const playerDefense = document.getElementById('player-defense') as HTMLSpanElement | null;

        if (playerHealthBar && enemyHealthBar && playerHealthText && enemyHealthText && playerAttack && playerDefense) {
            playerHealthBar.value = this.player.health;
            playerHealthBar.max = this.player.maxHealth;
            enemyHealthBar.value = this.enemy.health;
            enemyHealthBar.max = this.enemy.maxHealth;

            playerHealthText.textContent = `${this.player.health} / ${this.player.maxHealth}`;
            enemyHealthText.textContent = `${this.enemy.health} / ${this.enemy.maxHealth}`;

            playerAttack.textContent = this.player.attack.toString();
            playerDefense.textContent = this.player.defense.toString();
        }
    }

    checkGameEnd() {
        const attackButton = document.getElementById('attack-btn') as HTMLButtonElement | null;
        if (this.player.health <= 0) {
            this.log('Game Over - You lost!');
            if (attackButton) attackButton.disabled = true;
        } else if (this.enemy.health <= 0) {
            this.log('Victory! You defeated the enemy!');
            if (attackButton) attackButton.disabled = true;
        }
    }

    log(message: string) {
        const battleLog = document.getElementById('battle-log') as HTMLDivElement | null;
        if (battleLog) {
            battleLog.innerHTML += `<div>${message}</div>`;
            battleLog.scrollTop = battleLog.scrollHeight;
        }
    }
}

window.onload = () => {
    new Game();
};

export default Game;