context.setVariable('target.copy.pathsuffix', false);

var latitude = context.getVariable('latitude');
var longitude = context.getVariable('longitude');
var radius = context.getVariable('radius');

var pathSuffix = '';

try {
    if (latitude && longitude) {
        pathSuffix += '?latitude=' + latitude;
        pathSuffix += '&longitude=' + longitude;
    }

    if (radius) {
        pathSuffix += '&radius=' + radius;
    }
} catch (err) {
    console.log('Error occurred : ' + JSON.stringify(err));
} finally {
    context.setVariable('pathSuffix', pathSuffix);
}
