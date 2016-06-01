# fork from https://github.com/loonkwil/jquery.keep-ratio


# Keep Ratio

[![Build Status](https://travis-ci.org/loonkwil/jquery.keep-ratio.png)](https://travis-ci.org/loonkwil/jquery.keep-ratio)

A jQuery plugin for keeping the aspect ratio

Example usage: http://loonkwil.github.io/jquery.keep-ratio/

## Install

Requirements [Bower](https://github.com/bower/bower)

```bash
bower install keep-ratio --save
```

```html
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
</head>
<body>
  <div></div>

  <script src="bower_components/jquery/dist/jquery.min.js"></script>
  <!-- For older browsers (http://caniuse.com/#feat=requestanimationframe) -->
  <script src="bower_components/request-animation-frame/rAF.js"></script>
  <script src="bower_components/keep-ratio/dist/jquery.keep-ratio.min.js"></script>
  <script type="text/javascript">
    $(function() {
      $('div').keepRatio({ ratio: 4/3, calculate: 'width' });
      // add mode scale parent
      $('div').keepRatio({ ratio: 16/9, calculate: 'parent' });
      // add mode center to auto center dom element in parent dom, this dom must position:absolute float:left,and parent must position:relative
      $('div').keepRatio({ ratio: 16/9, calculate: 'center' });
    });
  </script>
</body>
```

## How to make your own build

Requirements: [NodeJs](http://nodejs.org), [Bower](http://bower.io),
[Gulp](http://gulpjs.com)

 1. `bower install`
 2. `npm install`
 3. `npm test`
 4. `gulp dist` or just `gulp`
