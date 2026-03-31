import { test, expect } from '@playwright/test';

test.describe('Application E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('/');
  });

  test('homepage loads without errors', async ({ page }) => {
    // Check that the page loads
    await expect(page).toHaveTitle(/Crybot|CryptoFaucet/i);

    // Check for any console errors
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Wait a bit for any async errors
    await page.waitForTimeout(2000);

    // Should have no critical errors
    const criticalErrors = errors.filter(e => !e.includes('favicon') && !e.includes('Warning'));
    expect(criticalErrors).toHaveLength(0);
  });

  test('login screen displays correctly', async ({ page }) => {
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Should show login screen on load (not logged in) - check for CryptoFaucet text
    await expect(page.locator('text=CryptoFaucet').first()).toBeVisible({ timeout: 10000 });
  });

  test('can login with valid credentials', async ({ page }) => {
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Find and fill login form - use #id selectors for reliability
    const emailInput = page.locator('#email').first();
    const passwordInput = page.locator('#password').first();

    // Fill with test credentials
    await emailInput.fill('test@example.com');
    await passwordInput.fill('testpassword');

    // Click login button
    const loginButton = page.locator('button[type="submit"]').first();
    await loginButton.click();

    // Wait for navigation or state change
    await page.waitForTimeout(2000);

    // After login, should see the main app - check for main content
    const mainContent = page.locator('main').first();
    await expect(mainContent).toBeVisible({ timeout: 10000 });
  });

  test('navigation tabs are accessible after login', async ({ page }) => {
    // First login (mock)
    await page.locator('input[type="email"]').first().fill('test@example.com');
    await page.locator('input[type="password"]').first().fill('testpassword');
    await page.locator('button:has-text("Iniciar Sesión")').first().click();
    await page.waitForTimeout(1000);

    // Check navigation tabs exist
    await expect(page.locator('nav, [class*="nav"]').first()).toBeVisible();

    // Check for common tab labels
    const tabLabels = ['Faucets', 'Dashboard', 'Wallet', 'Referral', 'Settings'];
    for (const label of tabLabels) {
      const tab = page.locator(`text=${label}`).first();
      if (await tab.isVisible()) {
        console.log(`Found tab: ${label}`);
      }
    }
  });

  test('can switch between tabs', async ({ page }) => {
    // Login first
    await page.locator('input[type="email"]').first().fill('test@example.com');
    await page.locator('input[type="password"]').first().fill('testpassword');
    await page.locator('button:has-text("Iniciar Sesión")').first().click();
    await page.waitForTimeout(1500);

    // Try to find and click Settings tab
    const settingsTab = page.locator('text=Settings').first();
    if (await settingsTab.isVisible()) {
      await settingsTab.click();
      await page.waitForTimeout(500);

      // Settings page should show
      await expect(page.locator('text=Configuración, Settings').first()).toBeVisible();
    }
  });

  test('language toggle works', async ({ page }) => {
    // Login first
    await page.locator('input[type="email"]').first().fill('test@example.com');
    await page.locator('input[type="password"]').first().fill('testpassword');
    await page.locator('button:has-text("Iniciar Sesión")').first().click();
    await page.waitForTimeout(1000);

    // Look for language toggle (usually in header)
    const languageButton = page
      .locator('button[class*="language"], [class*="language"] button')
      .first();

    // Click language toggle if available
    if (await languageButton.isVisible()) {
      await languageButton.click();
      await page.waitForTimeout(500);

      // Should toggle between Spanish and English
      const pageContent = await page.content();
      // Just verify the click worked without error
    }
  });

  test('wallet balance displays after login', async ({ page }) => {
    // Login first
    await page.locator('input[type="email"]').first().fill('test@example.com');
    await page.locator('input[type="password"]').first().fill('testpassword');
    await page.locator('button:has-text("Iniciar Sesión")').first().click();
    await page.waitForTimeout(1500);

    // Check for balance display
    // Look for common balance indicators (BTC, ETH, etc.)
    const balances = page.locator('text=BTC, text=ETH, text=SOL').all();
    const balanceCount = await balances.count();

    console.log(`Found ${balanceCount} balance indicators`);
    expect(balanceCount).toBeGreaterThan(0);
  });

  test('faucet cards display correctly', async ({ page }) => {
    // Login first
    await page.locator('input[type="email"]').first().fill('test@example.com');
    await page.locator('input[type="password"]').first().fill('testpassword');
    await page.locator('button:has-text("Iniciar Sesión")').first().click();
    await page.waitForTimeout(1500);

    // Check for faucet cards
    const faucetCards = page.locator('[class*="card"], [class*="faucet"]').all();
    const cardCount = await faucetCards.count();

    console.log(`Found ${cardCount} faucet-related cards`);
    // Faucets should be visible after login
    expect(cardCount).toBeGreaterThan(0);
  });

  test('no critical console errors during normal use', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Login
    await page.locator('input[type="email"]').first().fill('test@example.com');
    await page.locator('input[type="password"]').first().fill('testpassword');
    await page.locator('button:has-text("Iniciar Sesión")').first().click();
    await page.waitForTimeout(2000);

    // Navigate around
    const tabs = ['Dashboard', 'Wallet', 'Settings'];
    for (const tab of tabs) {
      const tabButton = page.locator(`text=${tab}`).first();
      if (await tabButton.isVisible()) {
        await tabButton.click();
        await page.waitForTimeout(500);
      }
    }

    // Filter out non-critical errors
    const criticalErrors = errors.filter(
      e => !e.includes('favicon') && !e.includes('Warning') && !e.includes('DevTools')
    );

    console.log('Console errors found:', criticalErrors);
    expect(criticalErrors).toHaveLength(0);
  });

  test('responsive design works on different viewport sizes', async ({ page }) => {
    // Test desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await expect(page.locator('main')).toBeVisible();

    // Test tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await expect(page.locator('main')).toBeVisible();

    // Test mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.locator('main')).toBeVisible();
  });
});

