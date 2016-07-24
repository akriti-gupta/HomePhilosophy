
$(window).resize(function(){
	console.log('resize called');
	var width = $(window).width();
	if(width < 500 ){
   	//   alert($("#exp-maintext"));
       
       $('#exp-maintext').removeAttr('class');
      // $('#exp-maintext').addClass('fs-11px');
       // $('#exp-subtext').removeClass('fs-20px');
       // $('#exp-subtext').addClass('fs-11px');
   	}
});


$(document).on('mouseover', '.submenu-list', function(e) {
	e.preventDefault();
	$(".menu-list").removeClass('plist-border');
});
$(document).on('mouseout', '.submenu-list', function(e) {
	e.preventDefault();
	$(".menu-list").addClass('plist-border');
});


		
