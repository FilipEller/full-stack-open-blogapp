const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await helper.seedDatabase()
}, 10000)

describe('with some initially saved users', () => {
  test('users are returned as JSON', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(helper.initialUsers.length)
  })

  test('users have a property named id', async () => {
    const response = await api.get('/api/users')
    response.body.forEach(user => expect(user.id).toBeDefined())
  })
})

describe('addition of a new user', () => {
  test('succeeds with valid data', async () => {
    const newUser = {
      username: 'bronte',
      name: 'Emily Brontë',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')
    const users = response.body

    expect(users).toHaveLength(helper.initialUsers.length + 1)
    expect(
      users.map(user => ({
        username: user.username,
        name: user.name,
      }))
    ).toContainEqual({ username: newUser.username, name: newUser.name })
  })

  test('fails with status code 400 if any property is missing', async () => {
    const withoutUsername = {
      name: 'Emily Brontë',
      password: 'password',
    }

    const withoutName = {
      username: 'bronte',
      password: 'password',
    }

    const withoutPassword = {
      username: 'bronte',
      name: 'Emily Brontë',
    }

    await api.post('/api/users').send(withoutUsername).expect(400)
    await api.post('/api/users').send(withoutName).expect(400)
    await api.post('/api/users').send(withoutPassword).expect(400)
  })

  test('fails with status code 400 if username is not unique', async () => {
    const usernameTaken = {
      username: 'dante',
      name: 'Emily Brontë',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(usernameTaken)
      .expect(400)
      .expect(res => {
        res.body.error = 'username must be unique'
      })
  })

  test('fails with status code 400 if password is shorter than 3 characters', async () => {
    const usernameTaken = {
      username: 'dante',
      name: 'Emily Brontë',
      password: '42',
    }

    await api
      .post('/api/users')
      .send(usernameTaken)
      .expect(400)
      .expect(res => {
        res.body.error = 'password must be at least 3 characters'
      })
  })
})
