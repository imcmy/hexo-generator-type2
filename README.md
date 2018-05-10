# hexo-generator-type2 is a hexo plugin to generate pagination page for other page type

Fix [hexo-generator-type](https://www.npmjs.com/package/hexo-generator-type) bug.

## install plugin

```
npm install --save hexo-generator-type2
```

## config page type in _config.yml

```
types:
  - blog
  - theme
```

hen hexo load this plugin, it will auto register generator for `hexo.config.types` like this code below

```
hexo.extend.generator.register('blog', build('blog'));
hexo.extend.generator.register('theme', build('theme'));
```

more detail please read sourcecode, it's simple

## write page in the same layout

create `blog.swig` file in `layout` dir 

write anything you like in the template file

create page `blog/test.md` in `source` dir

the content as follow

```
---
title: test blog page
layout: blog
---
this is a blog test page
```

## hexo generate

run `hexo generate` and this plugin will create pagination for you auto.
