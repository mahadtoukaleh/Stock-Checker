function checkStock() {
  const keywords = [
          "finance", "banking", "beer", "pork", "gambling", "betting", "lottery", "interest", "usury", "ribaa", "pornography", "prostitution", "drugs", "tobacco", "weapons", "violence", "war", "terrorism", "fraud", "theft", "embezzlement", "bribery", "corruption", "exploitation", "oppression", "injustice", "discrimination", "slavery", "human trafficking", "animal cruelty", "environmental destruction", "usurpation of rights"
     ];
    const haramSectors = [
          "Alcohol and tobacco production and distribution",
          "Gambling and casino operations",
          "Conventional financial institutions and banking",
          "Adult entertainment industry",
          "Weapons and defense contractors",
          "Pork and other non-halal meat production and         distribution",
          "Interest-based loan providers and credit card companies"
    ];
    const symbol = document.getElementById("symbol").value;
    const apiKey = "Y03F3NU4L6AOFHIUZ";
    const apiUrl = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" + symbol +"&apikey=Y03F3NU4L6AOFHIUZ";
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const sector = data.Sector.toLowerCase();
        const description = data.Description.toLowerCase();
        let result;
  
        for(let i = 0; i < haramSectors.length; i++) {
          if(sector.includes(haramSectors[i])) {
            result = "Haram because it is in the sector of " + haramSectors[i];
          }
        }
  
        for(let i = 0; i < keywords.length; i++) {
          if(description.includes(keywords[i])) {
            result = "Haram because it contains " + keywords[i];
            break;
          }
        }
  
        setResult(symbol + " is: " + (result || "Halal"));
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }
  
  function setResult(message) {
    const resultElement = document.getElementById("result");
    resultElement.textContent = message;
    resultElement.parentNode.style.display = "block";
  }

  
