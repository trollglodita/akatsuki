// 

document.addEventListener("deviceready", function () {
	jQuery( "#prev" ).on( "vmousedown", function( e ) { e.preventDefault(); } );

	document.addEventListener('touchmove', function (e) {
	    e.preventDefault();
	});

	$("document").ready(function(){

	    $("#change").change(function() {
	        alert('Load samples feature will be included ASAP!');
	    });

	    
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
	for (var i = 0; i < loads.length; i++) {
		loads[i].style.width = window.innerWidth/3.3 + 'px';
		loads[i].style.height = window.innerWidth/3.3 + 'px';
	};
},false);


