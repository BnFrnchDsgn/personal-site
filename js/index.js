(function ($) {
    $(document).ready(function () {

        ///////////////////
        ////
        //// Function Index
        ////
        ///////////////////

        // Cursor Interactions
        gradientBorder(); // Modifies linear-gradient direction based on cursor location
        cursorCircle(); // Adds a circle element to follow cursor that interacts with select elements
        cursorShift(); // Adds slight movement to elements based on cusror location
        cursor3D(); // Adds slight 3D effect based on cursor location
        cursorPreview(); // Adjusts cursor to feature a preview on hover

        // Scroll Effects
        scrollEaseIn(); // Reveals content on scroll or page-load
        timelineEase(); // Adds a ease scroll effect for the timeline parts on click

        // Header
        enableMobileMenu(); // Enables click-to-toggle functionality for displaying the mobile menu


        ///////////////////
        ////
        //// Function List
        ////
        //////////////////
        ////

        function gradientBorder() {
            $(document).on('mousemove', function (e) {
                $('.gradientBorder').each(function () {
                    const offset = $(this).offset();
                    const width = $(this).outerWidth();
                    const height = $(this).outerHeight();
                    const centerX = offset.left + width / 2;
                    const centerY = offset.top + height / 2;
                    const x = e.pageX - centerX;
                    const y = e.pageY - centerY;
                    const angle = Math.atan2(y, x) * (180 / Math.PI);
        
                    // Normalize angle to 0-360
                    const normalizedAngle = (angle + 360) % 360;
        
                    const gradient = `linear-gradient(${normalizedAngle}deg, rgba(229,229,229,1) 0%, rgba(169,167,167,1) 20%, rgba(255,255,255,1) 50%, rgba(169,167,167,1) 80%, rgba(229,229,229,1) 100%)`;
        
                    $(this).css('--metal-gradient-linear', gradient);
                });
            });
        }

        function cursorCircle() {
            const $circle = $('<div class="cursorCircle"></div>');
            $('body').append($circle);

            let isFilling = false;

            $(document).on('mousemove', function (e) {
                const mouseX = e.pageX;
                const mouseY = e.pageY;

                if (!isFilling) {
                    $circle.css({
                        left: mouseX + 'px',
                        top: mouseY + 'px',
                        width: '2rem',
                        height: '2rem',
                        borderRadius: '50%',
                        transform: 'translate(-75%, -75%)'
                    });
                }

                let filled = false;

                $('.cursorFill').each(function () {
                    const $el = $(this);
                    const offset = $el.offset();
                    const width = $el.outerWidth();
                    const height = $el.outerHeight();

                    const left = offset.left;
                    const right = offset.left + width;
                    const top = offset.top;
                    const bottom = offset.top + height;

                    if (mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bottom) {
                        const borderRadius = $el.css('border-radius');

                        filled = true;
                        if (!isFilling) {
                            isFilling = true;
                            $circle.addClass('is-filling');
                        }

                        $('.cursorFill').removeClass('is-filling'); // Remove from all
                        $el.addClass('is-filling');

                        $circle.css({
                            left: offset.left + width / 2 + 'px',
                            top: offset.top + height / 2 + 'px',
                            width: width + 'px',
                            height: height + 'px',
                            borderRadius: borderRadius,
                            transform: 'translate(-50%, -50%)'
                        });
                        return false; // break loop
                    }
                });

                if (!filled && isFilling) {
                    isFilling = false;
                    $circle.removeClass('is-filling');
                    $('.cursorFill').removeClass('is-filling');
                }

                // NEW: Check for cursorHighlight elements
                let isHighlighting = false;
                $('.cursorHighlight').each(function () {
                    const $el = $(this);
                    const offset = $el.offset();
                    const width = $el.outerWidth();
                    const height = $el.outerHeight();

                    const left = offset.left;
                    const right = offset.left + width;
                    const top = offset.top;
                    const bottom = offset.top + height;

                    if (mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bottom) {
                        isHighlighting = true;
                        return false; // break loop early
                    }
                });

                if (isHighlighting) {
                    $circle.addClass('is-highlighting');
                } else {
                    $circle.removeClass('is-highlighting');
                }
            });
        }

        function cursorShift() {
            const sensitivity = 0.02;
            const $shiftContainers = $('.cursorShift, .cursorShiftInverse');

            $(document).on('mousemove', function(e) {
                const winW = $(window).width();
                const winH = $(window).height();
                const offsetX = (e.pageX - winW / 3) * sensitivity;
                const offsetY = (e.pageY - winH / 3) * sensitivity;

                $shiftContainers.each(function() {
                    const $el = $(this);
                    const isInverse = $el.hasClass('cursorShiftInverse');
                    const x = isInverse ? -offsetX : offsetX;
                    const y = isInverse ? -offsetY : offsetY;

                    $el.css('transform', `translate(${x}px, ${y}px)`);
                });
            });
        }

        function cursor3D() {
            
        $('.cursor3D').each(function () {
            const $el = $(this);

            $el.on('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation (subtle)
            const rotateX = ((y - centerY) / centerY) * -15; // up/down tilt
            const rotateY = ((x - centerX) / centerX) * 15;  // left/right tilt

            $el.css('transform', `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
            });

            $el.on('mouseleave', function () {
            $el.css('transform', 'rotateX(0deg) rotateY(0deg)');
            });
        });

        }

        function cursorPreview() {
            $(document).on('mouseenter', '.cursorPreview', function () {
                const $circle = $('.cursorCircle');
                const previewImage = $(this).data('preview');

                if (previewImage) {
                    $circle.css({
                        width: '4rem',
                        height: '4rem',
                        backgroundImage: `url(${previewImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }).addClass('is-previewing');
                }
            });

            $(document).on('mouseleave', '.cursorPreview', function () {
                const $circle = $('.cursorCircle');
                $circle.css({
                    width: '2rem',
                    height: '2rem',
                    backgroundImage: '',
                    backgroundSize: '',
                    backgroundPosition: '',
                    backgroundRepeat: ''
                }).removeClass('is-previewing');
            });
        }

        function scrollEaseIn() {

            function checkVisibility() {
                $('.scrollEaseIn').each(function () {
                const $el = $(this);
                const rect = this.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

                if (isVisible && !$el.hasClass('visible')) {
                    $el.addClass('visible');

                    // Remove scrollEaseIn class after 3s
                    setTimeout(() => {
                    $el.removeClass('scrollEaseIn');
                    }, 1500);
                }
                });
            }

            $(window).on('scroll resize load', checkVisibility);
            checkVisibility();

        }

        function timelineEase() {

            $('.entryTimeline').on('click', '.cursorFill, .current', function () {
                const targetId = $(this).data('target');
                const $target = $('#' + targetId);
                
                if ($target.length) {
                    window.scrollTo({
                        top: $target.offset().top - 50,
                        behavior: 'smooth'
                    });
                }
            });

        }
        
        function enableMobileMenu() {

        $('.menuControl button').on('click', function () {
            const $button = $(this);
            const $menu = $('.menuList');

            $button.toggleClass('closed open');           // Toggle button state
            $menu.toggleClass('hidden visible');          // Toggle menu visibility

            const isMenuOpen = $button.hasClass('open') && $menu.hasClass('visible');

            if (isMenuOpen) {
            $('body').css('overflow', 'hidden');
            } else {
            $('body').css('overflow', '');
            }
        });

        }

    });
})(jQuery);