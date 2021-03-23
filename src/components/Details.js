import React from 'react'


export default class Details extends React.Component {

    state = {
        loading: true,
        product: null,
        products: null,
        openPopup: false
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        const url = `https://6057ae5fc3f49200173ace62.mockapi.io/api/v1/product/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({product: data, loading: false})
    }

    render() {
        return (
            <div className='container'>
                {this.state.loading || !this.state.product ? (
                    <div>Loading...</div>
                ) : (
                    <div className='product-list'>
                        <div className='product'>
                            <img src={this.state.product.imageUrl} className='prod-img'  alt='image'/>
                            <span className='prod-name'>{this.state.product.name}</span>
                            <span className='prod-desc'>{this.state.product.description}</span>
                            <span className='prod-color'>color: {this.state.product.color}</span>
                            <span className='prod-weight'>weight: {this.state.product.weight}g</span>
                            <span className='prod-count'>avaible: {this.state.product.count} units</span>
                            <span className='prod-comments'>comments: <br/><br/> {this.state.product.comments} </span>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

