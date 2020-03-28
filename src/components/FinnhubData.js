import React from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

class FinnhubData extends React.Component {
  constructor () {
    super()
    this.handleDetailsClick = this.handleDetailsClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      isLoading: false,
      name:'',
      symbol:'',
      description:'',
      lastUpdated:'',
      current_price:'',
      peers: [],
      error:''
    }
  }

  resetState(){
    this.setState({
      isLoading: false,
      name:'',
      symbol:'',
      description:'',
      exchange:'',
      weburl:'',
      lastUpdated: '',
      targetHigh:'',
      targetLow: '',
      targetMean: '',
      targetMedian: '',
      current_price:'',
      high_price: '',
      low_price: '',
      open_price: '',
      previous_close_price: '',
      time_stamp: '',
      peers: [],
      error:''
    })
  }

  async handleDetailsClick(symbol) {
    this.resetState();
    this.keyData = JSON.parse(localStorage.getItem('apikey'));
    this.setState({ show: true });
    try {
      await axios.get('https://finnhub.io/api/v1/stock/profile?symbol='+symbol+'&token='+this.keyData.apikey)
        .then( (response) => {
          this.setState({
            name: response.data.name,
            description: response.data.description,
            exchange: response.data.exchange,
            weburl: response.data.weburl,
            symbol: response.data.ticker,
            isLoading: false
          })
        }, (error) => {
          this.finnhubErrorHandler(error);
        } )
    } catch (e) {
      console.log(e);
    }   
  }

  async handlePriceQuoteClick(symbol) {
    this.resetState();
    this.keyData = JSON.parse(localStorage.getItem('apikey'));
    this.setState({ show: true });
    try {
      await axios.get('https://finnhub.io/api/v1/quote?symbol='+symbol+'&token='+this.keyData.apikey)
        .then( (response) => {
          var date = new Date(response.data.t * 1000);
          var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          var month = months_arr[date.getMonth()];
          var formatted_date = month+'/'+date.getDate()+'/'+date.getFullYear()+' '+
            date.getHours()+":"+date.getMinutes()+':'+date.getSeconds()
          this.setState({
            current_price: response.data.c,
            high_price: response.data.h,
            low_price: response.data.l,
            open_price: response.data.o,
            previous_close_price: response.data.pc,
            time_stamp: formatted_date.toString(),
            symbol: symbol
          })
        }, (error) => {
          this.finnhubErrorHandler(error);
        } )
    } catch (e) {
      console.log(e);
    }   
  }

  async handlePriceTargetClick(symbol) {
    this.resetState();
    this.keyData = JSON.parse(localStorage.getItem('apikey'));
    this.setState({ show: true });
    try {
      await axios.get('https://finnhub.io/api/v1/stock/price-target?symbol='+symbol+'&token='+this.keyData.apikey)
        .then( (response) => {
          this.setState({
            lastUpdated: response.data.lastUpdated,
            symbol: response.data.symbol,
            targetHigh: response.data.targetHigh,
            targetLow: response.data.targetLow,
            targetMean: response.data.targetMean,
            targetMedian: response.data.targetMedian
          })
        }, (error) => {
          this.finnhubErrorHandler(error);
        } )
    } catch (e) {
      console.log(e);
    }   
  }

  async handlePeersClick(symbol) {
    this.resetState();
    this.keyData = JSON.parse(localStorage.getItem('apikey'));
    this.setState({ show: true });
    try {
      await axios.get('https://finnhub.io/api/v1/stock/peers?symbol='+symbol+'&token='+this.keyData.apikey)
        .then( (response) => {
          this.setState({
            peers: response.data,
            symbol: symbol})
        }, (error) => {
          this.finnhubErrorHandler(error);
        } )
    } catch (e) {
      console.log(e);
    }   
  }

  finnhubErrorHandler(error){
    this.keyData = JSON.parse(localStorage.getItem('apikey'));
    var missing_apikey_msg;
    if(!this.keyData.apikey || this.keyData.apikey === ''){
      missing_apikey_msg = 'Please obtain an API Key from Finnhub.';
    }
    switch (error.response.status) {
      case 401 :
        console.log("Authentication Failed!!!");
        this.setState({ 
          error: ' Finnhub is not accepting your key. Please delete your API Key and re-enter it. '
           + missing_apikey_msg
        });
        break
      case 429 :
        console.log("RateLimitExceeded!!!");
        this.setState({ 
          error: ' Finnhub API call limit has exceeded! '
           + missing_apikey_msg
        });
        break
      default :
        console.log("Finhub API Error!!!");
        this.setState({ 
          error: ' An error occurred calling Finnhub API! ' 
           + missing_apikey_msg
        });
        break
    }
    this.setState({ 
      isLoading: false,
      symbol: '',
      description: '',
      targetHigh: ''
    });
  }

  handleClose() {
		this.setState({ show: false });
  }
  
  render() {
    return (
      <div>
        <>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
              {this.state.isLoading === true && <div>Please Wait</div>}
              {this.state.isLoading === false && this.state.symbol &&
                <div>
                  {this.state.symbol}
                </div>
              }
              {this.state.isLoading === false && !this.state.symbol &&
                <div>
                  Searched <a href="https://finnhub.io/" target="_blank" rel="noopener noreferrer">Finnhub.io</a>
                </div>
              }
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Error From API */}
              {this.state.error &&
                <div className="alert alert-danger" role="alert">
                  <svg className="octicon octicon-alert" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 000 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 00.01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"></path></svg>
                  {this.state.error}
                </div>
              }
              {/* No Data */}
              {this.state.isLoading === false && !this.state.symbol &&
                <p>No data found!</p>
              }
              {/* Loading... */}
              {this.state.isLoading === true &&
                <div>
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span>Searching...</span>
                </div>
              }
              {/* Details Data */}
              {this.state.isLoading === false && this.state.description &&
                <div>
                  <p>{this.state.description}</p>
                  <p>Exchange: {this.state.exchange}</p>
                  {this.state.weburl &&
                    <p><a href={ `${this.state.weburl}` } target="_blank" rel="noopener noreferrer">{this.state.weburl}</a></p>
                  }
                </div>
              }
              {/* Price Quote Data */}
              {this.state.isLoading === false && this.state.current_price &&
                <div>
                  <p>Last Updated: <b>{this.state.time_stamp}</b></p>
                  <p>Current Stock Price: <b>{this.state.current_price}</b></p>
                  <p>Highest price of the day: <b>${this.state.high_price}</b></p>
                  <p>Lowest price of the day: <b>${this.state.low_price}</b></p>
                  <p>Opening price of the day: <b>${this.state.open_price}</b></p>
                  <p>Previous close price: <b>${this.state.previous_close_price}</b></p>
                </div>
              }
              {/* Price Target Data */}
              {this.state.isLoading === false && this.state.targetHigh &&
                <div>
                  <p>Last Updated: <b>{this.state.lastUpdated}</b></p>
                  <p>Target High: <b>${this.state.targetHigh}</b></p>
                  <p>Target Low: <b>${this.state.targetLow}</b></p>
                  <p>Target Mean: <b>${this.state.targetMean}</b></p>
                  <p>Target Median: <b>${this.state.targetMedian}</b></p>
                </div>
              }
              {/* Similar Stocks Data */}
              {this.state.isLoading === false && this.state.peers.length>0 &&
                <div>
                  <p><b>Note: </b>If the link opens to a "Page not found" error, 
                    the stock is not available on Robinhood.</p>
                  {this.state.peers.map(symbol => 
                    <ul>
                      <li><a href={'https://robinhood.com/stocks/'+symbol} target="_blank" rel="noopener noreferrer">
                        {symbol}
                      </a></li>
                    </ul>
                  )}
                </div>
              }
              
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Button variant="primary" onClick={() => this.handleDetailsClick(this.props.symbol)}>
            Details
          </Button>
          &nbsp;
          <Button variant="primary" onClick={() => this.handlePriceQuoteClick(this.props.symbol)}>
            Price Quote
          </Button>
          &nbsp;
          <Button variant="primary" onClick={() => this.handlePriceTargetClick(this.props.symbol)}>
            Price Target
          </Button>
          &nbsp;
          <Button variant="primary" onClick={() => this.handlePeersClick(this.props.symbol)}>
            Similar Stocks
          </Button>
        </>
      </div>
    );
  }

}

export default FinnhubData;
