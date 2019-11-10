import React from 'react'
import axios from 'axios'

export default function AllUsers(props) {
    const [users, setUsers] = React.useState([])

    React.useEffect(() => {
        axios.get('https://electronic-overtime-system.herokuapp.com/api/users')
            .then(res => {
                console.log(res)
                setUsers(res)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    return (
        <div>
            <h2>All Users</h2>

            <div>
                { !users.length
                    ? <p>Loading...</p> 
                    : <div>{users.map(user => <div>{user}</div>)}</div>
                }
            </div>
        </div>
    )
}