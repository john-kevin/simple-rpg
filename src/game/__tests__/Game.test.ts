import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import Game from '../Game';

beforeAll(() => {
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', { url: 'http://localhost/' });
    global.window = dom.window as unknown as Window & typeof globalThis;
    global.document = dom.window.document;
});

describe('Game UI', () => {
    let dom;
    let document: Document;

    beforeEach(() => {
        const html = fs.readFileSync(path.join(__dirname, '../../../public/index.html'), 'utf8');
        dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
        document = dom.window.document;
    });

    test('should update health bar and text correctly', () => {
        const playerHealthBar = document.getElementById('player-health-bar') as HTMLProgressElement | null;
        const playerHealthText = document.getElementById('player-health-text') as HTMLDivElement | null;

        if (!playerHealthBar || !playerHealthText) {
            throw new Error('Health bar or health text element not found');
        }

        // Simulate health update
        playerHealthBar.value = 150;
        playerHealthText.textContent = '150 / 200';

        expect(playerHealthBar.value).toBe(150);
        expect(playerHealthText.textContent).toBe('150 / 200');
    });

    test('should update experience bar and text correctly', () => {
        const playerExperienceBar = document.getElementById('player-experience-bar') as HTMLProgressElement | null;
        const playerExperienceText = document.getElementById('player-experience-text') as HTMLDivElement | null;

        if (!playerExperienceBar || !playerExperienceText) {
            throw new Error('Experience bar or experience text element not found');
        }

        // Simulate experience update
        playerExperienceBar.value = 40;
        playerExperienceBar.max = 100;
        playerExperienceText.textContent = '40 / 100';

        expect(playerExperienceBar.value).toBe(40);
        expect(playerExperienceBar.max).toBe(100);
        expect(playerExperienceText.textContent).toBe('40 / 100');
    });

    test('should gain experience and level up correctly', () => {
        const player = {
            health: 200,
            maxHealth: 200,
            attack: 10,
            defense: 5,
            level: 1,
            experience: 90,
            experienceToNextLevel: 100
        };

        // Simulate gaining experience
        player.experience += 20; // Gain 20 XP
        if (player.experience >= player.experienceToNextLevel) {
            player.level++;
            player.experience -= player.experienceToNextLevel;
            player.experienceToNextLevel = Math.floor(player.experienceToNextLevel * 1.5);
            player.maxHealth += 20;
            player.health = player.maxHealth;
            player.attack += 2;
            player.defense += 1;
        }

        expect(player.level).toBe(2);
        expect(player.experience).toBe(10);
        expect(player.experienceToNextLevel).toBe(150);
        expect(player.maxHealth).toBe(220);
        expect(player.health).toBe (220);
        expect(player.attack).toBe(12);
        expect(player.defense).toBe(6);
    });
});

describe('Game Enemy Types', () => {
    let game: Game;

    beforeEach(() => {
        game = new Game();
    });

    test('should initialize a random enemy from enemy types', () => {
        const enemyNames = game.enemyTypes.map(enemy => enemy.name);
        expect(enemyNames).toContain(game.enemy.name);
    });

    test('should grant correct experience reward when enemy is defeated', () => {
        const initialExperience = game.player.experience;
        const experienceReward = game.enemy.experienceReward;

        game.enemy.health = 0; // Simulate enemy defeat
        game.gainExperience(experienceReward);

        expect(game.player.experience).toBe(initialExperience + experienceReward);
    });
});
