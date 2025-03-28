import { Character, CharacterStats } from '../Character';

describe('Character', () => {
    let testStats: CharacterStats;
    
    beforeEach(() => {
        testStats = {
            name: 'Test Hero',
            health: 200,
            damage: 10,
            defense: 5
        };
    });

    test('should create character with correct stats', () => {
        const character = new Character(testStats);
        expect(character.getStats()).toEqual({
            ...testStats,
            level: 1
        });
    });

    test('should be alive when health is above 0', () => {
        const character = new Character(testStats);
        expect(character.isAlive()).toBe(true);
    });

    test('should be dead when health is 0', () => {
        const character = new Character({ ...testStats, health: 0 });
        expect(character.isAlive()).toBe(false);
    });

    test('should take damage correctly', () => {
        const character = new Character(testStats);
        const damage = 20;
        character.takeDamage(damage);
        expect(character.health).toBe(185); // Fixed syntax error
    });

    test('should not go below 0 health when taking damage', () => {
        const character = new Character(testStats);
        character.takeDamage(1000);
        expect(character.health).toBe(0);
    });

    test('should deal damage to target', () => {
        const attacker = new Character(testStats);
        const defender = new Character({
            name: 'Test Enemy',
            health: 50,
            damage: 5,
            defense: 3
        });

        attacker.attack(defender);
        expect(defender.health).toBe(43);
    });
});
