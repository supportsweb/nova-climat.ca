$(document).ready(function () {


    /* ======================================================
       BREAKPOINT BOOTSTRAP
    ====================================================== */

    const desktopBreakpoint = 992;


    /* ======================================================
       DROPDOWNS
    ====================================================== */

    $('.dropdown-toggle-button').on('click', function (e) {

        e.preventDefault();
        e.stopPropagation();


        const $button = $(this);
        const $dropdown = $button.closest('.custom-dropdown');


        /*
        Fermer les autres dropdowns
        */

        $('.custom-dropdown')
            .not($dropdown)
            .removeClass('open')
            .find('.dropdown-toggle-button')
            .attr('aria-expanded', 'false');


        /*
        Ouvrir / fermer celui sélectionné
        */

        $dropdown.toggleClass('open');


        const isOpen =
            $dropdown.hasClass('open');


        $button.attr(
            'aria-expanded',
            isOpen ? 'true' : 'false'
        );

    });



    /* ======================================================
       DESKTOP : HOVER
    ====================================================== */

    $('.custom-dropdown').on(
        'mouseenter',
        function () {

            if (
                window.innerWidth >=
                desktopBreakpoint
            ) {

                $(this)
                    .addClass('open')
                    .find('.dropdown-toggle-button')
                    .attr('aria-expanded', 'true');

            }

        }
    );


    $('.custom-dropdown').on(
        'mouseleave',
        function () {

            if (
                window.innerWidth >=
                desktopBreakpoint
            ) {

                $(this)
                    .removeClass('open')
                    .find('.dropdown-toggle-button')
                    .attr('aria-expanded', 'false');

            }

        }
    );



    /* ======================================================
       CLIC À L'EXTÉRIEUR
    ====================================================== */

    $(document).on('click', function (e) {

        if (
            !$(e.target)
                .closest('.custom-dropdown')
                .length
        ) {

            $('.custom-dropdown')
                .removeClass('open')
                .find('.dropdown-toggle-button')
                .attr('aria-expanded', 'false');

        }

    });



    /* ======================================================
       MOBILE :
       fermer le navbar après clic sur un lien
    ====================================================== */

    $('#mainNavbar a').on(
        'click',
        function () {

            if (
                window.innerWidth <
                desktopBreakpoint
            ) {

                const navbarElement =
                    document.getElementById(
                        'mainNavbar'
                    );


                const navbarCollapse =
                    bootstrap.Collapse.getInstance(
                        navbarElement
                    );


                /*
                On ne ferme pas automatiquement
                le menu pour un lien fictif "#"
                comme EN pour le moment.
                */

                if (
                    $(this).attr('href') !== '#'
                ) {

                    if (navbarCollapse) {

                        navbarCollapse.hide();

                    }

                }

            }

        }
    );



    /* ======================================================
       RESET AU CHANGEMENT DE TAILLE
    ====================================================== */

    let previousWidth =
        window.innerWidth;


    $(window).on(
        'resize',
        function () {

            const currentWidth =
                window.innerWidth;


            /*
            On ne reset que lorsqu'on traverse
            réellement le breakpoint Bootstrap.
            */

            const crossedBreakpoint =

                (
                    previousWidth <
                    desktopBreakpoint
                    &&
                    currentWidth >=
                    desktopBreakpoint
                )

                ||

                (
                    previousWidth >=
                    desktopBreakpoint
                    &&
                    currentWidth <
                    desktopBreakpoint
                );


            if (crossedBreakpoint) {

                $('.custom-dropdown')
                    .removeClass('open')
                    .find('.dropdown-toggle-button')
                    .attr(
                        'aria-expanded',
                        'false'
                    );

            }


            previousWidth =
                currentWidth;

        }
    );

});

/* ==========================================================
   BACK TO TOP + PROGRESSION
========================================================== */

