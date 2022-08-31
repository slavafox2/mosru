
Тест 1.
Шаги:
1. Перейти на страницу http://89.189.152.235:1337/?path=/story/eos-tabs--default
2. Перейти на "Вкладка 7"

Ожидаемый результат:
1. Проверить наличие "Текст 7"

Тест 2.
Шаги:
1. Перейти на страницу http://89.189.152.235:1337/?path=/story/eos-timepicker--in-form
2. Раскрыть список
3. Нажать кнопку "Сейчас"
4. Нажать кнопку "Submit"

Ожидаемый результат:
1. Отобразилось сообщение с текущим временем
2. Поле class="eos-picker-input" содержит текущее время

Тест 3.
Шаги:
1. Перейти на страницу http://89.189.152.235:1337/?path=/story/eos-twincolumn--default
2. Нажать на элемент "{4} Заголовок" ==>  "{4} Заголовок" содержит "eos-checkbox-wrapper-checked"
3. Нажать кнопку "class="anticon anticon-right"

Ожидаемый результат:
1. Элемент "{4} Заголовок" перенесен в "ИТОГОВЫЙ СПИСОК"
2. Кнопка "class="anticon anticon-right" содержит disabled



Working with Recoding:
    console: $env:DEBUG='pw:api'
    console: $env:PWDEBUG=1
    console: $env:PWDEBUG='console'

    npx playwright test tests/demo-todo-app.spec.js

    npx playwright codegen http://...

package.json for debug:
      
  "scripts": {
    "debug": "npx playwright test --headed --timeout=0"
  }


==========
CSS, xPath, locators

1. //strong[text()=' Xpath Examples']
2. //span[text()='{3} Заголовок']
3.  //nav[@class="container sidebar-container css-svjevy"]//div[@class="os-padding"]
4.  //nav[@class="container sidebar-container css-svjevy"]//label[text()="Search for components"]
5. //div[@class="eos-transfer-list"]//span[text()="Итоговый список"]//ancestor::div[2]//span[text()="{4} Заголовок"]


=========
https://playwright.dev/docs/locators#lists

Lists 

You can also use locators to work with the element lists.

// Locate elements, this locator points to a list.
const rows = page.locator('table tr');

// Pattern 1: use locator methods to calculate text on the whole list.
const texts = await rows.allTextContents();

// Pattern 2: do something with each element in the list.
const count = await rows.count()
for (let i = 0; i < count; ++i)
  console.log(await rows.nth(i).textContent());

// Pattern 3: resolve locator to elements on page and map them to their text content.
// Note: the code inside evaluateAll runs in page, you can call any DOM apis there.
const texts = await rows.evaluateAll(list => list.map(element => element.textContent));


========================

    
    console.log(count);
    console.log('innerText--------------------------');
    console.log(await pathEl_2.nth(0).locator('.eos-transfer-list-header-title').innerText());
    console.log('innerHTML--------------------------');
    console.log(await pathEl_2.nth(0).locator('.eos-transfer-list-header-title').innerHTML());
    console.log('textContent--------------------------');
    console.log(await pathEl_2.nth(0).locator('.eos-transfer-list-header-title').textContent());
    console.log('allInnerTexts--------------------------');
    console.log(await pathEl_2.nth(0).locator('.eos-transfer-list-header-title').allInnerTexts());
    console.log('allTextContents--------------------------');
    console.log(await pathEl_2.nth(0).locator('.eos-transfer-list-header-title').allTextContents());
    console.log('-------');
    for (let i = 0; i < count; ++i) {
      let text = await pathEl_2.nth(i).locator('.eos-transfer-list-header-title').innerHTML();
      if (text === 'Итоговый список'){
        const text_contant = await pathEl_2.nth(i).locator('.eos-transfer-list-content-item-text').allTextContents();
        console.log(text_contant);
        expect(text_contant).toContain(title4);
      } 
    }