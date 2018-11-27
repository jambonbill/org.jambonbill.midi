(function (document, navigator, standalone) {
    // prevents links from apps from oppening in mobile safari
    // this javascript must be the first script in your <head>
    if (window.matchMedia('(display-mode: standalone)').matches) {
        $('body').addClass("google-mobile-app");
        $('body').addClass("mobile-app");
    }

    if ((standalone in navigator) && navigator[standalone]) {
        $('body').addClass("apple-mobile-app");
        $('body').addClass("mobile-app");
    }
})(document, window.navigator, 'standalone');