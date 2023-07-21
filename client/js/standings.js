async function loadTable(division){
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

window.addEventListener("load", () => {

    const ale_load = document.querySelector(".ale-drop")
    const alc_load = document.querySelector(".alc-drop")
    const alw_load = document.querySelector(".alw-drop")

    const nle_load = document.querySelector(".nle-drop")
    const nlc_load = document.querySelector(".nlc-drop")
    const nlw_load = document.querySelector(".nlw-drop")

    ale_load.addEventListener("click", () => {
        const table = document.querySelector("#ale-table");
        const tableHead = table.querySelector(".ale-head");
        const tableBody = table.querySelector(".ale-body");
      
        if (tableBody.innerHTML !== '') {
          tableHead.innerHTML = '<tr></tr>';
          tableBody.innerHTML = '';
        } else {
          loadTable("ale");
        }
    })
    
    alc_load.addEventListener("click", () => {
        const table = document.querySelector("#alc-table");
        const tableHead = table.querySelector(".alc-head");
        const tableBody = table.querySelector(".alc-body");
      
        if (tableBody.innerHTML !== '') {
          tableHead.innerHTML = '<tr></tr>';
          tableBody.innerHTML = '';
        } else {
          loadTable("alc");
        }
    })
    alw_load.addEventListener("click", () => {
        const table = document.querySelector("#alw-table");
        const tableHead = table.querySelector(".alw-head");
        const tableBody = table.querySelector(".alw-body");
      
        if (tableBody.innerHTML !== '') {
          tableHead.innerHTML = '<tr></tr>';
          tableBody.innerHTML = '';
        } else {
          loadTable("alw");
        }
    })
    nle_load.addEventListener("click", () => {
        const table = document.querySelector("#nle-table");
        const tableHead = table.querySelector(".nle-head");
        const tableBody = table.querySelector(".nle-body");
      
        if (tableBody.innerHTML !== '') {
          tableHead.innerHTML = '<tr></tr>';
          tableBody.innerHTML = '';
        } else {
          loadTable("nle");
        }
    })
    nlc_load.addEventListener("click", () => {
        const table = document.querySelector("#nlc-table");
        const tableHead = table.querySelector(".nlc-head");
        const tableBody = table.querySelector(".nlc-body");
      
        if (tableBody.innerHTML !== '') {
          tableHead.innerHTML = '<tr></tr>';
          tableBody.innerHTML = '';
        } else {
          loadTable("nlc");
        }
    })
    nlw_load.addEventListener("click", () => {
        const table = document.querySelector("#nlw-table");
        const tableHead = table.querySelector(".nlw-head");
        const tableBody = table.querySelector(".nlw-body");
      
        if (tableBody.innerHTML !== '') {
          tableHead.innerHTML = '<tr></tr>';
          tableBody.innerHTML = '';
        } else {
          loadTable("nlw");
        }
    })

  });

