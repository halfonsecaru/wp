import { $a as ɵɵdefineNgModule, $c as signal, Al as isFunction, Ar as bypassSanitizationTrustHtml, Bi as setClassMetadata, Bn as NgModule, Ci as performanceMarkFeature, Cn as IS_ENABLED_BLOCKING_INITIAL_NAVIGATION, Cr as _sanitizeHtml, Dc as RuntimeError, Dl as reportUnhandledError, Dn as Injectable, Dr as allLeavingAnimations, Dt as ResourceImpl, En as Inject, F as createPlatformFactory, Fl as __generator, Gn as Optional, Hi as setDocument, It as APP_BOOTSTRAP_LISTENER, Jn as PLATFORM_INITIALIZER, Kt as CSP_NONCE, Lt as APP_ID, Mc as _global, Ml as __asyncValues, Mr as bypassSanitizationTrustScript, Nc as assertInInjectionContext, Nl as __await, Nr as bypassSanitizationTrustStyle, Or as allowSanitizationBypassAndThrow, Ot as computed, Pl as __awaiter, Pr as bypassSanitizationTrustUrl, Rc as formatRuntimeError, Rl as __values, Sl as Observable, Tl as observable, Uc as inject, Ut as ApplicationRef, Yi as unwrapSafeValue, Zc as runInInjectionContext, _l as map, _r as TracingService, al as ɵɵdefineInjector, bl as createOperatorSubscriber, cl as ɵɵinject, cr as TESTABILITY, dt as withDomHydration, er as RendererFactory2, et as platformCore, fc as InjectionToken, ft as withEventReplay$1, ic as ENVIRONMENT_INITIALIZER, il as ɵɵdefineInjectable, ir as SecurityContext, jl as __asyncGenerator, jr as bypassSanitizationTrustResourceUrl, jt as linkedSignal, kc as Version, kt as encapsulateResourceError, lr as TESTABILITY_GETTER, mt as withIncrementalHydration$1, nc as DOCUMENT, nl as truncateMiddle, oc as EnvironmentInjector, pc as Injector, pr as Testability, pt as withI18nSupport$1, q as internalCreateApplication, qc as makeEnvironmentProviders, qn as PLATFORM_ID, rc as DestroyRef, rn as Console, rt as provideStabilityDebugging, sc as ErrorHandler, t as ApplicationModule, tr as RendererStyleFlags2, uc as INJECTOR_SCOPE, vi as makeStateKey, vr as TransferState, wc as PendingTasks, wr as _sanitizeUrl, xc as NgZone, xl as operate, xr as ViewEncapsulation, zc as forwardRef } from "./core-lutpOAv_.js";
import { Bt as DomAdapter, C as CommonModule, Ht as PlatformLocation, Ut as getDOM, Wt as setRootDomAdapter, a as PLATFORM_BROWSER_ID, v as XhrFactory, y as parseCookieValue } from "./common-DJGEzqpQ.js";
//#region node_modules/rxjs/dist/esm5/internal/util/isScheduler.js
function isScheduler(value) {
	return value && isFunction(value.schedule);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/args.js
function last(arr) {
	return arr[arr.length - 1];
}
function popResultSelector(args) {
	return isFunction(last(args)) ? args.pop() : void 0;
}
function popScheduler(args) {
	return isScheduler(last(args)) ? args.pop() : void 0;
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js
var isArrayLike = (function(x) {
	return x && typeof x.length === "number" && typeof x !== "function";
});
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/isPromise.js
function isPromise(value) {
	return isFunction(value === null || value === void 0 ? void 0 : value.then);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js
function isInteropObservable(input) {
	return isFunction(input[observable]);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js
function isAsyncIterable(obj) {
	return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js
function createInvalidObservableTypeError(input) {
	return /* @__PURE__ */ new TypeError("You provided " + (input !== null && typeof input === "object" ? "an invalid object" : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/symbol/iterator.js
function getSymbolIterator() {
	if (typeof Symbol !== "function" || !Symbol.iterator) return "@@iterator";
	return Symbol.iterator;
}
var iterator = getSymbolIterator();
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/isIterable.js
function isIterable(input) {
	return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js
function readableStreamLikeToAsyncGenerator(readableStream) {
	return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
		var reader, _a, value, done;
		return __generator(this, function(_b) {
			switch (_b.label) {
				case 0:
					reader = readableStream.getReader();
					_b.label = 1;
				case 1:
					_b.trys.push([
						1,
						,
						9,
						10
					]);
					_b.label = 2;
				case 2: return [4, __await(reader.read())];
				case 3:
					_a = _b.sent(), value = _a.value, done = _a.done;
					if (!done) return [3, 5];
					return [4, __await(void 0)];
				case 4: return [2, _b.sent()];
				case 5: return [4, __await(value)];
				case 6: return [4, _b.sent()];
				case 7:
					_b.sent();
					return [3, 2];
				case 8: return [3, 10];
				case 9:
					reader.releaseLock();
					return [7];
				case 10: return [2];
			}
		});
	});
}
function isReadableStreamLike(obj) {
	return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js
function innerFrom(input) {
	if (input instanceof Observable) return input;
	if (input != null) {
		if (isInteropObservable(input)) return fromInteropObservable(input);
		if (isArrayLike(input)) return fromArrayLike(input);
		if (isPromise(input)) return fromPromise(input);
		if (isAsyncIterable(input)) return fromAsyncIterable(input);
		if (isIterable(input)) return fromIterable(input);
		if (isReadableStreamLike(input)) return fromReadableStreamLike(input);
	}
	throw createInvalidObservableTypeError(input);
}
function fromInteropObservable(obj) {
	return new Observable(function(subscriber) {
		var obs = obj[observable]();
		if (isFunction(obs.subscribe)) return obs.subscribe(subscriber);
		throw new TypeError("Provided object does not correctly implement Symbol.observable");
	});
}
function fromArrayLike(array) {
	return new Observable(function(subscriber) {
		for (var i = 0; i < array.length && !subscriber.closed; i++) subscriber.next(array[i]);
		subscriber.complete();
	});
}
function fromPromise(promise) {
	return new Observable(function(subscriber) {
		promise.then(function(value) {
			if (!subscriber.closed) {
				subscriber.next(value);
				subscriber.complete();
			}
		}, function(err) {
			return subscriber.error(err);
		}).then(null, reportUnhandledError);
	});
}
function fromIterable(iterable) {
	return new Observable(function(subscriber) {
		var e_1, _a;
		try {
			for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
				var value = iterable_1_1.value;
				subscriber.next(value);
				if (subscriber.closed) return;
			}
		} catch (e_1_1) {
			e_1 = { error: e_1_1 };
		} finally {
			try {
				if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
			} finally {
				if (e_1) throw e_1.error;
			}
		}
		subscriber.complete();
	});
}
function fromAsyncIterable(asyncIterable) {
	return new Observable(function(subscriber) {
		process(asyncIterable, subscriber).catch(function(err) {
			return subscriber.error(err);
		});
	});
}
function fromReadableStreamLike(readableStream) {
	return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
}
function process(asyncIterable, subscriber) {
	var asyncIterable_1, asyncIterable_1_1;
	var e_2, _a;
	return __awaiter(this, void 0, void 0, function() {
		var value, e_2_1;
		return __generator(this, function(_b) {
			switch (_b.label) {
				case 0:
					_b.trys.push([
						0,
						5,
						6,
						11
					]);
					asyncIterable_1 = __asyncValues(asyncIterable);
					_b.label = 1;
				case 1: return [4, asyncIterable_1.next()];
				case 2:
					if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
					value = asyncIterable_1_1.value;
					subscriber.next(value);
					if (subscriber.closed) return [2];
					_b.label = 3;
				case 3: return [3, 1];
				case 4: return [3, 11];
				case 5:
					e_2_1 = _b.sent();
					e_2 = { error: e_2_1 };
					return [3, 11];
				case 6:
					_b.trys.push([
						6,
						,
						9,
						10
					]);
					if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
					return [4, _a.call(asyncIterable_1)];
				case 7:
					_b.sent();
					_b.label = 8;
				case 8: return [3, 10];
				case 9:
					if (e_2) throw e_2.error;
					return [7];
				case 10: return [7];
				case 11:
					subscriber.complete();
					return [2];
			}
		});
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js
function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
	if (delay === void 0) delay = 0;
	if (repeat === void 0) repeat = false;
	var scheduleSubscription = scheduler.schedule(function() {
		work();
		if (repeat) parentSubscription.add(this.schedule(null, delay));
		else this.unsubscribe();
	}, delay);
	parentSubscription.add(scheduleSubscription);
	if (!repeat) return scheduleSubscription;
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/observeOn.js
function observeOn(scheduler, delay) {
	if (delay === void 0) delay = 0;
	return operate(function(source, subscriber) {
		source.subscribe(createOperatorSubscriber(subscriber, function(value) {
			return executeSchedule(subscriber, scheduler, function() {
				return subscriber.next(value);
			}, delay);
		}, function() {
			return executeSchedule(subscriber, scheduler, function() {
				return subscriber.complete();
			}, delay);
		}, function(err) {
			return executeSchedule(subscriber, scheduler, function() {
				return subscriber.error(err);
			}, delay);
		}));
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js
function subscribeOn(scheduler, delay) {
	if (delay === void 0) delay = 0;
	return operate(function(source, subscriber) {
		subscriber.add(scheduler.schedule(function() {
			return source.subscribe(subscriber);
		}, delay));
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/scheduled/scheduleObservable.js
function scheduleObservable(input, scheduler) {
	return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/scheduled/schedulePromise.js
function schedulePromise(input, scheduler) {
	return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js
function scheduleArray(input, scheduler) {
	return new Observable(function(subscriber) {
		var i = 0;
		return scheduler.schedule(function() {
			if (i === input.length) subscriber.complete();
			else {
				subscriber.next(input[i++]);
				if (!subscriber.closed) this.schedule();
			}
		});
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/scheduled/scheduleIterable.js
function scheduleIterable(input, scheduler) {
	return new Observable(function(subscriber) {
		var iterator$1;
		executeSchedule(subscriber, scheduler, function() {
			iterator$1 = input[iterator]();
			executeSchedule(subscriber, scheduler, function() {
				var _a;
				var value;
				var done;
				try {
					_a = iterator$1.next(), value = _a.value, done = _a.done;
				} catch (err) {
					subscriber.error(err);
					return;
				}
				if (done) subscriber.complete();
				else subscriber.next(value);
			}, 0, true);
		});
		return function() {
			return isFunction(iterator$1 === null || iterator$1 === void 0 ? void 0 : iterator$1.return) && iterator$1.return();
		};
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js
function scheduleAsyncIterable(input, scheduler) {
	if (!input) throw new Error("Iterable cannot be null");
	return new Observable(function(subscriber) {
		executeSchedule(subscriber, scheduler, function() {
			var iterator = input[Symbol.asyncIterator]();
			executeSchedule(subscriber, scheduler, function() {
				iterator.next().then(function(result) {
					if (result.done) subscriber.complete();
					else subscriber.next(result.value);
				});
			}, 0, true);
		});
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/scheduled/scheduleReadableStreamLike.js
function scheduleReadableStreamLike(input, scheduler) {
	return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input), scheduler);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/scheduled/scheduled.js
function scheduled(input, scheduler) {
	if (input != null) {
		if (isInteropObservable(input)) return scheduleObservable(input, scheduler);
		if (isArrayLike(input)) return scheduleArray(input, scheduler);
		if (isPromise(input)) return schedulePromise(input, scheduler);
		if (isAsyncIterable(input)) return scheduleAsyncIterable(input, scheduler);
		if (isIterable(input)) return scheduleIterable(input, scheduler);
		if (isReadableStreamLike(input)) return scheduleReadableStreamLike(input, scheduler);
	}
	throw createInvalidObservableTypeError(input);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/observable/from.js
function from(input, scheduler) {
	return scheduler ? scheduled(input, scheduler) : innerFrom(input);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/observable/of.js
function of() {
	var args = [];
	for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
	return from(args, popScheduler(args));
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js
function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
	var buffer = [];
	var active = 0;
	var index = 0;
	var isComplete = false;
	var checkComplete = function() {
		if (isComplete && !buffer.length && !active) subscriber.complete();
	};
	var outerNext = function(value) {
		return active < concurrent ? doInnerSub(value) : buffer.push(value);
	};
	var doInnerSub = function(value) {
		expand && subscriber.next(value);
		active++;
		var innerComplete = false;
		innerFrom(project(value, index++)).subscribe(createOperatorSubscriber(subscriber, function(innerValue) {
			onBeforeNext === null || onBeforeNext === void 0 || onBeforeNext(innerValue);
			if (expand) outerNext(innerValue);
			else subscriber.next(innerValue);
		}, function() {
			innerComplete = true;
		}, void 0, function() {
			if (innerComplete) try {
				active--;
				var _loop_1 = function() {
					var bufferedValue = buffer.shift();
					if (innerSubScheduler) executeSchedule(subscriber, innerSubScheduler, function() {
						return doInnerSub(bufferedValue);
					});
					else doInnerSub(bufferedValue);
				};
				while (buffer.length && active < concurrent) _loop_1();
				checkComplete();
			} catch (err) {
				subscriber.error(err);
			}
		}));
	};
	source.subscribe(createOperatorSubscriber(subscriber, outerNext, function() {
		isComplete = true;
		checkComplete();
	}));
	return function() {
		additionalFinalizer === null || additionalFinalizer === void 0 || additionalFinalizer();
	};
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js
function mergeMap(project, resultSelector, concurrent) {
	if (concurrent === void 0) concurrent = Infinity;
	if (isFunction(resultSelector)) return mergeMap(function(a, i) {
		return map(function(b, ii) {
			return resultSelector(a, b, i, ii);
		})(innerFrom(project(a, i)));
	}, concurrent);
	else if (typeof resultSelector === "number") concurrent = resultSelector;
	return operate(function(source, subscriber) {
		return mergeInternals(source, subscriber, project, concurrent);
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/filter.js
function filter(predicate, thisArg) {
	return operate(function(source, subscriber) {
		var index = 0;
		source.subscribe(createOperatorSubscriber(subscriber, function(value) {
			return predicate.call(thisArg, value, index++) && subscriber.next(value);
		}));
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/concatMap.js
function concatMap(project, resultSelector) {
	return isFunction(resultSelector) ? mergeMap(project, resultSelector, 1) : mergeMap(project, 1);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/finalize.js
function finalize(callback) {
	return operate(function(source, subscriber) {
		try {
			source.subscribe(subscriber);
		} finally {
			subscriber.add(callback);
		}
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/switchMap.js
function switchMap(project, resultSelector) {
	return operate(function(source, subscriber) {
		var innerSubscriber = null;
		var index = 0;
		var isComplete = false;
		var checkComplete = function() {
			return isComplete && !innerSubscriber && subscriber.complete();
		};
		source.subscribe(createOperatorSubscriber(subscriber, function(value) {
			innerSubscriber === null || innerSubscriber === void 0 || innerSubscriber.unsubscribe();
			var innerIndex = 0;
			var outerIndex = index++;
			innerFrom(project(value, outerIndex)).subscribe(innerSubscriber = createOperatorSubscriber(subscriber, function(innerValue) {
				return subscriber.next(resultSelector ? resultSelector(value, innerValue, outerIndex, innerIndex++) : innerValue);
			}, function() {
				innerSubscriber = null;
				checkComplete();
			}));
		}, function() {
			isComplete = true;
			checkComplete();
		}));
	});
}
//#endregion
//#region node_modules/@angular/platform-browser/fesm2022/_dom_renderer-chunk.mjs
/**
* @license Angular v21.2.7
* (c) 2010-2026 Google LLC. https://angular.dev/
* License: MIT
*/
var EventManagerPlugin = class {
	_doc;
	constructor(_doc) {
		this._doc = _doc;
	}
	manager;
};
var DomEventsPlugin = class DomEventsPlugin extends EventManagerPlugin {
	constructor(doc) {
		super(doc);
	}
	supports(eventName) {
		return true;
	}
	addEventListener(element, eventName, handler, options) {
		element.addEventListener(eventName, handler, options);
		return () => this.removeEventListener(element, eventName, handler, options);
	}
	removeEventListener(target, eventName, callback, options) {
		return target.removeEventListener(eventName, callback, options);
	}
	static ɵfac = function DomEventsPlugin_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || DomEventsPlugin)(ɵɵinject(DOCUMENT));
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
		token: DomEventsPlugin,
		factory: DomEventsPlugin.ɵfac
	});
};
(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DomEventsPlugin, [{ type: Injectable }], () => [{
	type: void 0,
	decorators: [{
		type: Inject,
		args: [DOCUMENT]
	}]
}], null);
var EVENT_MANAGER_PLUGINS = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "EventManagerPlugins" : "");
var EventManager = class EventManager {
	_zone;
	_plugins;
	_eventNameToPlugin = /* @__PURE__ */ new Map();
	constructor(plugins, _zone) {
		this._zone = _zone;
		plugins.forEach((plugin) => {
			plugin.manager = this;
		});
		this._plugins = plugins.filter((p) => !(p instanceof DomEventsPlugin)).slice().reverse();
		const domEventPlugin = plugins.find((p) => p instanceof DomEventsPlugin);
		if (domEventPlugin) this._plugins.push(domEventPlugin);
	}
	addEventListener(element, eventName, handler, options) {
		return this._findPluginFor(eventName).addEventListener(element, eventName, handler, options);
	}
	getZone() {
		return this._zone;
	}
	_findPluginFor(eventName) {
		let plugin = this._eventNameToPlugin.get(eventName);
		if (plugin) return plugin;
		plugin = this._plugins.find((plugin) => plugin.supports(eventName));
		if (!plugin) throw new RuntimeError(5101, (typeof ngDevMode === "undefined" || ngDevMode) && `No event manager plugin found for event ${eventName}`);
		this._eventNameToPlugin.set(eventName, plugin);
		return plugin;
	}
	static ɵfac = function EventManager_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || EventManager)(ɵɵinject(EVENT_MANAGER_PLUGINS), ɵɵinject(NgZone));
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
		token: EventManager,
		factory: EventManager.ɵfac
	});
};
(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EventManager, [{ type: Injectable }], () => [{
	type: void 0,
	decorators: [{
		type: Inject,
		args: [EVENT_MANAGER_PLUGINS]
	}]
}, { type: NgZone }], null);
var APP_ID_ATTRIBUTE_NAME = "ng-app-id";
function removeElements(elements) {
	for (const element of elements) element.remove();
}
function createStyleElement(style, doc) {
	const styleElement = doc.createElement("style");
	styleElement.textContent = style;
	return styleElement;
}
function addServerStyles(doc, appId, inline, external) {
	const elements = doc.head?.querySelectorAll(`style[${APP_ID_ATTRIBUTE_NAME}="${appId}"],link[${APP_ID_ATTRIBUTE_NAME}="${appId}"]`);
	if (elements) for (const styleElement of elements) {
		styleElement.removeAttribute(APP_ID_ATTRIBUTE_NAME);
		if (styleElement instanceof HTMLLinkElement) external.set(styleElement.href.slice(styleElement.href.lastIndexOf("/") + 1), {
			usage: 0,
			elements: [styleElement]
		});
		else if (styleElement.textContent) inline.set(styleElement.textContent, {
			usage: 0,
			elements: [styleElement]
		});
	}
}
function createLinkElement(url, doc) {
	const linkElement = doc.createElement("link");
	linkElement.setAttribute("rel", "stylesheet");
	linkElement.setAttribute("href", url);
	return linkElement;
}
var SharedStylesHost = class SharedStylesHost {
	doc;
	appId;
	nonce;
	inline = /* @__PURE__ */ new Map();
	external = /* @__PURE__ */ new Map();
	hosts = /* @__PURE__ */ new Set();
	constructor(doc, appId, nonce, platformId = {}) {
		this.doc = doc;
		this.appId = appId;
		this.nonce = nonce;
		addServerStyles(doc, appId, this.inline, this.external);
		this.hosts.add(doc.head);
	}
	addStyles(styles, urls) {
		for (const value of styles) this.addUsage(value, this.inline, createStyleElement);
		urls?.forEach((value) => this.addUsage(value, this.external, createLinkElement));
	}
	removeStyles(styles, urls) {
		for (const value of styles) this.removeUsage(value, this.inline);
		urls?.forEach((value) => this.removeUsage(value, this.external));
	}
	addUsage(value, usages, creator) {
		const record = usages.get(value);
		if (record) {
			if ((typeof ngDevMode === "undefined" || ngDevMode) && record.usage === 0) record.elements.forEach((element) => element.setAttribute("ng-style-reused", ""));
			record.usage++;
		} else usages.set(value, {
			usage: 1,
			elements: [...this.hosts].map((host) => this.addElement(host, creator(value, this.doc)))
		});
	}
	removeUsage(value, usages) {
		const record = usages.get(value);
		if (record) {
			record.usage--;
			if (record.usage <= 0) {
				removeElements(record.elements);
				usages.delete(value);
			}
		}
	}
	ngOnDestroy() {
		for (const [, { elements }] of [...this.inline, ...this.external]) removeElements(elements);
		this.hosts.clear();
	}
	addHost(hostNode) {
		this.hosts.add(hostNode);
		for (const [style, { elements }] of this.inline) elements.push(this.addElement(hostNode, createStyleElement(style, this.doc)));
		for (const [url, { elements }] of this.external) elements.push(this.addElement(hostNode, createLinkElement(url, this.doc)));
	}
	removeHost(hostNode) {
		this.hosts.delete(hostNode);
	}
	addElement(host, element) {
		if (this.nonce) element.setAttribute("nonce", this.nonce);
		return host.appendChild(element);
	}
	static ɵfac = function SharedStylesHost_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || SharedStylesHost)(ɵɵinject(DOCUMENT), ɵɵinject(APP_ID), ɵɵinject(CSP_NONCE, 8), ɵɵinject(PLATFORM_ID));
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
		token: SharedStylesHost,
		factory: SharedStylesHost.ɵfac
	});
};
(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SharedStylesHost, [{ type: Injectable }], () => [
	{
		type: Document,
		decorators: [{
			type: Inject,
			args: [DOCUMENT]
		}]
	},
	{
		type: void 0,
		decorators: [{
			type: Inject,
			args: [APP_ID]
		}]
	},
	{
		type: void 0,
		decorators: [{
			type: Inject,
			args: [CSP_NONCE]
		}, { type: Optional }]
	},
	{
		type: void 0,
		decorators: [{
			type: Inject,
			args: [PLATFORM_ID]
		}]
	}
], null);
var NAMESPACE_URIS = {
	"svg": "http://www.w3.org/2000/svg",
	"xhtml": "http://www.w3.org/1999/xhtml",
	"xlink": "http://www.w3.org/1999/xlink",
	"xml": "http://www.w3.org/XML/1998/namespace",
	"xmlns": "http://www.w3.org/2000/xmlns/",
	"math": "http://www.w3.org/1998/Math/MathML"
};
var COMPONENT_REGEX = /%COMP%/g;
var SOURCEMAP_URL_REGEXP = /\/\*#\s*sourceMappingURL=(.+?)\s*\*\//;
var PROTOCOL_REGEXP = /^https?:/;
var COMPONENT_VARIABLE = "%COMP%";
var HOST_ATTR = `_nghost-${COMPONENT_VARIABLE}`;
var CONTENT_ATTR = `_ngcontent-${COMPONENT_VARIABLE}`;
var REMOVE_STYLES_ON_COMPONENT_DESTROY_DEFAULT = true;
var REMOVE_STYLES_ON_COMPONENT_DESTROY = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "RemoveStylesOnCompDestroy" : "", { factory: () => REMOVE_STYLES_ON_COMPONENT_DESTROY_DEFAULT });
function shimContentAttribute(componentShortId) {
	return CONTENT_ATTR.replace(COMPONENT_REGEX, componentShortId);
}
function shimHostAttribute(componentShortId) {
	return HOST_ATTR.replace(COMPONENT_REGEX, componentShortId);
}
function shimStylesContent(compId, styles) {
	return styles.map((s) => s.replace(COMPONENT_REGEX, compId));
}
function addBaseHrefToCssSourceMap(baseHref, styles) {
	if (!baseHref) return styles;
	const absoluteBaseHrefUrl = new URL(baseHref, "http://localhost");
	return styles.map((cssContent) => {
		if (!cssContent.includes("sourceMappingURL=")) return cssContent;
		return cssContent.replace(SOURCEMAP_URL_REGEXP, (_, sourceMapUrl) => {
			if (sourceMapUrl[0] === "/" || sourceMapUrl.startsWith("data:") || PROTOCOL_REGEXP.test(sourceMapUrl)) return `/*# sourceMappingURL=${sourceMapUrl} */`;
			const { pathname: resolvedSourceMapUrl } = new URL(sourceMapUrl, absoluteBaseHrefUrl);
			return `/*# sourceMappingURL=${resolvedSourceMapUrl} */`;
		});
	});
}
var DomRendererFactory2 = class DomRendererFactory2 {
	eventManager;
	sharedStylesHost;
	appId;
	removeStylesOnCompDestroy;
	doc;
	ngZone;
	nonce;
	tracingService;
	rendererByCompId = /* @__PURE__ */ new Map();
	defaultRenderer;
	constructor(eventManager, sharedStylesHost, appId, removeStylesOnCompDestroy, doc, ngZone, nonce = null, tracingService = null) {
		this.eventManager = eventManager;
		this.sharedStylesHost = sharedStylesHost;
		this.appId = appId;
		this.removeStylesOnCompDestroy = removeStylesOnCompDestroy;
		this.doc = doc;
		this.ngZone = ngZone;
		this.nonce = nonce;
		this.tracingService = tracingService;
		this.defaultRenderer = new DefaultDomRenderer2(eventManager, doc, ngZone, this.tracingService);
	}
	createRenderer(element, type) {
		if (!element || !type) return this.defaultRenderer;
		const renderer = this.getOrCreateRenderer(element, type);
		if (renderer instanceof EmulatedEncapsulationDomRenderer2) renderer.applyToHost(element);
		else if (renderer instanceof NoneEncapsulationDomRenderer) renderer.applyStyles();
		return renderer;
	}
	getOrCreateRenderer(element, type) {
		const rendererByCompId = this.rendererByCompId;
		let renderer = rendererByCompId.get(type.id);
		if (!renderer) {
			const doc = this.doc;
			const ngZone = this.ngZone;
			const eventManager = this.eventManager;
			const sharedStylesHost = this.sharedStylesHost;
			const removeStylesOnCompDestroy = this.removeStylesOnCompDestroy;
			const tracingService = this.tracingService;
			switch (type.encapsulation) {
				case ViewEncapsulation.Emulated:
					renderer = new EmulatedEncapsulationDomRenderer2(eventManager, sharedStylesHost, type, this.appId, removeStylesOnCompDestroy, doc, ngZone, tracingService);
					break;
				case ViewEncapsulation.ShadowDom: return new ShadowDomRenderer(eventManager, element, type, doc, ngZone, this.nonce, tracingService, sharedStylesHost);
				case ViewEncapsulation.ExperimentalIsolatedShadowDom: return new ShadowDomRenderer(eventManager, element, type, doc, ngZone, this.nonce, tracingService);
				default:
					renderer = new NoneEncapsulationDomRenderer(eventManager, sharedStylesHost, type, removeStylesOnCompDestroy, doc, ngZone, tracingService);
					break;
			}
			rendererByCompId.set(type.id, renderer);
		}
		return renderer;
	}
	ngOnDestroy() {
		this.rendererByCompId.clear();
	}
	componentReplaced(componentId) {
		this.rendererByCompId.delete(componentId);
	}
	static ɵfac = function DomRendererFactory2_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || DomRendererFactory2)(ɵɵinject(EventManager), ɵɵinject(SharedStylesHost), ɵɵinject(APP_ID), ɵɵinject(REMOVE_STYLES_ON_COMPONENT_DESTROY), ɵɵinject(DOCUMENT), ɵɵinject(NgZone), ɵɵinject(CSP_NONCE), ɵɵinject(TracingService, 8));
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
		token: DomRendererFactory2,
		factory: DomRendererFactory2.ɵfac
	});
};
(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DomRendererFactory2, [{ type: Injectable }], () => [
	{ type: EventManager },
	{ type: SharedStylesHost },
	{
		type: void 0,
		decorators: [{
			type: Inject,
			args: [APP_ID]
		}]
	},
	{
		type: void 0,
		decorators: [{
			type: Inject,
			args: [REMOVE_STYLES_ON_COMPONENT_DESTROY]
		}]
	},
	{
		type: Document,
		decorators: [{
			type: Inject,
			args: [DOCUMENT]
		}]
	},
	{ type: NgZone },
	{
		type: void 0,
		decorators: [{
			type: Inject,
			args: [CSP_NONCE]
		}]
	},
	{
		type: TracingService,
		decorators: [{
			type: Inject,
			args: [TracingService]
		}, { type: Optional }]
	}
], null);
var DefaultDomRenderer2 = class {
	eventManager;
	doc;
	ngZone;
	tracingService;
	data = Object.create(null);
	throwOnSyntheticProps = true;
	constructor(eventManager, doc, ngZone, tracingService) {
		this.eventManager = eventManager;
		this.doc = doc;
		this.ngZone = ngZone;
		this.tracingService = tracingService;
	}
	destroy() {}
	destroyNode = null;
	createElement(name, namespace) {
		if (namespace) return this.doc.createElementNS(NAMESPACE_URIS[namespace] || namespace, name);
		return this.doc.createElement(name);
	}
	createComment(value) {
		return this.doc.createComment(value);
	}
	createText(value) {
		return this.doc.createTextNode(value);
	}
	appendChild(parent, newChild) {
		(isTemplateNode(parent) ? parent.content : parent).appendChild(newChild);
	}
	insertBefore(parent, newChild, refChild) {
		if (parent) (isTemplateNode(parent) ? parent.content : parent).insertBefore(newChild, refChild);
	}
	removeChild(_parent, oldChild) {
		oldChild.remove();
	}
	selectRootElement(selectorOrNode, preserveContent) {
		let el = typeof selectorOrNode === "string" ? this.doc.querySelector(selectorOrNode) : selectorOrNode;
		if (!el) throw new RuntimeError(-5104, (typeof ngDevMode === "undefined" || ngDevMode) && `The selector "${selectorOrNode}" did not match any elements`);
		if (!preserveContent) el.textContent = "";
		return el;
	}
	parentNode(node) {
		return node.parentNode;
	}
	nextSibling(node) {
		return node.nextSibling;
	}
	setAttribute(el, name, value, namespace) {
		if (namespace) {
			name = namespace + ":" + name;
			const namespaceUri = NAMESPACE_URIS[namespace];
			if (namespaceUri) el.setAttributeNS(namespaceUri, name, value);
			else el.setAttribute(name, value);
		} else el.setAttribute(name, value);
	}
	removeAttribute(el, name, namespace) {
		if (namespace) {
			const namespaceUri = NAMESPACE_URIS[namespace];
			if (namespaceUri) el.removeAttributeNS(namespaceUri, name);
			else el.removeAttribute(`${namespace}:${name}`);
		} else el.removeAttribute(name);
	}
	addClass(el, name) {
		el.classList.add(name);
	}
	removeClass(el, name) {
		el.classList.remove(name);
	}
	setStyle(el, style, value, flags) {
		if (flags & (RendererStyleFlags2.DashCase | RendererStyleFlags2.Important)) el.style.setProperty(style, value, flags & RendererStyleFlags2.Important ? "important" : "");
		else el.style[style] = value;
	}
	removeStyle(el, style, flags) {
		if (flags & RendererStyleFlags2.DashCase) el.style.removeProperty(style);
		else el.style[style] = "";
	}
	setProperty(el, name, value) {
		if (el == null) return;
		(typeof ngDevMode === "undefined" || ngDevMode) && this.throwOnSyntheticProps && checkNoSyntheticProp(name, "property");
		el[name] = value;
	}
	setValue(node, value) {
		node.nodeValue = value;
	}
	listen(target, event, callback, options) {
		(typeof ngDevMode === "undefined" || ngDevMode) && this.throwOnSyntheticProps && checkNoSyntheticProp(event, "listener");
		if (typeof target === "string") {
			target = getDOM().getGlobalEventTarget(this.doc, target);
			if (!target) throw new RuntimeError(5102, (typeof ngDevMode === "undefined" || ngDevMode) && `Unsupported event target ${target} for event ${event}`);
		}
		let wrappedCallback = this.decoratePreventDefault(callback);
		if (this.tracingService?.wrapEventListener) wrappedCallback = this.tracingService.wrapEventListener(target, event, wrappedCallback);
		return this.eventManager.addEventListener(target, event, wrappedCallback, options);
	}
	decoratePreventDefault(eventHandler) {
		return (event) => {
			if (event === "__ngUnwrap__") return eventHandler;
			if (eventHandler(event) === false) event.preventDefault();
		};
	}
};
var AT_CHARCODE = "@".charCodeAt(0);
function checkNoSyntheticProp(name, nameKind) {
	if (name.charCodeAt(0) === AT_CHARCODE) throw new RuntimeError(5105, `Unexpected synthetic ${nameKind} ${name} found. Please make sure that:
  - Make sure \`provideAnimationsAsync()\`, \`provideAnimations()\` or \`provideNoopAnimations()\` call was added to a list of providers used to bootstrap an application.
  - There is a corresponding animation configuration named \`${name}\` defined in the \`animations\` field of the \`@Component\` decorator (see https://angular.dev/api/core/Component#animations).`);
}
function isTemplateNode(node) {
	return node.tagName === "TEMPLATE" && node.content !== void 0;
}
var ShadowDomRenderer = class extends DefaultDomRenderer2 {
	hostEl;
	sharedStylesHost;
	shadowRoot;
	constructor(eventManager, hostEl, component, doc, ngZone, nonce, tracingService, sharedStylesHost) {
		super(eventManager, doc, ngZone, tracingService);
		this.hostEl = hostEl;
		this.sharedStylesHost = sharedStylesHost;
		this.shadowRoot = hostEl.attachShadow({ mode: "open" });
		if (this.sharedStylesHost) this.sharedStylesHost.addHost(this.shadowRoot);
		let styles = component.styles;
		if (ngDevMode) styles = addBaseHrefToCssSourceMap(getDOM().getBaseHref(doc) ?? "", styles);
		styles = shimStylesContent(component.id, styles);
		for (const style of styles) {
			const styleEl = document.createElement("style");
			if (nonce) styleEl.setAttribute("nonce", nonce);
			styleEl.textContent = style;
			this.shadowRoot.appendChild(styleEl);
		}
		const styleUrls = component.getExternalStyles?.();
		if (styleUrls) for (const styleUrl of styleUrls) {
			const linkEl = createLinkElement(styleUrl, doc);
			if (nonce) linkEl.setAttribute("nonce", nonce);
			this.shadowRoot.appendChild(linkEl);
		}
	}
	nodeOrShadowRoot(node) {
		return node === this.hostEl ? this.shadowRoot : node;
	}
	appendChild(parent, newChild) {
		return super.appendChild(this.nodeOrShadowRoot(parent), newChild);
	}
	insertBefore(parent, newChild, refChild) {
		return super.insertBefore(this.nodeOrShadowRoot(parent), newChild, refChild);
	}
	removeChild(_parent, oldChild) {
		return super.removeChild(null, oldChild);
	}
	parentNode(node) {
		return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(node)));
	}
	destroy() {
		if (this.sharedStylesHost) this.sharedStylesHost.removeHost(this.shadowRoot);
	}
};
var NoneEncapsulationDomRenderer = class extends DefaultDomRenderer2 {
	sharedStylesHost;
	removeStylesOnCompDestroy;
	styles;
	styleUrls;
	constructor(eventManager, sharedStylesHost, component, removeStylesOnCompDestroy, doc, ngZone, tracingService, compId) {
		super(eventManager, doc, ngZone, tracingService);
		this.sharedStylesHost = sharedStylesHost;
		this.removeStylesOnCompDestroy = removeStylesOnCompDestroy;
		let styles = component.styles;
		if (ngDevMode) styles = addBaseHrefToCssSourceMap(getDOM().getBaseHref(doc) ?? "", styles);
		this.styles = compId ? shimStylesContent(compId, styles) : styles;
		this.styleUrls = component.getExternalStyles?.(compId);
	}
	applyStyles() {
		this.sharedStylesHost.addStyles(this.styles, this.styleUrls);
	}
	destroy() {
		if (!this.removeStylesOnCompDestroy) return;
		if (allLeavingAnimations.size === 0) this.sharedStylesHost.removeStyles(this.styles, this.styleUrls);
	}
};
var EmulatedEncapsulationDomRenderer2 = class extends NoneEncapsulationDomRenderer {
	contentAttr;
	hostAttr;
	constructor(eventManager, sharedStylesHost, component, appId, removeStylesOnCompDestroy, doc, ngZone, tracingService) {
		const compId = appId + "-" + component.id;
		super(eventManager, sharedStylesHost, component, removeStylesOnCompDestroy, doc, ngZone, tracingService, compId);
		this.contentAttr = shimContentAttribute(compId);
		this.hostAttr = shimHostAttribute(compId);
	}
	applyToHost(element) {
		this.applyStyles();
		this.setAttribute(element, this.hostAttr, "");
	}
	createElement(parent, name) {
		const el = super.createElement(parent, name);
		super.setAttribute(el, this.contentAttr, "");
		return el;
	}
};
//#endregion
//#region node_modules/@angular/platform-browser/fesm2022/_browser-chunk.mjs
/**
* @license Angular v21.2.7
* (c) 2010-2026 Google LLC. https://angular.dev/
* License: MIT
*/
var BrowserDomAdapter = class BrowserDomAdapter extends DomAdapter {
	supportsDOMEvents = true;
	static makeCurrent() {
		setRootDomAdapter(new BrowserDomAdapter());
	}
	onAndCancel(el, evt, listener, options) {
		el.addEventListener(evt, listener, options);
		return () => {
			el.removeEventListener(evt, listener, options);
		};
	}
	dispatchEvent(el, evt) {
		el.dispatchEvent(evt);
	}
	remove(node) {
		node.remove();
	}
	createElement(tagName, doc) {
		doc = doc || this.getDefaultDocument();
		return doc.createElement(tagName);
	}
	createHtmlDocument() {
		return document.implementation.createHTMLDocument("fakeTitle");
	}
	getDefaultDocument() {
		return document;
	}
	isElementNode(node) {
		return node.nodeType === Node.ELEMENT_NODE;
	}
	isShadowRoot(node) {
		return node instanceof DocumentFragment;
	}
	getGlobalEventTarget(doc, target) {
		if (target === "window") return window;
		if (target === "document") return doc;
		if (target === "body") return doc.body;
		return null;
	}
	getBaseHref(doc) {
		const href = getBaseElementHref();
		return href == null ? null : relativePath(href);
	}
	resetBaseElement() {
		baseElement = null;
	}
	getUserAgent() {
		return window.navigator.userAgent;
	}
	getCookie(name) {
		return parseCookieValue(document.cookie, name);
	}
};
var baseElement = null;
function getBaseElementHref() {
	baseElement = baseElement || document.head.querySelector("base");
	return baseElement ? baseElement.getAttribute("href") : null;
}
function relativePath(url) {
	return new URL(url, document.baseURI).pathname;
}
var BrowserGetTestability = class {
	addToWindow(registry) {
		_global["getAngularTestability"] = (elem, findInAncestors = true) => {
			const testability = registry.findTestabilityInTree(elem, findInAncestors);
			if (testability == null) throw new RuntimeError(5103, (typeof ngDevMode === "undefined" || ngDevMode) && "Could not find testability for element.");
			return testability;
		};
		_global["getAllAngularTestabilities"] = () => registry.getAllTestabilities();
		_global["getAllAngularRootElements"] = () => registry.getAllRootElements();
		const whenAllStable = (callback) => {
			const testabilities = _global["getAllAngularTestabilities"]();
			let count = testabilities.length;
			const decrement = function() {
				count--;
				if (count == 0) callback();
			};
			testabilities.forEach((testability) => {
				testability.whenStable(decrement);
			});
		};
		if (!_global["frameworkStabilizers"]) _global["frameworkStabilizers"] = [];
		_global["frameworkStabilizers"].push(whenAllStable);
	}
	findTestabilityInTree(registry, elem, findInAncestors) {
		if (elem == null) return null;
		const t = registry.getTestability(elem);
		if (t != null) return t;
		else if (!findInAncestors) return null;
		if (getDOM().isShadowRoot(elem)) return this.findTestabilityInTree(registry, elem.host, true);
		return this.findTestabilityInTree(registry, elem.parentElement, true);
	}
};
var BrowserXhr = class BrowserXhr {
	build() {
		return new XMLHttpRequest();
	}
	static ɵfac = function BrowserXhr_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || BrowserXhr)();
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
		token: BrowserXhr,
		factory: BrowserXhr.ɵfac
	});
};
(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrowserXhr, [{ type: Injectable }], null, null);
var MODIFIER_KEYS = [
	"alt",
	"control",
	"meta",
	"shift"
];
var _keyMap = {
	"\b": "Backspace",
	"	": "Tab",
	"": "Delete",
	"\x1B": "Escape",
	"Del": "Delete",
	"Esc": "Escape",
	"Left": "ArrowLeft",
	"Right": "ArrowRight",
	"Up": "ArrowUp",
	"Down": "ArrowDown",
	"Menu": "ContextMenu",
	"Scroll": "ScrollLock",
	"Win": "OS"
};
var MODIFIER_KEY_GETTERS = {
	"alt": (event) => event.altKey,
	"control": (event) => event.ctrlKey,
	"meta": (event) => event.metaKey,
	"shift": (event) => event.shiftKey
};
var KeyEventsPlugin = class KeyEventsPlugin extends EventManagerPlugin {
	constructor(doc) {
		super(doc);
	}
	supports(eventName) {
		return KeyEventsPlugin.parseEventName(eventName) != null;
	}
	addEventListener(element, eventName, handler, options) {
		const parsedEvent = KeyEventsPlugin.parseEventName(eventName);
		const outsideHandler = KeyEventsPlugin.eventCallback(parsedEvent["fullKey"], handler, this.manager.getZone());
		return this.manager.getZone().runOutsideAngular(() => {
			return getDOM().onAndCancel(element, parsedEvent["domEventName"], outsideHandler, options);
		});
	}
	static parseEventName(eventName) {
		const parts = eventName.toLowerCase().split(".");
		const domEventName = parts.shift();
		if (parts.length === 0 || !(domEventName === "keydown" || domEventName === "keyup")) return null;
		const key = KeyEventsPlugin._normalizeKey(parts.pop());
		let fullKey = "";
		let codeIX = parts.indexOf("code");
		if (codeIX > -1) {
			parts.splice(codeIX, 1);
			fullKey = "code.";
		}
		MODIFIER_KEYS.forEach((modifierName) => {
			const index = parts.indexOf(modifierName);
			if (index > -1) {
				parts.splice(index, 1);
				fullKey += modifierName + ".";
			}
		});
		fullKey += key;
		if (parts.length != 0 || key.length === 0) return null;
		const result = {};
		result["domEventName"] = domEventName;
		result["fullKey"] = fullKey;
		return result;
	}
	static matchEventFullKeyCode(event, fullKeyCode) {
		let keycode = _keyMap[event.key] || event.key;
		let key = "";
		if (fullKeyCode.indexOf("code.") > -1) {
			keycode = event.code;
			key = "code.";
		}
		if (keycode == null || !keycode) return false;
		keycode = keycode.toLowerCase();
		if (keycode === " ") keycode = "space";
		else if (keycode === ".") keycode = "dot";
		MODIFIER_KEYS.forEach((modifierName) => {
			if (modifierName !== keycode) {
				const modifierGetter = MODIFIER_KEY_GETTERS[modifierName];
				if (modifierGetter(event)) key += modifierName + ".";
			}
		});
		key += keycode;
		return key === fullKeyCode;
	}
	static eventCallback(fullKey, handler, zone) {
		return (event) => {
			if (KeyEventsPlugin.matchEventFullKeyCode(event, fullKey)) zone.runGuarded(() => handler(event));
		};
	}
	static _normalizeKey(keyName) {
		return keyName === "esc" ? "escape" : keyName;
	}
	static ɵfac = function KeyEventsPlugin_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || KeyEventsPlugin)(ɵɵinject(DOCUMENT));
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
		token: KeyEventsPlugin,
		factory: KeyEventsPlugin.ɵfac
	});
};
(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(KeyEventsPlugin, [{ type: Injectable }], () => [{
	type: void 0,
	decorators: [{
		type: Inject,
		args: [DOCUMENT]
	}]
}], null);
async function bootstrapApplication(rootComponent, options, context) {
	return internalCreateApplication({
		rootComponent,
		...createProvidersConfig(options, context)
	});
}
async function createApplication(options, context) {
	return internalCreateApplication(createProvidersConfig(options, context));
}
function createProvidersConfig(options, context) {
	return {
		platformRef: context?.platformRef,
		appProviders: [...BROWSER_MODULE_PROVIDERS, ...options?.providers ?? []],
		platformProviders: INTERNAL_BROWSER_PLATFORM_PROVIDERS
	};
}
function provideProtractorTestingSupport() {
	return [...TESTABILITY_PROVIDERS];
}
function initDomAdapter() {
	BrowserDomAdapter.makeCurrent();
}
function errorHandler() {
	return new ErrorHandler();
}
function _document() {
	setDocument(document);
	return document;
}
var INTERNAL_BROWSER_PLATFORM_PROVIDERS = [
	{
		provide: PLATFORM_ID,
		useValue: PLATFORM_BROWSER_ID
	},
	{
		provide: PLATFORM_INITIALIZER,
		useValue: initDomAdapter,
		multi: true
	},
	{
		provide: DOCUMENT,
		useFactory: _document
	}
];
var platformBrowser = createPlatformFactory(platformCore, "browser", INTERNAL_BROWSER_PLATFORM_PROVIDERS);
var BROWSER_MODULE_PROVIDERS_MARKER = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "BrowserModule Providers Marker" : "");
var TESTABILITY_PROVIDERS = [
	{
		provide: TESTABILITY_GETTER,
		useClass: BrowserGetTestability
	},
	{
		provide: TESTABILITY,
		useClass: Testability
	},
	{
		provide: Testability,
		useClass: Testability
	}
];
var BROWSER_MODULE_PROVIDERS = [
	{
		provide: INJECTOR_SCOPE,
		useValue: "root"
	},
	{
		provide: ErrorHandler,
		useFactory: errorHandler
	},
	{
		provide: EVENT_MANAGER_PLUGINS,
		useClass: DomEventsPlugin,
		multi: true
	},
	{
		provide: EVENT_MANAGER_PLUGINS,
		useClass: KeyEventsPlugin,
		multi: true
	},
	DomRendererFactory2,
	SharedStylesHost,
	EventManager,
	{
		provide: RendererFactory2,
		useExisting: DomRendererFactory2
	},
	{
		provide: XhrFactory,
		useClass: BrowserXhr
	},
	typeof ngDevMode === "undefined" || ngDevMode ? {
		provide: BROWSER_MODULE_PROVIDERS_MARKER,
		useValue: true
	} : []
];
var BrowserModule = class BrowserModule {
	constructor() {
		if (typeof ngDevMode === "undefined" || ngDevMode) {
			if (inject(BROWSER_MODULE_PROVIDERS_MARKER, {
				optional: true,
				skipSelf: true
			})) throw new RuntimeError(5100, "Providers from the `BrowserModule` have already been loaded. If you need access to common directives such as NgIf and NgFor, import the `CommonModule` instead.");
		}
	}
	static ɵfac = function BrowserModule_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || BrowserModule)();
	};
	static ɵmod = /* @__PURE__ */ ɵɵdefineNgModule({
		type: BrowserModule,
		exports: [CommonModule, ApplicationModule]
	});
	static ɵinj = /* @__PURE__ */ ɵɵdefineInjector({
		providers: [...BROWSER_MODULE_PROVIDERS, ...TESTABILITY_PROVIDERS],
		imports: [CommonModule, ApplicationModule]
	});
};
(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrowserModule, [{
	type: NgModule,
	args: [{
		providers: [...BROWSER_MODULE_PROVIDERS, ...TESTABILITY_PROVIDERS],
		exports: [CommonModule, ApplicationModule]
	}]
}], () => [], null);
//#endregion
//#region node_modules/@angular/common/fesm2022/_module-chunk.mjs
/**
* @license Angular v21.2.7
* (c) 2010-2026 Google LLC. https://angular.dev/
* License: MIT
*/
var HttpHeaders = class HttpHeaders {
	headers;
	normalizedNames = /* @__PURE__ */ new Map();
	lazyInit;
	lazyUpdate = null;
	constructor(headers) {
		if (!headers) this.headers = /* @__PURE__ */ new Map();
		else if (typeof headers === "string") this.lazyInit = () => {
			this.headers = /* @__PURE__ */ new Map();
			headers.split("\n").forEach((line) => {
				const index = line.indexOf(":");
				if (index > 0) {
					const name = line.slice(0, index);
					const value = line.slice(index + 1).trim();
					this.addHeaderEntry(name, value);
				}
			});
		};
		else if (typeof Headers !== "undefined" && headers instanceof Headers) {
			this.headers = /* @__PURE__ */ new Map();
			headers.forEach((value, name) => {
				this.addHeaderEntry(name, value);
			});
		} else this.lazyInit = () => {
			if (typeof ngDevMode === "undefined" || ngDevMode) assertValidHeaders(headers);
			this.headers = /* @__PURE__ */ new Map();
			Object.entries(headers).forEach(([name, values]) => {
				this.setHeaderEntries(name, values);
			});
		};
	}
	has(name) {
		this.init();
		return this.headers.has(name.toLowerCase());
	}
	get(name) {
		this.init();
		const values = this.headers.get(name.toLowerCase());
		return values && values.length > 0 ? values[0] : null;
	}
	keys() {
		this.init();
		return Array.from(this.normalizedNames.values());
	}
	getAll(name) {
		this.init();
		return this.headers.get(name.toLowerCase()) || null;
	}
	append(name, value) {
		return this.clone({
			name,
			value,
			op: "a"
		});
	}
	set(name, value) {
		return this.clone({
			name,
			value,
			op: "s"
		});
	}
	delete(name, value) {
		return this.clone({
			name,
			value,
			op: "d"
		});
	}
	maybeSetNormalizedName(name, lcName) {
		if (!this.normalizedNames.has(lcName)) this.normalizedNames.set(lcName, name);
	}
	init() {
		if (!!this.lazyInit) {
			if (this.lazyInit instanceof HttpHeaders) this.copyFrom(this.lazyInit);
			else this.lazyInit();
			this.lazyInit = null;
			if (!!this.lazyUpdate) {
				this.lazyUpdate.forEach((update) => this.applyUpdate(update));
				this.lazyUpdate = null;
			}
		}
	}
	copyFrom(other) {
		other.init();
		Array.from(other.headers.keys()).forEach((key) => {
			this.headers.set(key, other.headers.get(key));
			this.normalizedNames.set(key, other.normalizedNames.get(key));
		});
	}
	clone(update) {
		const clone = new HttpHeaders();
		clone.lazyInit = !!this.lazyInit && this.lazyInit instanceof HttpHeaders ? this.lazyInit : this;
		clone.lazyUpdate = (this.lazyUpdate || []).concat([update]);
		return clone;
	}
	applyUpdate(update) {
		const key = update.name.toLowerCase();
		switch (update.op) {
			case "a":
			case "s":
				let value = update.value;
				if (typeof value === "string") value = [value];
				if (value.length === 0) return;
				this.maybeSetNormalizedName(update.name, key);
				const base = (update.op === "a" ? this.headers.get(key) : void 0) || [];
				base.push(...value);
				this.headers.set(key, base);
				break;
			case "d":
				const toDelete = update.value;
				if (!toDelete) {
					this.headers.delete(key);
					this.normalizedNames.delete(key);
				} else {
					let existing = this.headers.get(key);
					if (!existing) return;
					existing = existing.filter((value) => toDelete.indexOf(value) === -1);
					if (existing.length === 0) {
						this.headers.delete(key);
						this.normalizedNames.delete(key);
					} else this.headers.set(key, existing);
				}
				break;
		}
	}
	addHeaderEntry(name, value) {
		const key = name.toLowerCase();
		this.maybeSetNormalizedName(name, key);
		if (this.headers.has(key)) this.headers.get(key).push(value);
		else this.headers.set(key, [value]);
	}
	setHeaderEntries(name, values) {
		const headerValues = (Array.isArray(values) ? values : [values]).map((value) => value.toString());
		const key = name.toLowerCase();
		this.headers.set(key, headerValues);
		this.maybeSetNormalizedName(name, key);
	}
	forEach(fn) {
		this.init();
		Array.from(this.normalizedNames.keys()).forEach((key) => fn(this.normalizedNames.get(key), this.headers.get(key)));
	}
};
function assertValidHeaders(headers) {
	for (const [key, value] of Object.entries(headers)) if (!(typeof value === "string" || typeof value === "number") && !Array.isArray(value)) throw new Error(`Unexpected value of the \`${key}\` header provided. Expecting either a string, a number or an array, but got: \`${value}\`.`);
}
var HttpContext = class {
	map = /* @__PURE__ */ new Map();
	set(token, value) {
		this.map.set(token, value);
		return this;
	}
	get(token) {
		if (!this.map.has(token)) this.map.set(token, token.defaultValue());
		return this.map.get(token);
	}
	delete(token) {
		this.map.delete(token);
		return this;
	}
	has(token) {
		return this.map.has(token);
	}
	keys() {
		return this.map.keys();
	}
};
var HttpUrlEncodingCodec = class {
	encodeKey(key) {
		return standardEncoding(key);
	}
	encodeValue(value) {
		return standardEncoding(value);
	}
	decodeKey(key) {
		return decodeURIComponent(key);
	}
	decodeValue(value) {
		return decodeURIComponent(value);
	}
};
function paramParser(rawParams, codec) {
	const map = /* @__PURE__ */ new Map();
	if (rawParams.length > 0) rawParams.replace(/^\?/, "").split("&").forEach((param) => {
		const eqIdx = param.indexOf("=");
		const [key, val] = eqIdx == -1 ? [codec.decodeKey(param), ""] : [codec.decodeKey(param.slice(0, eqIdx)), codec.decodeValue(param.slice(eqIdx + 1))];
		const list = map.get(key) || [];
		list.push(val);
		map.set(key, list);
	});
	return map;
}
var STANDARD_ENCODING_REGEX = /%(\d[a-f0-9])/gi;
var STANDARD_ENCODING_REPLACEMENTS = {
	"40": "@",
	"3A": ":",
	"24": "$",
	"2C": ",",
	"3B": ";",
	"3D": "=",
	"3F": "?",
	"2F": "/"
};
function standardEncoding(v) {
	return encodeURIComponent(v).replace(STANDARD_ENCODING_REGEX, (s, t) => STANDARD_ENCODING_REPLACEMENTS[t] ?? s);
}
function valueToString(value) {
	return `${value}`;
}
var HttpParams = class HttpParams {
	map;
	encoder;
	updates = null;
	cloneFrom = null;
	constructor(options = {}) {
		this.encoder = options.encoder || new HttpUrlEncodingCodec();
		if (options.fromString) {
			if (options.fromObject) throw new RuntimeError(2805, ngDevMode && "Cannot specify both fromString and fromObject.");
			this.map = paramParser(options.fromString, this.encoder);
		} else if (!!options.fromObject) {
			this.map = /* @__PURE__ */ new Map();
			Object.keys(options.fromObject).forEach((key) => {
				const value = options.fromObject[key];
				const values = Array.isArray(value) ? value.map(valueToString) : [valueToString(value)];
				this.map.set(key, values);
			});
		} else this.map = null;
	}
	has(param) {
		this.init();
		return this.map.has(param);
	}
	get(param) {
		this.init();
		const res = this.map.get(param);
		return !!res ? res[0] : null;
	}
	getAll(param) {
		this.init();
		return this.map.get(param) || null;
	}
	keys() {
		this.init();
		return Array.from(this.map.keys());
	}
	append(param, value) {
		return this.clone({
			param,
			value,
			op: "a"
		});
	}
	appendAll(params) {
		const updates = [];
		Object.keys(params).forEach((param) => {
			const value = params[param];
			if (Array.isArray(value)) value.forEach((_value) => {
				updates.push({
					param,
					value: _value,
					op: "a"
				});
			});
			else updates.push({
				param,
				value,
				op: "a"
			});
		});
		return this.clone(updates);
	}
	set(param, value) {
		return this.clone({
			param,
			value,
			op: "s"
		});
	}
	delete(param, value) {
		return this.clone({
			param,
			value,
			op: "d"
		});
	}
	toString() {
		this.init();
		return this.keys().map((key) => {
			const eKey = this.encoder.encodeKey(key);
			return this.map.get(key).map((value) => eKey + "=" + this.encoder.encodeValue(value)).join("&");
		}).filter((param) => param !== "").join("&");
	}
	clone(update) {
		const clone = new HttpParams({ encoder: this.encoder });
		clone.cloneFrom = this.cloneFrom || this;
		clone.updates = (this.updates || []).concat(update);
		return clone;
	}
	init() {
		if (this.map === null) this.map = /* @__PURE__ */ new Map();
		if (this.cloneFrom !== null) {
			this.cloneFrom.init();
			this.cloneFrom.keys().forEach((key) => this.map.set(key, this.cloneFrom.map.get(key)));
			this.updates.forEach((update) => {
				switch (update.op) {
					case "a":
					case "s":
						const base = (update.op === "a" ? this.map.get(update.param) : void 0) || [];
						base.push(valueToString(update.value));
						this.map.set(update.param, base);
						break;
					case "d": if (update.value !== void 0) {
						let base = this.map.get(update.param) || [];
						const idx = base.indexOf(valueToString(update.value));
						if (idx !== -1) base.splice(idx, 1);
						if (base.length > 0) this.map.set(update.param, base);
						else this.map.delete(update.param);
					} else {
						this.map.delete(update.param);
						break;
					}
				}
			});
			this.cloneFrom = this.updates = null;
		}
	}
};
function mightHaveBody(method) {
	switch (method) {
		case "DELETE":
		case "GET":
		case "HEAD":
		case "OPTIONS":
		case "JSONP": return false;
		default: return true;
	}
}
function isArrayBuffer(value) {
	return typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer;
}
function isBlob(value) {
	return typeof Blob !== "undefined" && value instanceof Blob;
}
function isFormData(value) {
	return typeof FormData !== "undefined" && value instanceof FormData;
}
function isUrlSearchParams(value) {
	return typeof URLSearchParams !== "undefined" && value instanceof URLSearchParams;
}
var CONTENT_TYPE_HEADER = "Content-Type";
var ACCEPT_HEADER = "Accept";
var TEXT_CONTENT_TYPE = "text/plain";
var JSON_CONTENT_TYPE = "application/json";
var ACCEPT_HEADER_VALUE = `${JSON_CONTENT_TYPE}, ${TEXT_CONTENT_TYPE}, */*`;
var HttpRequest = class HttpRequest {
	url;
	body = null;
	headers;
	context;
	reportProgress = false;
	withCredentials = false;
	credentials;
	keepalive = false;
	cache;
	priority;
	mode;
	redirect;
	referrer;
	integrity;
	referrerPolicy;
	responseType = "json";
	method;
	params;
	urlWithParams;
	transferCache;
	timeout;
	constructor(method, url, third, fourth) {
		this.url = url;
		this.method = method.toUpperCase();
		let options;
		if (mightHaveBody(this.method) || !!fourth) {
			this.body = third !== void 0 ? third : null;
			options = fourth;
		} else options = third;
		if (options) {
			this.reportProgress = !!options.reportProgress;
			this.withCredentials = !!options.withCredentials;
			this.keepalive = !!options.keepalive;
			if (!!options.responseType) this.responseType = options.responseType;
			if (options.headers) this.headers = options.headers;
			if (options.context) this.context = options.context;
			if (options.params) this.params = options.params;
			if (options.priority) this.priority = options.priority;
			if (options.cache) this.cache = options.cache;
			if (options.credentials) this.credentials = options.credentials;
			if (typeof options.timeout === "number") {
				if (options.timeout < 1 || !Number.isInteger(options.timeout)) throw new RuntimeError(2822, ngDevMode ? "`timeout` must be a positive integer value" : "");
				this.timeout = options.timeout;
			}
			if (options.mode) this.mode = options.mode;
			if (options.redirect) this.redirect = options.redirect;
			if (options.integrity) this.integrity = options.integrity;
			if (options.referrer) this.referrer = options.referrer;
			if (options.referrerPolicy) this.referrerPolicy = options.referrerPolicy;
			this.transferCache = options.transferCache;
		}
		this.headers ??= new HttpHeaders();
		this.context ??= new HttpContext();
		if (!this.params) {
			this.params = new HttpParams();
			this.urlWithParams = url;
		} else {
			const params = this.params.toString();
			if (params.length === 0) this.urlWithParams = url;
			else {
				const qIdx = url.indexOf("?");
				this.urlWithParams = url + (qIdx === -1 ? "?" : qIdx < url.length - 1 ? "&" : "") + params;
			}
		}
	}
	serializeBody() {
		if (this.body === null) return null;
		if (typeof this.body === "string" || isArrayBuffer(this.body) || isBlob(this.body) || isFormData(this.body) || isUrlSearchParams(this.body)) return this.body;
		if (this.body instanceof HttpParams) return this.body.toString();
		if (typeof this.body === "object" || typeof this.body === "boolean" || Array.isArray(this.body)) return JSON.stringify(this.body);
		return this.body.toString();
	}
	detectContentTypeHeader() {
		if (this.body === null) return null;
		if (isFormData(this.body)) return null;
		if (isBlob(this.body)) return this.body.type || null;
		if (isArrayBuffer(this.body)) return null;
		if (typeof this.body === "string") return TEXT_CONTENT_TYPE;
		if (this.body instanceof HttpParams) return "application/x-www-form-urlencoded;charset=UTF-8";
		if (typeof this.body === "object" || typeof this.body === "number" || typeof this.body === "boolean") return JSON_CONTENT_TYPE;
		return null;
	}
	clone(update = {}) {
		const method = update.method || this.method;
		const url = update.url || this.url;
		const responseType = update.responseType || this.responseType;
		const keepalive = update.keepalive ?? this.keepalive;
		const priority = update.priority || this.priority;
		const cache = update.cache || this.cache;
		const mode = update.mode || this.mode;
		const redirect = update.redirect || this.redirect;
		const credentials = update.credentials || this.credentials;
		const referrer = update.referrer || this.referrer;
		const integrity = update.integrity || this.integrity;
		const referrerPolicy = update.referrerPolicy || this.referrerPolicy;
		const transferCache = update.transferCache ?? this.transferCache;
		const timeout = update.timeout ?? this.timeout;
		const body = update.body !== void 0 ? update.body : this.body;
		const withCredentials = update.withCredentials ?? this.withCredentials;
		const reportProgress = update.reportProgress ?? this.reportProgress;
		let headers = update.headers || this.headers;
		let params = update.params || this.params;
		const context = update.context ?? this.context;
		if (update.setHeaders !== void 0) headers = Object.keys(update.setHeaders).reduce((headers, name) => headers.set(name, update.setHeaders[name]), headers);
		if (update.setParams) params = Object.keys(update.setParams).reduce((params, param) => params.set(param, update.setParams[param]), params);
		return new HttpRequest(method, url, body, {
			params,
			headers,
			context,
			reportProgress,
			responseType,
			withCredentials,
			transferCache,
			keepalive,
			cache,
			priority,
			timeout,
			mode,
			redirect,
			credentials,
			referrer,
			integrity,
			referrerPolicy
		});
	}
};
var HttpEventType;
(function(HttpEventType) {
	HttpEventType[HttpEventType["Sent"] = 0] = "Sent";
	HttpEventType[HttpEventType["UploadProgress"] = 1] = "UploadProgress";
	HttpEventType[HttpEventType["ResponseHeader"] = 2] = "ResponseHeader";
	HttpEventType[HttpEventType["DownloadProgress"] = 3] = "DownloadProgress";
	HttpEventType[HttpEventType["Response"] = 4] = "Response";
	HttpEventType[HttpEventType["User"] = 5] = "User";
})(HttpEventType || (HttpEventType = {}));
var HttpResponseBase = class {
	headers;
	status;
	statusText;
	url;
	ok;
	type;
	redirected;
	responseType;
	constructor(init, defaultStatus = 200, defaultStatusText = "OK") {
		this.headers = init.headers || new HttpHeaders();
		this.status = init.status !== void 0 ? init.status : defaultStatus;
		this.statusText = init.statusText || defaultStatusText;
		this.url = init.url || null;
		this.redirected = init.redirected;
		this.responseType = init.responseType;
		this.ok = this.status >= 200 && this.status < 300;
	}
};
var HttpHeaderResponse = class HttpHeaderResponse extends HttpResponseBase {
	constructor(init = {}) {
		super(init);
	}
	type = HttpEventType.ResponseHeader;
	clone(update = {}) {
		return new HttpHeaderResponse({
			headers: update.headers || this.headers,
			status: update.status !== void 0 ? update.status : this.status,
			statusText: update.statusText || this.statusText,
			url: update.url || this.url || void 0
		});
	}
};
var HttpResponse = class HttpResponse extends HttpResponseBase {
	body;
	constructor(init = {}) {
		super(init);
		this.body = init.body !== void 0 ? init.body : null;
	}
	type = HttpEventType.Response;
	clone(update = {}) {
		return new HttpResponse({
			body: update.body !== void 0 ? update.body : this.body,
			headers: update.headers || this.headers,
			status: update.status !== void 0 ? update.status : this.status,
			statusText: update.statusText || this.statusText,
			url: update.url || this.url || void 0,
			redirected: update.redirected ?? this.redirected,
			responseType: update.responseType ?? this.responseType
		});
	}
};
var HttpErrorResponse = class extends HttpResponseBase {
	name = "HttpErrorResponse";
	message;
	error;
	ok = false;
	constructor(init) {
		super(init, 0, "Unknown Error");
		if (this.status >= 200 && this.status < 300) this.message = `Http failure during parsing for ${init.url || "(unknown url)"}`;
		else this.message = `Http failure response for ${init.url || "(unknown url)"}: ${init.status} ${init.statusText}`;
		this.error = init.error || null;
	}
};
var HTTP_STATUS_CODE_OK = 200;
var HTTP_STATUS_CODE_NO_CONTENT = 204;
var HttpStatusCode;
(function(HttpStatusCode) {
	HttpStatusCode[HttpStatusCode["Continue"] = 100] = "Continue";
	HttpStatusCode[HttpStatusCode["SwitchingProtocols"] = 101] = "SwitchingProtocols";
	HttpStatusCode[HttpStatusCode["Processing"] = 102] = "Processing";
	HttpStatusCode[HttpStatusCode["EarlyHints"] = 103] = "EarlyHints";
	HttpStatusCode[HttpStatusCode["Ok"] = 200] = "Ok";
	HttpStatusCode[HttpStatusCode["Created"] = 201] = "Created";
	HttpStatusCode[HttpStatusCode["Accepted"] = 202] = "Accepted";
	HttpStatusCode[HttpStatusCode["NonAuthoritativeInformation"] = 203] = "NonAuthoritativeInformation";
	HttpStatusCode[HttpStatusCode["NoContent"] = 204] = "NoContent";
	HttpStatusCode[HttpStatusCode["ResetContent"] = 205] = "ResetContent";
	HttpStatusCode[HttpStatusCode["PartialContent"] = 206] = "PartialContent";
	HttpStatusCode[HttpStatusCode["MultiStatus"] = 207] = "MultiStatus";
	HttpStatusCode[HttpStatusCode["AlreadyReported"] = 208] = "AlreadyReported";
	HttpStatusCode[HttpStatusCode["ImUsed"] = 226] = "ImUsed";
	HttpStatusCode[HttpStatusCode["MultipleChoices"] = 300] = "MultipleChoices";
	HttpStatusCode[HttpStatusCode["MovedPermanently"] = 301] = "MovedPermanently";
	HttpStatusCode[HttpStatusCode["Found"] = 302] = "Found";
	HttpStatusCode[HttpStatusCode["SeeOther"] = 303] = "SeeOther";
	HttpStatusCode[HttpStatusCode["NotModified"] = 304] = "NotModified";
	HttpStatusCode[HttpStatusCode["UseProxy"] = 305] = "UseProxy";
	HttpStatusCode[HttpStatusCode["Unused"] = 306] = "Unused";
	HttpStatusCode[HttpStatusCode["TemporaryRedirect"] = 307] = "TemporaryRedirect";
	HttpStatusCode[HttpStatusCode["PermanentRedirect"] = 308] = "PermanentRedirect";
	HttpStatusCode[HttpStatusCode["BadRequest"] = 400] = "BadRequest";
	HttpStatusCode[HttpStatusCode["Unauthorized"] = 401] = "Unauthorized";
	HttpStatusCode[HttpStatusCode["PaymentRequired"] = 402] = "PaymentRequired";
	HttpStatusCode[HttpStatusCode["Forbidden"] = 403] = "Forbidden";
	HttpStatusCode[HttpStatusCode["NotFound"] = 404] = "NotFound";
	HttpStatusCode[HttpStatusCode["MethodNotAllowed"] = 405] = "MethodNotAllowed";
	HttpStatusCode[HttpStatusCode["NotAcceptable"] = 406] = "NotAcceptable";
	HttpStatusCode[HttpStatusCode["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
	HttpStatusCode[HttpStatusCode["RequestTimeout"] = 408] = "RequestTimeout";
	HttpStatusCode[HttpStatusCode["Conflict"] = 409] = "Conflict";
	HttpStatusCode[HttpStatusCode["Gone"] = 410] = "Gone";
	HttpStatusCode[HttpStatusCode["LengthRequired"] = 411] = "LengthRequired";
	HttpStatusCode[HttpStatusCode["PreconditionFailed"] = 412] = "PreconditionFailed";
	HttpStatusCode[HttpStatusCode["PayloadTooLarge"] = 413] = "PayloadTooLarge";
	HttpStatusCode[HttpStatusCode["UriTooLong"] = 414] = "UriTooLong";
	HttpStatusCode[HttpStatusCode["UnsupportedMediaType"] = 415] = "UnsupportedMediaType";
	HttpStatusCode[HttpStatusCode["RangeNotSatisfiable"] = 416] = "RangeNotSatisfiable";
	HttpStatusCode[HttpStatusCode["ExpectationFailed"] = 417] = "ExpectationFailed";
	HttpStatusCode[HttpStatusCode["ImATeapot"] = 418] = "ImATeapot";
	HttpStatusCode[HttpStatusCode["MisdirectedRequest"] = 421] = "MisdirectedRequest";
	HttpStatusCode[HttpStatusCode["UnprocessableEntity"] = 422] = "UnprocessableEntity";
	HttpStatusCode[HttpStatusCode["Locked"] = 423] = "Locked";
	HttpStatusCode[HttpStatusCode["FailedDependency"] = 424] = "FailedDependency";
	HttpStatusCode[HttpStatusCode["TooEarly"] = 425] = "TooEarly";
	HttpStatusCode[HttpStatusCode["UpgradeRequired"] = 426] = "UpgradeRequired";
	HttpStatusCode[HttpStatusCode["PreconditionRequired"] = 428] = "PreconditionRequired";
	HttpStatusCode[HttpStatusCode["TooManyRequests"] = 429] = "TooManyRequests";
	HttpStatusCode[HttpStatusCode["RequestHeaderFieldsTooLarge"] = 431] = "RequestHeaderFieldsTooLarge";
	HttpStatusCode[HttpStatusCode["UnavailableForLegalReasons"] = 451] = "UnavailableForLegalReasons";
	HttpStatusCode[HttpStatusCode["InternalServerError"] = 500] = "InternalServerError";
	HttpStatusCode[HttpStatusCode["NotImplemented"] = 501] = "NotImplemented";
	HttpStatusCode[HttpStatusCode["BadGateway"] = 502] = "BadGateway";
	HttpStatusCode[HttpStatusCode["ServiceUnavailable"] = 503] = "ServiceUnavailable";
	HttpStatusCode[HttpStatusCode["GatewayTimeout"] = 504] = "GatewayTimeout";
	HttpStatusCode[HttpStatusCode["HttpVersionNotSupported"] = 505] = "HttpVersionNotSupported";
	HttpStatusCode[HttpStatusCode["VariantAlsoNegotiates"] = 506] = "VariantAlsoNegotiates";
	HttpStatusCode[HttpStatusCode["InsufficientStorage"] = 507] = "InsufficientStorage";
	HttpStatusCode[HttpStatusCode["LoopDetected"] = 508] = "LoopDetected";
	HttpStatusCode[HttpStatusCode["NotExtended"] = 510] = "NotExtended";
	HttpStatusCode[HttpStatusCode["NetworkAuthenticationRequired"] = 511] = "NetworkAuthenticationRequired";
})(HttpStatusCode || (HttpStatusCode = {}));
var XSSI_PREFIX$1 = /^\)\]\}',?\n/;
var FETCH_BACKEND = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "FETCH_BACKEND" : "");
var FetchBackend = class FetchBackend {
	fetchImpl = inject(FetchFactory, { optional: true })?.fetch ?? ((...args) => globalThis.fetch(...args));
	ngZone = inject(NgZone);
	destroyRef = inject(DestroyRef);
	handle(request) {
		return new Observable((observer) => {
			const aborter = new AbortController();
			this.doRequest(request, aborter.signal, observer).then(noop, (error) => observer.error(new HttpErrorResponse({ error })));
			let timeoutId;
			if (request.timeout) timeoutId = this.ngZone.runOutsideAngular(() => setTimeout(() => {
				if (!aborter.signal.aborted) aborter.abort(new DOMException("signal timed out", "TimeoutError"));
			}, request.timeout));
			return () => {
				if (timeoutId !== void 0) clearTimeout(timeoutId);
				aborter.abort();
			};
		});
	}
	async doRequest(request, signal, observer) {
		const init = this.createRequestInit(request);
		let response;
		try {
			const fetchPromise = this.ngZone.runOutsideAngular(() => this.fetchImpl(request.urlWithParams, {
				signal,
				...init
			}));
			silenceSuperfluousUnhandledPromiseRejection(fetchPromise);
			observer.next({ type: HttpEventType.Sent });
			response = await fetchPromise;
		} catch (error) {
			observer.error(new HttpErrorResponse({
				error,
				status: error.status ?? 0,
				statusText: error.statusText,
				url: request.urlWithParams,
				headers: error.headers
			}));
			return;
		}
		const headers = new HttpHeaders(response.headers);
		const statusText = response.statusText;
		const url = response.url || request.urlWithParams;
		let status = response.status;
		let body = null;
		if (request.reportProgress) observer.next(new HttpHeaderResponse({
			headers,
			status,
			statusText,
			url
		}));
		if (response.body) {
			const contentLength = response.headers.get("content-length");
			const chunks = [];
			const reader = response.body.getReader();
			let receivedLength = 0;
			let decoder;
			let partialText;
			const reqZone = typeof Zone !== "undefined" && Zone.current;
			let canceled = false;
			await this.ngZone.runOutsideAngular(async () => {
				while (true) {
					if (this.destroyRef.destroyed) {
						await reader.cancel();
						canceled = true;
						break;
					}
					const { done, value } = await reader.read();
					if (done) break;
					chunks.push(value);
					receivedLength += value.length;
					if (request.reportProgress) {
						partialText = request.responseType === "text" ? (partialText ?? "") + (decoder ??= new TextDecoder()).decode(value, { stream: true }) : void 0;
						const reportProgress = () => observer.next({
							type: HttpEventType.DownloadProgress,
							total: contentLength ? +contentLength : void 0,
							loaded: receivedLength,
							partialText
						});
						reqZone ? reqZone.run(reportProgress) : reportProgress();
					}
				}
			});
			if (canceled) {
				observer.complete();
				return;
			}
			const chunksAll = this.concatChunks(chunks, receivedLength);
			try {
				const contentType = response.headers.get(CONTENT_TYPE_HEADER) ?? "";
				body = this.parseBody(request, chunksAll, contentType, status);
			} catch (error) {
				observer.error(new HttpErrorResponse({
					error,
					headers: new HttpHeaders(response.headers),
					status: response.status,
					statusText: response.statusText,
					url: response.url || request.urlWithParams
				}));
				return;
			}
		}
		if (status === 0) status = body ? HTTP_STATUS_CODE_OK : 0;
		const ok = status >= 200 && status < 300;
		const redirected = response.redirected;
		const responseType = response.type;
		if (ok) {
			observer.next(new HttpResponse({
				body,
				headers,
				status,
				statusText,
				url,
				redirected,
				responseType
			}));
			observer.complete();
		} else observer.error(new HttpErrorResponse({
			error: body,
			headers,
			status,
			statusText,
			url,
			redirected,
			responseType
		}));
	}
	parseBody(request, binContent, contentType, status) {
		switch (request.responseType) {
			case "json":
				const text = new TextDecoder().decode(binContent).replace(XSSI_PREFIX$1, "");
				if (text === "") return null;
				try {
					return JSON.parse(text);
				} catch (e) {
					if (status < 200 || status >= 300) return text;
					throw e;
				}
			case "text": return new TextDecoder().decode(binContent);
			case "blob": return new Blob([binContent], { type: contentType });
			case "arraybuffer": return binContent.buffer;
		}
	}
	createRequestInit(req) {
		const headers = {};
		let credentials;
		credentials = req.credentials;
		if (req.withCredentials) {
			(typeof ngDevMode === "undefined" || ngDevMode) && warningOptionsMessage(req);
			credentials = "include";
		}
		req.headers.forEach((name, values) => headers[name] = values.join(","));
		if (!req.headers.has(ACCEPT_HEADER)) headers[ACCEPT_HEADER] = ACCEPT_HEADER_VALUE;
		if (!req.headers.has(CONTENT_TYPE_HEADER)) {
			const detectedType = req.detectContentTypeHeader();
			if (detectedType !== null) headers[CONTENT_TYPE_HEADER] = detectedType;
		}
		return {
			body: req.serializeBody(),
			method: req.method,
			headers,
			credentials,
			keepalive: req.keepalive,
			cache: req.cache,
			priority: req.priority,
			mode: req.mode,
			redirect: req.redirect,
			referrer: req.referrer,
			integrity: req.integrity,
			referrerPolicy: req.referrerPolicy
		};
	}
	concatChunks(chunks, totalLength) {
		const chunksAll = new Uint8Array(totalLength);
		let position = 0;
		for (const chunk of chunks) {
			chunksAll.set(chunk, position);
			position += chunk.length;
		}
		return chunksAll;
	}
	static ɵfac = function FetchBackend_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || FetchBackend)();
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
		token: FetchBackend,
		factory: FetchBackend.ɵfac
	});
};
(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FetchBackend, [{ type: Injectable }], null, null);
var FetchFactory = class {};
function noop() {}
function warningOptionsMessage(req) {
	if (req.credentials && req.withCredentials) console.warn(formatRuntimeError(2819, `Angular detected that a \`HttpClient\` request has both \`withCredentials: true\` and \`credentials: '${req.credentials}'\` options. The \`withCredentials\` option is overriding the explicit \`credentials\` setting to 'include'. Consider removing \`withCredentials\` and using \`credentials: '${req.credentials}'\` directly for clarity.`));
}
function silenceSuperfluousUnhandledPromiseRejection(promise) {
	promise.then(noop, noop);
}
var XSSI_PREFIX = /^\)\]\}',?\n/;
function validateXhrCompatibility(req) {
	for (const { property, errorCode } of [
		{
			property: "keepalive",
			errorCode: 2813
		},
		{
			property: "cache",
			errorCode: 2814
		},
		{
			property: "priority",
			errorCode: 2815
		},
		{
			property: "mode",
			errorCode: 2816
		},
		{
			property: "redirect",
			errorCode: 2817
		},
		{
			property: "credentials",
			errorCode: 2818
		},
		{
			property: "integrity",
			errorCode: 2820
		},
		{
			property: "referrer",
			errorCode: 2821
		},
		{
			property: "referrerPolicy",
			errorCode: 2823
		}
	]) if (req[property]) console.warn(formatRuntimeError(errorCode, `Angular detected that a \`HttpClient\` request with the \`${property}\` option was sent using XHR, which does not support it. To use the \`${property}\` option, enable Fetch API support by passing \`withFetch()\` as an argument to \`provideHttpClient()\`.`));
}
var HttpXhrBackend = class HttpXhrBackend {
	xhrFactory;
	tracingService = inject(TracingService, { optional: true });
	constructor(xhrFactory) {
		this.xhrFactory = xhrFactory;
	}
	maybePropagateTrace(fn) {
		return this.tracingService?.propagate ? this.tracingService.propagate(fn) : fn;
	}
	handle(req) {
		if (req.method === "JSONP") throw new RuntimeError(-2800, (typeof ngDevMode === "undefined" || ngDevMode) && `Cannot make a JSONP request without JSONP support. To fix the problem, either add the \`withJsonpSupport()\` call (if \`provideHttpClient()\` is used) or import the \`HttpClientJsonpModule\` in the root NgModule.`);
		ngDevMode && validateXhrCompatibility(req);
		const xhrFactory = this.xhrFactory;
		return of(null).pipe(switchMap(() => {
			return new Observable((observer) => {
				const xhr = xhrFactory.build();
				xhr.open(req.method, req.urlWithParams);
				if (req.withCredentials) xhr.withCredentials = true;
				req.headers.forEach((name, values) => xhr.setRequestHeader(name, values.join(",")));
				if (!req.headers.has(ACCEPT_HEADER)) xhr.setRequestHeader(ACCEPT_HEADER, ACCEPT_HEADER_VALUE);
				if (!req.headers.has(CONTENT_TYPE_HEADER)) {
					const detectedType = req.detectContentTypeHeader();
					if (detectedType !== null) xhr.setRequestHeader(CONTENT_TYPE_HEADER, detectedType);
				}
				if (req.timeout) xhr.timeout = req.timeout;
				if (req.responseType) {
					const responseType = req.responseType.toLowerCase();
					xhr.responseType = responseType !== "json" ? responseType : "text";
				}
				const reqBody = req.serializeBody();
				let headerResponse = null;
				const partialFromXhr = () => {
					if (headerResponse !== null) return headerResponse;
					const statusText = xhr.statusText || "OK";
					const headers = new HttpHeaders(xhr.getAllResponseHeaders());
					const url = xhr.responseURL || req.url;
					headerResponse = new HttpHeaderResponse({
						headers,
						status: xhr.status,
						statusText,
						url
					});
					return headerResponse;
				};
				const onLoad = this.maybePropagateTrace(() => {
					let { headers, status, statusText, url } = partialFromXhr();
					let body = null;
					if (status !== HTTP_STATUS_CODE_NO_CONTENT) body = typeof xhr.response === "undefined" ? xhr.responseText : xhr.response;
					if (status === 0) status = !!body ? HTTP_STATUS_CODE_OK : 0;
					let ok = status >= 200 && status < 300;
					if (req.responseType === "json" && typeof body === "string") {
						const originalBody = body;
						body = body.replace(XSSI_PREFIX, "");
						try {
							body = body !== "" ? JSON.parse(body) : null;
						} catch (error) {
							body = originalBody;
							if (ok) {
								ok = false;
								body = {
									error,
									text: body
								};
							}
						}
					}
					if (ok) {
						observer.next(new HttpResponse({
							body,
							headers,
							status,
							statusText,
							url: url || void 0
						}));
						observer.complete();
					} else observer.error(new HttpErrorResponse({
						error: body,
						headers,
						status,
						statusText,
						url: url || void 0
					}));
				});
				const onError = this.maybePropagateTrace((error) => {
					const { url } = partialFromXhr();
					const res = new HttpErrorResponse({
						error,
						status: xhr.status || 0,
						statusText: xhr.statusText || "Unknown Error",
						url: url || void 0
					});
					observer.error(res);
				});
				let onTimeout = onError;
				if (req.timeout) onTimeout = this.maybePropagateTrace((_) => {
					const { url } = partialFromXhr();
					const res = new HttpErrorResponse({
						error: new DOMException("Request timed out", "TimeoutError"),
						status: xhr.status || 0,
						statusText: xhr.statusText || "Request timeout",
						url: url || void 0
					});
					observer.error(res);
				});
				let sentHeaders = false;
				const onDownProgress = this.maybePropagateTrace((event) => {
					if (!sentHeaders) {
						observer.next(partialFromXhr());
						sentHeaders = true;
					}
					let progressEvent = {
						type: HttpEventType.DownloadProgress,
						loaded: event.loaded
					};
					if (event.lengthComputable) progressEvent.total = event.total;
					if (req.responseType === "text" && !!xhr.responseText) progressEvent.partialText = xhr.responseText;
					observer.next(progressEvent);
				});
				const onUpProgress = this.maybePropagateTrace((event) => {
					let progress = {
						type: HttpEventType.UploadProgress,
						loaded: event.loaded
					};
					if (event.lengthComputable) progress.total = event.total;
					observer.next(progress);
				});
				xhr.addEventListener("load", onLoad);
				xhr.addEventListener("error", onError);
				xhr.addEventListener("timeout", onTimeout);
				xhr.addEventListener("abort", onError);
				if (req.reportProgress) {
					xhr.addEventListener("progress", onDownProgress);
					if (reqBody !== null && xhr.upload) xhr.upload.addEventListener("progress", onUpProgress);
				}
				xhr.send(reqBody);
				observer.next({ type: HttpEventType.Sent });
				return () => {
					xhr.removeEventListener("error", onError);
					xhr.removeEventListener("abort", onError);
					xhr.removeEventListener("load", onLoad);
					xhr.removeEventListener("timeout", onTimeout);
					if (req.reportProgress) {
						xhr.removeEventListener("progress", onDownProgress);
						if (reqBody !== null && xhr.upload) xhr.upload.removeEventListener("progress", onUpProgress);
					}
					if (xhr.readyState !== xhr.DONE) xhr.abort();
				};
			});
		}));
	}
	static ɵfac = function HttpXhrBackend_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || HttpXhrBackend)(ɵɵinject(XhrFactory));
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
		token: HttpXhrBackend,
		factory: HttpXhrBackend.ɵfac,
		providedIn: "root"
	});
};
(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HttpXhrBackend, [{
	type: Injectable,
	args: [{ providedIn: "root" }]
}], () => [{ type: XhrFactory }], null);
function interceptorChainEndFn(req, finalHandlerFn) {
	return finalHandlerFn(req);
}
function adaptLegacyInterceptorToChain(chainTailFn, interceptor) {
	return (initialRequest, finalHandlerFn) => interceptor.intercept(initialRequest, { handle: (downstreamRequest) => chainTailFn(downstreamRequest, finalHandlerFn) });
}
function chainedInterceptorFn(chainTailFn, interceptorFn, injector) {
	return (initialRequest, finalHandlerFn) => runInInjectionContext(injector, () => interceptorFn(initialRequest, (downstreamRequest) => chainTailFn(downstreamRequest, finalHandlerFn)));
}
var HTTP_INTERCEPTORS = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "HTTP_INTERCEPTORS" : "");
var HTTP_INTERCEPTOR_FNS = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "HTTP_INTERCEPTOR_FNS" : "", { factory: () => [] });
var HTTP_ROOT_INTERCEPTOR_FNS = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "HTTP_ROOT_INTERCEPTOR_FNS" : "");
var REQUESTS_CONTRIBUTE_TO_STABILITY = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "REQUESTS_CONTRIBUTE_TO_STABILITY" : "", { factory: () => true });
function legacyInterceptorFnFactory() {
	let chain = null;
	return (req, handler) => {
		if (chain === null) chain = (inject(HTTP_INTERCEPTORS, { optional: true }) ?? []).reduceRight(adaptLegacyInterceptorToChain, interceptorChainEndFn);
		const pendingTasks = inject(PendingTasks);
		if (inject(REQUESTS_CONTRIBUTE_TO_STABILITY)) {
			const removeTask = pendingTasks.add();
			return chain(req, handler).pipe(finalize(removeTask));
		} else return chain(req, handler);
	};
}
var HttpBackend = class HttpBackend {
	static ɵfac = function HttpBackend_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || HttpBackend)();
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
		token: HttpBackend,
		factory: function HttpBackend_Factory(__ngFactoryType__) {
			let __ngConditionalFactory__ = null;
			if (__ngFactoryType__) __ngConditionalFactory__ = new (__ngFactoryType__ || HttpBackend)();
			else __ngConditionalFactory__ = ɵɵinject(HttpXhrBackend);
			return __ngConditionalFactory__;
		},
		providedIn: "root"
	});
};
(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HttpBackend, [{
	type: Injectable,
	args: [{
		providedIn: "root",
		useExisting: HttpXhrBackend
	}]
}], null, null);
var HttpInterceptorHandler = class HttpInterceptorHandler {
	backend;
	injector;
	chain = null;
	pendingTasks = inject(PendingTasks);
	contributeToStability = inject(REQUESTS_CONTRIBUTE_TO_STABILITY);
	constructor(backend, injector) {
		this.backend = backend;
		this.injector = injector;
		if ((typeof ngDevMode === "undefined" || ngDevMode) && true) this.backend.isTestingBackend;
	}
	handle(initialRequest) {
		if (this.chain === null) this.chain = Array.from(new Set([...this.injector.get(HTTP_INTERCEPTOR_FNS), ...this.injector.get(HTTP_ROOT_INTERCEPTOR_FNS, [])])).reduceRight((nextSequencedFn, interceptorFn) => chainedInterceptorFn(nextSequencedFn, interceptorFn, this.injector), interceptorChainEndFn);
		if (this.contributeToStability) {
			const removeTask = this.pendingTasks.add();
			return this.chain(initialRequest, (downstreamRequest) => this.backend.handle(downstreamRequest)).pipe(finalize(removeTask));
		} else return this.chain(initialRequest, (downstreamRequest) => this.backend.handle(downstreamRequest));
	}
	static ɵfac = function HttpInterceptorHandler_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || HttpInterceptorHandler)(ɵɵinject(HttpBackend), ɵɵinject(EnvironmentInjector));
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
		token: HttpInterceptorHandler,
		factory: HttpInterceptorHandler.ɵfac,
		providedIn: "root"
	});
};
(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HttpInterceptorHandler, [{
	type: Injectable,
	args: [{ providedIn: "root" }]
}], () => [{ type: HttpBackend }, { type: EnvironmentInjector }], null);
var HttpHandler = class HttpHandler {
	static ɵfac = function HttpHandler_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || HttpHandler)();
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
		token: HttpHandler,
		factory: function HttpHandler_Factory(__ngFactoryType__) {
			let __ngConditionalFactory__ = null;
			if (__ngFactoryType__) __ngConditionalFactory__ = new (__ngFactoryType__ || HttpHandler)();
			else __ngConditionalFactory__ = ɵɵinject(HttpInterceptorHandler);
			return __ngConditionalFactory__;
		},
		providedIn: "root"
	});
};
(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HttpHandler, [{
	type: Injectable,
	args: [{
		providedIn: "root",
		useExisting: HttpInterceptorHandler
	}]
}], null, null);
function addBody(options, body) {
	return {
		body,
		headers: options.headers,
		context: options.context,
		observe: options.observe,
		params: options.params,
		reportProgress: options.reportProgress,
		responseType: options.responseType,
		withCredentials: options.withCredentials,
		credentials: options.credentials,
		transferCache: options.transferCache,
		timeout: options.timeout,
		keepalive: options.keepalive,
		priority: options.priority,
		cache: options.cache,
		mode: options.mode,
		redirect: options.redirect,
		integrity: options.integrity,
		referrer: options.referrer,
		referrerPolicy: options.referrerPolicy
	};
}
var HttpClient = class HttpClient {
	handler;
	constructor(handler) {
		this.handler = handler;
	}
	request(first, url, options = {}) {
		let req;
		if (first instanceof HttpRequest) req = first;
		else {
			let headers = void 0;
			if (options.headers instanceof HttpHeaders) headers = options.headers;
			else headers = new HttpHeaders(options.headers);
			let params = void 0;
			if (!!options.params) if (options.params instanceof HttpParams) params = options.params;
			else params = new HttpParams({ fromObject: options.params });
			req = new HttpRequest(first, url, options.body !== void 0 ? options.body : null, {
				headers,
				context: options.context,
				params,
				reportProgress: options.reportProgress,
				responseType: options.responseType || "json",
				withCredentials: options.withCredentials,
				transferCache: options.transferCache,
				keepalive: options.keepalive,
				priority: options.priority,
				cache: options.cache,
				mode: options.mode,
				redirect: options.redirect,
				credentials: options.credentials,
				referrer: options.referrer,
				referrerPolicy: options.referrerPolicy,
				integrity: options.integrity,
				timeout: options.timeout
			});
		}
		const events$ = of(req).pipe(concatMap((req) => this.handler.handle(req)));
		if (first instanceof HttpRequest || options.observe === "events") return events$;
		const res$ = events$.pipe(filter((event) => event instanceof HttpResponse));
		switch (options.observe || "body") {
			case "body": switch (req.responseType) {
				case "arraybuffer": return res$.pipe(map((res) => {
					if (res.body !== null && !(res.body instanceof ArrayBuffer)) throw new RuntimeError(2806, ngDevMode && "Response is not an ArrayBuffer.");
					return res.body;
				}));
				case "blob": return res$.pipe(map((res) => {
					if (res.body !== null && !(res.body instanceof Blob)) throw new RuntimeError(2807, ngDevMode && "Response is not a Blob.");
					return res.body;
				}));
				case "text": return res$.pipe(map((res) => {
					if (res.body !== null && typeof res.body !== "string") throw new RuntimeError(2808, ngDevMode && "Response is not a string.");
					return res.body;
				}));
				default: return res$.pipe(map((res) => res.body));
			}
			case "response": return res$;
			default: throw new RuntimeError(2809, ngDevMode && `Unreachable: unhandled observe type ${options.observe}}`);
		}
	}
	delete(url, options = {}) {
		return this.request("DELETE", url, options);
	}
	get(url, options = {}) {
		return this.request("GET", url, options);
	}
	head(url, options = {}) {
		return this.request("HEAD", url, options);
	}
	jsonp(url, callbackParam) {
		return this.request("JSONP", url, {
			params: new HttpParams().append(callbackParam, "JSONP_CALLBACK"),
			observe: "body",
			responseType: "json"
		});
	}
	options(url, options = {}) {
		return this.request("OPTIONS", url, options);
	}
	patch(url, body, options = {}) {
		return this.request("PATCH", url, addBody(options, body));
	}
	post(url, body, options = {}) {
		return this.request("POST", url, addBody(options, body));
	}
	put(url, body, options = {}) {
		return this.request("PUT", url, addBody(options, body));
	}
	static ɵfac = function HttpClient_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || HttpClient)(ɵɵinject(HttpHandler));
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
		token: HttpClient,
		factory: HttpClient.ɵfac,
		providedIn: "root"
	});
};
(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HttpClient, [{
	type: Injectable,
	args: [{ providedIn: "root" }]
}], () => [{ type: HttpHandler }], null);
var nextRequestId = 0;
var foreignDocument;
var JSONP_ERR_NO_CALLBACK = "JSONP injected script did not invoke callback.";
var JSONP_ERR_WRONG_METHOD = "JSONP requests must use JSONP request method.";
var JSONP_ERR_WRONG_RESPONSE_TYPE = "JSONP requests must use Json response type.";
var JSONP_ERR_HEADERS_NOT_SUPPORTED = "JSONP requests do not support headers.";
var JsonpCallbackContext = class {};
function jsonpCallbackContext() {
	if (typeof window === "object") return window;
	return {};
}
var JsonpClientBackend = class JsonpClientBackend {
	callbackMap;
	document;
	resolvedPromise = Promise.resolve();
	constructor(callbackMap, document) {
		this.callbackMap = callbackMap;
		this.document = document;
	}
	nextCallback() {
		return `ng_jsonp_callback_${nextRequestId++}`;
	}
	handle(req) {
		if (req.method !== "JSONP") throw new RuntimeError(2810, ngDevMode && JSONP_ERR_WRONG_METHOD);
		else if (req.responseType !== "json") throw new RuntimeError(2811, ngDevMode && JSONP_ERR_WRONG_RESPONSE_TYPE);
		if (req.headers.keys().length > 0) throw new RuntimeError(2812, ngDevMode && JSONP_ERR_HEADERS_NOT_SUPPORTED);
		return new Observable((observer) => {
			const callback = this.nextCallback();
			const url = req.urlWithParams.replace(/=JSONP_CALLBACK(&|$)/, `=${callback}$1`);
			const node = this.document.createElement("script");
			node.src = url;
			let body = null;
			let finished = false;
			this.callbackMap[callback] = (data) => {
				delete this.callbackMap[callback];
				body = data;
				finished = true;
			};
			const cleanup = () => {
				node.removeEventListener("load", onLoad);
				node.removeEventListener("error", onError);
				node.remove();
				delete this.callbackMap[callback];
			};
			const onLoad = () => {
				this.resolvedPromise.then(() => {
					cleanup();
					if (!finished) {
						observer.error(new HttpErrorResponse({
							url,
							status: 0,
							statusText: "JSONP Error",
							error: new Error(JSONP_ERR_NO_CALLBACK)
						}));
						return;
					}
					observer.next(new HttpResponse({
						body,
						status: HTTP_STATUS_CODE_OK,
						statusText: "OK",
						url
					}));
					observer.complete();
				});
			};
			const onError = (error) => {
				cleanup();
				observer.error(new HttpErrorResponse({
					error,
					status: 0,
					statusText: "JSONP Error",
					url
				}));
			};
			node.addEventListener("load", onLoad);
			node.addEventListener("error", onError);
			this.document.body.appendChild(node);
			observer.next({ type: HttpEventType.Sent });
			return () => {
				if (!finished) this.removeListeners(node);
				cleanup();
			};
		});
	}
	removeListeners(script) {
		foreignDocument ??= this.document.implementation.createHTMLDocument();
		foreignDocument.adoptNode(script);
	}
	static ɵfac = function JsonpClientBackend_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || JsonpClientBackend)(ɵɵinject(JsonpCallbackContext), ɵɵinject(DOCUMENT));
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
		token: JsonpClientBackend,
		factory: JsonpClientBackend.ɵfac
	});
};
(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(JsonpClientBackend, [{ type: Injectable }], () => [{ type: JsonpCallbackContext }, {
	type: void 0,
	decorators: [{
		type: Inject,
		args: [DOCUMENT]
	}]
}], null);
function jsonpInterceptorFn(req, next) {
	if (req.method === "JSONP") return inject(JsonpClientBackend).handle(req);
	return next(req);
}
var JsonpInterceptor = class JsonpInterceptor {
	injector;
	constructor(injector) {
		this.injector = injector;
	}
	intercept(initialRequest, next) {
		return runInInjectionContext(this.injector, () => jsonpInterceptorFn(initialRequest, (downstreamRequest) => next.handle(downstreamRequest)));
	}
	static ɵfac = function JsonpInterceptor_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || JsonpInterceptor)(ɵɵinject(EnvironmentInjector));
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
		token: JsonpInterceptor,
		factory: JsonpInterceptor.ɵfac
	});
};
(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(JsonpInterceptor, [{ type: Injectable }], () => [{ type: EnvironmentInjector }], null);
var XSRF_ENABLED = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "XSRF_ENABLED" : "", { factory: () => true });
var XSRF_DEFAULT_COOKIE_NAME = "XSRF-TOKEN";
var XSRF_COOKIE_NAME = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "XSRF_COOKIE_NAME" : "", { factory: () => XSRF_DEFAULT_COOKIE_NAME });
var XSRF_DEFAULT_HEADER_NAME = "X-XSRF-TOKEN";
var XSRF_HEADER_NAME = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "XSRF_HEADER_NAME" : "", { factory: () => XSRF_DEFAULT_HEADER_NAME });
var HttpXsrfCookieExtractor = class HttpXsrfCookieExtractor {
	cookieName = inject(XSRF_COOKIE_NAME);
	doc = inject(DOCUMENT);
	lastCookieString = "";
	lastToken = null;
	parseCount = 0;
	getToken() {
		const cookieString = this.doc.cookie || "";
		if (cookieString !== this.lastCookieString) {
			this.parseCount++;
			this.lastToken = parseCookieValue(cookieString, this.cookieName);
			this.lastCookieString = cookieString;
		}
		return this.lastToken;
	}
	static ɵfac = function HttpXsrfCookieExtractor_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || HttpXsrfCookieExtractor)();
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
		token: HttpXsrfCookieExtractor,
		factory: HttpXsrfCookieExtractor.ɵfac,
		providedIn: "root"
	});
};
(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HttpXsrfCookieExtractor, [{
	type: Injectable,
	args: [{ providedIn: "root" }]
}], null, null);
var HttpXsrfTokenExtractor = class HttpXsrfTokenExtractor {
	static ɵfac = function HttpXsrfTokenExtractor_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || HttpXsrfTokenExtractor)();
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
		token: HttpXsrfTokenExtractor,
		factory: function HttpXsrfTokenExtractor_Factory(__ngFactoryType__) {
			let __ngConditionalFactory__ = null;
			if (__ngFactoryType__) __ngConditionalFactory__ = new (__ngFactoryType__ || HttpXsrfTokenExtractor)();
			else __ngConditionalFactory__ = ɵɵinject(HttpXsrfCookieExtractor);
			return __ngConditionalFactory__;
		},
		providedIn: "root"
	});
};
(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HttpXsrfTokenExtractor, [{
	type: Injectable,
	args: [{
		providedIn: "root",
		useExisting: HttpXsrfCookieExtractor
	}]
}], null, null);
function xsrfInterceptorFn(req, next) {
	if (!inject(XSRF_ENABLED) || req.method === "GET" || req.method === "HEAD") return next(req);
	try {
		const locationHref = inject(PlatformLocation).href;
		const { origin: locationOrigin } = new URL(locationHref);
		const { origin: requestOrigin } = new URL(req.url, locationOrigin);
		if (locationOrigin !== requestOrigin) return next(req);
	} catch {
		return next(req);
	}
	const token = inject(HttpXsrfTokenExtractor).getToken();
	const headerName = inject(XSRF_HEADER_NAME);
	if (token != null && !req.headers.has(headerName)) req = req.clone({ headers: req.headers.set(headerName, token) });
	return next(req);
}
var HttpXsrfInterceptor = class HttpXsrfInterceptor {
	injector = inject(EnvironmentInjector);
	intercept(initialRequest, next) {
		return runInInjectionContext(this.injector, () => xsrfInterceptorFn(initialRequest, (downstreamRequest) => next.handle(downstreamRequest)));
	}
	static ɵfac = function HttpXsrfInterceptor_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || HttpXsrfInterceptor)();
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
		token: HttpXsrfInterceptor,
		factory: HttpXsrfInterceptor.ɵfac
	});
};
(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HttpXsrfInterceptor, [{ type: Injectable }], null, null);
var HttpFeatureKind;
(function(HttpFeatureKind) {
	HttpFeatureKind[HttpFeatureKind["Interceptors"] = 0] = "Interceptors";
	HttpFeatureKind[HttpFeatureKind["LegacyInterceptors"] = 1] = "LegacyInterceptors";
	HttpFeatureKind[HttpFeatureKind["CustomXsrfConfiguration"] = 2] = "CustomXsrfConfiguration";
	HttpFeatureKind[HttpFeatureKind["NoXsrfProtection"] = 3] = "NoXsrfProtection";
	HttpFeatureKind[HttpFeatureKind["JsonpSupport"] = 4] = "JsonpSupport";
	HttpFeatureKind[HttpFeatureKind["RequestsMadeViaParent"] = 5] = "RequestsMadeViaParent";
	HttpFeatureKind[HttpFeatureKind["Fetch"] = 6] = "Fetch";
})(HttpFeatureKind || (HttpFeatureKind = {}));
function makeHttpFeature(kind, providers) {
	return {
		ɵkind: kind,
		ɵproviders: providers
	};
}
function provideHttpClient(...features) {
	if (ngDevMode) {
		const featureKinds = new Set(features.map((f) => f.ɵkind));
		if (featureKinds.has(HttpFeatureKind.NoXsrfProtection) && featureKinds.has(HttpFeatureKind.CustomXsrfConfiguration)) throw new Error(ngDevMode ? `Configuration error: found both withXsrfConfiguration() and withNoXsrfProtection() in the same call to provideHttpClient(), which is a contradiction.` : "");
	}
	const providers = [
		HttpClient,
		HttpInterceptorHandler,
		{
			provide: HttpHandler,
			useExisting: HttpInterceptorHandler
		},
		{
			provide: HttpBackend,
			useFactory: () => {
				return inject(FETCH_BACKEND, { optional: true }) ?? inject(HttpXhrBackend);
			}
		},
		{
			provide: HTTP_INTERCEPTOR_FNS,
			useValue: xsrfInterceptorFn,
			multi: true
		}
	];
	for (const feature of features) providers.push(...feature.ɵproviders);
	return makeEnvironmentProviders(providers);
}
var LEGACY_INTERCEPTOR_FN = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "LEGACY_INTERCEPTOR_FN" : "");
function withInterceptorsFromDi() {
	return makeHttpFeature(HttpFeatureKind.LegacyInterceptors, [{
		provide: LEGACY_INTERCEPTOR_FN,
		useFactory: legacyInterceptorFnFactory
	}, {
		provide: HTTP_INTERCEPTOR_FNS,
		useExisting: LEGACY_INTERCEPTOR_FN,
		multi: true
	}]);
}
function withXsrfConfiguration({ cookieName, headerName }) {
	const providers = [];
	if (cookieName !== void 0) providers.push({
		provide: XSRF_COOKIE_NAME,
		useValue: cookieName
	});
	if (headerName !== void 0) providers.push({
		provide: XSRF_HEADER_NAME,
		useValue: headerName
	});
	return makeHttpFeature(HttpFeatureKind.CustomXsrfConfiguration, providers);
}
function withNoXsrfProtection() {
	return makeHttpFeature(HttpFeatureKind.NoXsrfProtection, [{
		provide: XSRF_ENABLED,
		useValue: false
	}]);
}
function withJsonpSupport() {
	return makeHttpFeature(HttpFeatureKind.JsonpSupport, [
		JsonpClientBackend,
		{
			provide: JsonpCallbackContext,
			useFactory: jsonpCallbackContext
		},
		{
			provide: HTTP_INTERCEPTOR_FNS,
			useValue: jsonpInterceptorFn,
			multi: true
		}
	]);
}
var HttpClientXsrfModule = class HttpClientXsrfModule {
	static disable() {
		return {
			ngModule: HttpClientXsrfModule,
			providers: [withNoXsrfProtection().ɵproviders]
		};
	}
	static withOptions(options = {}) {
		return {
			ngModule: HttpClientXsrfModule,
			providers: withXsrfConfiguration(options).ɵproviders
		};
	}
	static ɵfac = function HttpClientXsrfModule_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || HttpClientXsrfModule)();
	};
	static ɵmod = /* @__PURE__ */ ɵɵdefineNgModule({ type: HttpClientXsrfModule });
	static ɵinj = /* @__PURE__ */ ɵɵdefineInjector({ providers: [
		HttpXsrfInterceptor,
		{
			provide: HTTP_INTERCEPTORS,
			useExisting: HttpXsrfInterceptor,
			multi: true
		},
		{
			provide: HttpXsrfTokenExtractor,
			useClass: HttpXsrfCookieExtractor
		},
		withXsrfConfiguration({
			cookieName: XSRF_DEFAULT_COOKIE_NAME,
			headerName: XSRF_DEFAULT_HEADER_NAME
		}).ɵproviders,
		{
			provide: XSRF_ENABLED,
			useValue: true
		}
	] });
};
(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HttpClientXsrfModule, [{
	type: NgModule,
	args: [{ providers: [
		HttpXsrfInterceptor,
		{
			provide: HTTP_INTERCEPTORS,
			useExisting: HttpXsrfInterceptor,
			multi: true
		},
		{
			provide: HttpXsrfTokenExtractor,
			useClass: HttpXsrfCookieExtractor
		},
		withXsrfConfiguration({
			cookieName: XSRF_DEFAULT_COOKIE_NAME,
			headerName: XSRF_DEFAULT_HEADER_NAME
		}).ɵproviders,
		{
			provide: XSRF_ENABLED,
			useValue: true
		}
	] }]
}], null, null);
var HttpClientModule = class HttpClientModule {
	static ɵfac = function HttpClientModule_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || HttpClientModule)();
	};
	static ɵmod = /* @__PURE__ */ ɵɵdefineNgModule({ type: HttpClientModule });
	static ɵinj = /* @__PURE__ */ ɵɵdefineInjector({ providers: [provideHttpClient(withInterceptorsFromDi())] });
};
(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HttpClientModule, [{
	type: NgModule,
	args: [{ providers: [provideHttpClient(withInterceptorsFromDi())] }]
}], null, null);
var HttpClientJsonpModule = class HttpClientJsonpModule {
	static ɵfac = function HttpClientJsonpModule_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || HttpClientJsonpModule)();
	};
	static ɵmod = /* @__PURE__ */ ɵɵdefineNgModule({ type: HttpClientJsonpModule });
	static ɵinj = /* @__PURE__ */ ɵɵdefineInjector({ providers: [withJsonpSupport().ɵproviders] });
};
(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HttpClientJsonpModule, [{
	type: NgModule,
	args: [{ providers: [withJsonpSupport().ɵproviders] }]
}], null, null);
//#endregion
//#region node_modules/@angular/common/fesm2022/http.mjs
/**
* @license Angular v21.2.7
* (c) 2010-2026 Google LLC. https://angular.dev/
* License: MIT
*/
var HTTP_TRANSFER_CACHE_ORIGIN_MAP = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "HTTP_TRANSFER_CACHE_ORIGIN_MAP" : "");
var BODY = "b";
var HEADERS = "h";
var STATUS = "s";
var STATUS_TEXT = "st";
var REQ_URL = "u";
var RESPONSE_TYPE = "rt";
var CACHE_OPTIONS = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "HTTP_TRANSFER_STATE_CACHE_OPTIONS" : "");
var ALLOWED_METHODS = ["GET", "HEAD"];
function shouldCacheRequest(req, options) {
	const { isCacheActive, ...globalOptions } = options;
	const { transferCache: requestOptions, method: requestMethod } = req;
	if (!isCacheActive || requestOptions === false || requestMethod === "POST" && !globalOptions.includePostRequests && !requestOptions || requestMethod !== "POST" && !ALLOWED_METHODS.includes(requestMethod) || !globalOptions.includeRequestsWithAuthHeaders && hasAuthHeaders(req) || globalOptions.filter?.(req) === false) return false;
	return true;
}
function getHeadersToInclude(options, requestOptions) {
	const { includeHeaders: globalHeaders } = options;
	let headersToInclude = globalHeaders;
	if (typeof requestOptions === "object" && requestOptions.includeHeaders) headersToInclude = requestOptions.includeHeaders;
	return headersToInclude;
}
function retrieveStateFromCache(req, options, transferState, originMap) {
	const { transferCache: requestOptions } = req;
	if (!shouldCacheRequest(req, options)) return null;
	if (originMap) throw new RuntimeError(2803, ngDevMode && "Angular detected that the `HTTP_TRANSFER_CACHE_ORIGIN_MAP` token is configured and present in the client side code. Please ensure that this token is only provided in the server code of the application.");
	const requestUrl = req.url;
	const storeKey = makeCacheKey(req, requestUrl);
	const response = transferState.get(storeKey, null);
	const headersToInclude = getHeadersToInclude(options, requestOptions);
	if (response) {
		const { [BODY]: undecodedBody, [RESPONSE_TYPE]: responseType, [HEADERS]: httpHeaders, [STATUS]: status, [STATUS_TEXT]: statusText, [REQ_URL]: url } = response;
		let body = undecodedBody;
		switch (responseType) {
			case "arraybuffer":
				body = fromBase64(undecodedBody);
				break;
			case "blob":
				body = new Blob([fromBase64(undecodedBody)]);
				break;
		}
		let headers = new HttpHeaders(httpHeaders);
		if (typeof ngDevMode === "undefined" || ngDevMode) headers = appendMissingHeadersDetection(req.url, headers, headersToInclude ?? []);
		return new HttpResponse({
			body,
			headers,
			status,
			statusText,
			url
		});
	}
	return null;
}
function transferCacheInterceptorFn(req, next) {
	const options = inject(CACHE_OPTIONS);
	const cachedResponse = retrieveStateFromCache(req, options, inject(TransferState), inject(HTTP_TRANSFER_CACHE_ORIGIN_MAP, { optional: true }));
	if (cachedResponse) return of(cachedResponse);
	const { transferCache: requestOptions } = req;
	getHeadersToInclude(options, requestOptions);
	const requestUrl = req.url;
	makeCacheKey(req, requestUrl);
	if (!shouldCacheRequest(req, options)) return next(req);
	return next(req);
}
function hasAuthHeaders(req) {
	return req.headers.has("authorization") || req.headers.has("proxy-authorization");
}
function sortAndConcatParams(params) {
	return [...params.keys()].sort().map((k) => `${k}=${params.getAll(k)}`).join("&");
}
function makeCacheKey(request, mappedRequestUrl) {
	const { params, method, responseType } = request;
	const encodedParams = sortAndConcatParams(params);
	let serializedBody = request.serializeBody();
	if (serializedBody instanceof URLSearchParams) serializedBody = sortAndConcatParams(serializedBody);
	else if (typeof serializedBody !== "string") serializedBody = "";
	return makeStateKey(generateHash([
		method,
		responseType,
		mappedRequestUrl,
		serializedBody,
		encodedParams
	].join("|")));
}
function generateHash(value) {
	let hash = 0;
	for (const char of value) hash = Math.imul(31, hash) + char.charCodeAt(0) << 0;
	hash += 2147483648;
	return hash.toString();
}
function fromBase64(base64) {
	const binary = atob(base64);
	return Uint8Array.from(binary, (c) => c.charCodeAt(0)).buffer;
}
function withHttpTransferCache(cacheOptions) {
	return [
		{
			provide: CACHE_OPTIONS,
			useFactory: () => {
				performanceMarkFeature("NgHttpTransferCache");
				return {
					isCacheActive: true,
					...cacheOptions
				};
			}
		},
		{
			provide: HTTP_ROOT_INTERCEPTOR_FNS,
			useValue: transferCacheInterceptorFn,
			multi: true
		},
		{
			provide: APP_BOOTSTRAP_LISTENER,
			multi: true,
			useFactory: () => {
				const appRef = inject(ApplicationRef);
				const cacheState = inject(CACHE_OPTIONS);
				return () => {
					appRef.whenStable().then(() => {
						cacheState.isCacheActive = false;
					});
				};
			}
		}
	];
}
function appendMissingHeadersDetection(url, headers, headersToInclude) {
	const warningProduced = /* @__PURE__ */ new Set();
	return new Proxy(headers, { get(target, prop) {
		const value = Reflect.get(target, prop);
		if (typeof value !== "function" || !new Set([
			"get",
			"has",
			"getAll"
		]).has(prop)) return value;
		return (headerName) => {
			const key = (prop + ":" + headerName).toLowerCase();
			if (!headersToInclude.includes(headerName) && !warningProduced.has(key)) {
				warningProduced.add(key);
				const truncatedUrl = truncateMiddle(url);
				console.warn(formatRuntimeError(-2802, `Angular detected that the \`${headerName}\` header is accessed, but the value of the header was not transferred from the server to the client by the HttpTransferCache. To include the value of the \`${headerName}\` header for the \`${truncatedUrl}\` request, use the \`includeHeaders\` list. The \`includeHeaders\` can be defined either on a request level by adding the \`transferCache\` parameter, or on an application level by adding the \`httpCacheTransfer.includeHeaders\` argument to the \`provideClientHydration()\` call. `));
			}
			return value.apply(target, [headerName]);
		};
	} });
}
(() => {
	const jsonFn = makeHttpResourceFn("json");
	jsonFn.arrayBuffer = makeHttpResourceFn("arraybuffer");
	jsonFn.blob = makeHttpResourceFn("blob");
	jsonFn.text = makeHttpResourceFn("text");
	return jsonFn;
})();
function makeHttpResourceFn(responseType) {
	return function httpResource(request, options) {
		if (ngDevMode && !options?.injector) assertInInjectionContext(httpResource);
		const injector = options?.injector ?? inject(Injector);
		const cacheOptions = injector.get(CACHE_OPTIONS, null, { optional: true });
		const transferState = injector.get(TransferState, null, { optional: true });
		const originMap = injector.get(HTTP_TRANSFER_CACHE_ORIGIN_MAP, null, { optional: true });
		const getInitialStream = (req) => {
			if (cacheOptions && transferState && req) {
				const cachedResponse = retrieveStateFromCache(req, cacheOptions, transferState, originMap);
				if (cachedResponse) try {
					const body = cachedResponse.body;
					return signal({ value: options?.parse ? options.parse(body) : body });
				} catch (e) {
					if (typeof ngDevMode === "undefined" || ngDevMode) console.warn(`Angular detected an error while parsing the cached response for the httpResource at \`${req.url}\`. The resource will fall back to its default value and try again asynchronously.`, e);
				}
			}
		};
		return new HttpResourceImpl(injector, () => normalizeRequest(request, responseType), options?.defaultValue, options?.debugName, options?.parse, options?.equal, getInitialStream);
	};
}
function normalizeRequest(request, responseType) {
	let unwrappedRequest = typeof request === "function" ? request() : request;
	if (unwrappedRequest === void 0) return;
	else if (typeof unwrappedRequest === "string") unwrappedRequest = { url: unwrappedRequest };
	const headers = unwrappedRequest.headers instanceof HttpHeaders ? unwrappedRequest.headers : new HttpHeaders(unwrappedRequest.headers);
	const params = unwrappedRequest.params instanceof HttpParams ? unwrappedRequest.params : new HttpParams({ fromObject: unwrappedRequest.params });
	return new HttpRequest(unwrappedRequest.method ?? "GET", unwrappedRequest.url, unwrappedRequest.body ?? null, {
		headers,
		params,
		reportProgress: unwrappedRequest.reportProgress,
		withCredentials: unwrappedRequest.withCredentials,
		keepalive: unwrappedRequest.keepalive,
		cache: unwrappedRequest.cache,
		priority: unwrappedRequest.priority,
		mode: unwrappedRequest.mode,
		redirect: unwrappedRequest.redirect,
		responseType,
		context: unwrappedRequest.context,
		transferCache: unwrappedRequest.transferCache,
		credentials: unwrappedRequest.credentials,
		referrer: unwrappedRequest.referrer,
		referrerPolicy: unwrappedRequest.referrerPolicy,
		integrity: unwrappedRequest.integrity,
		timeout: unwrappedRequest.timeout
	});
}
var HttpResourceImpl = class extends ResourceImpl {
	client;
	_headers = linkedSignal({
		...ngDevMode ? { debugName: "_headers" } : {},
		source: this.extRequest,
		computation: () => void 0
	});
	_progress = linkedSignal({
		...ngDevMode ? { debugName: "_progress" } : {},
		source: this.extRequest,
		computation: () => void 0
	});
	_statusCode = linkedSignal({
		...ngDevMode ? { debugName: "_statusCode" } : {},
		source: this.extRequest,
		computation: () => void 0
	});
	headers = computed(() => this.status() === "resolved" || this.status() === "error" ? this._headers() : void 0, ...ngDevMode ? [{ debugName: "headers" }] : []);
	progress = this._progress.asReadonly();
	statusCode = this._statusCode.asReadonly();
	constructor(injector, request, defaultValue, debugName, parse, equal, getInitialStream) {
		super(request, ({ params: request, abortSignal }) => {
			let sub;
			const onAbort = () => sub.unsubscribe();
			abortSignal.addEventListener("abort", onAbort);
			const stream = signal({ value: void 0 }, ...ngDevMode ? [{ debugName: "stream" }] : []);
			let resolve;
			const promise = new Promise((r) => resolve = r);
			const send = (value) => {
				stream.set(value);
				resolve?.(stream);
				resolve = void 0;
			};
			sub = this.client.request(request).subscribe({
				next: (event) => {
					switch (event.type) {
						case HttpEventType.Response:
							this._headers.set(event.headers);
							this._statusCode.set(event.status);
							try {
								send({ value: parse ? parse(event.body) : event.body });
							} catch (error) {
								send({ error: encapsulateResourceError(error) });
							}
							break;
						case HttpEventType.DownloadProgress:
							this._progress.set(event);
							break;
					}
				},
				error: (error) => {
					if (error instanceof HttpErrorResponse) {
						this._headers.set(error.headers);
						this._statusCode.set(error.status);
					}
					send({ error });
					abortSignal.removeEventListener("abort", onAbort);
				},
				complete: () => {
					if (resolve) send({ error: new RuntimeError(991, ngDevMode && "Resource completed before producing a value") });
					abortSignal.removeEventListener("abort", onAbort);
				}
			});
			return promise;
		}, defaultValue, equal, debugName, injector, getInitialStream);
		this.client = injector.get(HttpClient);
	}
	set(value) {
		super.set(value);
		this._headers.set(void 0);
		this._progress.set(void 0);
		this._statusCode.set(void 0);
	}
};
//#endregion
//#region node_modules/@angular/platform-browser/fesm2022/platform-browser.mjs
var Meta = class Meta {
	_doc;
	_dom;
	constructor(_doc) {
		this._doc = _doc;
		this._dom = getDOM();
	}
	addTag(tag, forceCreation = false) {
		if (!tag) return null;
		return this._getOrCreateElement(tag, forceCreation);
	}
	addTags(tags, forceCreation = false) {
		if (!tags) return [];
		return tags.reduce((result, tag) => {
			if (tag) result.push(this._getOrCreateElement(tag, forceCreation));
			return result;
		}, []);
	}
	getTag(attrSelector) {
		if (!attrSelector) return null;
		return this._doc.querySelector(`meta[${attrSelector}]`) || null;
	}
	getTags(attrSelector) {
		if (!attrSelector) return [];
		const list = this._doc.querySelectorAll(`meta[${attrSelector}]`);
		return list ? [].slice.call(list) : [];
	}
	updateTag(tag, selector) {
		if (!tag) return null;
		selector = selector || this._parseSelector(tag);
		const meta = this.getTag(selector);
		if (meta) return this._setMetaElementAttributes(tag, meta);
		return this._getOrCreateElement(tag, true);
	}
	removeTag(attrSelector) {
		this.removeTagElement(this.getTag(attrSelector));
	}
	removeTagElement(meta) {
		if (meta) this._dom.remove(meta);
	}
	_getOrCreateElement(meta, forceCreation = false) {
		if (!forceCreation) {
			const selector = this._parseSelector(meta);
			const elem = this.getTags(selector).filter((elem) => this._containsAttributes(meta, elem))[0];
			if (elem !== void 0) return elem;
		}
		const element = this._dom.createElement("meta");
		this._setMetaElementAttributes(meta, element);
		this._doc.getElementsByTagName("head")[0].appendChild(element);
		return element;
	}
	_setMetaElementAttributes(tag, el) {
		Object.keys(tag).forEach((prop) => el.setAttribute(this._getMetaKeyMap(prop), tag[prop]));
		return el;
	}
	_parseSelector(tag) {
		const attr = tag.name ? "name" : "property";
		return `${attr}="${tag[attr]}"`;
	}
	_containsAttributes(tag, elem) {
		return Object.keys(tag).every((key) => elem.getAttribute(this._getMetaKeyMap(key)) === tag[key]);
	}
	_getMetaKeyMap(prop) {
		return META_KEYS_MAP[prop] || prop;
	}
	static ɵfac = function Meta_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || Meta)(ɵɵinject(DOCUMENT));
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
		token: Meta,
		factory: Meta.ɵfac,
		providedIn: "root"
	});
};
(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Meta, [{
	type: Injectable,
	args: [{ providedIn: "root" }]
}], () => [{
	type: void 0,
	decorators: [{
		type: Inject,
		args: [DOCUMENT]
	}]
}], null);
var META_KEYS_MAP = { httpEquiv: "http-equiv" };
var Title = class Title {
	_doc;
	constructor(_doc) {
		this._doc = _doc;
	}
	getTitle() {
		return this._doc.title;
	}
	setTitle(newTitle) {
		this._doc.title = newTitle || "";
	}
	static ɵfac = function Title_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || Title)(ɵɵinject(DOCUMENT));
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
		token: Title,
		factory: Title.ɵfac,
		providedIn: "root"
	});
};
(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Title, [{
	type: Injectable,
	args: [{ providedIn: "root" }]
}], () => [{
	type: void 0,
	decorators: [{
		type: Inject,
		args: [DOCUMENT]
	}]
}], null);
function exportNgVar(name, value) {
	if (typeof COMPILED === "undefined" || !COMPILED) {
		const ng = _global["ng"] = _global["ng"] || {};
		ng[name] = value;
	}
}
var ChangeDetectionPerfRecord = class {
	msPerTick;
	numTicks;
	constructor(msPerTick, numTicks) {
		this.msPerTick = msPerTick;
		this.numTicks = numTicks;
	}
};
var AngularProfiler = class {
	appRef;
	constructor(ref) {
		this.appRef = ref.injector.get(ApplicationRef);
	}
	timeChangeDetection(config) {
		const record = config && config["record"];
		const profileName = "Change Detection";
		if (record && "profile" in console && typeof console.profile === "function") console.profile(profileName);
		const start = performance.now();
		let numTicks = 0;
		while (numTicks < 5 || performance.now() - start < 500) {
			this.appRef.tick();
			numTicks++;
		}
		const end = performance.now();
		if (record && "profileEnd" in console && typeof console.profileEnd === "function") console.profileEnd(profileName);
		const msPerTick = (end - start) / numTicks;
		console.log(`ran ${numTicks} change detection cycles`);
		console.log(`${msPerTick.toFixed(2)} ms per check`);
		return new ChangeDetectionPerfRecord(msPerTick, numTicks);
	}
};
var PROFILER_GLOBAL_NAME = "profiler";
function enableDebugTools(ref) {
	exportNgVar(PROFILER_GLOBAL_NAME, new AngularProfiler(ref));
	return ref;
}
function disableDebugTools() {
	exportNgVar(PROFILER_GLOBAL_NAME, null);
}
var By = class {
	static all() {
		return () => true;
	}
	static css(selector) {
		return (debugElement) => {
			return debugElement.nativeElement != null ? elementMatches(debugElement.nativeElement, selector) : false;
		};
	}
	static directive(type) {
		return (debugNode) => debugNode.providerTokens.indexOf(type) !== -1;
	}
};
function elementMatches(n, selector) {
	if (getDOM().isElementNode(n)) return n.matches && n.matches(selector) || n.msMatchesSelector && n.msMatchesSelector(selector) || n.webkitMatchesSelector && n.webkitMatchesSelector(selector);
	return false;
}
var EVENT_NAMES = {
	"pan": true,
	"panstart": true,
	"panmove": true,
	"panend": true,
	"pancancel": true,
	"panleft": true,
	"panright": true,
	"panup": true,
	"pandown": true,
	"pinch": true,
	"pinchstart": true,
	"pinchmove": true,
	"pinchend": true,
	"pinchcancel": true,
	"pinchin": true,
	"pinchout": true,
	"press": true,
	"pressup": true,
	"rotate": true,
	"rotatestart": true,
	"rotatemove": true,
	"rotateend": true,
	"rotatecancel": true,
	"swipe": true,
	"swipeleft": true,
	"swiperight": true,
	"swipeup": true,
	"swipedown": true,
	"tap": true,
	"doubletap": true
};
var HAMMER_GESTURE_CONFIG = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "HammerGestureConfig" : "");
var HAMMER_LOADER = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "HammerLoader" : "");
var HammerGestureConfig = class HammerGestureConfig {
	events = [];
	overrides = {};
	options;
	buildHammer(element) {
		const mc = new Hammer(element, this.options);
		mc.get("pinch").set({ enable: true });
		mc.get("rotate").set({ enable: true });
		for (const eventName in this.overrides) mc.get(eventName).set(this.overrides[eventName]);
		return mc;
	}
	static ɵfac = function HammerGestureConfig_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || HammerGestureConfig)();
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
		token: HammerGestureConfig,
		factory: HammerGestureConfig.ɵfac
	});
};
(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HammerGestureConfig, [{ type: Injectable }], null, null);
var HammerGesturesPlugin = class HammerGesturesPlugin extends EventManagerPlugin {
	_config;
	_injector;
	loader;
	_loaderPromise = null;
	constructor(doc, _config, _injector, loader) {
		super(doc);
		this._config = _config;
		this._injector = _injector;
		this.loader = loader;
	}
	supports(eventName) {
		if (!EVENT_NAMES.hasOwnProperty(eventName.toLowerCase()) && !this.isCustomEvent(eventName)) return false;
		if (!window.Hammer && !this.loader) {
			if (typeof ngDevMode === "undefined" || ngDevMode) this._injector.get(Console).warn(`The "${eventName}" event cannot be bound because Hammer.JS is not loaded and no custom loader has been specified.`);
			return false;
		}
		return true;
	}
	addEventListener(element, eventName, handler) {
		const zone = this.manager.getZone();
		eventName = eventName.toLowerCase();
		if (!window.Hammer && this.loader) {
			this._loaderPromise = this._loaderPromise || zone.runOutsideAngular(() => this.loader());
			let cancelRegistration = false;
			let deregister = () => {
				cancelRegistration = true;
			};
			zone.runOutsideAngular(() => this._loaderPromise.then(() => {
				if (!window.Hammer) {
					if (typeof ngDevMode === "undefined" || ngDevMode) this._injector.get(Console).warn(`The custom HAMMER_LOADER completed, but Hammer.JS is not present.`);
					deregister = () => {};
					return;
				}
				if (!cancelRegistration) deregister = this.addEventListener(element, eventName, handler);
			}).catch(() => {
				if (typeof ngDevMode === "undefined" || ngDevMode) this._injector.get(Console).warn(`The "${eventName}" event cannot be bound because the custom Hammer.JS loader failed.`);
				deregister = () => {};
			}));
			return () => {
				deregister();
			};
		}
		return zone.runOutsideAngular(() => {
			const mc = this._config.buildHammer(element);
			const callback = function(eventObj) {
				zone.runGuarded(function() {
					handler(eventObj);
				});
			};
			mc.on(eventName, callback);
			return () => {
				mc.off(eventName, callback);
				if (typeof mc.destroy === "function") mc.destroy();
			};
		});
	}
	isCustomEvent(eventName) {
		return this._config.events.indexOf(eventName) > -1;
	}
	static ɵfac = function HammerGesturesPlugin_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || HammerGesturesPlugin)(ɵɵinject(DOCUMENT), ɵɵinject(HAMMER_GESTURE_CONFIG), ɵɵinject(Injector), ɵɵinject(HAMMER_LOADER, 8));
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
		token: HammerGesturesPlugin,
		factory: HammerGesturesPlugin.ɵfac
	});
};
(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HammerGesturesPlugin, [{ type: Injectable }], () => [
	{
		type: void 0,
		decorators: [{
			type: Inject,
			args: [DOCUMENT]
		}]
	},
	{
		type: HammerGestureConfig,
		decorators: [{
			type: Inject,
			args: [HAMMER_GESTURE_CONFIG]
		}]
	},
	{ type: Injector },
	{
		type: void 0,
		decorators: [{ type: Optional }, {
			type: Inject,
			args: [HAMMER_LOADER]
		}]
	}
], null);
var HammerModule = class HammerModule {
	static ɵfac = function HammerModule_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || HammerModule)();
	};
	static ɵmod = /* @__PURE__ */ ɵɵdefineNgModule({ type: HammerModule });
	static ɵinj = /* @__PURE__ */ ɵɵdefineInjector({ providers: [{
		provide: EVENT_MANAGER_PLUGINS,
		useClass: HammerGesturesPlugin,
		multi: true,
		deps: [
			DOCUMENT,
			HAMMER_GESTURE_CONFIG,
			Injector,
			[new Optional(), HAMMER_LOADER]
		]
	}, {
		provide: HAMMER_GESTURE_CONFIG,
		useClass: HammerGestureConfig
	}] });
};
(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HammerModule, [{
	type: NgModule,
	args: [{ providers: [{
		provide: EVENT_MANAGER_PLUGINS,
		useClass: HammerGesturesPlugin,
		multi: true,
		deps: [
			DOCUMENT,
			HAMMER_GESTURE_CONFIG,
			Injector,
			[new Optional(), HAMMER_LOADER]
		]
	}, {
		provide: HAMMER_GESTURE_CONFIG,
		useClass: HammerGestureConfig
	}] }]
}], null, null);
var DomSanitizer = class DomSanitizer {
	static ɵfac = function DomSanitizer_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || DomSanitizer)();
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
		token: DomSanitizer,
		factory: function DomSanitizer_Factory(__ngFactoryType__) {
			let __ngConditionalFactory__ = null;
			if (__ngFactoryType__) __ngConditionalFactory__ = new (__ngFactoryType__ || DomSanitizer)();
			else __ngConditionalFactory__ = ɵɵinject(DomSanitizerImpl);
			return __ngConditionalFactory__;
		},
		providedIn: "root"
	});
};
(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DomSanitizer, [{
	type: Injectable,
	args: [{
		providedIn: "root",
		useExisting: forwardRef(() => DomSanitizerImpl)
	}]
}], null, null);
var DomSanitizerImpl = class DomSanitizerImpl extends DomSanitizer {
	_doc;
	constructor(_doc) {
		super();
		this._doc = _doc;
	}
	sanitize(ctx, value) {
		if (value == null) return null;
		switch (ctx) {
			case SecurityContext.NONE: return value;
			case SecurityContext.HTML:
				if (allowSanitizationBypassAndThrow(value, "HTML")) return unwrapSafeValue(value);
				return _sanitizeHtml(this._doc, String(value)).toString();
			case SecurityContext.STYLE:
				if (allowSanitizationBypassAndThrow(value, "Style")) return unwrapSafeValue(value);
				return value;
			case SecurityContext.SCRIPT:
				if (allowSanitizationBypassAndThrow(value, "Script")) return unwrapSafeValue(value);
				throw new RuntimeError(5200, (typeof ngDevMode === "undefined" || ngDevMode) && "unsafe value used in a script context");
			case SecurityContext.URL:
				if (allowSanitizationBypassAndThrow(value, "URL")) return unwrapSafeValue(value);
				return _sanitizeUrl(String(value));
			case SecurityContext.RESOURCE_URL:
				if (allowSanitizationBypassAndThrow(value, "ResourceURL")) return unwrapSafeValue(value);
				throw new RuntimeError(5201, (typeof ngDevMode === "undefined" || ngDevMode) && `unsafe value used in a resource URL context (see https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss)`);
			default: throw new RuntimeError(5202, (typeof ngDevMode === "undefined" || ngDevMode) && `Unexpected SecurityContext ${ctx} (see https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss)`);
		}
	}
	bypassSecurityTrustHtml(value) {
		return bypassSanitizationTrustHtml(value);
	}
	bypassSecurityTrustStyle(value) {
		return bypassSanitizationTrustStyle(value);
	}
	bypassSecurityTrustScript(value) {
		return bypassSanitizationTrustScript(value);
	}
	bypassSecurityTrustUrl(value) {
		return bypassSanitizationTrustUrl(value);
	}
	bypassSecurityTrustResourceUrl(value) {
		return bypassSanitizationTrustResourceUrl(value);
	}
	static ɵfac = function DomSanitizerImpl_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || DomSanitizerImpl)(ɵɵinject(DOCUMENT));
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
		token: DomSanitizerImpl,
		factory: DomSanitizerImpl.ɵfac,
		providedIn: "root"
	});
};
(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DomSanitizerImpl, [{
	type: Injectable,
	args: [{ providedIn: "root" }]
}], () => [{
	type: void 0,
	decorators: [{
		type: Inject,
		args: [DOCUMENT]
	}]
}], null);
var HydrationFeatureKind;
(function(HydrationFeatureKind) {
	HydrationFeatureKind[HydrationFeatureKind["NoHttpTransferCache"] = 0] = "NoHttpTransferCache";
	HydrationFeatureKind[HydrationFeatureKind["HttpTransferCacheOptions"] = 1] = "HttpTransferCacheOptions";
	HydrationFeatureKind[HydrationFeatureKind["I18nSupport"] = 2] = "I18nSupport";
	HydrationFeatureKind[HydrationFeatureKind["EventReplay"] = 3] = "EventReplay";
	HydrationFeatureKind[HydrationFeatureKind["IncrementalHydration"] = 4] = "IncrementalHydration";
})(HydrationFeatureKind || (HydrationFeatureKind = {}));
function hydrationFeature(ɵkind, ɵproviders = [], ɵoptions = {}) {
	return {
		ɵkind,
		ɵproviders
	};
}
function withNoHttpTransferCache() {
	return hydrationFeature(HydrationFeatureKind.NoHttpTransferCache);
}
function withHttpTransferCacheOptions(options) {
	return hydrationFeature(HydrationFeatureKind.HttpTransferCacheOptions, withHttpTransferCache(options));
}
function withI18nSupport() {
	return hydrationFeature(HydrationFeatureKind.I18nSupport, withI18nSupport$1());
}
function withEventReplay() {
	return hydrationFeature(HydrationFeatureKind.EventReplay, withEventReplay$1());
}
function withIncrementalHydration() {
	return hydrationFeature(HydrationFeatureKind.IncrementalHydration, withIncrementalHydration$1());
}
function provideEnabledBlockingInitialNavigationDetector() {
	return [{
		provide: ENVIRONMENT_INITIALIZER,
		useValue: () => {
			if (inject(IS_ENABLED_BLOCKING_INITIAL_NAVIGATION, { optional: true })) {
				const console = inject(Console);
				const message = formatRuntimeError(5001, "Configuration error: found both hydration and enabledBlocking initial navigation in the same application, which is a contradiction.");
				console.warn(message);
			}
		},
		multi: true
	}];
}
function provideClientHydration(...features) {
	const providers = [];
	const featuresKind = /* @__PURE__ */ new Set();
	for (const { ɵproviders, ɵkind } of features) {
		featuresKind.add(ɵkind);
		if (ɵproviders.length) providers.push(ɵproviders);
	}
	const hasHttpTransferCacheOptions = featuresKind.has(HydrationFeatureKind.HttpTransferCacheOptions);
	if (typeof ngDevMode !== "undefined" && ngDevMode && featuresKind.has(HydrationFeatureKind.NoHttpTransferCache) && hasHttpTransferCacheOptions) throw new RuntimeError(5001, "Configuration error: found both withHttpTransferCacheOptions() and withNoHttpTransferCache() in the same call to provideClientHydration(), which is a contradiction.");
	return makeEnvironmentProviders([
		typeof ngDevMode !== "undefined" && ngDevMode ? provideEnabledBlockingInitialNavigationDetector() : [],
		typeof ngDevMode !== "undefined" && ngDevMode ? provideStabilityDebugging() : [],
		withDomHydration(),
		featuresKind.has(HydrationFeatureKind.NoHttpTransferCache) || hasHttpTransferCacheOptions ? [] : withHttpTransferCache({}),
		providers
	]);
}
var VERSION = /* @__PURE__ */ new Version("21.2.7");
//#endregion
export { DomRendererFactory2 as A, mergeMap as B, BrowserModule as C, platformBrowser as D, createApplication as E, SharedStylesHost as F, popResultSelector as G, from as H, switchMap as I, popScheduler as K, finalize as L, EventManager as M, EventManagerPlugin as N, provideProtractorTestingSupport as O, REMOVE_STYLES_ON_COMPONENT_DESTROY as P, concatMap as R, BrowserGetTestability as S, bootstrapApplication as T, executeSchedule as U, of as V, innerFrom as W, withHttpTransferCacheOptions as _, HAMMER_LOADER as a, withNoHttpTransferCache as b, HammerModule as c, Title as d, VERSION as f, withEventReplay as g, provideClientHydration as h, HAMMER_GESTURE_CONFIG as i, EVENT_MANAGER_PLUGINS as j, DomEventsPlugin as k, HydrationFeatureKind as l, enableDebugTools as m, DomSanitizer as n, HammerGestureConfig as o, disableDebugTools as p, DomSanitizerImpl as r, HammerGesturesPlugin as s, By as t, Meta as u, withI18nSupport as v, KeyEventsPlugin as w, BrowserDomAdapter as x, withIncrementalHydration as y, filter as z };

//# sourceMappingURL=platform-browser-M81yjFrm.js.map