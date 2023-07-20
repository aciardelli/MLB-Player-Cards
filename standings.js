async function loadTable(division){
    const head = "." + division + "-head"
    const body = "." + division + "-body"
    const table = document.querySelector("#" + division + "-table")
    const url = "http://127.0.0.1:5000/standings/" + division.toUpperCase()

    const tableHead = table.querySelector(head)
    const tableBody = table.querySelector(body)
    const response = await fetch(url)
    const data = await response.json();
    //const data = {'Tm': {1: 'Atlanta Braves', 2: 'Miami Marlins', 3: 'Philadelphia Phillies', 4: 'New York Mets', 5: 'Washington Nationals'}, 'W': {1: '45', 2: '40', 3: '37', 4: '33', 5: '27'}, 'L': {1: '26', 2: '31', 3: '34', 4: '37', 5: '42'}, 'W-L%': {1: '.634', 2: '.563', 3: '.521', 4: '.471', 5: '.391'}, 'GB': {1: '--', 2: '5.0', 3: '8.0', 4: '11.5', 5: '17.0'}}
    console.log(data)
    

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
    for(let i = 1; i < 6; i++){
        const rowElement = document.createElement("tr")
        for(const key of desiredOrder){
            const cellElement = document.createElement("td")

            cellElement.textContent = data[key][i]
            rowElement.appendChild(cellElement)

        }
        tableBody.appendChild(rowElement)
    }

}

window.addEventListener("load", () => {
    // const ale_data = {'Tm': {1: 'Atlanta Braves', 2: 'Miami Marlins', 3: 'Philadelphia Phillies', 4: 'New York Mets', 5: 'Washington Nationals'}, 'W': {1: '45', 2: '40', 3: '37', 4: '33', 5: '27'}, 'L': {1: '26', 2: '31', 3: '34', 4: '37', 5: '42'}, 'W-L%': {1: '.634', 2: '.563', 3: '.521', 4: '.471', 5: '.391'}, 'GB': {1: '--', 2: '5.0', 3: '8.0', 4: '11.5', 5: '17.0'}}   
    // const alc_data = {'Tm': {1: 'Atlanta Braves', 2: 'Miami Marlins', 3: 'Philadelphia Phillies', 4: 'New York Mets', 5: 'Washington Nationals'}, 'W': {1: '45', 2: '40', 3: '37', 4: '33', 5: '27'}, 'L': {1: '26', 2: '31', 3: '34', 4: '37', 5: '42'}, 'W-L%': {1: '.634', 2: '.563', 3: '.521', 4: '.471', 5: '.391'}, 'GB': {1: '--', 2: '5.0', 3: '8.0', 4: '11.5', 5: '17.0'}}
    // const alw_data = {'Tm': {1: 'Atlanta Braves', 2: 'Miami Marlins', 3: 'Philadelphia Phillies', 4: 'New York Mets', 5: 'Washington Nationals'}, 'W': {1: '45', 2: '40', 3: '37', 4: '33', 5: '27'}, 'L': {1: '26', 2: '31', 3: '34', 4: '37', 5: '42'}, 'W-L%': {1: '.634', 2: '.563', 3: '.521', 4: '.471', 5: '.391'}, 'GB': {1: '--', 2: '5.0', 3: '8.0', 4: '11.5', 5: '17.0'}}
    // const nle_data = {'Tm': {1: 'Atlanta Braves', 2: 'Miami Marlins', 3: 'Philadelphia Phillies', 4: 'New York Mets', 5: 'Washington Nationals'}, 'W': {1: '45', 2: '40', 3: '37', 4: '33', 5: '27'}, 'L': {1: '26', 2: '31', 3: '34', 4: '37', 5: '42'}, 'W-L%': {1: '.634', 2: '.563', 3: '.521', 4: '.471', 5: '.391'}, 'GB': {1: '--', 2: '5.0', 3: '8.0', 4: '11.5', 5: '17.0'}}
    // const nlc_data = {'Tm': {1: 'Atlanta Braves', 2: 'Miami Marlins', 3: 'Philadelphia Phillies', 4: 'New York Mets', 5: 'Washington Nationals'}, 'W': {1: '45', 2: '40', 3: '37', 4: '33', 5: '27'}, 'L': {1: '26', 2: '31', 3: '34', 4: '37', 5: '42'}, 'W-L%': {1: '.634', 2: '.563', 3: '.521', 4: '.471', 5: '.391'}, 'GB': {1: '--', 2: '5.0', 3: '8.0', 4: '11.5', 5: '17.0'}}
    // const nlw_data = {'Tm': {1: 'Atlanta Braves', 2: 'Miami Marlins', 3: 'Philadelphia Phillies', 4: 'New York Mets', 5: 'Washington Nationals'}, 'W': {1: '45', 2: '40', 3: '37', 4: '33', 5: '27'}, 'L': {1: '26', 2: '31', 3: '34', 4: '37', 5: '42'}, 'W-L%': {1: '.634', 2: '.563', 3: '.521', 4: '.471', 5: '.391'}, 'GB': {1: '--', 2: '5.0', 3: '8.0', 4: '11.5', 5: '17.0'}}
    const ale_data = getStandings("ale")   
    const alc_data = getStandings("alc")
    const alw_data = getStandings("alw")
    const nle_data = getStandings("nle")
    const nlc_data = getStandings("nlc")
    const nlw_data = getStandings("nlw")

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

    
    // loadTable("ale")   
    // loadTable("alc")
    // loadTable("alw")
    // loadTable("nle")
    // loadTable("nlc")
    // loadTable("nlw")
  });

