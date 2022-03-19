// ---------Responsive-navbar-active-animation-----------
function test(){
	var tabsNewAnim = $('#navbarSupportedContent');
	var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
	var activeItemNewAnim = tabsNewAnim.find('.active');
	var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
	var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
	var itemPosNewAnimTop = activeItemNewAnim.position();
	var itemPosNewAnimLeft = activeItemNewAnim.position();
	$(".hori-selector").css({
		"top":itemPosNewAnimTop.top + "px", 
		"left":itemPosNewAnimLeft.left + "px",
		"height": activeWidthNewAnimHeight + "px",
		"width": activeWidthNewAnimWidth + "px"
	});
	$("#navbarSupportedContent").on("click","li",function(e){
		$('#navbarSupportedContent ul li').removeClass("active");
		$(this).addClass('active');
		var activeWidthNewAnimHeight = $(this).innerHeight();
		var activeWidthNewAnimWidth = $(this).innerWidth();
		var itemPosNewAnimTop = $(this).position();
		var itemPosNewAnimLeft = $(this).position();
		$(".hori-selector").css({
			"top":itemPosNewAnimTop.top + "px", 
			"left":itemPosNewAnimLeft.left + "px",
			"height": activeWidthNewAnimHeight + "px",
			"width": activeWidthNewAnimWidth + "px"
		});
	});
}
$(document).ready(function(){
	setTimeout(function(){ test(); });
});
$(window).on('resize', function(){
	setTimeout(function(){ test(); }, 500);
});
$(".navbar-toggler").click(function(){
	$(".navbar-collapse").slideToggle(300);
	setTimeout(function(){ test(); });
});



// --------------add active class-on another-page move----------
jQuery(document).ready(function($){
	// Get current path and find target link
	var path = window.location.pathname.split("/").pop();

	// Account for home page with empty path
	if ( path == '' ) {
		path = 'index.html';
	}

	var target = $('#navbarSupportedContent ul li a[href="'+path+'"]');
	// Add active class to target link
	target.parent().addClass('active');
});




// Add active class on another page linked
// ==========================================
// $(window).on('load',function () {
//     var current = location.pathname;
//     console.log(current);
//     $('#navbarSupportedContent ul li a').each(function(){
//         var $this = $(this);
//         // if the current path is like this link, make it active
//         if($this.attr('href').indexOf(current) !== -1){
//             $this.parent().addClass('active');
//             $this.parents('.menu-submenu').addClass('show-dropdown');
//             $this.parents('.menu-submenu').parent().addClass('active');
//         }else{
//             $this.parent().removeClass('active');
//         }
//     })
// });


// items page start from here |||||


var item = function (initialItem, initialQuantity, viewSelf) {
  var self = this;
  self.item = ko.observable(initialItem);
  self.quantity = ko.observable(initialQuantity);
	self.total = ko.computed(function () {
		return self.item().price * self.quantity().quantity;
	},);
}

function viewModel() {
	// Data
	var self = this;
	self.appTitle = ko.observable();
	self.appSubTitle = ko.observable();
	self.jsonData = ko.observableArray([{
    "appTitle": "Billing system",
    "appSubTitle": "by Vijaya Kumar Vulchi",
    "vegetables": [
      {
        "productname": "broccoli",
        "price": 10.49
      },
          {
            "productname": "corn",
            "price": 34.95
          },
          {
            "productname": "cucumber",
            "price": 15.90
          },
          {
            "productname": "lettuce",
            "price": 34.09
          },
          {
            "productname": "pumpkin",
            "price": 19.04
          },
          {
            "productname": "tomato",
            "price": 17.60
          },
          {
            "productname": "beetroot",
            "price": 21.80
          },
          {
            "productname": "brussel sprouts",
            "price": 9.90 
          },
          {
            "productname": "lettuce",
            "price": 8.45 
          },
          {
            "productname": "mushrooms",
            "price": 55.20
          },
          {
            "productname": "onion",
            "price": 19.80
          },
          {
            "productname": "potato",
            "price": 29.19
          },
          {
            "productname": "red pepper",
            "price": 12.80
          },
          {
            "productname": "peas",
            "price": 12.33
          },
          {
            "productname": "leek",
            "price": 16.91
          }
    ],
    "quantity": [
      { "quantity": 1 },
      { "quantity": 2 },
      { "quantity": 3 },
      { "quantity": 4 },
      { "quantity": 5 },
      { "quantity": 10 },
      { "quantity": 20 },
      { "quantity": 25 },
      { "quantity": 50 },
      { "quantity": 100 }
    ]
  }]);
	self.items = ko.observableArray()
	self.addNewItem = ko.observable();
  //
  self.appTitle(self.jsonData()[0].appTitle);
  self.appSubTitle(self.jsonData()[0].appSubTitle);
  // Operations
  self.addNewItem = function() {
      self.items.push(new item(self.jsonData()[0].vegetables[0], self.jsonData()[0].quantity[0], self));
  }
  //
  self.removeItem = function (item) {
    self.items.remove(item);
  }
  //
  self.totalAmount = ko.computed(function() {
		var total = 0;
		for (var i = 0; i < self.items().length; i++) {
			total += self.items()[i].total();
		}
		return total.toFixed(2);
	}, this);
  //
	self.fullAppName = ko.computed(function () {
		return self.appTitle() + ' ' + self.appSubTitle();
	}, this);
}

ko.applyBindings(new viewModel);


// items page ends here
