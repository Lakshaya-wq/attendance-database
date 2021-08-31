function download_csv(csv, filename) {
    var csvFile;
    var downloadLink;
    csvFile = new Blob([csv], {
        type: "text/csv"
    });
    downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function export_table_to_csv(html, filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
        var row = [],
            cols = rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);
        csv.push(row.join(","));
    }

    download_csv(csv.join("\n"), filename);
}

document.querySelector('#btn').addEventListener("click", function() {
    var html = document.querySelector("table").outerHTML;
    export_table_to_csv(html, `${$('.date').attr('month')}.csv`);
});

// $(document).ready(function() {
//     $('#search').keyup(function() {
//         var value = $('#search').val().toLowerCase().trim();
//         $("tr").each(function(index) {
//             if (!index) return;
//             $(this).find("td").each(function() {
//                 var id = $(this).text().toLowerCase().trim();
//                 var not_found = (id.indexOf(value) == -1);
//                 $(this).closest('tr').toggle(!not_found);
//                 return not_found;
//             });
//         });
//     });
// });