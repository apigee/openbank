var gulp = require('gulp');
var cucumber = require('gulp-cucumber');

gulp.task('test', function() {
    return gulp.src('features/*')
			.pipe(cucumber({
				'steps': ['features/step_definitions/env.js','features/step_definitions/apickli-gherkin.js','features/step_definitions/auth+consent.js','features/step_definitions/accounts.js'],
				'support': 'features/support/*.js',
				'format': 'pretty'
			}));
});
