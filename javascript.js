function checkStock() {
  
  const symbol = document.getElementById("symbol").value;
  const apiKey = "Y03F3NU4L6AOFHIUZ";
  const apiUrl = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" + symbol +"&apikey=Y03F3NU4L6AOFHIUZ";

  let result = "";
  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const name = data.Name;
      const industry = data.Industry;
      const sector = data.Sector;
      const description = data.Description;

      const stockInfo = {
        symbol,
        name,
        description,
        industry,
        sector,
        result
      };

      const first = firstScreen(symbol);
      const second = secondScreen(symbol);
      const last = lastScreen(symbol);

      Promise.all([first, second, last])
        .then(results => {
          if (results.every(result => result)) {
            result = "COMPLIANT";
          } else {
            result = "NOT COMPLIANT";
          }
          stockInfo.result = result;
          const resultContainer = document.getElementById("result-container");
          resultContainer.style.display = "block";
          setResult(stockInfo);
        })
        .catch(error => {
          console.error("Error:", error);
        });
    });
}

function setResult(stockInfo) {
      const resultElement = document.getElementById("result");
      resultElement.innerHTML = `
        <p><strong>Symbol:</strong> ${stockInfo.symbol}</p>
        <p><strong>Name:</strong> ${stockInfo.name}</p>
        <p><strong>Description:</strong> ${stockInfo.description}</p>
        <p><strong>Industry:</strong> ${stockInfo.industry}</p>
        <p><strong>Sector:</strong> ${stockInfo.sector}</p>
        <p><strong>Result:</strong> ${stockInfo.result}</p>
      `;
    }

function firstScreen(symbol){
  const keywords = [
    "finance", "banking", "beer", "pork", "gambling", "betting", "lottery", "interest", "usury", "ribaa", "pornography", "prostitution", "drugs", "tobacco", "weapons", "violence", "war", "terrorism", "fraud", "theft", "embezzlement", "bribery", "corruption", "exploitation", "oppression", "injustice", "discrimination", "slavery", "human trafficking", "animal cruelty", "environmental destruction", "usurpation of rights"
  ];
  const haramSectors = [
    "Alcohol and tobacco production and distribution",
    "Gambling and casino operations",
    "Conventional financial institutions and banking",
    "Adult entertainment industry",
    "Weapons and defense contractors",
    "Pork and other non-halal meat production and distribution",
    "Interest-based loan providers and credit card companies"
  ];
  const apiKey = "Y03F3NU4L6AOFHIUZ";
  const apiUrl = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" + symbol +"&apikey=Y03F3NU4L6AOFHIUZ";

  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const sector = data.Sector;
      const description = data.Description;

      for(let i = 0; i < haramSectors.length; i++) {
        if(sector.includes(haramSectors[i])) {
          return false;
        }
      }

      for(let i = 0; i < keywords.length; i++) {
        if(description.includes(keywords[i])) {
          return false;
        }
      }
      
      return true;
    });
}

function secondScreen(symbol) {
  let passed = true;
  const apiKey = "Y03F3NU4L6AOFHIUZ";
  const apiUrl = "https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=" + symbol +"&apikey=Y03F3NU4L6AOFHIUZ";
  
  // Ratios
  let accountsReceivableRatio = 0;
  let cashRatio = 0;
  let debtEquityRatio = 0;
  let marketCap = 0;

  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Accounts Receivable Ratio
      const accountsReceivable = parseFloat(data.annualReports[0]["Total receivables"]);
      const marketValueOfEquity = parseFloat(data.annualReports[0]["Total shareholders equity"]);
      accountsReceivableRatio = accountsReceivable / marketValueOfEquity;

      // Cash Ratio
      const cash = parseFloat(data.annualReports[0]["Cash and cash equivalents"]);
      const shortTermInvestments = parseFloat(data.annualReports[0]["Short-term investments"]);
      const marketValueOfEquity2 = parseFloat(data.annualReports[0]["Total shareholders equity"]);
      cashRatio = (cash + shortTermInvestments) / marketValueOfEquity2;

      // Debt to Equity Ratio
      const totalLiabilities = parseFloat(data.annualReports[0]["Total liabilities"]);
      const totalEquity = parseFloat(data.annualReports[0]["Total shareholders equity"]);
      debtEquityRatio = totalLiabilities / totalEquity;

      // Market Capitalization
      const apiUrl2 = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" + symbol +"&apikey=Y03F3NU4L6AOFHIUZ";
      fetch(apiUrl2)
        .then(response => response.json())
        .then(data => {
          const price = parseFloat(data.Price);
          const sharesOutstanding = parseFloat(data.SharesOutstanding);
          marketCap = price * sharesOutstanding;

          // Screening Criteria
          if (accountsReceivableRatio >= 0.49) {
            passed = false;
            console.log("Haram because accounts receivable ratio is greater than or equal to 0.49");
          }
          if (cashRatio < 0.33) {
            passed = false;
            console.log("Haram because cash ratio is less than 0.33");
          }
          if (debtEquityRatio >= 0.33) {
            passed = false;
            console.log("Haram because debt to equity ratio is greater than or equal to 0.33");
          }
          if (marketCap < 100000000) {
            passed = false;
            console.log("Haram because market capitalization is less than 100 million");
          }

          // Final Result
          if (passed) {
            return true;
          } else {
            console.log("Haram");
            return false;
          }
        })
        .catch(error => {
          console.log(error);
          return false;
        })
    })
    .catch(error => {
      console.log(error);
      return false;
    });
}

async function lastScreen(symbol) {
  const overviewUrl = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" + symbol + "&apikey=Y03F3NU4L6AOFHIUZ";
const balanceSheetUrl = "https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=" + symbol + "&apikey=Y03F3NU4L6AOFHIUZ";

  let overviewData, balanceSheetData;

  try {
    // Fetch data from Alpha Vantage API
    const [overviewRes, balanceSheetRes] = await Promise.all([
      fetch(overviewUrl),
      fetch(balanceSheetUrl)
    ]);
    overviewData = await overviewRes.json();
    balanceSheetData = await balanceSheetRes.json();
  } catch (error) {
    console.log('Error:', error);
    return false;
  }

  // Calculate dividend purification ratio
  const totalRevenue = parseFloat(overviewData.RevenueTTM);
  const nonPermissibleRevenue = parseFloat(balanceSheetData.annualReports[0].totalLiabilities) + 
                                parseFloat(balanceSheetData.annualReports[0].totalShareholderEquity);
  const dpRatio = nonPermissibleRevenue / totalRevenue;

  // Check if the stock passes the screening
  if (dpRatio < 0.05) {
    return true;
  } else {
    return false;
  }
}


