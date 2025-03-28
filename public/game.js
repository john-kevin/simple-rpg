class Game {
    constructor() {
        this.player = {
            health: 200,
            maxHealth: 200,
            attack: 10,
            defense: 5,
            level: 1,
            experience: 0,
            experienceToNextLevel: 100
        };

        this.enemy = {
            health: 50,
            maxHealth: 50,
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
        const playerDamage = Math.max(1, Math.floor(this.player.attack * (0.8 + Math.random() * 0.4)) - this.enemy.defense);
        this.enemy.health = Math.max(0, this.enemy.health - playerDamage);
        this.log(`Player deals ${playerDamage} damage to enemy!`);

        // Enemy attacks player if still alive
        if (this.enemy.health > 0) {
            const enemyDamage = Math.max(1, Math.floor(this.enemy.attack * (0.8 + Math.random() * 0.4)) - this.player.defense);
            this.player.health = Math.max(0, this.player.health - enemyDamage);
            this.log(`Enemy deals ${enemyDamage} damage to player!`);
        } else {
            this.gainExperience(50); // Grant XP for defeating the enemy
            this.log('Enemy defeated! You gained 50 XP.');
        }

        this.updateStats();
        this.checkGameEnd();
    }

    gainExperience(amount) {
        this.player.experience += amount;
        if (this.player.experience >= this.player.experienceToNextLevel) {
            this.levelUp();
        }
    }

    levelUp() {
        this.player.level++;
        this.player.experience -= this.player.experienceToNextLevel;
        this.player.experienceToNextLevel = Math.floor(this.player.experienceToNextLevel * 1.5);
        this.player.maxHealth += 20;
        this.player.health = this.player.maxHealth;
        this.player.attack += 2;
        this.player.defense += 1;
        this.log(`Level up! You are now level ${this.player.level}.`);
    }

    updateStats() {
        document.getElementById('player-health-bar').value = this.player.health;
        document.getElementById('player-health-bar').max = this.player.maxHealth;
        document.getElementById('enemy-health-bar').value = this.enemy.health;
        document.getElementById('enemy-health-bar').max = this.enemy.maxHealth;

        document.getElementById('player-health-text').textContent = `${this.player.health} / ${this.player.maxHealth}`;
        document.getElementById('enemy-health-text').textContent = `${this.enemy.health} / ${this.enemy.maxHealth}`;

        document.getElementById('player-attack').textContent = this.player.attack;
        document.getElementById('player-defense').textContent = this.player.defense;

        // Update experience bar
        document.getElementById('player-experience-bar').value = this.player.experience;
        document.getElementById('player-experience-bar').max = this.player.experienceToNextLevel;
        document.getElementById('player-experience-text').textContent = `${this.player.experience} / ${this.player.experienceToNextLevel}`;
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
