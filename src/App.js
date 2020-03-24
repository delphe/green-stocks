import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import FormData from './components/FormData';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

class App extends React.Component {
  constructor () {
    super()
    this.handleDetailsClick = this.handleDetailsClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.resetState();
  }

  resetState(){
    this.state = {
      isLoading: false,
      name:'',
      ticker:'',
      description:'',
      exchange:'',
      weburl:''
    }
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
            ticker: response.data.ticker,
            isLoading: false
          })
        }, (error) => {
          switch (error.response.status) {
            case 401 :
              console.log("Authentication!!!");
              break
            case 429 :
              console.log("RateLimitExceeded!!!");
              break
            default :
              break
          }
        }
        )
    } catch (e) {
      console.log(e);
    }   
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
              {this.state.isLoading === false && this.state.ticker &&
                <div>
                  {this.state.ticker} - {this.state.name}
                </div>
              }
              {this.state.isLoading === false && !this.state.ticker &&
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
              {this.state.isLoading === false && !this.state.description &&
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
         
            <FormData />
            
            <div className="row">
              <div className="col-sm col-md-10 col-lg-8">
                <h3>Energy Efficient Transportation</h3>
                <p>TSLA - Tesla, Inc. engages in the design, development, manufacture, and sale of fully electric vehicles, energy generation and storage systems. 
                  Feel free to use <a href="https://www.tesla.com/referral/edwin1642?fbclid=IwAR3jREMZZO3LAr1TNs36zFeB_vygP9qFLjAILeEA2uXxqwwnfCMxVQXxbyM" target="_blank" rel="noopener noreferrer">
                  my referral code </a>if you want to buy one of their cars or solar systems. <br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('TSLA')}>
                    Details
                  </Button>
                </p>
                <p>NIO - A holding company, which engages in the design, manufacture, and sale of electric vehicles.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('NIO')}>
                    Details
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
                </p>
                <p>GE - General Electric Company has a Renewable Energy segment, which provides wind turbine platforms, hardware & software, offshore wind turbines, solutions, products & services to hydropower industry, blades for onshore & offshore wind turbines, and high voltage equipment.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('GE')}>
                    Details
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
                </p>
                <p>VSLR - Vivint Solar, Inc. engages in the provision of residential solar. It also designs and installs solar energy systems and offers monitoring and maintenance services.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('VSLR')}>
                    Details
                  </Button>
                </p>
                <p>JKS - JinkoSolar Holding Co., Ltd. engages in the design, development, production and marketing of photovoltaic products, and solar system integration services.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('JKS')}>
                    Details
                  </Button>
                </p>
                <p>SPWR - SunPower Corp. engages in the design, manufacture and deliver of solar panels and systems.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('SPWR')}>
                    Details
                  </Button>
                </p>
                <p>SEDG - SolarEdge Technologies, Inc. engages in the development of photovoltaic inverters, power optimizers, photovoltaic monitoring, software tools, and electric vehicle chargers.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('SEDG')}>
                    Details
                  </Button>
                </p>
                <p>RUN - SunRun, Inc. engages in the design, development, installation, sale, ownership and maintenance of residential solar energy systems.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('RUN')}>
                    Details
                  </Button>
                </p>
                <p>ENPH - Enphase Energy, Inc. engages in the design, development, manufacture, and sale of microinverter systems for the solar photovoltaic industry.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('ENPH')}>
                    Details
                  </Button>
                </p>
                <p>NOVA - Sunnova Energy International, Inc. engages in providing solar and energy storage services.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('NOVA')}>
                    Details
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
                </p>
                <p>IDA - IDACORP, Inc., also called IdaCorp, owns and operates hydroelectric plants on the Snake River and its tributaries.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('IDA')}>
                    Details
                  </Button>
                </p>
                <p>XYL - Xylem, Inc (formally ITT) provides water and wastewater applications with a broad portfolio of products and services addressing the full cycle of water, from collection, distribution and use to the return of water to the environment.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('XYL')}>
                    Details
                  </Button>
                </p>
                <p>PCG - PG&E Corporation, is a holding company, which specializes in energy, utility, power, gas, electricity, solar and sustainability. They have one of the largest investor-owned hydroelectric system in the nation.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('PCG')}>
                    Details
                  </Button>
                </p>
                <p>BEP - Brookfield Renewable Partners LP operates through following segments: Hydroelectric; Wind; Solar; Storage and Other.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('BEP')}>
                    Details
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
                </p>
                
                <h3>Waste Reduction</h3>
                <p>CVA - Covanta Holding Corp. engages in the operation and ownership of infrastructure for the conversion of waste to energy, related waste transport and disposal, and other renewable energy production businesses.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('CVA')}>
                    Details
                  </Button>
                </p>

                <h3>Pollution Reduction</h3>
                <p>FTEK - Fuel Tech, Inc. engages in the development, commercialization and application of proprietary technologies for air pollution control, process optimization, water treatment and advanced engineering services.<br/>
                  <Button variant="primary" onClick={() => this.handleDetailsClick('FTEK')}>
                    Details
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
