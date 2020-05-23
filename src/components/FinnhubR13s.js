import React from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * Displays Recommendations button.
 * When pressed, a modal window opens and displays recommendations from the Finnhub API
 * sorted by highest percentage of buy recommendations.
 * Note: R13s is short for Recommendations. I'm sure you can guess what R12n stands for. 
 * @component
 * @example
 * const stocklist = 'yahoo'
 */
class FinnhubR13s extends React.Component {
  static propTypes = {
    /**
     * Which Type of Stock List to use. Example: yahoo or finnhub
     */
    stocklist: PropTypes.string.isRequired
  }
  constructor () {
    super()
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      isLoading: false,
      buy: null,
      r13s: [],
      yahoo_stocks: ['CI','KOF','NGG','LBRDA','ET','FOXA','ACGLO','YNDX','TEVA','ZG','MT','IHG','MBT','WRK','SQM','CIB','CLR','ZION','AVAL','XRX','WPX','VEON','TGNA'],
      // Listed on Finnhub but not Robinhood: 'WFC-PY','BRK-A','NYCB-PA','KIM-PL','NLY-PF','FRC-PH','DLR-PJ'
      finnhub_stocks: ['TSLA','NIO','FCEL','ENS','GE','FSLR','VSLR','JKS','SPWR','SEDG','RUN','ENPH','NOVA','AWK','IDA','XLY','PCG','BEP','UNFI','CVA','FTEK'],
      //TODO: find another API that can lookup these other stocks
      other_stocks: ['BLDP','PCRFY','VWDRY','NEP','FAN','TAN','ORA','EVX','PZD']
    }
  }
  /**
   * reset all data saved to state back to default values 
   * to prevent old data from being displayed when modal is reopened
   */
  resetState(){
    this.setState({
      isLoading: false,
      buy: null,
      r13s: [],
    })
  }

  /**
   * Recommendations button used to call Finnhub API and return recommendations as an array,
   * which renders in the modal window.
   */
  async handleRecommendationsClick(stocklist) {
    let stock_array = [];
    if (stocklist === 'finnhub') {
      stock_array = this.state.finnhub_stocks;
    } else {
      stock_array = this.state.yahoo_stocks;
    }
    this.resetState();
    this.setState({ show: true, isLoading: true });
    var keyData = JSON.parse(localStorage.getItem('apikey'));
    var r13sObj = [];
    for (const [,symbol] of stock_array.entries()) {
      try {
        await axios.get('https://finnhub.io/api/v1/stock/recommendation?symbol='+symbol+'&token='+keyData.apikey)
          .then( (response) => {
            if (response.data.length>0) {
              var totalAnalysts = response.data[0].buy + response.data[0].sell + response.data[0].hold;
              r13sObj.push({
                symbol: symbol,
                buy: response.data[0].buy,
                buyPercentNum: this.divide(response.data[0].buy, totalAnalysts),
                buyPercentage: parseFloat(this.divide(response.data[0].buy, totalAnalysts)*100).toFixed(1)+"%",
                hold: response.data[0].hold,
                holdPercentage: parseFloat(this.divide(response.data[0].hold, totalAnalysts)*100).toFixed(1)+"%",
                sell: response.data[0].sell,
                sellPercentage: parseFloat(this.divide(response.data[0].sell, totalAnalysts)*100).toFixed(1)+"%",
                strongBuy: response.data[0].strongBuy,
                strongSell: response.data[0].strongSell,
                period: response.data[0].period,
                error: null
              })
            } else {
              r13sObj.push({
                symbol: symbol,
                buy: 0,
                buyPercentNum: 0,
                buyPercentage: '0%',
                hold: 0,
                holdPercentage: '0%',
                sell: 0,
                sellPercentage: '0%',
                strongBuy: 0,
                strongSell: 0,
                period: 0,
                error: null
              })
            }
            
          }, (error) => {
            r13sObj.push({
              symbol: symbol,
              buyPercentNum: 0,
              error: this.finnhubErrorHandler(error)
            })
          } )
      } catch (e) {
        console.log(e);
      }   
    }

    //Sorting by the highest percentage of buy recommendations
    this.state.r13s = [...r13sObj];
    this.state.r13s.sort((b,a) => 
      a.buyPercentNum - b.buyPercentNum || 
      a.strongBuy - b.strongBuy ||
      a.hold - b.hold);
    this.setState({ isLoading: false })
  }  

  /**
   * If the denominator is 0, just return 0
   * @param {*} numerator should be a valid number
   * @param {*} denominator should be a valid number
   */
  divide(numerator, denominator){
    if (denominator === 0) {
      return 0;
    } else {
      return (numerator/denominator);
    }
  }
  
  /**
   * return an error message as string depending on what error status is received.
   * @example
   * 401 - Authentication failure
   * 429 - Rate Limit Exceeded
   * default - 'Other status codes return a default error message'
   * @param  {} error api error response from Finnhub
   */
  finnhubErrorHandler(error){
    switch (error.response.status) {
      case 401 :
        return 'Authentication Failed! Try deleting your API Key and re-enter it.';
      case 429 :
        return 'Finnhub API call limit has exceeded!';
      default :
        return 'An error occurred calling Finnhub API!';
    }
  }

  /**
   * close the modal window
   */
  handleClose() {
		this.setState({ show: false });
  }
  
  /**
   * render the HTML for this component, 
   * containing button and modal window for Finnhub data
   */
  render() {
    return (
      <div>
        <>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
              {this.state.isLoading === true && <div>Please Wait</div>}
              {this.state.isLoading === false &&
                <div>
                  Recommendations
                </div>
              }
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Loading... */}
              {this.state.isLoading === true &&
                <div>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span>Searching...</span>
                </div>
              }
              {/* No Data */}
              {this.state.isLoading === false && !this.state.r13s.length === 0 &&
                <p>No data found!</p>
              }
              
              {/* Recommendation Data */}
              {this.state.isLoading === false &&
                <div>
                  {this.state.r13s.map((r12n) => (
                    <div key={this.state.r13s.symbol}>
                      <h3><a href={'https://robinhood.com/stocks/'+r12n.symbol} target="_blank" rel="noopener noreferrer">
                          {r12n.symbol}</a></h3>

                      {/* Error when using this symbol */}
                      {r12n.error &&
                      <div className="alert alert-danger" role="alert">
                        <svg className="octicon octicon-alert" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fillRule="evenodd" d="M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 000 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 00.01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"></path></svg>
                        &nbsp;{r12n.error}
                      </div>
                      }

                      {/* Data obtained for this symbol */}
                      {r12n.buy != null &&
                      <div>
                        <p>Last Updated: <b>{r12n.period}</b></p>
                        <p>Buy: <b>{r12n.buy} - {r12n.buyPercentage}</b></p>
                        <p>Sell: <b>{r12n.sell} - {r12n.sellPercentage}</b></p>
                        <p>Hold: <b>{r12n.hold} - {r12n.holdPercentage}</b></p>
                        <p>Strong Buy: <b>{r12n.strongBuy}</b></p>
                        <p>Strong Sell: <b>{r12n.strongSell}</b></p>
                      </div>
                      }
                    </div>
                  ))}
                  
                </div>
              }              
              
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Button style={{marginTop: '5px'}} variant="primary" 
            onClick={() => this.handleRecommendationsClick(this.props.stocklist)}>
            Recommendations
          </Button>
        </>
      </div>
    );
  }

}

export default FinnhubR13s;
