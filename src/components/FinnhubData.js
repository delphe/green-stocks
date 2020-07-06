import React from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * Displays available buttons for a stock.
 * When pressed, a modal window opens and displays results from the Finnhub API
 * @component
 * @example
 * const symbol = 'TSLA'
 */
class FinnhubData extends React.Component {
  
  static propTypes = {
    /**
     * Stock Symbol. Example: TSLA
     */
    symbol: PropTypes.string.isRequired
  }
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
      buy: null,
      error:''
    }
  }
  /**
   * reset all data saved to state back to default values 
   * to prevent old data from being displayed when modal is reopened
   */
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
      buy: null,
      peers: [],
      error:''
    })
  }

  /**
   * Details button used to call Finnhub API and return stock profile data
   * in the modal window.
   * @param  {} symbol stock symbol. example: TSLA
   */
  async handleDetailsClick(symbol) {
    this.resetState();
    this.keyData = JSON.parse(localStorage.getItem('apikey'));
    this.setState({ show: true, isLoading: true });
    try {
      await axios.get('https://finnhub.io/api/v1/stock/profile?symbol='+symbol+
       '&token='+this.keyData.apikey, { timeout: 30000 })
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
      this.resetState();
      this.setState({ 
        error: 'An error occurred calling Finnhub API!'
      });
      console.log(e);
    }   
  }

  /**
   * Price Quote button used to call Finnhub API and return price quote data
   * in the modal window.
   * @param  {} symbol stock symbol. example: TSLA
   */
  async handlePriceQuoteClick(symbol) {
    this.resetState();
    this.keyData = JSON.parse(localStorage.getItem('apikey'));
    this.setState({ show: true, isLoading: true });
    try {
      await axios.get('https://finnhub.io/api/v1/quote?symbol='+symbol+
       '&token='+this.keyData.apikey, { timeout: 30000 })
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
            symbol: symbol,
            isLoading: false
          })
        }, (error) => {
          console.log("ERROR!!!");
          this.finnhubErrorHandler(error);
        } )
    } catch (e) {
      this.resetState();
      this.setState({ 
        error: 'An error occurred calling Finnhub API!'
      });
      console.log(e);
    }   
  }

  /**
   * Price Target button used to call Finnhub API and return stock price-target data
   * in the modal window.
   * @param  {} symbol stock symbol. example: TSLA
   */
  async handlePriceTargetClick(symbol) {
    this.resetState();
    this.keyData = JSON.parse(localStorage.getItem('apikey'));
    this.setState({ show: true, isLoading: true });
    try {
      await axios.get('https://finnhub.io/api/v1/stock/price-target?symbol='+symbol+
       '&token='+this.keyData.apikey, { timeout: 30000 })
        .then( (response) => {
          this.setState({
            lastUpdated: response.data.lastUpdated,
            symbol: response.data.symbol,
            targetHigh: response.data.targetHigh,
            targetLow: response.data.targetLow,
            targetMean: response.data.targetMean,
            targetMedian: response.data.targetMedian,
            isLoading: false
          })
        }, (error) => {
          this.finnhubErrorHandler(error);
        } )
    } catch (e) {
      this.resetState();
      this.setState({ 
        error: 'An error occurred calling Finnhub API!'
      });
      console.log(e);
    }   
  }

  /**
   * Similar Stocks button used to call Finnhub API and return peers as an array,
   * which renders as a list in the modal window.
   * @param  {} symbol stock symbol. example: TSLA
   */
  async handlePeersClick(symbol) {
    this.resetState();
    this.keyData = JSON.parse(localStorage.getItem('apikey'));
    this.setState({ show: true, isLoading: true });
    try {
      await axios.get('https://finnhub.io/api/v1/stock/peers?symbol='+symbol+
       '&token='+this.keyData.apikey, { timeout: 30000 })
        .then( (response) => {
          if (response.data.length === 0){
            this.resetState();
          }
          this.setState({
            peers: response.data,
            symbol: symbol,
            isLoading: false})
        }, (error) => {
          this.finnhubErrorHandler(error);
        } )
    } catch (e) {
      this.resetState();
      this.setState({ 
        error: 'An error occurred calling Finnhub API!'
      });
      console.log(e);
    }   
  }

  /**
   * Recommendation button used to call Finnhub API and return recommendations as an array,
   * which renders in the modal window.
   * @param  {} symbol stock symbol. example: TSLA
   */
  async handleRecommendationClick(symbol) {
    this.resetState();
    this.keyData = JSON.parse(localStorage.getItem('apikey'));
    this.setState({ show: true, isLoading: true });
    try {
      await axios.get('https://finnhub.io/api/v1/stock/recommendation?symbol='+symbol+
       '&token='+this.keyData.apikey, { timeout: 30000 })
        .then( (response) => {
          if (response.data.length === 0){
            this.resetState();
            return;
          }
          var totalAnalysts = response.data[0].buy + response.data[0].sell + response.data[0].hold;
          this.setState({
            buy: response.data[0].buy,
            buyPercentage: parseFloat(response.data[0].buy/totalAnalysts*100).toFixed(1)+"%",
            hold: response.data[0].hold,
            holdPercentage: parseFloat(response.data[0].hold/totalAnalysts*100).toFixed(1)+"%",
            sell: response.data[0].sell,
            sellPercentage: parseFloat(response.data[0].sell/totalAnalysts*100).toFixed(1)+"%",
            strongBuy: response.data[0].strongBuy,
            strongSell: response.data[0].strongSell,
            period: response.data[0].period,
            symbol: symbol,
            isLoading: false})
        }, (error) => {
          this.finnhubErrorHandler(error);
        } )
    } catch (e) {
      this.resetState();
      this.setState({ 
        error: 'An error occurred calling Finnhub API!'
      });
      console.log(e);
    }   
  }
  
  /**
   * set error state as an error message depending on what error status is received.
   * @example
   * 401 - Authentication failure
   * 429 - Rate Limit Exceeded
   * default - 'Other status codes return a default error message'
   * @param  {} error api error response from Finnhub
   */
  finnhubErrorHandler(error){
    this.keyData = JSON.parse(localStorage.getItem('apikey'));
    var error_msg;
    var missing_apikey_msg = '';
    if(!this.keyData.apikey || this.keyData.apikey === ''){
      missing_apikey_msg = 'Please obtain an API Key from Finnhub.';
    }
    if(error.response === undefined){
      console.log("Error status not found!!! Most likely a timeout issue.");
      this.resetState();
      this.setState({ 
        error: ' An error occurred calling Finnhub API! ' + missing_apikey_msg
      });
      return;
    }
    switch (error.response.status) {
      case 401 :
        console.log("Authentication Failed!!!");
        error_msg = ' Finnhub is not accepting your key. Please delete your API Key and re-enter it. '
           + missing_apikey_msg;
        break
      case 429 :
        console.log("RateLimitExceeded!!!");
        error_msg = ' Finnhub API call limit has exceeded! '
           + missing_apikey_msg;
        break
      default :
        console.log("Finhub API Error!!!");
        error_msg = ' An error occurred calling Finnhub API! ' 
           + missing_apikey_msg;
        break
    }
    this.resetState();
    this.setState({ 
      error: error_msg
    });
  }

  /**
   * close the modal window
   */
  handleClose() {
		this.setState({ show: false });
  }
  
  /**
   * render the HTML for this component, 
   * containing buttons and modal window for Finnhub data
   */
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
                  <svg className="octicon octicon-alert" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fillRule="evenodd" d="M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 000 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 00.01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"></path></svg>
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
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
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
                  <p>Current Stock Price: <b>${this.state.current_price}</b></p>
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
                  <p><b>Note: </b>If the link opens to a &quot;Page not found&quot; error, 
                    the stock is not available on Robinhood.</p>
                  {this.state.peers.map(symbol => 
                    <ul key={symbol}>
                      <li><a href={'https://robinhood.com/stocks/'+symbol} target="_blank" rel="noopener noreferrer">
                        {symbol}
                      </a></li>
                    </ul>
                  )}
                </div>
              }
              {/* Recommendation Data */}
              {this.state.isLoading === false && this.state.buy != null &&
                <div>
                  <p>Last Updated: <b>{this.state.period}</b></p>
                  <p>Buy: <b>{this.state.buy} - {this.state.buyPercentage}</b></p>
                  <p>Sell: <b>{this.state.sell} - {this.state.sellPercentage}</b></p>
                  <p>Hold: <b>{this.state.hold} - {this.state.holdPercentage}</b></p>
                  <p>Strong Buy: <b>{this.state.strongBuy}</b></p>
                  <p>Strong Sell: <b>{this.state.strongSell}</b></p>
                </div>
              }              
              
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Details now require a premium account! */}
          {/* <Button style={{marginTop: '5px'}} variant="primary" onClick={() => this.handleDetailsClick(this.props.symbol)}>
            Details
          </Button>
          &nbsp; */}
          <Button style={{marginTop: '5px'}} variant="primary" 
            onClick={() => this.handlePriceQuoteClick(this.props.symbol)}>
            Price Quote
          </Button>
          &nbsp;
          <Button style={{marginTop: '5px'}} variant="primary" 
            onClick={() => this.handlePriceTargetClick(this.props.symbol)}>
            Price Target
          </Button>
          &nbsp;
          <Button style={{marginTop: '5px'}} variant="primary" 
            onClick={() => this.handlePeersClick(this.props.symbol)}>
            Similar Stocks
          </Button>
          &nbsp;
          <Button style={{marginTop: '5px'}} variant="primary" 
            onClick={() => this.handleRecommendationClick(this.props.symbol)}>
            Recommendation
          </Button>
        </>
      </div>
    );
  }

}

export default FinnhubData;
