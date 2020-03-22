import React from 'react';
import './App.css';
import Navigation from './components/Navigation'

function App() {
  return (
    <div>
      <Navigation/>
      <header className="App-header">
        <p>Green Stocks will soon have live data on all recommended stocks below.</p>
        <p>If you don't already have a Robinhood account, use 
          <a href="https://join.robinhood.com/edwind329" target="_blank" rel="noopener noreferrer"> my referral link </a>
          to get a free stock!
        </p>
        <p>All of these "green stocks" should be available on Robinhood... </p>
      </header>
      <div className="App-body">
        <div className="container">
          <div className="row">
            <div className="col-sm col-md-10 col-lg-8">
            <h3>Energy Efficient Transportation</h3>
            <p>TSLA - Tesla, Inc. engages in the design, development, manufacture, and sale of fully electric vehicles, energy generation and storage systems. 
            Feel free to use <a href="https://www.tesla.com/referral/edwin1642?fbclid=IwAR3jREMZZO3LAr1TNs36zFeB_vygP9qFLjAILeEA2uXxqwwnfCMxVQXxbyM" target="_blank" rel="noopener noreferrer">
            my referral code </a>if you want to buy one of their cars or solar systems.</p>
          <p>NIO - A holding company, which engages in the design, manufacture, and sale of electric vehicles.</p>
          <p>BLDP - Ballard Power Systems, Inc. engages in the design, development, manufacture, sale, and service of fuel cell products for a variety of applications.</p>
          <p>FCEL - FuelCell Energy, Inc. engages in the provision of fuel cell power plant production and research.</p>
          <p>PCRFY - Panasonic Corp - The Automotive and Industrial System segment develops, manufactures, sells and provide services such as lithium-ion batteries.</p>
          <p>ENS - EnerSys manufactures and markets industrial batteries.</p>
          
          <h3>Wind</h3>
          <p>VWDRY - Vestas Wind Systems engages in the development, manufacture, sale, and maintenance of wind power plants.</p>
          <p>NEP - NextEra Energy Partners LP owns interests in wind and solar projects in North America, as well as natural gas infrastructure assets in Texas.</p>
          <p>GE - General Electric Company has a Renewable Energy segment, which provides wind turbine platforms, hardware & software, offshore wind turbines, solutions, products & services to hydropower industry, blades for onshore & offshore wind turbines, and high voltage equipment.</p>
          <p>FAN - First Trust Global Wind Energy tracks an index of companies involved in the wind energy industry weighted according to float-adjusted market cap with strict limits on individual holdings.</p>

          <h3>Solar</h3>
          <p>FSLR - First Solar, Inc. engages in designing, manufacturing, marketing, and distribution of photovoltaic solar power systems and solar modules.</p>
          <p>VSLR - Vivint Solar, Inc. engages in the provision of residential solar. It also designs and installs solar energy systems and offers monitoring and maintenance services.</p>
          <p>JKS - JinkoSolar Holding Co., Ltd. engages in the design, development, production and marketing of photovoltaic products, and solar system integration services.</p>
          <p>SPWR - SunPower Corp. engages in the design, manufacture and deliver of solar panels and systems.</p>
          <p>SEDG - SolarEdge Technologies, Inc. engages in the development of photovoltaic inverters, power optimizers, photovoltaic monitoring, software tools, and electric vehicle chargers.</p>
          <p>RUN - SunRun, Inc. engages in the design, development, installation, sale, ownership and maintenance of residential solar energy systems.</p>
          <p>ENPH - Enphase Energy, Inc. engages in the design, development, manufacture, and sale of microinverter systems for the solar photovoltaic industry.</p>
          <p>NOVA - Sunnova Energy International, Inc. engages in providing solar and energy storage services.</p>
          <p>TAN - Guggenheim Solar ETF tracks an index of solar energy companies selected based on the relative importance of solar power to the company's business model.</p>

          <h3>Water</h3>
          <p>AWK - American Water Works Co., Inc. engages in the provision of complementary water and wastewater services.</p>
          <p>IDA - IDACORP, Inc., also called IdaCorp, owns and operates hydroelectric plants on the Snake River and its tributaries.</p>
          <p>XYL - Xylem, Inc (formally ITT) provides water and wastewater applications with a broad portfolio of products and services addressing the full cycle of water, from collection, distribution and use to the return of water to the environment.</p>
          <p>PCG - PG&E Corporation, is a holding company, which specializes in energy, utility, power, gas, electricity, solar and sustainability. They have one of the largest investor-owned hydroelectric system in the nation.</p>
          <p>BEP - Brookfield Renewable Partners LP operates through following segments: Hydroelectric; Wind; Solar; Storage and Other.</p>

          <h3>Geothermal</h3>
          <p>ORA - Ormat Technologies, Inc., also called Ormat, is a holding company, which engages in the provision of geothermal and recovered energy power business.</p>

          <h3>Food</h3>
          <p>UNFI - United Natural Foods, Inc. engages in the distribution of natural, organic, and specialty foods and non-food products.</p>
          
          <h3>Waste Reduction</h3>
          <p>CVA - Covanta Holding Corp. engages in the operation and ownership of infrastructure for the conversion of waste to energy, related waste transport and disposal, and other renewable energy production businesses.</p>

          <h3>Pollution Reduction</h3>
          <p>FTEK - Fuel Tech, Inc. engages in the development, commercialization and application of proprietary technologies for air pollution control, process optimization, water treatment and advanced engineering services.</p>
          <p>EVX - VanEck Vectors Environmental Services ETF tracks a tiered equal-weighted index of companies that stand to benefit from increased demand for waste management.</p>
          <p>PZD - PowerShares Cleantech Portfolio tracks a tiered equal-weighted index of companies in the cleantech industry selected for their outperformance potential.</p>
              
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default App;
