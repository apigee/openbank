/*
 Copyright 2017 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

var gulp = require('gulp');
var cucumber = require('gulp-cucumber');
var eslint = require('gulp-eslint');

require('edge-launchpad')(gulp);

gulp.task('lint', function() {
    return gulp.src(['./src/**/*.js', '!**/node_modules/**', '!**/target/**','!**/public/js/**', '!**/devportal/**', '!**/jsrsasign-all-min.js'])
        .pipe(eslint({
			fix: true
		}))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('test', function() {
    return gulp.src('test/features/*')
        .pipe(cucumber({
            'steps': ['test/features/step_definitions/env.js','test/features/step_definitions/apickli-gherkin.js','test/features/step_definitions/auth+consent.js','test/features/step_definitions/accounts.js','test/features/step_definitions/payments.js'],
            'support': 'test/features/support/*.js',
            'format': 'pretty'
        }));
});
