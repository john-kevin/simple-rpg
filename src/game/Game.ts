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
        name: string;
        health: number;
        maxHealth: number;
        attack: number;
        defense: number;
        experienceReward: number;
    };
    enemyTypes = [
        { name: 'Goblin', health: 50, maxHealth: 50, attack: 8, defense: 3, experienceReward: 50 },
        { name: 'Orc', health: 100, maxHealth: 100, attack: 12, defense: 5, experienceReward: 100 },
        { name: 'Dragon', health: 200, maxHealth: 200, attack: 20, defense: 10, experienceReward: 200 }
    ];

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
        
        const enemyNameElement = document.getElementById('enemy-name') as HTMLDivElement | null;
        if (enemyNameElement) {
            enemyNameElement.textContent = this.enemy.name; // Set enemy name in the UI
        }

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
            this.gainExperience(this.enemy.experienceReward);
            this.log(`${this.enemy.name} defeated! You gained ${this.enemy.experienceReward} XP.`);
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
        const enemyName = document.getElementById('enemy-name') as HTMLDivElement | null;

        if (playerHealthBar && enemyHealthBar && playerHealthText && enemyHealthText && playerAttack && playerDefense && playerExperienceBar && playerExperienceText && enemyName) {
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

            enemyName.textContent = this.enemy.name; // Display enemy type
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