import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import CreateBlogForm from './CreateBlogForm'
import userEvent from '@testing-library/user-event'

describe('CreateBlogForm', () => {
  const blog = {
    title: 'My Statement on Ukraine',
    author: 'Barack Obama',
    url: 'https://barackobama.medium.com/my-statement-on-ukraine-dc18ef76ad88',
  }

  const createBlog = jest.fn()

  let container
  beforeEach(() => {
    container = render(<CreateBlogForm createBlog={createBlog} />).container
  })

  test('should call createBlog with right input when submitted', async () => {
    const user = userEvent.setup()
    const titleInput = container.querySelector('#title-input')
    const authorInput = container.querySelector('#author-input')
    const urlInput = container.querySelector('#url-input')
    const submit = screen.getByText(/^submit$/i)

    await user.type(titleInput, blog.title)
    await user.type(authorInput, blog.author)
    await user.type(urlInput, blog.url)
    await user.click(submit)

    expect(createBlog).toBeCalledTimes(1)
    expect(createBlog.mock.calls[0]).toContainEqual(blog)
  })
})
