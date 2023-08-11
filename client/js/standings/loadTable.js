export async function loadTable(division){
    const head = "." + division + "-head"
    const body = "." + division + "-body"
    const table = document.querySelector("#" + division + "-table")
    const url = "http://127.0.0.1:5000/standings/" + division.toUpperCase()

    const tableHead = table.querySelector(head)
    const tableBody = table.querySelector(body)
    const response = await fetch(url)
    const data = await response.json();
    
    // clear table
    tableHead.innerHTML = '<tr></tr>'
    tableBody.innerHTML = ''

    const desiredOrder = ['Team', 'W', 'L', 'W-L%', 'GB']

    const teamOrder = data["Order"];
    
    // headers
    for (const key of desiredOrder) {
        const headerElement = document.createElement("th")

        headerElement.textContent = key
        tableHead.querySelector("tr").appendChild(headerElement)

    }

    for(let i = 0; i < 5; i++){
        const rowElement = document.createElement("tr")
        const teamData = data[teamOrder[i]]

        for(const key of desiredOrder){
            const cellElement = document.createElement("td")
            if (key === 'Team'){
              cellElement.textContent = teamOrder[i]
            }
            else{
              cellElement.textContent = teamData[key]
            }
            rowElement.appendChild(cellElement)
        }
        tableBody.appendChild(rowElement)
    }

}