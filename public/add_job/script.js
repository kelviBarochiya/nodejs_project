var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["companyName"] = document.getElementById("companyName").value;
    formData["companyemailid"] = document.getElementById("companyemailid").value;
    formData["phone"] = document.getElementById("phone").value;
    formData["requirement"] = document.getElementById("requirement").value;
    formData["city"] = document.getElementById("city").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("jobList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.companyName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.companyemailid;
    cell2 = newRow.insertCell(2);
    cell2.innerHTML = data.phone;
    cell3 = newRow.insertCell(3);
    cell3.innerHTML = data.requirement;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = data.city;
    cell4 = newRow.insertCell(5);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("CompanyName").value = "";
    document.getElementById("Companyemailid").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("requirement").value = "";
    document.getElementById("city").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("companyName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("companyemailid").value = selectedRow.cells[1].innerHTML;
    document.getElementById("phone").value = selectedRow.cells[2].innerHTML;
    document.getElementById("requirement").value = selectedRow.cells[3].innerHTML;
    document.getElementById("city").value = selectedRow.cells[4].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.companyName;
    selectedRow.cells[1].innerHTML = formData.companyemailid;
    selectedRow.cells[2].innerHTML = formData.phone;
    selectedRow.cells[3].innerHTML = formData.requirement;
    selectedRow.cells[4].innerHTML = formData.city;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("jobList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("companyName").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}