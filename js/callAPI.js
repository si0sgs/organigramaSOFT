function CallService() {
    let uriServer = "https://si0sgs.github.io/organigramaSOFT/Json/datos.json";
    //let uriServer = "http://127.0.0.1:5500/Json/datos.json";

    //

    if (uriServer != "") {
        $.ajax({
            url: uriServer,
            type: "get",
            dataType: "json",
            success: OnSuccess,
            error: OnError
        });
    }
    return false;
}

function OnSuccess(data) {
    datos = data;
    var jsonText = document.getElementById("mySavedModel");
    jsonText.value = JSON.stringify(datos);
    init();
    loadTableData();

}

function OnError(jqXHR, textStatus, errorThrown) {
    alert("Mensaje de Error: " + errorThrown);
}

function loadTableData() {
    try {

        const tableBody = document.getElementById('tableBody');

        datos.nodeDataArray.forEach(item => {
            const row = `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.dept}</td>
                    <td>${item.title}</td>
                    <td>${encontrarJefe(item.parent)}</td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
        });
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

function encontrarJefe(id) {
    
    let jefe = "";

    try {
        

        datos.nodeDataArray.forEach(item => {
            if (item.key === id)
                jefe = item.name;
        });

        return jefe;

    } catch (error) {
        console.error('Error al cargar los datos:', error);
        return jefe;
    }
}

document.getElementById('filterName').addEventListener('input', filterTable);
document.getElementById('filterDept').addEventListener('input', filterTable);
document.getElementById('filterTitle').addEventListener('input', filterTable);
document.getElementById('filterJefe').addEventListener('input', filterTable);

// Función para filtrar los datos de la tabla
function filterTable() {
    const filterName = document.getElementById('filterName').value.toLowerCase();
    const filterDept = document.getElementById('filterDept').value.toLowerCase();
    const filterTitle = document.getElementById('filterTitle').value.toLowerCase();
    const filterJefe = document.getElementById('filterJefe').value.toLowerCase();
    
    const tableRows = document.querySelectorAll('#tableBody tr');

    tableRows.forEach(row => {
        const nameCell = row.children[0].textContent.toLowerCase();
        const deptCell = row.children[1].textContent.toLowerCase();
        const titleCell = row.children[2].textContent.toLowerCase();
        const jefeCell = row.children[3].textContent.toLowerCase();

        const matchesName = nameCell.includes(filterName);
        const matchesDept = deptCell.includes(filterDept);
        const matchesTitle = titleCell.includes(filterTitle);
        const matchesJefe = jefeCell.includes(filterJefe);

        if (matchesName && matchesDept && matchesTitle && matchesJefe) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

