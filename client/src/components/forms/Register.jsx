import React from "react"
import { Link } from 'react-router-dom'
import { Form, Button, Message } from 'semantic-ui-react'
import axios from 'axios'

import useForm from '../../Hooks/useForm'
import { Container, Underlined, P } from './Login'

export default function Register(props) {
    const [registrationSuccess, setRegistrationSuccess] = React.useState(false)
    const [registrationFail, setRegistrationFail] = React.useState(false)

    const initialStateCredentials = {
        username: '',
        email: '',
        password: '',
        cPassword: '',
    }

    const initialStateErrors = {
        username: null,
        password: null,
        cPassword: null
    }

    const validateInputs = (inputs) => {
        const { username, email, password, cPassword } = inputs

        if (!username) setErrors((prevErrors) => ({...prevErrors, username: 'You must enter a username.'}))
        if (!email) setErrors((prevErrors) => ({ ...prevErrors, email: 'You must enter an email address.'}))
        if (password.length < 6) setErrors((prevErrors) => ({...prevErrors, password: 'Your password must be at least 6 characters.'}))
        if (!password) setErrors((prevErrors) => ({...prevErrors, password: 'You must enter a password.'}) )
        if (password !== cPassword) setErrors((prevErrors) => ({...prevErrors, cPassword: 'Passwords must match.'}))
    }

    const handleSubmitCb = newUserCredentials => {
        // clear any previous errors
        setErrors(initialStateErrors)
        setRegistrationFail(false)
        // display any new errors 
        validateInputs(newUserCredentials)

        const { username, email, password, cPassword } = newUserCredentials

        if (username &&
            password &&
            password.length >=6 && 
            password === cPassword
        ) {
            axios.post('https://electronic-overtime-system.herokuapp.com/api/auth/register', { username, password, email })
                .then(res => { 
                    // TODO: save username and role to global state via react-conflux 
                    setRegistrationSuccess(true)
                    setTimeout(() => { props.history.push('/') }, 1500)
                })
                .catch(err => {
                    console.error(err)
                    setRegistrationFail(true)
                })
        } 
    }
  
    const [newUserCredentials,, handleChanges, handleSubmit] = useForm(initialStateCredentials, handleSubmitCb)
    const [errors, setErrors] = React.useState(initialStateErrors)

    return (
        <Container>
            <h2>Register</h2>

            <Form error onSubmit={handleSubmit}>
                    <Form.Input 
                        name="username" 
                        label="Username"
                        error={errors.username && { content: errors.username, pointing: "below" }}
                        type="text"
                        placeholder="enter your username"
                        value={newUserCredentials.username}
                        onChange={handleChanges}
                    />

                    <Form.Input 
                        name="email"
                        label="Email"
                        error={errors.email && { content: errors.email, pointing: "below" }}
                        type="email"
                        placeholder="someone@example.com"
                        value={newUserCredentials.email}
                        onChange={handleChanges}
                    />

                    <Form.Input 
                        name="password" 
                        label="Password"
                        error={errors.password && { content: errors.password, pointing: "below"}}
                        type="password"
                        placeholder="must be at least 6 characters"
                        value={newUserCredentials.password}
                        onChange={handleChanges}
                    />

                    <Form.Input
                        name="cPassword" 
                        label="Confirm Password"
                        error={errors.cPassword && { content: errors.cPassword, pointing: "below"}}
                        type="password"
                        placeholder="confirm password"
                        value={newUserCredentials.cPassword}
                        onChange={handleChanges}
                    />

                <Button type="submit">Register</Button>
            </Form>

            { registrationSuccess && 
              <Message positive>
                  <Message.Header>Success</Message.Header>
                  <p>You are now being redirected to the dashboard...</p>
              </Message>
            }

            { registrationFail && 
                <Message negative>
                    <Message.Header>Error</Message.Header>
                    <p>A user with that username alreadyExists. Please choose another username.</p>
                </Message>
            }
        
            <P><strong>Already a user?</strong> <Link to="/login"><Underlined>Login</Underlined></Link></P>
        </Container>
    )
}
