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

/* jshint strict: true */
/* jshint unused: true */
/* jshint bitwise: false */
/* jshint laxcomma: true */

/**
 * @file
 * token.js
 * Setup Token proto.
 *
 * @api public
 */

function Token() {
  'use strict';
  if (!(this instanceof Token)) return new Token();
  this.cl = 'abcdefghijklmnopqrstuvwxyz';
  this.cu = this.cl.toUpperCase();
  this.nu = '0123456789';
  this.sy = "!@#$%^&*+?";
  this.char = {
    'numeric': this.nu,
    'alpha': this.cl + this.cu,
    'alphanumeric': this.cl + this.cu + this.nu,
    'default': this.cl + this.cu + this.nu + this.sy
  };
}


/**
 * Check for the type to comprise of the
 * known types, that we can parse.
 * 
 * @param  {Object} options
 * @api private
 */

Token.prototype.checkopts = function(opts) {
  'use strict';
  if (Object.keys(this.char).indexOf(opts.type) === -1) {
    opts.type = 'default';
  }
};


/**
 * Get a Random number in the range
 * 
 * @param  {Number} max number to random
 * @return {Number}
 * @api private
 */

Token.prototype._rand = function(range) {
  'use strict';
  return~~ (Math.random() * range);
};


/**
 * Create a random character of the given type.
 *
 * Type:
 *
 *   - `numeric`      numbers
 *   - `alpha`        alphabets
 *   - `alphanumeric` chars + numbers
 *   - `default`      ++ symbols
 *
 * @return {String}
 * @api public
 */

Token.prototype.character = function(type) {
  'use strict';
  var buffer = this.char[type];
  return buffer.charAt(this._rand(buffer.length));
};


/**
 * Create a random string.
 *
 * Options:
 *
 *   - `length`  length of random
 *   - `type`    see above method
 *
 * @return {String}
 * @api public
 */

Token.prototype.random = function(opts) {
  'use strict';
  opts = opts || {};
  this.checkopts(opts);

  var text = '',
    length = opts.length || 8;

  length = length < 48 ? length : 48;
  for (var i = 0; i < length; i++) {
    text += this.character(opts.type);
  }
  return text;
};