(function ($) {
    $(document).ready(function () {

        console.log("🚀 Welcome to my website 🌟");

        ///////////////////
        ////
        //// Function Index
        ////
        ///////////////////

        // Page Load
        fadePageContentOnLoad(); // Fades page content in-and-out on load

        // Navigation
        showMobileMenuOnScroll(); // Detects scroll direction and hides or shows mobile menu on scroll movement
        toggleMenuVisibility(); // Toggle element for showing mobile menu navigation

        // Tabs
        enableTabs(); // JS required for tab functionality

        // Lightbox
        displayLightbox(); // Displays image in lightbox presentation when clicked

        // Cursor
        changeCursor(); // Changes cursor presentation
        addCursorElement(); // Adds additional cursor element

        // Scroll & Mouse
        addScrollMovement(); // Adds slight movement to items on scroll
        enableShiftContent(); // Adds slight shift to page contents on mouse movement

        ///////////////////
        ////
        //// Functions
        ////
        ///////////////////

        // Page Load
        function fadePageContentOnLoad() {
            // Fade-in effect on page load
            $('body').addClass('fade-in');

            // Fade-out effect on link click
            $('a').click(function (event) {
                var href = $(this).attr('href'); // Get the link URL

                // Check if the link should open in a new tab
                if (event.ctrlKey || event.metaKey || $(this).attr('target') === '_blank') {
                    // If it should open in a new tab, let the default behavior happen
                    return;
                }

                event.preventDefault(); // Prevent the default link behavior

                $('body').removeClass('fade-in').addClass('fade-out'); // Apply the fade-out animation

                setTimeout(function () {
                    window.location.href = href; // Redirect to the link URL after a short delay
                }, 300); // Adjust the delay time (in milliseconds) to match your CSS transition duration
            });
        }

       // Navigation

       function showMobileMenuOnScroll() {
        // Adds attribute for adjusting menu visibility on scroll
        $('header').attr('scroll-direction', 'normal');

        // Detect mobile window width, and then adjust scroll-direction attribute based on scroll direction
        var lastScrollTop = 0;
        $(window).scroll(function () {
            var currentScrollTop = $(this).scrollTop();
            if (currentScrollTop > lastScrollTop) {
                $('header').attr('scroll-direction', 'downwards');
            } else {
                $('header').attr('scroll-direction', 'upwards');
            }
            lastScrollTop = currentScrollTop;
        });
    };

    function toggleMenuVisibility() {
        const $menuToggle = $('.navigation-toggle');
        const $menuNavigation = $('.navigation_list');

        $(document).ready(function () {
            // Show the menu navigation after a delay of 0.5 seconds
            setTimeout(function () {
                $menuNavigation.removeClass('hidden');
            }, 500);
        });

        $menuToggle.on("click", function () {
            if ($(this).attr('mobile_menu-visibility') === 'hidden') {
                $(this).attr('mobile_menu-visibility', 'visible');
                $menuNavigation.attr('mobile_menu-visibility', 'visible');
                $('body').attr('mobile_menu-visibility', 'visible');
            } else {
                $(this).attr('mobile_menu-visibility', 'hidden');
                $menuNavigation.attr('mobile_menu-visibility', 'hidden');
                $('body').attr('mobile_menu-visibility', 'hidden');
            }
        });
    };

    // Tabs

    function enableTabs() {
        // Check if .layoutTabs element exists
        if (!$('.layoutTabs').length) {
            return; // Exit the function if the element doesn't exist
        }

        // Tab button functionality
        $(".tab-button").click(function () {
            $(".tab-button").removeClass("active"); // Remove 'active' class from all tab buttons
            $(this).addClass("active"); // Add 'active' class to clicked tab button

            var count = $(this).index() - 1;
            $(".tab-content").css("display", "none");
            $(".tab-content").eq(count).css("display", "initial");

            // Move active-highlight element
            var buttonWidth = $(this).outerWidth();
            var buttonPosition = $(this).position().left;
            $(".active-highlight").css({
                "width": buttonWidth,
                "transform": "translateX(" + buttonPosition + "px)"
            });
        });

        // Set minimum height on load and window resize     
        function setMinHeight() {
            var maxHeight = 0;
            $(".tab-content").each(function () {
                var height = $(this).outerHeight();
                if (height > maxHeight) {
                    maxHeight = height;
                }
            });
            $(".tab-contents").css("min-height", maxHeight);
        };

        $(document).ready(function () {
            setMinHeight();
            $(window).on("resize", setMinHeight);
        });


        // Set initial position and width of active-highlight
        var firstButtonWidth = $(".tab-button:first").outerWidth();
        var firstButtonPosition = $(".tab-button:first").position().left;
        $(".active-highlight").css({
            "width": firstButtonWidth,
            "transform": "translateX(" + firstButtonPosition + "px)"
        });

        // Set first tab-button as active on page load
        $(".tab-button:first").addClass("active");
    }

    // Lightbox

    function displayLightbox() {
        // Check if .lightboxContainer element exists
        if (!$('.imageLightbox').length) {
            return; // Exit the function if the element doesn't exist
        }

        // Create lightbox container
        $('<div class="lightboxContainer hidden"><div class="lightboxContainer-content_wrapper"><div class="lightbox-gallery"><div class="lightbox-main_image"><img class="image" src="" width="100%" height="auto"></div><div class="lightbox-other_images"></div></div></div></div>').prependTo('body');

        // Assign lightbox variables
        const $lightboxContainer = $('.lightboxContainer');
        const $lightboxGallery = $('.lightbox-gallery');
        const $lightboxMainImage = $('.lightbox-main_image>img');

        // Loop through each element with class 'imageLightbox'
        $('.imageLightbox').each(function () {
            let $lightboxImageSrc = $(this).attr('src');
            let $lightboxOtherImage = $('<img class="image imageLightbox" src="' + $lightboxImageSrc + '" width="100%" height="auto">');
            $('.lightbox-other_images').append($lightboxOtherImage);

            // Add 'lightboxVisible' class if image src matches lightboxMainImage src
            if ($lightboxImageSrc === $lightboxMainImage.attr('src')) {
                $lightboxOtherImage.addClass('lightboxVisible');
            }
        });

        // Replace main gallery image on click
        $('.imageLightbox').on('click', function () {
            $lightboxMainImage.attr('src', $(this).attr('src'));

            // Add 'lightboxVisible' class to matching image in .lightbox-other_images container
            $('.lightbox-other_images img').removeClass('lightboxVisible');
            $('.lightbox-other_images img[src="' + $(this).attr('src') + '"]').addClass('lightboxVisible');

            // Show lightbox container
            if (!$lightboxGallery.hasClass('visible')) {
                $lightboxContainer.removeClass('hidden');
                $lightboxGallery.addClass('visible');

                // Center lightbox gallery
                let top = Math.max(($(window).height() - $lightboxGallery.outerHeight()) / 2, 0);
                let left = Math.max(($(window).width() - $lightboxGallery.outerWidth()) / 2, 0);
                $lightboxGallery.css({
                    top: top,
                    left: left
                });
            }
        });

        // Hide lightbox container on click outside of lightbox gallery
        $lightboxContainer.on('click', function (event) {
            if ($lightboxGallery.hasClass('visible') && !$(event.target).closest('.lightbox-gallery').length) {
                $lightboxContainer.addClass('hidden');
                $lightboxGallery.removeClass('visible');
            }
        });
    };

    // Cursor

    function changeCursor() {
        // Adds class to <body> to remove cursor
        $('body').addClass('remove-cursor');

        // Initialize cursor styling
        $(document).ready(function () {
            var cursor = $(".cursor");

            $(window).mousemove(function (e) {
                cursor.css({
                    top: e.clientY - cursor.height() / 2,
                    left: e.clientX - cursor.width() / 2
                });
            });

            $(window)
                .mouseleave(function () {
                    cursor.css({
                        opacity: "0"
                    });
                })
                .mouseenter(function () {
                    cursor.css({
                        opacity: "1"
                    });
                });

            // Adjusts cursor to circle when hovering over links and buttons
            $(":is(.viewCursor, button)")
                .mouseenter(function () {
                    cursor.addClass('link-hover');
                    cursor.css({
                        width: "25px",
                        height: "25px",
                        "border-bottom": "20px solid transparent",
                        "background-color": "var(--slate-4)",
                        transform: "scale(1.5) rotate(0deg) translateY(-12.5px) translateX(-12.5px)",
                        "border-radius": "50%",
                        "mix-blend-mode": "hard-light"
                    });
                })
                .mouseleave(function () {
                    cursor.removeClass('link-hover');
                    cursor.css({
                        width: "0",
                        height: "0",
                        "border-bottom": "24px solid var(--coral-1)",
                        "background-color": "transparent",
                        transform: "scale(1) rotate(-45deg)",
                        "border-radius": "0",
                        "mix-blend-mode": "normal"
                    });
                });

            // Adjusts cursor when interacting with header links
            $(":is(header a, .body>a, .lightboxContainer .imageLightbox")
                .mouseenter(function () {
                    cursor.css({
                        transform: "scale(1) rotate(-20deg)",
                        "mix-blend-mode": "normal",
                    });
                })
                .mouseleave(function () {
                    cursor.css({
                        transform: "scale(1) rotate(-45deg)",
                        "mix-blend-mode": "hard-light"
                    });
                });

            // Reduces cursor sizes on mousedown
            $(window)
                .mousedown(function () {
                    cursor.css({
                        transform: "scale(0.8) rotate(0deg)"
                    });
                })
                .mouseup(function () {
                    cursor.css({
                        transform: "scale(1) rotate(-45deg)"
                    });
                });
        });

    };

    function addCursorElement() {
        // Adjusts squishy cursor dimensions and position based on the mouse position
        $(document).mousemove(function (event) {
            $(".cursor-circle").css({
                "top": event.pageY,
                "left": event.pageX
            });
            var circle = $(".cursor-circle");
            var x = event.pageX - circle.offset().left - circle.width() / 2;
            var y = event.pageY - circle.offset().top - circle.height() / 2;
            circle.css({
                "width": Math.abs(x),
                "height": Math.abs(y)
            });
        });

        // Eases squishy cursor to original dimensions when not moving
        setInterval(function () {
            var circle = $(".cursor-circle");
            if (circle.width() != 25 || circle.height() != 25) {
                circle.css({
                    "width": 25,
                    "height": 25
                });
            }
        }, 100);

        // Removes visibility of squishy circle when hovering over links and buttons
        $(document).ready(function () {
            var circle = $(".cursor-circle");

            $(window)
            $(":is(a, button, .viewCursor")
                .mouseenter(function () {
                    circle.css({
                        "border-color": "transparent"
                    });
                })
                .mouseleave(function () {
                    circle.css({
                        "border-color": "var(--white-1)"
                    });
                });

            $(window)
                .mousedown(function () {
                    circle.css({
                        transform: "scale(0.5) translate(-27.5%, -70%)"
                    });
                })
                .mouseup(function () {
                    circle.css({
                        transform: "scale(1) translate(-50%, -50%)"
                    });
                });

        });

    };

    // Scroll

    function addScrollMovement() {
        var container = $('.scrollMovement');
        var items = container.find('.scrollMovement-item');
        var scrollAmount = 2;

        $(window).on('scroll', function () {
            var scrollDirection = $(this).scrollTop() > $(this).data('scroll-position') ? 'down' : 'up';
            $(this).data('scroll-position', $(this).scrollTop());

            items.each(function () {
                if (isItemVisible($(this))) {
                    var currentTop = parseInt($(this).css('top'));
                    if (scrollDirection === 'down') {
                        $(this).css('top', (currentTop + scrollAmount) + 'px');
                    } else {
                        $(this).css('top', (currentTop - scrollAmount) + 'px');
                    }
                }
            });
        });

        function isItemVisible(item) {
            var itemTop = item.offset().top;
            var itemBottom = itemTop + item.outerHeight();
            var containerTop = container.offset().top;
            var containerBottom = containerTop + container.outerHeight();
            return (itemTop >= containerTop && itemTop <= containerBottom) || (itemBottom >= containerTop && itemBottom <= containerBottom);
        }
    };

    function enableShiftContent() {

        var windowWidth = $(window).width(); // Get the initial window width

        $(window).on('resize', function () {
            windowWidth = $(window).width(); // Update the window width on resize
        });

        $(document).mousemove(function (event) {
            if (windowWidth >= 768) { // Check if the window width is 768px or wider
                var xPos = -(event.clientX / $(window).width()) * 10; // Adjust the sensitivity by changing the multiplier
                var yPos = -(event.clientY / $(window).height()) * 10;
                $('.shift-content').css('transform', 'translate(' + xPos + 'px, ' + yPos + 'px)');
            }
        });

    }

});
})(jQuery);