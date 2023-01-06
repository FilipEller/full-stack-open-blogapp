describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Miguel de Cervantes',
      username: 'miguel',
      password: 'secret',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('form', /log in/i).contains('button', /log in/i)
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('div', /username/i)
        .find('input')
        .type('miguel')
      cy.contains('div', /password/i)
        .find('input')
        .type('secret')
      cy.contains('button', /log in/i).click()

      cy.contains(/logged in/i)
    })

    it('fails with wrong credentials', function () {
      cy.contains('div', /username/i)
        .find('input')
        .type('miguel')
      cy.contains('div', /password/i)
        .find('input')
        .type('oops')
      cy.contains('button', /log in/i).click()

      cy.contains(/incorrect/i)
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'miguel', password: 'secret' })
    })

    it('A blog can be created', function () {
      cy.contains('button', /add a blog/i).click()
      cy.contains('div', /title/i)
        .find('input')
        .type('End-to-End testing with Cypress')
      cy.contains('div', /author/i)
        .find('input')
        .type('Steve Fuller')
      cy.contains('div', /url/i)
        .find('input')
        .type(
          'https://medium.com/better-practices/end-to-end-testing-with-cypress-bfcd59633f1a'
        )
      cy.contains('button', /submit/i).click()

      cy.contains(/End-to-End testing with Cypress/)
    })

    describe('and some blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Blog 1',
          author: 'Author 1',
          url: 'https://medium.com',
        })
        cy.createBlog({
          title: 'Blog 2',
          author: 'Author 2',
          url: 'https://www.economist.com/',
        })
        cy.createBlog({
          title: 'Blog 3',
          author: 'Author 3',
          url: 'https://read.deeplearning.ai/the-batch/',
        })
      })

      it('a blog can be liked', function () {
        cy.contains('article', /Blog 1/)
          .as('blog')
          .find('button', /view/i)
          .click()
        cy.get('@blog').contains('button', /like/i).click()
        cy.get('@blog').contains(/likes: 1/i)
      })

      it('a blog can be deleted', function () {
        cy.contains('article', /Blog 1/)
          .as('blog')
          .find('button', /view/i)
          .click()
        cy.get('@blog')
          .contains('button', /delete/i)
          .click()

        cy.should('not.contain', /Blog 1/)
      })

      describe('and blogs have likes', function () {
        beforeEach(function () {
          cy.contains('article', /Blog 1/)
            .as('blog1')
            .find('button', /view/i)
            .click()
          cy.get('@blog1').contains('button', /like/i).click()
          cy.get('@blog1').contains(/likes: 1/i)
          cy.get('@blog1').contains('button', /like/i).click()
          cy.get('@blog1').contains(/likes: 2/i)

          cy.contains('article', /Blog 2/)
            .as('blog2')
            .find('button', /view/i)
            .click()
          cy.get('@blog2').contains('button', /like/i).click()
          cy.get('@blog2').contains(/likes: 1/i)

          cy.contains('article', /Blog 3/)
            .as('blog3')
            .find('button', /view/i)
            .click()
          cy.get('@blog3').contains('button', /like/i).click()
          cy.get('@blog3').contains(/likes: 1/i)
          cy.get('@blog3').contains('button', /like/i).click()
          cy.get('@blog3').contains(/likes: 2/i)
          cy.get('@blog3').contains('button', /like/i).click()
          cy.get('@blog3').contains(/likes: 3/i)
        })

        it('blogs are sorted in descending order of likes', function () {
          cy.get('article.blog')
            .eq(0)
            .contains(/Blog 3/)
          cy.get('article.blog')
            .eq(1)
            .contains(/Blog 1/)
          cy.get('article.blog')
            .eq(2)
            .contains(/Blog 2/)
        })
      })
    })
  })
})
