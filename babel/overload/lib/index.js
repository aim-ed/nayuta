'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types;

  return {
    visitor: {
      BinaryExpression: function BinaryExpression(path) {
        if (path.node.hasOwnProperty('_fromTemplate')) return;

        var func = invokedTemplate(path.node.operator)({
          LEFT_ARG: path.scope.generateUidIdentifier("left"),
          RIGHT_ARG: path.scope.generateUidIdentifier("right")
        }).expression;

        path.replaceWith(t.callExpression(func, [path.node.left, path.node.right]));
      }
    }
  };
};

var _babelTemplate = require('babel-template');

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function invokedTemplate(op) {
  return (0, _babelTemplate2.default)('\n      (function (LEFT_ARG, RIGHT_ARG) { \n        if (LEFT_ARG !== null && LEFT_ARG !== undefined && LEFT_ARG[Symbol.for("' + op + '")]) return LEFT_ARG[Symbol.for("' + op + '")](RIGHT_ARG)\n        else return LEFT_ARG ' + op + ' RIGHT_ARG\n      })\n  ');
}