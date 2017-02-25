$(document).on('click', '#cal_popup a', function(e) {
	var row_id = $(this).attr("data-id");
	$("#form-calendar").attr('data-row-id',row_id);
});
