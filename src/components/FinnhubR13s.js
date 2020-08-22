import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {getRecommendation} from './FinnhubUtil.js';

/**
 * Displays Recommendations button.
 * When pressed, a modal window opens and displays recommendations from the Finnhub API
 * sorted by highest percentage of buy recommendations.
 * Note: R13s is short for Recommendations. I'm sure you can guess what R12n stands for. 
 * @component
 * @example
 * const stocklist = 'sustainable_co'
 */
class FinnhubR13s extends React.Component {
  static propTypes = {
    /**
     * Which Type of Stock List to use. Example: sustainable_co or finnhub
     */
    stocklist: PropTypes.string.isRequired
  }
  constructor () {
    super();
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      isLoading: false,
      buy: null,
      r13s: [],
      sustainable_co: ['CSCO','HPE','MKC','PLD','DHR','HPQ','CMA','CHYHY','NVZMY',
        'ING','BDORY','AQNA','UMICY','CIG','ACN','TSM','SNY','KNYJY','ISNPY','SIEGY',
        'NABZY','SHG','BDRBF','UL','BMO','SGBLY','ERIC','CNI','CSIQ','WDAY'],
      finnhub_stocks: ['TSLA','NIO','NKLA','FCEL','ENS','GE','FSLR','VSLR','JKS',
        'SPWR','SEDG','RUN','ENPH','NOVA','AWK','IDA','XLY','PCG','BEP','UNFI','CVA',
        'FTEK','EFOI','SOLO','AY'],
      // TODO: find another API that can lookup these other stocks
      // other_stocks: ['BLDP','PCRFY','VWDRY','NEP','FAN','TAN','ORA','EVX','PZD']
      // eft_stocks: ['ESGU','ESGE','SUSL','ESGD','DSI','SUSA','ICLN','LDEM','CRBN','SUSB','EAGG','ESML','SUSC','SDG','BGRN']
    };
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
    });
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
      stock_array = this.state.sustainable_co;
    }
    this.resetState();
    this.setState({ show: true, isLoading: true });
    var keyData = JSON.parse(localStorage.getItem('apikey'));
    var r13sArray = [];
    for (const [,symbol] of stock_array.entries()) {
      var r13sObj = await getRecommendation(symbol, keyData.apikey);
      if (r13sObj.error === null){
        r13sArray.push(r13sObj);
        this.setState({
          symbol: symbol,
          isLoading: false});
      } else {
        r13sArray.push({
          symbol: symbol,
          buyPercentNum: 0,
          error: r13sObj.error
        });
      }
    }
    this.state.r13s = [...r13sArray];
    //Sorting by the highest percentage of buy recommendations
    this.sortR13s(true);
    this.setState({ isLoading: false });
  }  

  /**
   * Sort the list of recommendations by highest percentage of buy or sell recommendations.
   * @param {*} buy - boolean value - true if sorting by buy, false if sorting by sell
   */
  sortR13s(buy){
    if (buy) {
      this.state.r13s.sort((b,a) => 
      a.buyPercentNum - b.buyPercentNum || 
      a.buy - b.buy ||
      a.strongBuy - b.strongBuy ||
      a.hold - b.hold);
    } else {
      this.state.r13s.sort((b,a) => 
      a.sellPercentNum - b.sellPercentNum || 
      a.sell - b.sell ||
      a.strongSell - b.strongSell ||
      b.hold - a.hold);
    }
    this.setState({r13s: this.state.r13s});
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
                  Sort: <Button variant="secondary" 
                          onClick={() => this.sortR13s(true)}>
                          Buy
                        </Button> &nbsp;
                        <Button variant="secondary" 
                          onClick={() => this.sortR13s(false)}>
                          Sell
                        </Button>
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
