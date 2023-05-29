// passwordManager.test.js
const { JSDOM } = require('jsdom');

// localStorage ve chrome.tabs'ı taklit et
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};
global.chrome = {
  tabs: {
    query: jest.fn(),
  },
};

// "password form" ile ilgili testler
describe('şifre formu', () => {
  test('formu gönderdiğinde bir şifre oluşturur', async () => {
    const dom = new JSDOM(`<!DOCTYPE html>
      <form id="password-form">
        <input id="site" value="example.com">
        <input id="length" value="12">
        <input id="generated-password">
      </form>
      <button id="copy-button"></button>`);
    document.body.innerHTML = dom.window.document.body.innerHTML;

    // chrome.tabs.query çağrısını taklit et
    global.chrome.tabs.query.mockImplementation((queryInfo, callback) => {
      callback([{ url: 'https://example.com' }]);
    });

    // passwordManager.js dosyasını dahil et
    require('./passwordManager.js');

    const passwordForm = document.getElementById('password-form');
    passwordForm.dispatchEvent(new Event('submit'));

    const generatedPassword = document.getElementById('generated-password');
    // Oluşturulan şifrenin uzunluğunu kontrol et
    expect(generatedPassword.value.length).toBe(12);
  });
});
