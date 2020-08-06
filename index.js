"use strict";
exports.__esModule = true;
exports.createElement = exports.Kwab = void 0;
var Kwab = /** @class */ (function () {
    function Kwab(el) {
        this.el = el;
        this.routes = [];
    }
    Kwab.getInstance = function () {
        if (!Kwab.instance)
            throw Error("no instance found");
        return Kwab.instance;
    };
    Kwab.prototype.appendRoute = function (path, component) {
        this.routes.push({ "path": path, "component": component });
    };
    Kwab.prototype.getView = function (path) {
        var component = this.routes.find(function (i) { return i["path"] == path; }).component;
        this.el.appendChild(document.createElement(component));
    };
    return Kwab;
}());
exports.Kwab = Kwab;
window.addEventListener("popstate", function (event) {
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
function route(pathname, component) {
    var instance = Kwab.getInstance();
    instance.appendRoute(pathname, component);
}
