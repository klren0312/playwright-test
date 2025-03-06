import { test, expect } from '@playwright/test';
import testData from './testData';
test('test search', async ({ page }) => {
  // 前往登录页
  await page.goto('https://preview.pro.ant.design/user/login');

  // 输入用户名
  await page.locator('#username').fill('admin');

  // 输入密码
  await page.locator('#password').fill('ant.design');

  // 点击登录
  await page.getByRole('button', { name: 'Login' }).click();

  // 等待进入首页
  await page.waitForURL('https://preview.pro.ant.design/dashboard/analysis');

  // 前往列表页
  await page.goto('https://preview.pro.ant.design/list/table-list', {
    waitUntil: 'networkidle'
  });

  // 输入搜索内容
  await page.locator('.ant-pro-query-filter-collapse-button').click();
  // 三个输入框
  await page.locator('#name').fill(testData.name);
  await page.locator('#desc').fill(testData.desc);
  await page.locator('#callNo').fill(testData.callNo);
  // 下拉框选择
  await page.locator('.ant-pro-filed-search-select').click();
  await page.locator('div').filter({ hasText: new RegExp(`^${testData.status}$`) }).nth(1).click();
  // 日期选择
  await page.locator('.ant-picker').click();
  await page.getByRole('cell', { name: testData.date }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  // 点击搜索
  await page.getByRole('button', { name: 'Query' }).click();

  // 等待搜索完成
  await page.waitForTimeout(1000);

  expect(page.getByRole('cell', { name: 'TradeCode' })).toBeVisible();
});

