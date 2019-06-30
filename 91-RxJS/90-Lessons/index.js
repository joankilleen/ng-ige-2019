var jsLessons;
(function (jsLessons) {

    jsLessons.lessonFiles = [
        '01-Basics.js',
        '02-Observer.js',
        '03-Creation.js',
        '04-Subscription.js',
        '05-Transformation.js',
        '06-Combination.js',
        '07-HigherOrder.js',
        '08-Subject.js',
        '09-Unsubscribe.js',
        '10-ColdvsHot.js',
    ];

    jsLessons.start();


})(jsLessons || (jsLessons = {}));


_jsls_toBeDefined_original= getJasmineRequireObj().toBeDefined;
getJasmineRequireObj().toBeDefined = function() {
    function toBeDefined() {
        return {
            compare: function(actual) {
                return {
                    pass: actual != FILL_ME_IN && (void 0 !== actual)
                };
            }
        };
    }

    return toBeDefined;
};
