'use strict';

window.onload = () => $('#overlay-wrapper').hide();

$('table .dlt-btn').click(function() {
    let name = $(this).closest('tr').children('[type="name"]').text();
    let id = $(this).attr('id');
    if (confirm(`Delete student ${name}?`)) {
        $.ajax(`/student/${id}/delete`, {
            type: 'DELETE',
            statusCode: {
                500: function(r) {
                    console.log(r);
                }
            }
        })
        $(this).hide('slow', function() {
            $(this).closest('tr').remove();
        });

    }
});
$(document).keydown(function(e) {
    var isEscape = false;
    if ("key" in e) {
        isEscape = (e.key === "Escape" || e.key === "Esc");
    } else {
        isEscape = (e.keyCode === 27);
    }
    if (isEscape) {
        $('#overlay-wrapper').hide();
    }
});

$('.edit-btn').click(function() {
    $('[name="roll_no"]').val($(this).closest('tr').children('[type="roll_no"]').text());
    $('[name="name"]').val($(this).closest('tr').children('[type="name"]').text());

    $('#overlay .btn').prop('id', $(this).attr('id'));
    $('#overlay-wrapper').show();
});

$('#overlay #update').click(function() {
    let id = $(this).attr('id');
    let name = $('[name="name"]').val();
    $.ajax({
        url: `/student/${id}/edit`,
        type: 'PATCH',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            newValue: name
        }),
        complete: function(e) {
            if (e.status === 200) {
                $('#overlay-wrapper').hide();
                console.log(id);
                $(`.${id}`).html($('[name="name"]').val());
            }
        }
    });
});