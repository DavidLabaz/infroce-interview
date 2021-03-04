import React from 'react'


export default class Post extends React.Component {

    state = {
        loading: true,
        comments: null,
        post: null
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        const url = `https://jsonplaceholder.typicode.com/comments?postId=${id}`;
        const response = await fetch(url);
        const data = await response.json();
        const postUrl = `https://jsonplaceholder.typicode.com/posts/${id}`;
        const postResponse = await fetch(postUrl);
        const postData = await postResponse.json();
        this.setState({comments: data, loading: false, post: postData})
    }

    render() {
        return (
            <div className='container'>
                {this.state.loading || !this.state.comments ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        <h1 className='post-title'>{this.state.post.title}</h1>
                        <div className='body'>{this.state.post.body}</div>
                        <div className='comments-list'>
                            {this.state.comments.map((comment, index) =>
                                (<div key={index} className='comment'>
                                    <span className='title-details'><p>username:</p>{comment.name}</span>
                                    <br/>
                                    <span className='body-details'><p>comment:</p>{comment.body}</span>
                                </div>)
                            )}
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

