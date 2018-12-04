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

describe('单级嵌套风格', function () {
    var ast = [{
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
    }];

    it('1', function () {
        var css = render(ast, {
            nestedStyle: 1
        });

        console.log(css);
        expect(css).toEqual('a{b:c d;e:f;}g{h:i j;k:l;}\n');
    });

    it('2', function () {
        var css = render(ast, {
            nestedStyle: 2
        });

        console.log(css);
        expect(css).toEqual('a{b:c d;e:f;}\ng{h:i j;k:l;}\n');
    });

    it('3', function () {
        var css = render(ast, {
            nestedStyle: 3
        });

        console.log(css);
        expect(css).toEqual(
            'a {\n' +
            '    b: c d;\n' +
            '    e: f;\n' +
            '}\n' +
            '\n' +
            'g {\n' +
            '    h: i j;\n' +
            '    k: l;\n' +
            '}\n'
        );
    });
});

