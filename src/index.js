/**
 * cooolie-render-css
 * @author ydr.me
 * @create 2018-12-04 19:41:41
 * @update 2018-12-04 19:41:41
 */


'use strict';


var object = require('blear.utils.object');
var string = require('blear.utils.string')

var defaults = {
    /**
     * 是否删除注释
     * @type Boolean
     */
    removeComments: true,

    /**
     * 嵌套风格
     * 1 = 压缩，全部合为一行
     * 2 = 按规则一行
     * 3 = 按规则换行
     * @type Number
     */
    nestedStyle: 1,

    /**
     * 缩进数值，仅在嵌套规则为 2、3 时有效
     * @type Number
     */
    tabSize: 4,

    /**
     * 处理样式规则
     * @param style
     * @returns {*}
     */
    processStyle: function (style) {
        return style;
    },

    /**
     * 处理样式规则
     * @param rule
     * @param style
     * @returns {*}
     */
    processRule: function (rule, style) {
        return rule;
    }
};

module.exports = function (ast, options) {
    options = object.assign({}, defaults, options);

    var beautySpace = options.nestedStyle === 3 ? ' ' : '';
    var blockWrap = string.repeat('\n', options.nestedStyle - 1);
    var ruleWrap = options.nestedStyle === 3 ? '\n' : '';
    var atWrap = options.nestedStyle > 1 ? '\n' : '';
    var traveler = function (styles, indents) {
        var list = [];
        var indent = options.nestedStyle > 1
            ? string.repeat(' ', indents * options.tabSize)
            : '';
        styles.forEach(function (style) {
            switch (style.type) {
                case 'at':
                    list.push(renderAt(style, indent, indents));
                    break;

                case 'comment':
                    if (!options.removeComments) {
                        list.push(renderComment(style, indent));
                    }
                    break;

                case 'style':
                    list.push(renderStyle(style, indent));
                    break;
            }
        });
        return list.join(blockWrap);
    };
    var renderAt = function (node, indents) {
        indents++;
        var before = '@' + node.name + ' ' + node.value.join(' ');

        if (!node.styles) {
            return before + ';'
        }

        return [
            before + beautySpace + '{',
            traveler(node.styles, indents),
            '}'
        ].join(atWrap);
    };
    var renderComment = function (node, indent) {
        return indent + '/*' + node.value + '*/';
    };
    var renderStyle = function (node, indent) {
        var before = indent + node.selector + beautySpace + '{';
        var list = [''];
        var ruleIndent = options.nestedStyle === 3
            ? indent + string.repeat(' ', options.tabSize)
            : '';
        var endIndent = options.nestedStyle === 3
            ? indent
            : '';
        node.rules.forEach(function (rule) {
            var main = rule.prop + ':' + beautySpace + rule.value.join(' ') + ';';
            list.push(ruleIndent + main);
        });
        list.push('');
        var after = endIndent + '}';
        return before + list.join(ruleWrap) + after;
    };

    return traveler(ast, 0) + '\n';
};

