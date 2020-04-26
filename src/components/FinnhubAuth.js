import React, { Component } from 'react';
import FinnhubR13s from './FinnhubR13s';
/**
 * Allows the user to add the API Key for Finnhub to local storage,
 * which prevent the need of re-entering the key even when the browser
 * has been closed
 */
export default class FinnhubAuthComponent extends Component {

    constructor(props) {
        super(props);

        this.onChangeKey = this.onChangeKey.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            apikey: '',
            saved: false
        }
    }

    /**
     * set state for apikey only if input field is not empty 
     * @param  {} e event containing API Key from input text
     */
    onChangeKey(e) {
        if(e.target.value && e.target.value !== ''){
            this.setState({ apikey: e.target.value });
        }else{
            this.setState({ saved: false });
        }
    }

    /**
     * set saved state as true when apikey has been saved to the state 
     * and is not an empty value
     * @param  {} e event of Use Key button 
     */
    onSubmit(e) {
        e.preventDefault()
        if(this.state.apikey && this.state.apikey !== ''){
            this.setState({saved: true});
        }else{
            this.setState({ saved: false });
        }
    }

    /**
     * React Life Cycle. Locates apikey from local storage when the component mounts 
     * and sets the saved state as true if they apikey is not an empty value
     */
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

    /**
     * adds the apikey state to local storage
     * @param  {} _nextProps not used
     * @param  {} nextState locates apikey state of this component
     */
    UNSAFE_componentWillUpdate(_nextProps, nextState) {
        localStorage.setItem('apikey', JSON.stringify(nextState));
    }

    /**
     * remove apikey from local storage and set the state to default values
     * @param  {} e event of Delete API Key button
     */
    clearStorage = (e) => {
        e.preventDefault();
        localStorage.clear();
        this.setState({saved: false, apikey: ''});
    };

    /**
     * render the HTML for this component
     */
    render() {
        return (
            <form onSubmit={this.onSubmit}>
            {this.state.saved &&

            <div className="row">
                <div className="col-sm-6"><FinnhubR13s /></div>
                <div className="col-sm-6">
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