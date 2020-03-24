import React, { Component } from 'react';

export default class FormDataComponent extends Component {

    keyData;

    constructor(props) {
        super(props);

        this.onChangeKey = this.onChangeKey.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            apikey: ''
        }
    }

    // Form Events
    onChangeKey(e) {
        this.setState({ apikey: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        this.setState({
            apikey: ''
        })
        this.setState({saved: true});
    }

    // React Life Cycle
    componentDidMount() {
        this.keyData = JSON.parse(localStorage.getItem('apikey'));

        if (localStorage.getItem('apikey')) {
            this.setState({
                apikey: this.keyData.apikey,
                saved: true
            })
        } else {
            this.setState({
                apikey: ''
            })
        }
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('apikey', JSON.stringify(nextState));
    }

    clearStorage = (e) => {
        e.preventDefault();
        console.log("Local Storage Cleared!");
        localStorage.clear();
        this.setState({saved: false});
    };

    render() {
        return (
            
            <form onSubmit={this.onSubmit}>
            {this.state.saved &&
            <div className="row">
                <div className="col">
                    <p>Using API Key from <a href="https://finnhub.io" target="_blank" rel="noopener noreferrer">Finnhub</a>.
                        <a className="nav-link" href="#" onClick={this.clearStorage} target="_blank" rel="noopener noreferrer">Delete API Key</a>
                    </p>
                </div>
            </div>
                
            }
            {!this.state.saved && 
            <div>
                <p>For a better experience with real-time stock data, please 
                <a href="https://finnhub.io/register" target="_blank" rel="noopener noreferrer"> obtain a FREE API Key from Finnhub</a> and enter it here:</p>
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