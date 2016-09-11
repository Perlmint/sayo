/// <reference path="../typings/index.d.ts" />

import _ = require('lodash');

export var template = function(){
    var template_string: string = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="application-name" content="{{title}}">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="{{title}}">
    <meta name="mobile-web-app-capable" content="yes">
    <title>{{title}}</title>
    <script type="text/javascript">window.__INITIAL_STATE__={{initialstate}};</script>
    {{additionalHeader}}
  </head>
  <body>
    <div id="app">{{content}}</div>
    {{afterApp}}
  </body>
</html>`
    return (opt: any) => {
        var ret = template_string;
        _.map(opt, (val, key, obj) => {
            ret = ret.replace(new RegExp("{{" + key + "}}", 'g'), val.toString());
        });
        return ret;
    }
}();
