import React from 'react'
import {NavLink} from 'react-router-dom'


export default class GetUsers extends React.Component {

    state = {
        loading: true,
        users: null
    }

    async componentDidMount() {
        const url = 'https://jsonplaceholder.typicode.com/users'
        const response = await fetch(url);
        const data = await response.json();
        this.setState({users: data, loading: false})
    }

    render() {
        return (
            <div className='container'>
                <h1 className='title'>Users</h1>
                {this.state.loading || !this.state.users ? (
                    <div>loading...</div>
                ) : (
                    <div className='user-list'>
                        {this.state.users.map((user, index) =>
                            (<div key={index} className='user'>
                                <span>{user.name}</span>
                                <NavLink to={`/posts/${user.id}`}>
                                    <button className='post-btn'>Posts</button>
                                </NavLink>
                            </div>)
                        )}
                    </div>
                )}
            </div>
        )
    }
}

