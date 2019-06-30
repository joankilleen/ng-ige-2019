var jsLessons;
(function (jsLessons) {
    'use strict';

     jsLessons.CreateLessonReporter = function(sourceFileName, sourceMapConsumer, showSuccess){


         var lessons = [];
         var currentSuite;

         return {
             jasmineStarted: jasmineStarted,
             suiteStarted: suiteStarted,
             specStarted: specStarted,
             specDone: specDone,
             suiteDone: suiteDone,
             jasmineDone: jasmineDone
         };

         function jasmineStarted(suiteInfo) {
             console.log('Running suite with ' + suiteInfo.totalSpecsDefined);
             console.log('Reporting via MyCustomReporter');
         }

         function suiteStarted(result) {

             console.log('Suite started: ' + result.description + ' whose full description is: ' + result.fullName);

             currentSuite = {
                 description: result.description,
                 goals: []
             };
         }

         function specStarted(result) {
             console.log('Spec started: ' + result.description + ' whose full description is: ' + result.fullName);
         }

         function specDone(result) {
             console.log('Spec: ' + result.description + ' was ' + result.status);

             for (var i = 0; i < result.failedExpectations.length; i++) {
                 console.log('Failure: ' + result.failedExpectations[i].message);
                 console.log(result.failedExpectations[i].stack);
             }
             console.log(result.passedExpectations.length);

             if (showSuccess || result.status !== 'passed') {
                 var goal = {
                     class: result.status === 'passed' ? 'success' : 'fail',
                     description: result.description,
                     sourceFileName: sourceFileName
                 };

                 if (result.failedExpectations.length > 0) {
                     goal.message = result.failedExpectations[0].message;

                     var lines = result.failedExpectations[0].stack.split('\n');

                     var line = lines.find(function (line) {
                         var foundChrome = line.indexOf('(eval at ') > 0;
                         var foundFirefox = line.indexOf('> eval:') > 0;
                         return foundChrome || foundFirefox;
                     });

                     if (line) {
                         var match = /<anonymous>:(\d+):(\d+)/.exec(line); // Chrome
                         match = match || /> eval:(\d+):(\d+)/.exec(line); // Firefox
                         if (match) {
                             var position = {
                                 line: parseInt(match[1]),
                                 column: parseInt(match[2])
                             };
                             var originalPosition = sourceMapConsumer.originalPositionFor(position);
                             goal.originalPosition = originalPosition;
                         }
                     }
                 }

                 currentSuite.goals.push(goal);
             }
         }

         function suiteDone(result) {

             if (currentSuite.goals.length > 0) {
                 lessons.push(currentSuite);
             }

             console.log('Suite: ' + result.description + ' was ' + result.status);
             for (var i = 0; i < result.failedExpectations.length; i++) {
                 console.log('AfterAll ' + result.failedExpectations[i].message);
                 console.log(result.failedExpectations[i].stack);
             }
         }

         function jasmineDone() {
             console.log('Finished suite');

             var suiteDiv = window.topicTemplate({ sourceFileName: sourceFileName.replace('.js',''), lessons: lessons});

             $('#content').html(suiteDiv);

         }
     };

}( jsLessons || (jsLessons = {}) ));
