/**
 * mocha 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var expect = require('chai-jasmine').expect;
var render = require('../src/index.js');
var fs = require('fs');
var path = require('path');

describe('@media', function () {
    var ast = [{
        type: 'at',
        name: 'media',
        value: ['x', 'and', 'y'],
        styles: [{
            type: 'style',
            selector: 'a',
            rules: [{
                prop: 'b',
                value: ['c', 'd']
            }, {
                prop: 'e',
                value: ['f']
            }]
        }, {
            type: 'style',
            selector: 'g',
            rules: [{
                prop: 'h',
                value: ['i', 'j']
            }, {
                prop: 'k',
                value: ['l']
            }]
        }]
    }, {
        type: 'at',
        name: 'media',
        value: ['x', 'and', 'y'],
        styles: [{
            type: 'style',
            selector: 'a',
            rules: [{
                prop: 'b',
                value: ['c', 'd']
            }, {
                prop: 'e',
                value: ['f']
            }]
        }, {
            type: 'style',
            selector: 'g',
            rules: [{
                prop: 'h',
                value: ['i', 'j']
            }, {
                prop: 'k',
                value: ['l']
            }]
        }]
    }];

    it('1', function () {
        var css = render(ast, {
            nestedStyle: 1
        });

        console.log(css);
        expect(css).toEqual('@media x and y{a{b:c d;e:f;}g{h:i j;k:l;}}@media x and y{a{b:c d;e:f;}g{h:i j;k:l;}}\n');
    });

    it('2', function () {
        var css = render(ast, {
            nestedStyle: 2
        });

        console.log(css);
        expect(css).toEqual(
            '@media x and y{\n' +
            '    a{b:c d;e:f;}\n' +
            '    g{h:i j;k:l;}\n' +
            '}\n' +
            '@media x and y{\n' +
            '    a{b:c d;e:f;}\n' +
            '    g{h:i j;k:l;}\n' +
            '}\n'
        );
    });

    it('3', function () {
        var css = render(ast, {
            nestedStyle: 3
        });

        console.log(css);
        expect(css).toEqual(
            '@media x and y {\n' +
            '    a {\n' +
            '        b: c d;\n' +
            '        e: f;\n' +
            '    }\n' +
            '\n' +
            '    g {\n' +
            '        h: i j;\n' +
            '        k: l;\n' +
            '    }\n' +
            '}\n' +
            '\n' +
            '@media x and y {\n' +
            '    a {\n' +
            '        b: c d;\n' +
            '        e: f;\n' +
            '    }\n' +
            '\n' +
            '    g {\n' +
            '        h: i j;\n' +
            '        k: l;\n' +
            '    }\n' +
            '}\n'
        );
    });
});

