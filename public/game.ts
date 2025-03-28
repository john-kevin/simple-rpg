class Game {
    player: {
        health: number;
        maxHealth: number;
        attack: number;
        defense: number;
        level: number;
        experience: number;
        experienceToNextLevel: number;
    };
    enemy: {
        health: number;
        maxHealth: number;
        attack: number;
        defense: number;
    };

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
        const attackButton = document.getElementById('attack-btn') as HTMLButtonElement | null;
        attackButton?.addEventListener('click', () => this.performBattle());
        this.updateStats();
    }

    performBattle() {
        const playerDamage = Math.max(1, Math.floor(this.player.attack * (0.8 + Math.random() * 0.4)) - this.enemy.defense);
        this.enemy.health = Math.max(0, this.enemy.health - playerDamage);
        this.log(`Player deals ${playerDamage} damage to enemy!`);

        if (this.enemy.health > 0) {
            const enemyDamage = Math.max(1, Math.floor(this.enemy.attack * (0.8 + Math.random() * 0.4)) - this.player.defense);
            this.player.health = Math.max(0, this.player.health - enemyDamage);
            this.log(`Enemy deals ${enemyDamage} damage to player!`);
        } else {
            this.gainExperience(50);
            this.log('Enemy defeated! You gained 50 XP.');
        }

        this.updateStats();
        this.checkGameEnd();
    }

    gainExperience(amount: number) {
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
        const playerHealthBar = document.getElementById('player-health-bar') as HTMLProgressElement | null;
        const enemyHealthBar = document.getElementById('enemy-health-bar') as HTMLProgressElement | null;
        const playerHealthText = document.getElementById('player-health-text') as HTMLDivElement | null;
        const enemyHealthText = document.getElementById('enemy-health-text') as HTMLDivElement | null;
        const playerAttack = document.getElementById('player-attack') as HTMLSpanElement | null;
        const playerDefense = document.getElementById('player-defense') as HTMLSpanElement | null;
        const playerExperienceBar = document.getElementById('player-experience-bar') as HTMLProgressElement | null;
        const playerExperienceText = document.getElementById('player-experience-text') as HTMLDivElement | null;

        if (playerHealthBar && enemyHealthBar && playerHealthText && enemyHealthText && playerAttack && playerDefense && playerExperienceBar && playerExperienceText) {
            playerHealthBar.value = this.player.health;
            playerHealthBar.max = this.player.maxHealth;
            enemyHealthBar.value = this.enemy.health;
            enemyHealthBar.max = this.enemy.maxHealth;

            playerHealthText.textContent = `${this.player.health} / ${this.player.maxHealth}`;
            enemyHealthText.textContent = `${this.enemy.health} / ${this.enemy.maxHealth}`;

            playerAttack.textContent = this.player.attack.toString();
            playerDefense.textContent = this.player.defense.toString();

            playerExperienceBar.value = this.player.experience;
            playerExperienceBar.max = this.player.experienceToNextLevel;
            playerExperienceText.textContent = `${this.player.experience} / ${this.player.experienceToNextLevel}`;
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
