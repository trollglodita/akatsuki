document.addEventListener("deviceready", function () {

	jQuery( "#prev" ).on( "vmousedown", function( e ) { e.preventDefault(); } );

	document.addEventListener('touchmove', function (e) {
	    e.preventDefault();
	});

	$("#change").change(function() {
        alert('Load samples feature will be included ASAP!');
    }); 




	var ToolbarItem = function (itemElement, src) {
	    this.__el = itemElement;

	    this.__el.style.width = window.innerWidth/3.1 + 'px';
	    this.__el.style.height = window.innerWidth/3.1 + 'px';

	    this.audio = new Media(window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1) + "buttons/boton" + src + ".mp3");

	    itemElement.addEventListener('touchstart', this.toggleActiveState.bind(this));
	    itemElement.addEventListener('touchend', this.toggleActiveState.bind(this));

	   

	};

	Object.defineProperties(ToolbarItem.prototype, {
	    activated: {
	        get: function () {
	            return this.__el.classList.contains("active");
	        },
	        set: function (value) {
	            if (value) {
	                this.__el.classList.add("active");
	                this.audio.play();
	            } else {
	                this.__el.classList.remove("active");
	                this.audio.stop();
	            }
	        }
	    }
	});

	ToolbarItem.prototype.toggleActiveState = function () {
	    this.activated = !this.activated;
	};

	var createToolbarItems = function (itemElements) {
	    var items = [];

	    [].forEach.call(itemElements, function (el, index, array) {

	        var item = new ToolbarItem(el, index);

	        items.push(item);
	    });

	    return items;
	};

	var Toolbar = function (elementId) {
		var element = document.getElementById(elementId);
	    var items = element.querySelectorAll(".item");

	    Object.defineProperties(this, {
	        __el: {
	            value: element
	        },
	        items: {
	            value: createToolbarItems(items),
	            enumerable: true
	        }
	    });
	};


	var toolbar = new Toolbar('launchpad');
	var loads = document.querySelectorAll('.nox');
	for (var i = 0, len = loads.length; i < len; i++) {
		loads[i].style.width = window.innerWidth/3.3 + 'px';
		loads[i].style.height = window.innerWidth/3.3 + 'px';
	};

	var soon = document.querySelectorAll('.soon');
	for (var i = 0, len = soon.length; i < len; i++) {
		soon[i].addEventListener('click', function () {
			alert('This will be ready with the Loading Samples Feature');
		});
	}

	
},false);

function scale( width, height, padding, border ) {
    var scrWidth = $( window ).width() - 30,
        scrHeight = $( window ).height() - 30,
        ifrPadding = 2 * padding,
        ifrBorder = 2 * border,
        ifrWidth = width + ifrPadding + ifrBorder,
        ifrHeight = height + ifrPadding + ifrBorder,
        h, w;
 
    if ( ifrWidth < scrWidth && ifrHeight < scrHeight ) {
        h = ifrHeight;
        w = ifrWidth;
    } else if ( ( ifrWidth / scrWidth ) > ( ifrHeight / scrHeight ) ) {
        h = ( scrWidth / ifrWidth ) * ifrHeight;
        w = scrWidth;
    } else {
        h = scrHeight;
        w = ( scrHeight / ifrHeight ) * ifrWidth;
    }
 
    return {
        'width': w - ( ifrPadding + ifrBorder ),
        'height': h - ( ifrPadding + ifrBorder )
    };
};

$( document ).on( "pageinit", function() {
    $( "#popupMap iframe" )
        .attr( "width", 0 )
        .attr( "height", 0 );
 
    $( "#popupMap" ).on({
        popupbeforeposition: function() {
            var size = scale( 497, 298, 15, 1 ),
                w = size.width,
                h = size.height;
 
            $( "#popupMap iframe" )
                .attr( "width", w )
                .attr( "height", window.innerHeight - 55 );
        },
        popupafterclose: function() {
            $( "#popupMap iframe" )
                .attr( "width", 0 )
                .attr( "height", 0 );
        }
    });
    setTimeout(function () {
		$("#popupMap").popup("open");
		console.log("Popup called");
	}, 5000);
});