$(document).ready(function () {

    const $backToTop =
        $('#backToTop');


    function updateBackToTop() {

        const scrollTop =
            $(window).scrollTop();


        const documentHeight =
            $(document).height();


        const windowHeight =
            $(window).height();


        const scrollableHeight =
            documentHeight - windowHeight;


        let progress =
            0;


        if (scrollableHeight > 0) {

            progress =
                scrollTop / scrollableHeight;

        }


        /*
        Limiter entre 0 et 1
        */

        progress =
            Math.max(
                0,
                Math.min(
                    1,
                    progress
                )
            );


        /*
        Mise à jour de la progression SVG
        */

        $backToTop
            .get(0)
            .style
            .setProperty(
                '--progress',
                progress
            );


        /*
        Affichage après 350 px de scroll
        */

        if (scrollTop > 350) {

            $backToTop
                .addClass(
                    'is-visible'
                );

        } else {

            $backToTop
                .removeClass(
                    'is-visible'
                );

        }

    }


    /*
    Scroll
    */

    $(window).on(
        'scroll',
        updateBackToTop
    );


    /*
    Resize
    */

    $(window).on(
        'resize',
        updateBackToTop
    );


    /*
    Clic retour en haut
    */

    $backToTop.on(
        'click',
        function () {

            $('html, body')
                .stop()
                .animate(
                    {
                        scrollTop: 0
                    },
                    650,
                    'swing'
                );

        }
    );


    /*
    Initialisation
    */

    updateBackToTop();

});


/* ==========================================================
   HERO ÉTÉ / HIVER
========================================================== */

$(function () {

    const $slider = $('#homeSeasonSlider');
    const $winter = $('#homeSeasonWinter');
    const $divider = $('#homeSeasonDivider');

    if (!$slider.length || !$winter.length || !$divider.length) {
        return;
    }

    let isDragging = false;


    /* ======================================================
       POSITION
    ====================================================== */

    function setSeasonPosition(clientX) {

        const rect = $slider[0].getBoundingClientRect();

        let position =
            ((clientX - rect.left) / rect.width) * 100;

        position = Math.max(5, Math.min(95, position));

        $winter.css('width', position + '%');
        $divider.css('left', position + '%');

        $divider.attr(
            'aria-valuenow',
            Math.round(position)
        );

    }


    /* ======================================================
       SOURIS
    ====================================================== */

    $slider.on('mousedown', function (e) {

        if ($(e.target).closest('.home-hero-content').length) {
            return;
        }

        isDragging = true;

        setSeasonPosition(e.clientX);

    });


    $(document).on('mousemove', function (e) {

        if (!isDragging) {
            return;
        }

        setSeasonPosition(e.clientX);

    });


    $(document).on('mouseup', function () {

        isDragging = false;

    });


    /* ======================================================
       TOUCH
    ====================================================== */

    $slider.on('touchstart', function (e) {

        if ($(e.target).closest('.home-hero-content').length) {
            return;
        }

        const touch = e.originalEvent.touches[0];

        if (!touch) {
            return;
        }

        isDragging = true;

        setSeasonPosition(touch.clientX);

    });


    $slider.on('touchmove', function (e) {

        if (!isDragging) {
            return;
        }

        const touch = e.originalEvent.touches[0];

        if (!touch) {
            return;
        }

        setSeasonPosition(touch.clientX);

    });


    $slider.on('touchend touchcancel', function () {

        isDragging = false;

    });


    /* ======================================================
       CLAVIER
    ====================================================== */

    $divider.on('keydown', function (e) {

        let value =
            parseInt($divider.attr('aria-valuenow'), 10) || 50;

        if (e.key === 'ArrowLeft') {

            e.preventDefault();

            value = Math.max(5, value - 5);

        }

        else if (e.key === 'ArrowRight') {

            e.preventDefault();

            value = Math.min(95, value + 5);

        }

        else {

            return;

        }

        $winter.css('width', value + '%');
        $divider.css('left', value + '%');

        $divider.attr(
            'aria-valuenow',
            value
        );

    });

});