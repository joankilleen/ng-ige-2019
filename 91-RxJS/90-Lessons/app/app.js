var jsLessons;
(function (jsLessons) {
    // do not use 'strict mode', since it propagates into 'eval' so exercises cant demonstrate non-stric mode


    var JSLS_STATE = 'JSLS_CURRENT_STATE';

    var state;
    var currentFile;
    var executeES6;
    var showSuccess;

    jsLessons.start = function () {

        jsLessons.lessonFiles.forEach(function (fileName) {
            $('#lesson-select').append($('<option></option>').attr('value', fileName).text(fileName));
        });

        state = loadState();
        currentFile = state.file;
        executeES6 = state.es6;
        showSuccess = state.showSuccess;

        var promises = [];
        promises.push(fetchLessons());

        promises.push(fetch('./app/tmpl/topic.hbs')
            .then(handleFetchResponse)
            .then(function (text) {
                window.topicTemplate = Handlebars.compile(text);
            })
        );

        promises.push(fetch('./app/tmpl/lesson.hbs')
            .then(handleFetchResponse)
            .then(function (text) {
                Handlebars.registerPartial('lesson', text);
            })
        );

        promises.push(fetch('./app/tmpl/goal.hbs')
            .then(handleFetchResponse)
            .then(function (text) {
                Handlebars.registerPartial('goal', text);
            })
        );

        Promise.all(promises)
            .then(function (data) {

                var lessonText = data[0];
                evaluateLessons(lessonText);
            })
            .catch(reset);

    };

    function fetchLessons() {
        return fetch(currentFile)
            .then(handleFetchResponse);
    }

    function evaluateLessons(lessonsText) {

        window.jasmine = jasmineRequire.core(jasmineRequire);
        jasmineRequire.html(jasmine);
        var env = jasmine.getEnv();
        var jasmineInterface = jasmineRequire.interface(jasmine, env);
        extend(window, jasmineInterface);

        // Expose global variables for the lessons
        // window.FILL_ME_IN = undefined;
        window.FILL_ME_IN = 'Fill this value in';
        window.lesson = describe;
        window.learn = it;

        try {
            var es5Code;
            var positionReporter;
            if (executeES6) {
                var transform = Babel.transform(lessonsText, {
                    presets: ['es2015', 'react', 'stage-0'],
                    sourceMaps: true
                });
                es5Code = transform.code;

                var sourceMapConsumer = new sourceMap.SourceMapConsumer(transform.map);
                positionReporter = {originalPositionFor: sourceMapConsumer.originalPositionFor.bind(sourceMapConsumer)};
            }
            else {
                es5Code = lessonsText;
                positionReporter = {
                    originalPositionFor: function (pos) {
                        return pos;
                    }
                };
            }
            eval(es5Code);
            jasmine.getEnv().addReporter(jsLessons.CreateLessonReporter(currentFile, positionReporter, showSuccess));
            jasmine.getEnv().execute();
        }
        catch (e) {

            var $content = $('#content');
            $content.html('');

            $content.append($("<div/>").text("Your file contains an error: " + currentFile));
            $content.append($("<pre/>").text(e.toString().replace('unknown', currentFile)));

            console.log(e);
        }
    }


    $('#reset-button').on('click', function () {
        reset();
        window.location.reload();
    });

    $('#lesson-select').on('change', function () {
        console.log("File selected: " + this.value);
        currentFile = this.value;
        storeState();
        fetchLessons()
            .then(evaluateLessons);
    });

    $('#show-success-checkbox').on('change', function () {
        storeState();
        showSuccess = this.checked;
        fetchLessons()
            .then(evaluateLessons);
    });

    $('#es6-checkbox').on('change', function () {
        storeState();
        executeES6 = this.checked;
        fetchLessons()
            .then(evaluateLessons);
    });

    $('#refresh-checkbox').on('change', function () {
        storeState();
        if (this.checked) {
            enableAutoRefresh();
        }
        else {
            disableAutoRefresh();
        }
    });


    function loadState() {
        try {
            var state = JSON.parse(localStorage.getItem(JSLS_STATE));
            state = state || {};
            state.file = state.file || jsLessons.lessonFiles[0];
            state.showSuccess = state.showSuccess === undefined ? true : state.showSuccess;
            state.es6 = state.es6 || false;
            state.autoRefresh = state.autoRefresh || false;

            if (state.autoRefresh) enableAutoRefresh();
            else disableAutoRefresh();

            $('#lesson-select').val(state.file);
            $('#show-success-checkbox').prop('checked', state.showSuccess);
            $('#es6-checkbox').prop('checked', state.es6);
            $('#refresh-checkbox').prop('checked', state.autoRefresh);

            return state;
        }
        catch (error) {
            console.log('Loading state failed: ' + error);
            throw error;
        }
    }

    function storeState() {

        var state = {
            file: $('#lesson-select').val(),
            showSuccess: $('#show-success-checkbox').prop('checked'),
            es6: $('#es6-checkbox').prop('checked'),
            autoRefresh: $('#refresh-checkbox').prop('checked')
        };

        localStorage.setItem(JSLS_STATE, JSON.stringify(state));
    }

    function extend(destination, source) {
        for (var property in source) destination[property] = source[property];
        return destination;
    }

    var refreshIntervalId;

    function enableAutoRefresh() {
        disableAutoRefresh();
        refreshIntervalId = setInterval(function () {
            var p = fetchLessons()
                .then(evaluateLessons);
        }, 3000);
    }

    function disableAutoRefresh() {
        if (refreshIntervalId) clearInterval(refreshIntervalId);
    }

    function handleFetchResponse(response) {
        if (response.status === 200) {
            return response.text();
        }
        else {
            var msg = 'Loading file failed: ' + currentFile;
            console.log(msg);
            reset();
            return Promise.reject(msg);
        }
    }

    function reset() {
        disableAutoRefresh();
        localStorage.removeItem(JSLS_STATE);
    }
}(jsLessons || (jsLessons = {} )));
