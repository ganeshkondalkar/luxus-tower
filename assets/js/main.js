/*! Project: Luxus_Tower. Created by: ganeshkondalkar@gmail.com. Version: 1.0.0.
This project is valid for the duration: November 01st, 2016 - October 31st, 2022. */
(function($, window, undefined) {

	// To compile the JS templates
	// Handlebars -m templates/> js/templates/templates.js

	/*var SiteRenewal = {
		// September 26th is the date to renew.
		expiryDate: new Date(2022, 9, 31),
		isRenewalRequired: function(){
			if( SiteRenewal.expiryDate < new Date() ){
				return true;
			} else {
				return false;
			}
		}
	};*/

	// All Cached DOM Selectors
	var DOM = {
		clearWindowResizeTimeout: null,
		$window: $(window),
		$body: $("body"),
		$nav: $(".nav-container").find("nav"),
		$navLis: null,
		$activeTab: null,
		activeTabOffset: null,
		$navBordr: $(".nav-border"),
		$tmplContnr: $("#mainContent").find(".template-container").children(),
		$banner: $("#mainContent").find(".banner"),
		$flrPlanModal: $("#myModal"),
		$disclmr: $("#disclaimer"),
		$disclmrLink: $(".disclaimer-link"),
		$gMapBox: document.getElementById("gMapBox"),
		$imgAnimBox: null,
		animationID: null,
		animTimer: 2000,
		// NOTE: using huth API Key.
		apiKey: "AIzaSyB5QBtnSLwJJxgALoMHx9N2rRQUN4dxuxM"
	};

	// site utilities functions
	var site = {
		initGenericGoogleMaps: function(){
			console.log("Google Maps");
			var map,
				bounds = new google.maps.LatLngBounds(),
				mapOptions = { mapTypeId: "roadmap" },
				mapContainer = DOM.$gMapBox;

			// display map on page
			map = new google.maps.Map( mapContainer, mapOptions );

			// set height of the container
			mapContainer.style.height = "400px";

			// multiple markers
			var markers = [
				['Corporate Office, Hi-tech Ultra Homes', 19.0332142, 73.0665171],
				['Luxus Tower, Kharghar', 19.0460038,73.0783671]
			];

			// info window content
			var infoWindowContent = [
		        ['<div class="info_content">' +
		        '<h3>Hi-tech Ultra Homes,</h3>' +
		        '<p>Corporate Office,<br>1102, The Landmark, Sector-7, Kharghar, Navi Mumbai, Maharashtra 410210</p>' + '</div>'],
		        ['<div class="info_content">' +
		        '<h3>Luxus Tower</h3>' +
		        '<p>Sector 18, Plot No. 9, Kharghar, Sector 18, Kharghar, Navi Mumbai, Maharashtra 410210</p>' + '</div>']
		    ];

		    // Display multiple markers on a map
		    var infoWindow = new google.maps.InfoWindow(),
		    	marker,
		    	i;
		    
		    // Loop through our array of markers & place each one on the map  
		    for( i = 0; i < markers.length; i++ ) {
		        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
		        bounds.extend(position);
		        marker = new google.maps.Marker({
		            position: position,
		            map: map,
		            title: markers[i][0]
		        });
        
		        // Allow each marker to have an info window    
		        google.maps.event.addListener(marker, 'click', (function(marker, i) {
		            return function() {
		                infoWindow.setContent(infoWindowContent[i][0]);
		                infoWindow.open(map, marker);
		            }
		        })(marker, i));

		        // Automatically center the map fitting all markers on the screen
		        map.fitBounds(bounds);
		    }

		    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
		    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
		        this.setZoom(14);
		        google.maps.event.removeListener(boundsListener);
		    });
		},

		clearAnimInterval: function(){
			clearInterval(DOM.animationID);
		},

		initTowerAnim: function(){
			console.log("ANIMATION STARTED");
			DOM.$imgAnimBox = DOM.$tmplContnr.find(".anim-box");
			DOM.animationID = setInterval(function(){
				console.log("HI");
					DOM.$imgAnimBox.fadeOut(DOM.animTimer).fadeIn(DOM.animTimer);
			}, 2000);
		},

		loadPageContent: function(obj, noBanner){
			if(!noBanner){
				DOM.$banner.html("<img src=\"" + obj.bannerImg + "\" alt=\"" + obj.bannerImg + "\">").show();
			} else {
				DOM.$banner.hide();
			}
			DOM.$tmplContnr.html(obj.htmlTmpl);
		},

		// Do Something Specific for Page Specific
		whenHashIs: {
			"#home": function(){
				console.log("Home Page Loaded.");
				site.loadPageContent({
					"bannerImg": "img/bg-banner-home.jpg", "bannerAltTxt": "Home Page Banner Image",
					"htmlTmpl": "<div class=\"col-xs-6 col-xs-offset-3\"><p>In Navi Mumbai specifically Kharghar offers one of the best living conditions such as - Wide Roads, Parks, Playgrounds, Malls, Multiplexes, Educational Intitutes, Hospitals, Star Hotels. Kharghar has everything to support a flamboyant life style.</p><p>Luxus Tower consist of 2 BHK plus Terrace apartments in tower with Stilt + Podium + 14 Residential floors. In keeping with modern town planning standards for a better quality of life, Kharghar has large spaces for gardens, parks, sports infrastructures, educational institutions and healthcare facilities.</p><p class=\"right-text\">Sector - 18, Plot No - 9,<br>Kharghar, Navi Mumbai</p><br><br><br><br><div id=\"rera-info\"><hr><p><span class='mr-2'>RERA Project Registration Number: P52000001259</span> | <span class='ml-2'>OC Received</span></p><hr></div>"
					
				});
			},
			"#about": function(){
				console.log("About Page Loaded.");
				site.loadPageContent({
					"bannerImg": "img/bg-banner.jpg", "bannerAltTxt": "About Page Banner Image",
					"htmlTmpl": "<div class=\"col-xs-8 col-xs-offset-2\"><div class=\"row\"><div class=\"col-xs-3\"><img src=\"img/icon-about.png\" alt=\"Hi Tech ultra homes logo images\"><br><br><a id=\"htuhLink\" href=\"http://www.hitechultrahomes.com\" target=\"_blank\">www.hitechultrahomes.com</a></div><div class=\"col-xs-8 col-xs-offset-1\"><p>Since the inception of Hi-Tech Ultra Homes Pvt. Ltd., the organisation has successfully delivered on its promise of providing quality living alternatives at affordable prices.</p><p>Under the dynamic leadership of the company's Promoter – Mr. Anil P. Patil, who is a Civil Engineer with over 26 years of experience in Real Estate and Construction. Hi-Tech Ultra Homes Pvt. Ltd. has successfully achieved the highest standard of transparency, professionalism, quality assurance and integrity in the field of Real Estate in and around Navi Mumbai.</p><p><strong><u>Mission:</u></strong> To build the highest quality homes with the most efficient facilities possible for our clients, with commitment to building the best and standing behind what we care.</p><p><strong><u>Vision:</u></strong> To deliver premium quality living space at the most reasonable cost, with sustained efforts towards fulfilling out customers dream of owning a home that fits his stature.</p></div></div></div>"
				});
			},
			"#project": function(){
				console.log("Project Page Loaded.");
				site.loadPageContent({
					"bannerImg": "img/bg-banner-product.jpg", "bannerAltTxt": "Project Page Banner Image",
					"htmlTmpl": "<div class=\"col-xs-5 col-xs-offset-4\"><p>For 28 special personalities like you, we have designed a exclusive project full of hi class design, space, place & amenities.</p><h5>Project Features</h5><ul><li>CIDCO transfer plot</li><li>Stilt + 15 storey exclusively residential tower</li><li>Each floor houses two 2BHK + Terrace apartments</li><li>Earthquake resistant R.C.C. Construction</li></ul><h5>Project Architecture</h5><ul><li>D Mart-5 mins walk</li><li>Proposed International Airport-15 mins drive</li><li>Kharghar Railway station-7 mins drive</li><li>Iskon temple-7 mins walk</li><li>Central park and Golf course-7 mins walk</li><li>Proposed Metro Railway Station-5 mins walk</li><li>Adjucent to CIDCO Corporate Park</li></ul></div>"
				});
			},
			"#plan": function(){
				console.log("Plan Page Loaded.");
				site.loadPageContent({
					"htmlTmpl": "<div><div class=\"row big-img\"><div class=\"col-xs-5 col-sm-3 img\"><img src=\"img/bg-plan.jpg\" alt=\"contact page image\"></div></div><div class=\"row flr-plan\"><div class=\"col-xs-8 col-sm-6 img\"><div class=\"badge-title col-xs-8 col-md-6\"><h5>GROUND FLOOR PLAN</h5></div><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"img/project/Floor-Plans-03.jpg\" alt=\"PODIUM FLOOR PLAN\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"badge-title col-xs-8 col-md-6\"><h5>PODIUM FLOOR PLAN</h5></div><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"img/project/Floor-Plans-04.jpg\" alt=\"GROUND FLOOR PLAN\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"badge-title col-xs-8 col-md-6\"><h5>EVEN FLOOR PLAN</h5></div><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"img/project/Floor-Plans-01.jpg\" alt=\"EVEN FLOOR PLAN\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"badge-title col-xs-8 col-md-6\"><h5>ODD FLOOR PLAN</h5></div><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"img/project/Floor-Plans-02.jpg\" alt=\"ODD FLOOR PLAN\"></div></div></div>"
				}, true);
			},
			"#project-status": function(){
				console.log("Project Status Page Loaded.");
				site.loadPageContent({
					// "htmlTmpl": "<div class=\"row big-img\"><div class=\"col-xs-5 col-sm-3 img\"><div class=\"anim-box\"><img class=\"anim\" src=\"img/bg-contact.jpg\" alt=\"contact page image\"></div><div class=\"anim-box-1\"><img class=\"anim\" src=\"img/bg-contact-night.jpg\" alt=\"contact page image\"></div></div></div><!--ROW START --><div class=\"row flr-plan\"><div class=\"badge-title col-xs-7 col-md-5\"><h5>Virtual Completion of the Project - August 2019</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/aug-2019/project-status-aug-2019-01.jpg\" alt=\"Virtual Completion of the Project - August 2019\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/aug-2019/project-status-aug-2019-02.jpg\" alt=\"Virtual Completion of the Project - August 2019\"></div></div></div><!--ROW END --><div class=\"row flr-plan\"><div class=\"badge-title col-xs-7 col-md-5\"><h5>Completion of External Plaster - March 2019</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/mar-2019/project-status-march-2019-01.jpg\" alt=\"Completion of External Plaster - March 2019\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/mar-2019/project-status-march-2019-02.jpg\" alt=\"Completion of External Plaster - March 2019\"></div></div></div><div class=\"row flr-plan\"><div class=\"badge-title col-xs-6 col-md-4\"><h5>Completion of Brick Work - August 2018</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/aug-2018/project-status-aug-01.jpg\" alt=\"Completion of Brick Work - August 2018\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/aug-2018/project-status-aug-02.jpg\" alt=\"Completion of Brick Work - August 2018\"></div></div></div><div class=\"row flr-plan\"><div class=\"badge-title col-xs-6 col-md-4\"><h5>Completion of Terrace Slab - March 2018</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/mar-2018/project-status-march-2018-01.jpg\" alt=\"Completion of Terrace Slab - March 2018\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/mar-2018/project-status-march-2018-02.jpg\" alt=\"Completion of Terrace Slab - March 2018\"></div></div></div><div class=\"row flr-plan\"><div class=\"badge-title col-xs-6 col-md-4\"><h5>Completion of 15th Slab - February 2018</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/feb-2018/project-status-feb-2018-01.jpg\" alt=\"Completion of 15th Slab February 2018\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/feb-2018/project-status-feb-2018-02.jpg\" alt=\"Completion of 15th Slab February 2018\"></div></div></div><div class=\"row flr-plan\"><div class=\"badge-title col-xs-6 col-md-4\"><h5>Completion of 14th Slab - January 2018</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/jan-2018/project-status-jan-2018-01.jpg\" alt=\"Completion of 14th Slab January 2018\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/jan-2018/project-status-jan-2018-02.jpg\" alt=\"Completion of 14th Slab January 2018\"></div></div></div><div class=\"row flr-plan\"><div class=\"badge-title col-xs-6 col-md-4\"><h5>Completion of 12th Slab - November 2017</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-nov-2017-01.jpg\" alt=\"Completion of 12th Slab November 2017\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-nov-2017-02.jpg\" alt=\"Completion of 12th Slab November 2017\"></div></div></div><div class=\"row flr-plan\"><div class=\"badge-title col-xs-6 col-md-4\"><h5>Completion of 11th Slab - October 2017</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-oct-2017-01.jpg\" alt=\"Completion of 11th Slab October 2017\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-oct-2017-02.jpg\" alt=\"Completion of 11th Slab October 2017\"></div></div></div><div class=\"row flr-plan\"><div class=\"badge-title col-xs-6 col-md-4\"><h5>Completion of 10th Slab - September 2017</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-sept-2017-01.jpg\" alt=\"Completion of 10th Slab September 2017\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-sept-2017-02.jpg\" alt=\"Completion of 10th Slab September 2017\"></div></div></div><div class=\"row flr-plan\"><div class=\"badge-title col-xs-6 col-md-4\"><h5>Completion of 8th Slab - February 2017</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-jan-2017-01.jpg\" alt=\"Completion of 8th Slab February 2017\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-jan-2017-02.jpg\" alt=\"Completion of 8th Slab February 2017\"></div></div></div><div class=\"row flr-plan\"><div class=\"badge-title col-xs-6 col-md-4\"><h5>Completion of 7th Slab - December 2016</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-dec-01.jpg\" alt=\"Completion of 6th Slab December 2016\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-dec-02.jpg\" alt=\"Completion of 6th Slab December 2016\"></div></div></div><div class=\"row flr-plan\"><div class=\"badge-title col-xs-6 col-md-4\"><h5>Completion of 6th Slab - November 2016</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-nov-01.jpg\" alt=\"Completion of 6th Slab November 2016\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-nov-02.jpg\" alt=\"Completion of 6th Slab November 2016\"></div></div></div><div class=\"row flr-plan\"><div class=\"badge-title col-xs-6 col-md-4\"><h5>Completion of 5th Slab - October 2016</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-oct-01.jpg\" alt=\"Completion of 5th Slab October 2016\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-oct-02.jpg\" alt=\"Completion of 5th Slab October 2016\"></div></div></div><div class=\"row flr-plan\"><div class=\"badge-title col-xs-6 col-md-4\"><h5>Completion of 4th Slab - September 2016</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-sept-01.jpg\" alt=\"Completion of 4th Slab September 2016\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-sept-02.jpg\" alt=\"Completion of 4th Slab September 2016\"></div></div></div><div class=\"row flr-plan\"><div class=\"badge-title col-xs-6 col-md-4\"><h5>Completion of 1st Slab - July 2016</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-july-01.jpg\" alt=\"Completion of 1st Slab July 2016\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-july-02.jpg\" alt=\"Completion of 1st Slab July 2016\"></div></div></div><div class=\"row flr-plan\"><div class=\"badge-title col-xs-6 col-md-4\"><h5>Completion of Plinth Level - May 2016</h5></div><div class=\"col-xs-8 col-sm-4 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-may-03.jpg\" alt=\"01 Completion of Plinth Level - May 2016\"></div></div><div class=\"col-xs-8 col-sm-4 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-may-01.jpg\" alt=\"01 Completion of Plinth Level - May 2016\"></div></div><div class=\"col-xs-8 col-sm-4 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-may-02.jpg\" alt=\"02 Completion of Plinth Level - May 2016\"></div></div></div><div class=\"row flr-plan\"><div class=\"badge-title col-xs-6 col-md-4\"><h5>Foundation Work March 2016</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-march-01.jpg\" alt=\"Foundation Work March 2016\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-march-02.jpg\" alt=\"Foundation Work March 2016\"></div></div></div><div class=\"row flr-plan\"><div class=\"badge-title col-xs-6 col-md-4\"><h5>Commencement Of Work Feb 2016</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-feb-01.jpg\" alt=\"Floor-Plans-01\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-feb-02.jpg\" alt=\"Floor-Plans-02\"></div></div></div>"
					'htmlTmpl': '<div class=\"row big-img\"><div class=\"col-xs-5 col-sm-3 img\"><div class=\"anim-box\"><img class=\"anim\" src=\"img/bg-contact.jpg\" alt=\"contact page image\"></div><div class=\"anim-box-1\"><img class=\"anim\" src=\"img/bg-contact-night.jpg\" alt=\"contact page image\"></div></div></div>' +
						'<!--ROW START --><div class=\"row flr-plan\"><div class=\"badge-title col-xs-7 col-md-5\"><h5>Occupancy Certificate</h5></div><div class=\"col-xs-8 col-xs-offset-2 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/nov-2019/occupancy-certificate.jpeg\" alt=\"Occupancy Certificate\"></div></div></div><!--ROW END -->' + 
						'<div class=\"row flr-plan\"><div class=\"badge-title col-xs-7 col-md-5\"><h5>Lift Certificate</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/nov-2019/lift-noc-page-1.jpeg\" alt=\"Lift Certificate\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/nov-2019/lift-noc-page-2.jpeg\" alt=\"Lift Certificate\"></div></div></div>' + 
						'<div class=\"row flr-plan\"><div class=\"badge-title col-xs-7 col-md-5\"><h5>Fire NOC</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/nov-2019/fire-noc-page-1.jpeg\" alt=\"Fire NOC\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/nov-2019/fire-noc-page-2.jpeg\" alt=\"Fire NOC\"></div></div></div>' + 
						'<div class=\"row flr-plan\"><div class=\"badge-title col-xs-7 col-md-5\"><h5>Drainage Connection Certificate</h5></div><div class=\"col-xs-8 col-xs-offset-2 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/nov-2019/drainage-connection-certificate.jpeg\" alt=\"Drainage Connection Certificate\"></div></div></div>' + 
						'<div class=\"row flr-plan\"><div class=\"badge-title col-xs-7 col-md-5\"><h5>Commencement Certificate</h5></div><div class=\"col-xs-8 col-sm-4 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/nov-2019/commencement-certificate-1.jpg\" alt=\"Commencement Certificate - Page 1\"></div></div><div class=\"col-xs-8 col-sm-4 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/nov-2019/commencement-certificate-2.jpg\" alt=\"Commencement Certificate - Page 2\"></div></div><div class=\"col-xs-8 col-sm-4 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/nov-2019/commencement-certificate-3.jpg\" alt=\"Commencement Certificate - Page 3\"></div></div></div>' + 
						'<div class=\"row flr-plan\"><div class=\"badge-title col-xs-7 col-md-5\"><h5>Completion of the Project - August 2019</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/aug-2019/project-status-aug-2019-01.jpg\" alt=\"Completion of the Project - August 2019\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/aug-2019/project-status-aug-2019-02.jpg\" alt=\"Completion of the Project - August 2019\"></div></div></div>' + 
						'<div class=\"row flr-plan\"><div class=\"badge-title col-xs-7 col-md-5\"><h5>Completion of External Plaster - March 2019</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/mar-2019/project-status-march-2019-01.jpg\" alt=\"Completion of External Plaster - March 2019\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/mar-2019/project-status-march-2019-02.jpg\" alt=\"Completion of External Plaster - March 2019\"></div></div></div>' + 
						'<div class=\"row flr-plan\"><div class=\"badge-title col-xs-6 col-md-4\"><h5>Completion of Brick Work - August 2018</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/aug-2018/project-status-aug-01.jpg\" alt=\"Completion of Brick Work - August 2018\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/aug-2018/project-status-aug-02.jpg\" alt=\"Completion of Brick Work - August 2018\"></div></div></div>' + 
						'<div class=\"row flr-plan\"><div class=\"badge-title col-xs-6 col-md-4\"><h5>Completion of Terrace Slab - March 2018</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/mar-2018/project-status-march-2018-01.jpg\" alt=\"Completion of Terrace Slab - March 2018\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/mar-2018/project-status-march-2018-02.jpg\" alt=\"Completion of Terrace Slab - March 2018\"></div></div></div>' + 
						'<div class=\"row flr-plan\"><div class=\"badge-title col-xs-6 col-md-4\"><h5>Completion of 15th Slab - February 2018</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/feb-2018/project-status-feb-2018-01.jpg\" alt=\"Completion of 15th Slab February 2018\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/feb-2018/project-status-feb-2018-02.jpg\" alt=\"Completion of 15th Slab February 2018\"></div></div></div>' + 
						'<div class=\"row flr-plan\"><div class=\"badge-title col-xs-6 col-md-4\"><h5>Completion of 14th Slab - January 2018</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/jan-2018/project-status-jan-2018-01.jpg\" alt=\"Completion of 14th Slab January 2018\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/jan-2018/project-status-jan-2018-02.jpg\" alt=\"Completion of 14th Slab January 2018\"></div></div></div>' + 
						'<div class=\"row flr-plan\"><div class=\"badge-title col-xs-6 col-md-4\"><h5>Completion of 12th Slab - November 2017</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-nov-2017-01.jpg\" alt=\"Completion of 12th Slab November 2017\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-nov-2017-02.jpg\" alt=\"Completion of 12th Slab November 2017\"></div></div></div>' + 
						'<div class=\"row flr-plan\"><div class=\"badge-title col-xs-6 col-md-4\"><h5>Completion of 11th Slab - October 2017</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-oct-2017-01.jpg\" alt=\"Completion of 11th Slab October 2017\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-oct-2017-02.jpg\" alt=\"Completion of 11th Slab October 2017\"></div></div></div>' + 
						'<div class=\"row flr-plan\"><div class=\"badge-title col-xs-6 col-md-4\"><h5>Completion of 10th Slab - September 2017</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-sept-2017-01.jpg\" alt=\"Completion of 10th Slab September 2017\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-sept-2017-02.jpg\" alt=\"Completion of 10th Slab September 2017\"></div></div></div>' + 
						'<div class=\"row flr-plan\"><div class=\"badge-title col-xs-6 col-md-4\"><h5>Completion of 8th Slab - February 2017</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-jan-2017-01.jpg\" alt=\"Completion of 8th Slab February 2017\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-jan-2017-02.jpg\" alt=\"Completion of 8th Slab February 2017\"></div></div></div>' + 
						'<div class=\"row flr-plan\"><div class=\"badge-title col-xs-6 col-md-4\"><h5>Completion of 7th Slab - December 2016</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-dec-01.jpg\" alt=\"Completion of 6th Slab December 2016\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-dec-02.jpg\" alt=\"Completion of 6th Slab December 2016\"></div></div></div>' + 
						'<div class=\"row flr-plan\"><div class=\"badge-title col-xs-6 col-md-4\"><h5>Completion of 6th Slab - November 2016</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-nov-01.jpg\" alt=\"Completion of 6th Slab November 2016\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-nov-02.jpg\" alt=\"Completion of 6th Slab November 2016\"></div></div></div>' + 
						'<div class=\"row flr-plan\"><div class=\"badge-title col-xs-6 col-md-4\"><h5>Completion of 5th Slab - October 2016</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-oct-01.jpg\" alt=\"Completion of 5th Slab October 2016\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-oct-02.jpg\" alt=\"Completion of 5th Slab October 2016\"></div></div></div>' + 
						'<div class=\"row flr-plan\"><div class=\"badge-title col-xs-6 col-md-4\"><h5>Completion of 4th Slab - September 2016</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-sept-01.jpg\" alt=\"Completion of 4th Slab September 2016\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-sept-02.jpg\" alt=\"Completion of 4th Slab September 2016\"></div></div></div>' + 
						'<div class=\"row flr-plan\"><div class=\"badge-title col-xs-6 col-md-4\"><h5>Completion of 1st Slab - July 2016</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-july-01.jpg\" alt=\"Completion of 1st Slab July 2016\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-july-02.jpg\" alt=\"Completion of 1st Slab July 2016\"></div></div></div>' + 
						'<div class=\"row flr-plan\"><div class=\"badge-title col-xs-6 col-md-4\"><h5>Completion of Plinth Level - May 2016</h5></div><div class=\"col-xs-8 col-sm-4 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-may-03.jpg\" alt=\"01 Completion of Plinth Level - May 2016\"></div></div><div class=\"col-xs-8 col-sm-4 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-may-01.jpg\" alt=\"01 Completion of Plinth Level - May 2016\"></div></div><div class=\"col-xs-8 col-sm-4 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-may-02.jpg\" alt=\"02 Completion of Plinth Level - May 2016\"></div></div></div>' + 
						'<div class=\"row flr-plan\"><div class=\"badge-title col-xs-6 col-md-4\"><h5>Foundation Work March 2016</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-march-01.jpg\" alt=\"Foundation Work March 2016\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-march-02.jpg\" alt=\"Foundation Work March 2016\"></div></div></div>' + 
						'<div class=\"row flr-plan\"><div class=\"badge-title col-xs-6 col-md-4\"><h5>Commencement Of Work Feb 2016</h5></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-feb-01.jpg\" alt=\"Floor-Plans-01\"></div></div><div class=\"col-xs-8 col-sm-6 img\"><div class=\"img-container\"><img data-toggle=\"modal\" data-target=\"#myModal\" src=\"../img/project-status/project-status-feb-02.jpg\" alt=\"Floor-Plans-02\"></div></div></div>'
				}, true);
			},
			"#downloads": function(){
				console.log("Downloads Page Loaded.");
				site.loadPageContent({
					"bannerImg": "img/bg-banner.jpg", "bannerAltTxt": "Download Brochure Page Banner Image",
					"htmlTmpl": "<div class=\"col-xs-4 col-xs-offset-4\"><p>Click on icon to download e brochure</p><br><p><a href=\"img/Luxus-Tower-Brochure.pdf\" download=\"Luxus-Tower-Brochure.pdf\" title=\"download e brochure\"><img src=\"img/icon-pdf-download.jpg\" alt=\"Download Brochure\"></a></p></div>"
				});
			},
			"#contact": function(){
				console.log("Contacts Page Loaded.");
				site.loadPageContent({
					"bannerImg": "img/bg-banner.jpg", "bannerAltTxt": "Contact Page Banner Image",
					"htmlTmpl": "<div class=\"col-xs-6 col-xs-offset-3\"><div class=\"col-xs-6\"><div class=\"anim-box\"><img class=\"anim\" src=\"img/bg-contact.jpg\" alt=\"contact page image\"></div><div class=\"anim-box-1\"><img class=\"anim\" src=\"img/bg-contact-night.jpg\" alt=\"contact page image\"></div></div><div class=\"col-xs-6\"><br><p><b>Site Address</b><br>Luxus Tower,<br>Sector - 18, Plot no - 9,<br>Kharghar, Navi Mumbai - 410210.</p><br><p><b>Corporate Address</b><br>Hi-tech Ultra Homes Pvt. Ltd.<br>1102, The Landmark, Sector - 7, Kharghar, Navi Mumbai - 410210.</p><br><p><b>phone</b><br>022-65204000 / +91 99050 20202</p><br><p><b>Email</b><br>hitechultrahomes@gmail.com</p></div></div>"
				});
			}
		},

		zoomModalHandler: function(e){
			DOM.$flrPlanModal.find(".modal-dialog").toggleClass("modal-lg");
			DOM.$flrPlanModal.modal('handleUpdate');
		},

		setClassToBodyTag: function(hash){
			DOM.$body.removeClass().addClass(hash.replace("#", ""));
			site.whenHashIs[hash]();
		},

		setActiveTab: function(hash){
			console.log("setActiveTab");
			DOM.$navLis = (!DOM.$navLis) ? DOM.$nav.find('li'): DOM.$navLis;
			DOM.$navLis.removeClass("active");
			DOM.$activeTab = $( DOM.$navLis.children("[href='" + hash + "']").parent("li")[0] ).addClass("active");
			
			try {
				site.setClassToBodyTag(hash);
			} catch(err) {
				console.info("No Such Page Exists!");
				site.setClassToBodyTag("#home");
			}
		},

		alignNavBorderOnWinResize: function(){
			DOM.activeTabOffset = DOM.$activeTab.offset();
			DOM.$navBordr.css({"margin-top": "-" + (DOM.activeTabOffset.top - 70) + "px"});
		},

		onHashChangeHandler: function(e){
			console.log("onHashChangeHandler");
			site.setActiveTab(location.hash);
			(location.hash === "#project-status" || location.hash === "#contact") ? site.initTowerAnim() : site.clearAnimInterval();
		},

		initEventListeners: function(){
			console.log("initEventListeners");

			// set Default hash for Homepage, if there is no hash available.
			(location.hash === "") ? site.setActiveTab("#home") : site.setActiveTab(location.hash);
			
			site.alignNavBorderOnWinResize();

			DOM.$window.on("resize", function(e){
				clearTimeout(DOM.clearWindowResizeTimeout);
				DOM.clearWindowResizeTimeout = setTimeout(site.alignNavBorderOnWinResize, 250);
			});

			DOM.$window.on("hashchange", site.onHashChangeHandler);

			DOM.$flrPlanModal.on("show.bs.modal", function(e){
				var modal = $(this),
					data = {
						src: $(e.relatedTarget).attr("src"),
						title: $(e.relatedTarget).attr("alt")
					};

				modal.find(".modal-title").text(data.title);
				modal.find(".modal-body img").attr("src", data.src).attr("alt", data.title);
				// Zoom Button EventListener
				modal.find(".modal-zoom").off("click").on("click", site.zoomModalHandler);
			});

			DOM.$flrPlanModal.on("hidden.bs.modal", function(e){
				DOM.$flrPlanModal.find(".modal-dialog").removeClass("modal-lg");
			});

			DOM.$window.on("load", site.alignNavBorderOnWinResize);

			DOM.$disclmrLink.on("click", function(e){
				e.preventDefault();
				DOM.$disclmr.find("p:visible").hide('fast');
				DOM.$disclmr.find("p:hidden").show('slow');
			});
		},

		init: function(){
			window.initGMaps = site.initGenericGoogleMaps;
			// site.initEventListeners();
			// NOTE: load the GMap Script first and then bootstrap the application.
			var url = "http://maps.googleapis.com/maps/api/js?key=" + DOM.apiKey + "&callback=initGMaps";

			$.getScript(url, function(){
				// init to be triggered post google maps js loads.
				site.initEventListeners();
			});
		}
	};

	// initialize Application
	$(function () {
		site.init();
		/*if( SiteRenewal.isRenewalRequired() ){
			DOM.$body.addClass("site-renewal").html("");
			console.warn("Hosting renewal is required!\nYour Website Hosting plan was only for the period of Oct-2018 to Sept-2020.\nPlease contact \"ganeshkondalkar@gmail.com\" - your host provider for re-activation!");
		} else {
			site.init();
		}*/
	});

})(jQuery, window, undefined);