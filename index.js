/* global hexo */
'use strict';

var pagination = require('hexo-pagination');

var types = hexo.config.types || [];

var list = {};

types.forEach(function (type) {
  list[type] = [];
}, this);

types.forEach(function (type) {
  hexo.extend.generator.register(type, build(type));
}, this);

var init = false;

function _init(locals, pages) {
  pages.forEach(function (page) {
    var layout = page.layout;
    if (list[layout]) {
      list[layout].push(page);
    }
  })
  init = true;
  types.forEach(function (type) {
    locals[type] = list[type];
  });
}

function build(type) {
  return function (locals) {
    if (!init) {
      _init(locals, locals.pages.sort('-date'));
    }
    var config = this.config;
    var perPage = config.per_page || 12;
    var paginationDir = config.pagination_dir || 'page';
    if (type == 'index') {
      var layout = ['index', 'archive'];
      var path = '';
    } else {
      var layout = [type + '_list', 'list', 'archive', 'index'];
      var path = type;
    }
    function generate(path, pages, options) {
      options = options || {};
      return pagination(path, pages, {
        perPage: perPage,
        layout: layout,
        format: paginationDir + '/%d/',
        data: options
      });
    }
    return generate(path, list[type]);
  };
}
