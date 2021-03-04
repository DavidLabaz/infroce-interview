import React from 'react'
import {NavLink} from 'react-router-dom'
import Popup from './Popup'

export default class GetPosts extends React.Component {
    state = {
        loading: true,
        posts: null,
        openPopup: false
    }

    handleClick = () => {
        this.setState({openPopup: !this.state.openPopup})
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        const url = `https://jsonplaceholder.typicode.com/posts?userId=${id}`
        const response = await fetch(url);
        const data = await response.json();
        this.setState({posts: data, loading: false})
    }

    sendPost = (data) => {
        const id = this.props.match.params.id;
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...data, userId: id})
        };
        fetch(' https://jsonplaceholder.typicode.com/posts', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({posts: [data, ...this.state.posts]}));
    }

    deletePost (id) {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, requestOptions)
            .then(() => this.setState({posts: this.state.posts.filter( (post) => post.id !== id)}));
    }

    body = document.body;

    render() {
        return (
            <div>
                <h1 className='title'>Posts</h1>
                <button className='add-post' onClick={this.handleClick}>Add Post</button>
                <div className={!this.state.openPopup ? 'none' : this.body.style.overflow = 'hidden'}>
                    <Popup addPost={this.sendPost} closePopup={this.handleClick} />
                </div>
                <div className={this.state.openPopup ? 'none' : this.body.style.overflow = 'visible'} />
                {this.state.loading || !this.state.posts ? (
                    <div>Loading...</div>
                ) : (
                    <div className='post-list'>
                        {this.state.posts.map((post, index) =>
                            (<div key={index} className='post'>
                                <h3>{post.title}</h3>
                                <div>{post.body}</div>
                                <div className="nav-btn">
                                    <NavLink post={post} to={`/posts/details/${post.id}`} className='details'>
                                        <button className='details-btn'>Details</button>
                                    </NavLink>
                                    <button onClick={() => this.deletePost(post.id)} className='details-btn'>Delete</button>
                                </div>
                            </div>)
                        )}
                    </div>
                )}
            </div>
        )
    }
}

