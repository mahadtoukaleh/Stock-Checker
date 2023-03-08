# Stock Compliance Checker
This is a simple web application that allows users to check the compliance of a stock with certain ethical and financial criteria. The application uses the Alpha Vantage API to fetch financial data of a given stock and then runs several checks to determine whether the stock is compliant or not.


Usage
Enter the symbol of the stock you want to check in the input field.
Click the "Check" button.
Wait for the application to fetch and analyze the data.
The compliance result will be displayed along with the financial data of the stock.

Functionality
The application consists of four main functions:

checkStock() - This function is called when the user clicks the "Check" button. It fetches the financial data of the stock from the Alpha Vantage API and then calls two other functions to run additional checks.

firstScreen() - This function checks whether the stock is compliant with certain ethical criteria, such as whether the company is involved in the production or distribution of alcohol, tobacco, or pork, or whether the company is involved in gambling or adult entertainment industries.

secondScreen() - This function checks whether the stock is compliant with certain financial criteria, such as whether the company has a healthy debt-to-equity ratio, whether the company has a healthy cash ratio, and whether the company has a healthy accounts receivable ratio.

lastScreen() function fetches financial data from the Alpha Vantage API for a given stock symbol and calculates the dividend purification ratio, which is the ratio of non-permissible revenue to total revenue. If the calculated ratio is less than 0.05, the function returns true, indicating that the stock passes the screening. Otherwise, it returns false.

Technology Used
HTML
CSS
JavaScript
Alpha Vantage API

Future Improvements
Allow users to check multiple stocks at once.
Implement additional checks for compliance with environmental and social criteria.
Improve the user interface and add additional features, such as a search bar for finding specific stocks.
Add support for additional stock markets and financial data providers.

License
This project is licensed under the MIT License. See the LICENSE file for details.
