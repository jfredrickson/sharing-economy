function isMobile() {
    // Determine if we're using the mobile layout based on the presence of the navigation menu.
    return !($('nav').is(':visible'));
}

function hideSpeakerBio(speakerListItem, speed) {
    speakerListItem.children('p').hide(speed);
    speakerListItem.find('.showhide a').html('Show Info');
    speakerListItem.attr('data-shown', 'false');
}

function showSpeakerBio(speakerListItem, speed) {
    speakerListItem.children('p').show(speed);
    speakerListItem.find('.showhide a').html('Hide Info');
    speakerListItem.attr('data-shown', 'true');
}

$(window).resize(function () {
    if (isMobile()) {
        // Restore previous show/hide state of speaker bios, if any
        $('.showhide a').each(function () {
            var speakerListItem = $(this).parent().parent();
            var itemVisible = (speakerListItem.attr('data-shown') === 'true');
            if (!itemVisible) {
                hideSpeakerBio(speakerListItem);
            } else {
                showSpeakerBio(speakerListItem);
            }
        });
    } else {
        // Show all speaker bios
        $('ul.speakers p').show();
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
        var speakerListItem = $(this).parent().parent();
        var itemVisible = (speakerListItem.attr('data-shown') === 'true');
        if (!itemVisible) {
            showSpeakerBio(speakerListItem, 150);
        } else {
            hideSpeakerBio(speakerListItem, 150);
        }
        event.preventDefault();
    });
});