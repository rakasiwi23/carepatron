import '@testing-library/cypress/add-commands';

context('given user open the page', () => {
	it('then user will see list of clients', () => {
		cy.visit('/');

		cy.findAllByRole('row')
			.should('have.length', 2)
			.should('contain', 'John Smitherin')
			.should('contain', '6192099102')
			.should('contain', 'john@gmail.com');
		// cy.findAllByText(/learn react/i).should('have.length', 1);
	});

	context('when user click "Create" button', () => {
		it('then form will shown up and user able to create a new client', () => {
			cy.visit('/');

			cy.findAllByRole('row')
				.should('have.length', 2)
				.should('not.contain', 'Andhika');

			cy.findByText('Create').click();

			cy.get('#first-name').type('Andhika');
			cy.get('#last-name').type('Prakasiwi');
			cy.get('#email').type('a.prakasiwi@gmail.com');
			cy.get('#phone-number').type('+628993658828');
			cy.findByText('Create Client').click();

			cy.findAllByRole('row')
				.should('have.length', 3)
				.should('contain', 'Andhika')
				.should('contain', 'John');
		});
	});

	context('when user search existing client', () => {
		it('then user should find that client', () => {
			cy.visit('/');

			cy.findAllByRole('row')
				.should('have.length', 3)
				.should('contain', 'Andhika');

			cy.findByPlaceholderText('Search clients...').type('Andhika');

			cy.findAllByRole('row')
				.should('have.length', 2)
				.should('contain', 'Andhika');

			cy.findByPlaceholderText('Search clients...').clear();

			cy.findAllByRole('row')
				.should('have.length', 3)
				.should('contain', 'Andhika')
				.should('contain', 'John');
		});
	});
});
