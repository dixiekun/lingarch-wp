/* @license MIT no URL */
(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else if (typeof module === "object" && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== "undefined") {
                    jQuery = require("jquery");
                } else {
                    jQuery = require("jquery")(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
})(function (jQuery) {
    var S2 = (function () {
        if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) {
            var S2 = jQuery.fn.select2.amd;
        }
        var S2;
        (function () {
            if (!S2 || !S2.requirejs) {
                if (!S2) {
                    S2 = {};
                } else {
                    require = S2;
                }
                var requirejs, require, define;
                (function (undef) {
                    var main,
                        req,
                        makeMap,
                        handlers,
                        defined = {},
                        waiting = {},
                        config = {},
                        defining = {},
                        hasOwn = Object.prototype.hasOwnProperty,
                        aps = [].slice,
                        jsSuffixRegExp = /\.js$/;
                    function hasProp(obj, prop) {
                        return hasOwn.call(obj, prop);
                    }
                    function normalize(name, baseName) {
                        var nameParts,
                            nameSegment,
                            mapValue,
                            foundMap,
                            lastIndex,
                            foundI,
                            foundStarMap,
                            starI,
                            i,
                            j,
                            part,
                            normalizedBaseParts,
                            baseParts = baseName && baseName.split("/"),
                            map = config.map,
                            starMap = (map && map["*"]) || {};
                        if (name) {
                            name = name.split("/");
                            lastIndex = name.length - 1;
                            if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                                name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, "");
                            }
                            if (name[0].charAt(0) === "." && baseParts) {
                                normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                                name = normalizedBaseParts.concat(name);
                            }
                            for (i = 0; i < name.length; i++) {
                                part = name[i];
                                if (part === ".") {
                                    name.splice(i, 1);
                                    i -= 1;
                                } else if (part === "..") {
                                    if (i === 0 || (i === 1 && name[2] === "..") || name[i - 1] === "..") {
                                        continue;
                                    } else if (i > 0) {
                                        name.splice(i - 1, 2);
                                        i -= 2;
                                    }
                                }
                            }
                            name = name.join("/");
                        }
                        if ((baseParts || starMap) && map) {
                            nameParts = name.split("/");
                            for (i = nameParts.length; i > 0; i -= 1) {
                                nameSegment = nameParts.slice(0, i).join("/");
                                if (baseParts) {
                                    for (j = baseParts.length; j > 0; j -= 1) {
                                        mapValue = map[baseParts.slice(0, j).join("/")];
                                        if (mapValue) {
                                            mapValue = mapValue[nameSegment];
                                            if (mapValue) {
                                                foundMap = mapValue;
                                                foundI = i;
                                                break;
                                            }
                                        }
                                    }
                                }
                                if (foundMap) {
                                    break;
                                }
                                if (!foundStarMap && starMap && starMap[nameSegment]) {
                                    foundStarMap = starMap[nameSegment];
                                    starI = i;
                                }
                            }
                            if (!foundMap && foundStarMap) {
                                foundMap = foundStarMap;
                                foundI = starI;
                            }
                            if (foundMap) {
                                nameParts.splice(0, foundI, foundMap);
                                name = nameParts.join("/");
                            }
                        }
                        return name;
                    }
                    function makeRequire(relName, forceSync) {
                        return function () {
                            var args = aps.call(arguments, 0);
                            if (typeof args[0] !== "string" && args.length === 1) {
                                args.push(null);
                            }
                            return req.apply(undef, args.concat([relName, forceSync]));
                        };
                    }
                    function makeNormalize(relName) {
                        return function (name) {
                            return normalize(name, relName);
                        };
                    }
                    function makeLoad(depName) {
                        return function (value) {
                            defined[depName] = value;
                        };
                    }
                    function callDep(name) {
                        if (hasProp(waiting, name)) {
                            var args = waiting[name];
                            delete waiting[name];
                            defining[name] = true;
                            main.apply(undef, args);
                        }
                        if (!hasProp(defined, name) && !hasProp(defining, name)) {
                            throw new Error("No " + name);
                        }
                        return defined[name];
                    }
                    function splitPrefix(name) {
                        var prefix,
                            index = name ? name.indexOf("!") : -1;
                        if (index > -1) {
                            prefix = name.substring(0, index);
                            name = name.substring(index + 1, name.length);
                        }
                        return [prefix, name];
                    }
                    function makeRelParts(relName) {
                        return relName ? splitPrefix(relName) : [];
                    }
                    makeMap = function (name, relParts) {
                        var plugin,
                            parts = splitPrefix(name),
                            prefix = parts[0],
                            relResourceName = relParts[1];
                        name = parts[1];
                        if (prefix) {
                            prefix = normalize(prefix, relResourceName);
                            plugin = callDep(prefix);
                        }
                        if (prefix) {
                            if (plugin && plugin.normalize) {
                                name = plugin.normalize(name, makeNormalize(relResourceName));
                            } else {
                                name = normalize(name, relResourceName);
                            }
                        } else {
                            name = normalize(name, relResourceName);
                            parts = splitPrefix(name);
                            prefix = parts[0];
                            name = parts[1];
                            if (prefix) {
                                plugin = callDep(prefix);
                            }
                        }
                        return { f: prefix ? prefix + "!" + name : name, n: name, pr: prefix, p: plugin };
                    };
                    function makeConfig(name) {
                        return function () {
                            return (config && config.config && config.config[name]) || {};
                        };
                    }
                    handlers = {
                        require: function (name) {
                            return makeRequire(name);
                        },
                        exports: function (name) {
                            var e = defined[name];
                            if (typeof e !== "undefined") {
                                return e;
                            } else {
                                return (defined[name] = {});
                            }
                        },
                        module: function (name) {
                            return { id: name, uri: "", exports: defined[name], config: makeConfig(name) };
                        },
                    };
                    main = function (name, deps, callback, relName) {
                        var cjsModule,
                            depName,
                            ret,
                            map,
                            i,
                            relParts,
                            args = [],
                            callbackType = typeof callback,
                            usingExports;
                        relName = relName || name;
                        relParts = makeRelParts(relName);
                        if (callbackType === "undefined" || callbackType === "function") {
                            deps = !deps.length && callback.length ? ["require", "exports", "module"] : deps;
                            for (i = 0; i < deps.length; i += 1) {
                                map = makeMap(deps[i], relParts);
                                depName = map.f;
                                if (depName === "require") {
                                    args[i] = handlers.require(name);
                                } else if (depName === "exports") {
                                    args[i] = handlers.exports(name);
                                    usingExports = true;
                                } else if (depName === "module") {
                                    cjsModule = args[i] = handlers.module(name);
                                } else if (hasProp(defined, depName) || hasProp(waiting, depName) || hasProp(defining, depName)) {
                                    args[i] = callDep(depName);
                                } else if (map.p) {
                                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                                    args[i] = defined[depName];
                                } else {
                                    throw new Error(name + " missing " + depName);
                                }
                            }
                            ret = callback ? callback.apply(defined[name], args) : undefined;
                            if (name) {
                                if (cjsModule && cjsModule.exports !== undef && cjsModule.exports !== defined[name]) {
                                    defined[name] = cjsModule.exports;
                                } else if (ret !== undef || !usingExports) {
                                    defined[name] = ret;
                                }
                            }
                        } else if (name) {
                            defined[name] = callback;
                        }
                    };
                    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
                        if (typeof deps === "string") {
                            if (handlers[deps]) {
                                return handlers[deps](callback);
                            }
                            return callDep(makeMap(deps, makeRelParts(callback)).f);
                        } else if (!deps.splice) {
                            config = deps;
                            if (config.deps) {
                                req(config.deps, config.callback);
                            }
                            if (!callback) {
                                return;
                            }
                            if (callback.splice) {
                                deps = callback;
                                callback = relName;
                                relName = null;
                            } else {
                                deps = undef;
                            }
                        }
                        callback = callback || function () {};
                        if (typeof relName === "function") {
                            relName = forceSync;
                            forceSync = alt;
                        }
                        if (forceSync) {
                            main(undef, deps, callback, relName);
                        } else {
                            setTimeout(function () {
                                main(undef, deps, callback, relName);
                            }, 4);
                        }
                        return req;
                    };
                    req.config = function (cfg) {
                        return req(cfg);
                    };
                    requirejs._defined = defined;
                    define = function (name, deps, callback) {
                        if (typeof name !== "string") {
                            throw new Error("See almond README: incorrect module build, no module name");
                        }
                        if (!deps.splice) {
                            callback = deps;
                            deps = [];
                        }
                        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
                            waiting[name] = [name, deps, callback];
                        }
                    };
                    define.amd = { jQuery: true };
                })();
                S2.requirejs = requirejs;
                S2.require = require;
                S2.define = define;
            }
        })();
        S2.define("almond", function () {});
        S2.define("jquery", [], function () {
            var _$ = jQuery || $;
            if (_$ == null && console && console.error) {
                console.error("Select2: An instance of jQuery or a jQuery-compatible library was not " + "found. Make sure that you are including jQuery before Select2 on your " + "web page.");
            }
            return _$;
        });
        S2.define("select2/utils", ["jquery"], function ($) {
            var Utils = {};
            Utils.Extend = function (ChildClass, SuperClass) {
                var __hasProp = {}.hasOwnProperty;
                function BaseConstructor() {
                    this.constructor = ChildClass;
                }
                for (var key in SuperClass) {
                    if (__hasProp.call(SuperClass, key)) {
                        ChildClass[key] = SuperClass[key];
                    }
                }
                BaseConstructor.prototype = SuperClass.prototype;
                ChildClass.prototype = new BaseConstructor();
                ChildClass.__super__ = SuperClass.prototype;
                return ChildClass;
            };
            function getMethods(theClass) {
                var proto = theClass.prototype;
                var methods = [];
                for (var methodName in proto) {
                    var m = proto[methodName];
                    if (typeof m !== "function") {
                        continue;
                    }
                    if (methodName === "constructor") {
                        continue;
                    }
                    methods.push(methodName);
                }
                return methods;
            }
            Utils.Decorate = function (SuperClass, DecoratorClass) {
                var decoratedMethods = getMethods(DecoratorClass);
                var superMethods = getMethods(SuperClass);
                function DecoratedClass() {
                    var unshift = Array.prototype.unshift;
                    var argCount = DecoratorClass.prototype.constructor.length;
                    var calledConstructor = SuperClass.prototype.constructor;
                    if (argCount > 0) {
                        unshift.call(arguments, SuperClass.prototype.constructor);
                        calledConstructor = DecoratorClass.prototype.constructor;
                    }
                    calledConstructor.apply(this, arguments);
                }
                DecoratorClass.displayName = SuperClass.displayName;
                function ctr() {
                    this.constructor = DecoratedClass;
                }
                DecoratedClass.prototype = new ctr();
                for (var m = 0; m < superMethods.length; m++) {
                    var superMethod = superMethods[m];
                    DecoratedClass.prototype[superMethod] = SuperClass.prototype[superMethod];
                }
                var calledMethod = function (methodName) {
                    var originalMethod = function () {};
                    if (methodName in DecoratedClass.prototype) {
                        originalMethod = DecoratedClass.prototype[methodName];
                    }
                    var decoratedMethod = DecoratorClass.prototype[methodName];
                    return function () {
                        var unshift = Array.prototype.unshift;
                        unshift.call(arguments, originalMethod);
                        return decoratedMethod.apply(this, arguments);
                    };
                };
                for (var d = 0; d < decoratedMethods.length; d++) {
                    var decoratedMethod = decoratedMethods[d];
                    DecoratedClass.prototype[decoratedMethod] = calledMethod(decoratedMethod);
                }
                return DecoratedClass;
            };
            var Observable = function () {
                this.listeners = {};
            };
            Observable.prototype.on = function (event, callback) {
                this.listeners = this.listeners || {};
                if (event in this.listeners) {
                    this.listeners[event].push(callback);
                } else {
                    this.listeners[event] = [callback];
                }
            };
            Observable.prototype.trigger = function (event) {
                var slice = Array.prototype.slice;
                var params = slice.call(arguments, 1);
                this.listeners = this.listeners || {};
                if (params == null) {
                    params = [];
                }
                if (params.length === 0) {
                    params.push({});
                }
                params[0]._type = event;
                if (event in this.listeners) {
                    this.invoke(this.listeners[event], slice.call(arguments, 1));
                }
                if ("*" in this.listeners) {
                    this.invoke(this.listeners["*"], arguments);
                }
            };
            Observable.prototype.invoke = function (listeners, params) {
                for (var i = 0, len = listeners.length; i < len; i++) {
                    listeners[i].apply(this, params);
                }
            };
            Utils.Observable = Observable;
            Utils.generateChars = function (length) {
                var chars = "";
                for (var i = 0; i < length; i++) {
                    var randomChar = Math.floor(Math.random() * 36);
                    chars += randomChar.toString(36);
                }
                return chars;
            };
            Utils.bind = function (func, context) {
                return function () {
                    func.apply(context, arguments);
                };
            };
            Utils._convertData = function (data) {
                for (var originalKey in data) {
                    var keys = originalKey.split("-");
                    var dataLevel = data;
                    if (keys.length === 1) {
                        continue;
                    }
                    for (var k = 0; k < keys.length; k++) {
                        var key = keys[k];
                        key = key.substring(0, 1).toLowerCase() + key.substring(1);
                        if (!(key in dataLevel)) {
                            dataLevel[key] = {};
                        }
                        if (k == keys.length - 1) {
                            dataLevel[key] = data[originalKey];
                        }
                        dataLevel = dataLevel[key];
                    }
                    delete data[originalKey];
                }
                return data;
            };
            Utils.hasScroll = function (index, el) {
                var $el = $(el);
                var overflowX = el.style.overflowX;
                var overflowY = el.style.overflowY;
                if (overflowX === overflowY && (overflowY === "hidden" || overflowY === "visible")) {
                    return false;
                }
                if (overflowX === "scroll" || overflowY === "scroll") {
                    return true;
                }
                return $el.innerHeight() < el.scrollHeight || $el.innerWidth() < el.scrollWidth;
            };
            Utils.escapeMarkup = function (markup) {
                var replaceMap = { "\\": "&#92;", "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#47;" };
                if (typeof markup !== "string") {
                    return markup;
                }
                return String(markup).replace(/[&<>"'\/\\]/g, function (match) {
                    return replaceMap[match];
                });
            };
            Utils.appendMany = function ($element, $nodes) {
                if ($.fn.jquery.substr(0, 3) === "1.7") {
                    var $jqNodes = $();
                    $.map($nodes, function (node) {
                        $jqNodes = $jqNodes.add(node);
                    });
                    $nodes = $jqNodes;
                }
                $element.append($nodes);
            };
            Utils.__cache = {};
            var id = 0;
            Utils.GetUniqueElementId = function (element) {
                var select2Id = element.getAttribute("data-select2-id");
                if (select2Id == null) {
                    if (element.id) {
                        select2Id = element.id;
                        element.setAttribute("data-select2-id", select2Id);
                    } else {
                        element.setAttribute("data-select2-id", ++id);
                        select2Id = id.toString();
                    }
                }
                return select2Id;
            };
            Utils.StoreData = function (element, name, value) {
                var id = Utils.GetUniqueElementId(element);
                if (!Utils.__cache[id]) {
                    Utils.__cache[id] = {};
                }
                Utils.__cache[id][name] = value;
            };
            Utils.GetData = function (element, name) {
                var id = Utils.GetUniqueElementId(element);
                if (name) {
                    if (Utils.__cache[id]) {
                        if (Utils.__cache[id][name] != null) {
                            return Utils.__cache[id][name];
                        }
                        return $(element).data(name);
                    }
                    return $(element).data(name);
                } else {
                    return Utils.__cache[id];
                }
            };
            Utils.RemoveData = function (element) {
                var id = Utils.GetUniqueElementId(element);
                if (Utils.__cache[id] != null) {
                    delete Utils.__cache[id];
                }
                element.removeAttribute("data-select2-id");
            };
            return Utils;
        });
        S2.define("select2/results", ["jquery", "./utils"], function ($, Utils) {
            function Results($element, options, dataAdapter) {
                this.$element = $element;
                this.data = dataAdapter;
                this.options = options;
                Results.__super__.constructor.call(this);
            }
            Utils.Extend(Results, Utils.Observable);
            Results.prototype.render = function () {
                var $results = $('<ul class="select2-results__options" role="listbox"></ul>');
                if (this.options.get("multiple")) {
                    $results.attr("aria-multiselectable", "true");
                }
                this.$results = $results;
                return $results;
            };
            Results.prototype.clear = function () {
                this.$results.empty();
            };
            Results.prototype.displayMessage = function (params) {
                var escapeMarkup = this.options.get("escapeMarkup");
                this.clear();
                this.hideLoading();
                var $message = $('<li role="alert" aria-live="assertive"' + ' class="select2-results__option"></li>');
                var message = this.options.get("translations").get(params.message);
                $message.append(escapeMarkup(message(params.args)));
                $message[0].className += " select2-results__message";
                this.$results.append($message);
            };
            Results.prototype.hideMessages = function () {
                this.$results.find(".select2-results__message").remove();
            };
            Results.prototype.append = function (data) {
                this.hideLoading();
                var $options = [];
                if (data.results == null || data.results.length === 0) {
                    if (this.$results.children().length === 0) {
                        this.trigger("results:message", { message: "noResults" });
                    }
                    return;
                }
                data.results = this.sort(data.results);
                for (var d = 0; d < data.results.length; d++) {
                    var item = data.results[d];
                    var $option = this.option(item);
                    $options.push($option);
                }
                this.$results.append($options);
            };
            Results.prototype.position = function ($results, $dropdown) {
                var $resultsContainer = $dropdown.find(".select2-results");
                $resultsContainer.append($results);
            };
            Results.prototype.sort = function (data) {
                var sorter = this.options.get("sorter");
                return sorter(data);
            };
            Results.prototype.highlightFirstItem = function () {
                var $options = this.$results.find(".select2-results__option[aria-selected]");
                var $selected = $options.filter("[aria-selected=true]");
                if ($selected.length > 0) {
                    $selected.first().trigger("mouseenter");
                } else {
                    $options.first().trigger("mouseenter");
                }
                this.ensureHighlightVisible();
            };
            Results.prototype.setClasses = function () {
                var self = this;
                this.data.current(function (selected) {
                    var selectedIds = $.map(selected, function (s) {
                        return s.id.toString();
                    });
                    var $options = self.$results.find(".select2-results__option[aria-selected]");
                    $options.each(function () {
                        var $option = $(this);
                        var item = Utils.GetData(this, "data");
                        var id = "" + item.id;
                        if ((item.element != null && item.element.selected) || (item.element == null && $.inArray(id, selectedIds) > -1)) {
                            $option.attr("aria-selected", "true");
                        } else {
                            $option.attr("aria-selected", "false");
                        }
                    });
                });
            };
            Results.prototype.showLoading = function (params) {
                this.hideLoading();
                var loadingMore = this.options.get("translations").get("searching");
                var loading = { disabled: true, loading: true, text: loadingMore(params) };
                var $loading = this.option(loading);
                $loading.className += " loading-results";
                this.$results.prepend($loading);
            };
            Results.prototype.hideLoading = function () {
                this.$results.find(".loading-results").remove();
            };
            Results.prototype.option = function (data) {
                var option = document.createElement("li");
                option.className = "select2-results__option";
                var attrs = { role: "option", "aria-selected": "false" };
                var matches = window.Element.prototype.matches || window.Element.prototype.msMatchesSelector || window.Element.prototype.webkitMatchesSelector;
                if ((data.element != null && matches.call(data.element, ":disabled")) || (data.element == null && data.disabled)) {
                    delete attrs["aria-selected"];
                    attrs["aria-disabled"] = "true";
                }
                if (data.id == null) {
                    delete attrs["aria-selected"];
                }
                if (data._resultId != null) {
                    option.id = data._resultId;
                }
                if (data.title) {
                    option.title = data.title;
                }
                if (data.children) {
                    attrs.role = "group";
                    attrs["aria-label"] = data.text;
                    delete attrs["aria-selected"];
                }
                for (var attr in attrs) {
                    var val = attrs[attr];
                    option.setAttribute(attr, val);
                }
                if (data.children) {
                    var $option = $(option);
                    var label = document.createElement("strong");
                    label.className = "select2-results__group";
                    var $label = $(label);
                    this.template(data, label);
                    var $children = [];
                    for (var c = 0; c < data.children.length; c++) {
                        var child = data.children[c];
                        var $child = this.option(child);
                        $children.push($child);
                    }
                    var $childrenContainer = $("<ul></ul>", { class: "select2-results__options select2-results__options--nested" });
                    $childrenContainer.append($children);
                    $option.append(label);
                    $option.append($childrenContainer);
                } else {
                    this.template(data, option);
                }
                Utils.StoreData(option, "data", data);
                return option;
            };
            Results.prototype.bind = function (container, $container) {
                var self = this;
                var id = container.id + "-results";
                this.$results.attr("id", id);
                container.on("results:all", function (params) {
                    self.clear();
                    self.append(params.data);
                    if (container.isOpen()) {
                        self.setClasses();
                        self.highlightFirstItem();
                    }
                });
                container.on("results:append", function (params) {
                    self.append(params.data);
                    if (container.isOpen()) {
                        self.setClasses();
                    }
                });
                container.on("query", function (params) {
                    self.hideMessages();
                    self.showLoading(params);
                });
                container.on("select", function () {
                    if (!container.isOpen()) {
                        return;
                    }
                    self.setClasses();
                    if (self.options.get("scrollAfterSelect")) {
                        self.highlightFirstItem();
                    }
                });
                container.on("unselect", function () {
                    if (!container.isOpen()) {
                        return;
                    }
                    self.setClasses();
                    if (self.options.get("scrollAfterSelect")) {
                        self.highlightFirstItem();
                    }
                });
                container.on("open", function () {
                    self.$results.attr("aria-expanded", "true");
                    self.$results.attr("aria-hidden", "false");
                    self.setClasses();
                    self.ensureHighlightVisible();
                });
                container.on("close", function () {
                    self.$results.attr("aria-expanded", "false");
                    self.$results.attr("aria-hidden", "true");
                    self.$results.removeAttr("aria-activedescendant");
                });
                container.on("results:toggle", function () {
                    var $highlighted = self.getHighlightedResults();
                    if ($highlighted.length === 0) {
                        return;
                    }
                    $highlighted.trigger("mouseup");
                });
                container.on("results:select", function () {
                    var $highlighted = self.getHighlightedResults();
                    if ($highlighted.length === 0) {
                        return;
                    }
                    var data = Utils.GetData($highlighted[0], "data");
                    if ($highlighted.attr("aria-selected") == "true") {
                        self.trigger("close", {});
                    } else {
                        self.trigger("select", { data: data });
                    }
                });
                container.on("results:previous", function () {
                    var $highlighted = self.getHighlightedResults();
                    var $options = self.$results.find("[aria-selected]");
                    var currentIndex = $options.index($highlighted);
                    if (currentIndex <= 0) {
                        return;
                    }
                    var nextIndex = currentIndex - 1;
                    if ($highlighted.length === 0) {
                        nextIndex = 0;
                    }
                    var $next = $options.eq(nextIndex);
                    $next.trigger("mouseenter");
                    var currentOffset = self.$results.offset().top;
                    var nextTop = $next.offset().top;
                    var nextOffset = self.$results.scrollTop() + (nextTop - currentOffset);
                    if (nextIndex === 0) {
                        self.$results.scrollTop(0);
                    } else if (nextTop - currentOffset < 0) {
                        self.$results.scrollTop(nextOffset);
                    }
                });
                container.on("results:next", function () {
                    var $highlighted = self.getHighlightedResults();
                    var $options = self.$results.find("[aria-selected]");
                    var currentIndex = $options.index($highlighted);
                    var nextIndex = currentIndex + 1;
                    if (nextIndex >= $options.length) {
                        return;
                    }
                    var $next = $options.eq(nextIndex);
                    $next.trigger("mouseenter");
                    var currentOffset = self.$results.offset().top + self.$results.outerHeight(false);
                    var nextBottom = $next.offset().top + $next.outerHeight(false);
                    var nextOffset = self.$results.scrollTop() + nextBottom - currentOffset;
                    if (nextIndex === 0) {
                        self.$results.scrollTop(0);
                    } else if (nextBottom > currentOffset) {
                        self.$results.scrollTop(nextOffset);
                    }
                });
                container.on("results:focus", function (params) {
                    params.element.addClass("select2-results__option--highlighted");
                });
                container.on("results:message", function (params) {
                    self.displayMessage(params);
                });
                if ($.fn.mousewheel) {
                    this.$results.on("mousewheel", function (e) {
                        var top = self.$results.scrollTop();
                        var bottom = self.$results.get(0).scrollHeight - top + e.deltaY;
                        var isAtTop = e.deltaY > 0 && top - e.deltaY <= 0;
                        var isAtBottom = e.deltaY < 0 && bottom <= self.$results.height();
                        if (isAtTop) {
                            self.$results.scrollTop(0);
                            e.preventDefault();
                            e.stopPropagation();
                        } else if (isAtBottom) {
                            self.$results.scrollTop(self.$results.get(0).scrollHeight - self.$results.height());
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    });
                }
                this.$results.on("mouseup", ".select2-results__option[aria-selected]", function (evt) {
                    var $this = $(this);
                    var data = Utils.GetData(this, "data");
                    if ($this.attr("aria-selected") === "true") {
                        if (self.options.get("multiple")) {
                            self.trigger("unselect", { originalEvent: evt, data: data });
                        } else {
                            self.trigger("close", {});
                        }
                        return;
                    }
                    self.trigger("select", { originalEvent: evt, data: data });
                });
                this.$results.on("mouseenter", ".select2-results__option[aria-selected]", function (evt) {
                    var data = Utils.GetData(this, "data");
                    self.getHighlightedResults().removeClass("select2-results__option--highlighted");
                    self.trigger("results:focus", { data: data, element: $(this) });
                });
            };
            Results.prototype.getHighlightedResults = function () {
                var $highlighted = this.$results.find(".select2-results__option--highlighted");
                return $highlighted;
            };
            Results.prototype.destroy = function () {
                this.$results.remove();
            };
            Results.prototype.ensureHighlightVisible = function () {
                var $highlighted = this.getHighlightedResults();
                if ($highlighted.length === 0) {
                    return;
                }
                var $options = this.$results.find("[aria-selected]");
                var currentIndex = $options.index($highlighted);
                var currentOffset = this.$results.offset().top;
                var nextTop = $highlighted.offset().top;
                var nextOffset = this.$results.scrollTop() + (nextTop - currentOffset);
                var offsetDelta = nextTop - currentOffset;
                nextOffset -= $highlighted.outerHeight(false) * 2;
                if (currentIndex <= 2) {
                    this.$results.scrollTop(0);
                } else if (offsetDelta > this.$results.outerHeight() || offsetDelta < 0) {
                    this.$results.scrollTop(nextOffset);
                }
            };
            Results.prototype.template = function (result, container) {
                var template = this.options.get("templateResult");
                var escapeMarkup = this.options.get("escapeMarkup");
                var content = template(result, container);
                if (content == null) {
                    container.style.display = "none";
                } else if (typeof content === "string") {
                    container.innerHTML = escapeMarkup(content);
                } else {
                    $(container).append(content);
                }
            };
            return Results;
        });
        S2.define("select2/keys", [], function () {
            var KEYS = { BACKSPACE: 8, TAB: 9, ENTER: 13, SHIFT: 16, CTRL: 17, ALT: 18, ESC: 27, SPACE: 32, PAGE_UP: 33, PAGE_DOWN: 34, END: 35, HOME: 36, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46 };
            return KEYS;
        });
        S2.define("select2/selection/base", ["jquery", "../utils", "../keys"], function ($, Utils, KEYS) {
            function BaseSelection($element, options) {
                this.$element = $element;
                this.options = options;
                BaseSelection.__super__.constructor.call(this);
            }
            Utils.Extend(BaseSelection, Utils.Observable);
            BaseSelection.prototype.render = function () {
                var $selection = $('<span class="select2-selection" role="combobox" ' + ' aria-haspopup="true" aria-expanded="false">' + "</span>");
                this._tabindex = 0;
                if (Utils.GetData(this.$element[0], "old-tabindex") != null) {
                    this._tabindex = Utils.GetData(this.$element[0], "old-tabindex");
                } else if (this.$element.attr("tabindex") != null) {
                    this._tabindex = this.$element.attr("tabindex");
                }
                $selection.attr("title", this.$element.attr("title"));
                $selection.attr("tabindex", this._tabindex);
                $selection.attr("aria-disabled", "false");
                this.$selection = $selection;
                return $selection;
            };
            BaseSelection.prototype.bind = function (container, $container) {
                var self = this;
                var resultsId = container.id + "-results";
                this.container = container;
                this.$selection.on("focus", function (evt) {
                    self.trigger("focus", evt);
                });
                this.$selection.on("blur", function (evt) {
                    self._handleBlur(evt);
                });
                this.$selection.on("keydown", function (evt) {
                    self.trigger("keypress", evt);
                    if (evt.which === KEYS.SPACE) {
                        evt.preventDefault();
                    }
                });
                container.on("results:focus", function (params) {
                    self.$selection.attr("aria-activedescendant", params.data._resultId);
                });
                container.on("selection:update", function (params) {
                    self.update(params.data);
                });
                container.on("open", function () {
                    self.$selection.attr("aria-expanded", "true");
                    self.$selection.attr("aria-owns", resultsId);
                    self._attachCloseHandler(container);
                });
                container.on("close", function () {
                    self.$selection.attr("aria-expanded", "false");
                    self.$selection.removeAttr("aria-activedescendant");
                    self.$selection.removeAttr("aria-owns");
                    self.$selection.trigger("focus");
                    self._detachCloseHandler(container);
                });
                container.on("enable", function () {
                    self.$selection.attr("tabindex", self._tabindex);
                    self.$selection.attr("aria-disabled", "false");
                });
                container.on("disable", function () {
                    self.$selection.attr("tabindex", "-1");
                    self.$selection.attr("aria-disabled", "true");
                });
            };
            BaseSelection.prototype._handleBlur = function (evt) {
                var self = this;
                window.setTimeout(function () {
                    if (document.activeElement == self.$selection[0] || $.contains(self.$selection[0], document.activeElement)) {
                        return;
                    }
                    self.trigger("blur", evt);
                }, 1);
            };
            BaseSelection.prototype._attachCloseHandler = function (container) {
                $(document.body).on("mousedown.select2." + container.id, function (e) {
                    var $target = $(e.target);
                    var $select = $target.closest(".select2");
                    var $all = $(".select2.select2-container--open");
                    $all.each(function () {
                        if (this == $select[0]) {
                            return;
                        }
                        var $element = Utils.GetData(this, "element");
                        $element.select2("close");
                    });
                });
            };
            BaseSelection.prototype._detachCloseHandler = function (container) {
                $(document.body).off("mousedown.select2." + container.id);
            };
            BaseSelection.prototype.position = function ($selection, $container) {
                var $selectionContainer = $container.find(".selection");
                $selectionContainer.append($selection);
            };
            BaseSelection.prototype.destroy = function () {
                this._detachCloseHandler(this.container);
            };
            BaseSelection.prototype.update = function (data) {
                throw new Error("The `update` method must be defined in child classes.");
            };
            BaseSelection.prototype.isEnabled = function () {
                return !this.isDisabled();
            };
            BaseSelection.prototype.isDisabled = function () {
                return this.options.get("disabled");
            };
            return BaseSelection;
        });
        S2.define("select2/selection/single", ["jquery", "./base", "../utils", "../keys"], function ($, BaseSelection, Utils, KEYS) {
            function SingleSelection() {
                SingleSelection.__super__.constructor.apply(this, arguments);
            }
            Utils.Extend(SingleSelection, BaseSelection);
            SingleSelection.prototype.render = function () {
                var $selection = SingleSelection.__super__.render.call(this);
                $selection.addClass("select2-selection--single");
                $selection.html('<span class="select2-selection__rendered"></span>' + '<span class="select2-selection__arrow" role="presentation">' + '<b role="presentation"></b>' + "</span>");
                return $selection;
            };
            SingleSelection.prototype.bind = function (container, $container) {
                var self = this;
                SingleSelection.__super__.bind.apply(this, arguments);
                var id = container.id + "-container";
                this.$selection.find(".select2-selection__rendered").attr("id", id).attr("role", "textbox").attr("aria-readonly", "true");
                this.$selection.attr("aria-labelledby", id);
                this.$selection.on("mousedown", function (evt) {
                    if (evt.which !== 1) {
                        return;
                    }
                    self.trigger("toggle", { originalEvent: evt });
                });
                this.$selection.on("focus", function (evt) {});
                this.$selection.on("blur", function (evt) {});
                container.on("focus", function (evt) {
                    if (!container.isOpen()) {
                        self.$selection.trigger("focus");
                    }
                });
            };
            SingleSelection.prototype.clear = function () {
                var $rendered = this.$selection.find(".select2-selection__rendered");
                $rendered.empty();
                $rendered.removeAttr("title");
            };
            SingleSelection.prototype.display = function (data, container) {
                var template = this.options.get("templateSelection");
                var escapeMarkup = this.options.get("escapeMarkup");
                return escapeMarkup(template(data, container));
            };
            SingleSelection.prototype.selectionContainer = function () {
                return $("<span></span>");
            };
            SingleSelection.prototype.update = function (data) {
                if (data.length === 0) {
                    this.clear();
                    return;
                }
                var selection = data[0];
                var $rendered = this.$selection.find(".select2-selection__rendered");
                var formatted = this.display(selection, $rendered);
                $rendered.empty().append(formatted);
                var title = selection.title || selection.text;
                if (title) {
                    $rendered.attr("title", title);
                } else {
                    $rendered.removeAttr("title");
                }
            };
            return SingleSelection;
        });
        S2.define("select2/selection/multiple", ["jquery", "./base", "../utils"], function ($, BaseSelection, Utils) {
            function MultipleSelection($element, options) {
                MultipleSelection.__super__.constructor.apply(this, arguments);
            }
            Utils.Extend(MultipleSelection, BaseSelection);
            MultipleSelection.prototype.render = function () {
                var $selection = MultipleSelection.__super__.render.call(this);
                $selection.addClass("select2-selection--multiple");
                $selection.html('<ul class="select2-selection__rendered"></ul>');
                return $selection;
            };
            MultipleSelection.prototype.bind = function (container, $container) {
                var self = this;
                MultipleSelection.__super__.bind.apply(this, arguments);
                this.$selection.on("click", function (evt) {
                    self.trigger("toggle", { originalEvent: evt });
                });
                this.$selection.on("click", ".select2-selection__choice__remove", function (evt) {
                    if (self.isDisabled()) {
                        return;
                    }
                    var $remove = $(this);
                    var $selection = $remove.parent();
                    var data = Utils.GetData($selection[0], "data");
                    self.trigger("unselect", { originalEvent: evt, data: data });
                });
            };
            MultipleSelection.prototype.clear = function () {
                var $rendered = this.$selection.find(".select2-selection__rendered");
                $rendered.empty();
                $rendered.removeAttr("title");
            };
            MultipleSelection.prototype.display = function (data, container) {
                var template = this.options.get("templateSelection");
                var escapeMarkup = this.options.get("escapeMarkup");
                return escapeMarkup(template(data, container));
            };
            MultipleSelection.prototype.selectionContainer = function () {
                var $container = $('<li class="select2-selection__choice">' + '<span class="select2-selection__choice__remove" role="presentation">' + "&times;" + "</span>" + "</li>");
                return $container;
            };
            MultipleSelection.prototype.update = function (data) {
                this.clear();
                if (data.length === 0) {
                    return;
                }
                var $selections = [];
                for (var d = 0; d < data.length; d++) {
                    var selection = data[d];
                    var $selection = this.selectionContainer();
                    var formatted = this.display(selection, $selection);
                    $selection.append(formatted);
                    var title = selection.title || selection.text;
                    if (title) {
                        $selection.attr("title", title);
                    }
                    Utils.StoreData($selection[0], "data", selection);
                    $selections.push($selection);
                }
                var $rendered = this.$selection.find(".select2-selection__rendered");
                Utils.appendMany($rendered, $selections);
            };
            return MultipleSelection;
        });
        S2.define("select2/selection/placeholder", ["../utils"], function (Utils) {
            function Placeholder(decorated, $element, options) {
                this.placeholder = this.normalizePlaceholder(options.get("placeholder"));
                decorated.call(this, $element, options);
            }
            Placeholder.prototype.normalizePlaceholder = function (_, placeholder) {
                if (typeof placeholder === "string") {
                    placeholder = { id: "", text: placeholder };
                }
                return placeholder;
            };
            Placeholder.prototype.createPlaceholder = function (decorated, placeholder) {
                var $placeholder = this.selectionContainer();
                $placeholder.html(this.display(placeholder));
                $placeholder.addClass("select2-selection__placeholder").removeClass("select2-selection__choice");
                return $placeholder;
            };
            Placeholder.prototype.update = function (decorated, data) {
                var singlePlaceholder = data.length == 1 && data[0].id != this.placeholder.id;
                var multipleSelections = data.length > 1;
                if (multipleSelections || singlePlaceholder) {
                    return decorated.call(this, data);
                }
                this.clear();
                var $placeholder = this.createPlaceholder(this.placeholder);
                this.$selection.find(".select2-selection__rendered").append($placeholder);
            };
            return Placeholder;
        });
        S2.define("select2/selection/allowClear", ["jquery", "../keys", "../utils"], function ($, KEYS, Utils) {
            function AllowClear() {}
            AllowClear.prototype.bind = function (decorated, container, $container) {
                var self = this;
                decorated.call(this, container, $container);
                if (this.placeholder == null) {
                    if (this.options.get("debug") && window.console && console.error) {
                        console.error("Select2: The `allowClear` option should be used in combination " + "with the `placeholder` option.");
                    }
                }
                this.$selection.on("mousedown", ".select2-selection__clear", function (evt) {
                    self._handleClear(evt);
                });
                container.on("keypress", function (evt) {
                    self._handleKeyboardClear(evt, container);
                });
            };
            AllowClear.prototype._handleClear = function (_, evt) {
                if (this.isDisabled()) {
                    return;
                }
                var $clear = this.$selection.find(".select2-selection__clear");
                if ($clear.length === 0) {
                    return;
                }
                evt.stopPropagation();
                var data = Utils.GetData($clear[0], "data");
                var previousVal = this.$element.val();
                this.$element.val(this.placeholder.id);
                var unselectData = { data: data };
                this.trigger("clear", unselectData);
                if (unselectData.prevented) {
                    this.$element.val(previousVal);
                    return;
                }
                for (var d = 0; d < data.length; d++) {
                    unselectData = { data: data[d] };
                    this.trigger("unselect", unselectData);
                    if (unselectData.prevented) {
                        this.$element.val(previousVal);
                        return;
                    }
                }
                this.$element.trigger("input").trigger("change");
                this.trigger("toggle", {});
            };
            AllowClear.prototype._handleKeyboardClear = function (_, evt, container) {
                if (container.isOpen()) {
                    return;
                }
                if (evt.which == KEYS.DELETE || evt.which == KEYS.BACKSPACE) {
                    this._handleClear(evt);
                }
            };
            AllowClear.prototype.update = function (decorated, data) {
                decorated.call(this, data);
                if (this.$selection.find(".select2-selection__placeholder").length > 0 || data.length === 0) {
                    return;
                }
                var removeAll = this.options.get("translations").get("removeAllItems");
                var $remove = $('<span class="select2-selection__clear" title="' + removeAll() + '">' + "&times;" + "</span>");
                Utils.StoreData($remove[0], "data", data);
                this.$selection.find(".select2-selection__rendered").prepend($remove);
            };
            return AllowClear;
        });
        S2.define("select2/selection/search", ["jquery", "../utils", "../keys"], function ($, Utils, KEYS) {
            function Search(decorated, $element, options) {
                decorated.call(this, $element, options);
            }
            Search.prototype.render = function (decorated) {
                var $search = $(
                    '<li class="select2-search select2-search--inline">' +
                        '<input class="select2-search__field" type="search" tabindex="-1"' +
                        ' autocomplete="off" autocorrect="off" autocapitalize="none"' +
                        ' spellcheck="false" role="searchbox" aria-autocomplete="list" />' +
                        "</li>"
                );
                this.$searchContainer = $search;
                this.$search = $search.find("input");
                var $rendered = decorated.call(this);
                this._transferTabIndex();
                return $rendered;
            };
            Search.prototype.bind = function (decorated, container, $container) {
                var self = this;
                var resultsId = container.id + "-results";
                decorated.call(this, container, $container);
                container.on("open", function () {
                    self.$search.attr("aria-controls", resultsId);
                    self.$search.trigger("focus");
                });
                container.on("close", function () {
                    self.$search.val("");
                    self.$search.removeAttr("aria-controls");
                    self.$search.removeAttr("aria-activedescendant");
                    self.$search.trigger("focus");
                });
                container.on("enable", function () {
                    self.$search.prop("disabled", false);
                    self._transferTabIndex();
                });
                container.on("disable", function () {
                    self.$search.prop("disabled", true);
                });
                container.on("focus", function (evt) {
                    self.$search.trigger("focus");
                });
                container.on("results:focus", function (params) {
                    if (params.data._resultId) {
                        self.$search.attr("aria-activedescendant", params.data._resultId);
                    } else {
                        self.$search.removeAttr("aria-activedescendant");
                    }
                });
                this.$selection.on("focusin", ".select2-search--inline", function (evt) {
                    self.trigger("focus", evt);
                });
                this.$selection.on("focusout", ".select2-search--inline", function (evt) {
                    self._handleBlur(evt);
                });
                this.$selection.on("keydown", ".select2-search--inline", function (evt) {
                    evt.stopPropagation();
                    self.trigger("keypress", evt);
                    self._keyUpPrevented = evt.isDefaultPrevented();
                    var key = evt.which;
                    if (key === KEYS.BACKSPACE && self.$search.val() === "") {
                        var $previousChoice = self.$searchContainer.prev(".select2-selection__choice");
                        if ($previousChoice.length > 0) {
                            var item = Utils.GetData($previousChoice[0], "data");
                            self.searchRemoveChoice(item);
                            evt.preventDefault();
                        }
                    }
                });
                this.$selection.on("click", ".select2-search--inline", function (evt) {
                    if (self.$search.val()) {
                        evt.stopPropagation();
                    }
                });
                var msie = document.documentMode;
                var disableInputEvents = msie && msie <= 11;
                this.$selection.on("input.searchcheck", ".select2-search--inline", function (evt) {
                    if (disableInputEvents) {
                        self.$selection.off("input.search input.searchcheck");
                        return;
                    }
                    self.$selection.off("keyup.search");
                });
                this.$selection.on("keyup.search input.search", ".select2-search--inline", function (evt) {
                    if (disableInputEvents && evt.type === "input") {
                        self.$selection.off("input.search input.searchcheck");
                        return;
                    }
                    var key = evt.which;
                    if (key == KEYS.SHIFT || key == KEYS.CTRL || key == KEYS.ALT) {
                        return;
                    }
                    if (key == KEYS.TAB) {
                        return;
                    }
                    self.handleSearch(evt);
                });
            };
            Search.prototype._transferTabIndex = function (decorated) {
                this.$search.attr("tabindex", this.$selection.attr("tabindex"));
                this.$selection.attr("tabindex", "-1");
            };
            Search.prototype.createPlaceholder = function (decorated, placeholder) {
                this.$search.attr("placeholder", placeholder.text);
            };
            Search.prototype.update = function (decorated, data) {
                var searchHadFocus = this.$search[0] == document.activeElement;
                this.$search.attr("placeholder", "");
                decorated.call(this, data);
                this.$selection.find(".select2-selection__rendered").append(this.$searchContainer);
                this.resizeSearch();
                if (searchHadFocus) {
                    this.$search.trigger("focus");
                }
            };
            Search.prototype.handleSearch = function () {
                this.resizeSearch();
                if (!this._keyUpPrevented) {
                    var input = this.$search.val();
                    this.trigger("query", { term: input });
                }
                this._keyUpPrevented = false;
            };
            Search.prototype.searchRemoveChoice = function (decorated, item) {
                this.trigger("unselect", { data: item });
                this.$search.val(item.text);
                this.handleSearch();
            };
            Search.prototype.resizeSearch = function () {
                this.$search.css("width", "25px");
                var width = "";
                if (this.$search.attr("placeholder") !== "") {
                    width = this.$selection.find(".select2-selection__rendered").width();
                } else {
                    var minimumWidth = this.$search.val().length + 1;
                    width = minimumWidth * 0.75 + "em";
                }
                this.$search.css("width", width);
            };
            return Search;
        });
        S2.define("select2/selection/eventRelay", ["jquery"], function ($) {
            function EventRelay() {}
            EventRelay.prototype.bind = function (decorated, container, $container) {
                var self = this;
                var relayEvents = ["open", "opening", "close", "closing", "select", "selecting", "unselect", "unselecting", "clear", "clearing"];
                var preventableEvents = ["opening", "closing", "selecting", "unselecting", "clearing"];
                decorated.call(this, container, $container);
                container.on("*", function (name, params) {
                    if ($.inArray(name, relayEvents) === -1) {
                        return;
                    }
                    params = params || {};
                    var evt = $.Event("select2:" + name, { params: params });
                    self.$element.trigger(evt);
                    if ($.inArray(name, preventableEvents) === -1) {
                        return;
                    }
                    params.prevented = evt.isDefaultPrevented();
                });
            };
            return EventRelay;
        });
        S2.define("select2/translation", ["jquery", "require"], function ($, require) {
            function Translation(dict) {
                this.dict = dict || {};
            }
            Translation.prototype.all = function () {
                return this.dict;
            };
            Translation.prototype.get = function (key) {
                return this.dict[key];
            };
            Translation.prototype.extend = function (translation) {
                this.dict = $.extend({}, translation.all(), this.dict);
            };
            Translation._cache = {};
            Translation.loadPath = function (path) {
                if (!(path in Translation._cache)) {
                    var translations = require(path);
                    Translation._cache[path] = translations;
                }
                return new Translation(Translation._cache[path]);
            };
            return Translation;
        });
        S2.define("select2/diacritics", [], function () {
            var diacritics = {
                "\u24B6": "A",
                Ａ: "A",
                À: "A",
                Á: "A",
                Â: "A",
                Ầ: "A",
                Ấ: "A",
                Ẫ: "A",
                Ẩ: "A",
                Ã: "A",
                Ā: "A",
                Ă: "A",
                Ằ: "A",
                Ắ: "A",
                Ẵ: "A",
                Ẳ: "A",
                Ȧ: "A",
                Ǡ: "A",
                Ä: "A",
                Ǟ: "A",
                Ả: "A",
                Å: "A",
                Ǻ: "A",
                Ǎ: "A",
                Ȁ: "A",
                Ȃ: "A",
                Ạ: "A",
                Ậ: "A",
                Ặ: "A",
                Ḁ: "A",
                Ą: "A",
                Ⱥ: "A",
                Ɐ: "A",
                Ꜳ: "AA",
                Æ: "AE",
                Ǽ: "AE",
                Ǣ: "AE",
                Ꜵ: "AO",
                Ꜷ: "AU",
                Ꜹ: "AV",
                Ꜻ: "AV",
                Ꜽ: "AY",
                "\u24B7": "B",
                Ｂ: "B",
                Ḃ: "B",
                Ḅ: "B",
                Ḇ: "B",
                Ƀ: "B",
                Ƃ: "B",
                Ɓ: "B",
                "\u24B8": "C",
                Ｃ: "C",
                Ć: "C",
                Ĉ: "C",
                Ċ: "C",
                Č: "C",
                Ç: "C",
                Ḉ: "C",
                Ƈ: "C",
                Ȼ: "C",
                Ꜿ: "C",
                "\u24B9": "D",
                Ｄ: "D",
                Ḋ: "D",
                Ď: "D",
                Ḍ: "D",
                Ḑ: "D",
                Ḓ: "D",
                Ḏ: "D",
                Đ: "D",
                Ƌ: "D",
                Ɗ: "D",
                Ɖ: "D",
                Ꝺ: "D",
                Ǳ: "DZ",
                Ǆ: "DZ",
                ǲ: "Dz",
                ǅ: "Dz",
                "\u24BA": "E",
                Ｅ: "E",
                È: "E",
                É: "E",
                Ê: "E",
                Ề: "E",
                Ế: "E",
                Ễ: "E",
                Ể: "E",
                Ẽ: "E",
                Ē: "E",
                Ḕ: "E",
                Ḗ: "E",
                Ĕ: "E",
                Ė: "E",
                Ë: "E",
                Ẻ: "E",
                Ě: "E",
                Ȅ: "E",
                Ȇ: "E",
                Ẹ: "E",
                Ệ: "E",
                Ȩ: "E",
                Ḝ: "E",
                Ę: "E",
                Ḙ: "E",
                Ḛ: "E",
                Ɛ: "E",
                Ǝ: "E",
                "\u24BB": "F",
                Ｆ: "F",
                Ḟ: "F",
                Ƒ: "F",
                Ꝼ: "F",
                "\u24BC": "G",
                Ｇ: "G",
                Ǵ: "G",
                Ĝ: "G",
                Ḡ: "G",
                Ğ: "G",
                Ġ: "G",
                Ǧ: "G",
                Ģ: "G",
                Ǥ: "G",
                Ɠ: "G",
                Ꞡ: "G",
                Ᵹ: "G",
                Ꝿ: "G",
                "\u24BD": "H",
                Ｈ: "H",
                Ĥ: "H",
                Ḣ: "H",
                Ḧ: "H",
                Ȟ: "H",
                Ḥ: "H",
                Ḩ: "H",
                Ḫ: "H",
                Ħ: "H",
                Ⱨ: "H",
                Ⱶ: "H",
                Ɥ: "H",
                "\u24BE": "I",
                Ｉ: "I",
                Ì: "I",
                Í: "I",
                Î: "I",
                Ĩ: "I",
                Ī: "I",
                Ĭ: "I",
                İ: "I",
                Ï: "I",
                Ḯ: "I",
                Ỉ: "I",
                Ǐ: "I",
                Ȉ: "I",
                Ȋ: "I",
                Ị: "I",
                Į: "I",
                Ḭ: "I",
                Ɨ: "I",
                "\u24BF": "J",
                Ｊ: "J",
                Ĵ: "J",
                Ɉ: "J",
                "\u24C0": "K",
                Ｋ: "K",
                Ḱ: "K",
                Ǩ: "K",
                Ḳ: "K",
                Ķ: "K",
                Ḵ: "K",
                Ƙ: "K",
                Ⱪ: "K",
                Ꝁ: "K",
                Ꝃ: "K",
                Ꝅ: "K",
                Ꞣ: "K",
                "\u24C1": "L",
                Ｌ: "L",
                Ŀ: "L",
                Ĺ: "L",
                Ľ: "L",
                Ḷ: "L",
                Ḹ: "L",
                Ļ: "L",
                Ḽ: "L",
                Ḻ: "L",
                Ł: "L",
                Ƚ: "L",
                Ɫ: "L",
                Ⱡ: "L",
                Ꝉ: "L",
                Ꝇ: "L",
                Ꞁ: "L",
                Ǉ: "LJ",
                ǈ: "Lj",
                "\u24C2": "M",
                Ｍ: "M",
                Ḿ: "M",
                Ṁ: "M",
                Ṃ: "M",
                Ɱ: "M",
                Ɯ: "M",
                "\u24C3": "N",
                Ｎ: "N",
                Ǹ: "N",
                Ń: "N",
                Ñ: "N",
                Ṅ: "N",
                Ň: "N",
                Ṇ: "N",
                Ņ: "N",
                Ṋ: "N",
                Ṉ: "N",
                Ƞ: "N",
                Ɲ: "N",
                Ꞑ: "N",
                Ꞥ: "N",
                Ǌ: "NJ",
                ǋ: "Nj",
                "\u24C4": "O",
                Ｏ: "O",
                Ò: "O",
                Ó: "O",
                Ô: "O",
                Ồ: "O",
                Ố: "O",
                Ỗ: "O",
                Ổ: "O",
                Õ: "O",
                Ṍ: "O",
                Ȭ: "O",
                Ṏ: "O",
                Ō: "O",
                Ṑ: "O",
                Ṓ: "O",
                Ŏ: "O",
                Ȯ: "O",
                Ȱ: "O",
                Ö: "O",
                Ȫ: "O",
                Ỏ: "O",
                Ő: "O",
                Ǒ: "O",
                Ȍ: "O",
                Ȏ: "O",
                Ơ: "O",
                Ờ: "O",
                Ớ: "O",
                Ỡ: "O",
                Ở: "O",
                Ợ: "O",
                Ọ: "O",
                Ộ: "O",
                Ǫ: "O",
                Ǭ: "O",
                Ø: "O",
                Ǿ: "O",
                Ɔ: "O",
                Ɵ: "O",
                Ꝋ: "O",
                Ꝍ: "O",
                Œ: "OE",
                Ƣ: "OI",
                Ꝏ: "OO",
                Ȣ: "OU",
                "\u24C5": "P",
                Ｐ: "P",
                Ṕ: "P",
                Ṗ: "P",
                Ƥ: "P",
                Ᵽ: "P",
                Ꝑ: "P",
                Ꝓ: "P",
                Ꝕ: "P",
                "\u24C6": "Q",
                Ｑ: "Q",
                Ꝗ: "Q",
                Ꝙ: "Q",
                Ɋ: "Q",
                "\u24C7": "R",
                Ｒ: "R",
                Ŕ: "R",
                Ṙ: "R",
                Ř: "R",
                Ȑ: "R",
                Ȓ: "R",
                Ṛ: "R",
                Ṝ: "R",
                Ŗ: "R",
                Ṟ: "R",
                Ɍ: "R",
                Ɽ: "R",
                Ꝛ: "R",
                Ꞧ: "R",
                Ꞃ: "R",
                "\u24C8": "S",
                Ｓ: "S",
                ẞ: "S",
                Ś: "S",
                Ṥ: "S",
                Ŝ: "S",
                Ṡ: "S",
                Š: "S",
                Ṧ: "S",
                Ṣ: "S",
                Ṩ: "S",
                Ș: "S",
                Ş: "S",
                Ȿ: "S",
                Ꞩ: "S",
                Ꞅ: "S",
                "\u24C9": "T",
                Ｔ: "T",
                Ṫ: "T",
                Ť: "T",
                Ṭ: "T",
                Ț: "T",
                Ţ: "T",
                Ṱ: "T",
                Ṯ: "T",
                Ŧ: "T",
                Ƭ: "T",
                Ʈ: "T",
                Ⱦ: "T",
                Ꞇ: "T",
                Ꜩ: "TZ",
                "\u24CA": "U",
                Ｕ: "U",
                Ù: "U",
                Ú: "U",
                Û: "U",
                Ũ: "U",
                Ṹ: "U",
                Ū: "U",
                Ṻ: "U",
                Ŭ: "U",
                Ü: "U",
                Ǜ: "U",
                Ǘ: "U",
                Ǖ: "U",
                Ǚ: "U",
                Ủ: "U",
                Ů: "U",
                Ű: "U",
                Ǔ: "U",
                Ȕ: "U",
                Ȗ: "U",
                Ư: "U",
                Ừ: "U",
                Ứ: "U",
                Ữ: "U",
                Ử: "U",
                Ự: "U",
                Ụ: "U",
                Ṳ: "U",
                Ų: "U",
                Ṷ: "U",
                Ṵ: "U",
                Ʉ: "U",
                "\u24CB": "V",
                Ｖ: "V",
                Ṽ: "V",
                Ṿ: "V",
                Ʋ: "V",
                Ꝟ: "V",
                Ʌ: "V",
                Ꝡ: "VY",
                "\u24CC": "W",
                Ｗ: "W",
                Ẁ: "W",
                Ẃ: "W",
                Ŵ: "W",
                Ẇ: "W",
                Ẅ: "W",
                Ẉ: "W",
                Ⱳ: "W",
                "\u24CD": "X",
                Ｘ: "X",
                Ẋ: "X",
                Ẍ: "X",
                "\u24CE": "Y",
                Ｙ: "Y",
                Ỳ: "Y",
                Ý: "Y",
                Ŷ: "Y",
                Ỹ: "Y",
                Ȳ: "Y",
                Ẏ: "Y",
                Ÿ: "Y",
                Ỷ: "Y",
                Ỵ: "Y",
                Ƴ: "Y",
                Ɏ: "Y",
                Ỿ: "Y",
                "\u24CF": "Z",
                Ｚ: "Z",
                Ź: "Z",
                Ẑ: "Z",
                Ż: "Z",
                Ž: "Z",
                Ẓ: "Z",
                Ẕ: "Z",
                Ƶ: "Z",
                Ȥ: "Z",
                Ɀ: "Z",
                Ⱬ: "Z",
                Ꝣ: "Z",
                "\u24D0": "a",
                ａ: "a",
                ẚ: "a",
                à: "a",
                á: "a",
                â: "a",
                ầ: "a",
                ấ: "a",
                ẫ: "a",
                ẩ: "a",
                ã: "a",
                ā: "a",
                ă: "a",
                ằ: "a",
                ắ: "a",
                ẵ: "a",
                ẳ: "a",
                ȧ: "a",
                ǡ: "a",
                ä: "a",
                ǟ: "a",
                ả: "a",
                å: "a",
                ǻ: "a",
                ǎ: "a",
                ȁ: "a",
                ȃ: "a",
                ạ: "a",
                ậ: "a",
                ặ: "a",
                ḁ: "a",
                ą: "a",
                ⱥ: "a",
                ɐ: "a",
                ꜳ: "aa",
                æ: "ae",
                ǽ: "ae",
                ǣ: "ae",
                ꜵ: "ao",
                ꜷ: "au",
                ꜹ: "av",
                ꜻ: "av",
                ꜽ: "ay",
                "\u24D1": "b",
                ｂ: "b",
                ḃ: "b",
                ḅ: "b",
                ḇ: "b",
                ƀ: "b",
                ƃ: "b",
                ɓ: "b",
                "\u24D2": "c",
                ｃ: "c",
                ć: "c",
                ĉ: "c",
                ċ: "c",
                č: "c",
                ç: "c",
                ḉ: "c",
                ƈ: "c",
                ȼ: "c",
                ꜿ: "c",
                ↄ: "c",
                "\u24D3": "d",
                ｄ: "d",
                ḋ: "d",
                ď: "d",
                ḍ: "d",
                ḑ: "d",
                ḓ: "d",
                ḏ: "d",
                đ: "d",
                ƌ: "d",
                ɖ: "d",
                ɗ: "d",
                ꝺ: "d",
                ǳ: "dz",
                ǆ: "dz",
                "\u24D4": "e",
                ｅ: "e",
                è: "e",
                é: "e",
                ê: "e",
                ề: "e",
                ế: "e",
                ễ: "e",
                ể: "e",
                ẽ: "e",
                ē: "e",
                ḕ: "e",
                ḗ: "e",
                ĕ: "e",
                ė: "e",
                ë: "e",
                ẻ: "e",
                ě: "e",
                ȅ: "e",
                ȇ: "e",
                ẹ: "e",
                ệ: "e",
                ȩ: "e",
                ḝ: "e",
                ę: "e",
                ḙ: "e",
                ḛ: "e",
                ɇ: "e",
                ɛ: "e",
                ǝ: "e",
                "\u24D5": "f",
                ｆ: "f",
                ḟ: "f",
                ƒ: "f",
                ꝼ: "f",
                "\u24D6": "g",
                ｇ: "g",
                ǵ: "g",
                ĝ: "g",
                ḡ: "g",
                ğ: "g",
                ġ: "g",
                ǧ: "g",
                ģ: "g",
                ǥ: "g",
                ɠ: "g",
                ꞡ: "g",
                ᵹ: "g",
                ꝿ: "g",
                "\u24D7": "h",
                ｈ: "h",
                ĥ: "h",
                ḣ: "h",
                ḧ: "h",
                ȟ: "h",
                ḥ: "h",
                ḩ: "h",
                ḫ: "h",
                ẖ: "h",
                ħ: "h",
                ⱨ: "h",
                ⱶ: "h",
                ɥ: "h",
                ƕ: "hv",
                "\u24D8": "i",
                ｉ: "i",
                ì: "i",
                í: "i",
                î: "i",
                ĩ: "i",
                ī: "i",
                ĭ: "i",
                ï: "i",
                ḯ: "i",
                ỉ: "i",
                ǐ: "i",
                ȉ: "i",
                ȋ: "i",
                ị: "i",
                į: "i",
                ḭ: "i",
                ɨ: "i",
                ı: "i",
                "\u24D9": "j",
                ｊ: "j",
                ĵ: "j",
                ǰ: "j",
                ɉ: "j",
                "\u24DA": "k",
                ｋ: "k",
                ḱ: "k",
                ǩ: "k",
                ḳ: "k",
                ķ: "k",
                ḵ: "k",
                ƙ: "k",
                ⱪ: "k",
                ꝁ: "k",
                ꝃ: "k",
                ꝅ: "k",
                ꞣ: "k",
                "\u24DB": "l",
                ｌ: "l",
                ŀ: "l",
                ĺ: "l",
                ľ: "l",
                ḷ: "l",
                ḹ: "l",
                ļ: "l",
                ḽ: "l",
                ḻ: "l",
                ſ: "l",
                ł: "l",
                ƚ: "l",
                ɫ: "l",
                ⱡ: "l",
                ꝉ: "l",
                ꞁ: "l",
                ꝇ: "l",
                ǉ: "lj",
                "\u24DC": "m",
                ｍ: "m",
                ḿ: "m",
                ṁ: "m",
                ṃ: "m",
                ɱ: "m",
                ɯ: "m",
                "\u24DD": "n",
                ｎ: "n",
                ǹ: "n",
                ń: "n",
                ñ: "n",
                ṅ: "n",
                ň: "n",
                ṇ: "n",
                ņ: "n",
                ṋ: "n",
                ṉ: "n",
                ƞ: "n",
                ɲ: "n",
                ŉ: "n",
                ꞑ: "n",
                ꞥ: "n",
                ǌ: "nj",
                "\u24DE": "o",
                ｏ: "o",
                ò: "o",
                ó: "o",
                ô: "o",
                ồ: "o",
                ố: "o",
                ỗ: "o",
                ổ: "o",
                õ: "o",
                ṍ: "o",
                ȭ: "o",
                ṏ: "o",
                ō: "o",
                ṑ: "o",
                ṓ: "o",
                ŏ: "o",
                ȯ: "o",
                ȱ: "o",
                ö: "o",
                ȫ: "o",
                ỏ: "o",
                ő: "o",
                ǒ: "o",
                ȍ: "o",
                ȏ: "o",
                ơ: "o",
                ờ: "o",
                ớ: "o",
                ỡ: "o",
                ở: "o",
                ợ: "o",
                ọ: "o",
                ộ: "o",
                ǫ: "o",
                ǭ: "o",
                ø: "o",
                ǿ: "o",
                ɔ: "o",
                ꝋ: "o",
                ꝍ: "o",
                ɵ: "o",
                œ: "oe",
                ƣ: "oi",
                ȣ: "ou",
                ꝏ: "oo",
                "\u24DF": "p",
                ｐ: "p",
                ṕ: "p",
                ṗ: "p",
                ƥ: "p",
                ᵽ: "p",
                ꝑ: "p",
                ꝓ: "p",
                ꝕ: "p",
                "\u24E0": "q",
                ｑ: "q",
                ɋ: "q",
                ꝗ: "q",
                ꝙ: "q",
                "\u24E1": "r",
                ｒ: "r",
                ŕ: "r",
                ṙ: "r",
                ř: "r",
                ȑ: "r",
                ȓ: "r",
                ṛ: "r",
                ṝ: "r",
                ŗ: "r",
                ṟ: "r",
                ɍ: "r",
                ɽ: "r",
                ꝛ: "r",
                ꞧ: "r",
                ꞃ: "r",
                "\u24E2": "s",
                ｓ: "s",
                ß: "s",
                ś: "s",
                ṥ: "s",
                ŝ: "s",
                ṡ: "s",
                š: "s",
                ṧ: "s",
                ṣ: "s",
                ṩ: "s",
                ș: "s",
                ş: "s",
                ȿ: "s",
                ꞩ: "s",
                ꞅ: "s",
                ẛ: "s",
                "\u24E3": "t",
                ｔ: "t",
                ṫ: "t",
                ẗ: "t",
                ť: "t",
                ṭ: "t",
                ț: "t",
                ţ: "t",
                ṱ: "t",
                ṯ: "t",
                ŧ: "t",
                ƭ: "t",
                ʈ: "t",
                ⱦ: "t",
                ꞇ: "t",
                ꜩ: "tz",
                "\u24E4": "u",
                ｕ: "u",
                ù: "u",
                ú: "u",
                û: "u",
                ũ: "u",
                ṹ: "u",
                ū: "u",
                ṻ: "u",
                ŭ: "u",
                ü: "u",
                ǜ: "u",
                ǘ: "u",
                ǖ: "u",
                ǚ: "u",
                ủ: "u",
                ů: "u",
                ű: "u",
                ǔ: "u",
                ȕ: "u",
                ȗ: "u",
                ư: "u",
                ừ: "u",
                ứ: "u",
                ữ: "u",
                ử: "u",
                ự: "u",
                ụ: "u",
                ṳ: "u",
                ų: "u",
                ṷ: "u",
                ṵ: "u",
                ʉ: "u",
                "\u24E5": "v",
                ｖ: "v",
                ṽ: "v",
                ṿ: "v",
                ʋ: "v",
                ꝟ: "v",
                ʌ: "v",
                ꝡ: "vy",
                "\u24E6": "w",
                ｗ: "w",
                ẁ: "w",
                ẃ: "w",
                ŵ: "w",
                ẇ: "w",
                ẅ: "w",
                ẘ: "w",
                ẉ: "w",
                ⱳ: "w",
                "\u24E7": "x",
                ｘ: "x",
                ẋ: "x",
                ẍ: "x",
                "\u24E8": "y",
                ｙ: "y",
                ỳ: "y",
                ý: "y",
                ŷ: "y",
                ỹ: "y",
                ȳ: "y",
                ẏ: "y",
                ÿ: "y",
                ỷ: "y",
                ẙ: "y",
                ỵ: "y",
                ƴ: "y",
                ɏ: "y",
                ỿ: "y",
                "\u24E9": "z",
                ｚ: "z",
                ź: "z",
                ẑ: "z",
                ż: "z",
                ž: "z",
                ẓ: "z",
                ẕ: "z",
                ƶ: "z",
                ȥ: "z",
                ɀ: "z",
                ⱬ: "z",
                ꝣ: "z",
                Ά: "\u0391",
                Έ: "\u0395",
                Ή: "\u0397",
                Ί: "\u0399",
                Ϊ: "\u0399",
                Ό: "\u039F",
                Ύ: "\u03A5",
                Ϋ: "\u03A5",
                Ώ: "\u03A9",
                ά: "\u03B1",
                έ: "\u03B5",
                ή: "\u03B7",
                ί: "\u03B9",
                ϊ: "\u03B9",
                ΐ: "\u03B9",
                ό: "\u03BF",
                ύ: "\u03C5",
                ϋ: "\u03C5",
                ΰ: "\u03C5",
                ώ: "\u03C9",
                ς: "\u03C3",
                "\u2019": "'",
            };
            return diacritics;
        });
        S2.define("select2/data/base", ["../utils"], function (Utils) {
            function BaseAdapter($element, options) {
                BaseAdapter.__super__.constructor.call(this);
            }
            Utils.Extend(BaseAdapter, Utils.Observable);
            BaseAdapter.prototype.current = function (callback) {
                throw new Error("The `current` method must be defined in child classes.");
            };
            BaseAdapter.prototype.query = function (params, callback) {
                throw new Error("The `query` method must be defined in child classes.");
            };
            BaseAdapter.prototype.bind = function (container, $container) {};
            BaseAdapter.prototype.destroy = function () {};
            BaseAdapter.prototype.generateResultId = function (container, data) {
                var id = container.id + "-result-";
                id += Utils.generateChars(4);
                if (data.id != null) {
                    id += "-" + data.id.toString();
                } else {
                    id += "-" + Utils.generateChars(4);
                }
                return id;
            };
            return BaseAdapter;
        });
        S2.define("select2/data/select", ["./base", "../utils", "jquery"], function (BaseAdapter, Utils, $) {
            function SelectAdapter($element, options) {
                this.$element = $element;
                this.options = options;
                SelectAdapter.__super__.constructor.call(this);
            }
            Utils.Extend(SelectAdapter, BaseAdapter);
            SelectAdapter.prototype.current = function (callback) {
                var data = [];
                var self = this;
                this.$element.find(":selected").each(function () {
                    var $option = $(this);
                    var option = self.item($option);
                    data.push(option);
                });
                callback(data);
            };
            SelectAdapter.prototype.select = function (data) {
                var self = this;
                data.selected = true;
                if ($(data.element).is("option")) {
                    data.element.selected = true;
                    this.$element.trigger("input").trigger("change");
                    return;
                }
                if (this.$element.prop("multiple")) {
                    this.current(function (currentData) {
                        var val = [];
                        data = [data];
                        data.push.apply(data, currentData);
                        for (var d = 0; d < data.length; d++) {
                            var id = data[d].id;
                            if ($.inArray(id, val) === -1) {
                                val.push(id);
                            }
                        }
                        self.$element.val(val);
                        self.$element.trigger("input").trigger("change");
                    });
                } else {
                    var val = data.id;
                    this.$element.val(val);
                    this.$element.trigger("input").trigger("change");
                }
            };
            SelectAdapter.prototype.unselect = function (data) {
                var self = this;
                if (!this.$element.prop("multiple")) {
                    return;
                }
                data.selected = false;
                if ($(data.element).is("option")) {
                    data.element.selected = false;
                    this.$element.trigger("input").trigger("change");
                    return;
                }
                this.current(function (currentData) {
                    var val = [];
                    for (var d = 0; d < currentData.length; d++) {
                        var id = currentData[d].id;
                        if (id !== data.id && $.inArray(id, val) === -1) {
                            val.push(id);
                        }
                    }
                    self.$element.val(val);
                    self.$element.trigger("input").trigger("change");
                });
            };
            SelectAdapter.prototype.bind = function (container, $container) {
                var self = this;
                this.container = container;
                container.on("select", function (params) {
                    self.select(params.data);
                });
                container.on("unselect", function (params) {
                    self.unselect(params.data);
                });
            };
            SelectAdapter.prototype.destroy = function () {
                this.$element.find("*").each(function () {
                    Utils.RemoveData(this);
                });
            };
            SelectAdapter.prototype.query = function (params, callback) {
                var data = [];
                var self = this;
                var $options = this.$element.children();
                $options.each(function () {
                    var $option = $(this);
                    if (!$option.is("option") && !$option.is("optgroup")) {
                        return;
                    }
                    var option = self.item($option);
                    var matches = self.matches(params, option);
                    if (matches !== null) {
                        data.push(matches);
                    }
                });
                callback({ results: data });
            };
            SelectAdapter.prototype.addOptions = function ($options) {
                Utils.appendMany(this.$element, $options);
            };
            SelectAdapter.prototype.option = function (data) {
                var option;
                if (data.children) {
                    option = document.createElement("optgroup");
                    option.label = data.text;
                } else {
                    option = document.createElement("option");
                    if (option.textContent !== undefined) {
                        option.textContent = data.text;
                    } else {
                        option.innerText = data.text;
                    }
                }
                if (data.id !== undefined) {
                    option.value = data.id;
                }
                if (data.disabled) {
                    option.disabled = true;
                }
                if (data.selected) {
                    option.selected = true;
                }
                if (data.title) {
                    option.title = data.title;
                }
                var $option = $(option);
                var normalizedData = this._normalizeItem(data);
                normalizedData.element = option;
                Utils.StoreData(option, "data", normalizedData);
                return $option;
            };
            SelectAdapter.prototype.item = function ($option) {
                var data = {};
                data = Utils.GetData($option[0], "data");
                if (data != null) {
                    return data;
                }
                if ($option.is("option")) {
                    data = { id: $option.val(), text: $option.text(), disabled: $option.prop("disabled"), selected: $option.prop("selected"), title: $option.prop("title") };
                } else if ($option.is("optgroup")) {
                    data = { text: $option.prop("label"), children: [], title: $option.prop("title") };
                    var $children = $option.children("option");
                    var children = [];
                    for (var c = 0; c < $children.length; c++) {
                        var $child = $($children[c]);
                        var child = this.item($child);
                        children.push(child);
                    }
                    data.children = children;
                }
                data = this._normalizeItem(data);
                data.element = $option[0];
                Utils.StoreData($option[0], "data", data);
                return data;
            };
            SelectAdapter.prototype._normalizeItem = function (item) {
                if (item !== Object(item)) {
                    item = { id: item, text: item };
                }
                item = $.extend({}, { text: "" }, item);
                var defaults = { selected: false, disabled: false };
                if (item.id != null) {
                    item.id = item.id.toString();
                }
                if (item.text != null) {
                    item.text = item.text.toString();
                }
                if (item._resultId == null && item.id && this.container != null) {
                    item._resultId = this.generateResultId(this.container, item);
                }
                return $.extend({}, defaults, item);
            };
            SelectAdapter.prototype.matches = function (params, data) {
                var matcher = this.options.get("matcher");
                return matcher(params, data);
            };
            return SelectAdapter;
        });
        S2.define("select2/data/array", ["./select", "../utils", "jquery"], function (SelectAdapter, Utils, $) {
            function ArrayAdapter($element, options) {
                this._dataToConvert = options.get("data") || [];
                ArrayAdapter.__super__.constructor.call(this, $element, options);
            }
            Utils.Extend(ArrayAdapter, SelectAdapter);
            ArrayAdapter.prototype.bind = function (container, $container) {
                ArrayAdapter.__super__.bind.call(this, container, $container);
                this.addOptions(this.convertToOptions(this._dataToConvert));
            };
            ArrayAdapter.prototype.select = function (data) {
                var $option = this.$element.find("option").filter(function (i, elm) {
                    return elm.value == data.id.toString();
                });
                if ($option.length === 0) {
                    $option = this.option(data);
                    this.addOptions($option);
                }
                ArrayAdapter.__super__.select.call(this, data);
            };
            ArrayAdapter.prototype.convertToOptions = function (data) {
                var self = this;
                var $existing = this.$element.find("option");
                var existingIds = $existing
                    .map(function () {
                        return self.item($(this)).id;
                    })
                    .get();
                var $options = [];
                function onlyItem(item) {
                    return function () {
                        return $(this).val() == item.id;
                    };
                }
                for (var d = 0; d < data.length; d++) {
                    var item = this._normalizeItem(data[d]);
                    if ($.inArray(item.id, existingIds) >= 0) {
                        var $existingOption = $existing.filter(onlyItem(item));
                        var existingData = this.item($existingOption);
                        var newData = $.extend(true, {}, item, existingData);
                        var $newOption = this.option(newData);
                        $existingOption.replaceWith($newOption);
                        continue;
                    }
                    var $option = this.option(item);
                    if (item.children) {
                        var $children = this.convertToOptions(item.children);
                        Utils.appendMany($option, $children);
                    }
                    $options.push($option);
                }
                return $options;
            };
            return ArrayAdapter;
        });
        S2.define("select2/data/ajax", ["./array", "../utils", "jquery"], function (ArrayAdapter, Utils, $) {
            function AjaxAdapter($element, options) {
                this.ajaxOptions = this._applyDefaults(options.get("ajax"));
                if (this.ajaxOptions.processResults != null) {
                    this.processResults = this.ajaxOptions.processResults;
                }
                AjaxAdapter.__super__.constructor.call(this, $element, options);
            }
            Utils.Extend(AjaxAdapter, ArrayAdapter);
            AjaxAdapter.prototype._applyDefaults = function (options) {
                var defaults = {
                    data: function (params) {
                        return $.extend({}, params, { q: params.term });
                    },
                    transport: function (params, success, failure) {
                        var $request = $.ajax(params);
                        $request.then(success);
                        $request.fail(failure);
                        return $request;
                    },
                };
                return $.extend({}, defaults, options, true);
            };
            AjaxAdapter.prototype.processResults = function (results) {
                return results;
            };
            AjaxAdapter.prototype.query = function (params, callback) {
                var matches = [];
                var self = this;
                if (this._request != null) {
                    if ($.isFunction(this._request.abort)) {
                        this._request.abort();
                    }
                    this._request = null;
                }
                var options = $.extend({ type: "GET" }, this.ajaxOptions);
                if (typeof options.url === "function") {
                    options.url = options.url.call(this.$element, params);
                }
                if (typeof options.data === "function") {
                    options.data = options.data.call(this.$element, params);
                }
                function request() {
                    var $request = options.transport(
                        options,
                        function (data) {
                            var results = self.processResults(data, params);
                            if (self.options.get("debug") && window.console && console.error) {
                                if (!results || !results.results || !$.isArray(results.results)) {
                                    console.error("Select2: The AJAX results did not return an array in the " + "`results` key of the response.");
                                }
                            }
                            callback(results);
                        },
                        function () {
                            if ("status" in $request && ($request.status === 0 || $request.status === "0")) {
                                return;
                            }
                            self.trigger("results:message", { message: "errorLoading" });
                        }
                    );
                    self._request = $request;
                }
                if (this.ajaxOptions.delay && params.term != null) {
                    if (this._queryTimeout) {
                        window.clearTimeout(this._queryTimeout);
                    }
                    this._queryTimeout = window.setTimeout(request, this.ajaxOptions.delay);
                } else {
                    request();
                }
            };
            return AjaxAdapter;
        });
        S2.define("select2/data/tags", ["jquery"], function ($) {
            function Tags(decorated, $element, options) {
                var tags = options.get("tags");
                var createTag = options.get("createTag");
                if (createTag !== undefined) {
                    this.createTag = createTag;
                }
                var insertTag = options.get("insertTag");
                if (insertTag !== undefined) {
                    this.insertTag = insertTag;
                }
                decorated.call(this, $element, options);
                if ($.isArray(tags)) {
                    for (var t = 0; t < tags.length; t++) {
                        var tag = tags[t];
                        var item = this._normalizeItem(tag);
                        var $option = this.option(item);
                        this.$element.append($option);
                    }
                }
            }
            Tags.prototype.query = function (decorated, params, callback) {
                var self = this;
                this._removeOldTags();
                if (params.term == null || params.page != null) {
                    decorated.call(this, params, callback);
                    return;
                }
                function wrapper(obj, child) {
                    var data = obj.results;
                    for (var i = 0; i < data.length; i++) {
                        var option = data[i];
                        var checkChildren = option.children != null && !wrapper({ results: option.children }, true);
                        var optionText = (option.text || "").toUpperCase();
                        var paramsTerm = (params.term || "").toUpperCase();
                        var checkText = optionText === paramsTerm;
                        if (checkText || checkChildren) {
                            if (child) {
                                return false;
                            }
                            obj.data = data;
                            callback(obj);
                            return;
                        }
                    }
                    if (child) {
                        return true;
                    }
                    var tag = self.createTag(params);
                    if (tag != null) {
                        var $option = self.option(tag);
                        $option.attr("data-select2-tag", true);
                        self.addOptions([$option]);
                        self.insertTag(data, tag);
                    }
                    obj.results = data;
                    callback(obj);
                }
                decorated.call(this, params, wrapper);
            };
            Tags.prototype.createTag = function (decorated, params) {
                var term = $.trim(params.term);
                if (term === "") {
                    return null;
                }
                return { id: term, text: term };
            };
            Tags.prototype.insertTag = function (_, data, tag) {
                data.unshift(tag);
            };
            Tags.prototype._removeOldTags = function (_) {
                var $options = this.$element.find("option[data-select2-tag]");
                $options.each(function () {
                    if (this.selected) {
                        return;
                    }
                    $(this).remove();
                });
            };
            return Tags;
        });
        S2.define("select2/data/tokenizer", ["jquery"], function ($) {
            function Tokenizer(decorated, $element, options) {
                var tokenizer = options.get("tokenizer");
                if (tokenizer !== undefined) {
                    this.tokenizer = tokenizer;
                }
                decorated.call(this, $element, options);
            }
            Tokenizer.prototype.bind = function (decorated, container, $container) {
                decorated.call(this, container, $container);
                this.$search = container.dropdown.$search || container.selection.$search || $container.find(".select2-search__field");
            };
            Tokenizer.prototype.query = function (decorated, params, callback) {
                var self = this;
                function createAndSelect(data) {
                    var item = self._normalizeItem(data);
                    var $existingOptions = self.$element.find("option").filter(function () {
                        return $(this).val() === item.id;
                    });
                    if (!$existingOptions.length) {
                        var $option = self.option(item);
                        $option.attr("data-select2-tag", true);
                        self._removeOldTags();
                        self.addOptions([$option]);
                    }
                    select(item);
                }
                function select(data) {
                    self.trigger("select", { data: data });
                }
                params.term = params.term || "";
                var tokenData = this.tokenizer(params, this.options, createAndSelect);
                if (tokenData.term !== params.term) {
                    if (this.$search.length) {
                        this.$search.val(tokenData.term);
                        this.$search.trigger("focus");
                    }
                    params.term = tokenData.term;
                }
                decorated.call(this, params, callback);
            };
            Tokenizer.prototype.tokenizer = function (_, params, options, callback) {
                var separators = options.get("tokenSeparators") || [];
                var term = params.term;
                var i = 0;
                var createTag =
                    this.createTag ||
                    function (params) {
                        return { id: params.term, text: params.term };
                    };
                while (i < term.length) {
                    var termChar = term[i];
                    if ($.inArray(termChar, separators) === -1) {
                        i++;
                        continue;
                    }
                    var part = term.substr(0, i);
                    var partParams = $.extend({}, params, { term: part });
                    var data = createTag(partParams);
                    if (data == null) {
                        i++;
                        continue;
                    }
                    callback(data);
                    term = term.substr(i + 1) || "";
                    i = 0;
                }
                return { term: term };
            };
            return Tokenizer;
        });
        S2.define("select2/data/minimumInputLength", [], function () {
            function MinimumInputLength(decorated, $e, options) {
                this.minimumInputLength = options.get("minimumInputLength");
                decorated.call(this, $e, options);
            }
            MinimumInputLength.prototype.query = function (decorated, params, callback) {
                params.term = params.term || "";
                if (params.term.length < this.minimumInputLength) {
                    this.trigger("results:message", { message: "inputTooShort", args: { minimum: this.minimumInputLength, input: params.term, params: params } });
                    return;
                }
                decorated.call(this, params, callback);
            };
            return MinimumInputLength;
        });
        S2.define("select2/data/maximumInputLength", [], function () {
            function MaximumInputLength(decorated, $e, options) {
                this.maximumInputLength = options.get("maximumInputLength");
                decorated.call(this, $e, options);
            }
            MaximumInputLength.prototype.query = function (decorated, params, callback) {
                params.term = params.term || "";
                if (this.maximumInputLength > 0 && params.term.length > this.maximumInputLength) {
                    this.trigger("results:message", { message: "inputTooLong", args: { maximum: this.maximumInputLength, input: params.term, params: params } });
                    return;
                }
                decorated.call(this, params, callback);
            };
            return MaximumInputLength;
        });
        S2.define("select2/data/maximumSelectionLength", [], function () {
            function MaximumSelectionLength(decorated, $e, options) {
                this.maximumSelectionLength = options.get("maximumSelectionLength");
                decorated.call(this, $e, options);
            }
            MaximumSelectionLength.prototype.bind = function (decorated, container, $container) {
                var self = this;
                decorated.call(this, container, $container);
                container.on("select", function () {
                    self._checkIfMaximumSelected();
                });
            };
            MaximumSelectionLength.prototype.query = function (decorated, params, callback) {
                var self = this;
                this._checkIfMaximumSelected(function () {
                    decorated.call(self, params, callback);
                });
            };
            MaximumSelectionLength.prototype._checkIfMaximumSelected = function (_, successCallback) {
                var self = this;
                this.current(function (currentData) {
                    var count = currentData != null ? currentData.length : 0;
                    if (self.maximumSelectionLength > 0 && count >= self.maximumSelectionLength) {
                        self.trigger("results:message", { message: "maximumSelected", args: { maximum: self.maximumSelectionLength } });
                        return;
                    }
                    if (successCallback) {
                        successCallback();
                    }
                });
            };
            return MaximumSelectionLength;
        });
        S2.define("select2/dropdown", ["jquery", "./utils"], function ($, Utils) {
            function Dropdown($element, options) {
                this.$element = $element;
                this.options = options;
                Dropdown.__super__.constructor.call(this);
            }
            Utils.Extend(Dropdown, Utils.Observable);
            Dropdown.prototype.render = function () {
                var $dropdown = $('<span class="select2-dropdown">' + '<span class="select2-results"></span>' + "</span>");
                $dropdown.attr("dir", this.options.get("dir"));
                this.$dropdown = $dropdown;
                return $dropdown;
            };
            Dropdown.prototype.bind = function () {};
            Dropdown.prototype.position = function ($dropdown, $container) {};
            Dropdown.prototype.destroy = function () {
                this.$dropdown.remove();
            };
            return Dropdown;
        });
        S2.define("select2/dropdown/search", ["jquery", "../utils"], function ($, Utils) {
            function Search() {}
            Search.prototype.render = function (decorated) {
                var $rendered = decorated.call(this);
                var $search = $(
                    '<span class="select2-search select2-search--dropdown">' +
                        '<input class="select2-search__field" type="search" tabindex="-1"' +
                        ' autocomplete="off" autocorrect="off" autocapitalize="none"' +
                        ' spellcheck="false" role="searchbox" aria-autocomplete="list" />' +
                        "</span>"
                );
                this.$searchContainer = $search;
                this.$search = $search.find("input");
                $rendered.prepend($search);
                return $rendered;
            };
            Search.prototype.bind = function (decorated, container, $container) {
                var self = this;
                var resultsId = container.id + "-results";
                decorated.call(this, container, $container);
                this.$search.on("keydown", function (evt) {
                    self.trigger("keypress", evt);
                    self._keyUpPrevented = evt.isDefaultPrevented();
                });
                this.$search.on("input", function (evt) {
                    $(this).off("keyup");
                });
                this.$search.on("keyup input", function (evt) {
                    self.handleSearch(evt);
                });
                container.on("open", function () {
                    self.$search.attr("tabindex", 0);
                    self.$search.attr("aria-controls", resultsId);
                    self.$search.trigger("focus");
                    window.setTimeout(function () {
                        self.$search.trigger("focus");
                    }, 0);
                });
                container.on("close", function () {
                    self.$search.attr("tabindex", -1);
                    self.$search.removeAttr("aria-controls");
                    self.$search.removeAttr("aria-activedescendant");
                    self.$search.val("");
                    self.$search.trigger("blur");
                });
                container.on("focus", function () {
                    if (!container.isOpen()) {
                        self.$search.trigger("focus");
                    }
                });
                container.on("results:all", function (params) {
                    if (params.query.term == null || params.query.term === "") {
                        var showSearch = self.showSearch(params);
                        if (showSearch) {
                            self.$searchContainer.removeClass("select2-search--hide");
                        } else {
                            self.$searchContainer.addClass("select2-search--hide");
                        }
                    }
                });
                container.on("results:focus", function (params) {
                    if (params.data._resultId) {
                        self.$search.attr("aria-activedescendant", params.data._resultId);
                    } else {
                        self.$search.removeAttr("aria-activedescendant");
                    }
                });
            };
            Search.prototype.handleSearch = function (evt) {
                if (!this._keyUpPrevented) {
                    var input = this.$search.val();
                    this.trigger("query", { term: input });
                }
                this._keyUpPrevented = false;
            };
            Search.prototype.showSearch = function (_, params) {
                return true;
            };
            return Search;
        });
        S2.define("select2/dropdown/hidePlaceholder", [], function () {
            function HidePlaceholder(decorated, $element, options, dataAdapter) {
                this.placeholder = this.normalizePlaceholder(options.get("placeholder"));
                decorated.call(this, $element, options, dataAdapter);
            }
            HidePlaceholder.prototype.append = function (decorated, data) {
                data.results = this.removePlaceholder(data.results);
                decorated.call(this, data);
            };
            HidePlaceholder.prototype.normalizePlaceholder = function (_, placeholder) {
                if (typeof placeholder === "string") {
                    placeholder = { id: "", text: placeholder };
                }
                return placeholder;
            };
            HidePlaceholder.prototype.removePlaceholder = function (_, data) {
                var modifiedData = data.slice(0);
                for (var d = data.length - 1; d >= 0; d--) {
                    var item = data[d];
                    if (this.placeholder.id === item.id) {
                        modifiedData.splice(d, 1);
                    }
                }
                return modifiedData;
            };
            return HidePlaceholder;
        });
        S2.define("select2/dropdown/infiniteScroll", ["jquery"], function ($) {
            function InfiniteScroll(decorated, $element, options, dataAdapter) {
                this.lastParams = {};
                decorated.call(this, $element, options, dataAdapter);
                this.$loadingMore = this.createLoadingMore();
                this.loading = false;
            }
            InfiniteScroll.prototype.append = function (decorated, data) {
                this.$loadingMore.remove();
                this.loading = false;
                decorated.call(this, data);
                if (this.showLoadingMore(data)) {
                    this.$results.append(this.$loadingMore);
                    this.loadMoreIfNeeded();
                }
            };
            InfiniteScroll.prototype.bind = function (decorated, container, $container) {
                var self = this;
                decorated.call(this, container, $container);
                container.on("query", function (params) {
                    self.lastParams = params;
                    self.loading = true;
                });
                container.on("query:append", function (params) {
                    self.lastParams = params;
                    self.loading = true;
                });
                this.$results.on("scroll", this.loadMoreIfNeeded.bind(this));
            };
            InfiniteScroll.prototype.loadMoreIfNeeded = function () {
                var isLoadMoreVisible = $.contains(document.documentElement, this.$loadingMore[0]);
                if (this.loading || !isLoadMoreVisible) {
                    return;
                }
                var currentOffset = this.$results.offset().top + this.$results.outerHeight(false);
                var loadingMoreOffset = this.$loadingMore.offset().top + this.$loadingMore.outerHeight(false);
                if (currentOffset + 50 >= loadingMoreOffset) {
                    this.loadMore();
                }
            };
            InfiniteScroll.prototype.loadMore = function () {
                this.loading = true;
                var params = $.extend({}, { page: 1 }, this.lastParams);
                params.page++;
                this.trigger("query:append", params);
            };
            InfiniteScroll.prototype.showLoadingMore = function (_, data) {
                return data.pagination && data.pagination.more;
            };
            InfiniteScroll.prototype.createLoadingMore = function () {
                var $option = $("<li " + 'class="select2-results__option select2-results__option--load-more"' + 'role="option" aria-disabled="true"></li>');
                var message = this.options.get("translations").get("loadingMore");
                $option.html(message(this.lastParams));
                return $option;
            };
            return InfiniteScroll;
        });
        S2.define("select2/dropdown/attachBody", ["jquery", "../utils"], function ($, Utils) {
            function AttachBody(decorated, $element, options) {
                this.$dropdownParent = $(options.get("dropdownParent") || document.body);
                decorated.call(this, $element, options);
            }
            AttachBody.prototype.bind = function (decorated, container, $container) {
                var self = this;
                decorated.call(this, container, $container);
                container.on("open", function () {
                    self._showDropdown();
                    self._attachPositioningHandler(container);
                    self._bindContainerResultHandlers(container);
                });
                container.on("close", function () {
                    self._hideDropdown();
                    self._detachPositioningHandler(container);
                });
                this.$dropdownContainer.on("mousedown", function (evt) {
                    evt.stopPropagation();
                });
            };
            AttachBody.prototype.destroy = function (decorated) {
                decorated.call(this);
                this.$dropdownContainer.remove();
            };
            AttachBody.prototype.position = function (decorated, $dropdown, $container) {
                $dropdown.attr("class", $container.attr("class"));
                $dropdown.removeClass("select2");
                $dropdown.addClass("select2-container--open");
                $dropdown.css({ position: "absolute", top: -999999 });
                this.$container = $container;
            };
            AttachBody.prototype.render = function (decorated) {
                var $container = $("<span></span>");
                var $dropdown = decorated.call(this);
                $container.append($dropdown);
                this.$dropdownContainer = $container;
                return $container;
            };
            AttachBody.prototype._hideDropdown = function (decorated) {
                this.$dropdownContainer.detach();
            };
            AttachBody.prototype._bindContainerResultHandlers = function (decorated, container) {
                if (this._containerResultsHandlersBound) {
                    return;
                }
                var self = this;
                container.on("results:all", function () {
                    self._positionDropdown();
                    self._resizeDropdown();
                });
                container.on("results:append", function () {
                    self._positionDropdown();
                    self._resizeDropdown();
                });
                container.on("results:message", function () {
                    self._positionDropdown();
                    self._resizeDropdown();
                });
                container.on("select", function () {
                    self._positionDropdown();
                    self._resizeDropdown();
                });
                container.on("unselect", function () {
                    self._positionDropdown();
                    self._resizeDropdown();
                });
                this._containerResultsHandlersBound = true;
            };
            AttachBody.prototype._attachPositioningHandler = function (decorated, container) {
                var self = this;
                var scrollEvent = "scroll.select2." + container.id;
                var resizeEvent = "resize.select2." + container.id;
                var orientationEvent = "orientationchange.select2." + container.id;
                var $watchers = this.$container.parents().filter(Utils.hasScroll);
                $watchers.each(function () {
                    Utils.StoreData(this, "select2-scroll-position", { x: $(this).scrollLeft(), y: $(this).scrollTop() });
                });
                $watchers.on(scrollEvent, function (ev) {
                    var position = Utils.GetData(this, "select2-scroll-position");
                    $(this).scrollTop(position.y);
                });
                $(window).on(scrollEvent + " " + resizeEvent + " " + orientationEvent, function (e) {
                    self._positionDropdown();
                    self._resizeDropdown();
                });
            };
            AttachBody.prototype._detachPositioningHandler = function (decorated, container) {
                var scrollEvent = "scroll.select2." + container.id;
                var resizeEvent = "resize.select2." + container.id;
                var orientationEvent = "orientationchange.select2." + container.id;
                var $watchers = this.$container.parents().filter(Utils.hasScroll);
                $watchers.off(scrollEvent);
                $(window).off(scrollEvent + " " + resizeEvent + " " + orientationEvent);
            };
            AttachBody.prototype._positionDropdown = function () {
                var $window = $(window);
                var isCurrentlyAbove = this.$dropdown.hasClass("select2-dropdown--above");
                var isCurrentlyBelow = this.$dropdown.hasClass("select2-dropdown--below");
                var newDirection = null;
                var offset = this.$container.offset();
                offset.bottom = offset.top + this.$container.outerHeight(false);
                var container = { height: this.$container.outerHeight(false) };
                container.top = offset.top;
                container.bottom = offset.top + container.height;
                var dropdown = { height: this.$dropdown.outerHeight(false) };
                var viewport = { top: $window.scrollTop(), bottom: $window.scrollTop() + $window.height() };
                var enoughRoomAbove = viewport.top < offset.top - dropdown.height;
                var enoughRoomBelow = viewport.bottom > offset.bottom + dropdown.height;
                var css = { left: offset.left, top: container.bottom };
                var $offsetParent = this.$dropdownParent;
                if ($offsetParent.css("position") === "static") {
                    $offsetParent = $offsetParent.offsetParent();
                }
                var parentOffset = { top: 0, left: 0 };
                if ($.contains(document.body, $offsetParent[0]) || $offsetParent[0].isConnected) {
                    parentOffset = $offsetParent.offset();
                }
                css.top -= parentOffset.top;
                css.left -= parentOffset.left;
                if (!isCurrentlyAbove && !isCurrentlyBelow) {
                    newDirection = "below";
                }
                if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
                    newDirection = "above";
                } else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
                    newDirection = "below";
                }
                if (newDirection == "above" || (isCurrentlyAbove && newDirection !== "below")) {
                    css.top = container.top - parentOffset.top - dropdown.height;
                }
                if (newDirection != null) {
                    this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--" + newDirection);
                    this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--" + newDirection);
                }
                this.$dropdownContainer.css(css);
            };
            AttachBody.prototype._resizeDropdown = function () {
                var css = { width: this.$container.outerWidth(false) + "px" };
                if (this.options.get("dropdownAutoWidth")) {
                    css.minWidth = css.width;
                    css.position = "relative";
                    css.width = "auto";
                }
                this.$dropdown.css(css);
            };
            AttachBody.prototype._showDropdown = function (decorated) {
                this.$dropdownContainer.appendTo(this.$dropdownParent);
                this._positionDropdown();
                this._resizeDropdown();
            };
            return AttachBody;
        });
        S2.define("select2/dropdown/minimumResultsForSearch", [], function () {
            function countResults(data) {
                var count = 0;
                for (var d = 0; d < data.length; d++) {
                    var item = data[d];
                    if (item.children) {
                        count += countResults(item.children);
                    } else {
                        count++;
                    }
                }
                return count;
            }
            function MinimumResultsForSearch(decorated, $element, options, dataAdapter) {
                this.minimumResultsForSearch = options.get("minimumResultsForSearch");
                if (this.minimumResultsForSearch < 0) {
                    this.minimumResultsForSearch = Infinity;
                }
                decorated.call(this, $element, options, dataAdapter);
            }
            MinimumResultsForSearch.prototype.showSearch = function (decorated, params) {
                if (countResults(params.data.results) < this.minimumResultsForSearch) {
                    return false;
                }
                return decorated.call(this, params);
            };
            return MinimumResultsForSearch;
        });
        S2.define("select2/dropdown/selectOnClose", ["../utils"], function (Utils) {
            function SelectOnClose() {}
            SelectOnClose.prototype.bind = function (decorated, container, $container) {
                var self = this;
                decorated.call(this, container, $container);
                container.on("close", function (params) {
                    self._handleSelectOnClose(params);
                });
            };
            SelectOnClose.prototype._handleSelectOnClose = function (_, params) {
                if (params && params.originalSelect2Event != null) {
                    var event = params.originalSelect2Event;
                    if (event._type === "select" || event._type === "unselect") {
                        return;
                    }
                }
                var $highlightedResults = this.getHighlightedResults();
                if ($highlightedResults.length < 1) {
                    return;
                }
                var data = Utils.GetData($highlightedResults[0], "data");
                if ((data.element != null && data.element.selected) || (data.element == null && data.selected)) {
                    return;
                }
                this.trigger("select", { data: data });
            };
            return SelectOnClose;
        });
        S2.define("select2/dropdown/closeOnSelect", [], function () {
            function CloseOnSelect() {}
            CloseOnSelect.prototype.bind = function (decorated, container, $container) {
                var self = this;
                decorated.call(this, container, $container);
                container.on("select", function (evt) {
                    self._selectTriggered(evt);
                });
                container.on("unselect", function (evt) {
                    self._selectTriggered(evt);
                });
            };
            CloseOnSelect.prototype._selectTriggered = function (_, evt) {
                var originalEvent = evt.originalEvent;
                if (originalEvent && (originalEvent.ctrlKey || originalEvent.metaKey)) {
                    return;
                }
                this.trigger("close", { originalEvent: originalEvent, originalSelect2Event: evt });
            };
            return CloseOnSelect;
        });
        S2.define("select2/i18n/en", [], function () {
            return {
                errorLoading: function () {
                    return "The results could not be loaded.";
                },
                inputTooLong: function (args) {
                    var overChars = args.input.length - args.maximum;
                    var message = "Please delete " + overChars + " character";
                    if (overChars != 1) {
                        message += "s";
                    }
                    return message;
                },
                inputTooShort: function (args) {
                    var remainingChars = args.minimum - args.input.length;
                    var message = "Please enter " + remainingChars + " or more characters";
                    return message;
                },
                loadingMore: function () {
                    return "Loading more resultsâ€¦";
                },
                maximumSelected: function (args) {
                    var message = "You can only select " + args.maximum + " item";
                    if (args.maximum != 1) {
                        message += "s";
                    }
                    return message;
                },
                noResults: function () {
                    return "No results found";
                },
                searching: function () {
                    return "Searchingâ€¦";
                },
                removeAllItems: function () {
                    return "Remove all items";
                },
            };
        });
        S2.define(
            "select2/defaults",
            [
                "jquery",
                "require",
                "./results",
                "./selection/single",
                "./selection/multiple",
                "./selection/placeholder",
                "./selection/allowClear",
                "./selection/search",
                "./selection/eventRelay",
                "./utils",
                "./translation",
                "./diacritics",
                "./data/select",
                "./data/array",
                "./data/ajax",
                "./data/tags",
                "./data/tokenizer",
                "./data/minimumInputLength",
                "./data/maximumInputLength",
                "./data/maximumSelectionLength",
                "./dropdown",
                "./dropdown/search",
                "./dropdown/hidePlaceholder",
                "./dropdown/infiniteScroll",
                "./dropdown/attachBody",
                "./dropdown/minimumResultsForSearch",
                "./dropdown/selectOnClose",
                "./dropdown/closeOnSelect",
                "./i18n/en",
            ],
            function (
                $,
                require,
                ResultsList,
                SingleSelection,
                MultipleSelection,
                Placeholder,
                AllowClear,
                SelectionSearch,
                EventRelay,
                Utils,
                Translation,
                DIACRITICS,
                SelectData,
                ArrayData,
                AjaxData,
                Tags,
                Tokenizer,
                MinimumInputLength,
                MaximumInputLength,
                MaximumSelectionLength,
                Dropdown,
                DropdownSearch,
                HidePlaceholder,
                InfiniteScroll,
                AttachBody,
                MinimumResultsForSearch,
                SelectOnClose,
                CloseOnSelect,
                EnglishTranslation
            ) {
                function Defaults() {
                    this.reset();
                }
                Defaults.prototype.apply = function (options) {
                    options = $.extend(true, {}, this.defaults, options);
                    if (options.dataAdapter == null) {
                        if (options.ajax != null) {
                            options.dataAdapter = AjaxData;
                        } else if (options.data != null) {
                            options.dataAdapter = ArrayData;
                        } else {
                            options.dataAdapter = SelectData;
                        }
                        if (options.minimumInputLength > 0) {
                            options.dataAdapter = Utils.Decorate(options.dataAdapter, MinimumInputLength);
                        }
                        if (options.maximumInputLength > 0) {
                            options.dataAdapter = Utils.Decorate(options.dataAdapter, MaximumInputLength);
                        }
                        if (options.maximumSelectionLength > 0) {
                            options.dataAdapter = Utils.Decorate(options.dataAdapter, MaximumSelectionLength);
                        }
                        if (options.tags) {
                            options.dataAdapter = Utils.Decorate(options.dataAdapter, Tags);
                        }
                        if (options.tokenSeparators != null || options.tokenizer != null) {
                            options.dataAdapter = Utils.Decorate(options.dataAdapter, Tokenizer);
                        }
                        if (options.query != null) {
                            var Query = require(options.amdBase + "compat/query");
                            options.dataAdapter = Utils.Decorate(options.dataAdapter, Query);
                        }
                        if (options.initSelection != null) {
                            var InitSelection = require(options.amdBase + "compat/initSelection");
                            options.dataAdapter = Utils.Decorate(options.dataAdapter, InitSelection);
                        }
                    }
                    if (options.resultsAdapter == null) {
                        options.resultsAdapter = ResultsList;
                        if (options.ajax != null) {
                            options.resultsAdapter = Utils.Decorate(options.resultsAdapter, InfiniteScroll);
                        }
                        if (options.placeholder != null) {
                            options.resultsAdapter = Utils.Decorate(options.resultsAdapter, HidePlaceholder);
                        }
                        if (options.selectOnClose) {
                            options.resultsAdapter = Utils.Decorate(options.resultsAdapter, SelectOnClose);
                        }
                    }
                    if (options.dropdownAdapter == null) {
                        if (options.multiple) {
                            options.dropdownAdapter = Dropdown;
                        } else {
                            var SearchableDropdown = Utils.Decorate(Dropdown, DropdownSearch);
                            options.dropdownAdapter = SearchableDropdown;
                        }
                        if (options.minimumResultsForSearch !== 0) {
                            options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, MinimumResultsForSearch);
                        }
                        if (options.closeOnSelect) {
                            options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, CloseOnSelect);
                        }
                        if (options.dropdownCssClass != null || options.dropdownCss != null || options.adaptDropdownCssClass != null) {
                            var DropdownCSS = require(options.amdBase + "compat/dropdownCss");
                            options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, DropdownCSS);
                        }
                        options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, AttachBody);
                    }
                    if (options.selectionAdapter == null) {
                        if (options.multiple) {
                            options.selectionAdapter = MultipleSelection;
                        } else {
                            options.selectionAdapter = SingleSelection;
                        }
                        if (options.placeholder != null) {
                            options.selectionAdapter = Utils.Decorate(options.selectionAdapter, Placeholder);
                        }
                        if (options.allowClear) {
                            options.selectionAdapter = Utils.Decorate(options.selectionAdapter, AllowClear);
                        }
                        if (options.multiple) {
                            options.selectionAdapter = Utils.Decorate(options.selectionAdapter, SelectionSearch);
                        }
                        if (options.containerCssClass != null || options.containerCss != null || options.adaptContainerCssClass != null) {
                            var ContainerCSS = require(options.amdBase + "compat/containerCss");
                            options.selectionAdapter = Utils.Decorate(options.selectionAdapter, ContainerCSS);
                        }
                        options.selectionAdapter = Utils.Decorate(options.selectionAdapter, EventRelay);
                    }
                    options.language = this._resolveLanguage(options.language);
                    options.language.push("en");
                    var uniqueLanguages = [];
                    for (var l = 0; l < options.language.length; l++) {
                        var language = options.language[l];
                        if (uniqueLanguages.indexOf(language) === -1) {
                            uniqueLanguages.push(language);
                        }
                    }
                    options.language = uniqueLanguages;
                    options.translations = this._processTranslations(options.language, options.debug);
                    return options;
                };
                Defaults.prototype.reset = function () {
                    function stripDiacritics(text) {
                        function match(a) {
                            return DIACRITICS[a] || a;
                        }
                        return text.replace(/[^\u0000-\u007E]/g, match);
                    }
                    function matcher(params, data) {
                        if ($.trim(params.term) === "") {
                            return data;
                        }
                        if (data.children && data.children.length > 0) {
                            var match = $.extend(true, {}, data);
                            for (var c = data.children.length - 1; c >= 0; c--) {
                                var child = data.children[c];
                                var matches = matcher(params, child);
                                if (matches == null) {
                                    match.children.splice(c, 1);
                                }
                            }
                            if (match.children.length > 0) {
                                return match;
                            }
                            return matcher(params, match);
                        }
                        var original = stripDiacritics(data.text).toUpperCase();
                        var term = stripDiacritics(params.term).toUpperCase();
                        if (original.indexOf(term) > -1) {
                            return data;
                        }
                        return null;
                    }
                    this.defaults = {
                        amdBase: "./",
                        amdLanguageBase: "./i18n/",
                        closeOnSelect: true,
                        debug: false,
                        dropdownAutoWidth: false,
                        escapeMarkup: Utils.escapeMarkup,
                        language: {},
                        matcher: matcher,
                        minimumInputLength: 0,
                        maximumInputLength: 0,
                        maximumSelectionLength: 0,
                        minimumResultsForSearch: 0,
                        selectOnClose: false,
                        scrollAfterSelect: false,
                        sorter: function (data) {
                            return data;
                        },
                        templateResult: function (result) {
                            return result.text;
                        },
                        templateSelection: function (selection) {
                            return selection.text;
                        },
                        theme: "default",
                        width: "resolve",
                    };
                };
                Defaults.prototype.applyFromElement = function (options, $element) {
                    var optionLanguage = options.language;
                    var defaultLanguage = this.defaults.language;
                    var elementLanguage = $element.prop("lang");
                    var parentLanguage = $element.closest("[lang]").prop("lang");
                    var languages = Array.prototype.concat.call(this._resolveLanguage(elementLanguage), this._resolveLanguage(optionLanguage), this._resolveLanguage(defaultLanguage), this._resolveLanguage(parentLanguage));
                    options.language = languages;
                    return options;
                };
                Defaults.prototype._resolveLanguage = function (language) {
                    if (!language) {
                        return [];
                    }
                    if ($.isEmptyObject(language)) {
                        return [];
                    }
                    if ($.isPlainObject(language)) {
                        return [language];
                    }
                    var languages;
                    if (!$.isArray(language)) {
                        languages = [language];
                    } else {
                        languages = language;
                    }
                    var resolvedLanguages = [];
                    for (var l = 0; l < languages.length; l++) {
                        resolvedLanguages.push(languages[l]);
                        if (typeof languages[l] === "string" && languages[l].indexOf("-") > 0) {
                            var languageParts = languages[l].split("-");
                            var baseLanguage = languageParts[0];
                            resolvedLanguages.push(baseLanguage);
                        }
                    }
                    return resolvedLanguages;
                };
                Defaults.prototype._processTranslations = function (languages, debug) {
                    var translations = new Translation();
                    for (var l = 0; l < languages.length; l++) {
                        var languageData = new Translation();
                        var language = languages[l];
                        if (typeof language === "string") {
                            try {
                                languageData = Translation.loadPath(language);
                            } catch (e) {
                                try {
                                    language = this.defaults.amdLanguageBase + language;
                                    languageData = Translation.loadPath(language);
                                } catch (ex) {
                                    if (debug && window.console && console.warn) {
                                        console.warn('Select2: The language file for "' + language + '" could ' + "not be automatically loaded. A fallback will be used instead.");
                                    }
                                }
                            }
                        } else if ($.isPlainObject(language)) {
                            languageData = new Translation(language);
                        } else {
                            languageData = language;
                        }
                        translations.extend(languageData);
                    }
                    return translations;
                };
                Defaults.prototype.set = function (key, value) {
                    var camelKey = $.camelCase(key);
                    var data = {};
                    data[camelKey] = value;
                    var convertedData = Utils._convertData(data);
                    $.extend(true, this.defaults, convertedData);
                };
                var defaults = new Defaults();
                return defaults;
            }
        );
        S2.define("select2/options", ["require", "jquery", "./defaults", "./utils"], function (require, $, Defaults, Utils) {
            function Options(options, $element) {
                this.options = options;
                if ($element != null) {
                    this.fromElement($element);
                }
                if ($element != null) {
                    this.options = Defaults.applyFromElement(this.options, $element);
                }
                this.options = Defaults.apply(this.options);
                if ($element && $element.is("input")) {
                    var InputCompat = require(this.get("amdBase") + "compat/inputData");
                    this.options.dataAdapter = Utils.Decorate(this.options.dataAdapter, InputCompat);
                }
            }
            Options.prototype.fromElement = function ($e) {
                var excludedData = ["select2"];
                if (this.options.multiple == null) {
                    this.options.multiple = $e.prop("multiple");
                }
                if (this.options.disabled == null) {
                    this.options.disabled = $e.prop("disabled");
                }
                if (this.options.dir == null) {
                    if ($e.prop("dir")) {
                        this.options.dir = $e.prop("dir");
                    } else if ($e.closest("[dir]").prop("dir")) {
                        this.options.dir = $e.closest("[dir]").prop("dir");
                    } else {
                        this.options.dir = "ltr";
                    }
                }
                $e.prop("disabled", this.options.disabled);
                $e.prop("multiple", this.options.multiple);
                if (Utils.GetData($e[0], "select2Tags")) {
                    if (this.options.debug && window.console && console.warn) {
                        console.warn("Select2: The `data-select2-tags` attribute has been changed to " + 'use the `data-data` and `data-tags="true"` attributes and will be ' + "removed in future versions of Select2.");
                    }
                    Utils.StoreData($e[0], "data", Utils.GetData($e[0], "select2Tags"));
                    Utils.StoreData($e[0], "tags", true);
                }
                if (Utils.GetData($e[0], "ajaxUrl")) {
                    if (this.options.debug && window.console && console.warn) {
                        console.warn("Select2: The `data-ajax-url` attribute has been changed to " + "`data-ajax--url` and support for the old attribute will be removed" + " in future versions of Select2.");
                    }
                    $e.attr("ajax--url", Utils.GetData($e[0], "ajaxUrl"));
                    Utils.StoreData($e[0], "ajax-Url", Utils.GetData($e[0], "ajaxUrl"));
                }
                var dataset = {};
                function upperCaseLetter(_, letter) {
                    return letter.toUpperCase();
                }
                for (var attr = 0; attr < $e[0].attributes.length; attr++) {
                    var attributeName = $e[0].attributes[attr].name;
                    var prefix = "data-";
                    if (attributeName.substr(0, prefix.length) == prefix) {
                        var dataName = attributeName.substring(prefix.length);
                        var dataValue = Utils.GetData($e[0], dataName);
                        var camelDataName = dataName.replace(/-([a-z])/g, upperCaseLetter);
                        dataset[camelDataName] = dataValue;
                    }
                }
                if ($.fn.jquery && $.fn.jquery.substr(0, 2) == "1." && $e[0].dataset) {
                    dataset = $.extend(true, {}, $e[0].dataset, dataset);
                }
                var data = $.extend(true, {}, Utils.GetData($e[0]), dataset);
                data = Utils._convertData(data);
                for (var key in data) {
                    if ($.inArray(key, excludedData) > -1) {
                        continue;
                    }
                    if ($.isPlainObject(this.options[key])) {
                        $.extend(this.options[key], data[key]);
                    } else {
                        this.options[key] = data[key];
                    }
                }
                return this;
            };
            Options.prototype.get = function (key) {
                return this.options[key];
            };
            Options.prototype.set = function (key, val) {
                this.options[key] = val;
            };
            return Options;
        });
        S2.define("select2/core", ["jquery", "./options", "./utils", "./keys"], function ($, Options, Utils, KEYS) {
            var Select2 = function ($element, options) {
                if (Utils.GetData($element[0], "select2") != null) {
                    Utils.GetData($element[0], "select2").destroy();
                }
                this.$element = $element;
                this.id = this._generateId($element);
                options = options || {};
                this.options = new Options(options, $element);
                Select2.__super__.constructor.call(this);
                var tabindex = $element.attr("tabindex") || 0;
                Utils.StoreData($element[0], "old-tabindex", tabindex);
                $element.attr("tabindex", "-1");
                var DataAdapter = this.options.get("dataAdapter");
                this.dataAdapter = new DataAdapter($element, this.options);
                var $container = this.render();
                this._placeContainer($container);
                var SelectionAdapter = this.options.get("selectionAdapter");
                this.selection = new SelectionAdapter($element, this.options);
                this.$selection = this.selection.render();
                this.selection.position(this.$selection, $container);
                var DropdownAdapter = this.options.get("dropdownAdapter");
                this.dropdown = new DropdownAdapter($element, this.options);
                this.$dropdown = this.dropdown.render();
                this.dropdown.position(this.$dropdown, $container);
                var ResultsAdapter = this.options.get("resultsAdapter");
                this.results = new ResultsAdapter($element, this.options, this.dataAdapter);
                this.$results = this.results.render();
                this.results.position(this.$results, this.$dropdown);
                var self = this;
                this._bindAdapters();
                this._registerDomEvents();
                this._registerDataEvents();
                this._registerSelectionEvents();
                this._registerDropdownEvents();
                this._registerResultsEvents();
                this._registerEvents();
                this.dataAdapter.current(function (initialData) {
                    self.trigger("selection:update", { data: initialData });
                });
                $element.addClass("select2-hidden-accessible");
                $element.attr("aria-hidden", "true");
                this._syncAttributes();
                Utils.StoreData($element[0], "select2", this);
                $element.data("select2", this);
            };
            Utils.Extend(Select2, Utils.Observable);
            Select2.prototype._generateId = function ($element) {
                var id = "";
                if ($element.attr("id") != null) {
                    id = $element.attr("id");
                } else if ($element.attr("name") != null) {
                    id = $element.attr("name") + "-" + Utils.generateChars(2);
                } else {
                    id = Utils.generateChars(4);
                }
                id = id.replace(/(:|\.|\[|\]|,)/g, "");
                id = "select2-" + id;
                return id;
            };
            Select2.prototype._placeContainer = function ($container) {
                $container.insertAfter(this.$element);
                var width = this._resolveWidth(this.$element, this.options.get("width"));
                if (width != null) {
                    $container.css("width", width);
                }
            };
            Select2.prototype._resolveWidth = function ($element, method) {
                var WIDTH = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;
                if (method == "resolve") {
                    var styleWidth = this._resolveWidth($element, "style");
                    if (styleWidth != null) {
                        return styleWidth;
                    }
                    return this._resolveWidth($element, "element");
                }
                if (method == "element") {
                    var elementWidth = $element.outerWidth(false);
                    if (elementWidth <= 0) {
                        return "auto";
                    }
                    return elementWidth + "px";
                }
                if (method == "style") {
                    var style = $element.attr("style");
                    if (typeof style !== "string") {
                        return null;
                    }
                    var attrs = style.split(";");
                    for (var i = 0, l = attrs.length; i < l; i = i + 1) {
                        var attr = attrs[i].replace(/\s/g, "");
                        var matches = attr.match(WIDTH);
                        if (matches !== null && matches.length >= 1) {
                            return matches[1];
                        }
                    }
                    return null;
                }
                if (method == "computedstyle") {
                    var computedStyle = window.getComputedStyle($element[0]);
                    return computedStyle.width;
                }
                return method;
            };
            Select2.prototype._bindAdapters = function () {
                this.dataAdapter.bind(this, this.$container);
                this.selection.bind(this, this.$container);
                this.dropdown.bind(this, this.$container);
                this.results.bind(this, this.$container);
            };
            Select2.prototype._registerDomEvents = function () {
                var self = this;
                this.$element.on("change.select2", function () {
                    self.dataAdapter.current(function (data) {
                        self.trigger("selection:update", { data: data });
                    });
                });
                this.$element.on("focus.select2", function (evt) {
                    self.trigger("focus", evt);
                });
                this._syncA = Utils.bind(this._syncAttributes, this);
                this._syncS = Utils.bind(this._syncSubtree, this);
                if (this.$element[0].attachEvent) {
                    this.$element[0].attachEvent("onpropertychange", this._syncA);
                }
                var observer = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                if (observer != null) {
                    this._observer = new observer(function (mutations) {
                        self._syncA();
                        self._syncS(null, mutations);
                    });
                    this._observer.observe(this.$element[0], { attributes: true, childList: true, subtree: false });
                } else if (this.$element[0].addEventListener) {
                    this.$element[0].addEventListener("DOMAttrModified", self._syncA, false);
                    this.$element[0].addEventListener("DOMNodeInserted", self._syncS, false);
                    this.$element[0].addEventListener("DOMNodeRemoved", self._syncS, false);
                }
            };
            Select2.prototype._registerDataEvents = function () {
                var self = this;
                this.dataAdapter.on("*", function (name, params) {
                    self.trigger(name, params);
                });
            };
            Select2.prototype._registerSelectionEvents = function () {
                var self = this;
                var nonRelayEvents = ["toggle", "focus"];
                this.selection.on("toggle", function () {
                    self.toggleDropdown();
                });
                this.selection.on("focus", function (params) {
                    self.focus(params);
                });
                this.selection.on("*", function (name, params) {
                    if ($.inArray(name, nonRelayEvents) !== -1) {
                        return;
                    }
                    self.trigger(name, params);
                });
            };
            Select2.prototype._registerDropdownEvents = function () {
                var self = this;
                this.dropdown.on("*", function (name, params) {
                    self.trigger(name, params);
                });
            };
            Select2.prototype._registerResultsEvents = function () {
                var self = this;
                this.results.on("*", function (name, params) {
                    self.trigger(name, params);
                });
            };
            Select2.prototype._registerEvents = function () {
                var self = this;
                this.on("open", function () {
                    self.$container.addClass("select2-container--open");
                });
                this.on("close", function () {
                    self.$container.removeClass("select2-container--open");
                });
                this.on("enable", function () {
                    self.$container.removeClass("select2-container--disabled");
                });
                this.on("disable", function () {
                    self.$container.addClass("select2-container--disabled");
                });
                this.on("blur", function () {
                    self.$container.removeClass("select2-container--focus");
                });
                this.on("query", function (params) {
                    if (!self.isOpen()) {
                        self.trigger("open", {});
                    }
                    this.dataAdapter.query(params, function (data) {
                        self.trigger("results:all", { data: data, query: params });
                    });
                });
                this.on("query:append", function (params) {
                    this.dataAdapter.query(params, function (data) {
                        self.trigger("results:append", { data: data, query: params });
                    });
                });
                this.on("keypress", function (evt) {
                    var key = evt.which;
                    if (self.isOpen()) {
                        if (key === KEYS.ESC || key === KEYS.TAB || (key === KEYS.UP && evt.altKey)) {
                            self.close(evt);
                            evt.preventDefault();
                        } else if (key === KEYS.ENTER) {
                            self.trigger("results:select", {});
                            evt.preventDefault();
                        } else if (key === KEYS.SPACE && evt.ctrlKey) {
                            self.trigger("results:toggle", {});
                            evt.preventDefault();
                        } else if (key === KEYS.UP) {
                            self.trigger("results:previous", {});
                            evt.preventDefault();
                        } else if (key === KEYS.DOWN) {
                            self.trigger("results:next", {});
                            evt.preventDefault();
                        }
                    } else {
                        if (key === KEYS.ENTER || key === KEYS.SPACE || (key === KEYS.DOWN && evt.altKey)) {
                            self.open();
                            evt.preventDefault();
                        }
                    }
                });
            };
            Select2.prototype._syncAttributes = function () {
                this.options.set("disabled", this.$element.prop("disabled"));
                if (this.isDisabled()) {
                    if (this.isOpen()) {
                        this.close();
                    }
                    this.trigger("disable", {});
                } else {
                    this.trigger("enable", {});
                }
            };
            Select2.prototype._isChangeMutation = function (evt, mutations) {
                var changed = false;
                var self = this;
                if (evt && evt.target && evt.target.nodeName !== "OPTION" && evt.target.nodeName !== "OPTGROUP") {
                    return;
                }
                if (!mutations) {
                    changed = true;
                } else if (mutations.addedNodes && mutations.addedNodes.length > 0) {
                    for (var n = 0; n < mutations.addedNodes.length; n++) {
                        var node = mutations.addedNodes[n];
                        if (node.selected) {
                            changed = true;
                        }
                    }
                } else if (mutations.removedNodes && mutations.removedNodes.length > 0) {
                    changed = true;
                } else if ($.isArray(mutations)) {
                    $.each(mutations, function (evt, mutation) {
                        if (self._isChangeMutation(evt, mutation)) {
                            changed = true;
                            return false;
                        }
                    });
                }
                return changed;
            };
            Select2.prototype._syncSubtree = function (evt, mutations) {
                var changed = this._isChangeMutation(evt, mutations);
                var self = this;
                if (changed) {
                    this.dataAdapter.current(function (currentData) {
                        self.trigger("selection:update", { data: currentData });
                    });
                }
            };
            Select2.prototype.trigger = function (name, args) {
                var actualTrigger = Select2.__super__.trigger;
                var preTriggerMap = { open: "opening", close: "closing", select: "selecting", unselect: "unselecting", clear: "clearing" };
                if (args === undefined) {
                    args = {};
                }
                if (name in preTriggerMap) {
                    var preTriggerName = preTriggerMap[name];
                    var preTriggerArgs = { prevented: false, name: name, args: args };
                    actualTrigger.call(this, preTriggerName, preTriggerArgs);
                    if (preTriggerArgs.prevented) {
                        args.prevented = true;
                        return;
                    }
                }
                actualTrigger.call(this, name, args);
            };
            Select2.prototype.toggleDropdown = function () {
                if (this.isDisabled()) {
                    return;
                }
                if (this.isOpen()) {
                    this.close();
                } else {
                    this.open();
                }
            };
            Select2.prototype.open = function () {
                if (this.isOpen()) {
                    return;
                }
                if (this.isDisabled()) {
                    return;
                }
                this.trigger("query", {});
            };
            Select2.prototype.close = function (evt) {
                if (!this.isOpen()) {
                    return;
                }
                this.trigger("close", { originalEvent: evt });
            };
            Select2.prototype.isEnabled = function () {
                return !this.isDisabled();
            };
            Select2.prototype.isDisabled = function () {
                return this.options.get("disabled");
            };
            Select2.prototype.isOpen = function () {
                return this.$container.hasClass("select2-container--open");
            };
            Select2.prototype.hasFocus = function () {
                return this.$container.hasClass("select2-container--focus");
            };
            Select2.prototype.focus = function (data) {
                if (this.hasFocus()) {
                    return;
                }
                this.$container.addClass("select2-container--focus");
                this.trigger("focus", {});
            };
            Select2.prototype.enable = function (args) {
                if (this.options.get("debug") && window.console && console.warn) {
                    console.warn('Select2: The `select2("enable")` method has been deprecated and will' + ' be removed in later Select2 versions. Use $element.prop("disabled")' + " instead.");
                }
                if (args == null || args.length === 0) {
                    args = [true];
                }
                var disabled = !args[0];
                this.$element.prop("disabled", disabled);
            };
            Select2.prototype.data = function () {
                if (this.options.get("debug") && arguments.length > 0 && window.console && console.warn) {
                    console.warn('Select2: Data can no longer be set using `select2("data")`. You ' + "should consider setting the value instead using `$element.val()`.");
                }
                var data = [];
                this.dataAdapter.current(function (currentData) {
                    data = currentData;
                });
                return data;
            };
            Select2.prototype.val = function (args) {
                if (this.options.get("debug") && window.console && console.warn) {
                    console.warn('Select2: The `select2("val")` method has been deprecated and will be' + " removed in later Select2 versions. Use $element.val() instead.");
                }
                if (args == null || args.length === 0) {
                    return this.$element.val();
                }
                var newVal = args[0];
                if ($.isArray(newVal)) {
                    newVal = $.map(newVal, function (obj) {
                        return obj.toString();
                    });
                }
                this.$element.val(newVal).trigger("input").trigger("change");
            };
            Select2.prototype.destroy = function () {
                this.$container.remove();
                if (this.$element[0].detachEvent) {
                    this.$element[0].detachEvent("onpropertychange", this._syncA);
                }
                if (this._observer != null) {
                    this._observer.disconnect();
                    this._observer = null;
                } else if (this.$element[0].removeEventListener) {
                    this.$element[0].removeEventListener("DOMAttrModified", this._syncA, false);
                    this.$element[0].removeEventListener("DOMNodeInserted", this._syncS, false);
                    this.$element[0].removeEventListener("DOMNodeRemoved", this._syncS, false);
                }
                this._syncA = null;
                this._syncS = null;
                this.$element.off(".select2");
                this.$element.attr("tabindex", Utils.GetData(this.$element[0], "old-tabindex"));
                this.$element.removeClass("select2-hidden-accessible");
                this.$element.attr("aria-hidden", "false");
                Utils.RemoveData(this.$element[0]);
                this.$element.removeData("select2");
                this.dataAdapter.destroy();
                this.selection.destroy();
                this.dropdown.destroy();
                this.results.destroy();
                this.dataAdapter = null;
                this.selection = null;
                this.dropdown = null;
                this.results = null;
            };
            Select2.prototype.render = function () {
                var $container = $('<span class="select2 select2-container">' + '<span class="selection"></span>' + '<span class="dropdown-wrapper" aria-hidden="true"></span>' + "</span>");
                $container.attr("dir", this.options.get("dir"));
                this.$container = $container;
                this.$container.addClass("select2-container--" + this.options.get("theme"));
                Utils.StoreData($container[0], "element", this.$element);
                return $container;
            };
            return Select2;
        });
        S2.define("jquery-mousewheel", ["jquery"], function ($) {
            return $;
        });
        S2.define("jquery.select2", ["jquery", "jquery-mousewheel", "./select2/core", "./select2/defaults", "./select2/utils"], function ($, _, Select2, Defaults, Utils) {
            if ($.fn.select2 == null) {
                var thisMethods = ["open", "close", "destroy"];
                $.fn.select2 = function (options) {
                    options = options || {};
                    if (typeof options === "object") {
                        this.each(function () {
                            var instanceOptions = $.extend(true, {}, options);
                            var instance = new Select2($(this), instanceOptions);
                        });
                        return this;
                    } else if (typeof options === "string") {
                        var ret;
                        var args = Array.prototype.slice.call(arguments, 1);
                        this.each(function () {
                            var instance = Utils.GetData(this, "select2");
                            if (instance == null && window.console && console.error) {
                                console.error("The select2('" + options + "') method was called on an " + "element that is not using Select2.");
                            }
                            ret = instance[options].apply(instance, args);
                        });
                        if ($.inArray(options, thisMethods) > -1) {
                            return this;
                        }
                        return ret;
                    } else {
                        throw new Error("Invalid arguments for Select2: " + options);
                    }
                };
            }
            if ($.fn.select2.defaults == null) {
                $.fn.select2.defaults = Defaults;
            }
            return Select2;
        });
        return { define: S2.define, require: S2.require };
    })();
    var select2 = S2.require("jquery.select2");
    jQuery.fn.select2.amd = S2;
    return select2;
});
/* @license GNU-GPL-2.0-or-later https://www.drupal.org/licensing/faq */
!(function (o) {
    "use strict";
    Drupal.behaviors.t_forms = {
        attach: function (t, e) {
            o(once("t_forms_select", ".contact-form .form-select", t)).each(function () {
                var e,
                    t,
                    c,
                    a,
                    s = o(this);
                if (void 0 !== s.attr("checkboxed"))
                    return (
                        (t = o("option", (e = this))),
                        (a = o(e).closest(".form-type-select")),
                        (c = o("<div>", { class: "checkbox-list" })),
                        t.each(function () {
                            var t = o("<div>", {
                                class: "checkbox-list__item",
                                value: o(this).val(),
                                "data-select": o(e).attr("id"),
                                "data-state": 0,
                                text: o(this).text(),
                                click: function (t) {
                                    var e = o(t.target),
                                        t = o("#" + e.attr("data-select")),
                                        t = o('option[value="' + e.attr("value") + '"]', t);
                                    "0" === e.attr("data-state")
                                        ? (e.attr("data-state", "1"), e.addClass("checkbox-list__item--active"), t.attr("selected", "selected"))
                                        : (e.attr("data-state", "0"), e.removeClass("checkbox-list__item--active"), t.removeAttr("selected"));
                                },
                            });
                            c.append(t);
                        }),
                        o(e).hide(),
                        void a.append(c)
                    );
                "multiple" === s.attr("multiple")
                    ? ((a = o(o("option", s)[0]).text()), o("option", s)[0].remove(), s.select2({ placeholder: a, minimumResultsForSearch: 1 / 0, dropdownParent: s.closest("fieldset") }))
                    : (setTimeout(function () {
                          o("option", s)[0].setAttribute("disabled", !0);
                      }, 1),
                      s.select2({ minimumResultsForSearch: 1 / 0, dropdownParent: s.closest("fieldset") }));
            }),
                o(once("t_forms_checkbox", ".contact-form .form-check-label")).each(function () {
                    var t = o("input", this),
                        e = this.closest(".form-check");
                    t.change(function () {
                        this.checked ? o(e).addClass("input-checked") : o(e).removeClass("input-checked");
                    });
                });
        },
    };
})(jQuery);
(function ($, Drupal) {
    Drupal.behaviors.dSocialMedia = {
        attach: function (context) {
            setBorders();
            var timeout;
            $(window).resize(function () {
                clearTimeout(timeout);
                timeout = setTimeout(setBorders, 100);
            });
            function setBorders() {
                var $liElements = $(".social-media-wrapper ul li", context);
                var lastItemOffset = -1;
                $liElements.removeClass("last-element");
                $liElements
                    .each(function (index, item) {
                        if (lastItemOffset !== $(item).offset().top) $($liElements[index - 1]).addClass("last-element");
                        lastItemOffset = $(item).offset().top;
                    })
                    .promise()
                    .done(function () {
                        $liElements.last().addClass("last-element");
                    });
            }
        },
    };
})(jQuery, Drupal);
(function ($, Drupal, debounce) {
    $.fn.drupalGetSummary = function () {
        const callback = this.data("summaryCallback");
        if (!this[0] || !callback) return "";
        const result = callback(this[0]);
        return result ? result.trim() : "";
    };
    $.fn.drupalSetSummary = function (callback) {
        const self = this;
        if (typeof callback !== "function") {
            const val = callback;
            callback = function () {
                return val;
            };
        }
        return this.data("summaryCallback", callback)
            .off("formUpdated.summary")
            .on("formUpdated.summary", () => {
                self.trigger("summaryUpdated");
            })
            .trigger("summaryUpdated");
    };
    Drupal.behaviors.formSingleSubmit = {
        attach() {
            function onFormSubmit(e) {
                const $form = $(e.currentTarget);
                const formValues = $form.serialize();
                const previousValues = $form.attr("data-drupal-form-submit-last");
                if (previousValues === formValues) e.preventDefault();
                else $form.attr("data-drupal-form-submit-last", formValues);
            }
            $(once("form-single-submit", "body")).on("submit.singleSubmit", 'form:not([method~="GET"])', onFormSubmit);
        },
    };
    function triggerFormUpdated(element) {
        $(element).trigger("formUpdated");
    }
    function fieldsList(form) {
        return [].map.call(form.querySelectorAll("[name][id]"), (el) => el.id);
    }
    Drupal.behaviors.formUpdated = {
        attach(context) {
            const $context = $(context);
            const contextIsForm = context.tagName === "FORM";
            const $forms = $(once("form-updated", contextIsForm ? $context : $context.find("form")));
            let formFields;
            if ($forms.length)
                $.makeArray($forms).forEach((form) => {
                    const events = "change.formUpdated input.formUpdated ";
                    const eventHandler = debounce((event) => {
                        triggerFormUpdated(event.target);
                    }, 300);
                    formFields = fieldsList(form).join(",");
                    form.setAttribute("data-drupal-form-fields", formFields);
                    $(form).on(events, eventHandler);
                });
            if (contextIsForm) {
                formFields = fieldsList(context).join(",");
                const currentFields = $(context).attr("data-drupal-form-fields");
                if (formFields !== currentFields) triggerFormUpdated(context);
            }
        },
        detach(context, settings, trigger) {
            const $context = $(context);
            const contextIsForm = context.tagName === "FORM";
            if (trigger === "unload")
                once.remove("form-updated", contextIsForm ? $context : $context.find("form")).forEach((form) => {
                    form.removeAttribute("data-drupal-form-fields");
                    $(form).off(".formUpdated");
                });
        },
    };
    Drupal.behaviors.fillUserInfoFromBrowser = {
        attach(context, settings) {
            const userInfo = ["name", "mail", "homepage"];
            const $forms = $(once("user-info-from-browser", "[data-user-info-from-browser]"));
            if ($forms.length)
                userInfo.forEach((info) => {
                    const $element = $forms.find(`[name=${info}]`);
                    const browserData = localStorage.getItem(`Drupal.visitor.${info}`);
                    if (!$element.length) return;
                    const emptyValue = $element[0].value === "";
                    const defaultValue = $element.attr("data-drupal-default-value") === $element[0].value;
                    if (browserData && (emptyValue || defaultValue))
                        $element.each(function (index, item) {
                            item.value = browserData;
                        });
                });
            $forms.on("submit", () => {
                userInfo.forEach((info) => {
                    const $element = $forms.find(`[name=${info}]`);
                    if ($element.length) localStorage.setItem(`Drupal.visitor.${info}`, $element[0].value);
                });
            });
        },
    };
    const handleFragmentLinkClickOrHashChange = (e) => {
        let url;
        if (e.type === "click") url = e.currentTarget.location ? e.currentTarget.location : e.currentTarget;
        else url = window.location;
        const hash = url.hash.substr(1);
        if (hash) {
            const $target = $(`#${hash}`);
            $("body").trigger("formFragmentLinkClickOrHashChange", [$target]);
            setTimeout(() => $target.trigger("focus"), 300);
        }
    };
    const debouncedHandleFragmentLinkClickOrHashChange = debounce(handleFragmentLinkClickOrHashChange, 300, true);
    $(window).on("hashchange.form-fragment", debouncedHandleFragmentLinkClickOrHashChange);
    $(document).on("click.form-fragment", 'a[href*="#"]', debouncedHandleFragmentLinkClickOrHashChange);
})(jQuery, Drupal, Drupal.debounce);
(function ($, Drupal) {
    "use strict";
    var isChrome = /chrom(e|ium)/.test(window.navigator.userAgent.toLowerCase());
    if (isChrome) {
        var backButton = false;
        if (window.performance) {
            var navEntries = window.performance.getEntriesByType("navigation");
            if (navEntries.length > 0 && navEntries[0].type === "back_forward") backButton = true;
            else {
                if (window.performance.navigation && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD) backButton = true;
            }
        }
        if (backButton) {
            var attachBehaviors = Drupal.attachBehaviors;
            Drupal.attachBehaviors = function (context, settings) {
                setTimeout(function (context, settings) {
                    attachBehaviors(context, settings);
                }, 300);
            };
        }
    }
})(jQuery, Drupal);
(function ($, Drupal) {
    const states = { postponed: [] };
    Drupal.states = states;
    function invert(a, invertState) {
        return invertState && typeof a !== "undefined" ? !a : a;
    }
    function compare(a, b) {
        if (a === b) return typeof a === "undefined" ? a : true;
        return typeof a === "undefined" || typeof b === "undefined";
    }
    function ternary(a, b) {
        if (typeof a === "undefined") return b;
        if (typeof b === "undefined") return a;
        return a && b;
    }
    Drupal.behaviors.states = {
        attach(context, settings) {
            const $states = $(context).find("[data-drupal-states]");
            const il = $states.length;
            for (let i = 0; i < il; i++) {
                const config = JSON.parse($states[i].getAttribute("data-drupal-states"));
                Object.keys(config || {}).forEach((state) => {
                    new states.Dependent({ element: $($states[i]), state: states.State.sanitize(state), constraints: config[state] });
                });
            }
            while (states.postponed.length) states.postponed.shift()();
        },
    };
    states.Dependent = function (args) {
        $.extend(this, { values: {}, oldValue: null }, args);
        this.dependees = this.getDependees();
        Object.keys(this.dependees || {}).forEach((selector) => {
            this.initializeDependee(selector, this.dependees[selector]);
        });
    };
    states.Dependent.comparisons = {
        RegExp(reference, value) {
            return reference.test(value);
        },
        Function(reference, value) {
            return reference(value);
        },
        Number(reference, value) {
            return typeof value === "string" ? compare(reference.toString(), value) : compare(reference, value);
        },
    };
    states.Dependent.prototype = {
        initializeDependee(selector, dependeeStates) {
            this.values[selector] = {};
            Object.keys(dependeeStates).forEach((i) => {
                let state = dependeeStates[i];
                if ($.inArray(state, dependeeStates) === -1) return;
                state = states.State.sanitize(state);
                this.values[selector][state.name] = null;
                $(selector).on(`state:${state}`, { selector, state }, (e) => {
                    this.update(e.data.selector, e.data.state, e.value);
                });
                new states.Trigger({ selector, state });
            });
        },
        compare(reference, selector, state) {
            const value = this.values[selector][state.name];
            if (reference.constructor.name in states.Dependent.comparisons) return states.Dependent.comparisons[reference.constructor.name](reference, value);
            return compare(reference, value);
        },
        update(selector, state, value) {
            if (value !== this.values[selector][state.name]) {
                this.values[selector][state.name] = value;
                this.reevaluate();
            }
        },
        reevaluate() {
            let value = this.verifyConstraints(this.constraints);
            if (value !== this.oldValue) {
                this.oldValue = value;
                value = invert(value, this.state.invert);
                this.element.trigger({ type: `state:${this.state}`, value, trigger: true });
            }
        },
        verifyConstraints(constraints, selector) {
            let result;
            if ($.isArray(constraints)) {
                const hasXor = $.inArray("xor", constraints) === -1;
                const len = constraints.length;
                for (let i = 0; i < len; i++)
                    if (constraints[i] !== "xor") {
                        const constraint = this.checkConstraints(constraints[i], selector, i);
                        if (constraint && (hasXor || result)) return hasXor;
                        result = result || constraint;
                    }
            } else {
                if ($.isPlainObject(constraints)) {
                    for (const n in constraints)
                        if (constraints.hasOwnProperty(n)) {
                            result = ternary(result, this.checkConstraints(constraints[n], selector, n));
                            if (result === false) return false;
                        }
                }
            }
            return result;
        },
        checkConstraints(value, selector, state) {
            if (typeof state !== "string" || /[0-9]/.test(state[0])) state = null;
            else {
                if (typeof selector === "undefined") {
                    selector = state;
                    state = null;
                }
            }
            if (state !== null) {
                state = states.State.sanitize(state);
                return invert(this.compare(value, selector, state), state.invert);
            }
            return this.verifyConstraints(value, selector);
        },
        getDependees() {
            const cache = {};
            const _compare = this.compare;
            this.compare = function (reference, selector, state) {
                (cache[selector] || (cache[selector] = [])).push(state.name);
            };
            this.verifyConstraints(this.constraints);
            this.compare = _compare;
            return cache;
        },
    };
    states.Trigger = function (args) {
        $.extend(this, args);
        if (this.state in states.Trigger.states) {
            this.element = $(this.selector);
            if (!this.element.data(`trigger:${this.state}`)) this.initialize();
        }
    };
    states.Trigger.prototype = {
        initialize() {
            const trigger = states.Trigger.states[this.state];
            if (typeof trigger === "function") trigger.call(window, this.element);
            else
                Object.keys(trigger || {}).forEach((event) => {
                    this.defaultTrigger(event, trigger[event]);
                });
            this.element.data(`trigger:${this.state}`, true);
        },
        defaultTrigger(event, valueFn) {
            let oldValue = valueFn.call(this.element);
            this.element.on(
                event,
                function (e) {
                    const value = valueFn.call(this.element, e);
                    if (oldValue !== value) {
                        this.element.trigger({ type: `state:${this.state}`, value, oldValue });
                        oldValue = value;
                    }
                }.bind(this)
            );
            states.postponed.push(
                function () {
                    this.element.trigger({ type: `state:${this.state}`, value: oldValue, oldValue: null });
                }.bind(this)
            );
        },
    };
    states.Trigger.states = {
        empty: {
            keyup() {
                return this.val() === "";
            },
            change() {
                return this.val() === "";
            },
        },
        checked: {
            change() {
                let checked = false;
                this.each(function () {
                    checked = $(this).prop("checked");
                    return !checked;
                });
                return checked;
            },
        },
        value: {
            keyup() {
                if (this.length > 1) return this.filter(":checked").val() || false;
                return this.val();
            },
            change() {
                if (this.length > 1) return this.filter(":checked").val() || false;
                return this.val();
            },
        },
        collapsed: {
            collapsed(e) {
                return typeof e !== "undefined" && "value" in e ? e.value : !this[0].hasAttribute("open");
            },
        },
    };
    states.State = function (state) {
        this.pristine = state;
        this.name = state;
        let process = true;
        do {
            while (this.name.charAt(0) === "!") {
                this.name = this.name.substring(1);
                this.invert = !this.invert;
            }
            if (this.name in states.State.aliases) this.name = states.State.aliases[this.name];
            else process = false;
        } while (process);
    };
    states.State.sanitize = function (state) {
        if (state instanceof states.State) return state;
        return new states.State(state);
    };
    states.State.aliases = {
        enabled: "!disabled",
        invisible: "!visible",
        invalid: "!valid",
        untouched: "!touched",
        optional: "!required",
        filled: "!empty",
        unchecked: "!checked",
        irrelevant: "!relevant",
        expanded: "!collapsed",
        open: "!collapsed",
        closed: "collapsed",
        readwrite: "!readonly",
    };
    states.State.prototype = {
        invert: false,
        toString() {
            return this.name;
        },
    };
    const $document = $(document);
    $document.on("state:disabled", (e) => {
        if (e.trigger) $(e.target).closest(".js-form-item, .js-form-submit, .js-form-wrapper").toggleClass("form-disabled", e.value).find("select, input, textarea").prop("disabled", e.value);
    });
    $document.on("state:readonly", (e) => {
        if (e.trigger) $(e.target).closest(".js-form-item, .js-form-submit, .js-form-wrapper").toggleClass("form-readonly", e.value).find("input, textarea").prop("readonly", e.value);
    });
    $document.on("state:required", (e) => {
        if (e.trigger)
            if (e.value) {
                const label = `label${e.target.id ? `[for=${e.target.id}]` : ""}`;
                const $label = $(e.target).attr({ required: "required", "aria-required": "true" }).closest(".js-form-item, .js-form-wrapper").find(label);
                if (!$label.hasClass("js-form-required").length) $label.addClass("js-form-required form-required");
            } else $(e.target).removeAttr("required aria-required").closest(".js-form-item, .js-form-wrapper").find("label.js-form-required").removeClass("js-form-required form-required");
    });
    $document.on("state:visible", (e) => {
        if (e.trigger) {
            let $element = $(e.target).closest(".js-form-item, .js-form-submit, .js-form-wrapper");
            if (e.target.tagName === "A") $element = $(e.target);
            $element.toggle(e.value);
        }
    });
    $document.on("state:checked", (e) => {
        if (e.trigger) $(e.target).closest(".js-form-item, .js-form-wrapper").find("input").prop("checked", e.value).trigger("change");
    });
    $document.on("state:collapsed", (e) => {
        if (e.trigger) if (e.target.hasAttribute("open") === e.value) $(e.target).find("> summary").trigger("click");
    });
})(jQuery, Drupal);
(function ($, Drupal, once) {
    "use strict";
    Drupal.webform = Drupal.webform || {};
    Drupal.webform.states = Drupal.webform.states || {};
    Drupal.webform.states.slideDown = Drupal.webform.states.slideDown || {};
    Drupal.webform.states.slideDown.duration = "slow";
    Drupal.webform.states.slideUp = Drupal.webform.states.slideUp || {};
    Drupal.webform.states.slideUp.duration = "fast";
    $.fn.hasData = function (data) {
        return typeof this.data(data) !== "undefined";
    };
    $.fn.isWebform = function () {
        return $(this).closest('form.webform-submission-form, form[id^="webform"], form[data-is-webform]').length ? true : false;
    };
    $.fn.isWebformElement = function () {
        return $(this).isWebform() || $(this).closest("[data-is-webform-element]").length ? true : false;
    };
    Drupal.states.Trigger.states.empty.change = function change() {
        return this.val() === "";
    };
    var states = Drupal.states;
    Drupal.states.Dependent.prototype.compare = function compare(reference, selector, state) {
        var value = this.values[selector][state.name];
        var name = reference.constructor.name;
        if (!name) {
            name = $.type(reference);
            name = name.charAt(0).toUpperCase() + name.slice(1);
        }
        if (name in states.Dependent.comparisons) return states.Dependent.comparisons[name](reference, value);
        if (reference.constructor.name in states.Dependent.comparisons) return states.Dependent.comparisons[reference.constructor.name](reference, value);
        return _compare2(reference, value);
    };
    function _compare2(a, b) {
        if (a === b) return typeof a === "undefined" ? a : true;
        return typeof a === "undefined" || typeof b === "undefined";
    }
    Drupal.states.Dependent.comparisons.Object = function (reference, value) {
        if ("pattern" in reference) return new RegExp(reference["pattern"]).test(value);
        else if ("!pattern" in reference) return !new RegExp(reference["!pattern"]).test(value);
        else if ("less" in reference) return value !== "" && parseFloat(reference["less"]) > parseFloat(value);
        else if ("less_equal" in reference) return value !== "" && parseFloat(reference["less_equal"]) >= parseFloat(value);
        else if ("greater" in reference) return value !== "" && parseFloat(reference["greater"]) < parseFloat(value);
        else if ("greater_equal" in reference) return value !== "" && parseFloat(reference["greater_equal"]) <= parseFloat(value);
        else if ("between" in reference || "!between" in reference) {
            if (value === "") return false;
            var between = reference["between"] || reference["!between"];
            var betweenParts = between.split(":");
            var greater = betweenParts[0];
            var less = typeof betweenParts[1] !== "undefined" ? betweenParts[1] : null;
            var isGreaterThan = greater === null || greater === "" || parseFloat(value) >= parseFloat(greater);
            var isLessThan = less === null || less === "" || parseFloat(value) <= parseFloat(less);
            var result = isGreaterThan && isLessThan;
            return reference["!between"] ? !result : result;
        } else return reference.indexOf(value) !== false;
    };
    var $document = $(document);
    $document.on("state:required", function (e) {
        if (e.trigger && $(e.target).isWebformElement()) {
            var $target = $(e.target);
            toggleRequired($target.find('input[type="file"]'), e.value);
            if ($target.is(".js-form-type-radios, .js-form-type-webform-radios-other, .js-webform-type-radios, .js-webform-type-webform-radios-other, .js-webform-type-webform-entity-radios, .webform-likert-table")) {
                $target.toggleClass("required", e.value);
                toggleRequired($target.find('input[type="radio"]'), e.value);
            }
            if ($target.is(".js-form-type-checkboxes, .js-form-type-webform-checkboxes-other, .js-webform-type-checkboxes, .js-webform-type-webform-checkboxes-other")) {
                $target.toggleClass("required", e.value);
                var $checkboxes = $target.find('input[type="checkbox"]');
                if (e.value) {
                    $checkboxes.on("click", statesCheckboxesRequiredEventHandler);
                    checkboxesRequired($target);
                } else {
                    $checkboxes.off("click", statesCheckboxesRequiredEventHandler);
                    toggleRequired($checkboxes, false);
                }
            }
            if ($target.is(".js-webform-tableselect")) {
                $target.toggleClass("required", e.value);
                var isMultiple = $target.is("[multiple]");
                if (isMultiple) {
                    var $tbody = $target.find("tbody");
                    var $checkboxes = $tbody.find('input[type="checkbox"]');
                    copyRequireMessage($target, $checkboxes);
                    if (e.value) {
                        $checkboxes.on("click change", statesCheckboxesRequiredEventHandler);
                        checkboxesRequired($tbody);
                    } else {
                        $checkboxes.off("click change ", statesCheckboxesRequiredEventHandler);
                        toggleRequired($tbody, false);
                    }
                } else {
                    var $radios = $target.find('input[type="radio"]');
                    copyRequireMessage($target, $radios);
                    toggleRequired($radios, e.value);
                }
            }
            if ($target.is(".js-form-type-webform-select-other, .js-webform-type-webform-select-other")) {
                var $select = $target.find("select");
                toggleRequired($select, e.value);
                copyRequireMessage($target, $select);
            }
            if ($target.find("> label:not([for])").length) $target.find("> label").toggleClass("js-form-required form-required", e.value);
            if ($target.is(".js-webform-type-radios, .js-webform-type-checkboxes, fieldset"))
                $target.find("legend span.fieldset-legend:not(.visually-hidden),legend span.fieldset__label:not(.visually-hidden)").toggleClass("js-form-required form-required", e.value);
            if ($target.is("fieldset")) $target.removeAttr("required aria-required");
        }
    });
    $document.on("state:checked", function (e) {
        if (e.trigger) $(e.target).trigger("change");
    });
    $document.on("state:readonly", function (e) {
        if (e.trigger && $(e.target).isWebformElement()) {
            $(e.target).prop("readonly", e.value).closest(".js-form-item, .js-form-wrapper").toggleClass("webform-readonly", e.value).find("input, textarea").prop("readonly", e.value);
            $(e.target).trigger("webform:readonly").find("select, input, textarea, button").trigger("webform:readonly");
        }
    });
    $document.on("state:visible state:visible-slide", function (e) {
        if (e.trigger && $(e.target).isWebformElement())
            if (e.value)
                $(":input", e.target)
                    .addBack()
                    .each(function () {
                        restoreValueAndRequired(this);
                        triggerEventHandlers(this);
                    });
            else
                $(":input", e.target)
                    .addBack()
                    .each(function () {
                        backupValueAndRequired(this);
                        clearValueAndRequired(this);
                        triggerEventHandlers(this);
                    });
    });
    $document.on("state:visible-slide", function (e) {
        if (e.trigger && $(e.target).isWebformElement()) {
            var effect = e.value ? "slideDown" : "slideUp";
            var duration = Drupal.webform.states[effect].duration;
            $(e.target).closest(".js-form-item, .js-form-submit, .js-form-wrapper")[effect](duration);
        }
    });
    Drupal.states.State.aliases["invisible-slide"] = "!visible-slide";
    $document.on("state:disabled", function (e) {
        if (e.trigger && $(e.target).isWebformElement()) {
            $(e.target).prop("disabled", e.value).closest(".js-form-item, .js-form-submit, .js-form-wrapper").toggleClass("form-disabled", e.value).find("select, input, textarea, button").prop("disabled", e.value);
            var fileElements = $(e.target).find(':input[type="hidden"][name$="[fids]"]');
            if (fileElements.length) {
                if ($(e.target).is("fieldset")) $(e.target).prop("disabled", false);
                fileElements.removeAttr("disabled");
            }
            $(e.target).trigger("webform:disabled").find("select, input, textarea, button").trigger("webform:disabled");
        }
    });
    Drupal.behaviors.webformCheckboxesRequired = {
        attach: function (context) {
            $(
                once(
                    "webform-checkboxes-required",
                    ".js-form-type-checkboxes.required, .js-form-type-webform-checkboxes-other.required, .js-webform-type-checkboxes.required, .js-webform-type-webform-checkboxes-other.required, .js-webform-type-webform-radios-other.checkboxes",
                    context
                )
            ).each(function () {
                var $element = $(this);
                $element.find('input[type="checkbox"]').on("click", statesCheckboxesRequiredEventHandler);
                setTimeout(function () {
                    checkboxesRequired($element);
                });
            });
        },
    };
    Drupal.behaviors.webformRadiosRequired = {
        attach: function (context) {
            $(
                once(
                    "webform-radios-required",
                    ".js-form-type-radios, .js-form-type-webform-radios-other, .js-webform-type-radios, .js-webform-type-webform-radios-other, .js-webform-type-webform-entity-radios, .js-webform-type-webform-scale",
                    context
                )
            ).each(function () {
                var $element = $(this);
                setTimeout(function () {
                    radiosRequired($element);
                });
            });
        },
    };
    Drupal.behaviors.webformTableSelectRequired = {
        attach: function (context) {
            $(once("webform-tableselect-required", ".js-webform-tableselect.required", context)).each(function () {
                var $element = $(this);
                var $tbody = $element.find("tbody");
                var isMultiple = $element.is("[multiple]");
                if (isMultiple)
                    $tbody.find('input[type="checkbox"]').on("click change", function () {
                        checkboxesRequired($tbody);
                    });
                setTimeout(function () {
                    isMultiple ? checkboxesRequired($tbody) : radiosRequired($element);
                });
            });
        },
    };
    function checkboxesRequired($element) {
        var $firstCheckbox = $element.find('input[type="checkbox"]').first();
        var isChecked = $element.find('input[type="checkbox"]').is(":checked");
        toggleRequired($firstCheckbox, !isChecked);
        copyRequireMessage($element, $firstCheckbox);
    }
    function radiosRequired($element) {
        var $radios = $element.find('input[type="radio"]');
        var isRequired = $element.hasClass("required");
        toggleRequired($radios, isRequired);
        copyRequireMessage($element, $radios);
    }
    function statesCheckboxesRequiredEventHandler() {
        var $element = $(this).closest(".js-webform-type-checkboxes, .js-webform-type-webform-checkboxes-other");
        checkboxesRequired($element);
    }
    function triggerEventHandlers(input) {
        var $input = $(input);
        var type = input.type;
        var tag = input.tagName.toLowerCase();
        var extraParameters = ["webform.states"];
        if (type === "checkbox" || type === "radio") $input.trigger("change", extraParameters).trigger("blur", extraParameters);
        else if (tag === "select") {
            if ($input.closest(".webform-type-address").length) {
                if (!$input.data("webform-states-address-initialized") && $input.attr("autocomplete") === "country" && $input.val() === $input.find("option[selected]").attr("value")) return;
                $input.data("webform-states-address-initialized", true);
            }
            $input.trigger("change", extraParameters).trigger("blur", extraParameters);
        } else {
            if (type !== "submit" && type !== "button" && type !== "file") {
                var hasInputMask = $.fn.inputmask && $input.hasClass("js-webform-input-mask");
                hasInputMask && $input.inputmask("remove");
                $input.trigger("input", extraParameters).trigger("change", extraParameters).trigger("keydown", extraParameters).trigger("keyup", extraParameters).trigger("blur", extraParameters);
                hasInputMask && $input.inputmask();
            }
        }
    }
    function backupValueAndRequired(input) {
        var $input = $(input);
        var type = input.type;
        var tag = input.tagName.toLowerCase();
        if ($input.prop("required") && !$input.hasData("webform-required")) $input.data("webform-required", true);
        if (!$input.hasData("webform-value"))
            if (type === "checkbox" || type === "radio") $input.data("webform-value", $input.prop("checked"));
            else if (tag === "select") {
                var values = [];
                $input.find("option:selected").each(function (i, option) {
                    values[i] = option.value;
                });
                $input.data("webform-value", values);
            } else {
                if (type !== "submit" && type !== "button") $input.data("webform-value", input.value);
            }
    }
    function restoreValueAndRequired(input) {
        var $input = $(input);
        var value = $input.data("webform-value");
        if (typeof value !== "undefined") {
            var type = input.type;
            var tag = input.tagName.toLowerCase();
            if (type === "checkbox" || type === "radio") $input.prop("checked", value);
            else if (tag === "select")
                $.each(value, function (i, option_value) {
                    option_value = option_value.replace(/'/g, "\\'");
                    $input.find("option[value='" + option_value + "']").prop("selected", true);
                });
            else {
                if (type !== "submit" && type !== "button") input.value = value;
            }
            $input.removeData("webform-value");
        }
        var required = $input.data("webform-required");
        if (typeof required !== "undefined") {
            if (required) $input.prop("required", true);
            $input.removeData("webform-required");
        }
    }
    function clearValueAndRequired(input) {
        var $input = $(input);
        if ($input.closest("[data-webform-states-no-clear]").length) return;
        var type = input.type;
        var tag = input.tagName.toLowerCase();
        if (type === "checkbox" || type === "radio") $input.prop("checked", false);
        else if (tag === "select")
            if ($input.find('option[value=""]').length) $input.val("");
            else input.selectedIndex = -1;
        else {
            if (type !== "submit" && type !== "button") input.value = type === "color" ? "#000000" : "";
        }
        $input.prop("required", false);
    }
    function toggleRequired($input, required) {
        var isCheckboxOrRadio = $input.attr("type") === "radio" || $input.attr("type") === "checkbox";
        if (required)
            if (isCheckboxOrRadio) $input.attr({ required: "required" });
            else $input.attr({ required: "required", "aria-required": "true" });
        else if (isCheckboxOrRadio) $input.removeAttr("required");
        else $input.removeAttr("required aria-required");
    }
    function copyRequireMessage($source, $destination) {
        if ($source.attr("data-msg-required")) $destination.attr("data-msg-required", $source.attr("data-msg-required"));
    }
})(jQuery, Drupal, once);
(function ($, Drupal, once) {
    "use strict";
    Drupal.behaviors.webformRemoveFormSingleSubmit = {
        attach: function attach() {
            function onFormSubmit(e) {
                var $form = $(e.currentTarget);
                $form.removeAttr("data-drupal-form-submit-last");
            }
            $(once("webform-single-submit", "body")).on("submit.singleSubmit", "form.webform-remove-single-submit", onFormSubmit);
        },
    };
    Drupal.behaviors.webformDisableAutoSubmit = {
        attach: function (context) {
            $(once("webform-disable-autosubmit", $(".js-webform-disable-autosubmit input").not(":button, :submit, :reset, :image, :file"))).on("keyup keypress", function (e) {
                if (e.which === 13) {
                    e.preventDefault();
                    return false;
                }
            });
        },
    };
    Drupal.behaviors.webformRequiredError = {
        attach: function (context) {
            $(once("webform-required-error", $(context).find(":input[data-webform-required-error], :input[data-webform-pattern-error]")))
                .on("invalid", function () {
                    this.setCustomValidity("");
                    if (this.valid) return;
                    if (this.validity.patternMismatch && $(this).attr("data-webform-pattern-error")) this.setCustomValidity($(this).attr("data-webform-pattern-error"));
                    else {
                        if (this.validity.valueMissing && $(this).attr("data-webform-required-error")) this.setCustomValidity($(this).attr("data-webform-required-error"));
                    }
                })
                .on("input change", function () {
                    var name = $(this).attr("name");
                    $(this.form)
                        .find(':input[name="' + name + '"]')
                        .each(function () {
                            this.setCustomValidity("");
                        });
                });
        },
    };
    $(document).on("state:required", function (e) {
        $(e.target)
            .filter(":input[data-webform-required-error]")
            .each(function () {
                this.setCustomValidity("");
            });
    });
})(jQuery, Drupal, once);
(function ($, Drupal) {
    Drupal.theme.progressBar = function (id) {
        return (
            `<div id="${id}" class="progress" aria-live="polite">` +
            '<div class="progress__label">&nbsp;</div>' +
            '<div class="progress__track"><div class="progress__bar"></div></div>' +
            '<div class="progress__percentage"></div>' +
            '<div class="progress__description">&nbsp;</div>' +
            "</div>"
        );
    };
    Drupal.ProgressBar = function (id, updateCallback, method, errorCallback) {
        this.id = id;
        this.method = method || "GET";
        this.updateCallback = updateCallback;
        this.errorCallback = errorCallback;
        this.element = $(Drupal.theme("progressBar", id));
    };
    $.extend(Drupal.ProgressBar.prototype, {
        setProgress(percentage, message, label) {
            if (percentage >= 0 && percentage <= 100) {
                $(this.element)
                    .find("div.progress__bar")
                    .each(function () {
                        this.style.width = `${percentage}%`;
                    });
                $(this.element).find("div.progress__percentage").html(`${percentage}%`);
            }
            $("div.progress__description", this.element).html(message);
            $("div.progress__label", this.element).html(label);
            if (this.updateCallback) this.updateCallback(percentage, message, this);
        },
        startMonitoring(uri, delay) {
            this.delay = delay;
            this.uri = uri;
            this.sendPing();
        },
        stopMonitoring() {
            clearTimeout(this.timer);
            this.uri = null;
        },
        sendPing() {
            if (this.timer) clearTimeout(this.timer);
            if (this.uri) {
                const pb = this;
                let uri = this.uri;
                if (!uri.includes("?")) uri += "?";
                else uri += "&";
                uri += "_format=json";
                $.ajax({
                    type: this.method,
                    url: uri,
                    data: "",
                    dataType: "json",
                    success(progress) {
                        if (progress.status === 0) {
                            pb.displayError(progress.data);
                            return;
                        }
                        pb.setProgress(progress.percentage, progress.message, progress.label);
                        pb.timer = setTimeout(() => {
                            pb.sendPing();
                        }, pb.delay);
                    },
                    error(xmlhttp) {
                        const e = new Drupal.AjaxError(xmlhttp, pb.uri);
                        pb.displayError(`<pre>${e.message}</pre>`);
                    },
                });
            }
        },
        displayError(string) {
            const error = $('<div class="messages messages--error"></div>').html(string);
            $(this.element).before(error).hide();
            if (this.errorCallback) this.errorCallback(this);
        },
    });
})(jQuery, Drupal);
/* @license MIT https://raw.githubusercontent.com/muicss/loadjs/4.2.0/LICENSE.txt */
loadjs = (function () {
    var h = function () {},
        c = {},
        u = {},
        f = {};
    function o(e, n) {
        if (e) {
            var r = f[e];
            if (((u[e] = n), r)) for (; r.length; ) r[0](e, n), r.splice(0, 1);
        }
    }
    function l(e, n) {
        e.call && (e = { success: e }), n.length ? (e.error || h)(n) : (e.success || h)(e);
    }
    function d(r, t, s, i) {
        var c,
            o,
            e = document,
            n = s.async,
            u = (s.numRetries || 0) + 1,
            f = s.before || h,
            l = r.replace(/[\?|#].*$/, ""),
            a = r.replace(/^(css|img)!/, "");
        (i = i || 0),
            /(^css!|\.css$)/.test(l)
                ? (((o = e.createElement("link")).rel = "stylesheet"), (o.href = a), (c = "hideFocus" in o) && o.relList && ((c = 0), (o.rel = "preload"), (o.as = "style")))
                : /(^img!|\.(png|gif|jpg|svg|webp)$)/.test(l)
                ? ((o = e.createElement("img")).src = a)
                : (((o = e.createElement("script")).src = r), (o.async = void 0 === n || n)),
            !(o.onload = o.onerror = o.onbeforeload = function (e) {
                var n = e.type[0];
                if (c)
                    try {
                        o.sheet.cssText.length || (n = "e");
                    } catch (e) {
                        18 != e.code && (n = "e");
                    }
                if ("e" == n) {
                    if ((i += 1) < u) return d(r, t, s, i);
                } else if ("preload" == o.rel && "style" == o.as) return (o.rel = "stylesheet");
                t(r, n, e.defaultPrevented);
            }) !== f(r, o) && e.head.appendChild(o);
    }
    function r(e, n, r) {
        var t, s;
        if ((n && n.trim && (t = n), (s = (t ? r : n) || {}), t)) {
            if (t in c) throw "LoadJS";
            c[t] = !0;
        }
        function i(n, r) {
            !(function (e, t, n) {
                var r,
                    s,
                    i = (e = e.push ? e : [e]).length,
                    c = i,
                    o = [];
                for (
                    r = function (e, n, r) {
                        if (("e" == n && o.push(e), "b" == n)) {
                            if (!r) return;
                            o.push(e);
                        }
                        --i || t(o);
                    },
                        s = 0;
                    s < c;
                    s++
                )
                    d(e[s], r, n);
            })(
                e,
                function (e) {
                    l(s, e), n && l({ success: n, error: r }, e), o(t, e);
                },
                s
            );
        }
        if (s.returnPromise) return new Promise(i);
        i();
    }
    return (
        (r.ready = function (e, n) {
            return (
                (function (e, r) {
                    e = e.push ? e : [e];
                    var n,
                        t,
                        s,
                        i = [],
                        c = e.length,
                        o = c;
                    for (
                        n = function (e, n) {
                            n.length && i.push(e), --o || r(i);
                        };
                        c--;

                    )
                        (t = e[c]), (s = u[t]) ? n(t, s) : (f[t] = f[t] || []).push(n);
                })(e, function (e) {
                    l(n, e);
                }),
                r
            );
        }),
        (r.done = function (e) {
            o(e, []);
        }),
        (r.reset = function () {
            (c = {}), (u = {}), (f = {});
        }),
        (r.isDefined = function (e) {
            return e in c;
        }),
        r
    );
})();
/* @license GNU-GPL-2.0-or-later https://www.drupal.org/licensing/faq */
(function (Drupal, debounce) {
    let liveElement;
    const announcements = [];
    Drupal.behaviors.drupalAnnounce = {
        attach(context) {
            if (!liveElement) {
                liveElement = document.createElement("div");
                liveElement.id = "drupal-live-announce";
                liveElement.className = "visually-hidden";
                liveElement.setAttribute("aria-live", "polite");
                liveElement.setAttribute("aria-busy", "false");
                document.body.appendChild(liveElement);
            }
        },
    };
    function announce() {
        const text = [];
        let priority = "polite";
        let announcement;
        const il = announcements.length;
        for (let i = 0; i < il; i++) {
            announcement = announcements.pop();
            text.unshift(announcement.text);
            if (announcement.priority === "assertive") priority = "assertive";
        }
        if (text.length) {
            liveElement.innerHTML = "";
            liveElement.setAttribute("aria-busy", "true");
            liveElement.setAttribute("aria-live", priority);
            liveElement.innerHTML = text.join("\n");
            liveElement.setAttribute("aria-busy", "false");
        }
    }
    Drupal.announce = function (text, priority) {
        announcements.push({ text, priority });
        return debounce(announce, 200)();
    };
})(Drupal, Drupal.debounce);
((Drupal) => {
    Drupal.Message = class {
        constructor(messageWrapper = null) {
            if (!messageWrapper) this.messageWrapper = Drupal.Message.defaultWrapper();
            else this.messageWrapper = messageWrapper;
        }
        static defaultWrapper() {
            let wrapper = document.querySelector("[data-drupal-messages]");
            if (!wrapper) {
                wrapper = document.querySelector("[data-drupal-messages-fallback]");
                wrapper.removeAttribute("data-drupal-messages-fallback");
                wrapper.setAttribute("data-drupal-messages", "");
                wrapper.classList.remove("hidden");
            }
            return wrapper.innerHTML === "" ? Drupal.Message.messageInternalWrapper(wrapper) : wrapper.firstElementChild;
        }
        static getMessageTypeLabels() {
            return { status: Drupal.t("Status message"), error: Drupal.t("Error message"), warning: Drupal.t("Warning message") };
        }
        add(message, options = {}) {
            if (!options.hasOwnProperty("type")) options.type = "status";
            if (typeof message !== "string") throw new Error("Message must be a string.");
            Drupal.Message.announce(message, options);
            options.id = options.id ? String(options.id) : `${options.type}-${Math.random().toFixed(15).replace("0.", "")}`;
            if (!Drupal.Message.getMessageTypeLabels().hasOwnProperty(options.type)) {
                const { type } = options;
                throw new Error(`The message type, ${type}, is not present in Drupal.Message.getMessageTypeLabels().`);
            }
            this.messageWrapper.appendChild(Drupal.theme("message", { text: message }, options));
            return options.id;
        }
        select(id) {
            return this.messageWrapper.querySelector(`[data-drupal-message-id^="${id}"]`);
        }
        remove(id) {
            return this.messageWrapper.removeChild(this.select(id));
        }
        clear() {
            Array.prototype.forEach.call(this.messageWrapper.querySelectorAll("[data-drupal-message-id]"), (message) => {
                this.messageWrapper.removeChild(message);
            });
        }
        static announce(message, options) {
            if (!options.priority && (options.type === "warning" || options.type === "error")) options.priority = "assertive";
            if (options.announce !== "") Drupal.announce(options.announce || message, options.priority);
        }
        static messageInternalWrapper(messageWrapper) {
            const innerWrapper = document.createElement("div");
            innerWrapper.setAttribute("class", "messages__wrapper");
            messageWrapper.insertAdjacentElement("afterbegin", innerWrapper);
            return innerWrapper;
        }
    };
    Drupal.theme.message = ({ text }, { type, id }) => {
        const messagesTypes = Drupal.Message.getMessageTypeLabels();
        const messageWrapper = document.createElement("div");
        messageWrapper.setAttribute("class", `messages messages--${type}`);
        messageWrapper.setAttribute("role", type === "error" || type === "warning" ? "alert" : "status");
        messageWrapper.setAttribute("data-drupal-message-id", id);
        messageWrapper.setAttribute("data-drupal-message-type", type);
        messageWrapper.setAttribute("aria-label", messagesTypes[type]);
        messageWrapper.innerHTML = `${text}`;
        return messageWrapper;
    };
})(Drupal);
(function ($, window, Drupal, drupalSettings, loadjs, { isFocusable, tabbable }) {
    Drupal.behaviors.AJAX = {
        attach(context, settings) {
            function loadAjaxBehavior(base) {
                const elementSettings = settings.ajax[base];
                if (typeof elementSettings.selector === "undefined") elementSettings.selector = `#${base}`;
                once("drupal-ajax", $(elementSettings.selector)).forEach((el) => {
                    elementSettings.element = el;
                    elementSettings.base = base;
                    Drupal.ajax(elementSettings);
                });
            }
            Object.keys(settings.ajax || {}).forEach(loadAjaxBehavior);
            Drupal.ajax.bindAjaxLinks(document.body);
            once("ajax", ".use-ajax-submit").forEach((el) => {
                const elementSettings = {};
                elementSettings.url = $(el.form).attr("action");
                elementSettings.setClick = true;
                elementSettings.event = "click";
                elementSettings.progress = { type: "throbber" };
                elementSettings.base = el.id;
                elementSettings.element = el;
                Drupal.ajax(elementSettings);
            });
        },
        detach(context, settings, trigger) {
            if (trigger === "unload")
                Drupal.ajax.expired().forEach((instance) => {
                    Drupal.ajax.instances[instance.instanceIndex] = null;
                });
        },
    };
    Drupal.AjaxError = function (xmlhttp, uri, customMessage) {
        let statusCode;
        let statusText;
        let responseText;
        if (xmlhttp.status) statusCode = `\n${Drupal.t("An AJAX HTTP error occurred.")}\n${Drupal.t("HTTP Result Code: !status", { "!status": xmlhttp.status })}`;
        else statusCode = `\n${Drupal.t("An AJAX HTTP request terminated abnormally.")}`;
        statusCode += `\n${Drupal.t("Debugging information follows.")}`;
        const pathText = `\n${Drupal.t("Path: !uri", { "!uri": uri })}`;
        statusText = "";
        try {
            statusText = `\n${Drupal.t("StatusText: !statusText", { "!statusText": xmlhttp.statusText.trim() })}`;
        } catch (e) {}
        responseText = "";
        try {
            responseText = `\n${Drupal.t("ResponseText: !responseText", { "!responseText": xmlhttp.responseText.trim() })}`;
        } catch (e) {}
        responseText = responseText.replace(/<("[^"]*"|'[^']*'|[^'">])*>/gi, "");
        responseText = responseText.replace(/[\n]+\s+/g, "\n");
        const readyStateText = xmlhttp.status === 0 ? `\n${Drupal.t("ReadyState: !readyState", { "!readyState": xmlhttp.readyState })}` : "";
        customMessage = customMessage ? `\n${Drupal.t("CustomMessage: !customMessage", { "!customMessage": customMessage })}` : "";
        this.message = statusCode + pathText + statusText + customMessage + responseText + readyStateText;
        this.name = "AjaxError";
        if (!Drupal.AjaxError.messages) Drupal.AjaxError.messages = new Drupal.Message();
        Drupal.AjaxError.messages.add(Drupal.t("Oops, something went wrong. Check your browser's developer console for more details."), { type: "error" });
    };
    Drupal.AjaxError.prototype = new Error();
    Drupal.AjaxError.prototype.constructor = Drupal.AjaxError;
    Drupal.ajax = function (settings) {
        if (arguments.length !== 1) throw new Error("Drupal.ajax() function must be called with one configuration object only");
        const base = settings.base || false;
        const element = settings.element || false;
        delete settings.base;
        delete settings.element;
        if (!settings.progress && !element) settings.progress = false;
        const ajax = new Drupal.Ajax(base, element, settings);
        ajax.instanceIndex = Drupal.ajax.instances.length;
        Drupal.ajax.instances.push(ajax);
        return ajax;
    };
    Drupal.ajax.instances = [];
    Drupal.ajax.expired = function () {
        return Drupal.ajax.instances.filter((instance) => instance && instance.element !== false && !document.body.contains(instance.element));
    };
    Drupal.ajax.bindAjaxLinks = (element) => {
        once("ajax", ".use-ajax", element).forEach((ajaxLink) => {
            const $linkElement = $(ajaxLink);
            const elementSettings = {
                progress: { type: "throbber" },
                dialogType: $linkElement.data("dialog-type"),
                dialog: $linkElement.data("dialog-options"),
                dialogRenderer: $linkElement.data("dialog-renderer"),
                base: $linkElement.attr("id"),
                element: ajaxLink,
            };
            const href = $linkElement.attr("href");
            if (href) {
                elementSettings.url = href;
                elementSettings.event = "click";
            }
            const httpMethod = $linkElement.data("ajax-http-method");
            if (httpMethod) elementSettings.httpMethod = httpMethod;
            Drupal.ajax(elementSettings);
        });
    };
    Drupal.Ajax = function (base, element, elementSettings) {
        const defaults = {
            httpMethod: "POST",
            event: element ? "mousedown" : null,
            keypress: true,
            selector: base ? `#${base}` : null,
            effect: "none",
            speed: "none",
            method: "replaceWith",
            progress: { type: "throbber", message: Drupal.t("Processing...") },
            submit: { js: true },
        };
        $.extend(this, defaults, elementSettings);
        this.commands = new Drupal.AjaxCommands();
        this.instanceIndex = false;
        if (this.wrapper) this.wrapper = `#${this.wrapper}`;
        this.element = element;
        this.preCommandsFocusedElementSelector = null;
        this.elementSettings = elementSettings;
        if (this.element && this.element.form) this.$form = $(this.element.form);
        if (!this.url) {
            const $element = $(this.element);
            if (this.element.tagName === "A") this.url = $element.attr("href");
            else {
                if (this.element && element.form) this.url = this.$form.attr("action");
            }
        }
        const originalUrl = this.url;
        this.url = this.url.replace(/\/nojs(\/|$|\?|#)/, "/ajax$1");
        if (drupalSettings.ajaxTrustedUrl[originalUrl]) drupalSettings.ajaxTrustedUrl[this.url] = true;
        const ajax = this;
        ajax.options = {
            url: ajax.url,
            data: ajax.submit,
            isInProgress() {
                return ajax.ajaxing;
            },
            beforeSerialize(elementSettings, options) {
                return ajax.beforeSerialize(elementSettings, options);
            },
            beforeSubmit(formValues, elementSettings, options) {
                ajax.ajaxing = true;
                ajax.preCommandsFocusedElementSelector = null;
                return ajax.beforeSubmit(formValues, elementSettings, options);
            },
            beforeSend(xmlhttprequest, options) {
                ajax.ajaxing = true;
                return ajax.beforeSend(xmlhttprequest, options);
            },
            success(response, status, xmlhttprequest) {
                ajax.preCommandsFocusedElementSelector = document.activeElement.getAttribute("data-drupal-selector");
                if (typeof response === "string") response = $.parseJSON(response);
                if (response !== null && !drupalSettings.ajaxTrustedUrl[ajax.url])
                    if (xmlhttprequest.getResponseHeader("X-Drupal-Ajax-Token") !== "1") {
                        const customMessage = Drupal.t("The response failed verification so will not be processed.");
                        return ajax.error(xmlhttprequest, ajax.url, customMessage);
                    }
                return Promise.resolve(ajax.success(response, status)).then(() => {
                    ajax.ajaxing = false;
                    $(document).trigger("ajaxSuccess", [xmlhttprequest, this]);
                    $(document).trigger("ajaxComplete", [xmlhttprequest, this]);
                    if (--$.active === 0) $(document).trigger("ajaxStop");
                });
            },
            error(xmlhttprequest, status, error) {
                ajax.ajaxing = false;
            },
            complete(xmlhttprequest, status) {
                if (status === "error" || status === "parsererror") return ajax.error(xmlhttprequest, ajax.url);
            },
            dataType: "json",
            jsonp: false,
            method: ajax.httpMethod,
        };
        if (elementSettings.dialog) ajax.options.data.dialogOptions = elementSettings.dialog;
        if (!ajax.options.url.includes("?")) ajax.options.url += "?";
        else ajax.options.url += "&";
        let wrapper = `drupal_${elementSettings.dialogType || "ajax"}`;
        if (elementSettings.dialogRenderer) wrapper += `.${elementSettings.dialogRenderer}`;
        ajax.options.url += `${Drupal.ajax.WRAPPER_FORMAT}=${wrapper}`;
        $(ajax.element).on(elementSettings.event, function (event) {
            if (!drupalSettings.ajaxTrustedUrl[ajax.url] && !Drupal.url.isLocal(ajax.url)) throw new Error(Drupal.t("The callback URL is not local and not trusted: !url", { "!url": ajax.url }));
            return ajax.eventResponse(this, event);
        });
        if (elementSettings.keypress)
            $(ajax.element).on("keypress", function (event) {
                return ajax.keypressResponse(this, event);
            });
        if (elementSettings.prevent) $(ajax.element).on(elementSettings.prevent, false);
    };
    Drupal.ajax.WRAPPER_FORMAT = "_wrapper_format";
    Drupal.Ajax.AJAX_REQUEST_PARAMETER = "_drupal_ajax";
    Drupal.Ajax.prototype.execute = function () {
        if (this.ajaxing) return;
        try {
            this.beforeSerialize(this.element, this.options);
            return $.ajax(this.options);
        } catch (e) {
            this.ajaxing = false;
            window.alert(`An error occurred while attempting to process ${this.options.url}: ${e.message}`);
            return $.Deferred().reject();
        }
    };
    Drupal.Ajax.prototype.keypressResponse = function (element, event) {
        const ajax = this;
        if (event.which === 13 || (event.which === 32 && element.type !== "text" && element.type !== "textarea" && element.type !== "tel" && element.type !== "number")) {
            event.preventDefault();
            event.stopPropagation();
            $(element).trigger(ajax.elementSettings.event);
        }
    };
    Drupal.Ajax.prototype.eventResponse = function (element, event) {
        event.preventDefault();
        event.stopPropagation();
        const ajax = this;
        if (ajax.ajaxing) return;
        try {
            if (ajax.$form) {
                if (ajax.setClick) element.form.clk = element;
                ajax.$form.ajaxSubmit(ajax.options);
            } else {
                ajax.beforeSerialize(ajax.element, ajax.options);
                $.ajax(ajax.options);
            }
        } catch (e) {
            ajax.ajaxing = false;
            window.alert(`An error occurred while attempting to process ${ajax.options.url}: ${e.message}`);
        }
    };
    Drupal.Ajax.prototype.beforeSerialize = function (element, options) {
        if (this.$form && document.body.contains(this.$form.get(0))) {
            const settings = this.settings || drupalSettings;
            Drupal.detachBehaviors(this.$form.get(0), settings, "serialize");
        }
        options.data[Drupal.Ajax.AJAX_REQUEST_PARAMETER] = 1;
        const pageState = drupalSettings.ajaxPageState;
        options.data["ajax_page_state[theme]"] = pageState.theme;
        options.data["ajax_page_state[theme_token]"] = pageState.theme_token;
        options.data["ajax_page_state[libraries]"] = pageState.libraries;
    };
    Drupal.Ajax.prototype.beforeSubmit = function (formValues, element, options) {};
    Drupal.Ajax.prototype.beforeSend = function (xmlhttprequest, options) {
        if (this.$form) {
            options.extraData = options.extraData || {};
            options.extraData.ajax_iframe_upload = "1";
            const v = $.fieldValue(this.element);
            if (v !== null) options.extraData[this.element.name] = v;
        }
        $(this.element).prop("disabled", true);
        if (!this.progress || !this.progress.type) return;
        const progressIndicatorMethod = `setProgressIndicator${this.progress.type.slice(0, 1).toUpperCase()}${this.progress.type.slice(1).toLowerCase()}`;
        if (progressIndicatorMethod in this && typeof this[progressIndicatorMethod] === "function") this[progressIndicatorMethod].call(this);
    };
    Drupal.theme.ajaxProgressThrobber = (message) => {
        const messageMarkup = typeof message === "string" ? Drupal.theme("ajaxProgressMessage", message) : "";
        const throbber = '<div class="throbber">&nbsp;</div>';
        return `<div class="ajax-progress ajax-progress-throbber">${throbber}${messageMarkup}</div>`;
    };
    Drupal.theme.ajaxProgressIndicatorFullscreen = () => '<div class="ajax-progress ajax-progress-fullscreen">&nbsp;</div>';
    Drupal.theme.ajaxProgressMessage = (message) => `<div class="message">${message}</div>`;
    Drupal.theme.ajaxProgressBar = ($element) => $('<div class="ajax-progress ajax-progress-bar"></div>').append($element);
    Drupal.Ajax.prototype.setProgressIndicatorBar = function () {
        const progressBar = new Drupal.ProgressBar(`ajax-progress-${this.element.id}`, $.noop, this.progress.method, $.noop);
        if (this.progress.message) progressBar.setProgress(-1, this.progress.message);
        if (this.progress.url) progressBar.startMonitoring(this.progress.url, this.progress.interval || 1500);
        this.progress.element = $(Drupal.theme("ajaxProgressBar", progressBar.element));
        this.progress.object = progressBar;
        $(this.element).after(this.progress.element);
    };
    Drupal.Ajax.prototype.setProgressIndicatorThrobber = function () {
        this.progress.element = $(Drupal.theme("ajaxProgressThrobber", this.progress.message));
        if ($(this.element).closest("[data-drupal-ajax-container]").length) $(this.element).closest("[data-drupal-ajax-container]").after(this.progress.element);
        else $(this.element).after(this.progress.element);
    };
    Drupal.Ajax.prototype.setProgressIndicatorFullscreen = function () {
        this.progress.element = $(Drupal.theme("ajaxProgressIndicatorFullscreen"));
        $("body").append(this.progress.element);
    };
    Drupal.Ajax.prototype.commandExecutionQueue = function (response, status) {
        const ajaxCommands = this.commands;
        return Object.keys(response || {}).reduce(
            (executionQueue, key) =>
                executionQueue.then(() => {
                    const { command } = response[key];
                    if (command && ajaxCommands[command]) return ajaxCommands[command](this, response[key], status);
                }),
            Promise.resolve()
        );
    };
    Drupal.Ajax.prototype.success = function (response, status) {
        if (this.progress.element) $(this.progress.element).remove();
        if (this.progress.object) this.progress.object.stopMonitoring();
        $(this.element).prop("disabled", false);
        const elementParents = $(this.element).parents("[data-drupal-selector]").addBack().toArray();
        const focusChanged = Object.keys(response || {}).some((key) => {
            const { command, method } = response[key];
            return command === "focusFirst" || command === "openDialog" || (command === "invoke" && method === "focus");
        });
        return this.commandExecutionQueue(response, status)
            .then(() => {
                if (!focusChanged) {
                    let target = false;
                    if (this.element) {
                        if ($(this.element).data("refocus-blur") && this.preCommandsFocusedElementSelector) target = document.querySelector(`[data-drupal-selector="${this.preCommandsFocusedElementSelector}"]`);
                        if (!target && !$(this.element).data("disable-refocus")) {
                            for (let n = elementParents.length - 1; !target && n >= 0; n--) target = document.querySelector(`[data-drupal-selector="${elementParents[n].getAttribute("data-drupal-selector")}"]`);
                        }
                    }
                    if (target) $(target).trigger("focus");
                }
                if (this.$form && document.body.contains(this.$form.get(0))) {
                    const settings = this.settings || drupalSettings;
                    Drupal.attachBehaviors(this.$form.get(0), settings);
                }
                this.settings = null;
            })
            .catch((error) => console.error(Drupal.t("An error occurred during the execution of the Ajax response: !error", { "!error": error })));
    };
    Drupal.Ajax.prototype.getEffect = function (response) {
        const type = response.effect || this.effect;
        const speed = response.speed || this.speed;
        const effect = {};
        if (type === "none") {
            effect.showEffect = "show";
            effect.hideEffect = "hide";
            effect.showSpeed = "";
        } else if (type === "fade") {
            effect.showEffect = "fadeIn";
            effect.hideEffect = "fadeOut";
            effect.showSpeed = speed;
        } else {
            effect.showEffect = `${type}Toggle`;
            effect.hideEffect = `${type}Toggle`;
            effect.showSpeed = speed;
        }
        return effect;
    };
    Drupal.Ajax.prototype.error = function (xmlhttprequest, uri, customMessage) {
        if (this.progress.element) $(this.progress.element).remove();
        if (this.progress.object) this.progress.object.stopMonitoring();
        $(this.wrapper).show();
        $(this.element).prop("disabled", false);
        if (this.$form && document.body.contains(this.$form.get(0))) {
            const settings = this.settings || drupalSettings;
            Drupal.attachBehaviors(this.$form.get(0), settings);
        }
        throw new Drupal.AjaxError(xmlhttprequest, uri, customMessage);
    };
    Drupal.theme.ajaxWrapperNewContent = ($newContent, ajax, response) =>
        (response.effect || ajax.effect) !== "none" && $newContent.filter((i) => !($newContent[i].nodeName === "#comment" || ($newContent[i].nodeName === "#text" && /^(\s|\n|\r)*$/.test($newContent[i].textContent)))).length > 1
            ? Drupal.theme("ajaxWrapperMultipleRootElements", $newContent)
            : $newContent;
    Drupal.theme.ajaxWrapperMultipleRootElements = ($elements) => $("<div></div>").append($elements);
    Drupal.AjaxCommands = function () {};
    Drupal.AjaxCommands.prototype = {
        insert(ajax, response) {
            const $wrapper = response.selector ? $(response.selector) : $(ajax.wrapper);
            const method = response.method || ajax.method;
            const effect = ajax.getEffect(response);
            const settings = response.settings || ajax.settings || drupalSettings;
            let $newContent = $($.parseHTML(response.data, document, true));
            $newContent = Drupal.theme("ajaxWrapperNewContent", $newContent, ajax, response);
            switch (method) {
                case "html":
                case "replaceWith":
                case "replaceAll":
                case "empty":
                case "remove":
                    Drupal.detachBehaviors($wrapper.get(0), settings);
                    break;
                default:
                    break;
            }
            $wrapper[method]($newContent);
            if (effect.showEffect !== "show") $newContent.hide();
            const $ajaxNewContent = $newContent.find(".ajax-new-content");
            if ($ajaxNewContent.length) {
                $ajaxNewContent.hide();
                $newContent.show();
                $ajaxNewContent[effect.showEffect](effect.showSpeed);
            } else {
                if (effect.showEffect !== "show") $newContent[effect.showEffect](effect.showSpeed);
            }
            if ($newContent.parents("html").length)
                $newContent.each((index, element) => {
                    if (element.nodeType === Node.ELEMENT_NODE) Drupal.attachBehaviors(element, settings);
                });
        },
        remove(ajax, response, status) {
            const settings = response.settings || ajax.settings || drupalSettings;
            $(response.selector)
                .each(function () {
                    Drupal.detachBehaviors(this, settings);
                })
                .remove();
        },
        changed(ajax, response, status) {
            const $element = $(response.selector);
            if (!$element.hasClass("ajax-changed")) {
                $element.addClass("ajax-changed");
                if (response.asterisk) $element.find(response.asterisk).append(` <abbr class="ajax-changed" title="${Drupal.t("Changed")}">*</abbr> `);
            }
        },
        alert(ajax, response, status) {
            window.alert(response.text);
        },
        announce(ajax, response) {
            if (response.priority) Drupal.announce(response.text, response.priority);
            else Drupal.announce(response.text);
        },
        redirect(ajax, response, status) {
            window.location = response.url;
        },
        css(ajax, response, status) {
            $(response.selector).css(response.argument);
        },
        settings(ajax, response, status) {
            const ajaxSettings = drupalSettings.ajax;
            if (ajaxSettings)
                Drupal.ajax.expired().forEach((instance) => {
                    if (instance.selector) {
                        const selector = instance.selector.replace("#", "");
                        if (selector in ajaxSettings) delete ajaxSettings[selector];
                    }
                });
            if (response.merge) $.extend(true, drupalSettings, response.settings);
            else ajax.settings = response.settings;
        },
        data(ajax, response, status) {
            $(response.selector).data(response.name, response.value);
        },
        focusFirst(ajax, response, status) {
            let focusChanged = false;
            const container = document.querySelector(response.selector);
            if (container) {
                const tabbableElements = tabbable(container);
                if (tabbableElements.length) {
                    tabbableElements[0].focus();
                    focusChanged = true;
                } else {
                    if (isFocusable(container)) {
                        container.focus();
                        focusChanged = true;
                    }
                }
            }
            if (ajax.hasOwnProperty("element") && !focusChanged) ajax.element.focus();
        },
        invoke(ajax, response, status) {
            const $element = $(response.selector);
            $element[response.method](...response.args);
        },
        restripe(ajax, response, status) {
            $(response.selector).find("> tbody > tr:visible, > tr:visible").removeClass("odd even").filter(":even").addClass("odd").end().filter(":odd").addClass("even");
        },
        update_build_id(ajax, response, status) {
            document.querySelectorAll(`input[name="form_build_id"][value="${response.old}"]`).forEach((item) => {
                item.value = response.new;
            });
        },
        add_css(ajax, response, status) {
            if (typeof response.data === "string") {
                Drupal.deprecationError({ message: "Passing a string to the Drupal.ajax.add_css() method is deprecated in 10.1.0 and is removed from drupal:11.0.0. See https://www.drupal.org/node/3154948." });
                $("head").prepend(response.data);
                return;
            }
            const allUniqueBundleIds = response.data.map(function (style) {
                const uniqueBundleId = style.href + ajax.instanceIndex;
                loadjs(`css!${style.href}`, uniqueBundleId, {
                    before(path, styleEl) {
                        Object.keys(style).forEach((attributeKey) => {
                            styleEl.setAttribute(attributeKey, style[attributeKey]);
                        });
                    },
                });
                return uniqueBundleId;
            });
            return new Promise((resolve, reject) => {
                loadjs.ready(allUniqueBundleIds, {
                    success() {
                        resolve();
                    },
                    error(depsNotFound) {
                        const message = Drupal.t(`The following files could not be loaded: @dependencies`, { "@dependencies": depsNotFound.join(", ") });
                        reject(message);
                    },
                });
            });
        },
        message(ajax, response) {
            const messages = new Drupal.Message(document.querySelector(response.messageWrapperQuerySelector));
            if (response.clearPrevious) messages.clear();
            messages.add(response.message, response.messageOptions);
        },
        add_js(ajax, response, status) {
            const parentEl = document.querySelector(response.selector || "body");
            const settings = ajax.settings || drupalSettings;
            const allUniqueBundleIds = response.data.map((script) => {
                const uniqueBundleId = script.src + ajax.instanceIndex;
                loadjs(script.src, uniqueBundleId, {
                    async: false,
                    before(path, scriptEl) {
                        Object.keys(script).forEach((attributeKey) => {
                            scriptEl.setAttribute(attributeKey, script[attributeKey]);
                        });
                        parentEl.appendChild(scriptEl);
                        return false;
                    },
                });
                return uniqueBundleId;
            });
            return new Promise((resolve, reject) => {
                loadjs.ready(allUniqueBundleIds, {
                    success() {
                        Drupal.attachBehaviors(parentEl, settings);
                        resolve();
                    },
                    error(depsNotFound) {
                        const message = Drupal.t(`The following files could not be loaded: @dependencies`, { "@dependencies": depsNotFound.join(", ") });
                        reject(message);
                    },
                });
            });
        },
        scrollTop(ajax, response) {
            const offset = $(response.selector).offset();
            let scrollTarget = response.selector;
            while ($(scrollTarget).scrollTop() === 0 && $(scrollTarget).parent()) scrollTarget = $(scrollTarget).parent();
            if (offset.top - 10 < $(scrollTarget).scrollTop()) $(scrollTarget).animate({ scrollTop: offset.top - 10 }, 500);
        },
    };
    const stopEvent = (xhr, settings) => {
        return xhr.getResponseHeader("X-Drupal-Ajax-Token") === "1" && settings.isInProgress && settings.isInProgress();
    };
    $.extend(true, $.event.special, {
        ajaxSuccess: {
            trigger(event, xhr, settings) {
                if (stopEvent(xhr, settings)) return false;
            },
        },
        ajaxComplete: {
            trigger(event, xhr, settings) {
                if (stopEvent(xhr, settings)) {
                    $.active++;
                    return false;
                }
            },
        },
    });
})(jQuery, window, Drupal, drupalSettings, loadjs, window.tabbable);
(function ($, Drupal, once) {
    "use strict";
    Drupal.behaviors.webformSubmitOnce = {
        clear: function () {
            var $form = $(".js-webform-submit-once");
            $form.removeData("webform-submitted");
            $form.find(".js-webform-wizard-pages-links :submit, .form-actions :submit").removeClass("is-disabled");
            $form.find(".form-actions .ajax-progress.ajax-progress-throbber").remove();
        },
        attach: function (context) {
            $(once("webform-submit-once", ".js-webform-submit-once", context)).each(function () {
                var $form = $(this);
                $form.removeData("webform-submitted");
                $form.find(".js-webform-wizard-pages-links :submit, .form-actions :submit").removeClass("js-webform-submit-clicked");
                $form.find(".js-webform-wizard-pages-links :submit, .form-actions :submit").on("click", function () {
                    $form.find(".js-webform-wizard-pages-links :submit, .form-actions :submit").removeClass("js-webform-submit-clicked");
                    $(this).addClass("js-webform-submit-clicked");
                });
                $(this).on("submit", function () {
                    var $clickedButton = $form.find(".js-webform-wizard-pages-links :submit.js-webform-submit-clicked, .form-actions :submit.js-webform-submit-clicked");
                    if (!$clickedButton.attr("formnovalidate") && $.isFunction(jQuery.fn.valid) && !$form.valid()) return false;
                    if ($form.data("webform-submitted")) return false;
                    $form.data("webform-submitted", "true");
                    $form.find(".js-webform-wizard-pages-links :submit, .form-actions :submit").addClass("is-disabled");
                    $clickedButton.after(Drupal.theme.ajaxProgressThrobber());
                });
            });
        },
    };
})(jQuery, Drupal, once);
(function ($, Drupal, once) {
    "use strict";
    var hasLocalStorage = (function () {
        try {
            localStorage.setItem("webform", "webform");
            localStorage.removeItem("webform");
            return true;
        } catch (e) {
            return false;
        }
    })();
    Drupal.behaviors.webformDetailsSave = {
        attach: function (context) {
            if (!hasLocalStorage) return;
            $(once("webform-details-summary-save", "details > summary", context)).on("click", function () {
                var $details = $(this).parent();
                if ($details[0].hasAttribute("data-webform-details-nosave")) return;
                var name = Drupal.webformDetailsSaveGetName($details);
                if (!name) return;
                var open = $details.attr("open") !== "open" ? "1" : "0";
                localStorage.setItem(name, open);
            });
            $(once("webform-details-save", "details", context)).each(function () {
                var $details = $(this);
                var name = Drupal.webformDetailsSaveGetName($details);
                if (!name) return;
                var open = localStorage.getItem(name);
                if (open === null) return;
                if (open === "1") $details.attr("open", "open");
                else $details.removeAttr("open");
            });
        },
    };
    Drupal.webformDetailsSaveGetName = function ($details) {
        if (!hasLocalStorage) return "";
        if ($details.hasClass("vertical-tabs__pane")) return "";
        var webformId = $details.attr("data-webform-element-id");
        if (webformId) return "Drupal.webform." + webformId.replace("--", ".");
        var detailsId = $details.attr("id");
        if (!detailsId) return "";
        var $form = $details.parents("form");
        if (!$form.length || !$form.attr("id")) return "";
        var formId = $form.attr("id");
        if (!formId) return "";
        formId = formId.replace(/--.+?$/, "").replace(/-/g, "_");
        detailsId = detailsId.replace(/--.+?$/, "").replace(/-/g, "_");
        return "Drupal.webform." + formId + "." + detailsId;
    };
})(jQuery, Drupal, once);
(function ($, Drupal, once) {
    "use strict";
    Drupal.webform = Drupal.webform || {};
    Drupal.webform.detailsToggle = Drupal.webform.detailsToggle || {};
    Drupal.webform.detailsToggle.options = Drupal.webform.detailsToggle.options || {};
    Drupal.behaviors.webformDetailsToggle = {
        attach: function (context) {
            $(once("webform-details-toggle", ".js-webform-details-toggle", context)).each(function () {
                var $form = $(this);
                var $tabs = $form.find(".webform-tabs");
                var selector = $tabs.length ? ".webform-tab" : ".js-webform-details-toggle, .webform-elements";
                var $details = $form.find("details").filter(function () {
                    var $parents = $(this).parentsUntil(selector);
                    return $parents.find("details").length === 0;
                });
                if ($details.length < 2) return;
                var options = $.extend({ button: '<button type="button" class="webform-details-toggle-state"></button>' }, Drupal.webform.detailsToggle.options);
                var $toggle = $(options.button)
                    .attr("title", Drupal.t("Toggle details widget state."))
                    .on("click", function (e) {
                        var $details = $form.find("details:not(.vertical-tabs__pane)");
                        var open;
                        if (Drupal.webform.detailsToggle.isFormDetailsOpen($form)) {
                            $details.removeAttr("open");
                            open = 0;
                        } else {
                            $details.attr("open", "open");
                            open = 1;
                        }
                        Drupal.webform.detailsToggle.setDetailsToggleLabel($form);
                        if (Drupal.webformDetailsSaveGetName)
                            $details.each(function () {
                                var name = Drupal.webformDetailsSaveGetName($(this));
                                if (name) localStorage.setItem(name, open);
                            });
                    })
                    .wrap('<div class="webform-details-toggle-state-wrapper"></div>')
                    .parent();
                if ($tabs.length) $tabs.find(".item-list:first-child").eq(0).before($toggle);
                else $details.eq(0).before($toggle);
                Drupal.webform.detailsToggle.setDetailsToggleLabel($form);
            });
        },
    };
    Drupal.webform.detailsToggle.isFormDetailsOpen = function ($form) {
        return $form.find("details[open]").length === $form.find("details").length;
    };
    Drupal.webform.detailsToggle.setDetailsToggleLabel = function ($form) {
        var isOpen = Drupal.webform.detailsToggle.isFormDetailsOpen($form);
        var label = isOpen ? Drupal.t("Collapse all") : Drupal.t("Expand all");
        $form.find(".webform-details-toggle-state").html(label);
        var text = isOpen ? Drupal.t("All details have been expanded.") : Drupal.t("All details have been collapsed.");
        Drupal.announce(text);
    };
})(jQuery, Drupal, once);
(function ($, Drupal, once) {
    "use strict";
    var hasLocalStorage = (function () {
        try {
            localStorage.setItem("webform", "webform");
            localStorage.removeItem("webform");
            return true;
        } catch (e) {
            return false;
        }
    })();
    var hasSessionStorage = (function () {
        try {
            sessionStorage.setItem("webform", "webform");
            sessionStorage.removeItem("webform");
            return true;
        } catch (e) {
            return false;
        }
    })();
    Drupal.behaviors.webformMessageClose = {
        attach: function (context) {
            $(once("webform-message--close", ".js-webform-message--close", context)).each(function () {
                var $element = $(this);
                var id = $element.attr("data-message-id");
                var storage = $element.attr("data-message-storage");
                var effect = $element.attr("data-message-close-effect") || "hide";
                switch (effect) {
                    case "slide":
                        effect = "slideUp";
                        break;
                    case "fade":
                        effect = "fadeOut";
                        break;
                }
                if (isClosed($element, storage, id)) return;
                if ($element.attr("style") !== "display: none;" && !$element.hasClass("js-webform-states-hidden")) $element.show();
                $element.find(".js-webform-message__link").on("click", function (event) {
                    $element[effect]();
                    setClosed($element, storage, id);
                    $element.trigger("close");
                    event.preventDefault();
                });
            });
        },
    };
    function isClosed($element, storage, id) {
        if (!id || !storage) return false;
        switch (storage) {
            case "local":
                if (hasLocalStorage) return localStorage.getItem("Drupal.webform.message." + id) || false;
                return false;
            case "session":
                if (hasSessionStorage) return sessionStorage.getItem("Drupal.webform.message." + id) || false;
                return false;
            default:
                return false;
        }
    }
    function setClosed($element, storage, id) {
        if (!id || !storage) return;
        switch (storage) {
            case "local":
                if (hasLocalStorage) localStorage.setItem("Drupal.webform.message." + id, true);
                break;
            case "session":
                if (hasSessionStorage) sessionStorage.setItem("Drupal.webform.message." + id, true);
                break;
            case "user":
            case "state":
            case "custom":
                $.get($element.find(".js-webform-message__link").attr("href"));
                return true;
        }
    }
})(jQuery, Drupal, once);
(function (Drupal, drupalSettings) {
    "use strict";
    Drupal.antibot = {};
    Drupal.behaviors.antibot = {
        attach: function (context) {
            drupalSettings.antibot.human = false;
            document.body.addEventListener("mousemove", function () {
                Drupal.antibot.unlockForms();
            });
            document.body.addEventListener("touchmove", function () {
                Drupal.antibot.unlockForms();
            });
            document.body.addEventListener("keydown", function (e) {
                if (e.code == "Tab" || e.code == "Enter") Drupal.antibot.unlockForms();
            });
        },
    };
    Drupal.antibot.unlockForms = function () {
        if (!drupalSettings.antibot.human) {
            if (drupalSettings.antibot.forms != undefined)
                Object.values(drupalSettings.antibot.forms).forEach(function (config) {
                    const form = document.getElementById(config.id);
                    if (form) {
                        form.setAttribute("action", form.getAttribute("data-action"));
                        const input = form.querySelector('input[name="antibot_key"]');
                        if (input)
                            input.value = config.key
                                .split("")
                                .reverse()
                                .join("")
                                .match(/.{1,2}/g)
                                .map((value) => value.split("").reverse().join(""))
                                .join("");
                    }
                });
            drupalSettings.antibot.human = true;
        }
    };
})(Drupal, drupalSettings);
(function ($, Drupal) {
    Drupal.behaviors.recaptcha = {
        attach: function (context) {
            $(".g-recaptcha", context).each(function () {
                if (typeof grecaptcha === "undefined" || typeof grecaptcha.render !== "function") return;
                if ($(this).closest("body").length > 0)
                    if ($(this).hasClass("recaptcha-processed")) grecaptcha.reset();
                    else {
                        grecaptcha.render(this, $(this).data());
                        $(this).addClass("recaptcha-processed");
                    }
            });
        },
    };
    window.drupalRecaptchaOnload = function () {
        $(".g-recaptcha").each(function () {
            if (!$(this).hasClass("recaptcha-processed")) {
                grecaptcha.render(this, $(this).data());
                $(this).addClass("recaptcha-processed");
            }
        });
    };
})(jQuery, Drupal);
(function ($, Drupal, once) {
    "use strict";
    Drupal.behaviors.webformSelectOptionsDisabled = {
        attach: function (context) {
            $(once("webform-select-options-disabled", "select[data-webform-select-options-disabled]", context)).each(function () {
                var $select = $(this);
                var disabled = $select.attr("data-webform-select-options-disabled").split(/\s*,\s*/);
                $select
                    .find("option")
                    .filter(function isDisabled() {
                        return $.inArray(this.value, disabled) !== -1;
                    })
                    .attr("disabled", "disabled");
            });
        },
    };
})(jQuery, Drupal, once);
(function ($, Drupal) {
    "use strict";
    Drupal.behaviors.customCKEditorConfig = {
        attach: function (context, settings) {
            $(context).ready(function () {
                d_p_ckeditor();
            });
            function d_p_ckeditor() {
                if (typeof Drupal.CKEditor5Instances !== "undefined")
                    $(once("d_p_ckeditor_centered", ".d_p_ckeditor_centered", context)).each(function () {
                        const editor_id = $(this).find("textarea").attr("data-ckeditor5-id");
                        const editor = Drupal.CKEditor5Instances.get(editor_id);
                        if (typeof editor === "undefined") return;
                        const model = editor.model;
                        const document = model.document;
                        editor.commands.get("alignment").on("execute", (evt, args) => {
                            const alignment = args[0]?.value;
                            const current_focus = document.selection.focus;
                            const current_anchor = document.selection.anchor;
                            const current_first_range = document.selection.getFirstRange();
                            const current_selection_is_backward = document.selection.isBackward;
                            const selected_blocks = Array.from(document.selection.getSelectedBlocks()).filter((block) => editor.commands.get("alignment")._canBeAligned(block));
                            let class_updated = false;
                            for (const block of selected_blocks) {
                                const block_view = editor.editing.mapper.toViewElement(block);
                                if (alignment === "left") {
                                    editor.editing.view.change((writer) => {
                                        writer.addClass("text-align-left", block_view);
                                    });
                                    class_updated = true;
                                } else {
                                    if (block_view.hasClass("text-align-left")) {
                                        editor.editing.view.change((writer) => {
                                            writer.removeClass("text-align-left", block_view);
                                        });
                                        class_updated = true;
                                    }
                                }
                            }
                            if (class_updated) {
                                editor.data.set(editor.editing.view.getDomRoot().getInnerHTML(), { batchType: { isUndoable: true } });
                                model.change((writer) => {
                                    writer.setSelection(current_first_range, { backward: current_selection_is_backward });
                                    writer.setSelectionFocus(current_focus, current_anchor);
                                });
                            }
                        });
                    });
                else window.setTimeout(d_p_ckeditor, 500);
            }
        },
    };
})(jQuery, Drupal);
(function ($, Drupal) {
    "use strict";
    Drupal.behaviors.d_p_side_by_side = {
        attach: function (context, settings) {
            var container = $(".d-p-side-by-side .items", context);
            container.find(".items-wrapper .list-item-wrapper").each(function (key, value) {
                var $this = $(this);
                if ($this.find(".image-background-container").length) $this.find(".user-image-background").css("background-color", "unset");
            });
        },
    };
})(jQuery, Drupal);
(function ($, Drupal) {
    "use strict";
})(jQuery, Drupal);
(function ($, Drupal) {
    "use strict";
    Drupal.behaviors.t_blog_feed = {
        attach: function (context, settings) {
            let $view = $(".view-id-t_blog_feed", context);
            $(once("t_blog_feed", $view)).each(function (index, item) {
                initTabs($(item));
            });
            function initTabs($context) {
                const mainClassPrefix = "blog-feed";
                let $viewHeaders = $(".view-header", $context);
                let $attachmentAfter = $(".attachment-after", $context);
                let $tabs = $(createTabs($viewHeaders));
                let $tabsContent = $(".views-element-container", $context);
                let $tabsBtns = $tabs.find("." + mainClassPrefix + "-tabs__link");
                $attachmentAfter.before($tabs);
                $tabsContent.addClass(mainClassPrefix + "-tabs__content");
                let indexTab = $tabs
                    .find("." + mainClassPrefix + "-tabs__link--selected")
                    .closest("." + mainClassPrefix + "-tabs__tab")
                    .index();
                toggleTabContent(indexTab);
                $tabsBtns.on("click", function (e) {
                    e.preventDefault();
                    $tabsBtns.removeClass(mainClassPrefix + "-tabs__link--selected").attr("aria-selected", false);
                    $(this)
                        .addClass(mainClassPrefix + "-tabs__link--selected")
                        .attr("aria-selected", true);
                    toggleTabContent(
                        $(this)
                            .closest("." + mainClassPrefix + "-tabs__tab")
                            .index()
                    );
                });
                function toggleTabContent(indexTab) {
                    $tabsContent.removeClass(mainClassPrefix + "-tabs__content--show");
                    $tabsContent.eq(indexTab).addClass(mainClassPrefix + "-tabs__content--show");
                }
                function createTabs($titles) {
                    let html = "";
                    html = '<div class="' + mainClassPrefix + '-tabs">';
                    html += '<ul class="' + mainClassPrefix + '-tabs__list" aria-role="tablist">';
                    $titles.each(function (index, item) {
                        let _item = $(item);
                        let titleText = _item.text();
                        let ariaTitle = titleText.toLowerCase().trim().replace(/\s/g, "-");
                        _item.hide();
                        _item
                            .closest(".views-element-container")
                            .attr("id", "tab-content-" + ariaTitle)
                            .attr("role", "tabpanel");
                        html += createSingleTab(index, titleText, ariaTitle);
                    });
                    html += "</ul>";
                    html += "</div>";
                    return html;
                }
                function createSingleTab(index, titleText, ariaTitle) {
                    let html = "";
                    let isSelected = index === 0;
                    let ariaSelected = isSelected ? "true" : "false";
                    let selectedClass = isSelected ? " " + mainClassPrefix + "-tabs__link--selected" : "";
                    let attributes = { href: "#tab-content-" + ariaTitle, class: mainClassPrefix + "-tabs__link" + selectedClass, role: "tab", "aria-controls": "tab-content-" + ariaTitle, "aria-selected": ariaSelected };
                    html += '<li class="' + mainClassPrefix + '-tabs__tab">';
                    html += "<a";
                    for (let attr in attributes) html += " " + attr + '="' + attributes[attr] + '"';
                    html += ">";
                    html += titleText;
                    html += "</a>";
                    html += "</li>";
                    return html;
                }
            }
        },
    };
})(jQuery, Drupal);
(function ($, Drupal) {
    "use strict";
    Drupal.behaviors.t_case_study_cards = {
        attach: function (context, settings) {
            if (settings.t_case_study_cards.display)
                $(once("t_case_study_cards", ".field--name-field-t-case-study-cards-items", context)).each(function () {
                    if ($(this).find(".t-case-study-cards-slick-slide").length < 3) return;
                    $(this).slick({
                        infinite: true,
                        centerMode: true,
                        slidesToShow: 3,
                        lazyLoad: "progressive",
                        variableWidth: true,
                        autoplay: false,
                        touchMove: true,
                        arrow: false,
                        prevArrow: '<button type="button" class="t-case-study-card-prev">Previous</button>',
                        nextArrow: '<button type="button" class="t-case-study-card-next">Next</button>',
                        responsive: [
                            { breakpoint: 1200, settings: { arrows: true, centerMode: true, centerPadding: "0", slidesToShow: 2 } },
                            { breakpoint: 992, settings: { arrows: true, centerMode: true, centerPadding: "0", slidesToShow: 1 } },
                            { breakpoint: 480, settings: { arrows: true, centerMode: true, centerPadding: "0", slidesToShow: 1 } },
                        ],
                    });
                });
        },
    };
})(jQuery, Drupal);
/* @license MIT https://github.com/kenwheeler/slick/#license */
!(function (i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? (module.exports = i(require("jquery"))) : i(jQuery);
})(function (i) {
    "use strict";
    var e = window.Slick || {};
    ((e = (function () {
        var e = 0;
        return function (t, o) {
            var s,
                n = this;
            (n.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: i(t),
                appendDots: i(t),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function (e, t) {
                    return i('<button type="button" />').text(t + 1);
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: 0.35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3,
            }),
                (n.initials = {
                    animating: !1,
                    dragging: !1,
                    autoPlayTimer: null,
                    currentDirection: 0,
                    currentLeft: null,
                    currentSlide: 0,
                    direction: 1,
                    $dots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    $nextArrow: null,
                    $prevArrow: null,
                    scrolling: !1,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    swiping: !1,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: !1,
                    unslicked: !1,
                }),
                i.extend(n, n.initials),
                (n.activeBreakpoint = null),
                (n.animType = null),
                (n.animProp = null),
                (n.breakpoints = []),
                (n.breakpointSettings = []),
                (n.cssTransitions = !1),
                (n.focussed = !1),
                (n.interrupted = !1),
                (n.hidden = "hidden"),
                (n.paused = !0),
                (n.positionProp = null),
                (n.respondTo = null),
                (n.rowCount = 1),
                (n.shouldClick = !0),
                (n.$slider = i(t)),
                (n.$slidesCache = null),
                (n.transformType = null),
                (n.transitionType = null),
                (n.visibilityChange = "visibilitychange"),
                (n.windowWidth = 0),
                (n.windowTimer = null),
                (s = i(t).data("slick") || {}),
                (n.options = i.extend({}, n.defaults, o, s)),
                (n.currentSlide = n.options.initialSlide),
                (n.originalSettings = n.options),
                void 0 !== document.mozHidden ? ((n.hidden = "mozHidden"), (n.visibilityChange = "mozvisibilitychange")) : void 0 !== document.webkitHidden && ((n.hidden = "webkitHidden"), (n.visibilityChange = "webkitvisibilitychange")),
                (n.autoPlay = i.proxy(n.autoPlay, n)),
                (n.autoPlayClear = i.proxy(n.autoPlayClear, n)),
                (n.autoPlayIterator = i.proxy(n.autoPlayIterator, n)),
                (n.changeSlide = i.proxy(n.changeSlide, n)),
                (n.clickHandler = i.proxy(n.clickHandler, n)),
                (n.selectHandler = i.proxy(n.selectHandler, n)),
                (n.setPosition = i.proxy(n.setPosition, n)),
                (n.swipeHandler = i.proxy(n.swipeHandler, n)),
                (n.dragHandler = i.proxy(n.dragHandler, n)),
                (n.keyHandler = i.proxy(n.keyHandler, n)),
                (n.instanceUid = e++),
                (n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
                n.registerBreakpoints(),
                n.init(!0);
        };
    })()).prototype.activateADA = function () {
        this.$slideTrack.find(".slick-active").attr({ "aria-hidden": "false" }).find("a, input, button, select").attr({ tabindex: "0" });
    }),
        (e.prototype.addSlide = e.prototype.slickAdd = function (e, t, o) {
            var s = this;
            if ("boolean" == typeof t) (o = t), (t = null);
            else if (t < 0 || t >= s.slideCount) return !1;
            s.unload(),
                "number" == typeof t
                    ? 0 === t && 0 === s.$slides.length
                        ? i(e).appendTo(s.$slideTrack)
                        : o
                        ? i(e).insertBefore(s.$slides.eq(t))
                        : i(e).insertAfter(s.$slides.eq(t))
                    : !0 === o
                    ? i(e).prependTo(s.$slideTrack)
                    : i(e).appendTo(s.$slideTrack),
                (s.$slides = s.$slideTrack.children(this.options.slide)),
                s.$slideTrack.children(this.options.slide).detach(),
                s.$slideTrack.append(s.$slides),
                s.$slides.each(function (e, t) {
                    i(t).attr("data-slick-index", e);
                }),
                (s.$slidesCache = s.$slides),
                s.reinit();
        }),
        (e.prototype.animateHeight = function () {
            var i = this;
            if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
                var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
                i.$list.animate({ height: e }, i.options.speed);
            }
        }),
        (e.prototype.animateSlide = function (e, t) {
            var o = {},
                s = this;
            s.animateHeight(),
                !0 === s.options.rtl && !1 === s.options.vertical && (e = -e),
                !1 === s.transformsEnabled
                    ? !1 === s.options.vertical
                        ? s.$slideTrack.animate({ left: e }, s.options.speed, s.options.easing, t)
                        : s.$slideTrack.animate({ top: e }, s.options.speed, s.options.easing, t)
                    : !1 === s.cssTransitions
                    ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft),
                      i({ animStart: s.currentLeft }).animate(
                          { animStart: e },
                          {
                              duration: s.options.speed,
                              easing: s.options.easing,
                              step: function (i) {
                                  (i = Math.ceil(i)), !1 === s.options.vertical ? ((o[s.animType] = "translate(" + i + "px, 0px)"), s.$slideTrack.css(o)) : ((o[s.animType] = "translate(0px," + i + "px)"), s.$slideTrack.css(o));
                              },
                              complete: function () {
                                  t && t.call();
                              },
                          }
                      ))
                    : (s.applyTransition(),
                      (e = Math.ceil(e)),
                      !1 === s.options.vertical ? (o[s.animType] = "translate3d(" + e + "px, 0px, 0px)") : (o[s.animType] = "translate3d(0px," + e + "px, 0px)"),
                      s.$slideTrack.css(o),
                      t &&
                          setTimeout(function () {
                              s.disableTransition(), t.call();
                          }, s.options.speed));
        }),
        (e.prototype.getNavTarget = function () {
            var e = this,
                t = e.options.asNavFor;
            return t && null !== t && (t = i(t).not(e.$slider)), t;
        }),
        (e.prototype.asNavFor = function (e) {
            var t = this.getNavTarget();
            null !== t &&
                "object" == typeof t &&
                t.each(function () {
                    var t = i(this).slick("getSlick");
                    t.unslicked || t.slideHandler(e, !0);
                });
        }),
        (e.prototype.applyTransition = function (i) {
            var e = this,
                t = {};
            !1 === e.options.fade ? (t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase) : (t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase),
                !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
        }),
        (e.prototype.autoPlay = function () {
            var i = this;
            i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed));
        }),
        (e.prototype.autoPlayClear = function () {
            var i = this;
            i.autoPlayTimer && clearInterval(i.autoPlayTimer);
        }),
        (e.prototype.autoPlayIterator = function () {
            var i = this,
                e = i.currentSlide + i.options.slidesToScroll;
            i.paused ||
                i.interrupted ||
                i.focussed ||
                (!1 === i.options.infinite &&
                    (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? (i.direction = 0) : 0 === i.direction && ((e = i.currentSlide - i.options.slidesToScroll), i.currentSlide - 1 == 0 && (i.direction = 1))),
                i.slideHandler(e));
        }),
        (e.prototype.buildArrows = function () {
            var e = this;
            !0 === e.options.arrows &&
                ((e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow")),
                (e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow")),
                e.slideCount > e.options.slidesToShow
                    ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
                      e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
                      e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows),
                      e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows),
                      !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"))
                    : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({ "aria-disabled": "true", tabindex: "-1" }));
        }),
        (e.prototype.buildDots = function () {
            var e,
                t,
                o = this;
            if (!0 === o.options.dots) {
                for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1) t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
                (o.$dots = t.appendTo(o.options.appendDots)), o.$dots.find("li").first().addClass("slick-active");
            }
        }),
        (e.prototype.buildOut = function () {
            var e = this;
            (e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide")),
                (e.slideCount = e.$slides.length),
                e.$slides.each(function (e, t) {
                    i(t)
                        .attr("data-slick-index", e)
                        .data("originalStyling", i(t).attr("style") || "");
                }),
                e.$slider.addClass("slick-slider"),
                (e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent()),
                (e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent()),
                e.$slideTrack.css("opacity", 0),
                (!0 !== e.options.centerMode && !0 !== e.options.swipeToSlide) || (e.options.slidesToScroll = 1),
                i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
                e.setupInfinite(),
                e.buildArrows(),
                e.buildDots(),
                e.updateDots(),
                e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0),
                !0 === e.options.draggable && e.$list.addClass("draggable");
        }),
        (e.prototype.buildRows = function () {
            var i,
                e,
                t,
                o,
                s,
                n,
                r,
                l = this;
            if (((o = document.createDocumentFragment()), (n = l.$slider.children()), l.options.rows > 1)) {
                for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) {
                    var d = document.createElement("div");
                    for (e = 0; e < l.options.rows; e++) {
                        var a = document.createElement("div");
                        for (t = 0; t < l.options.slidesPerRow; t++) {
                            var c = i * r + (e * l.options.slidesPerRow + t);
                            n.get(c) && a.appendChild(n.get(c));
                        }
                        d.appendChild(a);
                    }
                    o.appendChild(d);
                }
                l.$slider.empty().append(o),
                    l.$slider
                        .children()
                        .children()
                        .children()
                        .css({ width: 100 / l.options.slidesPerRow + "%", display: "inline-block" });
            }
        }),
        (e.prototype.checkResponsive = function (e, t) {
            var o,
                s,
                n,
                r = this,
                l = !1,
                d = r.$slider.width(),
                a = window.innerWidth || i(window).width();
            if (("window" === r.respondTo ? (n = a) : "slider" === r.respondTo ? (n = d) : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive)) {
                s = null;
                for (o in r.breakpoints) r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
                null !== s
                    ? null !== r.activeBreakpoint
                        ? (s !== r.activeBreakpoint || t) &&
                          ((r.activeBreakpoint = s),
                          "unslick" === r.breakpointSettings[s] ? r.unslick(s) : ((r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s])), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)),
                          (l = s))
                        : ((r.activeBreakpoint = s),
                          "unslick" === r.breakpointSettings[s] ? r.unslick(s) : ((r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s])), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)),
                          (l = s))
                    : null !== r.activeBreakpoint && ((r.activeBreakpoint = null), (r.options = r.originalSettings), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), (l = s)),
                    e || !1 === l || r.$slider.trigger("breakpoint", [r, l]);
            }
        }),
        (e.prototype.changeSlide = function (e, t) {
            var o,
                s,
                n,
                r = this,
                l = i(e.currentTarget);
            switch ((l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), (n = r.slideCount % r.options.slidesToScroll != 0), (o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll), e.data.message)) {
                case "previous":
                    (s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o), r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
                    break;
                case "next":
                    (s = 0 === o ? r.options.slidesToScroll : o), r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
                    break;
                case "index":
                    var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
                    r.slideHandler(r.checkNavigable(d), !1, t), l.children().trigger("focus");
                    break;
                default:
                    return;
            }
        }),
        (e.prototype.checkNavigable = function (i) {
            var e, t;
            if (((e = this.getNavigableIndexes()), (t = 0), i > e[e.length - 1])) i = e[e.length - 1];
            else
                for (var o in e) {
                    if (i < e[o]) {
                        i = t;
                        break;
                    }
                    t = e[o];
                }
            return i;
        }),
        (e.prototype.cleanUpEvents = function () {
            var e = this;
            e.options.dots &&
                null !== e.$dots &&
                (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)),
                !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)),
                e.$slider.off("focus.slick blur.slick"),
                !0 === e.options.arrows &&
                    e.slideCount > e.options.slidesToShow &&
                    (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
                    e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide),
                    !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))),
                e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
                e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
                e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
                e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
                e.$list.off("click.slick", e.clickHandler),
                i(document).off(e.visibilityChange, e.visibility),
                e.cleanUpSlideEvents(),
                !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler),
                !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler),
                i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange),
                i(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
                i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault),
                i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition);
        }),
        (e.prototype.cleanUpSlideEvents = function () {
            var e = this;
            e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1));
        }),
        (e.prototype.cleanUpRows = function () {
            var i,
                e = this;
            e.options.rows > 1 && ((i = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(i));
        }),
        (e.prototype.clickHandler = function (i) {
            !1 === this.shouldClick && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault());
        }),
        (e.prototype.destroy = function (e) {
            var t = this;
            t.autoPlayClear(),
                (t.touchObject = {}),
                t.cleanUpEvents(),
                i(".slick-cloned", t.$slider).detach(),
                t.$dots && t.$dots.remove(),
                t.$prevArrow &&
                    t.$prevArrow.length &&
                    (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()),
                t.$nextArrow &&
                    t.$nextArrow.length &&
                    (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()),
                t.$slides &&
                    (t.$slides
                        .removeClass("slick-slide slick-active slick-center slick-visible slick-current")
                        .removeAttr("aria-hidden")
                        .removeAttr("data-slick-index")
                        .each(function () {
                            i(this).attr("style", i(this).data("originalStyling"));
                        }),
                    t.$slideTrack.children(this.options.slide).detach(),
                    t.$slideTrack.detach(),
                    t.$list.detach(),
                    t.$slider.append(t.$slides)),
                t.cleanUpRows(),
                t.$slider.removeClass("slick-slider"),
                t.$slider.removeClass("slick-initialized"),
                t.$slider.removeClass("slick-dotted"),
                (t.unslicked = !0),
                e || t.$slider.trigger("destroy", [t]);
        }),
        (e.prototype.disableTransition = function (i) {
            var e = this,
                t = {};
            (t[e.transitionType] = ""), !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
        }),
        (e.prototype.fadeSlide = function (i, e) {
            var t = this;
            !1 === t.cssTransitions
                ? (t.$slides.eq(i).css({ zIndex: t.options.zIndex }), t.$slides.eq(i).animate({ opacity: 1 }, t.options.speed, t.options.easing, e))
                : (t.applyTransition(i),
                  t.$slides.eq(i).css({ opacity: 1, zIndex: t.options.zIndex }),
                  e &&
                      setTimeout(function () {
                          t.disableTransition(i), e.call();
                      }, t.options.speed));
        }),
        (e.prototype.fadeSlideOut = function (i) {
            var e = this;
            !1 === e.cssTransitions ? e.$slides.eq(i).animate({ opacity: 0, zIndex: e.options.zIndex - 2 }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({ opacity: 0, zIndex: e.options.zIndex - 2 }));
        }),
        (e.prototype.filterSlides = e.prototype.slickFilter = function (i) {
            var e = this;
            null !== i && ((e.$slidesCache = e.$slides), e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit());
        }),
        (e.prototype.focusHandler = function () {
            var e = this;
            e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function (t) {
                t.stopImmediatePropagation();
                var o = i(this);
                setTimeout(function () {
                    e.options.pauseOnFocus && ((e.focussed = o.is(":focus")), e.autoPlay());
                }, 0);
            });
        }),
        (e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () {
            return this.currentSlide;
        }),
        (e.prototype.getDotCount = function () {
            var i = this,
                e = 0,
                t = 0,
                o = 0;
            if (!0 === i.options.infinite)
                if (i.slideCount <= i.options.slidesToShow) ++o;
                else for (; e < i.slideCount; ) ++o, (e = t + i.options.slidesToScroll), (t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow);
            else if (!0 === i.options.centerMode) o = i.slideCount;
            else if (i.options.asNavFor) for (; e < i.slideCount; ) ++o, (e = t + i.options.slidesToScroll), (t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow);
            else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
            return o - 1;
        }),
        (e.prototype.getLeft = function (i) {
            var e,
                t,
                o,
                s,
                n = this,
                r = 0;
            return (
                (n.slideOffset = 0),
                (t = n.$slides.first().outerHeight(!0)),
                !0 === n.options.infinite
                    ? (n.slideCount > n.options.slidesToShow &&
                          ((n.slideOffset = n.slideWidth * n.options.slidesToShow * -1),
                          (s = -1),
                          !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? (s = -1.5) : 1 === n.options.slidesToShow && (s = -2)),
                          (r = t * n.options.slidesToShow * s)),
                      n.slideCount % n.options.slidesToScroll != 0 &&
                          i + n.options.slidesToScroll > n.slideCount &&
                          n.slideCount > n.options.slidesToShow &&
                          (i > n.slideCount
                              ? ((n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1), (r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1))
                              : ((n.slideOffset = (n.slideCount % n.options.slidesToScroll) * n.slideWidth * -1), (r = (n.slideCount % n.options.slidesToScroll) * t * -1))))
                    : i + n.options.slidesToShow > n.slideCount && ((n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth), (r = (i + n.options.slidesToShow - n.slideCount) * t)),
                n.slideCount <= n.options.slidesToShow && ((n.slideOffset = 0), (r = 0)),
                !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow
                    ? (n.slideOffset = (n.slideWidth * Math.floor(n.options.slidesToShow)) / 2 - (n.slideWidth * n.slideCount) / 2)
                    : !0 === n.options.centerMode && !0 === n.options.infinite
                    ? (n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth)
                    : !0 === n.options.centerMode && ((n.slideOffset = 0), (n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2))),
                (e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r),
                !0 === n.options.variableWidth &&
                    ((o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow)),
                    (e = !0 === n.options.rtl ? (o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0) : o[0] ? -1 * o[0].offsetLeft : 0),
                    !0 === n.options.centerMode &&
                        ((o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1)),
                        (e = !0 === n.options.rtl ? (o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0) : o[0] ? -1 * o[0].offsetLeft : 0),
                        (e += (n.$list.width() - o.outerWidth()) / 2))),
                e
            );
        }),
        (e.prototype.getOption = e.prototype.slickGetOption = function (i) {
            return this.options[i];
        }),
        (e.prototype.getNavigableIndexes = function () {
            var i,
                e = this,
                t = 0,
                o = 0,
                s = [];
            for (!1 === e.options.infinite ? (i = e.slideCount) : ((t = -1 * e.options.slidesToScroll), (o = -1 * e.options.slidesToScroll), (i = 2 * e.slideCount)); t < i; )
                s.push(t), (t = o + e.options.slidesToScroll), (o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow);
            return s;
        }),
        (e.prototype.getSlick = function () {
            return this;
        }),
        (e.prototype.getSlideCount = function () {
            var e,
                t,
                o = this;
            return (
                (t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0),
                !0 === o.options.swipeToSlide
                    ? (o.$slideTrack.find(".slick-slide").each(function (s, n) {
                          if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft) return (e = n), !1;
                      }),
                      Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1)
                    : o.options.slidesToScroll
            );
        }),
        (e.prototype.goTo = e.prototype.slickGoTo = function (i, e) {
            this.changeSlide({ data: { message: "index", index: parseInt(i) } }, e);
        }),
        (e.prototype.init = function (e) {
            var t = this;
            i(t.$slider).hasClass("slick-initialized") ||
                (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()),
                e && t.$slider.trigger("init", [t]),
                !0 === t.options.accessibility && t.initADA(),
                t.options.autoplay && ((t.paused = !1), t.autoPlay());
        }),
        (e.prototype.initADA = function () {
            var e = this,
                t = Math.ceil(e.slideCount / e.options.slidesToShow),
                o = e.getNavigableIndexes().filter(function (i) {
                    return i >= 0 && i < e.slideCount;
                });
            e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({ "aria-hidden": "true", tabindex: "-1" }).find("a, input, button, select").attr({ tabindex: "-1" }),
                null !== e.$dots &&
                    (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function (t) {
                        var s = o.indexOf(t);
                        i(this).attr({ role: "tabpanel", id: "slick-slide" + e.instanceUid + t, tabindex: -1 }), -1 !== s && i(this).attr({ "aria-describedby": "slick-slide-control" + e.instanceUid + s });
                    }),
                    e.$dots
                        .attr("role", "tablist")
                        .find("li")
                        .each(function (s) {
                            var n = o[s];
                            i(this).attr({ role: "presentation" }),
                                i(this)
                                    .find("button")
                                    .first()
                                    .attr({ role: "tab", id: "slick-slide-control" + e.instanceUid + s, "aria-controls": "slick-slide" + e.instanceUid + n, "aria-label": s + 1 + " of " + t, "aria-selected": null, tabindex: "-1" });
                        })
                        .eq(e.currentSlide)
                        .find("button")
                        .attr({ "aria-selected": "true", tabindex: "0" })
                        .end());
            for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++) e.$slides.eq(s).attr("tabindex", 0);
            e.activateADA();
        }),
        (e.prototype.initArrowEvents = function () {
            var i = this;
            !0 === i.options.arrows &&
                i.slideCount > i.options.slidesToShow &&
                (i.$prevArrow.off("click.slick").on("click.slick", { message: "previous" }, i.changeSlide),
                i.$nextArrow.off("click.slick").on("click.slick", { message: "next" }, i.changeSlide),
                !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler)));
        }),
        (e.prototype.initDotEvents = function () {
            var e = this;
            !0 === e.options.dots && (i("li", e.$dots).on("click.slick", { message: "index" }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)),
                !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1));
        }),
        (e.prototype.initSlideEvents = function () {
            var e = this;
            e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)));
        }),
        (e.prototype.initializeEvents = function () {
            var e = this;
            e.initArrowEvents(),
                e.initDotEvents(),
                e.initSlideEvents(),
                e.$list.on("touchstart.slick mousedown.slick", { action: "start" }, e.swipeHandler),
                e.$list.on("touchmove.slick mousemove.slick", { action: "move" }, e.swipeHandler),
                e.$list.on("touchend.slick mouseup.slick", { action: "end" }, e.swipeHandler),
                e.$list.on("touchcancel.slick mouseleave.slick", { action: "end" }, e.swipeHandler),
                e.$list.on("click.slick", e.clickHandler),
                i(document).on(e.visibilityChange, i.proxy(e.visibility, e)),
                !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler),
                !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler),
                i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)),
                i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)),
                i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault),
                i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
                i(e.setPosition);
        }),
        (e.prototype.initUI = function () {
            var i = this;
            !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show();
        }),
        (e.prototype.keyHandler = function (i) {
            var e = this;
            i.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
                (37 === i.keyCode && !0 === e.options.accessibility
                    ? e.changeSlide({ data: { message: !0 === e.options.rtl ? "next" : "previous" } })
                    : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({ data: { message: !0 === e.options.rtl ? "previous" : "next" } }));
        }),
        (e.prototype.lazyLoad = function () {
            function e(e) {
                i("img[data-lazy]", e).each(function () {
                    var e = i(this),
                        t = i(this).attr("data-lazy"),
                        o = i(this).attr("data-srcset"),
                        s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
                        r = document.createElement("img");
                    (r.onload = function () {
                        e.animate({ opacity: 0 }, 100, function () {
                            o && (e.attr("srcset", o), s && e.attr("sizes", s)),
                                e.attr("src", t).animate({ opacity: 1 }, 200, function () {
                                    e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading");
                                }),
                                n.$slider.trigger("lazyLoaded", [n, e, t]);
                        });
                    }),
                        (r.onerror = function () {
                            e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, e, t]);
                        }),
                        (r.src = t);
                });
            }
            var t,
                o,
                s,
                n = this;
            if (
                (!0 === n.options.centerMode
                    ? !0 === n.options.infinite
                        ? (s = (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2)
                        : ((o = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1))), (s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide))
                    : ((o = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide), (s = Math.ceil(o + n.options.slidesToShow)), !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)),
                (t = n.$slider.find(".slick-slide").slice(o, s)),
                "anticipated" === n.options.lazyLoad)
            )
                for (var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0; a < n.options.slidesToScroll; a++) r < 0 && (r = n.slideCount - 1), (t = (t = t.add(d.eq(r))).add(d.eq(l))), r--, l++;
            e(t),
                n.slideCount <= n.options.slidesToShow
                    ? e(n.$slider.find(".slick-slide"))
                    : n.currentSlide >= n.slideCount - n.options.slidesToShow
                    ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow))
                    : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow));
        }),
        (e.prototype.loadSlider = function () {
            var i = this;
            i.setPosition(), i.$slideTrack.css({ opacity: 1 }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad();
        }),
        (e.prototype.next = e.prototype.slickNext = function () {
            this.changeSlide({ data: { message: "next" } });
        }),
        (e.prototype.orientationChange = function () {
            var i = this;
            i.checkResponsive(), i.setPosition();
        }),
        (e.prototype.pause = e.prototype.slickPause = function () {
            var i = this;
            i.autoPlayClear(), (i.paused = !0);
        }),
        (e.prototype.play = e.prototype.slickPlay = function () {
            var i = this;
            i.autoPlay(), (i.options.autoplay = !0), (i.paused = !1), (i.focussed = !1), (i.interrupted = !1);
        }),
        (e.prototype.postSlide = function (e) {
            var t = this;
            t.unslicked ||
                (t.$slider.trigger("afterChange", [t, e]),
                (t.animating = !1),
                t.slideCount > t.options.slidesToShow && t.setPosition(),
                (t.swipeLeft = null),
                t.options.autoplay && t.autoPlay(),
                !0 === t.options.accessibility && (t.initADA(), t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()));
        }),
        (e.prototype.prev = e.prototype.slickPrev = function () {
            this.changeSlide({ data: { message: "previous" } });
        }),
        (e.prototype.preventDefault = function (i) {
            i.preventDefault();
        }),
        (e.prototype.progressiveLazyLoad = function (e) {
            e = e || 1;
            var t,
                o,
                s,
                n,
                r,
                l = this,
                d = i("img[data-lazy]", l.$slider);
            d.length
                ? ((t = d.first()),
                  (o = t.attr("data-lazy")),
                  (s = t.attr("data-srcset")),
                  (n = t.attr("data-sizes") || l.$slider.attr("data-sizes")),
                  ((r = document.createElement("img")).onload = function () {
                      s && (t.attr("srcset", s), n && t.attr("sizes", n)),
                          t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),
                          !0 === l.options.adaptiveHeight && l.setPosition(),
                          l.$slider.trigger("lazyLoaded", [l, t, o]),
                          l.progressiveLazyLoad();
                  }),
                  (r.onerror = function () {
                      e < 3
                          ? setTimeout(function () {
                                l.progressiveLazyLoad(e + 1);
                            }, 500)
                          : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad());
                  }),
                  (r.src = o))
                : l.$slider.trigger("allImagesLoaded", [l]);
        }),
        (e.prototype.refresh = function (e) {
            var t,
                o,
                s = this;
            (o = s.slideCount - s.options.slidesToShow),
                !s.options.infinite && s.currentSlide > o && (s.currentSlide = o),
                s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
                (t = s.currentSlide),
                s.destroy(!0),
                i.extend(s, s.initials, { currentSlide: t }),
                s.init(),
                e || s.changeSlide({ data: { message: "index", index: t } }, !1);
        }),
        (e.prototype.registerBreakpoints = function () {
            var e,
                t,
                o,
                s = this,
                n = s.options.responsive || null;
            if ("array" === i.type(n) && n.length) {
                s.respondTo = s.options.respondTo || "window";
                for (e in n)
                    if (((o = s.breakpoints.length - 1), n.hasOwnProperty(e))) {
                        for (t = n[e].breakpoint; o >= 0; ) s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
                        s.breakpoints.push(t), (s.breakpointSettings[t] = n[e].settings);
                    }
                s.breakpoints.sort(function (i, e) {
                    return s.options.mobileFirst ? i - e : e - i;
                });
            }
        }),
        (e.prototype.reinit = function () {
            var e = this;
            (e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide")),
                (e.slideCount = e.$slides.length),
                e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
                e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
                e.registerBreakpoints(),
                e.setProps(),
                e.setupInfinite(),
                e.buildArrows(),
                e.updateArrows(),
                e.initArrowEvents(),
                e.buildDots(),
                e.updateDots(),
                e.initDotEvents(),
                e.cleanUpSlideEvents(),
                e.initSlideEvents(),
                e.checkResponsive(!1, !0),
                !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler),
                e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0),
                e.setPosition(),
                e.focusHandler(),
                (e.paused = !e.options.autoplay),
                e.autoPlay(),
                e.$slider.trigger("reInit", [e]);
        }),
        (e.prototype.resize = function () {
            var e = this;
            i(window).width() !== e.windowWidth &&
                (clearTimeout(e.windowDelay),
                (e.windowDelay = window.setTimeout(function () {
                    (e.windowWidth = i(window).width()), e.checkResponsive(), e.unslicked || e.setPosition();
                }, 50)));
        }),
        (e.prototype.removeSlide = e.prototype.slickRemove = function (i, e, t) {
            var o = this;
            if (((i = "boolean" == typeof i ? (!0 === (e = i) ? 0 : o.slideCount - 1) : !0 === e ? --i : i), o.slideCount < 1 || i < 0 || i > o.slideCount - 1)) return !1;
            o.unload(),
                !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(),
                (o.$slides = o.$slideTrack.children(this.options.slide)),
                o.$slideTrack.children(this.options.slide).detach(),
                o.$slideTrack.append(o.$slides),
                (o.$slidesCache = o.$slides),
                o.reinit();
        }),
        (e.prototype.setCSS = function (i) {
            var e,
                t,
                o = this,
                s = {};
            !0 === o.options.rtl && (i = -i),
                (e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
                (t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
                (s[o.positionProp] = i),
                !1 === o.transformsEnabled
                    ? o.$slideTrack.css(s)
                    : ((s = {}), !1 === o.cssTransitions ? ((s[o.animType] = "translate(" + e + ", " + t + ")"), o.$slideTrack.css(s)) : ((s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)"), o.$slideTrack.css(s)));
        }),
        (e.prototype.setDimensions = function () {
            var i = this;
            !1 === i.options.vertical
                ? !0 === i.options.centerMode && i.$list.css({ padding: "0px " + i.options.centerPadding })
                : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), !0 === i.options.centerMode && i.$list.css({ padding: i.options.centerPadding + " 0px" })),
                (i.listWidth = i.$list.width()),
                (i.listHeight = i.$list.height()),
                !1 === i.options.vertical && !1 === i.options.variableWidth
                    ? ((i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow)), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length)))
                    : !0 === i.options.variableWidth
                    ? i.$slideTrack.width(5e3 * i.slideCount)
                    : ((i.slideWidth = Math.ceil(i.listWidth)), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
            var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
            !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e);
        }),
        (e.prototype.setFade = function () {
            var e,
                t = this;
            t.$slides.each(function (o, s) {
                (e = t.slideWidth * o * -1),
                    !0 === t.options.rtl ? i(s).css({ position: "relative", right: e, top: 0, zIndex: t.options.zIndex - 2, opacity: 0 }) : i(s).css({ position: "relative", left: e, top: 0, zIndex: t.options.zIndex - 2, opacity: 0 });
            }),
                t.$slides.eq(t.currentSlide).css({ zIndex: t.options.zIndex - 1, opacity: 1 });
        }),
        (e.prototype.setHeight = function () {
            var i = this;
            if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
                var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
                i.$list.css("height", e);
            }
        }),
        (e.prototype.setOption = e.prototype.slickSetOption = function () {
            var e,
                t,
                o,
                s,
                n,
                r = this,
                l = !1;
            if (
                ("object" === i.type(arguments[0])
                    ? ((o = arguments[0]), (l = arguments[1]), (n = "multiple"))
                    : "string" === i.type(arguments[0]) &&
                      ((o = arguments[0]), (s = arguments[1]), (l = arguments[2]), "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? (n = "responsive") : void 0 !== arguments[1] && (n = "single")),
                "single" === n)
            )
                r.options[o] = s;
            else if ("multiple" === n)
                i.each(o, function (i, e) {
                    r.options[i] = e;
                });
            else if ("responsive" === n)
                for (t in s)
                    if ("array" !== i.type(r.options.responsive)) r.options.responsive = [s[t]];
                    else {
                        for (e = r.options.responsive.length - 1; e >= 0; ) r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--;
                        r.options.responsive.push(s[t]);
                    }
            l && (r.unload(), r.reinit());
        }),
        (e.prototype.setPosition = function () {
            var i = this;
            i.setDimensions(), i.setHeight(), !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i]);
        }),
        (e.prototype.setProps = function () {
            var i = this,
                e = document.body.style;
            (i.positionProp = !0 === i.options.vertical ? "top" : "left"),
                "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"),
                (void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition) || (!0 === i.options.useCSS && (i.cssTransitions = !0)),
                i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : (i.options.zIndex = i.defaults.zIndex)),
                void 0 !== e.OTransform && ((i.animType = "OTransform"), (i.transformType = "-o-transform"), (i.transitionType = "OTransition"), void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)),
                void 0 !== e.MozTransform && ((i.animType = "MozTransform"), (i.transformType = "-moz-transform"), (i.transitionType = "MozTransition"), void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)),
                void 0 !== e.webkitTransform &&
                    ((i.animType = "webkitTransform"), (i.transformType = "-webkit-transform"), (i.transitionType = "webkitTransition"), void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)),
                void 0 !== e.msTransform && ((i.animType = "msTransform"), (i.transformType = "-ms-transform"), (i.transitionType = "msTransition"), void 0 === e.msTransform && (i.animType = !1)),
                void 0 !== e.transform && !1 !== i.animType && ((i.animType = "transform"), (i.transformType = "transform"), (i.transitionType = "transition")),
                (i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType);
        }),
        (e.prototype.setSlideClasses = function (i) {
            var e,
                t,
                o,
                s,
                n = this;
            if (((t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true")), n.$slides.eq(i).addClass("slick-current"), !0 === n.options.centerMode)) {
                var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
                (e = Math.floor(n.options.slidesToShow / 2)),
                    !0 === n.options.infinite &&
                        (i >= e && i <= n.slideCount - 1 - e
                            ? n.$slides
                                  .slice(i - e + r, i + e + 1)
                                  .addClass("slick-active")
                                  .attr("aria-hidden", "false")
                            : ((o = n.options.slidesToShow + i),
                              t
                                  .slice(o - e + 1 + r, o + e + 2)
                                  .addClass("slick-active")
                                  .attr("aria-hidden", "false")),
                        0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")),
                    n.$slides.eq(i).addClass("slick-center");
            } else
                i >= 0 && i <= n.slideCount - n.options.slidesToShow
                    ? n.$slides
                          .slice(i, i + n.options.slidesToShow)
                          .addClass("slick-active")
                          .attr("aria-hidden", "false")
                    : t.length <= n.options.slidesToShow
                    ? t.addClass("slick-active").attr("aria-hidden", "false")
                    : ((s = n.slideCount % n.options.slidesToShow),
                      (o = !0 === n.options.infinite ? n.options.slidesToShow + i : i),
                      n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow
                          ? t
                                .slice(o - (n.options.slidesToShow - s), o + s)
                                .addClass("slick-active")
                                .attr("aria-hidden", "false")
                          : t
                                .slice(o, o + n.options.slidesToShow)
                                .addClass("slick-active")
                                .attr("aria-hidden", "false"));
            ("ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad) || n.lazyLoad();
        }),
        (e.prototype.setupInfinite = function () {
            var e,
                t,
                o,
                s = this;
            if ((!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && ((t = null), s.slideCount > s.options.slidesToShow))) {
                for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1)
                    (t = e - 1),
                        i(s.$slides[t])
                            .clone(!0)
                            .attr("id", "")
                            .attr("data-slick-index", t - s.slideCount)
                            .prependTo(s.$slideTrack)
                            .addClass("slick-cloned");
                for (e = 0; e < o + s.slideCount; e += 1)
                    (t = e),
                        i(s.$slides[t])
                            .clone(!0)
                            .attr("id", "")
                            .attr("data-slick-index", t + s.slideCount)
                            .appendTo(s.$slideTrack)
                            .addClass("slick-cloned");
                s.$slideTrack
                    .find(".slick-cloned")
                    .find("[id]")
                    .each(function () {
                        i(this).attr("id", "");
                    });
            }
        }),
        (e.prototype.interrupt = function (i) {
            var e = this;
            i || e.autoPlay(), (e.interrupted = i);
        }),
        (e.prototype.selectHandler = function (e) {
            var t = this,
                o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"),
                s = parseInt(o.attr("data-slick-index"));
            s || (s = 0), t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s);
        }),
        (e.prototype.slideHandler = function (i, e, t) {
            var o,
                s,
                n,
                r,
                l,
                d = null,
                a = this;
            if (((e = e || !1), !((!0 === a.animating && !0 === a.options.waitForAnimate) || (!0 === a.options.fade && a.currentSlide === i))))
                if (
                    (!1 === e && a.asNavFor(i),
                    (o = i),
                    (d = a.getLeft(o)),
                    (r = a.getLeft(a.currentSlide)),
                    (a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft),
                    !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll))
                )
                    !1 === a.options.fade &&
                        ((o = a.currentSlide),
                        !0 !== t
                            ? a.animateSlide(r, function () {
                                  a.postSlide(o);
                              })
                            : a.postSlide(o));
                else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll))
                    !1 === a.options.fade &&
                        ((o = a.currentSlide),
                        !0 !== t
                            ? a.animateSlide(r, function () {
                                  a.postSlide(o);
                              })
                            : a.postSlide(o));
                else {
                    if (
                        (a.options.autoplay && clearInterval(a.autoPlayTimer),
                        (s =
                            o < 0
                                ? a.slideCount % a.options.slidesToScroll != 0
                                    ? a.slideCount - (a.slideCount % a.options.slidesToScroll)
                                    : a.slideCount + o
                                : o >= a.slideCount
                                ? a.slideCount % a.options.slidesToScroll != 0
                                    ? 0
                                    : o - a.slideCount
                                : o),
                        (a.animating = !0),
                        a.$slider.trigger("beforeChange", [a, a.currentSlide, s]),
                        (n = a.currentSlide),
                        (a.currentSlide = s),
                        a.setSlideClasses(a.currentSlide),
                        a.options.asNavFor && (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide),
                        a.updateDots(),
                        a.updateArrows(),
                        !0 === a.options.fade)
                    )
                        return (
                            !0 !== t
                                ? (a.fadeSlideOut(n),
                                  a.fadeSlide(s, function () {
                                      a.postSlide(s);
                                  }))
                                : a.postSlide(s),
                            void a.animateHeight()
                        );
                    !0 !== t
                        ? a.animateSlide(d, function () {
                              a.postSlide(s);
                          })
                        : a.postSlide(s);
                }
        }),
        (e.prototype.startLoad = function () {
            var i = this;
            !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()),
                !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(),
                i.$slider.addClass("slick-loading");
        }),
        (e.prototype.swipeDirection = function () {
            var i,
                e,
                t,
                o,
                s = this;
            return (
                (i = s.touchObject.startX - s.touchObject.curX),
                (e = s.touchObject.startY - s.touchObject.curY),
                (t = Math.atan2(e, i)),
                (o = Math.round((180 * t) / Math.PI)) < 0 && (o = 360 - Math.abs(o)),
                o <= 45 && o >= 0
                    ? !1 === s.options.rtl
                        ? "left"
                        : "right"
                    : o <= 360 && o >= 315
                    ? !1 === s.options.rtl
                        ? "left"
                        : "right"
                    : o >= 135 && o <= 225
                    ? !1 === s.options.rtl
                        ? "right"
                        : "left"
                    : !0 === s.options.verticalSwiping
                    ? o >= 35 && o <= 135
                        ? "down"
                        : "up"
                    : "vertical"
            );
        }),
        (e.prototype.swipeEnd = function (i) {
            var e,
                t,
                o = this;
            if (((o.dragging = !1), (o.swiping = !1), o.scrolling)) return (o.scrolling = !1), !1;
            if (((o.interrupted = !1), (o.shouldClick = !(o.touchObject.swipeLength > 10)), void 0 === o.touchObject.curX)) return !1;
            if ((!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe)) {
                switch ((t = o.swipeDirection())) {
                    case "left":
                    case "down":
                        (e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount()), (o.currentDirection = 0);
                        break;
                    case "right":
                    case "up":
                        (e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount()), (o.currentDirection = 1);
                }
                "vertical" != t && (o.slideHandler(e), (o.touchObject = {}), o.$slider.trigger("swipe", [o, t]));
            } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), (o.touchObject = {}));
        }),
        (e.prototype.swipeHandler = function (i) {
            var e = this;
            if (!(!1 === e.options.swipe || ("ontouchend" in document && !1 === e.options.swipe) || (!1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))))
                switch (
                    ((e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1),
                    (e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold),
                    !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
                    i.data.action)
                ) {
                    case "start":
                        e.swipeStart(i);
                        break;
                    case "move":
                        e.swipeMove(i);
                        break;
                    case "end":
                        e.swipeEnd(i);
                }
        }),
        (e.prototype.swipeMove = function (i) {
            var e,
                t,
                o,
                s,
                n,
                r,
                l = this;
            return (
                (n = void 0 !== i.originalEvent ? i.originalEvent.touches : null),
                !(!l.dragging || l.scrolling || (n && 1 !== n.length)) &&
                    ((e = l.getLeft(l.currentSlide)),
                    (l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX),
                    (l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY),
                    (l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2)))),
                    (r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2)))),
                    !l.options.verticalSwiping && !l.swiping && r > 4
                        ? ((l.scrolling = !0), !1)
                        : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r),
                          (t = l.swipeDirection()),
                          void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && ((l.swiping = !0), i.preventDefault()),
                          (s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1)),
                          !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1),
                          (o = l.touchObject.swipeLength),
                          (l.touchObject.edgeHit = !1),
                          !1 === l.options.infinite &&
                              ((0 === l.currentSlide && "right" === t) || (l.currentSlide >= l.getDotCount() && "left" === t)) &&
                              ((o = l.touchObject.swipeLength * l.options.edgeFriction), (l.touchObject.edgeHit = !0)),
                          !1 === l.options.vertical ? (l.swipeLeft = e + o * s) : (l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s),
                          !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s),
                          !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? ((l.swipeLeft = null), !1) : void l.setCSS(l.swipeLeft))))
            );
        }),
        (e.prototype.swipeStart = function (i) {
            var e,
                t = this;
            if (((t.interrupted = !0), 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow)) return (t.touchObject = {}), !1;
            void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]),
                (t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX),
                (t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY),
                (t.dragging = !0);
        }),
        (e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () {
            var i = this;
            null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit());
        }),
        (e.prototype.unload = function () {
            var e = this;
            i(".slick-cloned", e.$slider).remove(),
                e.$dots && e.$dots.remove(),
                e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(),
                e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(),
                e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "");
        }),
        (e.prototype.unslick = function (i) {
            var e = this;
            e.$slider.trigger("unslick", [e, i]), e.destroy();
        }),
        (e.prototype.updateArrows = function () {
            var i = this;
            Math.floor(i.options.slidesToShow / 2),
                !0 === i.options.arrows &&
                    i.slideCount > i.options.slidesToShow &&
                    !i.options.infinite &&
                    (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
                    i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
                    0 === i.currentSlide
                        ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"))
                        : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode
                        ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"))
                        : i.currentSlide >= i.slideCount - 1 &&
                          !0 === i.options.centerMode &&
                          (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")));
        }),
        (e.prototype.updateDots = function () {
            var i = this;
            null !== i.$dots &&
                (i.$dots.find("li").removeClass("slick-active").end(),
                i.$dots
                    .find("li")
                    .eq(Math.floor(i.currentSlide / i.options.slidesToScroll))
                    .addClass("slick-active"));
        }),
        (e.prototype.visibility = function () {
            var i = this;
            i.options.autoplay && (document[i.hidden] ? (i.interrupted = !0) : (i.interrupted = !1));
        }),
        (i.fn.slick = function () {
            var i,
                t,
                o = this,
                s = arguments[0],
                n = Array.prototype.slice.call(arguments, 1),
                r = o.length;
            for (i = 0; i < r; i++) if (("object" == typeof s || void 0 === s ? (o[i].slick = new e(o[i], s)) : (t = o[i].slick[s].apply(o[i].slick, n)), void 0 !== t)) return t;
            return o;
        });
});
/* @license GNU-GPL-2.0-or-later https://www.drupal.org/licensing/faq */
(function ($, Drupal) {
    "use strict";
    Drupal.behaviors.t_logo_carousel = {
        attach: function (context, settings) {
            $(once("t_logo_carousel", ".t-logo-carousel-items-wrapper", context)).each(function () {
                var cnt = $(this).find(".t-logo-carousel-item").length;
                if (cnt <= 1) return;
                $(this).slick({
                    arrows: true,
                    infinite: true,
                    slidesToShow: 8,
                    slidesToScroll: 1,
                    swipeToSlide: true,
                    centerMode: false,
                    touchMove: true,
                    autoplay: false,
                    autoplaySpeed: 3000,
                    responsive: [
                        { breakpoint: 1220, settings: { slidesToShow: 7 } },
                        { breakpoint: 992, settings: { arrows: true, slidesToShow: 5 } },
                        { breakpoint: 764, settings: { arrows: true, slidesToShow: 3 } },
                        { breakpoint: 540, settings: { slidesToShow: 3 } },
                        { breakpoint: 480, settings: { slidesToShow: 2 } },
                    ],
                });
            });
        },
    };
})(jQuery, Drupal);
(function ($, Drupal) {
    "use strict";
    Drupal.behaviors.t_icon_cards = {
        attach: function (context, settings) {
            var maxHeight = 0;
            var cardDescriptions = $(".field--name-field-t-icon-card-description");
            const mq = window.matchMedia("(min-width: 768px)");
            var timer = null;
            var mqIconCards = window.matchMedia("(max-width: 768px)");
            var iconCardParagraphs = $(".paragraph--type--t-icon-card", context);
            var clickEventsLinks = [];
            if (iconCardParagraphs.length > 0 && mqIconCards.matches) iconCardClickable();
            function iconCardClickable() {
                iconCardParagraphs.each(function (index, value) {
                    var paragraph = $(value);
                    var link = paragraph.find("a.btn-custom");
                    if (link.length > 0 && clickEventsLinks.indexOf(index) === -1) {
                        paragraph.click(function () {
                            window.location = link.attr("href");
                            return false;
                        });
                        clickEventsLinks.push(index);
                    }
                });
            }
            function removeClickEvents() {
                iconCardParagraphs.each(function (index, value) {
                    $(value).off("click");
                });
            }
            $(window)
                .on("resize.T_ICON_CARDS", function () {
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        if (mq.matches) {
                            cardDescriptions.each(function () {
                                const currentHeight = $(this).height();
                                if (currentHeight > maxHeight) maxHeight = currentHeight;
                            });
                            cardDescriptions.height(maxHeight);
                        } else cardDescriptions.height("");
                        if (mqIconCards.matches) iconCardClickable();
                        else {
                            removeClickEvents();
                            clickEventsLinks = [];
                        }
                    }, 200);
                })
                .trigger("resize.T_ICON_CARDS");
        },
    };
})(jQuery, Drupal);
(function ($, Drupal, debounce) {
    "use strict";
    Drupal.behaviors.t_animated_words_banner = {
        attach: function (context, settings) {
            const imageCarousel = $(".paragraph--type--t-banner-image-overlay", context);
            const mq = window.matchMedia("(max-width: 768px)");
            imageCarousel.each(function (index, item) {
                $(item)
                    .find(".field--name-field-t-banner-img-overlay-media")
                    .slick({ infinite: true, arrows: false, dots: true, slidesToShow: 1, speed: 500, fade: true, swipeToSlide: true, touchMove: true, autoplay: true, autoplaySpeed: 4000, cssEase: "linear" });
            });
            $.fn.animateWords = function (options) {
                var $element = this;
                if (!$element.length) return false;
                if (!$element.data("animateWords.initialization")) {
                    var thatObject = {
                        timer: {},
                        backspace: false,
                        mobile: { fadein: 1200, delay: 3500 },
                        longestWord: 0,
                        position: 0,
                        currentPositionWord: 0,
                        animationSpeed: { low: { typing: 150, backspace: 70, delay: 3000 }, medium: { typing: 120, backspace: 40, delay: 3000 }, high: { typing: 60, backspace: 30, delay: 3000 } },
                    };
                    thatObject.$context = $element;
                    thatObject.$context.data("animateWords.initialization", true);
                    thatObject.longestWordLength = function () {
                        thatObject.longestWord = 0;
                        $.each(thatObject.words, function (key, value) {
                            var currentPosition = thatObject.currentPositionWord % thatObject.words[key].length;
                            if (thatObject.longestWord < value[currentPosition].length) thatObject.longestWord = value[currentPosition].length;
                        });
                    };
                    thatObject.addEvents = function () {
                        $(window).resize(debounce(thatObject.resize, 50));
                        thatObject.resize();
                    };
                    thatObject.resize = function () {
                        if (!thatObject.mq.matches) {
                            thatObject.showHideCursor();
                            if (once("animateWords:visibilitychange", "html").length)
                                $(document).on("visibilitychange", function () {
                                    thatObject.clear();
                                    if (!document.hidden) {
                                        thatObject.currentPositionWord++;
                                        thatObject.longestWordLength();
                                        thatObject.writeLetter();
                                    }
                                });
                        } else {
                            thatObject.clear();
                            thatObject.hideCaret();
                            thatObject.displayWordsMobile();
                        }
                    };
                    thatObject.displayWordsMobile = function () {
                        thatObject.$context.each(function (i) {
                            $(this).hide();
                            $(this).text(thatObject.words[i][thatObject.currentPositionWord % thatObject.words[i].length]);
                            $(this).fadeIn(thatObject.mobile.fadein);
                        });
                        thatObject.currentPositionWord++;
                        clearTimeout(thatObject.timer);
                        thatObject.timer = setTimeout(thatObject.displayWordsMobile, thatObject.mobile.delay);
                    };
                    thatObject.writeLetter = function () {
                        thatObject.$context.each(function (i) {
                            if (thatObject.backspace === false) $(this).text(thatObject.words[i][thatObject.currentPositionWord % thatObject.words[i].length].substring(0, thatObject.position));
                            else {
                                var word = $(this).text();
                                $(this).text(word.substring(0, word.length - 1));
                            }
                        });
                        var speed = thatObject.speed;
                        if (thatObject.backspace === false && thatObject.position >= thatObject.longestWord) {
                            thatObject.backspace = true;
                            speed += thatObject.delay;
                        } else if (thatObject.backspace === true && thatObject.position === 0) {
                            thatObject.backspace = false;
                            thatObject.currentPositionWord++;
                            thatObject.longestWordLength();
                        } else if (thatObject.backspace === true && thatObject.position !== 0) {
                            speed = thatObject.backspaceSpeed;
                            thatObject.position--;
                        } else thatObject.position++;
                        clearTimeout(thatObject.timer);
                        thatObject.timer = setTimeout(thatObject.writeLetter, speed);
                    };
                    thatObject.clear = function () {
                        thatObject.position = 0;
                        thatObject.$context.empty();
                        clearTimeout(thatObject.timer);
                    };
                    thatObject.showCaret = function () {
                        thatObject.$context.closest(".t-general-page-hero-text-title").find(".t-banners-caret").show();
                    };
                    thatObject.hideCaret = function () {
                        thatObject.$context.closest(".t-general-page-hero-text-title").find(".t-banners-caret").hide();
                    };
                    thatObject.showHideCursor = function () {
                        if (thatObject.showCursor === "1") thatObject.showCaret();
                        else thatObject.hideCaret();
                    };
                }
                thatObject.mq = window.matchMedia("(max-width: 768px)");
                thatObject.options = options;
                thatObject.words = options.text_items;
                thatObject.chosenSpeed = options.typing_speed ? options.typing_speed : "medium";
                thatObject.speed = thatObject.animationSpeed[thatObject.chosenSpeed].typing;
                thatObject.backspaceSpeed = thatObject.animationSpeed[thatObject.chosenSpeed].backspace;
                thatObject.delay = thatObject.animationSpeed[thatObject.chosenSpeed].delay;
                thatObject.showCursor = options.show_cursor;
                thatObject.showHideCursor();
                thatObject.clear();
                thatObject.longestWordLength();
                thatObject.writeLetter();
                thatObject.addEvents();
            };
            $(".field--name-field-t-animated-banner-items .t-banners-slide-text", context).animateWords(settings.t_animated_words_banner);
        },
    };
})(jQuery, Drupal, Drupal.debounce);
(function ($, Drupal) {
    "use strict";
    Drupal.behaviors.t_blog_tabs = {
        attach: function (context, settings) {
            let $view = $(".view-display-id-block_resources", context);
            $view.each(function (index, item) {
                initTabs($(item));
            });
            function initTabs($context) {
                let $viewHeaders = $(".view-header", $context);
                let $attachmentAfter = $(".attachment-after", $context);
                let $tabs = $(createTabs($viewHeaders));
                let $tabsContent = $(".views-element-container", $context);
                let $tabsBtns = $tabs.find(".resources-tabs__link");
                $attachmentAfter.before($tabs);
                $tabsContent.addClass("resources-tabs__content");
                let indexTab = $tabs.find(".resources-tabs__link--selected").closest(".resources-tabs__tab").index();
                toggleTabContent(indexTab);
                $tabsBtns.on("click", function (e) {
                    e.preventDefault();
                    $tabsBtns.removeClass("resources-tabs__link--selected").attr("aria-selected", false);
                    $(this).addClass("resources-tabs__link--selected").attr("aria-selected", true);
                    toggleTabContent($(this).closest(".resources-tabs__tab").index());
                });
                function toggleTabContent(indexTab) {
                    $tabsContent.removeClass("resources-tabs__content--show");
                    $tabsContent.eq(indexTab).addClass("resources-tabs__content--show");
                }
                function createTabs($titles) {
                    let html = "";
                    html = '<div class="resources-tabs">';
                    html += '<ul class="resources-tabs__list" aria-role="tablist">';
                    $titles.each(function (index, item) {
                        let _item = $(item);
                        let titleText = _item.text();
                        let ariaTitle = titleText.toLowerCase().trim().replace(/\s/g, "-");
                        _item.hide();
                        _item
                            .closest(".views-element-container")
                            .attr("id", "tab-content-" + ariaTitle)
                            .attr("role", "tabpanel");
                        html += createSingleTab(index, titleText, ariaTitle);
                    });
                    html += "</ul>";
                    html += "</div>";
                    return html;
                }
                function createSingleTab(index, titleText, ariaTitle) {
                    let html = "";
                    let isSelected = index === 0;
                    let ariaSelected = isSelected ? "true" : "false";
                    let selectedClass = isSelected ? " resources-tabs__link--selected" : "";
                    let attributes = { href: "#tab-content-" + ariaTitle, class: "resources-tabs__link" + selectedClass, role: "tab", "aria-controls": "tab-content-" + ariaTitle, "aria-selected": ariaSelected };
                    html += '<li class="resources-tabs__tab">';
                    html += "<a";
                    for (let attr in attributes) html += " " + attr + '="' + attributes[attr] + '"';
                    html += ">";
                    html += titleText;
                    html += "</a>";
                    html += "</li>";
                    return html;
                }
            }
        },
    };
})(jQuery, Drupal);
(function ($, Drupal) {
    "use strict";
    Drupal.behaviors.t_language = {
        attach: function (context, settings) {
            const examples = $("#language-examples");
            $("#language-switcher-list .language-link").mouseover(function () {
                $("span", examples).removeClass("active");
                let langCode = $(this).attr("hreflang");
                examples.find(".lang-code-" + langCode).addClass("active");
            });
        },
    };
})(jQuery, Drupal);
/* @license GNU-GPL-2.0-or-later https://raw.githubusercontent.com/jquery-form/form/master/LICENSE */
/*!
 * jQuery Form Plugin
 * version: 4.3.0
 * Requires jQuery v1.7.2 or later
 * Project repository: https://github.com/jquery-form/form

 * Copyright 2017 Kevin Morris
 * Copyright 2006 M. Alsup

 * Dual licensed under the LGPL-2.1+ or MIT licenses
 * https://github.com/jquery-form/form#license

 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 */
!(function (r) {
    "function" == typeof define && define.amd
        ? define(["jquery"], r)
        : "object" == typeof module && module.exports
        ? (module.exports = function (e, t) {
              return void 0 === t && (t = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), r(t), t;
          })
        : r(jQuery);
})(function (q) {
    "use strict";
    var m = /\r?\n/g,
        S = {};
    (S.fileapi = void 0 !== q('<input type="file">').get(0).files), (S.formdata = void 0 !== window.FormData);
    var _ = !!q.fn.prop;
    function o(e) {
        var t = e.data;
        e.isDefaultPrevented() || (e.preventDefault(), q(e.target).closest("form").ajaxSubmit(t));
    }
    function i(e) {
        var t = e.target,
            r = q(t);
        if (!r.is("[type=submit],[type=image]")) {
            var a = r.closest("[type=submit]");
            if (0 === a.length) return;
            t = a[0];
        }
        var n,
            o = t.form;
        "image" === (o.clk = t).type &&
            (void 0 !== e.offsetX
                ? ((o.clk_x = e.offsetX), (o.clk_y = e.offsetY))
                : "function" == typeof q.fn.offset
                ? ((n = r.offset()), (o.clk_x = e.pageX - n.left), (o.clk_y = e.pageY - n.top))
                : ((o.clk_x = e.pageX - t.offsetLeft), (o.clk_y = e.pageY - t.offsetTop))),
            setTimeout(function () {
                o.clk = o.clk_x = o.clk_y = null;
            }, 100);
    }
    function N() {
        var e;
        q.fn.ajaxSubmit.debug && ((e = "[jquery.form] " + Array.prototype.join.call(arguments, "")), window.console && window.console.log ? window.console.log(e) : window.opera && window.opera.postError && window.opera.postError(e));
    }
    (q.fn.attr2 = function () {
        if (!_) return this.attr.apply(this, arguments);
        var e = this.prop.apply(this, arguments);
        return (e && e.jquery) || "string" == typeof e ? e : this.attr.apply(this, arguments);
    }),
        (q.fn.ajaxSubmit = function (M, e, t, r) {
            if (!this.length) return N("ajaxSubmit: skipping submit process - no element selected"), this;
            var O,
                a,
                n,
                o,
                X = this;
            "function" == typeof M ? (M = { success: M }) : "string" == typeof M || (!1 === M && 0 < arguments.length) ? ((M = { url: M, data: e, dataType: t }), "function" == typeof r && (M.success = r)) : void 0 === M && (M = {}),
                (O = M.method || M.type || this.attr2("method")),
                (n = (n = (n = "string" == typeof (a = M.url || this.attr2("action")) ? q.trim(a) : "") || window.location.href || "") && (n.match(/^([^#]+)/) || [])[1]),
                (o = /(MSIE|Trident)/.test(navigator.userAgent || "") && /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"),
                (M = q.extend(!0, { url: n, success: q.ajaxSettings.success, type: O || q.ajaxSettings.type, iframeSrc: o }, M));
            var i = {};
            if ((this.trigger("form-pre-serialize", [this, M, i]), i.veto)) return N("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
            if (M.beforeSerialize && !1 === M.beforeSerialize(this, M)) return N("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
            var s = M.traditional;
            void 0 === s && (s = q.ajaxSettings.traditional);
            var u,
                c,
                C = [],
                l = this.formToArray(M.semantic, C, M.filtering);
            if ((M.data && ((c = q.isFunction(M.data) ? M.data(l) : M.data), (M.extraData = c), (u = q.param(c, s))), M.beforeSubmit && !1 === M.beforeSubmit(l, this, M)))
                return N("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
            if ((this.trigger("form-submit-validate", [l, this, M, i]), i.veto)) return N("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
            var f = q.param(l, s);
            u && (f = f ? f + "&" + u : u), "GET" === M.type.toUpperCase() ? ((M.url += (0 <= M.url.indexOf("?") ? "&" : "?") + f), (M.data = null)) : (M.data = f);
            var d,
                m,
                p,
                h = [];
            M.resetForm &&
                h.push(function () {
                    X.resetForm();
                }),
                M.clearForm &&
                    h.push(function () {
                        X.clearForm(M.includeHidden);
                    }),
                !M.dataType && M.target
                    ? ((d = M.success || function () {}),
                      h.push(function (e, t, r) {
                          var a = arguments,
                              n = M.replaceTarget ? "replaceWith" : "html";
                          q(M.target)
                              [n](e)
                              .each(function () {
                                  d.apply(this, a);
                              });
                      }))
                    : M.success && (q.isArray(M.success) ? q.merge(h, M.success) : h.push(M.success)),
                (M.success = function (e, t, r) {
                    for (var a = M.context || this, n = 0, o = h.length; n < o; n++) h[n].apply(a, [e, t, r || X, X]);
                }),
                M.error &&
                    ((m = M.error),
                    (M.error = function (e, t, r) {
                        var a = M.context || this;
                        m.apply(a, [e, t, r, X]);
                    })),
                M.complete &&
                    ((p = M.complete),
                    (M.complete = function (e, t) {
                        var r = M.context || this;
                        p.apply(r, [e, t, X]);
                    }));
            var v =
                    0 <
                    q("input[type=file]:enabled", this).filter(function () {
                        return "" !== q(this).val();
                    }).length,
                g = "multipart/form-data",
                x = X.attr("enctype") === g || X.attr("encoding") === g,
                y = S.fileapi && S.formdata;
            N("fileAPI :" + y);
            var b,
                T = (v || x) && !y;
            !1 !== M.iframe && (M.iframe || T)
                ? M.closeKeepAlive
                    ? q.get(M.closeKeepAlive, function () {
                          b = w(l);
                      })
                    : (b = w(l))
                : (b =
                      (v || x) && y
                          ? (function (e) {
                                for (var r = new FormData(), t = 0; t < e.length; t++) r.append(e[t].name, e[t].value);
                                if (M.extraData) {
                                    var a = (function (e) {
                                        var t,
                                            r,
                                            a = q.param(e, M.traditional).split("&"),
                                            n = a.length,
                                            o = [];
                                        for (t = 0; t < n; t++) (a[t] = a[t].replace(/\+/g, " ")), (r = a[t].split("=")), o.push([decodeURIComponent(r[0]), decodeURIComponent(r[1])]);
                                        return o;
                                    })(M.extraData);
                                    for (t = 0; t < a.length; t++) a[t] && r.append(a[t][0], a[t][1]);
                                }
                                M.data = null;
                                var n = q.extend(!0, {}, q.ajaxSettings, M, { contentType: !1, processData: !1, cache: !1, type: O || "POST" });
                                M.uploadProgress &&
                                    (n.xhr = function () {
                                        var e = q.ajaxSettings.xhr();
                                        return (
                                            e.upload &&
                                                e.upload.addEventListener(
                                                    "progress",
                                                    function (e) {
                                                        var t = 0,
                                                            r = e.loaded || e.position,
                                                            a = e.total;
                                                        e.lengthComputable && (t = Math.ceil((r / a) * 100)), M.uploadProgress(e, r, a, t);
                                                    },
                                                    !1
                                                ),
                                            e
                                        );
                                    });
                                n.data = null;
                                var o = n.beforeSend;
                                return (
                                    (n.beforeSend = function (e, t) {
                                        M.formData ? (t.data = M.formData) : (t.data = r), o && o.call(this, e, t);
                                    }),
                                    q.ajax(n)
                                );
                            })(l)
                          : q.ajax(M)),
                X.removeData("jqxhr").data("jqxhr", b);
            for (var j = 0; j < C.length; j++) C[j] = null;
            return this.trigger("form-submit-notify", [this, M]), this;
            function w(e) {
                var t,
                    r,
                    l,
                    f,
                    o,
                    d,
                    m,
                    p,
                    a,
                    n,
                    h,
                    v,
                    i = X[0],
                    g = q.Deferred();
                if (
                    ((g.abort = function (e) {
                        p.abort(e);
                    }),
                    e)
                )
                    for (r = 0; r < C.length; r++) (t = q(C[r])), _ ? t.prop("disabled", !1) : t.removeAttr("disabled");
                ((l = q.extend(!0, {}, q.ajaxSettings, M)).context = l.context || l), (o = "jqFormIO" + new Date().getTime());
                var s = i.ownerDocument,
                    u = X.closest("body");
                if (
                    (l.iframeTarget
                        ? (n = (d = q(l.iframeTarget, s)).attr2("name"))
                            ? (o = n)
                            : d.attr2("name", o)
                        : (d = q('<iframe name="' + o + '" src="' + l.iframeSrc + '" />', s)).css({ position: "absolute", top: "-1000px", left: "-1000px" }),
                    (m = d[0]),
                    (p = {
                        aborted: 0,
                        responseText: null,
                        responseXML: null,
                        status: 0,
                        statusText: "n/a",
                        getAllResponseHeaders: function () {},
                        getResponseHeader: function () {},
                        setRequestHeader: function () {},
                        abort: function (e) {
                            var t = "timeout" === e ? "timeout" : "aborted";
                            N("aborting upload... " + t), (this.aborted = 1);
                            try {
                                m.contentWindow.document.execCommand && m.contentWindow.document.execCommand("Stop");
                            } catch (e) {}
                            d.attr("src", l.iframeSrc), (p.error = t), l.error && l.error.call(l.context, p, t, e), f && q.event.trigger("ajaxError", [p, l, t]), l.complete && l.complete.call(l.context, p, t);
                        },
                    }),
                    (f = l.global) && 0 == q.active++ && q.event.trigger("ajaxStart"),
                    f && q.event.trigger("ajaxSend", [p, l]),
                    l.beforeSend && !1 === l.beforeSend.call(l.context, p, l))
                )
                    return l.global && q.active--, g.reject(), g;
                if (p.aborted) return g.reject(), g;
                (a = i.clk) && (n = a.name) && !a.disabled && ((l.extraData = l.extraData || {}), (l.extraData[n] = a.value), "image" === a.type && ((l.extraData[n + ".x"] = i.clk_x), (l.extraData[n + ".y"] = i.clk_y)));
                var x = 1,
                    y = 2;
                function b(t) {
                    var r = null;
                    try {
                        t.contentWindow && (r = t.contentWindow.document);
                    } catch (e) {
                        N("cannot get iframe.contentWindow document: " + e);
                    }
                    if (r) return r;
                    try {
                        r = t.contentDocument ? t.contentDocument : t.document;
                    } catch (e) {
                        N("cannot get iframe.contentDocument: " + e), (r = t.document);
                    }
                    return r;
                }
                var c = q("meta[name=csrf-token]").attr("content"),
                    T = q("meta[name=csrf-param]").attr("content");
                function j() {
                    var e = X.attr2("target"),
                        t = X.attr2("action"),
                        r = X.attr("enctype") || X.attr("encoding") || "multipart/form-data";
                    i.setAttribute("target", o),
                        (O && !/post/i.test(O)) || i.setAttribute("method", "POST"),
                        t !== l.url && i.setAttribute("action", l.url),
                        l.skipEncodingOverride || (O && !/post/i.test(O)) || X.attr({ encoding: "multipart/form-data", enctype: "multipart/form-data" }),
                        l.timeout &&
                            (v = setTimeout(function () {
                                (h = !0), A(x);
                            }, l.timeout));
                    var a = [];
                    try {
                        if (l.extraData)
                            for (var n in l.extraData)
                                l.extraData.hasOwnProperty(n) &&
                                    (q.isPlainObject(l.extraData[n]) && l.extraData[n].hasOwnProperty("name") && l.extraData[n].hasOwnProperty("value")
                                        ? a.push(
                                              q('<input type="hidden" name="' + l.extraData[n].name + '">', s)
                                                  .val(l.extraData[n].value)
                                                  .appendTo(i)[0]
                                          )
                                        : a.push(
                                              q('<input type="hidden" name="' + n + '">', s)
                                                  .val(l.extraData[n])
                                                  .appendTo(i)[0]
                                          ));
                        l.iframeTarget || d.appendTo(u),
                            m.attachEvent ? m.attachEvent("onload", A) : m.addEventListener("load", A, !1),
                            setTimeout(function e() {
                                try {
                                    var t = b(m).readyState;
                                    N("state = " + t), t && "uninitialized" === t.toLowerCase() && setTimeout(e, 50);
                                } catch (e) {
                                    N("Server abort: ", e, " (", e.name, ")"), A(y), v && clearTimeout(v), (v = void 0);
                                }
                            }, 15);
                        try {
                            i.submit();
                        } catch (e) {
                            document.createElement("form").submit.apply(i);
                        }
                    } finally {
                        i.setAttribute("action", t), i.setAttribute("enctype", r), e ? i.setAttribute("target", e) : X.removeAttr("target"), q(a).remove();
                    }
                }
                T && c && ((l.extraData = l.extraData || {}), (l.extraData[T] = c)), l.forceSync ? j() : setTimeout(j, 10);
                var w,
                    S,
                    k,
                    D = 50;
                function A(e) {
                    if (!p.aborted && !k) {
                        if (((S = b(m)) || (N("cannot access response document"), (e = y)), e === x && p)) return p.abort("timeout"), void g.reject(p, "timeout");
                        if (e === y && p) return p.abort("server abort"), void g.reject(p, "error", "server abort");
                        if ((S && S.location.href !== l.iframeSrc) || h) {
                            m.detachEvent ? m.detachEvent("onload", A) : m.removeEventListener("load", A, !1);
                            var t,
                                r = "success";
                            try {
                                if (h) throw "timeout";
                                var a = "xml" === l.dataType || S.XMLDocument || q.isXMLDoc(S);
                                if ((N("isXml=" + a), !a && window.opera && (null === S.body || !S.body.innerHTML) && --D)) return N("requeing onLoad callback, DOM not available"), void setTimeout(A, 250);
                                var n = S.body ? S.body : S.documentElement;
                                (p.responseText = n ? n.innerHTML : null),
                                    (p.responseXML = S.XMLDocument ? S.XMLDocument : S),
                                    a && (l.dataType = "xml"),
                                    (p.getResponseHeader = function (e) {
                                        return { "content-type": l.dataType }[e.toLowerCase()];
                                    }),
                                    n && ((p.status = Number(n.getAttribute("status")) || p.status), (p.statusText = n.getAttribute("statusText") || p.statusText));
                                var o,
                                    i,
                                    s,
                                    u = (l.dataType || "").toLowerCase(),
                                    c = /(json|script|text)/.test(u);
                                c || l.textarea
                                    ? (o = S.getElementsByTagName("textarea")[0])
                                        ? ((p.responseText = o.value), (p.status = Number(o.getAttribute("status")) || p.status), (p.statusText = o.getAttribute("statusText") || p.statusText))
                                        : c &&
                                          ((i = S.getElementsByTagName("pre")[0]),
                                          (s = S.getElementsByTagName("body")[0]),
                                          i ? (p.responseText = i.textContent ? i.textContent : i.innerText) : s && (p.responseText = s.textContent ? s.textContent : s.innerText))
                                    : "xml" === u && !p.responseXML && p.responseText && (p.responseXML = F(p.responseText));
                                try {
                                    w = E(p, u, l);
                                } catch (e) {
                                    (r = "parsererror"), (p.error = t = e || r);
                                }
                            } catch (e) {
                                N("error caught: ", e), (r = "error"), (p.error = t = e || r);
                            }
                            p.aborted && (N("upload aborted"), (r = null)),
                                p.status && (r = (200 <= p.status && p.status < 300) || 304 === p.status ? "success" : "error"),
                                "success" === r
                                    ? (l.success && l.success.call(l.context, w, "success", p), g.resolve(p.responseText, "success", p), f && q.event.trigger("ajaxSuccess", [p, l]))
                                    : r && (void 0 === t && (t = p.statusText), l.error && l.error.call(l.context, p, r, t), g.reject(p, "error", t), f && q.event.trigger("ajaxError", [p, l, t])),
                                f && q.event.trigger("ajaxComplete", [p, l]),
                                f && !--q.active && q.event.trigger("ajaxStop"),
                                l.complete && l.complete.call(l.context, p, r),
                                (k = !0),
                                l.timeout && clearTimeout(v),
                                setTimeout(function () {
                                    l.iframeTarget ? d.attr("src", l.iframeSrc) : d.remove(), (p.responseXML = null);
                                }, 100);
                        }
                    }
                }
                var F =
                        q.parseXML ||
                        function (e, t) {
                            return (
                                window.ActiveXObject ? (((t = new ActiveXObject("Microsoft.XMLDOM")).async = "false"), t.loadXML(e)) : (t = new DOMParser().parseFromString(e, "text/xml")),
                                t && t.documentElement && "parsererror" !== t.documentElement.nodeName ? t : null
                            );
                        },
                    L =
                        q.parseJSON ||
                        function (e) {
                            return window.eval("(" + e + ")");
                        },
                    E = function (e, t, r) {
                        var a = e.getResponseHeader("content-type") || "",
                            n = ("xml" === t || !t) && 0 <= a.indexOf("xml"),
                            o = n ? e.responseXML : e.responseText;
                        return (
                            n && "parsererror" === o.documentElement.nodeName && q.error && q.error("parsererror"),
                            r && r.dataFilter && (o = r.dataFilter(o, t)),
                            "string" == typeof o && (("json" === t || !t) && 0 <= a.indexOf("json") ? (o = L(o)) : ("script" === t || !t) && 0 <= a.indexOf("javascript") && q.globalEval(o)),
                            o
                        );
                    };
                return g;
            }
        }),
        (q.fn.ajaxForm = function (e, t, r, a) {
            if (
                (("string" == typeof e || (!1 === e && 0 < arguments.length)) && ((e = { url: e, data: t, dataType: r }), "function" == typeof a && (e.success = a)),
                ((e = e || {}).delegation = e.delegation && q.isFunction(q.fn.on)),
                e.delegation || 0 !== this.length)
            )
                return e.delegation
                    ? (q(document).off("submit.form-plugin", this.selector, o).off("click.form-plugin", this.selector, i).on("submit.form-plugin", this.selector, e, o).on("click.form-plugin", this.selector, e, i), this)
                    : (e.beforeFormUnbind && e.beforeFormUnbind(this, e), this.ajaxFormUnbind().on("submit.form-plugin", e, o).on("click.form-plugin", e, i));
            var n = { s: this.selector, c: this.context };
            return (
                !q.isReady && n.s
                    ? (N("DOM not ready, queuing ajaxForm"),
                      q(function () {
                          q(n.s, n.c).ajaxForm(e);
                      }))
                    : N("terminating; zero elements found by selector" + (q.isReady ? "" : " (DOM not ready)")),
                this
            );
        }),
        (q.fn.ajaxFormUnbind = function () {
            return this.off("submit.form-plugin click.form-plugin");
        }),
        (q.fn.formToArray = function (e, t, r) {
            var a = [];
            if (0 === this.length) return a;
            var n,
                o,
                i,
                s,
                u,
                c,
                l,
                f,
                d,
                m,
                p = this[0],
                h = this.attr("id"),
                v = (v = e || void 0 === p.elements ? p.getElementsByTagName("*") : p.elements) && q.makeArray(v);
            if ((h && (e || /(Edge|Trident)\//.test(navigator.userAgent)) && (n = q(':input[form="' + h + '"]').get()).length && (v = (v || []).concat(n)), !v || !v.length)) return a;
            for (q.isFunction(r) && (v = q.map(v, r)), o = 0, c = v.length; o < c; o++)
                if ((m = (u = v[o]).name) && !u.disabled)
                    if (e && p.clk && "image" === u.type) p.clk === u && (a.push({ name: m, value: q(u).val(), type: u.type }), a.push({ name: m + ".x", value: p.clk_x }, { name: m + ".y", value: p.clk_y }));
                    else if ((s = q.fieldValue(u, !0)) && s.constructor === Array) for (t && t.push(u), i = 0, l = s.length; i < l; i++) a.push({ name: m, value: s[i] });
                    else if (S.fileapi && "file" === u.type) {
                        t && t.push(u);
                        var g = u.files;
                        if (g.length) for (i = 0; i < g.length; i++) a.push({ name: m, value: g[i], type: u.type });
                        else a.push({ name: m, value: "", type: u.type });
                    } else null != s && (t && t.push(u), a.push({ name: m, value: s, type: u.type, required: u.required }));
            return e || !p.clk || ((m = (d = (f = q(p.clk))[0]).name) && !d.disabled && "image" === d.type && (a.push({ name: m, value: f.val() }), a.push({ name: m + ".x", value: p.clk_x }, { name: m + ".y", value: p.clk_y }))), a;
        }),
        (q.fn.formSerialize = function (e) {
            return q.param(this.formToArray(e));
        }),
        (q.fn.fieldSerialize = function (n) {
            var o = [];
            return (
                this.each(function () {
                    var e = this.name;
                    if (e) {
                        var t = q.fieldValue(this, n);
                        if (t && t.constructor === Array) for (var r = 0, a = t.length; r < a; r++) o.push({ name: e, value: t[r] });
                        else null != t && o.push({ name: this.name, value: t });
                    }
                }),
                q.param(o)
            );
        }),
        (q.fn.fieldValue = function (e) {
            for (var t = [], r = 0, a = this.length; r < a; r++) {
                var n = this[r],
                    o = q.fieldValue(n, e);
                null == o || (o.constructor === Array && !o.length) || (o.constructor === Array ? q.merge(t, o) : t.push(o));
            }
            return t;
        }),
        (q.fieldValue = function (e, t) {
            var r = e.name,
                a = e.type,
                n = e.tagName.toLowerCase();
            if (
                (void 0 === t && (t = !0),
                t &&
                    (!r ||
                        e.disabled ||
                        "reset" === a ||
                        "button" === a ||
                        (("checkbox" === a || "radio" === a) && !e.checked) ||
                        (("submit" === a || "image" === a) && e.form && e.form.clk !== e) ||
                        ("select" === n && -1 === e.selectedIndex)))
            )
                return null;
            if ("select" !== n) return q(e).val().replace(m, "\r\n");
            var o = e.selectedIndex;
            if (o < 0) return null;
            for (var i = [], s = e.options, u = "select-one" === a, c = u ? o + 1 : s.length, l = u ? o : 0; l < c; l++) {
                var f = s[l];
                if (f.selected && !f.disabled) {
                    var d = (d = f.value) || (f.attributes && f.attributes.value && !f.attributes.value.specified ? f.text : f.value);
                    if (u) return d;
                    i.push(d);
                }
            }
            return i;
        }),
        (q.fn.clearForm = function (e) {
            return this.each(function () {
                q("input,select,textarea", this).clearFields(e);
            });
        }),
        (q.fn.clearFields = q.fn.clearInputs = function (r) {
            var a = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
            return this.each(function () {
                var e = this.type,
                    t = this.tagName.toLowerCase();
                a.test(e) || "textarea" === t
                    ? (this.value = "")
                    : "checkbox" === e || "radio" === e
                    ? (this.checked = !1)
                    : "select" === t
                    ? (this.selectedIndex = -1)
                    : "file" === e
                    ? /MSIE/.test(navigator.userAgent)
                        ? q(this).replaceWith(q(this).clone(!0))
                        : q(this).val("")
                    : r && ((!0 === r && /hidden/.test(e)) || ("string" == typeof r && q(this).is(r))) && (this.value = "");
            });
        }),
        (q.fn.resetForm = function () {
            return this.each(function () {
                var t = q(this),
                    e = this.tagName.toLowerCase();
                switch (e) {
                    case "input":
                        this.checked = this.defaultChecked;
                    case "textarea":
                        return (this.value = this.defaultValue), !0;
                    case "option":
                    case "optgroup":
                        var r = t.parents("select");
                        return r.length && r[0].multiple ? ("option" === e ? (this.selected = this.defaultSelected) : t.find("option").resetForm()) : r.resetForm(), !0;
                    case "select":
                        return (
                            t.find("option").each(function (e) {
                                if (((this.selected = this.defaultSelected), this.defaultSelected && !t[0].multiple)) return (t[0].selectedIndex = e), !1;
                            }),
                            !0
                        );
                    case "label":
                        var a = q(t.attr("for")),
                            n = t.find("input,select,textarea");
                        return a[0] && n.unshift(a[0]), n.resetForm(), !0;
                    case "form":
                        return ("function" != typeof this.reset && ("object" != typeof this.reset || this.reset.nodeType)) || this.reset(), !0;
                    default:
                        return t.find("form,input,label,select,textarea").resetForm(), !0;
                }
            });
        }),
        (q.fn.enable = function (e) {
            return (
                void 0 === e && (e = !0),
                this.each(function () {
                    this.disabled = !e;
                })
            );
        }),
        (q.fn.selected = function (r) {
            return (
                void 0 === r && (r = !0),
                this.each(function () {
                    var e,
                        t = this.type;
                    "checkbox" === t || "radio" === t
                        ? (this.checked = r)
                        : "option" === this.tagName.toLowerCase() && ((e = q(this).parent("select")), r && e[0] && "select-one" === e[0].type && e.find("option").selected(!1), (this.selected = r));
                })
            );
        }),
        (q.fn.ajaxSubmit.debug = !1);
});

/* @license GNU-GPL-2.0-or-later https://www.drupal.org/licensing/faq */
(function ($, Drupal, drupalSettings) {
    Drupal.Views = {};
    Drupal.Views.parseQueryString = function (query) {
        const args = {};
        if (query.includes("?")) query = query.substring(query.indexOf("?") + 1);
        let pair;
        const pairs = query.split("&");
        for (let i = 0; i < pairs.length; i++) {
            pair = pairs[i].split("=");
            if (pair[0] !== "q")
                if (pair[1]) args[decodeURIComponent(pair[0].replace(/\+/g, " "))] = decodeURIComponent(pair[1].replace(/\+/g, " "));
                else args[decodeURIComponent(pair[0].replace(/\+/g, " "))] = "";
        }
        return args;
    };
    Drupal.Views.parseViewArgs = function (href, viewPath) {
        const returnObj = {};
        const path = Drupal.Views.getPath(href);
        const viewHref = Drupal.url(viewPath).substring(drupalSettings.path.baseUrl.length);
        if (viewHref && path.substring(0, viewHref.length + 1) === `${viewHref}/`) {
            returnObj.view_args = decodeURIComponent(path.substring(viewHref.length + 1, path.length));
            returnObj.view_path = path;
        }
        return returnObj;
    };
    Drupal.Views.pathPortion = function (href) {
        const protocol = window.location.protocol;
        if (href.substring(0, protocol.length) === protocol) href = href.substring(href.indexOf("/", protocol.length + 2));
        return href;
    };
    Drupal.Views.getPath = function (href) {
        href = Drupal.Views.pathPortion(href);
        href = href.substring(drupalSettings.path.baseUrl.length, href.length);
        if (href.substring(0, 3) === "?q=") href = href.substring(3, href.length);
        const chars = ["#", "?", "&"];
        for (let i = 0; i < chars.length; i++) if (href.includes(chars[i])) href = href.substr(0, href.indexOf(chars[i]));
        return href;
    };
})(jQuery, Drupal, drupalSettings);
(function ($, Drupal, drupalSettings) {
    Drupal.behaviors.ViewsAjaxView = {};
    Drupal.behaviors.ViewsAjaxView.attach = function (context, settings) {
        if (settings && settings.views && settings.views.ajaxViews) {
            const {
                views: { ajaxViews },
            } = settings;
            Object.keys(ajaxViews || {}).forEach((i) => {
                Drupal.views.instances[i] = new Drupal.views.ajaxView(ajaxViews[i]);
            });
        }
    };
    Drupal.behaviors.ViewsAjaxView.detach = (context, settings, trigger) => {
        if (trigger === "unload")
            if (settings && settings.views && settings.views.ajaxViews) {
                const {
                    views: { ajaxViews },
                } = settings;
                Object.keys(ajaxViews || {}).forEach((i) => {
                    const selector = `.js-view-dom-id-${ajaxViews[i].view_dom_id}`;
                    if ($(selector, context).length) {
                        delete Drupal.views.instances[i];
                        delete settings.views.ajaxViews[i];
                    }
                });
            }
    };
    Drupal.views = {};
    Drupal.views.instances = {};
    Drupal.views.ajaxView = function (settings) {
        const selector = `.js-view-dom-id-${settings.view_dom_id}`;
        this.$view = $(selector);
        let ajaxPath = drupalSettings.views.ajax_path;
        if (ajaxPath.constructor.toString().includes("Array")) ajaxPath = ajaxPath[0];
        let queryString = window.location.search || "";
        if (queryString !== "") {
            queryString = queryString.slice(1).replace(/q=[^&]+&?|&?render=[^&]+/, "");
            if (queryString !== "") queryString = (/\?/.test(ajaxPath) ? "&" : "?") + queryString;
        }
        this.element_settings = { url: ajaxPath + queryString, submit: settings, httpMethod: "GET", setClick: true, event: "click", selector, progress: { type: "fullscreen" } };
        this.settings = settings;
        this.$exposed_form = $(`form#views-exposed-form-${settings.view_name.replace(/_/g, "-")}-${settings.view_display_id.replace(/_/g, "-")}`);
        once("exposed-form", this.$exposed_form).forEach(this.attachExposedFormAjax.bind(this));
        once("ajax-pager", this.$view.filter(this.filterNestedViews.bind(this))).forEach(this.attachPagerAjax.bind(this));
        const selfSettings = $.extend({}, this.element_settings, { event: "RefreshView", base: this.selector, httpMethod: "GET", element: this.$view.get(0) });
        this.refreshViewAjax = Drupal.ajax(selfSettings);
    };
    Drupal.views.ajaxView.prototype.attachExposedFormAjax = function () {
        const that = this;
        this.exposedFormAjax = [];
        $("input[type=submit], button[type=submit], input[type=image]", this.$exposed_form)
            .not("[data-drupal-selector=edit-reset]")
            .each(function (index) {
                const selfSettings = $.extend({}, that.element_settings, { base: $(this).attr("id"), element: this });
                that.exposedFormAjax[index] = Drupal.ajax(selfSettings);
            });
    };
    Drupal.views.ajaxView.prototype.filterNestedViews = function () {
        return !this.$view.parents(".view").length;
    };
    Drupal.views.ajaxView.prototype.attachPagerAjax = function () {
        this.$view.find(".js-pager__items a, th.views-field a, .attachment .views-summary a").each(this.attachPagerLinkAjax.bind(this));
    };
    Drupal.views.ajaxView.prototype.attachPagerLinkAjax = function (id, link) {
        const $link = $(link);
        const viewData = {};
        const href = $link.attr("href");
        $.extend(viewData, this.settings, Drupal.Views.parseQueryString(href), Drupal.Views.parseViewArgs(href, this.settings.view_base_path));
        const selfSettings = $.extend({}, this.element_settings, { submit: viewData, base: false, element: link, httpMethod: "GET" });
        this.pagerAjax = Drupal.ajax(selfSettings);
    };
    Drupal.AjaxCommands.prototype.viewsScrollTop = function (ajax, response) {
        Drupal.AjaxCommands.prototype.scrollTop(ajax, response);
    };
})(jQuery, Drupal, drupalSettings);
(function ($, Drupal, debounce) {
    "use strict";
    var $window = $(window);
    var scrollThreshold = 200;
    var automaticPagerSelector = '[data-drupal-views-infinite-scroll-pager="automatic"]';
    var pagerSelector = "[data-drupal-views-infinite-scroll-pager]";
    var contentWrapperSelector = "[data-drupal-views-infinite-scroll-content-wrapper]";
    var scrollEvent = "scroll.views_infinite_scroll";
    $.fn.infiniteScrollInsertView = function ($newView) {
        var matches = /(js-view-dom-id-\w+)/.exec(this.attr("class"));
        if (!matches) return;
        var currentViewId = matches[1].replace("js-view-dom-id-", "views_dom_id:");
        var view = Drupal.views.instances[currentViewId];
        once.remove("ajax-pager", view.$view);
        once.remove("exposed-form", view.$exposed_form);
        var $existingPager = view.$view.find(pagerSelector);
        once.remove("infinite-scroll", $existingPager);
        var $newRows = $newView.find(contentWrapperSelector).children();
        var $newPager = $newView.find(pagerSelector);
        view.$view.find(contentWrapperSelector).trigger("views_infinite_scroll.new_content", $newRows.clone()).append($newRows);
        $existingPager.replaceWith($newPager);
        Drupal.attachBehaviors(view.$view[0]);
    };
    Drupal.behaviors.views_infinite_scroll_automatic = {
        attach: function (context, settings) {
            once("infinite-scroll", automaticPagerSelector, context).forEach(function (elem) {
                var $pager = $(elem);
                $pager.addClass("visually-hidden");
                var isLoadNeeded = function () {
                    return window.innerHeight + window.pageYOffset > $pager.offset().top - scrollThreshold;
                };
                $window.on(
                    scrollEvent,
                    debounce(function () {
                        if (isLoadNeeded()) {
                            $pager.find("[rel=next]").click();
                            $window.off(scrollEvent);
                        }
                    }, 200)
                );
                if (isLoadNeeded()) $window.trigger(scrollEvent);
            });
        },
        detach: function (context, settings, trigger) {
            if (trigger === "unload") if (once.remove("infinite-scroll", automaticPagerSelector, context).length) $window.off(scrollEvent);
        },
    };
    Drupal.views.ajaxView.prototype.filterNestedViews = function () {
        return this.$view.hasClass("view-eva") || !this.$view.parents(".view").length;
    };
})(jQuery, Drupal, Drupal.debounce);
(function ($, Drupal, drupalSettings) {
    Drupal.behaviors.betterExposedFilters = {
        attach: function (context, settings) {
            $(".bef-tree input[type=checkbox], .bef-checkboxes input[type=checkbox]")
                .change(function () {
                    _bef_highlight(this, context);
                })
                .filter(":checked")
                .closest(".form-item", context)
                .addClass("highlight");
        },
    };
    function _bef_highlight(elem, context) {
        $elem = $(elem, context);
        $elem.attr("checked") ? $elem.closest(".form-item", context).addClass("highlight") : $elem.closest(".form-item", context).removeClass("highlight");
    }
})(jQuery, Drupal, drupalSettings);
(function ($, Drupal, once) {
    Drupal.behaviors.betterExposedFiltersAutoSubmit = {
        attach: function (context) {
            var selectors = "form[data-bef-auto-submit-full-form], [data-bef-auto-submit-full-form] form, [data-bef-auto-submit]";
            $(selectors, context)
                .addBack(selectors)
                .each(function (i, e) {
                    var $form = $(e);
                    var autoSubmitDelay = $form.data("bef-auto-submit-delay") || 500;
                    $(once("bef-auto-submit", $form)).on("change", triggerSubmit).on("keyup", Drupal.debounce(triggerSubmit, autoSubmitDelay));
                });
            function triggerSubmit(e) {
                var ignoredKeyCodes = [16, 17, 18, 20, 33, 34, 35, 36, 37, 38, 39, 40, 9, 13, 27];
                var $target = $(e.target);
                var $submit = $target.closest("form").find("[data-bef-auto-submit-click]");
                if ($target.is("[data-bef-auto-submit-exclude], :submit") || ($target.attr("autocomplete") == "off" && !$target.hasClass("bef-datepicker"))) return true;
                if ($target.is(":text:not(.hasDatepicker), textarea") && $.inArray(e.keyCode, ignoredKeyCodes) === -1) $submit.click();
                else {
                    if (e.type === "change") $submit.click();
                }
            }
        },
    };
})(jQuery, Drupal, once);
/* @license MIT https://opensource.org/licenses/MIT */
/* == jquery mousewheel plugin == Version: 3.1.13, License: MIT License (MIT) */
!(function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? (module.exports = a) : a(jQuery);
})(function (a) {
    function b(b) {
        var g = b || window.event,
            h = i.call(arguments, 1),
            j = 0,
            l = 0,
            m = 0,
            n = 0,
            o = 0,
            p = 0;
        if (
            ((b = a.event.fix(g)),
            (b.type = "mousewheel"),
            "detail" in g && (m = -1 * g.detail),
            "wheelDelta" in g && (m = g.wheelDelta),
            "wheelDeltaY" in g && (m = g.wheelDeltaY),
            "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX),
            "axis" in g && g.axis === g.HORIZONTAL_AXIS && ((l = -1 * m), (m = 0)),
            (j = 0 === m ? l : m),
            "deltaY" in g && ((m = -1 * g.deltaY), (j = m)),
            "deltaX" in g && ((l = g.deltaX), 0 === m && (j = -1 * l)),
            0 !== m || 0 !== l)
        ) {
            if (1 === g.deltaMode) {
                var q = a.data(this, "mousewheel-line-height");
                (j *= q), (m *= q), (l *= q);
            } else if (2 === g.deltaMode) {
                var r = a.data(this, "mousewheel-page-height");
                (j *= r), (m *= r), (l *= r);
            }
            if (
                ((n = Math.max(Math.abs(m), Math.abs(l))),
                (!f || f > n) && ((f = n), d(g, n) && (f /= 40)),
                d(g, n) && ((j /= 40), (l /= 40), (m /= 40)),
                (j = Math[j >= 1 ? "floor" : "ceil"](j / f)),
                (l = Math[l >= 1 ? "floor" : "ceil"](l / f)),
                (m = Math[m >= 1 ? "floor" : "ceil"](m / f)),
                k.settings.normalizeOffset && this.getBoundingClientRect)
            ) {
                var s = this.getBoundingClientRect();
                (o = b.clientX - s.left), (p = b.clientY - s.top);
            }
            return (
                (b.deltaX = l),
                (b.deltaY = m),
                (b.deltaFactor = f),
                (b.offsetX = o),
                (b.offsetY = p),
                (b.deltaMode = 0),
                h.unshift(b, j, l, m),
                e && clearTimeout(e),
                (e = setTimeout(c, 200)),
                (a.event.dispatch || a.event.handle).apply(this, h)
            );
        }
    }
    function c() {
        f = null;
    }
    function d(a, b) {
        return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0;
    }
    var e,
        f,
        g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        i = Array.prototype.slice;
    if (a.event.fixHooks) for (var j = g.length; j; ) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
    var k = (a.event.special.mousewheel = {
        version: "3.1.12",
        setup: function () {
            if (this.addEventListener) for (var c = h.length; c; ) this.addEventListener(h[--c], b, !1);
            else this.onmousewheel = b;
            a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this));
        },
        teardown: function () {
            if (this.removeEventListener) for (var c = h.length; c; ) this.removeEventListener(h[--c], b, !1);
            else this.onmousewheel = null;
            a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height");
        },
        getLineHeight: function (b) {
            var c = a(b),
                d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
            return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16;
        },
        getPageHeight: function (b) {
            return a(b).height();
        },
        settings: { adjustOldDeltas: !0, normalizeOffset: !0 },
    });
    a.fn.extend({
        mousewheel: function (a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel");
        },
        unmousewheel: function (a) {
            return this.unbind("mousewheel", a);
        },
    });
});
!(function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? (module.exports = a) : a(jQuery);
})(function (a) {
    function b(b) {
        var g = b || window.event,
            h = i.call(arguments, 1),
            j = 0,
            l = 0,
            m = 0,
            n = 0,
            o = 0,
            p = 0;
        if (
            ((b = a.event.fix(g)),
            (b.type = "mousewheel"),
            "detail" in g && (m = -1 * g.detail),
            "wheelDelta" in g && (m = g.wheelDelta),
            "wheelDeltaY" in g && (m = g.wheelDeltaY),
            "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX),
            "axis" in g && g.axis === g.HORIZONTAL_AXIS && ((l = -1 * m), (m = 0)),
            (j = 0 === m ? l : m),
            "deltaY" in g && ((m = -1 * g.deltaY), (j = m)),
            "deltaX" in g && ((l = g.deltaX), 0 === m && (j = -1 * l)),
            0 !== m || 0 !== l)
        ) {
            if (1 === g.deltaMode) {
                var q = a.data(this, "mousewheel-line-height");
                (j *= q), (m *= q), (l *= q);
            } else if (2 === g.deltaMode) {
                var r = a.data(this, "mousewheel-page-height");
                (j *= r), (m *= r), (l *= r);
            }
            if (
                ((n = Math.max(Math.abs(m), Math.abs(l))),
                (!f || f > n) && ((f = n), d(g, n) && (f /= 40)),
                d(g, n) && ((j /= 40), (l /= 40), (m /= 40)),
                (j = Math[j >= 1 ? "floor" : "ceil"](j / f)),
                (l = Math[l >= 1 ? "floor" : "ceil"](l / f)),
                (m = Math[m >= 1 ? "floor" : "ceil"](m / f)),
                k.settings.normalizeOffset && this.getBoundingClientRect)
            ) {
                var s = this.getBoundingClientRect();
                (o = b.clientX - s.left), (p = b.clientY - s.top);
            }
            return (
                (b.deltaX = l),
                (b.deltaY = m),
                (b.deltaFactor = f),
                (b.offsetX = o),
                (b.offsetY = p),
                (b.deltaMode = 0),
                h.unshift(b, j, l, m),
                e && clearTimeout(e),
                (e = setTimeout(c, 200)),
                (a.event.dispatch || a.event.handle).apply(this, h)
            );
        }
    }
    function c() {
        f = null;
    }
    function d(a, b) {
        return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0;
    }
    var e,
        f,
        g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        i = Array.prototype.slice;
    if (a.event.fixHooks) for (var j = g.length; j; ) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
    var k = (a.event.special.mousewheel = {
        version: "3.1.12",
        setup: function () {
            if (this.addEventListener) for (var c = h.length; c; ) this.addEventListener(h[--c], b, !1);
            else this.onmousewheel = b;
            a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this));
        },
        teardown: function () {
            if (this.removeEventListener) for (var c = h.length; c; ) this.removeEventListener(h[--c], b, !1);
            else this.onmousewheel = null;
            a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height");
        },
        getLineHeight: function (b) {
            var c = a(b),
                d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
            return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16;
        },
        getPageHeight: function (b) {
            return a(b).height();
        },
        settings: { adjustOldDeltas: !0, normalizeOffset: !0 },
    });
    a.fn.extend({
        mousewheel: function (a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel");
        },
        unmousewheel: function (a) {
            return this.unbind("mousewheel", a);
        },
    });
});
/* == malihu jquery custom scrollbar plugin == Version: 3.1.5, License: MIT License (MIT) */
!(function (e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof module && module.exports ? (module.exports = e) : e(jQuery, window, document);
})(function (e) {
    !(function (t) {
        var o = "function" == typeof define && define.amd,
            a = "undefined" != typeof module && module.exports,
            n = "https:" == document.location.protocol ? "https:" : "http:",
            i = "cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";
        o || (a ? require("jquery-mousewheel")(e) : e.event.special.mousewheel || e("head").append(decodeURI("%3Cscript src=" + n + "//" + i + "%3E%3C/script%3E"))), t();
    })(function () {
        var t,
            o = "mCustomScrollbar",
            a = "mCS",
            n = ".mCustomScrollbar",
            i = {
                setTop: 0,
                setLeft: 0,
                axis: "y",
                scrollbarPosition: "inside",
                scrollInertia: 950,
                autoDraggerLength: !0,
                alwaysShowScrollbar: 0,
                snapOffset: 0,
                mouseWheel: { enable: !0, scrollAmount: "auto", axis: "y", deltaFactor: "auto", disableOver: ["select", "option", "keygen", "datalist", "textarea"] },
                scrollButtons: { scrollType: "stepless", scrollAmount: "auto" },
                keyboard: { enable: !0, scrollType: "stepless", scrollAmount: "auto" },
                contentTouchScroll: 25,
                documentTouchScroll: !0,
                advanced: { autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']", updateOnContentResize: !0, updateOnImageLoad: "auto", autoUpdateTimeout: 60 },
                theme: "light",
                callbacks: { onTotalScrollOffset: 0, onTotalScrollBackOffset: 0, alwaysTriggerOffsets: !0 },
            },
            r = 0,
            l = {},
            s = window.attachEvent && !window.addEventListener ? 1 : 0,
            c = !1,
            d = [
                "mCSB_dragger_onDrag",
                "mCSB_scrollTools_onDrag",
                "mCS_img_loaded",
                "mCS_disabled",
                "mCS_destroyed",
                "mCS_no_scrollbar",
                "mCS-autoHide",
                "mCS-dir-rtl",
                "mCS_no_scrollbar_y",
                "mCS_no_scrollbar_x",
                "mCS_y_hidden",
                "mCS_x_hidden",
                "mCSB_draggerContainer",
                "mCSB_buttonUp",
                "mCSB_buttonDown",
                "mCSB_buttonLeft",
                "mCSB_buttonRight",
            ],
            u = {
                init: function (t) {
                    var t = e.extend(!0, {}, i, t),
                        o = f.call(this);
                    if (t.live) {
                        var s = t.liveSelector || this.selector || n,
                            c = e(s);
                        if ("off" === t.live) return void m(s);
                        l[s] = setTimeout(function () {
                            c.mCustomScrollbar(t), "once" === t.live && c.length && m(s);
                        }, 500);
                    } else m(s);
                    return (
                        (t.setWidth = t.set_width ? t.set_width : t.setWidth),
                        (t.setHeight = t.set_height ? t.set_height : t.setHeight),
                        (t.axis = t.horizontalScroll ? "x" : p(t.axis)),
                        (t.scrollInertia = t.scrollInertia > 0 && t.scrollInertia < 17 ? 17 : t.scrollInertia),
                        "object" != typeof t.mouseWheel && 1 == t.mouseWheel && (t.mouseWheel = { enable: !0, scrollAmount: "auto", axis: "y", preventDefault: !1, deltaFactor: "auto", normalizeDelta: !1, invert: !1 }),
                        (t.mouseWheel.scrollAmount = t.mouseWheelPixels ? t.mouseWheelPixels : t.mouseWheel.scrollAmount),
                        (t.mouseWheel.normalizeDelta = t.advanced.normalizeMouseWheelDelta ? t.advanced.normalizeMouseWheelDelta : t.mouseWheel.normalizeDelta),
                        (t.scrollButtons.scrollType = g(t.scrollButtons.scrollType)),
                        h(t),
                        e(o).each(function () {
                            var o = e(this);
                            if (!o.data(a)) {
                                o.data(a, {
                                    idx: ++r,
                                    opt: t,
                                    scrollRatio: { y: null, x: null },
                                    overflowed: null,
                                    contentReset: { y: null, x: null },
                                    bindEvents: !1,
                                    tweenRunning: !1,
                                    sequential: {},
                                    langDir: o.css("direction"),
                                    cbOffsets: null,
                                    trigger: null,
                                    poll: { size: { o: 0, n: 0 }, img: { o: 0, n: 0 }, change: { o: 0, n: 0 } },
                                });
                                var n = o.data(a),
                                    i = n.opt,
                                    l = o.data("mcs-axis"),
                                    s = o.data("mcs-scrollbar-position"),
                                    c = o.data("mcs-theme");
                                l && (i.axis = l),
                                    s && (i.scrollbarPosition = s),
                                    c && ((i.theme = c), h(i)),
                                    v.call(this),
                                    n && i.callbacks.onCreate && "function" == typeof i.callbacks.onCreate && i.callbacks.onCreate.call(this),
                                    e("#mCSB_" + n.idx + "_container img:not(." + d[2] + ")").addClass(d[2]),
                                    u.update.call(null, o);
                            }
                        })
                    );
                },
                update: function (t, o) {
                    var n = t || f.call(this);
                    return e(n).each(function () {
                        var t = e(this);
                        if (t.data(a)) {
                            var n = t.data(a),
                                i = n.opt,
                                r = e("#mCSB_" + n.idx + "_container"),
                                l = e("#mCSB_" + n.idx),
                                s = [e("#mCSB_" + n.idx + "_dragger_vertical"), e("#mCSB_" + n.idx + "_dragger_horizontal")];
                            if (!r.length) return;
                            n.tweenRunning && Q(t),
                                o && n && i.callbacks.onBeforeUpdate && "function" == typeof i.callbacks.onBeforeUpdate && i.callbacks.onBeforeUpdate.call(this),
                                t.hasClass(d[3]) && t.removeClass(d[3]),
                                t.hasClass(d[4]) && t.removeClass(d[4]),
                                l.css("max-height", "none"),
                                l.height() !== t.height() && l.css("max-height", t.height()),
                                _.call(this),
                                "y" === i.axis || i.advanced.autoExpandHorizontalScroll || r.css("width", x(r)),
                                (n.overflowed = y.call(this)),
                                M.call(this),
                                i.autoDraggerLength && S.call(this),
                                b.call(this),
                                T.call(this);
                            var c = [Math.abs(r[0].offsetTop), Math.abs(r[0].offsetLeft)];
                            "x" !== i.axis &&
                                (n.overflowed[0]
                                    ? s[0].height() > s[0].parent().height()
                                        ? B.call(this)
                                        : (G(t, c[0].toString(), { dir: "y", dur: 0, overwrite: "none" }), (n.contentReset.y = null))
                                    : (B.call(this), "y" === i.axis ? k.call(this) : "yx" === i.axis && n.overflowed[1] && G(t, c[1].toString(), { dir: "x", dur: 0, overwrite: "none" }))),
                                "y" !== i.axis &&
                                    (n.overflowed[1]
                                        ? s[1].width() > s[1].parent().width()
                                            ? B.call(this)
                                            : (G(t, c[1].toString(), { dir: "x", dur: 0, overwrite: "none" }), (n.contentReset.x = null))
                                        : (B.call(this), "x" === i.axis ? k.call(this) : "yx" === i.axis && n.overflowed[0] && G(t, c[0].toString(), { dir: "y", dur: 0, overwrite: "none" }))),
                                o &&
                                    n &&
                                    (2 === o && i.callbacks.onImageLoad && "function" == typeof i.callbacks.onImageLoad
                                        ? i.callbacks.onImageLoad.call(this)
                                        : 3 === o && i.callbacks.onSelectorChange && "function" == typeof i.callbacks.onSelectorChange
                                        ? i.callbacks.onSelectorChange.call(this)
                                        : i.callbacks.onUpdate && "function" == typeof i.callbacks.onUpdate && i.callbacks.onUpdate.call(this)),
                                N.call(this);
                        }
                    });
                },
                scrollTo: function (t, o) {
                    if ("undefined" != typeof t && null != t) {
                        var n = f.call(this);
                        return e(n).each(function () {
                            var n = e(this);
                            if (n.data(a)) {
                                var i = n.data(a),
                                    r = i.opt,
                                    l = { trigger: "external", scrollInertia: r.scrollInertia, scrollEasing: "mcsEaseInOut", moveDragger: !1, timeout: 60, callbacks: !0, onStart: !0, onUpdate: !0, onComplete: !0 },
                                    s = e.extend(!0, {}, l, o),
                                    c = Y.call(this, t),
                                    d = s.scrollInertia > 0 && s.scrollInertia < 17 ? 17 : s.scrollInertia;
                                (c[0] = X.call(this, c[0], "y")),
                                    (c[1] = X.call(this, c[1], "x")),
                                    s.moveDragger && ((c[0] *= i.scrollRatio.y), (c[1] *= i.scrollRatio.x)),
                                    (s.dur = ne() ? 0 : d),
                                    setTimeout(function () {
                                        null !== c[0] && "undefined" != typeof c[0] && "x" !== r.axis && i.overflowed[0] && ((s.dir = "y"), (s.overwrite = "all"), G(n, c[0].toString(), s)),
                                            null !== c[1] && "undefined" != typeof c[1] && "y" !== r.axis && i.overflowed[1] && ((s.dir = "x"), (s.overwrite = "none"), G(n, c[1].toString(), s));
                                    }, s.timeout);
                            }
                        });
                    }
                },
                stop: function () {
                    var t = f.call(this);
                    return e(t).each(function () {
                        var t = e(this);
                        t.data(a) && Q(t);
                    });
                },
                disable: function (t) {
                    var o = f.call(this);
                    return e(o).each(function () {
                        var o = e(this);
                        if (o.data(a)) {
                            o.data(a);
                            N.call(this, "remove"), k.call(this), t && B.call(this), M.call(this, !0), o.addClass(d[3]);
                        }
                    });
                },
                destroy: function () {
                    var t = f.call(this);
                    return e(t).each(function () {
                        var n = e(this);
                        if (n.data(a)) {
                            var i = n.data(a),
                                r = i.opt,
                                l = e("#mCSB_" + i.idx),
                                s = e("#mCSB_" + i.idx + "_container"),
                                c = e(".mCSB_" + i.idx + "_scrollbar");
                            r.live && m(r.liveSelector || e(t).selector),
                                N.call(this, "remove"),
                                k.call(this),
                                B.call(this),
                                n.removeData(a),
                                $(this, "mcs"),
                                c.remove(),
                                s.find("img." + d[2]).removeClass(d[2]),
                                l.replaceWith(s.contents()),
                                n.removeClass(o + " _" + a + "_" + i.idx + " " + d[6] + " " + d[7] + " " + d[5] + " " + d[3]).addClass(d[4]);
                        }
                    });
                },
            },
            f = function () {
                return "object" != typeof e(this) || e(this).length < 1 ? n : this;
            },
            h = function (t) {
                var o = ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"],
                    a = ["rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"],
                    n = ["minimal", "minimal-dark"],
                    i = ["minimal", "minimal-dark"],
                    r = ["minimal", "minimal-dark"];
                (t.autoDraggerLength = e.inArray(t.theme, o) > -1 ? !1 : t.autoDraggerLength),
                    (t.autoExpandScrollbar = e.inArray(t.theme, a) > -1 ? !1 : t.autoExpandScrollbar),
                    (t.scrollButtons.enable = e.inArray(t.theme, n) > -1 ? !1 : t.scrollButtons.enable),
                    (t.autoHideScrollbar = e.inArray(t.theme, i) > -1 ? !0 : t.autoHideScrollbar),
                    (t.scrollbarPosition = e.inArray(t.theme, r) > -1 ? "outside" : t.scrollbarPosition);
            },
            m = function (e) {
                l[e] && (clearTimeout(l[e]), $(l, e));
            },
            p = function (e) {
                return "yx" === e || "xy" === e || "auto" === e ? "yx" : "x" === e || "horizontal" === e ? "x" : "y";
            },
            g = function (e) {
                return "stepped" === e || "pixels" === e || "step" === e || "click" === e ? "stepped" : "stepless";
            },
            v = function () {
                var t = e(this),
                    n = t.data(a),
                    i = n.opt,
                    r = i.autoExpandScrollbar ? " " + d[1] + "_expand" : "",
                    l = [
                        "<div id='mCSB_" +
                            n.idx +
                            "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" +
                            n.idx +
                            "_scrollbar mCS-" +
                            i.theme +
                            " mCSB_scrollTools_vertical" +
                            r +
                            "'><div class='" +
                            d[12] +
                            "'><div id='mCSB_" +
                            n.idx +
                            "_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>",
                        "<div id='mCSB_" +
                            n.idx +
                            "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" +
                            n.idx +
                            "_scrollbar mCS-" +
                            i.theme +
                            " mCSB_scrollTools_horizontal" +
                            r +
                            "'><div class='" +
                            d[12] +
                            "'><div id='mCSB_" +
                            n.idx +
                            "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>",
                    ],
                    s = "yx" === i.axis ? "mCSB_vertical_horizontal" : "x" === i.axis ? "mCSB_horizontal" : "mCSB_vertical",
                    c = "yx" === i.axis ? l[0] + l[1] : "x" === i.axis ? l[1] : l[0],
                    u = "yx" === i.axis ? "<div id='mCSB_" + n.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : "",
                    f = i.autoHideScrollbar ? " " + d[6] : "",
                    h = "x" !== i.axis && "rtl" === n.langDir ? " " + d[7] : "";
                i.setWidth && t.css("width", i.setWidth),
                    i.setHeight && t.css("height", i.setHeight),
                    (i.setLeft = "y" !== i.axis && "rtl" === n.langDir ? "989999px" : i.setLeft),
                    t
                        .addClass(o + " _" + a + "_" + n.idx + f + h)
                        .wrapInner(
                            "<div id='mCSB_" +
                                n.idx +
                                "' class='mCustomScrollBox mCS-" +
                                i.theme +
                                " " +
                                s +
                                "'><div id='mCSB_" +
                                n.idx +
                                "_container' class='mCSB_container' style='position:relative; top:" +
                                i.setTop +
                                "; left:" +
                                i.setLeft +
                                ";' dir='" +
                                n.langDir +
                                "' /></div>"
                        );
                var m = e("#mCSB_" + n.idx),
                    p = e("#mCSB_" + n.idx + "_container");
                "y" === i.axis || i.advanced.autoExpandHorizontalScroll || p.css("width", x(p)),
                    "outside" === i.scrollbarPosition ? ("static" === t.css("position") && t.css("position", "relative"), t.css("overflow", "visible"), m.addClass("mCSB_outside").after(c)) : (m.addClass("mCSB_inside").append(c), p.wrap(u)),
                    w.call(this);
                var g = [e("#mCSB_" + n.idx + "_dragger_vertical"), e("#mCSB_" + n.idx + "_dragger_horizontal")];
                g[0].css("min-height", g[0].height()), g[1].css("min-width", g[1].width());
            },
            x = function (t) {
                var o = [
                        t[0].scrollWidth,
                        Math.max.apply(
                            Math,
                            t
                                .children()
                                .map(function () {
                                    return e(this).outerWidth(!0);
                                })
                                .get()
                        ),
                    ],
                    a = t.parent().width();
                return o[0] > a ? o[0] : o[1] > a ? o[1] : "100%";
            },
            _ = function () {
                var t = e(this),
                    o = t.data(a),
                    n = o.opt,
                    i = e("#mCSB_" + o.idx + "_container");
                if (n.advanced.autoExpandHorizontalScroll && "y" !== n.axis) {
                    i.css({ width: "auto", "min-width": 0, "overflow-x": "scroll" });
                    var r = Math.ceil(i[0].scrollWidth);
                    3 === n.advanced.autoExpandHorizontalScroll || (2 !== n.advanced.autoExpandHorizontalScroll && r > i.parent().width())
                        ? i.css({ width: r, "min-width": "100%", "overflow-x": "inherit" })
                        : i
                              .css({ "overflow-x": "inherit", position: "absolute" })
                              .wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />")
                              .css({ width: Math.ceil(i[0].getBoundingClientRect().right + 0.4) - Math.floor(i[0].getBoundingClientRect().left), "min-width": "100%", position: "relative" })
                              .unwrap();
                }
            },
            w = function () {
                var t = e(this),
                    o = t.data(a),
                    n = o.opt,
                    i = e(".mCSB_" + o.idx + "_scrollbar:first"),
                    r = oe(n.scrollButtons.tabindex) ? "tabindex='" + n.scrollButtons.tabindex + "'" : "",
                    l = ["<a href='#' class='" + d[13] + "' " + r + " />", "<a href='#' class='" + d[14] + "' " + r + " />", "<a href='#' class='" + d[15] + "' " + r + " />", "<a href='#' class='" + d[16] + "' " + r + " />"],
                    s = ["x" === n.axis ? l[2] : l[0], "x" === n.axis ? l[3] : l[1], l[2], l[3]];
                n.scrollButtons.enable && i.prepend(s[0]).append(s[1]).next(".mCSB_scrollTools").prepend(s[2]).append(s[3]);
            },
            S = function () {
                var t = e(this),
                    o = t.data(a),
                    n = e("#mCSB_" + o.idx),
                    i = e("#mCSB_" + o.idx + "_container"),
                    r = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")],
                    l = [n.height() / i.outerHeight(!1), n.width() / i.outerWidth(!1)],
                    c = [parseInt(r[0].css("min-height")), Math.round(l[0] * r[0].parent().height()), parseInt(r[1].css("min-width")), Math.round(l[1] * r[1].parent().width())],
                    d = s && c[1] < c[0] ? c[0] : c[1],
                    u = s && c[3] < c[2] ? c[2] : c[3];
                r[0]
                    .css({ height: d, "max-height": r[0].parent().height() - 10 })
                    .find(".mCSB_dragger_bar")
                    .css({ "line-height": c[0] + "px" }),
                    r[1].css({ width: u, "max-width": r[1].parent().width() - 10 });
            },
            b = function () {
                var t = e(this),
                    o = t.data(a),
                    n = e("#mCSB_" + o.idx),
                    i = e("#mCSB_" + o.idx + "_container"),
                    r = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")],
                    l = [i.outerHeight(!1) - n.height(), i.outerWidth(!1) - n.width()],
                    s = [l[0] / (r[0].parent().height() - r[0].height()), l[1] / (r[1].parent().width() - r[1].width())];
                o.scrollRatio = { y: s[0], x: s[1] };
            },
            C = function (e, t, o) {
                var a = o ? d[0] + "_expanded" : "",
                    n = e.closest(".mCSB_scrollTools");
                "active" === t
                    ? (e.toggleClass(d[0] + " " + a), n.toggleClass(d[1]), (e[0]._draggable = e[0]._draggable ? 0 : 1))
                    : e[0]._draggable || ("hide" === t ? (e.removeClass(d[0]), n.removeClass(d[1])) : (e.addClass(d[0]), n.addClass(d[1])));
            },
            y = function () {
                var t = e(this),
                    o = t.data(a),
                    n = e("#mCSB_" + o.idx),
                    i = e("#mCSB_" + o.idx + "_container"),
                    r = null == o.overflowed ? i.height() : i.outerHeight(!1),
                    l = null == o.overflowed ? i.width() : i.outerWidth(!1),
                    s = i[0].scrollHeight,
                    c = i[0].scrollWidth;
                return s > r && (r = s), c > l && (l = c), [r > n.height(), l > n.width()];
            },
            B = function () {
                var t = e(this),
                    o = t.data(a),
                    n = o.opt,
                    i = e("#mCSB_" + o.idx),
                    r = e("#mCSB_" + o.idx + "_container"),
                    l = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")];
                if ((Q(t), (("x" !== n.axis && !o.overflowed[0]) || ("y" === n.axis && o.overflowed[0])) && (l[0].add(r).css("top", 0), G(t, "_resetY")), ("y" !== n.axis && !o.overflowed[1]) || ("x" === n.axis && o.overflowed[1]))) {
                    var s = (dx = 0);
                    "rtl" === o.langDir && ((s = i.width() - r.outerWidth(!1)), (dx = Math.abs(s / o.scrollRatio.x))), r.css("left", s), l[1].css("left", dx), G(t, "_resetX");
                }
            },
            T = function () {
                function t() {
                    r = setTimeout(function () {
                        e.event.special.mousewheel ? (clearTimeout(r), W.call(o[0])) : t();
                    }, 100);
                }
                var o = e(this),
                    n = o.data(a),
                    i = n.opt;
                if (!n.bindEvents) {
                    if ((I.call(this), i.contentTouchScroll && D.call(this), E.call(this), i.mouseWheel.enable)) {
                        var r;
                        t();
                    }
                    P.call(this), U.call(this), i.advanced.autoScrollOnFocus && H.call(this), i.scrollButtons.enable && F.call(this), i.keyboard.enable && q.call(this), (n.bindEvents = !0);
                }
            },
            k = function () {
                var t = e(this),
                    o = t.data(a),
                    n = o.opt,
                    i = a + "_" + o.idx,
                    r = ".mCSB_" + o.idx + "_scrollbar",
                    l = e("#mCSB_" + o.idx + ",#mCSB_" + o.idx + "_container,#mCSB_" + o.idx + "_container_wrapper," + r + " ." + d[12] + ",#mCSB_" + o.idx + "_dragger_vertical,#mCSB_" + o.idx + "_dragger_horizontal," + r + ">a"),
                    s = e("#mCSB_" + o.idx + "_container");
                n.advanced.releaseDraggableSelectors && l.add(e(n.advanced.releaseDraggableSelectors)),
                    n.advanced.extraDraggableSelectors && l.add(e(n.advanced.extraDraggableSelectors)),
                    o.bindEvents &&
                        (e(document)
                            .add(e(!A() || top.document))
                            .unbind("." + i),
                        l.each(function () {
                            e(this).unbind("." + i);
                        }),
                        clearTimeout(t[0]._focusTimeout),
                        $(t[0], "_focusTimeout"),
                        clearTimeout(o.sequential.step),
                        $(o.sequential, "step"),
                        clearTimeout(s[0].onCompleteTimeout),
                        $(s[0], "onCompleteTimeout"),
                        (o.bindEvents = !1));
            },
            M = function (t) {
                var o = e(this),
                    n = o.data(a),
                    i = n.opt,
                    r = e("#mCSB_" + n.idx + "_container_wrapper"),
                    l = r.length ? r : e("#mCSB_" + n.idx + "_container"),
                    s = [e("#mCSB_" + n.idx + "_scrollbar_vertical"), e("#mCSB_" + n.idx + "_scrollbar_horizontal")],
                    c = [s[0].find(".mCSB_dragger"), s[1].find(".mCSB_dragger")];
                "x" !== i.axis &&
                    (n.overflowed[0] && !t
                        ? (s[0].add(c[0]).add(s[0].children("a")).css("display", "block"), l.removeClass(d[8] + " " + d[10]))
                        : (i.alwaysShowScrollbar ? (2 !== i.alwaysShowScrollbar && c[0].css("display", "none"), l.removeClass(d[10])) : (s[0].css("display", "none"), l.addClass(d[10])), l.addClass(d[8]))),
                    "y" !== i.axis &&
                        (n.overflowed[1] && !t
                            ? (s[1].add(c[1]).add(s[1].children("a")).css("display", "block"), l.removeClass(d[9] + " " + d[11]))
                            : (i.alwaysShowScrollbar ? (2 !== i.alwaysShowScrollbar && c[1].css("display", "none"), l.removeClass(d[11])) : (s[1].css("display", "none"), l.addClass(d[11])), l.addClass(d[9]))),
                    n.overflowed[0] || n.overflowed[1] ? o.removeClass(d[5]) : o.addClass(d[5]);
            },
            O = function (t) {
                var o = t.type,
                    a = t.target.ownerDocument !== document && null !== frameElement ? [e(frameElement).offset().top, e(frameElement).offset().left] : null,
                    n = A() && t.target.ownerDocument !== top.document && null !== frameElement ? [e(t.view.frameElement).offset().top, e(t.view.frameElement).offset().left] : [0, 0];
                switch (o) {
                    case "pointerdown":
                    case "MSPointerDown":
                    case "pointermove":
                    case "MSPointerMove":
                    case "pointerup":
                    case "MSPointerUp":
                        return a ? [t.originalEvent.pageY - a[0] + n[0], t.originalEvent.pageX - a[1] + n[1], !1] : [t.originalEvent.pageY, t.originalEvent.pageX, !1];
                    case "touchstart":
                    case "touchmove":
                    case "touchend":
                        var i = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0],
                            r = t.originalEvent.touches.length || t.originalEvent.changedTouches.length;
                        return t.target.ownerDocument !== document ? [i.screenY, i.screenX, r > 1] : [i.pageY, i.pageX, r > 1];
                    default:
                        return a ? [t.pageY - a[0] + n[0], t.pageX - a[1] + n[1], !1] : [t.pageY, t.pageX, !1];
                }
            },
            I = function () {
                function t(e, t, a, n) {
                    if (((h[0].idleTimer = d.scrollInertia < 233 ? 250 : 0), o.attr("id") === f[1]))
                        var i = "x",
                            s = (o[0].offsetLeft - t + n) * l.scrollRatio.x;
                    else
                        var i = "y",
                            s = (o[0].offsetTop - e + a) * l.scrollRatio.y;
                    G(r, s.toString(), { dir: i, drag: !0 });
                }
                var o,
                    n,
                    i,
                    r = e(this),
                    l = r.data(a),
                    d = l.opt,
                    u = a + "_" + l.idx,
                    f = ["mCSB_" + l.idx + "_dragger_vertical", "mCSB_" + l.idx + "_dragger_horizontal"],
                    h = e("#mCSB_" + l.idx + "_container"),
                    m = e("#" + f[0] + ",#" + f[1]),
                    p = d.advanced.releaseDraggableSelectors ? m.add(e(d.advanced.releaseDraggableSelectors)) : m,
                    g = d.advanced.extraDraggableSelectors ? e(!A() || top.document).add(e(d.advanced.extraDraggableSelectors)) : e(!A() || top.document);
                m
                    .bind("contextmenu." + u, function (e) {
                        e.preventDefault();
                    })
                    .bind("mousedown." + u + " touchstart." + u + " pointerdown." + u + " MSPointerDown." + u, function (t) {
                        if ((t.stopImmediatePropagation(), t.preventDefault(), ee(t))) {
                            (c = !0),
                                s &&
                                    (document.onselectstart = function () {
                                        return !1;
                                    }),
                                L.call(h, !1),
                                Q(r),
                                (o = e(this));
                            var a = o.offset(),
                                l = O(t)[0] - a.top,
                                u = O(t)[1] - a.left,
                                f = o.height() + a.top,
                                m = o.width() + a.left;
                            f > l && l > 0 && m > u && u > 0 && ((n = l), (i = u)), C(o, "active", d.autoExpandScrollbar);
                        }
                    })
                    .bind("touchmove." + u, function (e) {
                        e.stopImmediatePropagation(), e.preventDefault();
                        var a = o.offset(),
                            r = O(e)[0] - a.top,
                            l = O(e)[1] - a.left;
                        t(n, i, r, l);
                    }),
                    e(document)
                        .add(g)
                        .bind("mousemove." + u + " pointermove." + u + " MSPointerMove." + u, function (e) {
                            if (o) {
                                var a = o.offset(),
                                    r = O(e)[0] - a.top,
                                    l = O(e)[1] - a.left;
                                if (n === r && i === l) return;
                                t(n, i, r, l);
                            }
                        })
                        .add(p)
                        .bind("mouseup." + u + " touchend." + u + " pointerup." + u + " MSPointerUp." + u, function () {
                            o && (C(o, "active", d.autoExpandScrollbar), (o = null)), (c = !1), s && (document.onselectstart = null), L.call(h, !0);
                        });
            },
            D = function () {
                function o(e) {
                    if (!te(e) || c || O(e)[2]) return void (t = 0);
                    (t = 1), (b = 0), (C = 0), (d = 1), y.removeClass("mCS_touch_action");
                    var o = I.offset();
                    (u = O(e)[0] - o.top), (f = O(e)[1] - o.left), (z = [O(e)[0], O(e)[1]]);
                }
                function n(e) {
                    if (te(e) && !c && !O(e)[2] && (T.documentTouchScroll || e.preventDefault(), e.stopImmediatePropagation(), (!C || b) && d)) {
                        g = K();
                        var t = M.offset(),
                            o = O(e)[0] - t.top,
                            a = O(e)[1] - t.left,
                            n = "mcsLinearOut";
                        if ((E.push(o), W.push(a), (z[2] = Math.abs(O(e)[0] - z[0])), (z[3] = Math.abs(O(e)[1] - z[1])), B.overflowed[0]))
                            var i = D[0].parent().height() - D[0].height(),
                                r = u - o > 0 && o - u > -(i * B.scrollRatio.y) && (2 * z[3] < z[2] || "yx" === T.axis);
                        if (B.overflowed[1])
                            var l = D[1].parent().width() - D[1].width(),
                                h = f - a > 0 && a - f > -(l * B.scrollRatio.x) && (2 * z[2] < z[3] || "yx" === T.axis);
                        r || h ? (U || e.preventDefault(), (b = 1)) : ((C = 1), y.addClass("mCS_touch_action")),
                            U && e.preventDefault(),
                            (w = "yx" === T.axis ? [u - o, f - a] : "x" === T.axis ? [null, f - a] : [u - o, null]),
                            (I[0].idleTimer = 250),
                            B.overflowed[0] && s(w[0], R, n, "y", "all", !0),
                            B.overflowed[1] && s(w[1], R, n, "x", L, !0);
                    }
                }
                function i(e) {
                    if (!te(e) || c || O(e)[2]) return void (t = 0);
                    (t = 1), e.stopImmediatePropagation(), Q(y), (p = K());
                    var o = M.offset();
                    (h = O(e)[0] - o.top), (m = O(e)[1] - o.left), (E = []), (W = []);
                }
                function r(e) {
                    if (te(e) && !c && !O(e)[2]) {
                        (d = 0), e.stopImmediatePropagation(), (b = 0), (C = 0), (v = K());
                        var t = M.offset(),
                            o = O(e)[0] - t.top,
                            a = O(e)[1] - t.left;
                        if (!(v - g > 30)) {
                            _ = 1e3 / (v - p);
                            var n = "mcsEaseOut",
                                i = 2.5 > _,
                                r = i ? [E[E.length - 2], W[W.length - 2]] : [0, 0];
                            x = i ? [o - r[0], a - r[1]] : [o - h, a - m];
                            var u = [Math.abs(x[0]), Math.abs(x[1])];
                            _ = i ? [Math.abs(x[0] / 4), Math.abs(x[1] / 4)] : [_, _];
                            var f = [Math.abs(I[0].offsetTop) - x[0] * l(u[0] / _[0], _[0]), Math.abs(I[0].offsetLeft) - x[1] * l(u[1] / _[1], _[1])];
                            (w = "yx" === T.axis ? [f[0], f[1]] : "x" === T.axis ? [null, f[1]] : [f[0], null]), (S = [4 * u[0] + T.scrollInertia, 4 * u[1] + T.scrollInertia]);
                            var y = parseInt(T.contentTouchScroll) || 0;
                            (w[0] = u[0] > y ? w[0] : 0), (w[1] = u[1] > y ? w[1] : 0), B.overflowed[0] && s(w[0], S[0], n, "y", L, !1), B.overflowed[1] && s(w[1], S[1], n, "x", L, !1);
                        }
                    }
                }
                function l(e, t) {
                    var o = [1.5 * t, 2 * t, t / 1.5, t / 2];
                    return e > 90 ? (t > 4 ? o[0] : o[3]) : e > 60 ? (t > 3 ? o[3] : o[2]) : e > 30 ? (t > 8 ? o[1] : t > 6 ? o[0] : t > 4 ? t : o[2]) : t > 8 ? t : o[3];
                }
                function s(e, t, o, a, n, i) {
                    e && G(y, e.toString(), { dur: t, scrollEasing: o, dir: a, overwrite: n, drag: i });
                }
                var d,
                    u,
                    f,
                    h,
                    m,
                    p,
                    g,
                    v,
                    x,
                    _,
                    w,
                    S,
                    b,
                    C,
                    y = e(this),
                    B = y.data(a),
                    T = B.opt,
                    k = a + "_" + B.idx,
                    M = e("#mCSB_" + B.idx),
                    I = e("#mCSB_" + B.idx + "_container"),
                    D = [e("#mCSB_" + B.idx + "_dragger_vertical"), e("#mCSB_" + B.idx + "_dragger_horizontal")],
                    E = [],
                    W = [],
                    R = 0,
                    L = "yx" === T.axis ? "none" : "all",
                    z = [],
                    P = I.find("iframe"),
                    H = ["touchstart." + k + " pointerdown." + k + " MSPointerDown." + k, "touchmove." + k + " pointermove." + k + " MSPointerMove." + k, "touchend." + k + " pointerup." + k + " MSPointerUp." + k],
                    U = void 0 !== document.body.style.touchAction && "" !== document.body.style.touchAction;
                I.bind(H[0], function (e) {
                    o(e);
                }).bind(H[1], function (e) {
                    n(e);
                }),
                    M.bind(H[0], function (e) {
                        i(e);
                    }).bind(H[2], function (e) {
                        r(e);
                    }),
                    P.length &&
                        P.each(function () {
                            e(this).bind("load", function () {
                                A(this) &&
                                    e(this.contentDocument || this.contentWindow.document)
                                        .bind(H[0], function (e) {
                                            o(e), i(e);
                                        })
                                        .bind(H[1], function (e) {
                                            n(e);
                                        })
                                        .bind(H[2], function (e) {
                                            r(e);
                                        });
                            });
                        });
            },
            E = function () {
                function o() {
                    return window.getSelection ? window.getSelection().toString() : document.selection && "Control" != document.selection.type ? document.selection.createRange().text : 0;
                }
                function n(e, t, o) {
                    (d.type = o && i ? "stepped" : "stepless"), (d.scrollAmount = 10), j(r, e, t, "mcsLinearOut", o ? 60 : null);
                }
                var i,
                    r = e(this),
                    l = r.data(a),
                    s = l.opt,
                    d = l.sequential,
                    u = a + "_" + l.idx,
                    f = e("#mCSB_" + l.idx + "_container"),
                    h = f.parent();
                f.bind("mousedown." + u, function () {
                    t || i || ((i = 1), (c = !0));
                })
                    .add(document)
                    .bind("mousemove." + u, function (e) {
                        if (!t && i && o()) {
                            var a = f.offset(),
                                r = O(e)[0] - a.top + f[0].offsetTop,
                                c = O(e)[1] - a.left + f[0].offsetLeft;
                            r > 0 && r < h.height() && c > 0 && c < h.width()
                                ? d.step && n("off", null, "stepped")
                                : ("x" !== s.axis && l.overflowed[0] && (0 > r ? n("on", 38) : r > h.height() && n("on", 40)), "y" !== s.axis && l.overflowed[1] && (0 > c ? n("on", 37) : c > h.width() && n("on", 39)));
                        }
                    })
                    .bind("mouseup." + u + " dragend." + u, function () {
                        t || (i && ((i = 0), n("off", null)), (c = !1));
                    });
            },
            W = function () {
                function t(t, a) {
                    if ((Q(o), !z(o, t.target))) {
                        var r = "auto" !== i.mouseWheel.deltaFactor ? parseInt(i.mouseWheel.deltaFactor) : s && t.deltaFactor < 100 ? 100 : t.deltaFactor || 100,
                            d = i.scrollInertia;
                        if ("x" === i.axis || "x" === i.mouseWheel.axis)
                            var u = "x",
                                f = [Math.round(r * n.scrollRatio.x), parseInt(i.mouseWheel.scrollAmount)],
                                h = "auto" !== i.mouseWheel.scrollAmount ? f[1] : f[0] >= l.width() ? 0.9 * l.width() : f[0],
                                m = Math.abs(e("#mCSB_" + n.idx + "_container")[0].offsetLeft),
                                p = c[1][0].offsetLeft,
                                g = c[1].parent().width() - c[1].width(),
                                v = "y" === i.mouseWheel.axis ? t.deltaY || a : t.deltaX;
                        else
                            var u = "y",
                                f = [Math.round(r * n.scrollRatio.y), parseInt(i.mouseWheel.scrollAmount)],
                                h = "auto" !== i.mouseWheel.scrollAmount ? f[1] : f[0] >= l.height() ? 0.9 * l.height() : f[0],
                                m = Math.abs(e("#mCSB_" + n.idx + "_container")[0].offsetTop),
                                p = c[0][0].offsetTop,
                                g = c[0].parent().height() - c[0].height(),
                                v = t.deltaY || a;
                        ("y" === u && !n.overflowed[0]) ||
                            ("x" === u && !n.overflowed[1]) ||
                            ((i.mouseWheel.invert || t.webkitDirectionInvertedFromDevice) && (v = -v),
                            i.mouseWheel.normalizeDelta && (v = 0 > v ? -1 : 1),
                            ((v > 0 && 0 !== p) || (0 > v && p !== g) || i.mouseWheel.preventDefault) && (t.stopImmediatePropagation(), t.preventDefault()),
                            t.deltaFactor < 5 && !i.mouseWheel.normalizeDelta && ((h = t.deltaFactor), (d = 17)),
                            G(o, (m - v * h).toString(), { dir: u, dur: d }));
                    }
                }
                if (e(this).data(a)) {
                    var o = e(this),
                        n = o.data(a),
                        i = n.opt,
                        r = a + "_" + n.idx,
                        l = e("#mCSB_" + n.idx),
                        c = [e("#mCSB_" + n.idx + "_dragger_vertical"), e("#mCSB_" + n.idx + "_dragger_horizontal")],
                        d = e("#mCSB_" + n.idx + "_container").find("iframe");
                    d.length &&
                        d.each(function () {
                            e(this).bind("load", function () {
                                A(this) &&
                                    e(this.contentDocument || this.contentWindow.document).bind("mousewheel." + r, function (e, o) {
                                        t(e, o);
                                    });
                            });
                        }),
                        l.bind("mousewheel." + r, function (e, o) {
                            t(e, o);
                        });
                }
            },
            R = new Object(),
            A = function (t) {
                var o = !1,
                    a = !1,
                    n = null;
                if ((void 0 === t ? (a = "#empty") : void 0 !== e(t).attr("id") && (a = e(t).attr("id")), a !== !1 && void 0 !== R[a])) return R[a];
                if (t) {
                    try {
                        var i = t.contentDocument || t.contentWindow.document;
                        n = i.body.innerHTML;
                    } catch (r) {}
                    o = null !== n;
                } else {
                    try {
                        var i = top.document;
                        n = i.body.innerHTML;
                    } catch (r) {}
                    o = null !== n;
                }
                return a !== !1 && (R[a] = o), o;
            },
            L = function (e) {
                var t = this.find("iframe");
                if (t.length) {
                    var o = e ? "auto" : "none";
                    t.css("pointer-events", o);
                }
            },
            z = function (t, o) {
                var n = o.nodeName.toLowerCase(),
                    i = t.data(a).opt.mouseWheel.disableOver,
                    r = ["select", "textarea"];
                return e.inArray(n, i) > -1 && !(e.inArray(n, r) > -1 && !e(o).is(":focus"));
            },
            P = function () {
                var t,
                    o = e(this),
                    n = o.data(a),
                    i = a + "_" + n.idx,
                    r = e("#mCSB_" + n.idx + "_container"),
                    l = r.parent(),
                    s = e(".mCSB_" + n.idx + "_scrollbar ." + d[12]);
                s.bind("mousedown." + i + " touchstart." + i + " pointerdown." + i + " MSPointerDown." + i, function (o) {
                    (c = !0), e(o.target).hasClass("mCSB_dragger") || (t = 1);
                })
                    .bind("touchend." + i + " pointerup." + i + " MSPointerUp." + i, function () {
                        c = !1;
                    })
                    .bind("click." + i, function (a) {
                        if (t && ((t = 0), e(a.target).hasClass(d[12]) || e(a.target).hasClass("mCSB_draggerRail"))) {
                            Q(o);
                            var i = e(this),
                                s = i.find(".mCSB_dragger");
                            if (i.parent(".mCSB_scrollTools_horizontal").length > 0) {
                                if (!n.overflowed[1]) return;
                                var c = "x",
                                    u = a.pageX > s.offset().left ? -1 : 1,
                                    f = Math.abs(r[0].offsetLeft) - u * (0.9 * l.width());
                            } else {
                                if (!n.overflowed[0]) return;
                                var c = "y",
                                    u = a.pageY > s.offset().top ? -1 : 1,
                                    f = Math.abs(r[0].offsetTop) - u * (0.9 * l.height());
                            }
                            G(o, f.toString(), { dir: c, scrollEasing: "mcsEaseInOut" });
                        }
                    });
            },
            H = function () {
                var t = e(this),
                    o = t.data(a),
                    n = o.opt,
                    i = a + "_" + o.idx,
                    r = e("#mCSB_" + o.idx + "_container"),
                    l = r.parent();
                r.bind("focusin." + i, function () {
                    var o = e(document.activeElement),
                        a = r.find(".mCustomScrollBox").length,
                        i = 0;
                    o.is(n.advanced.autoScrollOnFocus) &&
                        (Q(t),
                        clearTimeout(t[0]._focusTimeout),
                        (t[0]._focusTimer = a ? (i + 17) * a : 0),
                        (t[0]._focusTimeout = setTimeout(function () {
                            var e = [ae(o)[0], ae(o)[1]],
                                a = [r[0].offsetTop, r[0].offsetLeft],
                                s = [a[0] + e[0] >= 0 && a[0] + e[0] < l.height() - o.outerHeight(!1), a[1] + e[1] >= 0 && a[0] + e[1] < l.width() - o.outerWidth(!1)],
                                c = "yx" !== n.axis || s[0] || s[1] ? "all" : "none";
                            "x" === n.axis || s[0] || G(t, e[0].toString(), { dir: "y", scrollEasing: "mcsEaseInOut", overwrite: c, dur: i }),
                                "y" === n.axis || s[1] || G(t, e[1].toString(), { dir: "x", scrollEasing: "mcsEaseInOut", overwrite: c, dur: i });
                        }, t[0]._focusTimer)));
                });
            },
            U = function () {
                var t = e(this),
                    o = t.data(a),
                    n = a + "_" + o.idx,
                    i = e("#mCSB_" + o.idx + "_container").parent();
                i.bind("scroll." + n, function () {
                    (0 === i.scrollTop() && 0 === i.scrollLeft()) || e(".mCSB_" + o.idx + "_scrollbar").css("visibility", "hidden");
                });
            },
            F = function () {
                var t = e(this),
                    o = t.data(a),
                    n = o.opt,
                    i = o.sequential,
                    r = a + "_" + o.idx,
                    l = ".mCSB_" + o.idx + "_scrollbar",
                    s = e(l + ">a");
                s.bind("contextmenu." + r, function (e) {
                    e.preventDefault();
                }).bind(
                    "mousedown." +
                        r +
                        " touchstart." +
                        r +
                        " pointerdown." +
                        r +
                        " MSPointerDown." +
                        r +
                        " mouseup." +
                        r +
                        " touchend." +
                        r +
                        " pointerup." +
                        r +
                        " MSPointerUp." +
                        r +
                        " mouseout." +
                        r +
                        " pointerout." +
                        r +
                        " MSPointerOut." +
                        r +
                        " click." +
                        r,
                    function (a) {
                        function r(e, o) {
                            (i.scrollAmount = n.scrollButtons.scrollAmount), j(t, e, o);
                        }
                        if ((a.preventDefault(), ee(a))) {
                            var l = e(this).attr("class");
                            switch (((i.type = n.scrollButtons.scrollType), a.type)) {
                                case "mousedown":
                                case "touchstart":
                                case "pointerdown":
                                case "MSPointerDown":
                                    if ("stepped" === i.type) return;
                                    (c = !0), (o.tweenRunning = !1), r("on", l);
                                    break;
                                case "mouseup":
                                case "touchend":
                                case "pointerup":
                                case "MSPointerUp":
                                case "mouseout":
                                case "pointerout":
                                case "MSPointerOut":
                                    if ("stepped" === i.type) return;
                                    (c = !1), i.dir && r("off", l);
                                    break;
                                case "click":
                                    if ("stepped" !== i.type || o.tweenRunning) return;
                                    r("on", l);
                            }
                        }
                    }
                );
            },
            q = function () {
                function t(t) {
                    function a(e, t) {
                        (r.type = i.keyboard.scrollType), (r.scrollAmount = i.keyboard.scrollAmount), ("stepped" === r.type && n.tweenRunning) || j(o, e, t);
                    }
                    switch (t.type) {
                        case "blur":
                            n.tweenRunning && r.dir && a("off", null);
                            break;
                        case "keydown":
                        case "keyup":
                            var l = t.keyCode ? t.keyCode : t.which,
                                s = "on";
                            if (("x" !== i.axis && (38 === l || 40 === l)) || ("y" !== i.axis && (37 === l || 39 === l))) {
                                if (((38 === l || 40 === l) && !n.overflowed[0]) || ((37 === l || 39 === l) && !n.overflowed[1])) return;
                                "keyup" === t.type && (s = "off"), e(document.activeElement).is(u) || (t.preventDefault(), t.stopImmediatePropagation(), a(s, l));
                            } else if (33 === l || 34 === l) {
                                if (((n.overflowed[0] || n.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()), "keyup" === t.type)) {
                                    Q(o);
                                    var f = 34 === l ? -1 : 1;
                                    if ("x" === i.axis || ("yx" === i.axis && n.overflowed[1] && !n.overflowed[0]))
                                        var h = "x",
                                            m = Math.abs(c[0].offsetLeft) - f * (0.9 * d.width());
                                    else
                                        var h = "y",
                                            m = Math.abs(c[0].offsetTop) - f * (0.9 * d.height());
                                    G(o, m.toString(), { dir: h, scrollEasing: "mcsEaseInOut" });
                                }
                            } else if ((35 === l || 36 === l) && !e(document.activeElement).is(u) && ((n.overflowed[0] || n.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()), "keyup" === t.type)) {
                                if ("x" === i.axis || ("yx" === i.axis && n.overflowed[1] && !n.overflowed[0]))
                                    var h = "x",
                                        m = 35 === l ? Math.abs(d.width() - c.outerWidth(!1)) : 0;
                                else
                                    var h = "y",
                                        m = 35 === l ? Math.abs(d.height() - c.outerHeight(!1)) : 0;
                                G(o, m.toString(), { dir: h, scrollEasing: "mcsEaseInOut" });
                            }
                    }
                }
                var o = e(this),
                    n = o.data(a),
                    i = n.opt,
                    r = n.sequential,
                    l = a + "_" + n.idx,
                    s = e("#mCSB_" + n.idx),
                    c = e("#mCSB_" + n.idx + "_container"),
                    d = c.parent(),
                    u = "input,textarea,select,datalist,keygen,[contenteditable='true']",
                    f = c.find("iframe"),
                    h = ["blur." + l + " keydown." + l + " keyup." + l];
                f.length &&
                    f.each(function () {
                        e(this).bind("load", function () {
                            A(this) &&
                                e(this.contentDocument || this.contentWindow.document).bind(h[0], function (e) {
                                    t(e);
                                });
                        });
                    }),
                    s.attr("tabindex", "0").bind(h[0], function (e) {
                        t(e);
                    });
            },
            j = function (t, o, n, i, r) {
                function l(e) {
                    u.snapAmount && (f.scrollAmount = u.snapAmount instanceof Array ? ("x" === f.dir[0] ? u.snapAmount[1] : u.snapAmount[0]) : u.snapAmount);
                    var o = "stepped" !== f.type,
                        a = r ? r : e ? (o ? p / 1.5 : g) : 1e3 / 60,
                        n = e ? (o ? 7.5 : 40) : 2.5,
                        s = [Math.abs(h[0].offsetTop), Math.abs(h[0].offsetLeft)],
                        d = [c.scrollRatio.y > 10 ? 10 : c.scrollRatio.y, c.scrollRatio.x > 10 ? 10 : c.scrollRatio.x],
                        m = "x" === f.dir[0] ? s[1] + f.dir[1] * (d[1] * n) : s[0] + f.dir[1] * (d[0] * n),
                        v = "x" === f.dir[0] ? s[1] + f.dir[1] * parseInt(f.scrollAmount) : s[0] + f.dir[1] * parseInt(f.scrollAmount),
                        x = "auto" !== f.scrollAmount ? v : m,
                        _ = i ? i : e ? (o ? "mcsLinearOut" : "mcsEaseInOut") : "mcsLinear",
                        w = !!e;
                    return (
                        e && 17 > a && (x = "x" === f.dir[0] ? s[1] : s[0]),
                        G(t, x.toString(), { dir: f.dir[0], scrollEasing: _, dur: a, onComplete: w }),
                        e
                            ? void (f.dir = !1)
                            : (clearTimeout(f.step),
                              void (f.step = setTimeout(function () {
                                  l();
                              }, a)))
                    );
                }
                function s() {
                    clearTimeout(f.step), $(f, "step"), Q(t);
                }
                var c = t.data(a),
                    u = c.opt,
                    f = c.sequential,
                    h = e("#mCSB_" + c.idx + "_container"),
                    m = "stepped" === f.type,
                    p = u.scrollInertia < 26 ? 26 : u.scrollInertia,
                    g = u.scrollInertia < 1 ? 17 : u.scrollInertia;
                switch (o) {
                    case "on":
                        if (((f.dir = [n === d[16] || n === d[15] || 39 === n || 37 === n ? "x" : "y", n === d[13] || n === d[15] || 38 === n || 37 === n ? -1 : 1]), Q(t), oe(n) && "stepped" === f.type)) return;
                        l(m);
                        break;
                    case "off":
                        s(), (m || (c.tweenRunning && f.dir)) && l(!0);
                }
            },
            Y = function (t) {
                var o = e(this).data(a).opt,
                    n = [];
                return (
                    "function" == typeof t && (t = t()),
                    t instanceof Array ? (n = t.length > 1 ? [t[0], t[1]] : "x" === o.axis ? [null, t[0]] : [t[0], null]) : ((n[0] = t.y ? t.y : t.x || "x" === o.axis ? null : t), (n[1] = t.x ? t.x : t.y || "y" === o.axis ? null : t)),
                    "function" == typeof n[0] && (n[0] = n[0]()),
                    "function" == typeof n[1] && (n[1] = n[1]()),
                    n
                );
            },
            X = function (t, o) {
                if (null != t && "undefined" != typeof t) {
                    var n = e(this),
                        i = n.data(a),
                        r = i.opt,
                        l = e("#mCSB_" + i.idx + "_container"),
                        s = l.parent(),
                        c = typeof t;
                    o || (o = "x" === r.axis ? "x" : "y");
                    var d = "x" === o ? l.outerWidth(!1) - s.width() : l.outerHeight(!1) - s.height(),
                        f = "x" === o ? l[0].offsetLeft : l[0].offsetTop,
                        h = "x" === o ? "left" : "top";
                    switch (c) {
                        case "function":
                            return t();
                        case "object":
                            var m = t.jquery ? t : e(t);
                            if (!m.length) return;
                            return "x" === o ? ae(m)[1] : ae(m)[0];
                        case "string":
                        case "number":
                            if (oe(t)) return Math.abs(t);
                            if (-1 !== t.indexOf("%")) return Math.abs((d * parseInt(t)) / 100);
                            if (-1 !== t.indexOf("-=")) return Math.abs(f - parseInt(t.split("-=")[1]));
                            if (-1 !== t.indexOf("+=")) {
                                var p = f + parseInt(t.split("+=")[1]);
                                return p >= 0 ? 0 : Math.abs(p);
                            }
                            if (-1 !== t.indexOf("px") && oe(t.split("px")[0])) return Math.abs(t.split("px")[0]);
                            if ("top" === t || "left" === t) return 0;
                            if ("bottom" === t) return Math.abs(s.height() - l.outerHeight(!1));
                            if ("right" === t) return Math.abs(s.width() - l.outerWidth(!1));
                            if ("first" === t || "last" === t) {
                                var m = l.find(":" + t);
                                return "x" === o ? ae(m)[1] : ae(m)[0];
                            }
                            return e(t).length ? ("x" === o ? ae(e(t))[1] : ae(e(t))[0]) : (l.css(h, t), void u.update.call(null, n[0]));
                    }
                }
            },
            N = function (t) {
                function o() {
                    return (
                        clearTimeout(f[0].autoUpdate),
                        0 === l.parents("html").length
                            ? void (l = null)
                            : void (f[0].autoUpdate = setTimeout(function () {
                                  return c.advanced.updateOnSelectorChange && ((s.poll.change.n = i()), s.poll.change.n !== s.poll.change.o)
                                      ? ((s.poll.change.o = s.poll.change.n), void r(3))
                                      : c.advanced.updateOnContentResize && ((s.poll.size.n = l[0].scrollHeight + l[0].scrollWidth + f[0].offsetHeight + l[0].offsetHeight + l[0].offsetWidth), s.poll.size.n !== s.poll.size.o)
                                      ? ((s.poll.size.o = s.poll.size.n), void r(1))
                                      : !c.advanced.updateOnImageLoad || ("auto" === c.advanced.updateOnImageLoad && "y" === c.axis) || ((s.poll.img.n = f.find("img").length), s.poll.img.n === s.poll.img.o)
                                      ? void ((c.advanced.updateOnSelectorChange || c.advanced.updateOnContentResize || c.advanced.updateOnImageLoad) && o())
                                      : ((s.poll.img.o = s.poll.img.n),
                                        void f.find("img").each(function () {
                                            n(this);
                                        }));
                              }, c.advanced.autoUpdateTimeout))
                    );
                }
                function n(t) {
                    function o(e, t) {
                        return function () {
                            return t.apply(e, arguments);
                        };
                    }
                    function a() {
                        (this.onload = null), e(t).addClass(d[2]), r(2);
                    }
                    if (e(t).hasClass(d[2])) return void r();
                    var n = new Image();
                    (n.onload = o(n, a)), (n.src = t.src);
                }
                function i() {
                    c.advanced.updateOnSelectorChange === !0 && (c.advanced.updateOnSelectorChange = "*");
                    var e = 0,
                        t = f.find(c.advanced.updateOnSelectorChange);
                    return (
                        c.advanced.updateOnSelectorChange &&
                            t.length > 0 &&
                            t.each(function () {
                                e += this.offsetHeight + this.offsetWidth;
                            }),
                        e
                    );
                }
                function r(e) {
                    clearTimeout(f[0].autoUpdate), u.update.call(null, l[0], e);
                }
                var l = e(this),
                    s = l.data(a),
                    c = s.opt,
                    f = e("#mCSB_" + s.idx + "_container");
                return t ? (clearTimeout(f[0].autoUpdate), void $(f[0], "autoUpdate")) : void o();
            },
            V = function (e, t, o) {
                return Math.round(e / t) * t - o;
            },
            Q = function (t) {
                var o = t.data(a),
                    n = e("#mCSB_" + o.idx + "_container,#mCSB_" + o.idx + "_container_wrapper,#mCSB_" + o.idx + "_dragger_vertical,#mCSB_" + o.idx + "_dragger_horizontal");
                n.each(function () {
                    Z.call(this);
                });
            },
            G = function (t, o, n) {
                function i(e) {
                    return s && c.callbacks[e] && "function" == typeof c.callbacks[e];
                }
                function r() {
                    return [c.callbacks.alwaysTriggerOffsets || w >= S[0] + y, c.callbacks.alwaysTriggerOffsets || -B >= w];
                }
                function l() {
                    var e = [h[0].offsetTop, h[0].offsetLeft],
                        o = [x[0].offsetTop, x[0].offsetLeft],
                        a = [h.outerHeight(!1), h.outerWidth(!1)],
                        i = [f.height(), f.width()];
                    t[0].mcs = {
                        content: h,
                        top: e[0],
                        left: e[1],
                        draggerTop: o[0],
                        draggerLeft: o[1],
                        topPct: Math.round((100 * Math.abs(e[0])) / (Math.abs(a[0]) - i[0])),
                        leftPct: Math.round((100 * Math.abs(e[1])) / (Math.abs(a[1]) - i[1])),
                        direction: n.dir,
                    };
                }
                var s = t.data(a),
                    c = s.opt,
                    d = { trigger: "internal", dir: "y", scrollEasing: "mcsEaseOut", drag: !1, dur: c.scrollInertia, overwrite: "all", callbacks: !0, onStart: !0, onUpdate: !0, onComplete: !0 },
                    n = e.extend(d, n),
                    u = [n.dur, n.drag ? 0 : n.dur],
                    f = e("#mCSB_" + s.idx),
                    h = e("#mCSB_" + s.idx + "_container"),
                    m = h.parent(),
                    p = c.callbacks.onTotalScrollOffset ? Y.call(t, c.callbacks.onTotalScrollOffset) : [0, 0],
                    g = c.callbacks.onTotalScrollBackOffset ? Y.call(t, c.callbacks.onTotalScrollBackOffset) : [0, 0];
                if (
                    ((s.trigger = n.trigger),
                    (0 === m.scrollTop() && 0 === m.scrollLeft()) || (e(".mCSB_" + s.idx + "_scrollbar").css("visibility", "visible"), m.scrollTop(0).scrollLeft(0)),
                    "_resetY" !== o || s.contentReset.y || (i("onOverflowYNone") && c.callbacks.onOverflowYNone.call(t[0]), (s.contentReset.y = 1)),
                    "_resetX" !== o || s.contentReset.x || (i("onOverflowXNone") && c.callbacks.onOverflowXNone.call(t[0]), (s.contentReset.x = 1)),
                    "_resetY" !== o && "_resetX" !== o)
                ) {
                    if (
                        ((!s.contentReset.y && t[0].mcs) || !s.overflowed[0] || (i("onOverflowY") && c.callbacks.onOverflowY.call(t[0]), (s.contentReset.x = null)),
                        (!s.contentReset.x && t[0].mcs) || !s.overflowed[1] || (i("onOverflowX") && c.callbacks.onOverflowX.call(t[0]), (s.contentReset.x = null)),
                        c.snapAmount)
                    ) {
                        var v = c.snapAmount instanceof Array ? ("x" === n.dir ? c.snapAmount[1] : c.snapAmount[0]) : c.snapAmount;
                        o = V(o, v, c.snapOffset);
                    }
                    switch (n.dir) {
                        case "x":
                            var x = e("#mCSB_" + s.idx + "_dragger_horizontal"),
                                _ = "left",
                                w = h[0].offsetLeft,
                                S = [f.width() - h.outerWidth(!1), x.parent().width() - x.width()],
                                b = [o, 0 === o ? 0 : o / s.scrollRatio.x],
                                y = p[1],
                                B = g[1],
                                T = y > 0 ? y / s.scrollRatio.x : 0,
                                k = B > 0 ? B / s.scrollRatio.x : 0;
                            break;
                        case "y":
                            var x = e("#mCSB_" + s.idx + "_dragger_vertical"),
                                _ = "top",
                                w = h[0].offsetTop,
                                S = [f.height() - h.outerHeight(!1), x.parent().height() - x.height()],
                                b = [o, 0 === o ? 0 : o / s.scrollRatio.y],
                                y = p[0],
                                B = g[0],
                                T = y > 0 ? y / s.scrollRatio.y : 0,
                                k = B > 0 ? B / s.scrollRatio.y : 0;
                    }
                    b[1] < 0 || (0 === b[0] && 0 === b[1]) ? (b = [0, 0]) : b[1] >= S[1] ? (b = [S[0], S[1]]) : (b[0] = -b[0]),
                        t[0].mcs || (l(), i("onInit") && c.callbacks.onInit.call(t[0])),
                        clearTimeout(h[0].onCompleteTimeout),
                        J(x[0], _, Math.round(b[1]), u[1], n.scrollEasing),
                        (!s.tweenRunning && ((0 === w && b[0] >= 0) || (w === S[0] && b[0] <= S[0]))) ||
                            J(h[0], _, Math.round(b[0]), u[0], n.scrollEasing, n.overwrite, {
                                onStart: function () {
                                    n.callbacks && n.onStart && !s.tweenRunning && (i("onScrollStart") && (l(), c.callbacks.onScrollStart.call(t[0])), (s.tweenRunning = !0), C(x), (s.cbOffsets = r()));
                                },
                                onUpdate: function () {
                                    n.callbacks && n.onUpdate && i("whileScrolling") && (l(), c.callbacks.whileScrolling.call(t[0]));
                                },
                                onComplete: function () {
                                    if (n.callbacks && n.onComplete) {
                                        "yx" === c.axis && clearTimeout(h[0].onCompleteTimeout);
                                        var e = h[0].idleTimer || 0;
                                        h[0].onCompleteTimeout = setTimeout(function () {
                                            i("onScroll") && (l(), c.callbacks.onScroll.call(t[0])),
                                                i("onTotalScroll") && b[1] >= S[1] - T && s.cbOffsets[0] && (l(), c.callbacks.onTotalScroll.call(t[0])),
                                                i("onTotalScrollBack") && b[1] <= k && s.cbOffsets[1] && (l(), c.callbacks.onTotalScrollBack.call(t[0])),
                                                (s.tweenRunning = !1),
                                                (h[0].idleTimer = 0),
                                                C(x, "hide");
                                        }, e);
                                    }
                                },
                            });
                }
            },
            J = function (e, t, o, a, n, i, r) {
                function l() {
                    S.stop || (x || m.call(), (x = K() - v), s(), x >= S.time && ((S.time = x > S.time ? x + f - (x - S.time) : x + f - 1), S.time < x + 1 && (S.time = x + 1)), S.time < a ? (S.id = h(l)) : g.call());
                }
                function s() {
                    a > 0 ? ((S.currVal = u(S.time, _, b, a, n)), (w[t] = Math.round(S.currVal) + "px")) : (w[t] = o + "px"), p.call();
                }
                function c() {
                    (f = 1e3 / 60),
                        (S.time = x + f),
                        (h = window.requestAnimationFrame
                            ? window.requestAnimationFrame
                            : function (e) {
                                  return s(), setTimeout(e, 0.01);
                              }),
                        (S.id = h(l));
                }
                function d() {
                    null != S.id && (window.requestAnimationFrame ? window.cancelAnimationFrame(S.id) : clearTimeout(S.id), (S.id = null));
                }
                function u(e, t, o, a, n) {
                    switch (n) {
                        case "linear":
                        case "mcsLinear":
                            return (o * e) / a + t;
                        case "mcsLinearOut":
                            return (e /= a), e--, o * Math.sqrt(1 - e * e) + t;
                        case "easeInOutSmooth":
                            return (e /= a / 2), 1 > e ? (o / 2) * e * e + t : (e--, (-o / 2) * (e * (e - 2) - 1) + t);
                        case "easeInOutStrong":
                            return (e /= a / 2), 1 > e ? (o / 2) * Math.pow(2, 10 * (e - 1)) + t : (e--, (o / 2) * (-Math.pow(2, -10 * e) + 2) + t);
                        case "easeInOut":
                        case "mcsEaseInOut":
                            return (e /= a / 2), 1 > e ? (o / 2) * e * e * e + t : ((e -= 2), (o / 2) * (e * e * e + 2) + t);
                        case "easeOutSmooth":
                            return (e /= a), e--, -o * (e * e * e * e - 1) + t;
                        case "easeOutStrong":
                            return o * (-Math.pow(2, (-10 * e) / a) + 1) + t;
                        case "easeOut":
                        case "mcsEaseOut":
                        default:
                            var i = (e /= a) * e,
                                r = i * e;
                            return t + o * (0.499999999999997 * r * i + -2.5 * i * i + 5.5 * r + -6.5 * i + 4 * e);
                    }
                }
                e._mTween || (e._mTween = { top: {}, left: {} });
                var f,
                    h,
                    r = r || {},
                    m = r.onStart || function () {},
                    p = r.onUpdate || function () {},
                    g = r.onComplete || function () {},
                    v = K(),
                    x = 0,
                    _ = e.offsetTop,
                    w = e.style,
                    S = e._mTween[t];
                "left" === t && (_ = e.offsetLeft);
                var b = o - _;
                (S.stop = 0), "none" !== i && d(), c();
            },
            K = function () {
                return window.performance && window.performance.now ? window.performance.now() : window.performance && window.performance.webkitNow ? window.performance.webkitNow() : Date.now ? Date.now() : new Date().getTime();
            },
            Z = function () {
                var e = this;
                e._mTween || (e._mTween = { top: {}, left: {} });
                for (var t = ["top", "left"], o = 0; o < t.length; o++) {
                    var a = t[o];
                    e._mTween[a].id && (window.requestAnimationFrame ? window.cancelAnimationFrame(e._mTween[a].id) : clearTimeout(e._mTween[a].id), (e._mTween[a].id = null), (e._mTween[a].stop = 1));
                }
            },
            $ = function (e, t) {
                try {
                    delete e[t];
                } catch (o) {
                    e[t] = null;
                }
            },
            ee = function (e) {
                return !(e.which && 1 !== e.which);
            },
            te = function (e) {
                var t = e.originalEvent.pointerType;
                return !(t && "touch" !== t && 2 !== t);
            },
            oe = function (e) {
                return !isNaN(parseFloat(e)) && isFinite(e);
            },
            ae = function (e) {
                var t = e.parents(".mCSB_container");
                return [e.offset().top - t.offset().top, e.offset().left - t.offset().left];
            },
            ne = function () {
                function e() {
                    var e = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document) return "hidden";
                    for (var t = 0; t < e.length; t++) if (e[t] + "Hidden" in document) return e[t] + "Hidden";
                    return null;
                }
                var t = e();
                return t ? document[t] : !1;
            };
        (e.fn[o] = function (t) {
            return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist") : u.init.apply(this, arguments);
        }),
            (e[o] = function (t) {
                return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist") : u.init.apply(this, arguments);
            }),
            (e[o].defaults = i),
            (window[o] = !0),
            e(window).bind("load", function () {
                e(n)[o](),
                    e.extend(e.expr[":"], {
                        mcsInView:
                            e.expr[":"].mcsInView ||
                            function (t) {
                                var o,
                                    a,
                                    n = e(t),
                                    i = n.parents(".mCSB_container");
                                if (i.length)
                                    return (
                                        (o = i.parent()),
                                        (a = [i[0].offsetTop, i[0].offsetLeft]),
                                        a[0] + ae(n)[0] >= 0 && a[0] + ae(n)[0] < o.height() - n.outerHeight(!1) && a[1] + ae(n)[1] >= 0 && a[1] + ae(n)[1] < o.width() - n.outerWidth(!1)
                                    );
                            },
                        mcsInSight:
                            e.expr[":"].mcsInSight ||
                            function (t, o, a) {
                                var n,
                                    i,
                                    r,
                                    l,
                                    s = e(t),
                                    c = s.parents(".mCSB_container"),
                                    d =
                                        "exact" === a[3]
                                            ? [
                                                  [1, 0],
                                                  [1, 0],
                                              ]
                                            : [
                                                  [0.9, 0.1],
                                                  [0.6, 0.4],
                                              ];
                                if (c.length)
                                    return (
                                        (n = [s.outerHeight(!1), s.outerWidth(!1)]),
                                        (r = [c[0].offsetTop + ae(s)[0], c[0].offsetLeft + ae(s)[1]]),
                                        (i = [c.parent()[0].offsetHeight, c.parent()[0].offsetWidth]),
                                        (l = [n[0] < i[0] ? d[0] : d[1], n[1] < i[1] ? d[0] : d[1]]),
                                        r[0] - i[0] * l[0][0] < 0 && r[0] + n[0] - i[0] * l[0][1] >= 0 && r[1] - i[1] * l[1][0] < 0 && r[1] + n[1] - i[1] * l[1][1] >= 0
                                    );
                            },
                        mcsOverflow:
                            e.expr[":"].mcsOverflow ||
                            function (t) {
                                var o = e(t).data(a);
                                if (o) return o.overflowed[0] || o.overflowed[1];
                            },
                    });
            });
    });
});
/* @license GNU-GPL-2.0-or-later https://www.drupal.org/licensing/faq */
(function ($, Drupal) {
    "use strict";
    Drupal.behaviors.t_search = {
        attach: function (context, settings) {
            var searchSiteWrapper = $("#t-search-site-wrapper");
            var searchBackdrop = $(".backdrop", searchSiteWrapper);
            var searchInput = $("input.form-text", searchSiteWrapper);
            var searchLink = $(".t-search-link", context);
            var searchForm = $(".views-exposed-form", context);
            var searchOverlay = $("#search-overlay", searchSiteWrapper);
            var viewContent = $(".view-content", searchSiteWrapper);
            var searchBlockForm = $("#search-block-form");
            var mql = window.matchMedia("screen and (max-width: 576px)");
            var timer = null;
            searchForm.on("submit", function (e) {
                e.stopImmediatePropagation();
                return false;
            });
            $(window).on("resize", function () {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    setViewContentHeight();
                }, 200);
            });
            cloneSearchLink();
            mql.addListener(cloneSearchLink);
            $(".t-search-link", context).on("click", function () {
                searchSiteWrapper.fadeIn(300);
                searchBackdrop.show();
                focusSearchField();
                setViewContentHeight();
            });
            $(".t-search-link-close, .backdrop", context).on("click", function () {
                searchSiteWrapper.fadeOut(300);
                searchBackdrop.hide();
                searchInput.val("");
                searchInput.keypress();
            });
            $(document).ajaxStart(function () {
                searchInput.attr("disabled", "disabled");
                searchOverlay.addClass("search-overlay");
            });
            $(document).ajaxStop(function () {
                focusSearchField();
                setViewContentHeight();
                searchInput.removeAttr("disabled");
                searchOverlay.removeClass("search-overlay");
            });
            $(".form-search", searchBlockForm).on("click keyup keypress change", function (event) {
                event.preventDefault();
                if (event.type === "click") {
                    searchSiteWrapper.fadeIn(300);
                    searchInput.focus();
                }
            });
            function focusSearchField() {
                var strLength = searchInput.val().length * 2;
                searchInput.focus();
                searchInput[0].setSelectionRange(strLength, strLength);
            }
            function cloneSearchLink() {
                if (mql.matches) {
                    setViewContentHeight(85);
                    var searchMobile = searchLink.clone(true).addClass("t-search-link-mobile").insertAfter(".navbar-container .navbar-brand");
                    searchMobile.each(function (index, item) {
                        if (item.nodeName === "DIV" && item.classList.contains("t-search-link")) item.remove();
                    });
                    searchLink.hide();
                } else {
                    $(".t-search-link-mobile", context).remove();
                    searchLink.show();
                }
            }
            function setViewContentHeight(extraSpace) {
                extraSpace = typeof extraSpace !== "undefined" ? extraSpace : 85;
                viewContent.height($(window).height() - searchInput.height() - extraSpace);
                $(".view-content", searchSiteWrapper).mCustomScrollbar({ theme: "dark", scrollInertia: 100 });
            }
        },
    };
})(jQuery, Drupal);
