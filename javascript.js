function checkStock() {
    const symbol = document.getElementById("symbol").value;
    const apiKey = "Y03F3NU4L6AOFHIUZ";
    const apiUrl = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" + symbol +"&apikey=Y03F3NU4L6AOFHIUZ";
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const sector = data.Sector.toLowerCase();
        const description = data.Description.toLowerCase();
        let result;
  
        if (sector.includes("finance") || sector.includes("banking")) {
          result = "haram";
        } else if (description.includes("gambling") || description.includes("alcohol") || description.includes("beer") || description.includes("tobacco") || description.includes("lottery")) {
          result = "haram";
        } else {
          result = "halal";
        }
  
        setResult(symbol + ` is: ${result}`);
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
  