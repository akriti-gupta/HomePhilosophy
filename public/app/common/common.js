
function displayDropDown() {
    document.getElementsByClassName("topnav")[0].classList.toggle("responsive");
} 

function dispSubMenu(){
	document.getElementsByClassName("submenu-list")[0].classList.toggle("responsive");	
}
			
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


$(document).on('click','.design',function(e){
  $('.center').slick('slickGoTo',$(this).attr('data-img-id')); 
});



		
