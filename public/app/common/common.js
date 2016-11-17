var portfolioImg = 0;
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

$(document).on('click','#portfolio-link',function(e){
  portfolioImg = 0;
   $('.center').slick('slickGoTo',0); 
});
$(document).on('click','.design',function(e){
    portfolioImg = $(this).attr('data-img-id');
    $('.center').slick('slickGoTo',$(this).attr('data-img-id')); 
    
    
});

$(document).on('click','.accordion',function(e){
  $(".accordion").removeClass("active");
   this.classList.toggle("active");
   $(".faq").removeClass("show");
   //alert($(this).next());
    this.nextElementSibling.classList.toggle("show");
   //this.next().classList.toggle("show");
    
    
});


		
