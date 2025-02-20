describe('Login Page Tests', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('Başarılı form doldurulduğunda submit edebiliyorum', () => {
      cy.get('input[type="email"]').type('test@example.com');
      cy.get('input[type="password"]').type('StrongPass1');
      cy.get('input[type="checkbox"]').check();
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/success');
    });
  
    it('Email yanlış girdim - Hata mesajı görünüyor ve buton disabled', () => {
      cy.get('input[type="email"]').type('invalid-email');
      cy.get('button[type="submit"]').should('be.disabled');
      cy.get('p').should('have.length', 1);
      cy.contains('Geçerli bir email giriniz.');
    });
  
    it('Email ve password yanlış - 2 hata mesajı görünmeli ve buton disabled', () => {
      cy.get('input[type="email"]').type('invalid-email');
      cy.get('input[type="password"]').type('weak');
      cy.get('button[type="submit"]').should('be.disabled');
      cy.get('p').should('have.length', 2);
      cy.contains('Geçerli bir email giriniz.');
      cy.contains('Şifre en az 8 karakter, bir büyük harf, bir rakam içermeli');
    });
  
    it('Kuralları kabul etmeden formu doldurdum - Buton disabled olmalı', () => {
      cy.get('input[type="email"]').type('test@example.com');
      cy.get('input[type="password"]').type('StrongPass1');
      cy.get('button[type="submit"]').should('be.disabled');
    });
  });