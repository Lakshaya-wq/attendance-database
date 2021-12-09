$("table .dlt-btn").on("click", function () {
    let name = $(this).closest("tr").children('[type="name"]').text();
    let id = $(this).attr("id");
    if (confirm(`Delete student ${name}?`)) {
        $.ajax(`/student/${id}/delete`, {
            type: "DELETE",
            statusCode: {
                500: function (r) {
                    console.log(r);
                }
            }
        });
        $(this).hide("slow", function () {
            $(this).closest("tr").remove();
        });
    }
});
$(document).on("keydown", function (e) {
    var isEscape = false;
    if ("key" in e) {
        isEscape = e.key === "Escape" || e.key === "Esc";
    } else {
        isEscape = e.keyCode === 27;
    }
    if (isEscape) {
        $("#overlay-wrapper").hide();
        $("#overlay-wrapper2").hide();
    }
});

$(".edit-btn").on("click", function () {
    $('[name="roll_no"]').val(
        $(this).closest("tr").children('[type="roll_no"]').text()
    );
    $('[name="name"]').val(
        $(this).closest("tr").children('[type="name"]').text()
    );

    $("#overlay .btn").prop("id", $(this).attr("id"));
    $("#overlay-wrapper").show().removeClass("hidden");
});

$("#overlay #update").on("click", function () {
    let id = $(this).attr("id");
    let name = $('[name="name"]').val();
    let roll_no = $('[name="roll_no"]').val();
    $.ajax({
        url: `/student/${id}/edit`,
        type: "PATCH",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            name,
            roll_no
        }),
        complete: function (e) {
            if (e.status === 200) {
                $(`.${id}`).text(name);
                $("#overlay-wrapper").hide();
            }
        }
    });
});

$(function () {
    $(".edit-btn").prop("data-placement", "top");
    $(".edit-btn").prop("title", "Edit Student Details");
    $(".edit-btn").prop("data-toggle", "tooltip");

    $(".dlt-btn").prop("data-placement", "top");
    $(".dlt-btn").prop("title", "Delete Student");
    $(".dlt-btn").prop("data-toggle", "tooltip");

    $("#add").prop("data-placement", "top");
    $("#add").prop("title", "Add student");
    $("#add").prop("data-toggle", "tooltip");

    $(".edit-btn").tooltip();
    $(".dlt-btn").tooltip();
    $("#add").tooltip();
});

$("#add").on("click", function () {
    const lastRow = $("table tbody tr")
        .last()
        .prev()
        .find('[type="roll_no"]')
        .text();
    const studentRNo = lastRow ? parseInt(lastRow) + 1 : 1;
    $('[name="studentRNo"]').val(studentRNo);
    $("#overlay-wrapper2").show().removeClass("hidden");
});

$("#create").on("click", function () {
    let name = $('[name="studentName"]').val();
    let roll_no = $('[name="studentRNo"]').val();
    let standard = $(".date").attr("standard");

    if (name && roll_no && standard) {
        $.ajax(`/student/${standard}`, {
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                studentRNo: roll_no,
                studentName: name
            }),
            complete: function (e) {
                if (e.status === 200) {
                    location.reload();
                }
            }
        });
    }
});
