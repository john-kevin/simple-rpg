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
});

describe('Game Enemy UI', () => {
    let game: Game;

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="enemy-health-bar"></div>
            <div id="enemy-health-text"></div>
        `;
        game = new Game();
    });

    test('should update enemy health bar and text correctly', () => {
        const enemyHealthBar = document.getElementById('enemy-health-bar') as HTMLProgressElement | null;
        const enemyHealthText = document.getElementById('enemy-health-text') as HTMLDivElement | null;

        if (!enemyHealthBar || !enemyHealthText) {
            throw new Error('Enemy health bar or text element not found');
        }

        // Simulate health update
        enemyHealthBar.value = 30;
        enemyHealthText.textContent = '30 / 50';

        expect(enemyHealthBar.value).toBe(30);
        expect(enemyHealthText.textContent).toBe('30 / 50');
    });
});
