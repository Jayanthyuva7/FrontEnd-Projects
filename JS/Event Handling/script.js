document.addEventListener("DOMContentLoaded", function() {
        document.getElementById("addButton").addEventListener("click", function() {
            var table = document.getElementById("myTable");
            var row = table.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = "New Item " + (table.rows.length - 1);
            cell2.innerHTML = "<button class='deleteButton'>Delete</button>" +
                               "<button class='editButton'>Edit</button>";
            cell2.querySelector(".editButton").addEventListener("click", function() {
                var newItem = prompt("Edit item:", cell1.innerHTML);
                if (newItem !== null) {
                    cell1.innerHTML = newItem;
                }
            });
        });

        document.getElementById("removeButton").addEventListener("click", function() {
            var table = document.getElementById("myTable");
            var rowCount = table.rows.length;
            if (rowCount > 1) {
                table.deleteRow(rowCount - 1);
            }
        });

        document.getElementById("myTable").addEventListener("click", function(event) {
            if (event.target.classList.contains("deleteButton")) {
                var row = event.target.parentNode.parentNode;
                row.parentNode.removeChild(row);
            }
        });
    });