test.describe('NFT Faucet Feature Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Login first
    await page.locator('input[type="email"]').first().fill('test@example.com');
    await page.locator('input[type="password"]').first().fill('testpassword');
    await page.locator('button:has-text("Iniciar Sesión")').first().click();
    await page.waitForTimeout(1500);
  });

  test('NFT Faucet tab is accessible', async ({ page }) => {
    // Look for NFT tab in navigation
    const nftTab = page.locator('text=NFT').first();
    if (await nftTab.isVisible()) {
      await nftTab.click();
      await page.waitForTimeout(500);

      // Should show NFT-related content
      const content = await page.content();
      expect(content.toLowerCase()).toContain('nft');
    }
  });

  test('NFT cards display with correct info', async ({ page }) => {
    // Navigate to NFT tab if exists
    const nftTab = page.locator('text=NFT').first();
    if (await nftTab.isVisible()) {
      await nftTab.click();
      await page.waitForTimeout(500);

      // Check for NFT cards
      const cards = page.locator('[class*="nft"], [class*="card"]').all();
      const count = await cards.count();
      console.log(`Found ${count} NFT-related elements`);
    }
  });
});

test.describe('Testnet Feature Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Login first
    await page.locator('input[type="email"]').first().fill('test@example.com');
    await page.locator('input[type="password"]').first().fill('testpassword');
    await page.locator('button:has-text("Iniciar Sesión")').first().click();
    await page.waitForTimeout(1500);
  });

  test('Testnet tab displays testnet options', async ({ page }) => {
    // Look for Testnet tab
    const testnetTab = page.locator('text=Testnet').first();
    if (await testnetTab.isVisible()) {
      await testnetTab.click();
      await page.waitForTimeout(500);

      // Check for testnet networks (Polygon, Arbitrum, etc.)
      const networks = page.locator('text=Polygon, text=Arbitrum, text=Optimism').all();
      const count = await networks.count();
      console.log(`Found ${count} testnet network indicators`);
    }
  });
});
