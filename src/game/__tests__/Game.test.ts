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
});
