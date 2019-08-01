$('#imgUpload').on('change', function () {
    let image = $("#imgUpload")[0].files[0];
    let formdata = new FormData();
    formdata.append('imgUpload', image);
    $.ajax({
        url: '/user/upload',
        type: 'POST',
        data: formdata,
        contentType: false,
        processData: false,
        'success': (data) => {
            $('#img').attr('src', data.file);
            $('#imgURL').attr('value', data.file);// sets imgURL hidden field
            if (data.err) {
                $('#imgErr').show();
                $('#imgErr').text(data.err.message);
            } else {
                $('#imgErr').hide();
            }
        }
    });
});