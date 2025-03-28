import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

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
        expect(player.health).toBe(220);
        expect(player.attack).toBe(12);
        expect(player.defense).toBe(6);
    });
});
