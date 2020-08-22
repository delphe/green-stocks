import axios from 'axios';

const defaultError = 'An error occurred calling Finnhub API!';
let missing_apikey_msg = '';

/**
 * Recommendation Finnhub API call to return recommendations as an array,
 * @param  {} symbol stock symbol. example: TSLA
 * @param  {} apikey found in local storage after authenticating with Finnhub
 */
export const getRecommendation = async (symbol, apikey) => {
    let r13sObj = {};
    try {
        await axios.get(`https://finnhub.io/api/v1/stock/recommendation?symbol=
          ${symbol}&token=${apikey}`, { timeout: 30000 })
          .then( (response) => {
            if (response.data && !response.data.isArray && typeof response.data !== 'object' &&
              response.data !== "" &&  response.data !== null) {
                if(!apikey || apikey === ''){
                    missing_apikey_msg = ' Please obtain an API Key from Finnhub.';
                }
                r13sObj = {
                    error: response.data + missing_apikey_msg
                };
                return r13sObj;
            }
            if (response.data.length>0) {
                var totalAnalysts = response.data[0].buy + response.data[0].sell + response.data[0].hold;
                r13sObj = {
                    symbol: symbol,
                    buy: response.data[0].buy,
                    buyPercentNum: divide(response.data[0].buy, totalAnalysts),
                    buyPercentage: parseFloat(divide(response.data[0].buy, totalAnalysts)*100).toFixed(1)+"%",
                    hold: response.data[0].hold,
                    holdPercentage: parseFloat(divide(response.data[0].hold, totalAnalysts)*100).toFixed(1)+"%",
                    sell: response.data[0].sell,
                    sellPercentNum: divide(response.data[0].sell, totalAnalysts),
                    sellPercentage: parseFloat(divide(response.data[0].sell, totalAnalysts)*100).toFixed(1)+"%",
                    strongBuy: response.data[0].strongBuy,
                    strongSell: response.data[0].strongSell,
                    period: response.data[0].period,
                    error: null
                };
                
            } else {
                r13sObj = {
                    symbol: symbol,
                    buy: 0,
                    buyPercentNum: 0,
                    buyPercentage: '0%',
                    hold: 0,
                    holdPercentage: '0%',
                    sell: 0,
                    sellPercentNum: 0,
                    sellPercentage: '0%',
                    strongBuy: 0,
                    strongSell: 0,
                    period: "N/A - No Data",
                    error: null
                };
            }
          }, (error) => {
            r13sObj = {
                error: finnhubErrorHandler(error, apikey)
            };
          });
    } catch (e) {
        r13sObj = {
            error: defaultError
        };
        console.log(e);
    }
   return r13sObj;
};

/**
 * return an error message as string depending on what error status is received.
 * @example
 * 401 - Authentication failure
 * 429 - Rate Limit Exceeded
 * default - 'Other status codes return a default error message'
 * @param  {} error api error response from Finnhub
 */
export function finnhubErrorHandler(error, apikey){
    var error_msg;
    if(!apikey || apikey === ''){
      missing_apikey_msg = 'Please obtain an API Key from Finnhub.';
    }
    if(error.response === undefined){
      console.log("Error status not found!!! Most likely a timeout issue.");
      error_msg = defaultError + ' ' + missing_apikey_msg;
      return error_msg;
    }
    switch (error.response.status) {
      case 401 :
        console.log("Authentication Failed!!!");
        error_msg = 'Finnhub is not accepting the API key. Please obtain a new one.';
        break;
      case 429 :
        console.log("RateLimitExceeded!!!");
        error_msg = 'Finnhub API call limit has exceeded! '+ missing_apikey_msg;
        break;
      default :
        console.log("Finhub API Error!!!");
        error_msg = defaultError + ' ' + missing_apikey_msg;
        break;
    }
    return error_msg;
}

/**
 * If the denominator is 0, just return 0
 * @param {*} numerator should be a valid number
 * @param {*} denominator should be a valid number
 */
function divide(numerator, denominator){
    if (denominator === 0) {
        return 0;
    } else {
        return (numerator/denominator);
    }
}