var portfolioImg = 0;
function displayDropDown() {
    document.getElementsByClassName("topnav")[0].classList.toggle("responsive");
} 

function dispSubMenu(){
	document.getElementsByClassName("submenu-list")[0].classList.toggle("responsive");	
}
			
$(window).resize(function(){
	var width = $(window).width();
	if(width < 500 ){
   	$('#exp-maintext').removeAttr('class');
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
  this.nextElementSibling.classList.toggle("show");
});

$(document).on('show.bs.modal','#firstLookModal',function(e){
  $('.concept-center').resize();
});

window.onpopstate = function (e) { window.history.forward(1); }