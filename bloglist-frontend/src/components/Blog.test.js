import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('Blog', () => {
  const blog = {
    title: 'My Statement on Ukraine',
    author: 'Barack Obama',
    url: 'https://barackobama.medium.com/my-statement-on-ukraine-dc18ef76ad88',
    likes: 3,
    user: {
      id: '123',
      username: 'obama',
    },
  }
  const user = {
    id: '123',
    username: 'obama',
  }

  const deleteBlog = jest.fn()
  const likeBlog = jest.fn()

  beforeEach(() => {
    render(
      <Blog
        blog={blog}
        user={user}
        likeBlog={likeBlog}
        deleteBlog={deleteBlog}
      />
    )
  })

  test('renders only title and author by default', () => {
    screen.getByText('My Statement on Ukraine')
    screen.getByText('Barack Obama')
    const url = screen.queryByText(/barackobama.medium.com/)
    expect(url).toBeNull()
    const likes = screen.queryByText(/3/)
    expect(likes).toBeNull()
  })

  test('renders also url and likes after clicking "view"', async () => {
    const user = userEvent.setup()
    const view = screen.getByText(/^view$/i)
    await user.click(view)

    screen.getByText('My Statement on Ukraine')
    screen.getByText('Barack Obama')
    screen.getByText(/barackobama.medium.com/)
    screen.getByText(/3/)
  })

  test('calls likeBlog twice when "like" is clicked twice', async () => {
    const user = userEvent.setup()
    const view = screen.getByText(/^view$/i)
    await user.click(view)
    const like = screen.getByText(/^like$/i)
    await user.click(like)
    await user.click(like)

    expect(likeBlog.mock.calls).toHaveLength(2)
  })
})
