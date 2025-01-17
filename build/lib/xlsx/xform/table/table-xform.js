"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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
var XmlStream = require('../../../utils/xml-stream');
var BaseXform = require('../base-xform');
var ListXform = require('../list-xform');
var AutoFilterXform = require('./auto-filter-xform');
var TableColumnXform = require('./table-column-xform');
var TableStyleInfoXform = require('./table-style-info-xform');
var undefinedOrResult = function undefinedOrResult(test, result) {
  return typeof test === 'undefined' ? undefined : result;
};
var TableXform = /*#__PURE__*/function (_BaseXform) {
  _inherits(TableXform, _BaseXform);
  var _super = _createSuper(TableXform);
  function TableXform() {
    var _this;
    _classCallCheck(this, TableXform);
    _this = _super.call(this);
    _this.map = {
      autoFilter: new AutoFilterXform(),
      tableColumns: new ListXform({
        tag: 'tableColumns',
        count: true,
        empty: true,
        childXform: new TableColumnXform()
      }),
      tableStyleInfo: new TableStyleInfoXform()
    };
    return _this;
  }
  _createClass(TableXform, [{
    key: "prepare",
    value: function prepare(model, options) {
      this.map.autoFilter.prepare(model);
      this.map.tableColumns.prepare(model.columns, options);
    }
  }, {
    key: "tag",
    get: function get() {
      return 'table';
    }
  }, {
    key: "render",
    value: function render(xmlStream, model) {
      xmlStream.openXml(XmlStream.StdDocAttributes);
      xmlStream.openNode(this.tag, _objectSpread(_objectSpread({}, TableXform.TABLE_ATTRIBUTES), {}, {
        id: model.id,
        name: model.name,
        displayName: model.displayName || model.name,
        ref: model.tableRef,
        totalsRowCount: undefinedOrResult(model.totalsRow, model.totalsRow ? '1' : '0'),
        // totalsRowShown: model.totalsRow ? undefined : '1',
        headerRowCount: undefinedOrResult(model.headerRow, model.headerRow ? '1' : '0')
      }));
      this.map.autoFilter.render(xmlStream, model);
      this.map.tableColumns.render(xmlStream, model.columns);
      this.map.tableStyleInfo.render(xmlStream, model.style);
      xmlStream.closeNode();
    }
  }, {
    key: "parseOpen",
    value: function parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      var name = node.name,
        attributes = node.attributes;
      switch (name) {
        case this.tag:
          this.reset();
          this.model = {
            name: attributes.name,
            displayName: attributes.displayName || attributes.name,
            tableRef: attributes.ref,
            totalsRow: undefinedOrResult(attributes.totalsRowCount, attributes.totalsRowCount === '1'),
            headerRow: undefinedOrResult(attributes.headerRowCount, attributes.headerRowCount === '1')
          };
          break;
        default:
          this.parser = this.map[node.name];
          if (this.parser) {
            this.parser.parseOpen(node);
          }
          break;
      }
      return true;
    }
  }, {
    key: "parseText",
    value: function parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
  }, {
    key: "parseClose",
    value: function parseClose(name) {
      var _this2 = this;
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.parser = undefined;
        }
        return true;
      }
      switch (name) {
        case this.tag:
          this.model.columns = this.map.tableColumns.model;
          if (this.map.autoFilter.model) {
            this.model.autoFilterRef = this.map.autoFilter.model.autoFilterRef;
            this.map.autoFilter.model.columns.forEach(function (column, index) {
              _this2.model.columns[index].filterButton = column.filterButton;
            });
          }
          this.model.style = this.map.tableStyleInfo.model;
          return false;
        default:
          // could be some unrecognised tags
          return true;
      }
    }
  }, {
    key: "reconcile",
    value: function reconcile(model, options) {
      // fetch the dfxs from styles
      model.columns.forEach(function (column) {
        if (column.dxfId !== undefined) {
          column.style = options.styles.getDxfStyle(column.dxfId);
        }
      });
    }
  }]);
  return TableXform;
}(BaseXform);
TableXform.TABLE_ATTRIBUTES = {
  xmlns: 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
  'xmlns:mc': 'http://schemas.openxmlformats.org/markup-compatibility/2006',
  'mc:Ignorable': 'xr xr3',
  'xmlns:xr': 'http://schemas.microsoft.com/office/spreadsheetml/2014/revision',
  'xmlns:xr3': 'http://schemas.microsoft.com/office/spreadsheetml/2016/revision3'
  // 'xr:uid': '{00000000-000C-0000-FFFF-FFFF00000000}',
};

module.exports = TableXform;
//# sourceMappingURL=table-xform.js.map
