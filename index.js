"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = exports.mount = exports.createElement = exports.define = exports.Kwab = void 0;
var Kwab = /** @class */ (function () {
    function Kwab() {
        this.routes = [];
    }
    Kwab.getInstance = function () {
        if (!Kwab.instance)
            Kwab.instance = new Kwab();
        return Kwab.instance;
    };
    Kwab.prototype.appendRoute = function (path, component) {
        this.routes.push({ "path": path, "component": component });
    };
    Kwab.prototype.getView = function (path) {
        var component = this.routes.find(function (i) { return i["path"] == path; }).component;
        if (this.el)
            this.el.appendChild(document.createElement(component));
    };
    Kwab.prototype.mountPoint = function (el) {
        if (el instanceof HTMLElement) {
            this.el = el;
            this.getView("/");
        }
    };
    return Kwab;
}());
exports.Kwab = Kwab;
window.addEventListener("popstate", function (event) {
    alert("Hello");
    var instance = Kwab.getInstance();
    instance.getView(window.location.pathname);
});
function createElement(component, props, children) {
    var el = document.createElement(component);
    el = Object.assign(el, props);
    el.append.apply(el, children);
    return el;
}
exports.createElement = createElement;
function define(name, html) {
    var element = /** @class */ (function (_super) {
        __extends(element, _super);
        function element() {
            var _this = _super.call(this) || this;
            var shadowRoot = _this.attachShadow({ mode: "open" });
            var template = html();
            shadowRoot.appendChild(template.cloneNode(true));
            return _this;
        }
        return element;
    }(HTMLElement));
    customElements.define(name, element);
}
exports.define = define;
function mount(el) {
    alert("Hello");
    var instance = Kwab.getInstance();
    instance.mountPoint(el);
}
exports.mount = mount;
function route(pathname, component) {
    var instance = Kwab.getInstance();
    instance.appendRoute(pathname, component);
}
exports.route = route;
