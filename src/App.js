import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import FinnhubAuth from './components/FinnhubAuth';
import FinnhubData from './components/FinnhubData';

class App extends React.Component {  
  render() {
    return (
      <div>
        <Navigation/>
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
            <div className="row">
              <div className="col-sm col-md-10 col-lg-8">
                <h3>Energy Efficient Transportation</h3>
                <p>
                  <a href="https://robinhood.com/stocks/TSLA" target="_blank" rel="noopener noreferrer">
                    TSLA </a>
                   - Tesla, Inc. engages in the design, development, manufacture, and sale of fully electric vehicles, energy generation and storage systems. 
                  Feel free to use <a href="https://www.tesla.com/referral/edwin1642?fbclid=IwAR3jREMZZO3LAr1TNs36zFeB_vygP9qFLjAILeEA2uXxqwwnfCMxVQXxbyM" target="_blank" rel="noopener noreferrer">
                  my referral code </a>if you want to buy one of their cars or solar systems. <br/>
                  <FinnhubData symbol="TSLA" />
                </p>
                <p>
                  <a href="https://robinhood.com/stocks/NIO" target="_blank" rel="noopener noreferrer">
                  NIO </a>
                     - A holding company, which engages in the design, manufacture, and sale of electric vehicles.<br/>
                  <FinnhubData symbol="NIO" />
                </p>
                <p>
                  <a href="https://robinhood.com/stocks/BLDP" target="_blank" rel="noopener noreferrer">
                  BLDP </a>
                   - Ballard Power Systems, Inc. engages in the design, development, manufacture, sale, and service of fuel cell products for a variety of applications.<br/>
                  {/* <FinnhubData symbol="BLDP" /> */}
                </p>
                <p>
                  <a href="https://robinhood.com/stocks/FCEL" target="_blank" rel="noopener noreferrer">
                  FCEL </a>
                   - FuelCell Energy, Inc. engages in the provision of fuel cell power plant production and research.<br/>
                  <FinnhubData symbol="FCEL" />
                </p>
                <p>
                  <a href="https://robinhood.com/stocks/PCRFY" target="_blank" rel="noopener noreferrer">
                  PCRFY </a>
                   - Panasonic Corp - The Automotive and Industrial System segment develops, manufactures, sells and provide services such as lithium-ion batteries.<br/>
                   {/* <FinnhubData symbol="PCRFY" /> */}
                </p>
                <p>
                  <a href="https://robinhood.com/stocks/ENS" target="_blank" rel="noopener noreferrer">
                  ENS </a>
                   - EnerSys manufactures and markets industrial batteries.<br/>
                  <FinnhubData symbol="ENS" />
                  
                </p>
                
                <h3>Wind</h3>
                <p>
                  <a href="https://robinhood.com/stocks/VWDRY" target="_blank" rel="noopener noreferrer">
                  VWDRY </a>
                   - Vestas Wind Systems engages in the development, manufacture, sale, and maintenance of wind power plants.<br/>
                   {/* <FinnhubData symbol="VWDRY" /> */}
                </p>
                <p>
                  <a href="https://robinhood.com/stocks/NEP" target="_blank" rel="noopener noreferrer">
                  NEP </a>
                   - NextEra Energy Partners LP owns interests in wind and solar projects in North America, as well as natural gas infrastructure assets in Texas.<br/>
                   <FinnhubData symbol="NEP" />
                </p>
                <p>
                  <a href="https://robinhood.com/stocks/GE" target="_blank" rel="noopener noreferrer">
                  GE </a>
                   - General Electric Company has a Renewable Energy segment, which provides wind turbine platforms, hardware & software, offshore wind turbines, solutions, products & services to hydropower industry, blades for onshore & offshore wind turbines, and high voltage equipment.<br/>
                   <FinnhubData symbol="GE" />
                </p>
                <p>
                  <a href="https://robinhood.com/stocks/FAN" target="_blank" rel="noopener noreferrer">
                  FAN </a>
                   - First Trust Global Wind Energy tracks an index of companies involved in the wind energy industry weighted according to float-adjusted market cap with strict limits on individual holdings.<br/>
                   {/* <FinnhubData symbol="FAN" /> */}
                </p>

                <h3>Solar</h3>
                <p>
                  <a href="https://robinhood.com/stocks/FSLR" target="_blank" rel="noopener noreferrer">
                  FSLR </a>
                   - First Solar, Inc. engages in designing, manufacturing, marketing, and distribution of photovoltaic solar power systems and solar modules.<br/>
                   <FinnhubData symbol="FSLR" />
                </p>
                <p>
                  <a href="https://robinhood.com/stocks/VSLR" target="_blank" rel="noopener noreferrer">
                  VSLR </a>
                   - Vivint Solar, Inc. engages in the provision of residential solar. It also designs and installs solar energy systems and offers monitoring and maintenance services.<br/>
                   <FinnhubData symbol="VSLR" />
                </p>
                <p>
                  <a href="https://robinhood.com/stocks/JKS" target="_blank" rel="noopener noreferrer">
                  JKS </a>
                 - JinkoSolar Holding Co., Ltd. engages in the design, development, production and marketing of photovoltaic products, and solar system integration services.<br/>
                 <FinnhubData symbol="JKS" />
                </p>
                <p>
                  <a href="https://robinhood.com/stocks/SPWR" target="_blank" rel="noopener noreferrer">
                  SPWR </a>
                 - SunPower Corp. engages in the design, manufacture and deliver of solar panels and systems.<br/>
                 <FinnhubData symbol="SPWR" />
                </p>
                <p>
                  <a href="https://robinhood.com/stocks/SEDG" target="_blank" rel="noopener noreferrer">
                  SEDG </a>
                 - SolarEdge Technologies, Inc. engages in the development of photovoltaic inverters, power optimizers, photovoltaic monitoring, software tools, and electric vehicle chargers.<br/>
                 <FinnhubData symbol="SEDG" />
                </p>
                <p>
                  <a href="https://robinhood.com/stocks/RUN" target="_blank" rel="noopener noreferrer">
                  RUN </a>
                   - SunRun, Inc. engages in the design, development, installation, sale, ownership and maintenance of residential solar energy systems.<br/>
                   <FinnhubData symbol="RUN" />
                </p>
                <p>
                  <a href="https://robinhood.com/stocks/ENPH" target="_blank" rel="noopener noreferrer">
                  ENPH </a>
                   - Enphase Energy, Inc. engages in the design, development, manufacture, and sale of microinverter systems for the solar photovoltaic industry.<br/>
                   <FinnhubData symbol="ENPH" />
                </p>
                <p>
                  <a href="https://robinhood.com/stocks/NOVA" target="_blank" rel="noopener noreferrer">
                  NOVA </a>
                   - Sunnova Energy International, Inc. engages in providing solar and energy storage services.<br/>
                   <FinnhubData symbol="NOVA" />
                </p>
                <p>
                  <a href="https://robinhood.com/stocks/TAN" target="_blank" rel="noopener noreferrer">
                  TAN </a>
                   - Guggenheim Solar ETF tracks an index of solar energy companies selected based on the relative importance of solar power to the company's business model.<br/>
                   {/* <FinnhubData symbol="TAN" /> */}
                </p>

                <h3>Water</h3>
                <p>
                  <a href="https://robinhood.com/stocks/AWK" target="_blank" rel="noopener noreferrer">
                  AWK </a>
                   - American Water Works Co., Inc. engages in the provision of complementary water and wastewater services.<br/>
                   <FinnhubData symbol="AWK" />
                </p>
                <p>
                  <a href="https://robinhood.com/stocks/IDA" target="_blank" rel="noopener noreferrer">
                  IDA </a>
                   - IDACORP, Inc., also called IdaCorp, owns and operates hydroelectric plants on the Snake River and its tributaries.<br/>
                   <FinnhubData symbol="IDA" />
                </p>
                <p>
                  <a href="https://robinhood.com/stocks/XYL" target="_blank" rel="noopener noreferrer">
                  XYL </a>
                   - Xylem, Inc (formally ITT) provides water and wastewater applications with a broad portfolio of products and services addressing the full cycle of water, from collection, distribution and use to the return of water to the environment.<br/>
                   <FinnhubData symbol="XYL" />
                </p>
                <p>
                  <a href="https://robinhood.com/stocks/PCG" target="_blank" rel="noopener noreferrer">
                  PCG </a>
                   - PG&E Corporation, is a holding company, which specializes in energy, utility, power, gas, electricity, solar and sustainability. They have one of the largest investor-owned hydroelectric system in the nation.<br/>
                   <FinnhubData symbol="PCG" />
                </p>
                <p>
                  <a href="https://robinhood.com/stocks/BEP" target="_blank" rel="noopener noreferrer">
                  BEP </a>
                   - Brookfield Renewable Partners LP operates through following segments: Hydroelectric; Wind; Solar; Storage and Other.<br/>
                   <FinnhubData symbol="BEP" />
                </p>

                <h3>Geothermal</h3>
                <p>
                  <a href="https://robinhood.com/stocks/ORA" target="_blank" rel="noopener noreferrer">
                  ORA </a>
                   - Ormat Technologies, Inc., also called Ormat, is a holding company, which engages in the provision of geothermal and recovered energy power business.<br/>
                   {/* <FinnhubData symbol="ORA" /> */}
                </p>

                <h3>Food</h3>
                <p>
                  <a href="https://robinhood.com/stocks/UNFI" target="_blank" rel="noopener noreferrer">
                  UNFI </a>
                   - United Natural Foods, Inc. engages in the distribution of natural, organic, and specialty foods and non-food products.<br/>
                   <FinnhubData symbol="UNFI" />
                </p>
                
                <h3>Waste Reduction</h3>
                <p>
                  <a href="https://robinhood.com/stocks/CVA" target="_blank" rel="noopener noreferrer">
                  CVA </a>
                   - Covanta Holding Corp. engages in the operation and ownership of infrastructure for the conversion of waste to energy, related waste transport and disposal, and other renewable energy production businesses.<br/>
                   <FinnhubData symbol="CVA" />
                </p>

                <h3>Pollution Reduction</h3>
                <p>
                  <a href="https://robinhood.com/stocks/FTEK" target="_blank" rel="noopener noreferrer">
                  FTEK </a>
                 - Fuel Tech, Inc. engages in the development, commercialization and application of proprietary technologies for air pollution control, process optimization, water treatment and advanced engineering services.<br/>
                 <FinnhubData symbol="FTEK" />
                </p>
                <p>
                  <a href="https://robinhood.com/stocks/EVX" target="_blank" rel="noopener noreferrer">
                  EVX </a>
                   - VanEck Vectors Environmental Services ETF tracks a tiered equal-weighted index of companies that stand to benefit from increased demand for waste management.<br/>
                   {/* <FinnhubData symbol="EVX" /> */}
                </p>
                <p>
                  <a href="https://robinhood.com/stocks/PZD" target="_blank" rel="noopener noreferrer">
                  PZD </a>
                   - PowerShares Cleantech Portfolio tracks a tiered equal-weighted index of companies in the cleantech industry selected for their outperformance potential.<br/>
                   {/* <FinnhubData symbol="PZD" /> */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
