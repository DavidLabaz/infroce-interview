import React from 'react'

export default class AddProduct extends React.Component {

    state = {
        name: '',
        description: '',
        count: ''
    }

    nameChange = (e) => {
        this.setState({name: e.target.value});
    }
    descriptionChange = (e) => {
        this.setState({description: e.target.value});
    }
    countChange = (e) => {
        this.setState({count: e.target.value});
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
                    <h1>{this.props.data ? '' : 'Add Details'}</h1>
                    <div className='input'>
                        <label>Name</label>
                        <input onChange={this.nameChange} value={this.state.name} type="text"/>
                    </div>
                    <div className='input'>
                        <label>Description</label>
                        <textarea wrap='hard' rows='5' cols='40' value={this.state.description}
                                  onChange={this.descriptionChange}/>
                    </div>
                    <div className='input'>
                        <label>Count</label>
                        <input onChange={this.countChange} value={this.state.count} type="number" min='0'/>
                    </div>
                    <footer>
                        <button onClick={this.closePopup}>Cancel</button>
                        <button onClick={this.addPost}>Save</button>
                    </footer>
                </div>

            </div>
        )
    }
}

