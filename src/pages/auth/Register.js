import { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { Alert } from './Alert'

function Register() {
    const { signup } = useAuth()

    const [user, setUser] = useState({
        email: '',
        password: '',
        username: '',
    })

    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
        setError('')
        try {
            await signup(user.email, user.password, user.username)
            navigate('/')
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <Block>
            {error && <Alert message={error} />}

            <Form onSubmit={handleSubmit}>
                <Title>Register</Title>

                <TextInput> Email </TextInput>
                <Input
                    type='email'
                    onChange={e => setUser({ ...user, email: e.target.value })}
                    placeholder='email'
                />

                <TextInput> Password </TextInput>
                <Input
                    type='password'
                    placeholder='password'
                    onChange={e =>
                        setUser({ ...user, password: e.target.value })
                    }
                />

                <Button style={{ cursor: "pointer"}} > Register </Button>
            </Form>
        </Block>
    )
}

const Block = styled.div`
`

const Title = styled.p`
    font-size: 30px;
    font-weight: bold;
    color: #3b79d3;
    margin: 5px;
`
const TextInput = styled.p`
    font-size: 18px;
    width: 100%;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    width: 340px;
    height: 350px;
    border-radius: 8px;
    padding: 60px;
`

const Input = styled.input`
    border: none;
    outline: none;
    border-radius: 8px;
    width: 96%;
    padding: 10px;
    background-color: #F1F2F7;
`
const Button = styled.button`
    width: 100%;
    padding: 1em;
    background: #3b79d3;
    margin-top: 30px;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    color: #ffffff;
    font-size: 15px;
`

export default Register
