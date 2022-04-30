import { ChangeEvent, FC, FormEvent, useState } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'

import classes from './contact-form.module.css'
import { useMutation } from 'react-query'
import Notification from '../ui/notification'

type Query = {
  email: string
  name: string
  message: string
}

type QueryResponse = {
  message?: string
  query: Query
}

enum InputTypes {
  email = 'email',
  name = 'name',
  message = 'message',
}

const postNewQuery = (query: Query) => {
  return axios.post<QueryResponse>('/api/contact', query)
}

const ContactForm: FC = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const { error, isLoading, mutate, isSuccess } = useMutation<
    AxiosResponse<QueryResponse>,
    AxiosError,
    Query
  >(postNewQuery)

  const handleInputChange =
    (type: InputTypes) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value
      switch (type) {
        case InputTypes.email: {
          setEmail(value)
          break
        }
        case InputTypes.name: {
          setName(value)
          break
        }
        case InputTypes.message: {
          setMessage(value)
          break
        }
        default:
          break
      }
    }

  const sendQuery = async (e: FormEvent) => {
    e.preventDefault()
    mutate({ email, name, message })
  }

  let notification: {
    title: string
    message: string
    status: 'success' | 'error' | 'loading'
  } | null = null

  if (isLoading) {
    notification = {
      title: 'Posting Message',
      status: 'loading',
      message: 'Please wait...',
    }
  } else if (error) {
    notification = { title: 'Failed', message: error.message, status: 'error' }
  } else if (isSuccess) {
    notification = {
      title: 'Posted',
      message: 'Successfully added your message',
      status: 'success',
    }
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendQuery}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input
              type='email'
              id='email'
              required
              value={email}
              onChange={handleInputChange(InputTypes.email)}
            />
          </div>

          <div className={classes.control}>
            <label htmlFor='name'>Your Name</label>
            <input
              type='text'
              id='name'
              required
              value={name}
              onChange={handleInputChange(InputTypes.name)}
            />
          </div>
        </div>

        <div className={classes.control}>
          <label htmlFor='message'>Your Message</label>
          <textarea
            name='message'
            id='message'
            rows={5}
            value={message}
            onChange={handleInputChange(InputTypes.message)}
          ></textarea>
        </div>

        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </section>
  )
}

export default ContactForm
