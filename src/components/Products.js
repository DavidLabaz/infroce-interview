import React from 'react';
import AddProduct from './AddProduct';
import {NavLink} from "react-router-dom";


export default class Products extends React.Component {

    state = {
        loading: true,
        products: null,
        openPopup: false
    }

    async componentDidMount() {
        const url = 'https://6057ae5fc3f49200173ace62.mockapi.io/api/v1/product'
        const response = await fetch(url);
        const data = await response.json();
        this.setState({products: data, loading: false})
    }

    sendPost = (data) => {
        const id = this.props.match.params.id;
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...data, userId: id})
        };
        fetch('https://6057ae5fc3f49200173ace62.mockapi.io/api/v1/product', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({products: [data, ...this.state.products]}));
    }

    deletePost(id) {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(`https://6057ae5fc3f49200173ace62.mockapi.io/api/v1/product/${id}`, requestOptions)
            .then(() => this.setState({products: this.state.products.filter((product) => product.id !== id)}));
    }

    handleClick = () => {
        this.setState({openPopup: !this.state.openPopup})
    }

    handleChange = (event) => {
        if(event.target.value === 'byName') {
            this.state.products.sort(function(a, b){
                if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
                return 0;
            })
        } else {
            this.state.products.sort((a, b) => a.count > b.count)
        }
    }

    body = document.body;

    render() {
        return (
            <div className='container'>
                <h1 className='title'>Products</h1>

                <button className='add-product' onClick={this.handleClick}>Add New Product</button>
                <div className={!this.state.openPopup ? 'none' : this.body.style.overflow = 'hidden'}>
                    <AddProduct addPost={this.sendPost} closePopup={this.handleClick}/>
                </div>
                <select onChange={this.handleChange} name="dropdown" id="drop">
                    <option value="byName">By Name</option>
                    <option value="byNumber">By Number</option>
                </select>
                <div className={this.state.openPopup ? 'none' : this.body.style.overflow = 'visible'}/>
                {this.state.loading || !this.state.products ? (
                    <div>loading...</div>
                ) : (
                    <div className='product-list'>
                        {this.state.products.map((product, index) =>
                            (<div key={index} className='product'>
                                <img src={product.imageUrl} className='prod-img' alt='image'/>
                                <span className='prod-name'>{product.name}</span>
                                <span className='prod-desc'>{product.description}</span>
                                <span className='prod-count'>avaible:{product.count}</span>
                                <div className="nav-btn">
                                    <button onClick={() => this.deletePost(product.id)} className='delete-btn'>Delete
                                    </button>
                                    <NavLink product={product} to={`/product/${product.id}`} className='details'>
                                        <button className='details-btn'>Details</button>
                                    </NavLink>
                                </div>
                            </div>)
                        )}
                    </div>
                )}
            </div>

        )
    }
}
