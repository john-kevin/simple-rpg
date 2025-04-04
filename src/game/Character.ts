export interface CharacterStats {
    name: string;
    health: number;
    damage: number;
    defense: number;
    level?: number;
}

export class Character {
    name: string;
    health: number;
    damage: number;
    defense: number;
    level: number;

    constructor(stats: CharacterStats) {
        this.name = stats.name;
        this.health = stats.health
        this.damage = stats.damage;
        this.defense = stats.defense;
        this.level = stats.level || 1;
    }

    isAlive(): boolean {
        return this.health > 0; // Ensure health is strictly greater than 0
    }

    takeDamage(damage: number): void {
        const actualDamage = Math.max(1, damage - this.defense);
        this.health = Math.max(0, this.health - actualDamage);
    }

    attack(target: Character): void {
        const randomMultiplier = 0.8 + Math.random() * 0.4; // Random value between 0.8 and 1.2
        const randomDamage = Math.floor(this.damage * randomMultiplier);
        target.takeDamage(randomDamage);
    }

    getStats(): CharacterStats {
        return {
            name: this.name,
            health: this.health,
            damage: this.damage,
            defense: this.defense,
            level: this.level
        };
    }
}
