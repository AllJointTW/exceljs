"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var CompositeXform = require('../../composite-xform');
var CfRuleExtXform = require('./cf-rule-ext-xform');
var ConditionalFormattingExtXform = require('./conditional-formatting-ext-xform');
var ConditionalFormattingsExtXform = /*#__PURE__*/function (_CompositeXform) {
  _inherits(ConditionalFormattingsExtXform, _CompositeXform);
  var _super = _createSuper(ConditionalFormattingsExtXform);
  function ConditionalFormattingsExtXform() {
    var _this;
    _classCallCheck(this, ConditionalFormattingsExtXform);
    _this = _super.call(this);
    _this.map = {
      'x14:conditionalFormatting': _this.cfXform = new ConditionalFormattingExtXform()
    };
    return _this;
  }
  _createClass(ConditionalFormattingsExtXform, [{
    key: "tag",
    get: function get() {
      return 'x14:conditionalFormattings';
    }
  }, {
    key: "hasContent",
    value: function hasContent(model) {
      if (model.hasExtContent === undefined) {
        model.hasExtContent = model.some(function (cf) {
          return cf.rules.some(CfRuleExtXform.isExt);
        });
      }
      return model.hasExtContent;
    }
  }, {
    key: "prepare",
    value: function prepare(model, options) {
      var _this2 = this;
      model.forEach(function (cf) {
        _this2.cfXform.prepare(cf, options);
      });
    }
  }, {
    key: "render",
    value: function render(xmlStream, model) {
      var _this3 = this;
      if (this.hasContent(model)) {
        xmlStream.openNode(this.tag);
        model.forEach(function (cf) {
          return _this3.cfXform.render(xmlStream, cf);
        });
        xmlStream.closeNode();
      }
    }
  }, {
    key: "createNewModel",
    value: function createNewModel() {
      return [];
    }
  }, {
    key: "onParserClose",
    value: function onParserClose(name, parser) {
      // model is array of conditional formatting objects
      this.model.push(parser.model);
    }
  }]);
  return ConditionalFormattingsExtXform;
}(CompositeXform);
module.exports = ConditionalFormattingsExtXform;
//# sourceMappingURL=conditional-formattings-ext-xform.js.map
