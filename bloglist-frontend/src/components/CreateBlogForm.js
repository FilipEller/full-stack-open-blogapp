import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Input,
} from '@mui/material'

const CreateBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onSubmit = async event => {
    event.preventDefault()
    const data = await createBlog({ title, author, url })
    if (data) {
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <Box
      component='form'
      onSubmit={onSubmit}
      sx={{ my: 3, '& .MuiFormControl-root': { my: 2 } }}
      noValidate
      autoComplete='off'>
      <Typography variant='h4' gutterBottom component='div'>
        Add a Blog
      </Typography>
      <FormControl fullWidth variant='standard' required>
        <InputLabel htmlFor='title-input'>Title</InputLabel>
        <Input
          id='title-input'
          required
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </FormControl>
      <FormControl fullWidth variant='standard' required>
        <InputLabel htmlFor='author-input'>Author</InputLabel>
        <Input
          id='author-input'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </FormControl>
      <FormControl fullWidth variant='standard' required>
        <InputLabel htmlFor='url-input'>URL</InputLabel>
        <Input
          id='url-input'
          required
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </FormControl>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button fullWidth variant='contained' type='submit'>
          Submit
        </Button>
      </Box>
    </Box>
  )
}

export default CreateBlogForm
