import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import FinnhubAuth from './components/FinnhubAuth';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

class App extends React.Component {
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

  finnhubErrorHandler(error){
    switch (error.response.status) {
      case 401 :
        console.log("Authentication Failed!!!");
        this.setState({ 
          error: "Finnhub is not accepting your key. Please delete your API Key and re-enter it.",
          isLoading: false,
          show: false
        });
        break
      case 429 :
        console.log("RateLimitExceeded!!!");
        this.setState({ 
          error: "Finnhub API call limit has exceeded. Please try again later."
        });
        break
      default :
        console.log("Finhub API Error!!!");
        this.setState({ 
          error: "An error occurred calling Finnhub API. Please try again later."
        });
        break
    }
    this.setState({ 
      isLoading: false,
      show: false
    });
  }

  handleClose() {
		this.setState({ show: false });
	}
  
  render() {
    return (
      <div>
        <Navigation/>
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
              {this.state.isLoading === false && this.state.description &&
                <div>
                  <p>{this.state.description}</p>
                  <p>Exchange: {this.state.exchange}</p>
                  {this.state.weburl &&
                    <p><a href={ `${this.state.weburl}` } target="_blank" rel="noopener noreferrer">{this.state.weburl}</a></p>
                  }
                </div>
              }
              {this.state.isLoading === false && this.state.targetHigh &&
                <div>
                  <p>Last Updated: <b>{this.state.lastUpdated}</b></p>
                  <p>Target High: <b>${this.state.targetHigh}</b></p>
                  <p>Target Low: <b>${this.state.targetLow}</b></p>
                  <p>Target Mean: <b>${this.state.targetMean}</b></p>
                  <p>Target Median: <b>${this.state.targetMedian}</b></p>
                </div>
              }
              {this.state.isLoading === false && !this.state.symbol &&
                <p>No details found!</p>
              }
              {this.state.isLoading === true &&
                <div>
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span>Searching...</span>
                </div>
              }
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        <header className="App-header">
          <p>Green Stocks is a consolidated list of stocks found to be environmentally friendly.</p>
          <p>If you don't have a Robinhood account, use 
            <a href="https://join.robinhood.com/edwind329" target="_blank" rel="noopener noreferrer"> my referral link </a>
            to get a free stock!
          </p>
          <p>All of these "green stocks" should be available on Robinhood... </p>
        </header>
        <div className="App-body">
          <div className="container">
              
            <FinnhubAuth />
            {this.state.error &&
              <div className="alert alert-danger" role="alert">
                <svg className="octicon octicon-alert" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 000 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 00.01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"></path></svg>
                {this.state.error}
              </div>
            }
            
            <div className="row">
              <div className="col-sm col-md-10 col-lg-8">
                <h3>Energy Efficient Transportation</h3>
                <p>TSLA - Tesla, Inc. engages in the design, development, manufacture, and sale of fully electric vehicles, energy generation and storage systems. 
                  Feel free to use <a href="https://www.tesla.com/referral/edwin1642?fbclid=IwAR3jREMZZO3LAr1TNs36zFeB_vygP9qFLjAILeEA2uXxqwwnfCMxVQXxbyM" target="_blank" rel="noopener noreferrer">
                  my referral code </a>if you want to buy one of their cars or solar systems. <br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('TSLA')}>
                    Details
                  </Button>
                  &nbsp;
                  <Button variant="primary" onClick={() => this.handlePriceTargetClick('TSLA')}>
                    Price Target
                  </Button>
                  
                </p>
                <p>NIO - A holding company, which engages in the design, manufacture, and sale of electric vehicles.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('NIO')}>
                    Details
                  </Button>
                  &nbsp;
                  <Button variant="primary" onClick={() => this.handlePriceTargetClick('NIO')}>
                    Price Target
                  </Button>
                </p>
                <p>BLDP - Ballard Power Systems, Inc. engages in the design, development, manufacture, sale, and service of fuel cell products for a variety of applications.<br/>
                  {/* <Button variant="primary" onClick={() => this.handleDetailsClick('BLDP')}>
                    Details
                  </Button> */}
                </p>
                <p>FCEL - FuelCell Energy, Inc. engages in the provision of fuel cell power plant production and research.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('FCEL')}>
                    Details
                  </Button>
                  &nbsp;
                  <Button variant="primary" onClick={() => this.handlePriceTargetClick('FCEL')}>
                    Price Target
                  </Button>
                </p>
                <p>PCRFY - Panasonic Corp - The Automotive and Industrial System segment develops, manufactures, sells and provide services such as lithium-ion batteries.<br/>
                  {/* <Button variant="primary" onClick={() => this.handleDetailsClick('PCRFY')}>
                    Details
                  </Button> */}
                </p>
                <p>ENS - EnerSys manufactures and markets industrial batteries.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('ENS')}>
                    Details
                  </Button>
                  &nbsp;
                  <Button variant="primary" onClick={() => this.handlePriceTargetClick('ENS')}>
                    Price Target
                  </Button>
                </p>
                
                <h3>Wind</h3>
                <p>VWDRY - Vestas Wind Systems engages in the development, manufacture, sale, and maintenance of wind power plants.<br/>
                  {/* <Button variant="primary" onClick={() => this.handleDetailsClick('VWDRY')}>
                    Details
                  </Button> */}
                </p>
                <p>NEP - NextEra Energy Partners LP owns interests in wind and solar projects in North America, as well as natural gas infrastructure assets in Texas.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('NEP')}>
                    Details
                  </Button>
                  &nbsp;
                  <Button variant="primary" onClick={() => this.handlePriceTargetClick('NEP')}>
                    Price Target
                  </Button>
                </p>
                <p>GE - General Electric Company has a Renewable Energy segment, which provides wind turbine platforms, hardware & software, offshore wind turbines, solutions, products & services to hydropower industry, blades for onshore & offshore wind turbines, and high voltage equipment.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('GE')}>
                    Details
                  </Button>
                  &nbsp;
                  <Button variant="primary" onClick={() => this.handlePriceTargetClick('GE')}>
                    Price Target
                  </Button>
                </p>
                <p>FAN - First Trust Global Wind Energy tracks an index of companies involved in the wind energy industry weighted according to float-adjusted market cap with strict limits on individual holdings.<br/>
                  {/* <Button variant="primary" onClick={() => this.handleDetailsClick('FAN')}>
                    Details
                  </Button> */}
                </p>

                <h3>Solar</h3>
                <p>FSLR - First Solar, Inc. engages in designing, manufacturing, marketing, and distribution of photovoltaic solar power systems and solar modules.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('FSLR')}>
                    Details
                  </Button>
                  &nbsp;
                  <Button variant="primary" onClick={() => this.handlePriceTargetClick('FSLR')}>
                    Price Target
                  </Button>
                </p>
                <p>VSLR - Vivint Solar, Inc. engages in the provision of residential solar. It also designs and installs solar energy systems and offers monitoring and maintenance services.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('VSLR')}>
                    Details
                  </Button>
                  &nbsp;
                  <Button variant="primary" onClick={() => this.handlePriceTargetClick('VSLR')}>
                    Price Target
                  </Button>
                </p>
                <p>JKS - JinkoSolar Holding Co., Ltd. engages in the design, development, production and marketing of photovoltaic products, and solar system integration services.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('JKS')}>
                    Details
                  </Button>
                  &nbsp;
                  <Button variant="primary" onClick={() => this.handlePriceTargetClick('JKS')}>
                    Price Target
                  </Button>
                </p>
                <p>SPWR - SunPower Corp. engages in the design, manufacture and deliver of solar panels and systems.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('SPWR')}>
                    Details
                  </Button>
                  &nbsp;
                  <Button variant="primary" onClick={() => this.handlePriceTargetClick('SPWR')}>
                    Price Target
                  </Button>
                </p>
                <p>SEDG - SolarEdge Technologies, Inc. engages in the development of photovoltaic inverters, power optimizers, photovoltaic monitoring, software tools, and electric vehicle chargers.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('SEDG')}>
                    Details
                  </Button>
                  &nbsp;
                  <Button variant="primary" onClick={() => this.handlePriceTargetClick('SEDG')}>
                    Price Target
                  </Button>
                </p>
                <p>RUN - SunRun, Inc. engages in the design, development, installation, sale, ownership and maintenance of residential solar energy systems.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('RUN')}>
                    Details
                  </Button>
                  &nbsp;
                  <Button variant="primary" onClick={() => this.handlePriceTargetClick('RUN')}>
                    Price Target
                  </Button>
                </p>
                <p>ENPH - Enphase Energy, Inc. engages in the design, development, manufacture, and sale of microinverter systems for the solar photovoltaic industry.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('ENPH')}>
                    Details
                  </Button>
                  &nbsp;
                  <Button variant="primary" onClick={() => this.handlePriceTargetClick('ENPH')}>
                    Price Target
                  </Button>
                </p>
                <p>NOVA - Sunnova Energy International, Inc. engages in providing solar and energy storage services.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('NOVA')}>
                    Details
                  </Button>
                  &nbsp;
                  <Button variant="primary" onClick={() => this.handlePriceTargetClick('NOVA')}>
                    Price Target
                  </Button>
                </p>
                <p>TAN - Guggenheim Solar ETF tracks an index of solar energy companies selected based on the relative importance of solar power to the company's business model.<br/>
                  {/* <Button variant="primary" onClick={() => this.handleDetailsClick('TAN')}>
                    Details
                  </Button> */}
                </p>

                <h3>Water</h3>
                <p>AWK - American Water Works Co., Inc. engages in the provision of complementary water and wastewater services.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('AWK')}>
                    Details
                  </Button>
                  &nbsp;
                  <Button variant="primary" onClick={() => this.handlePriceTargetClick('AWK')}>
                    Price Target
                  </Button>
                </p>
                <p>IDA - IDACORP, Inc., also called IdaCorp, owns and operates hydroelectric plants on the Snake River and its tributaries.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('IDA')}>
                    Details
                  </Button>
                  &nbsp;
                  <Button variant="primary" onClick={() => this.handlePriceTargetClick('IDA')}>
                    Price Target
                  </Button>
                </p>
                <p>XYL - Xylem, Inc (formally ITT) provides water and wastewater applications with a broad portfolio of products and services addressing the full cycle of water, from collection, distribution and use to the return of water to the environment.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('XYL')}>
                    Details
                  </Button>
                  &nbsp;
                  <Button variant="primary" onClick={() => this.handlePriceTargetClick('XYL')}>
                    Price Target
                  </Button>
                </p>
                <p>PCG - PG&E Corporation, is a holding company, which specializes in energy, utility, power, gas, electricity, solar and sustainability. They have one of the largest investor-owned hydroelectric system in the nation.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('PCG')}>
                    Details
                  </Button>
                  &nbsp;
                  <Button variant="primary" onClick={() => this.handlePriceTargetClick('PCG')}>
                    Price Target
                  </Button>
                </p>
                <p>BEP - Brookfield Renewable Partners LP operates through following segments: Hydroelectric; Wind; Solar; Storage and Other.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('BEP')}>
                    Details
                  </Button>
                  &nbsp;
                  <Button variant="primary" onClick={() => this.handlePriceTargetClick('BEP')}>
                    Price Target
                  </Button>
                </p>

                <h3>Geothermal</h3>
                <p>ORA - Ormat Technologies, Inc., also called Ormat, is a holding company, which engages in the provision of geothermal and recovered energy power business.<br/>
                  {/* <Button variant="primary" onClick={() => this.handleDetailsClick('ORA')}>
                    Details
                  </Button> */}
                </p>

                <h3>Food</h3>
                <p>UNFI - United Natural Foods, Inc. engages in the distribution of natural, organic, and specialty foods and non-food products.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('UNFI')}>
                    Details
                  </Button>
                  &nbsp;
                  <Button variant="primary" onClick={() => this.handlePriceTargetClick('UNFI')}>
                    Price Target
                  </Button>
                </p>
                
                <h3>Waste Reduction</h3>
                <p>CVA - Covanta Holding Corp. engages in the operation and ownership of infrastructure for the conversion of waste to energy, related waste transport and disposal, and other renewable energy production businesses.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('CVA')}>
                    Details
                  </Button>
                  &nbsp;
                  <Button variant="primary" onClick={() => this.handlePriceTargetClick('CVA')}>
                    Price Target
                  </Button>
                </p>

                <h3>Pollution Reduction</h3>
                <p>FTEK - Fuel Tech, Inc. engages in the development, commercialization and application of proprietary technologies for air pollution control, process optimization, water treatment and advanced engineering services.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('FTEK')}>
                    Details
                  </Button>
                  &nbsp;
                  <Button variant="primary" onClick={() => this.handlePriceTargetClick('FTEK')}>
                    Price Target
                  </Button>
                </p>
                <p>EVX - VanEck Vectors Environmental Services ETF tracks a tiered equal-weighted index of companies that stand to benefit from increased demand for waste management.<br/>
                  {/* <Button variant="primary" onClick={() => this.handleDetailsClick('EVX')}>
                    Details
                  </Button> */}
                </p>
                <p>PZD - PowerShares Cleantech Portfolio tracks a tiered equal-weighted index of companies in the cleantech industry selected for their outperformance potential.<br/>
                  {/* <Button variant="primary" onClick={() => this.handleDetailsClick('PZD')}>
                    Details
                  </Button> */}
                </p>
              </div>
            </div>
          </div>
        </div>
        </>
      </div>
    );
  }

}

export default App;
