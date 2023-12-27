// Code By Webdevtrick ( https://webdevtrick.com )
var $header_top = $('.header-top');
var $nav = $('nav');
var check = false;
var testButton = document.getElementById("testButton");
var firstSection = document.getElementById("firstSection");
var giphy = document.getElementById("giphy")

$header_top.find('a').on('click', function() {
  $(this).parent().toggleClass('open-menu');
});

var lady = document.getElementById('img');
var position = 0;
var speed = 5; 

setInterval(function() {
  if(check === false){
  position += speed;
  lady.style.top = position % window.innerHeight + 'px';

  if(position > window.innerHeight - window.innerHeight * 0.4){
    lady.src = "Resources/ladygagastageresized.png";
    giphy.src="https://giphy.com/embed/i1sE2J6jIHnWjZH27Q";
    check = true
  }
}
},16);

function checkFall(){
  if(window.location.hash === "#firstSection"){
  lady.src = "Resources/ladygaga.png"
  giphy.src = "";
  check = false;
  position = 0;
  }
};


$('#fullpage').fullpage({
  sectionsColor: ['#3dcfa1', '#348899', '#ff8b20', '#ff5757', '#ffd03c'],
  sectionSelector: '.vertical-scrolling',
  navigation: true,
  slidesNavigation: false,
  controlArrows: false,
  anchors: ['firstSection', 'secondSection', 'thirdSection', 'fourthSection', 'fifthSection'],
  menu: '#menu',

  afterLoad: function(anchorLink, index) {
    $header_top.css('background', 'rgba(0, 47, 77, .3)');
    $nav.css('background', 'rgba(0, 47, 77, .25)');
    if (index == 5) {
        $('#fp-nav').show();
      }
      checkFall();
  },

  onLeave: function(index, nextIndex, direction) {
    if(index == 5) {
      $('#fp-nav').show();
    }
  },

});