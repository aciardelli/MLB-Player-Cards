async function loadTable(url, table){
    const tableHead = table.querySelector("thead")
    const tableBody = table.querySelector("tbody")
    // const response = await fetch(url)
    // // const data = await response.json();
    // const data = await response.json();
    const data = {'Tm': {1: 'Atlanta Braves', 2: 'Miami Marlins', 3: 'Philadelphia Phillies', 4: 'New York Mets', 5: 'Washington Nationals'}, 'W': {1: '44', 2: '39', 3: '36', 4: '33', 5: '27'}, 'L': {1: '26', 2: '31', 3: '34', 4: '36', 5: '41'}, 'W-L%': {1: '.629', 2: '.557', 3: '.514', 4: '.478', 5: '.397'}, 'GB': {1: '--', 2: '5.0', 3: '8.0', 4: '10.5', 5: '16.0'}}
    

    // clear table
    tableHead.innerHTML = '<tr></tr>'
    tableBody.innerHTML = ''

    const desiredOrder = ['Tm', 'W', 'L', 'W-L%', 'GB']
    
    // headers
    for (const key of desiredOrder) {
        const headerElement = document.createElement("th")

        headerElement.textContent = key
        tableHead.querySelector("tr").appendChild(headerElement)

    }

    // rows
    for(let i = 0; i < 5; i++){
        const rowElement = document.createElement("tr")
        for(const key of desiredOrder){
            const cellElement = document.createElement("td")

            cellElement.textContent = data[key][i]
            rowElement.appendChild(cellElement)

        }
        tableBody.appendChild(rowElement)
    }

}

loadTable("http://127.0.0.1:5000/standings/ALE", document.querySelector("table"))
