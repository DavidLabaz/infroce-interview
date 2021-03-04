import React from 'react'


export default class Popup extends React.Component {

    state = {
        title: '',
        body: ''
    }

    titleChange = (e) => {
        this.setState({title: e.target.value});
    }
    bodyChange = (e) => {
        this.setState({body: e.target.value});
    }

    addPost = () => {
        this.props.addPost(this.state)
        this.props.closePopup()
    }
    closePopup = () => {
        this.props.closePopup()
    }


    render() {
        return (

            <div className="modal">

                <div className="modal-content">
                    <h1>{this.props.data ? 'Edit Post' : 'Add Post'}</h1>
                    <div className='input'>
                        <label>Title</label>
                        <input onChange={this.titleChange} value={this.state.title} type="text"/>
                    </div>
                    <div className='input'>
                        <label>Body</label>
                        <textarea wrap='hard' rows='5' cols='40' value={this.state.body} onChange={this.bodyChange}/>
                    </div>
                    <footer>
                        <button onClick={this.closePopup}>Cancel</button>
                        <button onClick={this.addPost}>Add</button>
                    </footer>
                </div>

            </div>
        )
    }
}
