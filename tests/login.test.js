// login.test.js
const { JSDOM } = require('jsdom');

// localStorage'ı taklit et
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

// window.location'ı taklit et
delete window.location;
window.location = { href: jest.fn() };

// "login form" ile ilgili testler
describe('login formu', () => {
  test('formu gönderdiğinde ana şifreyi saklar ve yönlendirir', () => {
    const dom = new JSDOM(`<!DOCTYPE html><form id="form"><input id="master-password" value="1234"></form>`);
    document.body.innerHTML = dom.window.document.body.innerHTML;
    
    // login.js dosyasını dahil et
    require('./login.js');
    
    const form = document.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    // Ana şifrenin doğru bir şekilde saklandığını kontrol et
    expect(global.localStorage.setItem).toHaveBeenCalledWith('masterPassword', '1234');
    // Doğru sayfaya yönlendirildiğini kontrol et
    expect(window.location.href).toBe('popup.html');
  });
});