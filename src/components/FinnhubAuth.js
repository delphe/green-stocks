import React, { Component } from 'react';

export default class FinnhubAuthComponent extends Component {

    keyData;

    constructor(props) {
        super(props);

        this.onChangeKey = this.onChangeKey.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            apikey: '',
            saved: false
        }
    }

    // Form Events
    onChangeKey(e) {
        if(e.target.value && e.target.value !== ''){
            this.setState({ apikey: e.target.value });
        }else{
            this.setState({ saved: false });
        }
    }

    onSubmit(e) {
        e.preventDefault()
        if(this.state.apikey && this.state.apikey !== ''){
            this.setState({saved: true});
        }else{
            this.setState({ saved: false });
        }
        
    }

    // React Life Cycle
    componentDidMount() {
        this.keyData = JSON.parse(localStorage.getItem('apikey'));
        
        if (this.keyData && this.keyData.apikey && this.keyData.apikey !== '') {
            this.setState({
                apikey: this.keyData.apikey,
                saved: true
            })
        } else {
            this.setState({
                apikey: '',
                saved: false
            })
        }
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('apikey', JSON.stringify(nextState));
    }

    clearStorage = (e) => {
        e.preventDefault();
        localStorage.clear();
        this.setState({saved: false, apikey: ''});
    };

    render() {
        return (
            
            <form onSubmit={this.onSubmit}>
            {this.state.saved &&
            <div className="row">
                <div className="col">
                    <p>
                        Using API Key from <a href="https://finnhub.io" target="_blank" rel="noopener noreferrer">Finnhub</a>.<br/>
                        <button className="btn btn-light" onClick={this.clearStorage}>
                            Delete API Key
                        </button>
                    </p>
                </div>
            </div>
                
            }
            {!this.state.saved && 
            <div>
                <p>Please <a href="https://finnhub.io/register" target="_blank" rel="noopener noreferrer">
                    obtain a FREE API Key from Finnhub</a> and enter it here to increase the amount of data you can see:</p>
                <div className="form-group row">
                    <div className="col-sm-6 col-md-6 col-lg-4">
                    <input type="text" className="form-control" value={this.state.apikey} onChange={this.onChangeKey} />
                    </div>
                    <div className="col-sm-4 col-md-4 col-lg-2">
                    <button type="submit" className="btn btn-primary btn-block">Use Key</button>
                    </div>
                </div>
            </div>
            }
            </form>
        )
    }
}