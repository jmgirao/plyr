// ==========================================================================
// Plyr.io demo
// This code is purely for the plyr.io website
// Please see readme.md in the root or github.com/selz/plyr
// ==========================================================================

/*global plyr*/

// General functions
;(function() {
    //document.body.addEventListener('ready', function(event) { console.log(event); });

    // Setup the player
    var instances = plyr.setup({
        debug:              true,
        title:              'Video demo',
        iconUrl:            '../dist/plyr.svg',
        tooltips: {
            controls:       true
        },
        captions: {
            defaultActive:  true
        }
    });
    plyr.loadSprite('dist/demo.svg');

    // Plyr returns an array regardless
    var player = instances[0];

    // Setup type toggle
    var buttons = document.querySelectorAll('[data-source]'),
        types = {
            video:      'video',
            audio:      'audio',
            youtube:    'youtube',
            vimeo:      'vimeo'
        },
        currentType = window.location.hash.replace('#', ''),
        historySupport = (window.history && window.history.pushState);


    newSource(types.video, true);

    //// Bind to each button
    //for (var i = buttons.length - 1; i >= 0; i--) {
    //    buttons[i].addEventListener('click', function() {
    //        var type = this.getAttribute('data-source');
    //
    //        newSource(type);
    //
    //        if (historySupport) {
    //            history.pushState({ 'type': type }, '', '#' + type);
    //        }
    //    });
    //}

    //// List for backwards/forwards
    //window.addEventListener('popstate', function(event) {
    //    if(event.state && 'type' in event.state) {
    //        newSource(event.state.type);
    //    }
    //});

    // On load
    if(historySupport) {
        var video = !currentType.length;

        // If there's no current type set, assume video
        if(video) {
            currentType = types.video;
        }

        // Replace current history state
        if(currentType in types) {
            history.replaceState({ 'type': currentType }, '', (video ? '' : '#' + currentType));
        }

        // If it's not video, load the source
        if(currentType !== types.video) {
            newSource(currentType, true);
        }
    }

    // Toggle class on an element
    function toggleClass(element, className, state) {
        if (element) {
            if (element.classList) {
                element.classList[state ? 'add' : 'remove'](className);
            }
            else {
                var name = (' ' + element.className + ' ').replace(/\s+/g, ' ').replace(' ' + className + ' ', '');
                element.className = name + (state ? ' ' + className : '');
            }
        }
    }

    // Set a new source
    function newSource(type, init) {
        // Bail if new type isn't known, it's the current type, or current type is empty (video is default) and new type is video
        if(!(type in types) || (!init && type === currentType) || (!currentType.length && type === types.video)) {
            return;
        }

        switch(type) {
            case types.video:
                player.source({
                    type:       'video',
                    title:      'View From A Blue Moon',
                    sources: [{
                        src:    'https://cdn.selz.com/plyr/1.5/View_From_A_Blue_Moon_Trailer-HD.mp4',
                        type:   'video/mp4'
                    },
                        {
                            src:    'https://cdn.selz.com/plyr/1.5/View_From_A_Blue_Moon_Trailer-HD.webm',
                            type:   'video/webm'
                        }],
                    poster:     'https://cdn.selz.com/plyr/1.5/View_From_A_Blue_Moon_Trailer-HD.jpg',
                    tracks:     [{
                        kind:   'captions',
                        label:  'French',
                        srclang:'fr',
                        src:    'https://player.vimeo.com/texttrack/4678937.vtt?token=1479919658_0xb926961547826118731b32faba4ce8c26dced01c',
                        default: true
                    }, {
                        kind:   'captions',
                        label:  'Spanish',
                        srclang:'es',
                        src:    'https://player.vimeo.com/texttrack/171.vtt?token=1479908430_0x78888488ee8a4848ad9890f8cada53d954cd2326'
                    }]
                });
                break;
        }

        // Set the current type for next time
        currentType = type;

        // Remove active classes
        for (var x = buttons.length - 1; x >= 0; x--) {
            toggleClass(buttons[x].parentElement, 'active', false);
        }

        // Set active on parent
        toggleClass(document.querySelector('[data-source="'+ type +'"]').parentElement, 'active', true);
    }
})();

// Google analytics
// For demo site (http://[www.]plyr.io) only
if(document.domain.indexOf('plyr.io') > -1) {
    (function(i,s,o,g,r,a,m){i.GoogleAnalyticsObject=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-40881672-11', 'auto');
    ga('send', 'pageview');
}
