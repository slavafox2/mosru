// @ts-check
const { test, expect } = require('@playwright/test');



test.describe('New Todo', () => {
  test('Test 1', async ({ page }) => {

    await page.goto('http://89.189.152.235:1337/?path=/story/eos-tabs--default');
    // Click div[role="tab"]:has-text("Вкладка 799+")
    await page.frameLocator('#storybook-preview-iframe').locator('div[role="tab"]:has-text("Вкладка 799+")').click();
    await expect(page.frameLocator('#storybook-preview-iframe').locator('text=Текст 7')).toHaveText('Текст 7');
    await page.waitForTimeout(5000)
  });

  test('Test 2', async ({ page }) => {

    await page.goto('http://89.189.152.235:1337/?path=/story/eos-timepicker--in-form');

    // Click svg
    await page.frameLocator('#storybook-preview-iframe').locator('.eos-field-suffix-icon').click();
   
    // Click text=Сейчас
    await page.frameLocator('#storybook-preview-iframe').locator('text=Сейчас').click();

    // Click button:has-text("Submit")
    await page.frameLocator('#storybook-preview-iframe').locator('button:has-text("Submit")').click();
   
    const currentTime = new Date().toString().slice(0, 33);
    
    // Message showed both a current time and the field class=".os-message-wrapper" contains a current time
    const textWrapper =  page.frameLocator('#storybook-preview-iframe').locator('.eos-message-wrapper');
    await expect(textWrapper).toHaveText('Значение поля: ' + currentTime);
    
    // If the field class=".eos-picker-input" doesn't contains a current time
    let textInput =  page.frameLocator('#storybook-preview-iframe').locator('.eos-picker-input');
    await expect(textInput).toBeEmpty()
   
  });

  test.only('Test 3', async ({ page }) => {

    await page.goto('http://89.189.152.235:1337/?path=/story/eos-twincolumn--default');
    
    const title4= '{4} Заголовок';
    
    await page.frameLocator('#storybook-preview-iframe').locator('text=' + title4).click();

    // await page.frameLocator('#storybook-preview-iframe').locator('button').nth(3).click();
    await page.frameLocator('#storybook-preview-iframe').locator('button[class="eos-btn eos-btn-primary eos-btn-sm eos-btn-icon-only"]>span[class="anticon anticon-right"]').click();

    
    // 1.1-check, if element "{4} Заголовок" moved to "ИТОГОВЫЙ СПИСОК" using xPath locator 
    const pathEl_1 = page.frameLocator('#storybook-preview-iframe').locator('//div[@class="eos-transfer-list"]//span[text()="Итоговый список"]//ancestor::div[2]//span[text()="' + title4 + '"]');
    await expect(pathEl_1).toBeVisible();

    // 1.2-check, if element "{4} Заголовок" moved to "ИТОГОВЫЙ СПИСОК" using loop 'For' and CSS locator
    const pathEl_2 = page.frameLocator('#storybook-preview-iframe').locator('.eos-transfer-list');
    const count = await pathEl_2.count();

    for (let i = 0; i < count; ++i) {
      let text = await pathEl_2.nth(i).locator('.eos-transfer-list-header-title').innerHTML();
      if (text === 'Итоговый список'){
        const text_contant = await pathEl_2.nth(i).locator('.eos-transfer-list-content-item-text').allTextContents();
        expect(text_contant).toContain(title4);
      } 
    }
    
    // 2-check if button "class="anticon anticon-right"" desabled
    await expect(page.frameLocator('#storybook-preview-iframe').locator('button[class="eos-btn eos-btn-primary eos-btn-sm eos-btn-icon-only"]>span[class="anticon anticon-right"]')).toBeDisabled();

  });

});
