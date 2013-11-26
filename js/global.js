function isMobile() {
    // Determine if we're using the mobile layout based on the presence of the navigation menu.
    return !($('nav').is(':visible'));
}

$(window).resize(function () {
    if (isMobile()) {
        // Hide all speaker bios
        $('ul.speakers p').hide();
        $('.showhide a').attr('data-shown', false);
    } else {
        // Show all speaker bios
        $('ul.speakers p').show();
        $('.showhide a').attr('data-shown', true);
    }
});

$(document).ready(function () {
    var sections = $('section');
    var navLinks = $('#topics-link, #speakers-link, #sponsors-link');

    sections.waypoint({
        handler: function (direction) {
            if (direction === 'up') {
                var currentSection = $(this);
                navLinks.removeClass('current-section');
                $('nav a#' + currentSection.attr('id') + '-link').addClass('current-section');
            }
        },
        offset: function () { return -($(this).height() / 2); }
    });

    sections.waypoint({
        handler: function (direction) {
            if (direction === 'down') {
                var currentSection = $(this);
                navLinks.removeClass('current-section');
                $('nav a#' + currentSection.attr('id') + '-link').addClass('current-section');
            }
        },
        offset: '200px'
    });

    $('#register-button').waypoint('sticky');

    navLinks.click(function (event) {
        var clickedLinkId = $(this).attr('id');
        var target = clickedLinkId.substr(0, clickedLinkId.length - 5);
        $('html, body').animate({
            scrollTop: $('#' + target).offset().top - 60
        }, 400);
        event.preventDefault();
    });

    $('.title a').click(function (event) {
        $('html, body').animate({
            scrollTop: 0
        }, 400);
        event.preventDefault();
    });

    $('.showhide a').click(function (event) {
        var itemVisible = ($(this).attr('data-shown') === 'true');
        if (!itemVisible) {
            $(this).parent().parent().children('p').show(150);
            $(this).html('Hide Info');
            $(this).attr('data-shown', true);
        } else {
            $(this).parent().parent().children('p').hide(150);
            $(this).html('Show Info');
            $(this).attr('data-shown', false);
        }
        event.preventDefault();
    });
});