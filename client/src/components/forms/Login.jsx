import React from "react"
import { Link } from 'react-router-dom'
import { Form, Button, Message } from 'semantic-ui-react'
import styled from 'styled-components'

import useForm from '../../hooks/useForm'


export const Container = styled.div`
	display: flex;
	flex-grow: 2;
	flex-direction: column;
	margin-top: 4rem;
	align-items: center;
	padding-bottom: 45vh;
`

export const Underlined = styled.span`
	text-decoration: underline
`	

export const P = styled.p`
	margin: 1rem 0;
`


export default function Login(props) {
	const [loginSuccess, setLoginSuccess] = React.useState(false)

  	const initialStateLogin = {
		username: '',
		password: ''
	}
	
	const handleSubmitCb = loginCredentials => {
        console.log('LOGIN CREDS:', loginCredentials)
        setLoginSuccess(true)
	}
  
	const [loginCredentials,, handleChanges, handleSubmit] = useForm(initialStateLogin, handleSubmitCb)
  
	return (
		<Container>
			<h2>Login</h2>
			<Form onSubmit={handleSubmit}>
					<Form.Input
                        name="username" 
                        label="Username"
                        required
						type="text"
						placeholder="enter your username"
						value={loginCredentials.username}
						onChange={handleChanges}
					/>
				
					<Form.Input 
                        name="password" 
                        label="Password"
                        type="password"
                        required
						placeholder="enter your password"
						value={loginCredentials.password}
						onChange={handleChanges}
					/>

				<Button type="submit">Login</Button>
			</Form>

			{ loginSuccess && 
              <Message positive>
                  <Message.Header>Success</Message.Header>
                  <p>You are now being redirected to the dashboard...</p>
              </Message>
            }

			<P>
				<strong>Not a user?</strong> <Link to="/register"><Underlined>Register now.</Underlined></Link>
			</P>
		</Container>
	)
}

	