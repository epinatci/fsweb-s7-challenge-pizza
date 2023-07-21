describe("aççımm!", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/");
    });
  
    it("Anasayfada Acıktım butonu vardır.", () => {
      cy.get('[data-cy="mainpage"]').should("be.visible");
    });
    it("Acıktım butonuna tıklarsak /Form sayfasına gider.", () => {
      cy.get('[data-cy="mainpage"]')
        .click()
        .url()
        .should("include", "/orderform");
    });
  });
  
  
  describe("formun kontrolü", () => {

    beforeEach(() => {
        cy.visit("http://localhost:3000/orderform");
    });

    it("inputa bir metin giren test", () => {
        const expectedNote = "zili çalmayın siparişi kapıya bırakın lütfen";
        const noteInput = cy.get("[data-cy=note-input]");
        noteInput.type("zili çalmayın siparişi kapıya bırakın lütfen");
        noteInput.should("have.value", expectedNote);
    });

    it('birden fazla malzeme seçilebilen bir test', () => {
        const checked = cy.get("[data-cy=malzemeler]").check(['Pepperoni', 'Domates', "Biber", "Sosis"], { force: true });
        checked.should('have.length', 4);
        checked.uncheck('Pepperoni', { force: true });
        checked.should('have.length', 1);
    });

    it('Hamur ve boyut seçimi yapılmadan forma geçilemez', () => {
        cy.get("[data-cy=malzemeler]").check(['Pepperoni', 'Domates'], { force: true });
        cy.get("[data-cy=note-input]").type('Ekstra sos istiyorum');
        cy.get("[data-cy=adet]").clear().type('2');
        cy.get("[data-cy=submit-button]").should("be.disabled");
    });

     it('Boyut seçilmeden form gönderilemez', () => {
        cy.get('[data-cy=hamur]').find('option').contains('İnce Kenar').then(option => {
            cy.get('[data-cy=hamur]').select(option.val());
        });
        cy.get("[data-cy=malzemeler]").check(['Pepperoni', 'Domates'], { force: true });
        cy.get("[data-cy=note-input]").type('Ekstra sos istiyorum');
        cy.get("[data-cy=adet]").clear().type('2');
        cy.get("[data-cy=submit-button]").should("be.disabled")
    });

    it('Form gönderilebilir', () => {
        cy.get("[data-cy=orta]").check('M', { force: true });
        cy.get('[data-cy=hamur]').find('option').contains('İnce Kenar').then(option => {
            cy.get('[data-cy=hamur]').select(option.val());
        });
        cy.get("[data-cy=malzemeler]").check(['Pepperoni', 'Domates'], { force: true });
        cy.get("[data-cy=note-input]").type('Ekstra sos istiyorum');
        cy.get("[data-cy=adet]").clear().type('2');
        cy.get("[data-cy=submit-button]").should("not.be.disabled").click();
        cy.url().should('include', "http://localhost:3000/confirm");
    });
});