describe('Login Page Tests', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    // Formu doldurmak için yardımcı fonksiyon
    function fillLoginForm(email, password, acceptTerms = false) {
      if (email) cy.get('input[type="email"]').clear().type(email);
      if (password) cy.get('input[type="password"]').clear().type(password);
      if (acceptTerms) cy.get('input[type="checkbox"]').check();
    }
  
    it('Başarılı form doldurulduğunda submit edebiliyorum', () => {
      fillLoginForm('test@example.com', 'StrongPass1', true);
      cy.get('button[type="submit"]').should('not.be.disabled');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/success');
    });
  
    it('Email yanlış girdim - Hata mesajı görünüyor ve buton disabled', () => {
      fillLoginForm('invalid-email', 'StrongPass1');
      cy.get('button[type="submit"]').should('be.disabled');
      cy.get('p').should('have.length', 1);
      cy.contains('Geçerli bir email giriniz.');
    });
  
    it('Email ve password yanlış - 2 hata mesajı görünmeli ve buton disabled', () => {
      fillLoginForm('invalid-email', 'weak');
      cy.get('button[type="submit"]').should('be.disabled');
      cy.get('p').should('have.length', 2);
      cy.contains('Geçerli bir email giriniz.');
      cy.contains('Şifre en az 8 karakter, bir büyük harf, bir rakam içermeli');
    });
  
    it('Email ve password doğru ama kuralları kabul etmedim - Buton disabled olmalı', () => {
      fillLoginForm('test@example.com', 'StrongPass1', false);
      cy.get('button[type="submit"]').should('be.disabled');
      cy.get('p').should('have.length', 1);
      cy.contains('Şartları kabul etmelisiniz');
    });
  
    it('Hiçbir şey yazılmadığında hata mesajları görünmeli ve buton disabled olmalı', () => {
      cy.get('button[type="submit"]').should('be.disabled');
      cy.get('p').should('have.length', 3);
      cy.contains('Geçerli bir email giriniz.');
      cy.contains('Şifre en az 8 karakter, bir büyük harf, bir rakam içermeli');
      cy.contains('Şartları kabul etmelisiniz');
    });
  });
  