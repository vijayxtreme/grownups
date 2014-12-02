var feedUrl = 'http://www.sonypictures.com/movies/grownups2/channel2.xml'; //need feed URL
var autocloseToggle = true;
var singlevideoToggle = false;
var callbackToggle = false;
var parentSwf = 'flashcontent';
var useQAplayer = false;
var today = new Date();
var launch = new Date(2013,10,05); /* zero based month */ //need a launch date
var ua = navigator.userAgent;
var checker = {
	iphone: ua.match(/(iPhone|iPod|iPad)/),
	blackberry: ua.match(/BlackBerry/),
	android: ua.match(/Android/)
};

jQuery(function($){
	
	var ua = navigator.userAgent.toLowerCase();
	var isAndroid = ua.indexOf('android') > -1
	if(isAndroid) {
		$("#gu2_packshot").addClass('android_shrink');
	}


	jQuery.fn.collapse = function()
	{
		$(this).css('left','-9999px').find('a').css('opacity',0).end().prev('h3').css('background-position','0 0');
		$('#bcr_overlay').stop(true,true).fadeOut(100);
	}
	jQuery.fn.animateButtons = function() { this.each(function(i){ $(this).delay((i++) * 100).fadeTo(250,1); }); }
	
	if (checker.iphone) { $('body').css('width','1024px');  }
	
	if ((today >= launch) || $.urlParam('date')==='post') { $('#bcr_sell').css('background-position','0 -131px').text('Now On Blu-ray&trade; Combo Pack &amp; Digital!'); } 
	//if today is greater than the launch date, change the sell text to this new text
	
	var timer = setTimeout(function(){
		openOverlay();
		/*
feedDetails=new Object();
		feedDetails.feedUrl = (window.location.hash.slice(1)=='watchtheaction?hs308=email') ? 'http://www.sonypictures.com/movies/afterearth/mashup.xml' : 'http://www.sonypictures.com/previews/movies/afterearth.xml';
		updateFeed(feedDetails);
*/
	},2500);
	//sets the movie
	
	$('a').click(function(){ clearTimeout(timer); });

	/* Rollovers for the different product stuff */
	$('#bcr_packshot_1').hover(
      function(){$('#bcr_packshot').css('background-position','0px -496px');}, //rollover
      function(){$('#bcr_packshot').css('background-position','0 0');}
    ).click(function(){
		this.target = '_blank';
		clearTimeout(timer);
	}); //maybe not defined
	
	/*
$('#bcr_play_trailer').hover(
		function(){ $(this).css('background-position','0 -202px'); }, 
      	function(){ $(this).css('background-position','0 0'); }
    ).click(function(){
		feedDetails=new Object();
		feedDetails.feedUrl = 'http://www.sonypictures.com/previews/movies/afterearth.xml';
		updateFeed(feedDetails);
		// openOverlay();
    });
	
	$('#bcr_watch_trailer').hover(
		function(){ $(this).css('background-position','0 -26px'); }, 
      	function(){ $(this).css('background-position','0 0'); }
    ).click(function(){
		feedDetails=new Object();
		feedDetails.feedUrl = 'http://www.sonypictures.com/previews/movies/afterearth.xml';
		updateFeed(feedDetails);
		// openOverlay();
    });
	
	$('#bcr_watch_action').hover(
		function(){ $(this).css('background-position','0 -26px'); }, 
      	function(){ $(this).css('background-position','0 0'); }
    ).click(function(){
		feedDetails=new Object();
		feedDetails.feedUrl = 'http://www.sonypictures.com/movies/afterearth/mashup.xml';
		updateFeed(feedDetails);
    });
*/
	
	/* Modernizr and Regular JS for the expandable menus */
	
	if (Modernizr.touch)
	{
		$('#bcr_buy_br,#bcr_buy_digital,#bcr_buy_dvd').css('z-index','100');
		$('#bcr_menu_left,#bcr_menu_center,#bcr_menu_right').css('z-index','90');
		$('#bcr_buy_br').click({ left_position: '385px', other_menus: '#bcr_menu_center,#bcr_menu_right' },expand);
		$('#bcr_buy_digital').click({ left_position: '300px', other_menus: '#bcr_menu_left,#bcr_menu_right' },expand);
		$('#bcr_buy_dvd').click({ left_position: '725px', other_menus: '#bcr_menu_left,#bcr_menu_center' },expand);
    }
	else
	{
		/* ------------------------------------------------------------------- */
       	$('#bcr_buy_br').mouseenter({ left_position: '383px', other_menus: '#bcr_menu_center,#bcr_menu_right' },expand);
		$('#bcr_menu_left')
		.mouseleave(function(){ $(this).collapse(); })
		.mousemove(function(e){
			if (((e.pageX - $(this).offset().left) > 174) && ((e.pageY - $(this).offset().top) < 354)) { $(this).css('left','-9999px'); $(this).collapse(); }
		});
		/* ------------------------------------------------------------------- */
		$('#bcr_buy_digital').mouseenter({ left_position: '299px', other_menus: '#bcr_menu_left,#bcr_menu_right' },expand);
		$('#bcr_menu_center')
		.mouseleave(function(){ $(this).collapse(); })
		.mousemove(function(e){
			if (((e.pageX - $(this).offset().left) < 256) && ((e.pageY - $(this).offset().top) < 319)) { $(this).css('left','-9999px'); $(this).collapse(); }
		});
		/* ------------------------------------------------------------------- */
		$('#bcr_buy_dvd').mouseenter({ left_position: '724px', other_menus: '#bcr_menu_left,#bcr_menu_center' },expand);
		$('#bcr_menu_right').mouseleave(function(){ $(this).collapse(); });
		/* ------------------------------------------------------------------- */
    }
	
	$('.bcr_close').click(function(){ $(this).parent().collapse(); });
	
   	$('#bcr_overlay')
	.width($(document).width())
	.height($(document).height())
	.on('click',function(){ $('#bcr_menu_left,#bcr_menu_center,#bcr_menu_right').collapse(); });
	
});
$(window)
.load(function() { $('#bcr_sell').fadeIn(1000); })
.resize(function(){
	$('#bcr_overlay')
	.width($(document).width())
	.height($(document).height());
});
function getAnchorAndAreaLinks(){ return $('a,area'); }
$.urlParam = function(name){
	var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (!results) { return 0; }
	return results[1] || 0;
}

function expand(e)
{
	$(this).css('background-position','0 -58px').next('div').css('left',e.data.left_position).find('a').animateButtons();
	$(e.data.other_menus).collapse();
	$('#bcr_overlay').stop(true,true).fadeIn(300);
}