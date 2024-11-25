function FetchAndBuild() {
    fetch("./assets/json.txt")
    .then((res) => {
        if (!res.ok) {
            throw new Error('Files not found!');
            
        }
        return res.json();
    })
    .then((data) => {
        var currencies = GetExchangeRatesFromJson(data);
        BuildTable(currencies);
    })
    .catch((error) => console.error("Unable to get data: ", error));
}

function GetExchangeRatesFromJson(input) {
    return input["exchangerates"]["dailyrates"]["currency"];
}

function BuildTable(array) {
    var table = document.getElementById("tableBody");

    for (let i = 0; i < array.length; i++) {
        var row = document.createElement("tr");

        var cellCurrency = document.createElement("td");
        var textCurrency = document.createTextNode(array[i]["@code"]);
        cellCurrency.appendChild(textCurrency);
        row.appendChild(cellCurrency);

        var cellDescription = document.createElement("td");
        var textDescription = document.createTextNode(array[i]["@desc"]);
        cellDescription.appendChild(textDescription);
        row.appendChild(cellDescription);

        var cellRate = document.createElement("td");
        var textRate = document.createTextNode(array[i]["@rate"]);
        cellRate.appendChild(textRate);
        row.appendChild(cellRate);

        table.appendChild(row);
    }
}

FetchAndBuild();