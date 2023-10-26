/*!
 * PhotoSphereViewer 0.0.0
 * @copyright 2014-2015 Jérémy Heleine
 * @copyright 2023 Damien "Mistic" Sorel
 * @licence MIT (https://opensource.org/licenses/MIT)
 */
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/data/constants.ts
var constants_exports = {};
__export(constants_exports, {
  ACTIONS: () => ACTIONS,
  ANIMATION_MIN_DURATION: () => ANIMATION_MIN_DURATION,
  CTRLZOOM_TIMEOUT: () => CTRLZOOM_TIMEOUT,
  DBLCLICK_DELAY: () => DBLCLICK_DELAY,
  DEFAULT_TRANSITION: () => DEFAULT_TRANSITION,
  EASINGS: () => EASINGS,
  ICONS: () => ICONS,
  IDS: () => IDS,
  INERTIA_WINDOW: () => INERTIA_WINDOW,
  KEY_CODES: () => KEY_CODES,
  LONGTOUCH_DELAY: () => LONGTOUCH_DELAY,
  MOVE_THRESHOLD: () => MOVE_THRESHOLD,
  SPHERE_RADIUS: () => SPHERE_RADIUS,
  TWOFINGERSOVERLAY_DELAY: () => TWOFINGERSOVERLAY_DELAY,
  VIEWER_DATA: () => VIEWER_DATA
});

// src/icons/arrow.svg
var arrow_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="40 40 432 432"><g transform="rotate(0, 256, 256)"><path fill="currentColor" d="M425.23 210.55H227.39a5 5 0 01-3.53-8.53l56.56-56.57a45.5 45.5 0 000-64.28 45.15 45.15 0 00-32.13-13.3 45.15 45.15 0 00-32.14 13.3L41.32 256l174.83 174.83a45.15 45.15 0 0032.14 13.3 45.15 45.15 0 0032.13-13.3 45.5 45.5 0 000-64.28l-56.57-56.57a5 5 0 013.54-8.53h197.84c25.06 0 45.45-20.39 45.45-45.45s-20.4-45.45-45.45-45.45z"/></g><!-- Created by Flatart from the Noun Project --></svg>\n';

// src/icons/close.svg
var close_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g fill="currentColor" transform=" translate(50, 50) rotate(45)"><rect x="-5" y="-65" width="10" height="130"/><rect x="-65" y="-5" width="130" height="10"/></g></svg>';

// src/icons/download.svg
var download_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="currentColor" d="M83.3 35.6h-17V3H32.2v32.6H16.6l33.6 32.7 33-32.7z"/><path fill="currentColor" d="M83.3 64.2v16.3H16.6V64.2H-.1v32.6H100V64.2H83.3z"/><!--Created by Michael Zenaty from the Noun Project--></svg>\n';

// src/icons/fullscreen-in.svg
var fullscreen_in_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="currentColor" d="M100 40H87.1V18.8h-21V6H100zM100 93.2H66V80.3h21.1v-21H100zM34 93.2H0v-34h12.9v21.1h21zM12.9 40H0V6h34v12.9H12.8z"/><!--Created by Garrett Knoll from the Noun Project--></svg>\n';

// src/icons/fullscreen-out.svg
var fullscreen_out_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="currentColor" d="M66 7h13v21h21v13H66zM66 60.3h34v12.9H79v21H66zM0 60.3h34v34H21V73.1H0zM21 7h13v34H0V28h21z"/><!--Created by Garrett Knoll from the Noun Project--></svg>\n';

// src/icons/info.svg
var info_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="currentColor" d="M28.3 26.1c-1 2.6-1.9 4.8-2.6 7-2.5 7.4-5 14.7-7.2 22-1.3 4.4.5 7.2 4.3 7.8 1.3.2 2.8.2 4.2-.1 8.2-2 11.9-8.6 15.7-15.2l-2.2 2a18.8 18.8 0 0 1-7.4 5.2 2 2 0 0 1-1.6-.2c-.2-.1 0-1 0-1.4l.8-1.8L41.9 28c.5-1.4.9-3 .7-4.4-.2-2.6-3-4.4-6.3-4.4-8.8.2-15 4.5-19.5 11.8-.2.3-.2.6-.3 1.3 3.7-2.8 6.8-6.1 11.8-6.2z"/><circle fill="currentColor" cx="39.3" cy="9.2" r="8.2"/><!--Created by Arafat Uddin from the Noun Project--></svg>\n';

// src/icons/menu.svg
var menu_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 10 80 80"><g fill="currentColor"><circle r="10" cx="20" cy="20"/><circle r="10" cx="50" cy="20"/><circle r="10" cx="80" cy="20"/><circle r="10" cx="20" cy="50"/><circle r="10" cx="50" cy="50"/><circle r="10" cx="80" cy="50"/><circle r="10" cx="20" cy="80"/><circle r="10" cx="50" cy="80"/><circle r="10" cx="80" cy="80"/></g><!-- Created by Richard Kun\xE1k from the Noun Project--></svg>\n';

// src/icons/zoom-in.svg
var zoom_in_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" d="M14.043 12.22a7.738 7.738 0 1 0-1.823 1.822l4.985 4.985c.503.504 1.32.504 1.822 0a1.285 1.285 0 0 0 0-1.822l-4.984-4.985zm-6.305 1.043a5.527 5.527 0 1 1 0-11.053 5.527 5.527 0 0 1 0 11.053z"/><path fill="currentColor" d="M8.728 4.009H6.744v2.737H4.006V8.73h2.738v2.736h1.984V8.73h2.737V6.746H8.728z"/><!--Created by Ryan Canning from the Noun Project--></svg>\n';

// src/icons/zoom-out.svg
var zoom_out_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" d="M14.043 12.22a7.738 7.738 0 1 0-1.823 1.822l4.985 4.985c.503.504 1.32.504 1.822 0a1.285 1.285 0 0 0 0-1.822l-4.984-4.985zm-6.305 1.043a5.527 5.527 0 1 1 0-11.053 5.527 5.527 0 0 1 0 11.053z"/><path fill="currentColor" d="M4.006 6.746h7.459V8.73H4.006z"/><!--Created by Ryan Canning from the Noun Project--></svg>\n';

// src/data/constants.ts
var DEFAULT_TRANSITION = 1500;
var ANIMATION_MIN_DURATION = 500;
var MOVE_THRESHOLD = 4;
var DBLCLICK_DELAY = 300;
var LONGTOUCH_DELAY = 500;
var TWOFINGERSOVERLAY_DELAY = 100;
var CTRLZOOM_TIMEOUT = 2e3;
var INERTIA_WINDOW = 300;
var SPHERE_RADIUS = 1;
var VIEWER_DATA = "photoSphereViewer";
var ACTIONS = /* @__PURE__ */ ((ACTIONS2) => {
  ACTIONS2["ROTATE_UP"] = "ROTATE_UP";
  ACTIONS2["ROTATE_DOWN"] = "ROTATE_DOWN";
  ACTIONS2["ROTATE_RIGHT"] = "ROTATE_RIGHT";
  ACTIONS2["ROTATE_LEFT"] = "ROTATE_LEFT";
  ACTIONS2["ZOOM_IN"] = "ZOOM_IN";
  ACTIONS2["ZOOM_OUT"] = "ZOOM_OUT";
  return ACTIONS2;
})(ACTIONS || {});
var IDS = {
  MENU: "menu",
  TWO_FINGERS: "twoFingers",
  CTRL_ZOOM: "ctrlZoom",
  ERROR: "error",
  DESCRIPTION: "description"
};
var KEY_CODES = {
  Enter: "Enter",
  Control: "Control",
  Escape: "Escape",
  Space: " ",
  PageUp: "PageUp",
  PageDown: "PageDown",
  ArrowLeft: "ArrowLeft",
  ArrowUp: "ArrowUp",
  ArrowRight: "ArrowRight",
  ArrowDown: "ArrowDown",
  Delete: "Delete",
  Plus: "+",
  Minus: "-"
};
var ICONS = {
  arrow: arrow_default,
  close: close_default,
  download: download_default,
  fullscreenIn: fullscreen_in_default,
  fullscreenOut: fullscreen_out_default,
  info: info_default,
  menu: menu_default,
  zoomIn: zoom_in_default,
  zoomOut: zoom_out_default
};
var EASINGS = {
  linear: (t) => t,
  inQuad: (t) => t * t,
  outQuad: (t) => t * (2 - t),
  inOutQuad: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  inCubic: (t) => t * t * t,
  outCubic: (t) => --t * t * t + 1,
  inOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  inQuart: (t) => t * t * t * t,
  outQuart: (t) => 1 - --t * t * t * t,
  inOutQuart: (t) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
  inQuint: (t) => t * t * t * t * t,
  outQuint: (t) => 1 + --t * t * t * t * t,
  inOutQuint: (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
  inSine: (t) => 1 - Math.cos(t * (Math.PI / 2)),
  outSine: (t) => Math.sin(t * (Math.PI / 2)),
  inOutSine: (t) => 0.5 - 0.5 * Math.cos(Math.PI * t),
  inExpo: (t) => Math.pow(2, 10 * (t - 1)),
  outExpo: (t) => 1 - Math.pow(2, -10 * t),
  inOutExpo: (t) => (t = t * 2 - 1) < 0 ? 0.5 * Math.pow(2, 10 * t) : 1 - 0.5 * Math.pow(2, -10 * t),
  inCirc: (t) => 1 - Math.sqrt(1 - t * t),
  outCirc: (t) => Math.sqrt(1 - (t - 1) * (t - 1)),
  inOutCirc: (t) => (t *= 2) < 1 ? 0.5 - 0.5 * Math.sqrt(1 - t * t) : 0.5 + 0.5 * Math.sqrt(1 - (t -= 2) * t)
};

// src/utils/index.ts
var utils_exports = {};
__export(utils_exports, {
  Animation: () => Animation,
  Dynamic: () => Dynamic,
  MultiDynamic: () => MultiDynamic,
  PressHandler: () => PressHandler,
  Slider: () => Slider,
  SliderDirection: () => SliderDirection,
  addClasses: () => addClasses,
  angle: () => angle,
  applyEulerInverse: () => applyEulerInverse,
  cleanCssPosition: () => cleanCssPosition,
  clone: () => clone,
  createTexture: () => createTexture,
  cssPositionIsOrdered: () => cssPositionIsOrdered,
  dasherize: () => dasherize,
  deepEqual: () => deepEqual,
  deepmerge: () => deepmerge,
  distance: () => distance,
  exitFullscreen: () => exitFullscreen,
  firstNonNull: () => firstNonNull,
  getAbortError: () => getAbortError,
  getAngle: () => getAngle,
  getClosest: () => getClosest,
  getConfigParser: () => getConfigParser,
  getElement: () => getElement,
  getPosition: () => getPosition,
  getShortestArc: () => getShortestArc,
  getStyle: () => getStyle,
  getTouchData: () => getTouchData,
  getXMPValue: () => getXMPValue,
  greatArcDistance: () => greatArcDistance,
  hasParent: () => hasParent,
  invertResolvableBoolean: () => invertResolvableBoolean,
  isAbortError: () => isAbortError,
  isEmpty: () => isEmpty,
  isExtendedPosition: () => isExtendedPosition,
  isFullscreenEnabled: () => isFullscreenEnabled,
  isNil: () => isNil,
  isPlainObject: () => isPlainObject,
  logWarn: () => logWarn,
  parseAngle: () => parseAngle,
  parsePoint: () => parsePoint,
  parseSpeed: () => parseSpeed,
  removeClasses: () => removeClasses,
  requestFullscreen: () => requestFullscreen,
  resolveBoolean: () => resolveBoolean,
  sum: () => sum,
  throttle: () => throttle,
  toggleClass: () => toggleClass,
  wrap: () => wrap
});

// src/utils/math.ts
function wrap(value, max) {
  let result = value % max;
  if (result < 0) {
    result += max;
  }
  return result;
}
function sum(array) {
  return array.reduce((a, b) => a + b, 0);
}
function distance(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}
function angle(p1, p2) {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x);
}
function getShortestArc(from, to) {
  const candidates = [
    0,
    // direct
    Math.PI * 2,
    // clock-wise cross zero
    -Math.PI * 2
    // counter-clock-wise cross zero
  ];
  return candidates.reduce((value, candidate) => {
    const newCandidate = to - from + candidate;
    return Math.abs(newCandidate) < Math.abs(value) ? newCandidate : value;
  }, Infinity);
}
function getAngle(position1, position2) {
  return Math.acos(
    Math.cos(position1.pitch) * Math.cos(position2.pitch) * Math.cos(position1.yaw - position2.yaw) + Math.sin(position1.pitch) * Math.sin(position2.pitch)
  );
}
function greatArcDistance([lon1, lat1], [lon2, lat2]) {
  const x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
  const y = lat2 - lat1;
  return Math.sqrt(x * x + y * y);
}

// src/utils/browser.ts
function getElement(selector) {
  if (typeof selector === "string") {
    return selector.match(/^[a-z]/i) ? document.getElementById(selector) : document.querySelector(selector);
  } else {
    return selector;
  }
}
function toggleClass(element, className, active) {
  if (active === void 0) {
    element.classList.toggle(className);
  } else if (active) {
    element.classList.add(className);
  } else if (!active) {
    element.classList.remove(className);
  }
}
function addClasses(element, className) {
  element.classList.add(...className.split(" "));
}
function removeClasses(element, className) {
  element.classList.remove(...className.split(" "));
}
function hasParent(el, parent) {
  let test = el;
  do {
    if (test === parent) {
      return true;
    }
    test = test.parentElement;
  } while (test);
  return false;
}
function getClosest(el, selector) {
  if (!el?.matches) {
    return null;
  }
  let test = el;
  do {
    if (test.matches(selector)) {
      return test;
    }
    test = test.parentElement;
  } while (test);
  return null;
}
function getPosition(el) {
  let x = 0;
  let y = 0;
  let test = el;
  while (test) {
    x += test.offsetLeft - test.scrollLeft + test.clientLeft;
    y += test.offsetTop - test.scrollTop + test.clientTop;
    test = test.offsetParent;
  }
  return { x, y };
}
function getStyle(elt, prop) {
  return window.getComputedStyle(elt, null)[prop];
}
function getTouchData(e) {
  if (e.touches.length < 2) {
    return null;
  }
  const p1 = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  const p2 = { x: e.touches[1].clientX, y: e.touches[1].clientY };
  return {
    distance: distance(p1, p2),
    angle: angle(p1, p2),
    center: { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 }
  };
}
function isFullscreenEnabled(elt) {
  return (document.fullscreenElement || document.webkitFullscreenElement) === elt;
}
function requestFullscreen(elt) {
  (elt.requestFullscreen || elt.webkitRequestFullscreen).call(elt);
}
function exitFullscreen() {
  (document.exitFullscreen || document.webkitExitFullscreen).call(document);
}

// src/utils/misc.ts
function dasherize(str) {
  return str.replace(/[A-Z](?:(?=[^A-Z])|[A-Z]*(?=[A-Z][^A-Z]|$))/g, (s, i) => {
    return (i > 0 ? "-" : "") + s.toLowerCase();
  });
}
function throttle(callback, wait) {
  let paused = false;
  return function(...args) {
    if (!paused) {
      paused = true;
      setTimeout(() => {
        callback.apply(this, args);
        paused = false;
      }, wait);
    }
  };
}
function isPlainObject(value) {
  if (typeof value !== "object" || value === null || Object.prototype.toString.call(value) !== "[object Object]") {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
}
function deepmerge(target, src) {
  const first = src;
  return function merge(target2, src2) {
    if (Array.isArray(src2)) {
      if (!target2 || !Array.isArray(target2)) {
        target2 = [];
      } else {
        target2.length = 0;
      }
      src2.forEach((e, i) => {
        target2[i] = merge(null, e);
      });
    } else if (typeof src2 === "object") {
      if (!target2 || Array.isArray(target2)) {
        target2 = {};
      }
      Object.keys(src2).forEach((key) => {
        if (typeof src2[key] !== "object" || !src2[key] || !isPlainObject(src2[key])) {
          target2[key] = src2[key];
        } else if (src2[key] !== first) {
          if (!target2[key]) {
            target2[key] = merge(null, src2[key]);
          } else {
            merge(target2[key], src2[key]);
          }
        }
      });
    } else {
      target2 = src2;
    }
    return target2;
  }(target, src);
}
function clone(src) {
  return deepmerge(null, src);
}
function isEmpty(obj) {
  return !obj || Object.keys(obj).length === 0 && obj.constructor === Object;
}
function isNil(val) {
  return val === null || val === void 0;
}
function firstNonNull(...values) {
  for (const val of values) {
    if (!isNil(val)) {
      return val;
    }
  }
  return null;
}
function deepEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  } else if (isObject(obj1) && isObject(obj2)) {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
      return false;
    }
    for (const prop of Object.keys(obj1)) {
      if (!deepEqual(obj1[prop], obj2[prop])) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}
function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}

// src/utils/psv.ts
import { LinearFilter, MathUtils, Quaternion, RepeatWrapping, Texture } from "three";

// src/PSVError.ts
var PSVError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "PSVError";
    Error.captureStackTrace?.(this, PSVError);
  }
};

// src/utils/psv.ts
function resolveBoolean(value, cb) {
  if (isPlainObject(value)) {
    cb(value.initial, true);
    value.promise.then((res) => cb(res, false));
  } else {
    cb(value, true);
  }
}
function invertResolvableBoolean(value) {
  return {
    initial: !value.initial,
    promise: value.promise.then((res) => !res)
  };
}
function getAbortError() {
  const error = new Error("Loading was aborted.");
  error.name = "AbortError";
  return error;
}
function isAbortError(err) {
  return err?.name === "AbortError";
}
function logWarn(message) {
  console.warn(`PhotoSphereViewer: ${message}`);
}
function isExtendedPosition(object) {
  if (!object) {
    return false;
  }
  return [
    ["textureX", "textureY"],
    ["yaw", "pitch"]
  ].some(([key1, key2]) => {
    return object[key1] !== void 0 && object[key2] !== void 0;
  });
}
function getXMPValue(data, attr) {
  let result = data.match("<GPano:" + attr + ">(.*)</GPano:" + attr + ">");
  if (result !== null) {
    const val = parseInt(result[1], 10);
    return isNaN(val) ? null : val;
  }
  result = data.match("GPano:" + attr + '="(.*?)"');
  if (result !== null) {
    const val = parseInt(result[1], 10);
    return isNaN(val) ? null : val;
  }
  return null;
}
var CSS_POSITIONS = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
};
var X_VALUES = ["left", "center", "right"];
var Y_VALUES = ["top", "center", "bottom"];
var POS_VALUES = [...X_VALUES, ...Y_VALUES];
var CENTER = "center";
function parsePoint(value) {
  if (!value) {
    return { x: 0.5, y: 0.5 };
  }
  if (typeof value === "object") {
    return value;
  }
  let tokens = value.toLocaleLowerCase().split(" ").slice(0, 2);
  if (tokens.length === 1) {
    if (CSS_POSITIONS[tokens[0]]) {
      tokens = [tokens[0], CENTER];
    } else {
      tokens = [tokens[0], tokens[0]];
    }
  }
  const xFirst = tokens[1] !== "left" && tokens[1] !== "right" && tokens[0] !== "top" && tokens[0] !== "bottom";
  tokens = tokens.map((token) => CSS_POSITIONS[token] || token);
  if (!xFirst) {
    tokens.reverse();
  }
  const parsed = tokens.join(" ").match(/^([0-9.]+)% ([0-9.]+)%$/);
  if (parsed) {
    return {
      x: parseFloat(parsed[1]) / 100,
      y: parseFloat(parsed[2]) / 100
    };
  } else {
    return { x: 0.5, y: 0.5 };
  }
}
function cleanCssPosition(value, { allowCenter, cssOrder } = {
  allowCenter: true,
  cssOrder: true
}) {
  if (!value) {
    return null;
  }
  if (typeof value === "string") {
    value = value.split(" ");
  }
  if (value.length === 1) {
    if (value[0] === CENTER) {
      value = [CENTER, CENTER];
    } else if (X_VALUES.indexOf(value[0]) !== -1) {
      value = [CENTER, value[0]];
    } else if (Y_VALUES.indexOf(value[0]) !== -1) {
      value = [value[0], CENTER];
    }
  }
  if (value.length !== 2 || POS_VALUES.indexOf(value[0]) === -1 || POS_VALUES.indexOf(value[1]) === -1) {
    logWarn(`Unparsable position ${value}`);
    return null;
  }
  if (!allowCenter && value[0] === CENTER && value[1] === CENTER) {
    logWarn(`Invalid position center center`);
    return null;
  }
  if (cssOrder && !cssPositionIsOrdered(value)) {
    value = [value[1], value[0]];
  }
  if (value[1] === CENTER && X_VALUES.indexOf(value[0]) !== -1) {
    value = [CENTER, value[0]];
  }
  if (value[0] === CENTER && Y_VALUES.indexOf(value[1]) !== -1) {
    value = [value[1], CENTER];
  }
  return value;
}
function cssPositionIsOrdered(value) {
  return Y_VALUES.indexOf(value[0]) !== -1 && X_VALUES.indexOf(value[1]) !== -1;
}
function parseSpeed(speed) {
  let parsed;
  if (typeof speed === "string") {
    const speedStr = speed.toString().trim();
    let speedValue = parseFloat(speedStr.replace(/^(-?[0-9]+(?:\.[0-9]*)?).*$/, "$1"));
    const speedUnit = speedStr.replace(/^-?[0-9]+(?:\.[0-9]*)?(.*)$/, "$1").trim();
    if (speedUnit.match(/(pm|per minute)$/)) {
      speedValue /= 60;
    }
    switch (speedUnit) {
      case "dpm":
      case "degrees per minute":
      case "dps":
      case "degrees per second":
        parsed = MathUtils.degToRad(speedValue);
        break;
      case "rdpm":
      case "radians per minute":
      case "rdps":
      case "radians per second":
        parsed = speedValue;
        break;
      case "rpm":
      case "revolutions per minute":
      case "rps":
      case "revolutions per second":
        parsed = speedValue * Math.PI * 2;
        break;
      default:
        throw new PSVError(`Unknown speed unit "${speedUnit}"`);
    }
  } else {
    parsed = speed;
  }
  return parsed;
}
function parseAngle(angle2, zeroCenter = false, halfCircle = zeroCenter) {
  let parsed;
  if (typeof angle2 === "string") {
    const match = angle2.toLowerCase().trim().match(/^(-?[0-9]+(?:\.[0-9]*)?)(.*)$/);
    if (!match) {
      throw new PSVError(`Unknown angle "${angle2}"`);
    }
    const value = parseFloat(match[1]);
    const unit = match[2];
    if (unit) {
      switch (unit) {
        case "deg":
        case "degs":
          parsed = MathUtils.degToRad(value);
          break;
        case "rad":
        case "rads":
          parsed = value;
          break;
        default:
          throw new PSVError(`Unknown angle unit "${unit}"`);
      }
    } else {
      parsed = value;
    }
  } else if (typeof angle2 === "number" && !isNaN(angle2)) {
    parsed = angle2;
  } else {
    throw new PSVError(`Unknown angle "${angle2}"`);
  }
  parsed = wrap(zeroCenter ? parsed + Math.PI : parsed, Math.PI * 2);
  return zeroCenter ? MathUtils.clamp(parsed - Math.PI, -Math.PI / (halfCircle ? 2 : 1), Math.PI / (halfCircle ? 2 : 1)) : parsed;
}
function createTexture(img) {
  const texture = new Texture(img);
  texture.needsUpdate = true;
  texture.minFilter = LinearFilter;
  texture.generateMipmaps = false;
  texture.wrapS = RepeatWrapping;
  texture.repeat.x = -1;
  return texture;
}
var quaternion = new Quaternion();
function applyEulerInverse(vector, euler) {
  quaternion.setFromEuler(euler).invert();
  vector.applyQuaternion(quaternion);
}
function getConfigParser(defaults, parsers) {
  const parser = function(userConfig) {
    if (!userConfig) {
      return clone(defaults);
    }
    const rawConfig = clone({
      ...defaults,
      ...userConfig
    });
    const config = {};
    for (let [key, value] of Object.entries(rawConfig)) {
      if (parsers && key in parsers) {
        value = parsers[key](value, {
          rawConfig,
          defValue: defaults[key]
        });
      } else if (!(key in defaults)) {
        logWarn(`Unknown option ${key}`);
        continue;
      }
      config[key] = value;
    }
    return config;
  };
  parser.defaults = defaults;
  parser.parsers = parsers || {};
  return parser;
}

// src/utils/Animation.ts
var Animation = class {
  constructor(options) {
    this.easing = EASINGS["linear"];
    this.callbacks = [];
    this.resolved = false;
    this.cancelled = false;
    this.options = options;
    if (options) {
      if (options.easing) {
        this.easing = typeof options.easing === "function" ? options.easing : EASINGS[options.easing] || EASINGS["linear"];
      }
      this.delayTimeout = setTimeout(() => {
        this.delayTimeout = void 0;
        this.animationFrame = window.requestAnimationFrame((t) => this.__run(t));
      }, options.delay || 0);
    } else {
      this.resolved = true;
    }
  }
  __run(timestamp) {
    if (this.cancelled) {
      return;
    }
    if (!this.start) {
      this.start = timestamp;
    }
    const progress = (timestamp - this.start) / this.options.duration;
    const current = {};
    if (progress < 1) {
      for (const [name, prop] of Object.entries(this.options.properties)) {
        if (prop) {
          const value = prop.start + (prop.end - prop.start) * this.easing(progress);
          current[name] = value;
        }
      }
      this.options.onTick(current, progress);
      this.animationFrame = window.requestAnimationFrame((t) => this.__run(t));
    } else {
      for (const [name, prop] of Object.entries(this.options.properties)) {
        if (prop) {
          current[name] = prop.end;
        }
      }
      this.options.onTick(current, 1);
      this.__resolve(true);
      this.animationFrame = void 0;
    }
  }
  __resolve(value) {
    if (value) {
      this.resolved = true;
    } else {
      this.cancelled = true;
    }
    this.callbacks.forEach((cb) => cb(value));
    this.callbacks.length = 0;
  }
  /**
   * Promise chaining
   * @param [onFulfilled] - Called when the animation is complete (true) or cancelled (false)
   */
  then(onFulfilled) {
    if (this.resolved || this.cancelled) {
      return Promise.resolve(this.resolved).then(onFulfilled);
    }
    return new Promise((resolve) => {
      this.callbacks.push(resolve);
    }).then(onFulfilled);
  }
  /**
   * Cancels the animation
   */
  cancel() {
    if (!this.cancelled && !this.resolved) {
      this.__resolve(false);
      if (this.delayTimeout) {
        window.clearTimeout(this.delayTimeout);
        this.delayTimeout = void 0;
      }
      if (this.animationFrame) {
        window.cancelAnimationFrame(this.animationFrame);
        this.animationFrame = void 0;
      }
    }
  }
};

// src/utils/Dynamic.ts
import { MathUtils as MathUtils2 } from "three";
var Dynamic = class {
  constructor(fn, config) {
    this.fn = fn;
    this.mode = 0 /* STOP */;
    this.speed = 0;
    this.speedMult = 0;
    this.currentSpeed = 0;
    this.target = 0;
    this.__current = 0;
    this.min = config.min;
    this.max = config.max;
    this.wrap = config.wrap;
    this.current = config.defaultValue;
    if (this.wrap && this.min !== 0) {
      throw new PSVError("invalid config");
    }
    if (this.fn) {
      this.fn(this.current);
    }
  }
  get current() {
    return this.__current;
  }
  set current(current) {
    this.__current = current;
  }
  /**
   * Changes base speed
   */
  setSpeed(speed) {
    this.speed = speed;
  }
  /**
   * Defines the target position
   */
  goto(position, speedMult = 1) {
    this.mode = 2 /* POSITION */;
    this.target = this.wrap ? wrap(position, this.max) : MathUtils2.clamp(position, this.min, this.max);
    this.speedMult = speedMult;
  }
  /**
   * Increases/decreases the target position
   */
  step(step, speedMult = 1) {
    if (speedMult === 0) {
      this.setValue(this.current + step);
    } else {
      if (this.mode !== 2 /* POSITION */) {
        this.target = this.current;
      }
      this.goto(this.target + step, speedMult);
    }
  }
  /**
   * Starts infinite movement
   */
  roll(invert = false, speedMult = 1) {
    this.mode = 1 /* INFINITE */;
    this.target = invert ? -Infinity : Infinity;
    this.speedMult = speedMult;
  }
  /**
   * Stops movement
   */
  stop() {
    this.mode = 0 /* STOP */;
  }
  /**
   * Defines the current position and immediately stops movement
   * @param {number} value
   */
  setValue(value) {
    this.target = this.wrap ? wrap(value, this.max) : MathUtils2.clamp(value, this.min, this.max);
    this.mode = 0 /* STOP */;
    this.currentSpeed = 0;
    if (this.target !== this.current) {
      this.current = this.target;
      if (this.fn) {
        this.fn(this.current);
      }
      return true;
    }
    return false;
  }
  /**
   * @internal
   */
  update(elapsed) {
    if (this.mode === 2 /* POSITION */) {
      if (this.wrap && Math.abs(this.target - this.current) > this.max / 2) {
        this.current = this.current < this.target ? this.current + this.max : this.current - this.max;
      }
      const dstStop = this.currentSpeed * this.currentSpeed / (this.speed * this.speedMult * 4);
      if (Math.abs(this.target - this.current) <= dstStop) {
        this.mode = 0 /* STOP */;
      }
    }
    let targetSpeed = this.mode === 0 /* STOP */ ? 0 : this.speed * this.speedMult;
    if (this.target < this.current) {
      targetSpeed = -targetSpeed;
    }
    if (this.currentSpeed < targetSpeed) {
      this.currentSpeed = Math.min(
        targetSpeed,
        this.currentSpeed + elapsed / 1e3 * this.speed * this.speedMult * 2
      );
    } else if (this.currentSpeed > targetSpeed) {
      this.currentSpeed = Math.max(
        targetSpeed,
        this.currentSpeed - elapsed / 1e3 * this.speed * this.speedMult * 2
      );
    }
    let next = null;
    if (this.current > this.target && this.currentSpeed) {
      next = Math.max(this.target, this.current + this.currentSpeed * elapsed / 1e3);
    } else if (this.current < this.target && this.currentSpeed) {
      next = Math.min(this.target, this.current + this.currentSpeed * elapsed / 1e3);
    }
    if (next !== null) {
      next = this.wrap ? wrap(next, this.max) : MathUtils2.clamp(next, this.min, this.max);
      if (next !== this.current) {
        this.current = next;
        if (this.fn) {
          this.fn(this.current);
        }
        return true;
      }
    }
    return false;
  }
};

// src/utils/MultiDynamic.ts
var MultiDynamic = class {
  constructor(fn, dynamics) {
    this.fn = fn;
    this.dynamics = dynamics;
    if (this.fn) {
      this.fn(this.current);
    }
  }
  get current() {
    return Object.entries(this.dynamics).reduce((values, [name, dynamic]) => {
      values[name] = dynamic.current;
      return values;
    }, {});
  }
  /**
   * Changes base speed
   */
  setSpeed(speed) {
    for (const d of Object.values(this.dynamics)) {
      d.setSpeed(speed);
    }
  }
  /**
   * Defines the target positions
   */
  goto(positions, speedMult = 1) {
    for (const [name, position] of Object.entries(positions)) {
      this.dynamics[name].goto(position, speedMult);
    }
  }
  /**
   * Increase/decrease the target positions
   */
  step(steps, speedMult = 1) {
    if (speedMult === 0) {
      this.setValue(
        Object.keys(steps).reduce((values, name) => {
          values[name] = steps[name] + this.dynamics[name].current;
          return values;
        }, {})
      );
    } else {
      for (const [name, step] of Object.entries(steps)) {
        this.dynamics[name].step(step, speedMult);
      }
    }
  }
  /**
   * Starts infinite movements
   */
  roll(rolls, speedMult = 1) {
    for (const [name, roll] of Object.entries(rolls)) {
      this.dynamics[name].roll(roll, speedMult);
    }
  }
  /**
   * Stops movements
   */
  stop() {
    for (const d of Object.values(this.dynamics)) {
      d.stop();
    }
  }
  /**
   * Defines the current positions and immediately stops movements
   */
  setValue(values) {
    let hasUpdates = false;
    for (const [name, value] of Object.entries(values)) {
      hasUpdates = this.dynamics[name].setValue(value) || hasUpdates;
    }
    if (hasUpdates && this.fn) {
      this.fn(this.current);
    }
    return hasUpdates;
  }
  /**
   * @internal
   */
  update(elapsed) {
    let hasUpdates = false;
    for (const d of Object.values(this.dynamics)) {
      hasUpdates = d.update(elapsed) || hasUpdates;
    }
    if (hasUpdates && this.fn) {
      this.fn(this.current);
    }
    return hasUpdates;
  }
};

// src/utils/PressHandler.ts
var PressHandler = class {
  constructor(delay = 200) {
    this.delay = delay;
    this.time = 0;
    this.delay = delay;
  }
  get pending() {
    return this.time !== 0;
  }
  down() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = void 0;
    }
    this.time = (/* @__PURE__ */ new Date()).getTime();
  }
  up(cb) {
    if (!this.time) {
      return;
    }
    const elapsed = Date.now() - this.time;
    if (elapsed < this.delay) {
      this.timeout = setTimeout(() => {
        cb();
        this.timeout = void 0;
        this.time = 0;
      }, this.delay);
    } else {
      cb();
      this.time = 0;
    }
  }
};

// src/utils/Slider.ts
var SliderDirection = /* @__PURE__ */ ((SliderDirection2) => {
  SliderDirection2["VERTICAL"] = "VERTICAL";
  SliderDirection2["HORIZONTAL"] = "HORIZONTAL";
  return SliderDirection2;
})(SliderDirection || {});
var Slider = class {
  constructor(container, direction, listener) {
    this.container = container;
    this.direction = direction;
    this.listener = listener;
    this.mousedown = false;
    this.mouseover = false;
    this.container.addEventListener("click", this);
    this.container.addEventListener("mousedown", this);
    this.container.addEventListener("mouseenter", this);
    this.container.addEventListener("mouseleave", this);
    this.container.addEventListener("touchstart", this);
    this.container.addEventListener("mousemove", this, true);
    this.container.addEventListener("touchmove", this, true);
    window.addEventListener("mouseup", this);
    window.addEventListener("touchend", this);
  }
  get isVertical() {
    return this.direction === "VERTICAL" /* VERTICAL */;
  }
  get isHorizontal() {
    return this.direction === "HORIZONTAL" /* HORIZONTAL */;
  }
  destroy() {
    window.removeEventListener("mouseup", this);
    window.removeEventListener("touchend", this);
  }
  /**
   * @internal
   */
  handleEvent(e) {
    switch (e.type) {
      case "click":
        e.stopPropagation();
        break;
      case "mousedown":
        this.__onMouseDown(e);
        break;
      case "mouseenter":
        this.__onMouseEnter(e);
        break;
      case "mouseleave":
        this.__onMouseLeave(e);
        break;
      case "touchstart":
        this.__onTouchStart(e);
        break;
      case "mousemove":
        this.__onMouseMove(e);
        break;
      case "touchmove":
        this.__onTouchMove(e);
        break;
      case "mouseup":
        this.__onMouseUp(e);
        break;
      case "touchend":
        this.__onTouchEnd(e);
        break;
    }
  }
  __onMouseDown(evt) {
    this.mousedown = true;
    this.__update(evt.clientX, evt.clientY, true);
  }
  __onMouseEnter(evt) {
    this.mouseover = true;
    this.__update(evt.clientX, evt.clientY, true);
  }
  __onTouchStart(evt) {
    this.mouseover = true;
    this.mousedown = true;
    const touch = evt.changedTouches[0];
    this.__update(touch.clientX, touch.clientY, true);
  }
  __onMouseMove(evt) {
    if (this.mousedown || this.mouseover) {
      evt.stopPropagation();
      this.__update(evt.clientX, evt.clientY, true);
    }
  }
  __onTouchMove(evt) {
    if (this.mousedown || this.mouseover) {
      evt.stopPropagation();
      const touch = evt.changedTouches[0];
      this.__update(touch.clientX, touch.clientY, true);
    }
  }
  __onMouseUp(evt) {
    if (this.mousedown) {
      this.mousedown = false;
      this.__update(evt.clientX, evt.clientY, false);
    }
  }
  __onMouseLeave(evt) {
    if (this.mouseover) {
      this.mouseover = false;
      this.__update(evt.clientX, evt.clientY, true);
    }
  }
  __onTouchEnd(evt) {
    if (this.mousedown) {
      this.mouseover = false;
      this.mousedown = false;
      const touch = evt.changedTouches[0];
      this.__update(touch.clientX, touch.clientY, false);
    }
  }
  __update(clientX, clientY, moving) {
    const boundingClientRect = this.container.getBoundingClientRect();
    const cursor = this.isVertical ? clientY : clientX;
    const pos = boundingClientRect[this.isVertical ? "bottom" : "left"];
    const size = boundingClientRect[this.isVertical ? "height" : "width"];
    const val = Math.abs((pos - cursor) / size);
    this.listener({
      value: val,
      click: !moving,
      mousedown: this.mousedown,
      mouseover: this.mouseover,
      cursor: { clientX, clientY }
    });
  }
};

// src/events.ts
var events_exports = {};
__export(events_exports, {
  BeforeAnimateEvent: () => BeforeAnimateEvent,
  BeforeRenderEvent: () => BeforeRenderEvent,
  BeforeRotateEvent: () => BeforeRotateEvent,
  ClickEvent: () => ClickEvent,
  ConfigChangedEvent: () => ConfigChangedEvent,
  DoubleClickEvent: () => DoubleClickEvent,
  FullscreenEvent: () => FullscreenEvent,
  HideNotificationEvent: () => HideNotificationEvent,
  HideOverlayEvent: () => HideOverlayEvent,
  HidePanelEvent: () => HidePanelEvent,
  KeypressEvent: () => KeypressEvent,
  LoadProgressEvent: () => LoadProgressEvent,
  ObjectEnterEvent: () => ObjectEnterEvent,
  ObjectEvent: () => ObjectEvent,
  ObjectHoverEvent: () => ObjectHoverEvent,
  ObjectLeaveEvent: () => ObjectLeaveEvent,
  PanoramaLoadedEvent: () => PanoramaLoadedEvent,
  PositionUpdatedEvent: () => PositionUpdatedEvent,
  ReadyEvent: () => ReadyEvent,
  RenderEvent: () => RenderEvent,
  ShowNotificationEvent: () => ShowNotificationEvent,
  ShowOverlayEvent: () => ShowOverlayEvent,
  ShowPanelEvent: () => ShowPanelEvent,
  SizeUpdatedEvent: () => SizeUpdatedEvent,
  StopAllEvent: () => StopAllEvent,
  ViewerEvent: () => ViewerEvent,
  ZoomUpdatedEvent: () => ZoomUpdatedEvent
});

// src/lib/TypedEventTarget.ts
var TypedEvent = class extends Event {
  constructor(type, cancelable = false) {
    super(type, { cancelable });
  }
};
var TypedEventTarget = class extends EventTarget {
  dispatchEvent(e) {
    return super.dispatchEvent(e);
  }
  /**
   * @template T the name of event
   * @template E the class of the event
   */
  addEventListener(type, callback, options) {
    super.addEventListener(type, callback, options);
  }
  /**
   * @template T the name of event
   * @template E the class of the event
   */
  removeEventListener(type, callback, options) {
    super.removeEventListener(type, callback, options);
  }
};

// src/events.ts
var ViewerEvent = class extends TypedEvent {
};
var _BeforeAnimateEvent = class extends ViewerEvent {
  /** @internal */
  constructor(position, zoomLevel) {
    super(_BeforeAnimateEvent.type, true);
    this.position = position;
    this.zoomLevel = zoomLevel;
  }
};
var BeforeAnimateEvent = _BeforeAnimateEvent;
BeforeAnimateEvent.type = "before-animate";
var _BeforeRenderEvent = class extends ViewerEvent {
  /** @internal */
  constructor(timestamp, elapsed) {
    super(_BeforeRenderEvent.type);
    this.timestamp = timestamp;
    this.elapsed = elapsed;
  }
};
var BeforeRenderEvent = _BeforeRenderEvent;
BeforeRenderEvent.type = "before-render";
var _BeforeRotateEvent = class extends ViewerEvent {
  /** @internal */
  constructor(position) {
    super(_BeforeRotateEvent.type, true);
    this.position = position;
  }
};
var BeforeRotateEvent = _BeforeRotateEvent;
BeforeRotateEvent.type = "before-rotate";
var _ClickEvent = class extends ViewerEvent {
  /** @internal */
  constructor(data) {
    super(_ClickEvent.type);
    this.data = data;
  }
};
var ClickEvent = _ClickEvent;
ClickEvent.type = "click";
var _ConfigChangedEvent = class extends ViewerEvent {
  /** @internal */
  constructor(options) {
    super(_ConfigChangedEvent.type);
    this.options = options;
  }
  /**
   * Checks if at least one of the `options` has been modified
   */
  containsOptions(...options) {
    return options.some((option) => this.options.includes(option));
  }
};
var ConfigChangedEvent = _ConfigChangedEvent;
ConfigChangedEvent.type = "config-changed";
var _DoubleClickEvent = class extends ViewerEvent {
  /** @internal */
  constructor(data) {
    super(_DoubleClickEvent.type);
    this.data = data;
  }
};
var DoubleClickEvent = _DoubleClickEvent;
DoubleClickEvent.type = "dblclick";
var _FullscreenEvent = class extends ViewerEvent {
  /** @internal */
  constructor(fullscreenEnabled) {
    super(_FullscreenEvent.type);
    this.fullscreenEnabled = fullscreenEnabled;
  }
};
var FullscreenEvent = _FullscreenEvent;
FullscreenEvent.type = "fullscreen";
var _HideNotificationEvent = class extends ViewerEvent {
  /** @internal */
  constructor(notificationId) {
    super(_HideNotificationEvent.type);
    this.notificationId = notificationId;
  }
};
var HideNotificationEvent = _HideNotificationEvent;
HideNotificationEvent.type = "hide-notification";
var _HideOverlayEvent = class extends ViewerEvent {
  /** @internal */
  constructor(overlayId) {
    super(_HideOverlayEvent.type);
    this.overlayId = overlayId;
  }
};
var HideOverlayEvent = _HideOverlayEvent;
HideOverlayEvent.type = "hide-overlay";
var _HidePanelEvent = class extends ViewerEvent {
  /** @internal */
  constructor(panelId) {
    super(_HidePanelEvent.type);
    this.panelId = panelId;
  }
};
var HidePanelEvent = _HidePanelEvent;
HidePanelEvent.type = "hide-panel";
var _KeypressEvent = class extends ViewerEvent {
  /** @internal */
  constructor(key) {
    super(_KeypressEvent.type, true);
    this.key = key;
  }
};
var KeypressEvent = _KeypressEvent;
KeypressEvent.type = "key-press";
var _LoadProgressEvent = class extends ViewerEvent {
  /** @internal */
  constructor(progress) {
    super(_LoadProgressEvent.type);
    this.progress = progress;
  }
};
var LoadProgressEvent = _LoadProgressEvent;
LoadProgressEvent.type = "load-progress";
var _PanoramaLoadedEvent = class extends ViewerEvent {
  /** @internal */
  constructor(data) {
    super(_PanoramaLoadedEvent.type);
    this.data = data;
  }
};
var PanoramaLoadedEvent = _PanoramaLoadedEvent;
PanoramaLoadedEvent.type = "panorama-loaded";
var _PositionUpdatedEvent = class extends ViewerEvent {
  /** @internal */
  constructor(position) {
    super(_PositionUpdatedEvent.type);
    this.position = position;
  }
};
var PositionUpdatedEvent = _PositionUpdatedEvent;
PositionUpdatedEvent.type = "position-updated";
var _ReadyEvent = class extends ViewerEvent {
  /** @internal */
  constructor() {
    super(_ReadyEvent.type);
  }
};
var ReadyEvent = _ReadyEvent;
ReadyEvent.type = "ready";
var _RenderEvent = class extends ViewerEvent {
  /** @internal */
  constructor() {
    super(_RenderEvent.type);
  }
};
var RenderEvent = _RenderEvent;
RenderEvent.type = "render";
var _ShowNotificationEvent = class extends ViewerEvent {
  /** @internal */
  constructor(notificationId) {
    super(_ShowNotificationEvent.type);
    this.notificationId = notificationId;
  }
};
var ShowNotificationEvent = _ShowNotificationEvent;
ShowNotificationEvent.type = "show-notification";
var _ShowOverlayEvent = class extends ViewerEvent {
  /** @internal */
  constructor(overlayId) {
    super(_ShowOverlayEvent.type);
    this.overlayId = overlayId;
  }
};
var ShowOverlayEvent = _ShowOverlayEvent;
ShowOverlayEvent.type = "show-overlay";
var _ShowPanelEvent = class extends ViewerEvent {
  /** @internal */
  constructor(panelId) {
    super(_ShowPanelEvent.type);
    this.panelId = panelId;
  }
};
var ShowPanelEvent = _ShowPanelEvent;
ShowPanelEvent.type = "show-panel";
var _SizeUpdatedEvent = class extends ViewerEvent {
  /** @internal */
  constructor(size) {
    super(_SizeUpdatedEvent.type);
    this.size = size;
  }
};
var SizeUpdatedEvent = _SizeUpdatedEvent;
SizeUpdatedEvent.type = "size-updated";
var _StopAllEvent = class extends ViewerEvent {
  /** @internal */
  constructor() {
    super(_StopAllEvent.type);
  }
};
var StopAllEvent = _StopAllEvent;
StopAllEvent.type = "stop-all";
var _ZoomUpdatedEvent = class extends ViewerEvent {
  /** @internal */
  constructor(zoomLevel) {
    super(_ZoomUpdatedEvent.type);
    this.zoomLevel = zoomLevel;
  }
};
var ZoomUpdatedEvent = _ZoomUpdatedEvent;
ZoomUpdatedEvent.type = "zoom-updated";
var ObjectEvent = class extends ViewerEvent {
  /** @internal */
  constructor(type, originalEvent, object, viewerPoint, userDataKey) {
    super(type);
    this.originalEvent = originalEvent;
    this.object = object;
    this.viewerPoint = viewerPoint;
    this.userDataKey = userDataKey;
  }
};
var _ObjectEnterEvent = class extends ObjectEvent {
  /** @internal */
  constructor(originalEvent, object, viewerPoint, userDataKey) {
    super(_ObjectEnterEvent.type, originalEvent, object, viewerPoint, userDataKey);
  }
};
var ObjectEnterEvent = _ObjectEnterEvent;
ObjectEnterEvent.type = "enter-object";
var _ObjectLeaveEvent = class extends ObjectEvent {
  /** @internal */
  constructor(originalEvent, object, viewerPoint, userDataKey) {
    super(_ObjectLeaveEvent.type, originalEvent, object, viewerPoint, userDataKey);
  }
};
var ObjectLeaveEvent = _ObjectLeaveEvent;
ObjectLeaveEvent.type = "leave-object";
var _ObjectHoverEvent = class extends ObjectEvent {
  /** @internal */
  constructor(originalEvent, object, viewerPoint, userDataKey) {
    super(_ObjectHoverEvent.type, originalEvent, object, viewerPoint, userDataKey);
  }
};
var ObjectHoverEvent = _ObjectHoverEvent;
ObjectHoverEvent.type = "hover-object";

// src/adapters/AbstractAdapter.ts
import { ShaderMaterial, Texture as Texture2 } from "three";
var _AbstractAdapter = class {
  constructor(viewer) {
    this.viewer = viewer;
  }
  /**
   * Destroys the adapter
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  destroy() {
  }
  /**
   * Indicates if the adapter supports transitions between panoramas
   */
  // @ts-ignore unused paramater
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  supportsTransition(panorama) {
    return false;
  }
  /**
   * Indicates if the adapter supports preload of a panorama
   */
  // @ts-ignore unused paramater
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  supportsPreload(panorama) {
    return false;
  }
  /**
   * @internal
   */
  static createOverlayMaterial({
    additionalUniforms,
    overrideVertexShader
  } = {}) {
    return new ShaderMaterial({
      uniforms: {
        ...additionalUniforms,
        [_AbstractAdapter.OVERLAY_UNIFORMS.panorama]: { value: new Texture2() },
        [_AbstractAdapter.OVERLAY_UNIFORMS.overlay]: { value: new Texture2() },
        [_AbstractAdapter.OVERLAY_UNIFORMS.globalOpacity]: { value: 1 },
        [_AbstractAdapter.OVERLAY_UNIFORMS.overlayOpacity]: { value: 1 }
      },
      vertexShader: overrideVertexShader || `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix *  modelViewMatrix * vec4( position, 1.0 );
}`,
      fragmentShader: `
uniform sampler2D ${_AbstractAdapter.OVERLAY_UNIFORMS.panorama};
uniform sampler2D ${_AbstractAdapter.OVERLAY_UNIFORMS.overlay};
uniform float ${_AbstractAdapter.OVERLAY_UNIFORMS.globalOpacity};
uniform float ${_AbstractAdapter.OVERLAY_UNIFORMS.overlayOpacity};

varying vec2 vUv;

void main() {
  vec4 tColor1 = texture2D( ${_AbstractAdapter.OVERLAY_UNIFORMS.panorama}, vUv );
  vec4 tColor2 = texture2D( ${_AbstractAdapter.OVERLAY_UNIFORMS.overlay}, vUv );
  gl_FragColor = vec4(
    mix( tColor1.rgb, tColor2.rgb, tColor2.a * ${_AbstractAdapter.OVERLAY_UNIFORMS.overlayOpacity} ),
    ${_AbstractAdapter.OVERLAY_UNIFORMS.globalOpacity}
  );
}`
    });
  }
};
var AbstractAdapter = _AbstractAdapter;
/**
 * Indicates if the adapter supports panorama download natively
 */
AbstractAdapter.supportsDownload = false;
/**
 * Indicates if the adapter can display an additional transparent image above the panorama
 */
AbstractAdapter.supportsOverlay = false;
/**
 * @internal
 */
AbstractAdapter.OVERLAY_UNIFORMS = {
  panorama: "panorama",
  overlay: "overlay",
  globalOpacity: "globalOpacity",
  overlayOpacity: "overlayOpacity"
};
function adapterInterop(adapter) {
  if (adapter) {
    for (const [, p] of [["_", adapter], ...Object.entries(adapter)]) {
      if (p.prototype instanceof AbstractAdapter) {
        return p;
      }
    }
  }
  return null;
}

// src/adapters/EquirectangularAdapter.ts
import { MathUtils as MathUtils3, Mesh as Mesh2, SphereGeometry, Texture as Texture3 } from "three";

// src/data/system.ts
var LOCALSTORAGE_TOUCH_SUPPORT = `${VIEWER_DATA}_touchSupport`;
var SYSTEM = {
  /**
   * Indicates if the system data has been loaded
   */
  loaded: false,
  /**
   * Device screen pixel ratio
   */
  pixelRatio: 1,
  /**
   * Device supports WebGL
   */
  isWebGLSupported: false,
  /**
   * Maximum WebGL texture width
   */
  maxTextureWidth: 0,
  /**
   * Device supports touch events
   */
  isTouchEnabled: null,
  /**
   * Name of the fullscreen event
   */
  fullscreenEvent: null,
  /**
   * @internal
   */
  __maxCanvasWidth: null,
  /**
   * Maximum canvas width
   */
  get maxCanvasWidth() {
    if (this.__maxCanvasWidth === null) {
      this.__maxCanvasWidth = getMaxCanvasWidth(this.maxTextureWidth);
    }
    return this.__maxCanvasWidth;
  },
  /**
   * Loads the system if not already loaded
   * @internal
   */
  load() {
    if (!this.loaded) {
      const ctx = getWebGLCtx();
      this.pixelRatio = window.devicePixelRatio || 1;
      this.isWebGLSupported = ctx !== null;
      this.maxTextureWidth = ctx ? ctx.getParameter(ctx.MAX_TEXTURE_SIZE) : 0;
      this.isTouchEnabled = isTouchEnabled();
      this.fullscreenEvent = getFullscreenEvent();
      this.loaded = true;
    }
    if (!SYSTEM.isWebGLSupported) {
      throw new PSVError("WebGL is not supported.");
    }
    if (SYSTEM.maxTextureWidth === 0) {
      throw new PSVError("Unable to detect system capabilities");
    }
  }
};
function getWebGLCtx() {
  const canvas = document.createElement("canvas");
  const names = ["webgl2", "webgl", "experimental-webgl", "moz-webgl", "webkit-3d"];
  let context = null;
  if (!canvas.getContext) {
    return null;
  }
  if (names.some((name) => {
    try {
      context = canvas.getContext(name);
      return context !== null;
    } catch (e) {
      return false;
    }
  })) {
    return context;
  } else {
    return null;
  }
}
function isTouchEnabled() {
  let initial = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  if (LOCALSTORAGE_TOUCH_SUPPORT in localStorage) {
    initial = localStorage[LOCALSTORAGE_TOUCH_SUPPORT] === "true";
  }
  const promise = new Promise((resolve) => {
    const clear = () => {
      window.removeEventListener("mousedown", listenerMouse);
      window.removeEventListener("touchstart", listenerTouch);
      clearTimeout(listenerTimeoutId);
    };
    const listenerMouse = () => {
      clear();
      localStorage[LOCALSTORAGE_TOUCH_SUPPORT] = false;
      resolve(false);
    };
    const listenerTouch = () => {
      clear();
      localStorage[LOCALSTORAGE_TOUCH_SUPPORT] = true;
      resolve(true);
    };
    const listenerTimeout = () => {
      clear();
      localStorage[LOCALSTORAGE_TOUCH_SUPPORT] = initial;
      resolve(initial);
    };
    window.addEventListener("mousedown", listenerMouse, false);
    window.addEventListener("touchstart", listenerTouch, false);
    const listenerTimeoutId = setTimeout(listenerTimeout, 1e4);
  });
  return { initial, promise };
}
function getMaxCanvasWidth(maxWidth) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = maxWidth;
  canvas.height = maxWidth / 2;
  while (canvas.width > 1024) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 1, 1);
    try {
      if (ctx.getImageData(0, 0, 1, 1).data[0] > 0) {
        return canvas.width;
      }
    } catch (e) {
    }
    canvas.width /= 2;
    canvas.height /= 2;
  }
  throw new PSVError("Unable to detect system capabilities");
}
function getFullscreenEvent() {
  if ("exitFullscreen" in document) {
    return "fullscreenchange";
  }
  if ("webkitExitFullscreen" in document) {
    return "webkitfullscreenchange";
  }
  return null;
}

// src/adapters/EquirectangularAdapter.ts
var getConfig = getConfigParser(
  {
    resolution: 64,
    blur: false
  },
  {
    resolution: (resolution) => {
      if (!resolution || !MathUtils3.isPowerOfTwo(resolution)) {
        throw new PSVError("EquirectangularAdapter resolution must be power of two");
      }
      return resolution;
    }
  }
);
var EquirectangularAdapter = class extends AbstractAdapter {
  constructor(viewer, config) {
    super(viewer);
    this.config = getConfig(config);
    this.SPHERE_SEGMENTS = this.config.resolution;
    this.SPHERE_HORIZONTAL_SEGMENTS = this.SPHERE_SEGMENTS / 2;
  }
  supportsTransition() {
    return true;
  }
  supportsPreload() {
    return true;
  }
  async loadTexture(panorama, newPanoData, useXmpPanoData = this.viewer.config.useXmpData) {
    if (typeof panorama !== "string") {
      return Promise.reject(new PSVError("Invalid panorama url, are you using the right adapter?"));
    }
    let img;
    let xmpPanoData;
    if (useXmpPanoData) {
      xmpPanoData = await this.loadXMP(panorama);
      img = await this.viewer.textureLoader.loadImage(panorama);
    } else {
      img = await this.viewer.textureLoader.loadImage(panorama);
    }
    if (typeof newPanoData === "function") {
      newPanoData = newPanoData(img);
    }
    const panoData = {
      fullWidth: firstNonNull(newPanoData?.fullWidth, xmpPanoData?.fullWidth, img.width),
      fullHeight: firstNonNull(newPanoData?.fullHeight, xmpPanoData?.fullHeight, img.height),
      croppedWidth: firstNonNull(newPanoData?.croppedWidth, xmpPanoData?.croppedWidth, img.width),
      croppedHeight: firstNonNull(newPanoData?.croppedHeight, xmpPanoData?.croppedHeight, img.height),
      croppedX: firstNonNull(newPanoData?.croppedX, xmpPanoData?.croppedX, 0),
      croppedY: firstNonNull(newPanoData?.croppedY, xmpPanoData?.croppedY, 0),
      poseHeading: firstNonNull(newPanoData?.poseHeading, xmpPanoData?.poseHeading, 0),
      posePitch: firstNonNull(newPanoData?.posePitch, xmpPanoData?.posePitch, 0),
      poseRoll: firstNonNull(newPanoData?.poseRoll, xmpPanoData?.poseRoll, 0)
    };
    if (panoData.croppedWidth !== img.width || panoData.croppedHeight !== img.height) {
      logWarn(`Invalid panoData, croppedWidth and/or croppedHeight is not coherent with loaded image.
              panoData: ${panoData.croppedWidth}x${panoData.croppedHeight}, image: ${img.width}x${img.height}`);
    }
    if ((newPanoData || xmpPanoData) && panoData.fullWidth !== panoData.fullHeight * 2) {
      logWarn("Invalid panoData, fullWidth should be twice fullHeight");
    }
    const texture = this.createEquirectangularTexture(img, panoData);
    return { panorama, texture, panoData };
  }
  /**
   * Loads the XMP data of an image
   */
  async loadXMP(panorama, onProgress) {
    const blob = await this.viewer.textureLoader.loadFile(panorama, onProgress);
    const binary = await this.loadBlobAsString(blob);
    const a = binary.indexOf("<x:xmpmeta");
    const b = binary.indexOf("</x:xmpmeta>");
    const data = binary.substring(a, b);
    if (a !== -1 && b !== -1 && data.includes("GPano:")) {
      return {
        fullWidth: getXMPValue(data, "FullPanoWidthPixels"),
        fullHeight: getXMPValue(data, "FullPanoHeightPixels"),
        croppedWidth: getXMPValue(data, "CroppedAreaImageWidthPixels"),
        croppedHeight: getXMPValue(data, "CroppedAreaImageHeightPixels"),
        croppedX: getXMPValue(data, "CroppedAreaLeftPixels"),
        croppedY: getXMPValue(data, "CroppedAreaTopPixels"),
        poseHeading: getXMPValue(data, "PoseHeadingDegrees"),
        posePitch: getXMPValue(data, "PosePitchDegrees"),
        poseRoll: getXMPValue(data, "PoseRollDegrees")
      };
    }
    return null;
  }
  /**
   * Reads a Blob as a string
   */
  loadBlobAsString(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsText(blob);
    });
  }
  /**
   * Creates the final texture from image and panorama data
   */
  createEquirectangularTexture(img, panoData) {
    if (this.config.blur || panoData.fullWidth > SYSTEM.maxTextureWidth || panoData.croppedWidth !== panoData.fullWidth || panoData.croppedHeight !== panoData.fullHeight) {
      const ratio = Math.min(1, SYSTEM.maxCanvasWidth / panoData.fullWidth);
      const resizedPanoData = {
        fullWidth: panoData.fullWidth * ratio,
        fullHeight: panoData.fullHeight * ratio,
        croppedWidth: panoData.croppedWidth * ratio,
        croppedHeight: panoData.croppedHeight * ratio,
        croppedX: panoData.croppedX * ratio,
        croppedY: panoData.croppedY * ratio
      };
      const buffer = document.createElement("canvas");
      buffer.width = resizedPanoData.fullWidth;
      buffer.height = resizedPanoData.fullHeight;
      const ctx = buffer.getContext("2d");
      if (this.config.blur) {
        ctx.filter = "blur(1px)";
      }
      ctx.drawImage(
        img,
        resizedPanoData.croppedX,
        resizedPanoData.croppedY,
        resizedPanoData.croppedWidth,
        resizedPanoData.croppedHeight
      );
      return createTexture(buffer);
    }
    return createTexture(img);
  }
  createMesh(scale = 1) {
    const geometry = new SphereGeometry(
      SPHERE_RADIUS * scale,
      this.SPHERE_SEGMENTS,
      this.SPHERE_HORIZONTAL_SEGMENTS,
      -Math.PI / 2
    ).scale(1, 1, 1);
    const material = AbstractAdapter.createOverlayMaterial();
    return new Mesh2(geometry, material);
  }
  setTexture(mesh, textureData) {
    this.__setUniform(mesh, AbstractAdapter.OVERLAY_UNIFORMS.panorama, textureData.texture);
    this.setOverlay(mesh, null, 1);
  }
  setOverlay(mesh, textureData, opacity) {
    this.__setUniform(mesh, AbstractAdapter.OVERLAY_UNIFORMS.overlayOpacity, opacity);
    if (!textureData) {
      this.__setUniform(mesh, AbstractAdapter.OVERLAY_UNIFORMS.overlay, new Texture3());
    } else {
      this.__setUniform(mesh, AbstractAdapter.OVERLAY_UNIFORMS.overlay, textureData.texture);
    }
  }
  setTextureOpacity(mesh, opacity) {
    this.__setUniform(mesh, AbstractAdapter.OVERLAY_UNIFORMS.globalOpacity, opacity);
    mesh.material.transparent = opacity < 1;
  }
  disposeTexture(textureData) {
    textureData.texture?.dispose();
  }
  __setUniform(mesh, uniform, value) {
    if (mesh.material.uniforms[uniform].value instanceof Texture3) {
      mesh.material.uniforms[uniform].value.dispose();
    }
    mesh.material.uniforms[uniform].value = value;
  }
};
EquirectangularAdapter.id = "equirectangular";
EquirectangularAdapter.supportsDownload = true;
EquirectangularAdapter.supportsOverlay = true;

// src/data/config.ts
import { MathUtils as MathUtils4 } from "three";

// src/plugins/AbstractPlugin.ts
var AbstractPlugin = class extends TypedEventTarget {
  constructor(viewer) {
    super();
    this.viewer = viewer;
  }
  /**
   * Initializes the plugin
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  /**
   * Destroys the plugin
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  destroy() {
  }
};
var AbstractConfigurablePlugin = class extends AbstractPlugin {
  constructor(viewer, config) {
    super(viewer);
    this.config = this.constructor.configParser(config);
  }
  /**
   * Update options
   */
  setOption(option, value) {
    this.setOptions({ [option]: value });
  }
  /**
   * Update options
   */
  setOptions(options) {
    const rawConfig = {
      ...this.config,
      ...options
    };
    const ctor = this.constructor;
    const parser = ctor.configParser;
    const readonly = ctor.readonlyOptions;
    const id = ctor.id;
    for (let [key, value] of Object.entries(options)) {
      if (!(key in parser.defaults)) {
        logWarn(`${id}: Unknown option "${key}"`);
        continue;
      }
      if (readonly.includes(key)) {
        logWarn(`${id}: Option "${key}" cannot be updated`);
        continue;
      }
      if (key in parser.parsers) {
        value = parser.parsers[key](value, {
          rawConfig,
          defValue: parser.defaults[key]
        });
      }
      this.config[key] = value;
    }
  }
};
AbstractConfigurablePlugin.readonlyOptions = [];
function pluginInterop(plugin) {
  if (plugin) {
    for (const [, p] of [["_", plugin], ...Object.entries(plugin)]) {
      if (p.prototype instanceof AbstractPlugin) {
        return p;
      }
    }
  }
  return null;
}

// src/data/config.ts
var DEFAULTS = {
  panorama: null,
  overlay: null,
  overlayOpacity: 1,
  container: null,
  camera: null,
  meshContainer: null,
  scene: null,
  adapter: [EquirectangularAdapter, null],
  plugins: [],
  caption: null,
  description: null,
  downloadUrl: null,
  downloadName: null,
  loadingImg: null,
  loadingTxt: "Loading...",
  size: null,
  fisheye: 0,
  minFov: 30,
  maxFov: 90,
  defaultZoomLvl: 50,
  defaultYaw: 0,
  defaultPitch: 0,
  sphereCorrection: null,
  moveSpeed: 1,
  zoomSpeed: 1,
  moveInertia: true,
  mousewheel: true,
  mousemove: true,
  mousewheelCtrlKey: false,
  touchmoveTwoFingers: false,
  useXmpData: true,
  panoData: null,
  requestHeaders: null,
  canvasBackground: "#000",
  withCredentials: false,
  // prettier-ignore
  navbar: [
    "zoom",
    "move",
    "download",
    "description",
    "caption",
    "fullscreen"
  ],
  lang: {
    zoom: "Zoom",
    zoomOut: "Zoom out",
    zoomIn: "Zoom in",
    moveUp: "Move up",
    moveDown: "Move down",
    moveLeft: "Move left",
    moveRight: "Move right",
    download: "Download",
    fullscreen: "Fullscreen",
    menu: "Menu",
    close: "Close",
    twoFingers: "Use two fingers to navigate",
    ctrlZoom: "Use ctrl + scroll to zoom the image",
    loadError: "The panorama can't be loaded"
  },
  keyboard: "fullscreen",
  keyboardActions: {
    [KEY_CODES.ArrowUp]: "ROTATE_UP" /* ROTATE_UP */,
    [KEY_CODES.ArrowDown]: "ROTATE_DOWN" /* ROTATE_DOWN */,
    [KEY_CODES.ArrowRight]: "ROTATE_RIGHT" /* ROTATE_RIGHT */,
    [KEY_CODES.ArrowLeft]: "ROTATE_LEFT" /* ROTATE_LEFT */,
    [KEY_CODES.PageUp]: "ZOOM_IN" /* ZOOM_IN */,
    [KEY_CODES.PageDown]: "ZOOM_OUT" /* ZOOM_OUT */,
    [KEY_CODES.Plus]: "ZOOM_IN" /* ZOOM_IN */,
    [KEY_CODES.Minus]: "ZOOM_OUT" /* ZOOM_OUT */
  }
};
var READONLY_OPTIONS = {
  panorama: "Use setPanorama method to change the panorama",
  panoData: "Use setPanorama method to change the panorama",
  overlay: "Use setOverlay method to changer the overlay",
  overlayOpacity: "Use setOverlay method to changer the overlay",
  container: "Cannot change viewer container",
  adapter: "Cannot change adapter",
  plugins: "Cannot change plugins"
};
var CONFIG_PARSERS = {
  container: (container) => {
    if (!container) {
      throw new PSVError("No value given for container.");
    }
    return container;
  },
  adapter: (adapter, { defValue }) => {
    if (!adapter) {
      adapter = defValue;
    } else if (Array.isArray(adapter)) {
      adapter = [adapterInterop(adapter[0]), adapter[1]];
    } else {
      adapter = [adapterInterop(adapter), null];
    }
    if (!adapter[0]) {
      throw new PSVError("An undefined value was given for adapter.");
    }
    if (!adapter[0].id) {
      throw new PSVError(`Adapter has no id.`);
    }
    return adapter;
  },
  overlayOpacity: (overlayOpacity) => {
    return MathUtils4.clamp(overlayOpacity, 0, 1);
  },
  defaultYaw: (defaultYaw) => {
    return parseAngle(defaultYaw);
  },
  defaultPitch: (defaultPitch) => {
    return parseAngle(defaultPitch, true);
  },
  defaultZoomLvl: (defaultZoomLvl) => {
    return MathUtils4.clamp(defaultZoomLvl, 0, 100);
  },
  minFov: (minFov, { rawConfig }) => {
    if (rawConfig.maxFov < minFov) {
      logWarn("maxFov cannot be lower than minFov");
      minFov = rawConfig.maxFov;
    }
    return MathUtils4.clamp(minFov, 1, 179);
  },
  maxFov: (maxFov, { rawConfig }) => {
    if (maxFov < rawConfig.minFov) {
      maxFov = rawConfig.minFov;
    }
    return MathUtils4.clamp(maxFov, 1, 179);
  },
  lang: (lang) => {
    if (Array.isArray(lang.twoFingers)) {
      logWarn("lang.twoFingers must not be an array");
      lang.twoFingers = lang.twoFingers[0];
    }
    return {
      ...DEFAULTS.lang,
      ...lang
    };
  },
  keyboard: (keyboard) => {
    if (!keyboard) {
      return false;
    }
    if (typeof keyboard === "object") {
      logWarn(`Use keyboardActions to configure the keyboard actions, keyboard option must be either true, false, 'fullscreen' or 'always'`);
      return "fullscreen";
    }
    return keyboard === "always" ? "always" : "fullscreen";
  },
  keyboardActions: (keyboardActions, { rawConfig }) => {
    if (rawConfig.keyboard && typeof rawConfig.keyboard === "object") {
      return rawConfig.keyboard;
    }
    return keyboardActions;
  },
  fisheye: (fisheye) => {
    if (fisheye === true) {
      return 1;
    } else if (fisheye === false) {
      return 0;
    }
    return fisheye;
  },
  requestHeaders: (requestHeaders) => {
    if (requestHeaders && typeof requestHeaders === "object") {
      return () => requestHeaders;
    }
    if (typeof requestHeaders === "function") {
      return requestHeaders;
    }
    return null;
  },
  plugins: (plugins) => {
    return plugins.map((plugin, i) => {
      if (Array.isArray(plugin)) {
        plugin = [pluginInterop(plugin[0]), plugin[1]];
      } else {
        plugin = [pluginInterop(plugin), null];
      }
      if (!plugin[0]) {
        throw new PSVError(`An undefined value was given for plugin ${i}.`);
      }
      if (!plugin[0].id) {
        throw new PSVError(`Plugin ${i} has no id.`);
      }
      return plugin;
    });
  },
  navbar: (navbar) => {
    if (navbar === false) {
      return null;
    }
    if (navbar === true) {
      return clone(DEFAULTS.navbar);
    }
    if (typeof navbar === "string") {
      return navbar.split(/[ ,]/);
    }
    return navbar;
  }
};
var getViewerConfig = getConfigParser(DEFAULTS, CONFIG_PARSERS);

// src/services/DataHelper.ts
import { Euler as Euler2, MathUtils as MathUtils5, Vector3 as Vector32 } from "three";

// src/services/AbstractService.ts
var AbstractService = class {
  /**
   * @internal
   */
  constructor(viewer) {
    this.viewer = viewer;
    this.config = viewer.config;
    this.state = viewer.state;
  }
  /**
   * Destroys the service
   * @internal
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  destroy() {
  }
};

// src/services/DataHelper.ts
var vector3 = new Vector32();
var EULER_ZERO = new Euler2(0, 0, 0, "ZXY");
var DataHelper = class extends AbstractService {
  /**
   * @internal
   */
  constructor(viewer) {
    super(viewer);
  }
  /**
   * Converts vertical FOV to zoom level
   */
  fovToZoomLevel(fov) {
    const temp = Math.round((fov - this.config.minFov) / (this.config.maxFov - this.config.minFov) * 100);
    return temp - 2 * (temp - 50);
  }
  /**
   * Converts zoom level to vertical FOV
   */
  zoomLevelToFov(level) {
    return this.config.maxFov + level / 100 * (this.config.minFov - this.config.maxFov);
  }
  /**
   * Converts vertical FOV to horizontal FOV
   */
  vFovToHFov(vFov) {
    return MathUtils5.radToDeg(2 * Math.atan(Math.tan(MathUtils5.degToRad(vFov) / 2) * this.state.aspect));
  }
  /**
   * Converts a speed into a duration from current position to a new position
   */
  speedToDuration(value, angle2) {
    if (typeof value !== "number") {
      const speed = parseSpeed(value);
      return angle2 / Math.abs(speed) * 1e3;
    } else {
      return Math.abs(value);
    }
  }
  /**
   * Converts pixel texture coordinates to spherical radians coordinates
   * @throws {@link PSVError} when the current adapter does not support texture coordinates
   */
  textureCoordsToSphericalCoords(point) {
    const panoData = this.state.panoData;
    if (!panoData) {
      throw new PSVError("Current adapter does not support texture coordinates.");
    }
    const relativeX = (point.textureX + panoData.croppedX) / panoData.fullWidth * Math.PI * 2;
    const relativeY = (point.textureY + panoData.croppedY) / panoData.fullHeight * Math.PI;
    const result = {
      yaw: relativeX >= Math.PI ? relativeX - Math.PI : relativeX + Math.PI,
      pitch: Math.PI / 2 - relativeY
    };
    if (!EULER_ZERO.equals(this.viewer.renderer.panoramaPose) || !EULER_ZERO.equals(this.viewer.renderer.sphereCorrection)) {
      this.sphericalCoordsToVector3(result, vector3);
      vector3.applyEuler(this.viewer.renderer.panoramaPose);
      vector3.applyEuler(this.viewer.renderer.sphereCorrection);
      return this.vector3ToSphericalCoords(vector3);
    } else {
      return result;
    }
  }
  /**
   * Converts spherical radians coordinates to pixel texture coordinates
   * @throws {@link PSVError} when the current adapter does not support texture coordinates
   */
  sphericalCoordsToTextureCoords(position) {
    const panoData = this.state.panoData;
    if (!panoData) {
      throw new PSVError("Current adapter does not support texture coordinates.");
    }
    if (!EULER_ZERO.equals(this.viewer.renderer.panoramaPose) || !EULER_ZERO.equals(this.viewer.renderer.sphereCorrection)) {
      this.sphericalCoordsToVector3(position, vector3);
      applyEulerInverse(vector3, this.viewer.renderer.sphereCorrection);
      applyEulerInverse(vector3, this.viewer.renderer.panoramaPose);
      position = this.vector3ToSphericalCoords(vector3);
    }
    const relativeLong = position.yaw / Math.PI / 2 * panoData.fullWidth;
    const relativeLat = position.pitch / Math.PI * panoData.fullHeight;
    return {
      textureX: Math.round(
        position.yaw < Math.PI ? relativeLong + panoData.fullWidth / 2 : relativeLong - panoData.fullWidth / 2
      ) - panoData.croppedX,
      textureY: Math.round(panoData.fullHeight / 2 - relativeLat) - panoData.croppedY
    };
  }
  /**
   * Converts spherical radians coordinates to a Vector3
   */
  sphericalCoordsToVector3(position, vector) {
    if (!vector) {
      vector = new Vector32();
    }
    vector.x = SPHERE_RADIUS * -Math.cos(position.pitch) * Math.sin(position.yaw);
    vector.y = SPHERE_RADIUS * Math.sin(position.pitch);
    vector.z = SPHERE_RADIUS * Math.cos(position.pitch) * Math.cos(position.yaw);
    return vector;
  }
  /**
   * Converts a Vector3 to spherical radians coordinates
   */
  vector3ToSphericalCoords(vector) {
    const phi = Math.acos(vector.y / Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z));
    const theta = Math.atan2(vector.x, vector.z);
    return {
      yaw: theta < 0 ? -theta : Math.PI * 2 - theta,
      pitch: Math.PI / 2 - phi
    };
  }
  /**
   * Converts position on the viewer to a THREE.Vector3
   */
  viewerCoordsToVector3(viewerPoint) {
    const sphereIntersect = this.viewer.renderer.getIntersections(viewerPoint).filter((i) => i.object.userData[VIEWER_DATA]);
    if (sphereIntersect.length) {
      return sphereIntersect[0].point;
    } else {
      return null;
    }
  }
  /**
   * Converts position on the viewer to spherical radians coordinates
   */
  viewerCoordsToSphericalCoords(viewerPoint) {
    const vector = this.viewerCoordsToVector3(viewerPoint);
    return vector ? this.vector3ToSphericalCoords(vector) : null;
  }
  /**
   * Converts a Vector3 to position on the viewer
   */
  vector3ToViewerCoords(vector) {
    const vectorClone = vector.clone();
    vectorClone.project(this.viewer.renderer.camera);
    return {
      x: Math.round((vectorClone.x + 1) / 2 * this.state.size.width),
      y: Math.round((1 - vectorClone.y) / 2 * this.state.size.height)
    };
  }
  /**
   * Converts spherical radians coordinates to position on the viewer
   */
  sphericalCoordsToViewerCoords(position) {
    this.sphericalCoordsToVector3(position, vector3);
    return this.vector3ToViewerCoords(vector3);
  }
  /**
   * Converts pixel position to angles if present and ensure boundaries
   */
  cleanPosition(position) {
    if (position.textureX !== void 0 && position.textureY !== void 0) {
      return this.textureCoordsToSphericalCoords(position);
    }
    return {
      yaw: parseAngle(position.yaw),
      pitch: parseAngle(position.pitch, !this.state.littlePlanet)
    };
  }
  /**
   * Ensure a SphereCorrection object is valid
   */
  cleanSphereCorrection(sphereCorrection) {
    return {
      pan: parseAngle(sphereCorrection?.pan || 0),
      tilt: parseAngle(sphereCorrection?.tilt || 0, true),
      roll: parseAngle(sphereCorrection?.roll || 0, true, false)
    };
  }
  /**
   * Parse the pose angles of the pano data
   */
  cleanPanoramaPose(panoData) {
    return {
      pan: MathUtils5.degToRad(panoData?.poseHeading || 0),
      tilt: MathUtils5.degToRad(panoData?.posePitch || 0),
      roll: MathUtils5.degToRad(panoData?.poseRoll || 0)
    };
  }
};

// src/services/EventsHandler.ts
import { MathUtils as MathUtils6, SplineCurve, Vector2 } from "three";

// src/icons/gesture.svg
var gesture_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="currentColor" d="M33.38 33.2a1.96 1.96 0 0 0 1.5-3.23 10.61 10.61 0 0 1 7.18-17.51c.7-.06 1.31-.49 1.61-1.12a13.02 13.02 0 0 1 11.74-7.43c7.14 0 12.96 5.8 12.96 12.9 0 3.07-1.1 6.05-3.1 8.38-.7.82-.61 2.05.21 2.76.83.7 2.07.6 2.78-.22a16.77 16.77 0 0 0 4.04-10.91C72.3 7.54 64.72 0 55.4 0a16.98 16.98 0 0 0-14.79 8.7 14.6 14.6 0 0 0-12.23 14.36c0 3.46 1.25 6.82 3.5 9.45.4.45.94.69 1.5.69m45.74 43.55a22.13 22.13 0 0 1-5.23 12.4c-4 4.55-9.53 6.86-16.42 6.86-12.6 0-20.1-10.8-20.17-10.91a1.82 1.82 0 0 0-.08-.1c-5.3-6.83-14.55-23.82-17.27-28.87-.05-.1 0-.21.02-.23a6.3 6.3 0 0 1 8.24 1.85l9.38 12.59a1.97 1.97 0 0 0 3.54-1.17V25.34a4 4 0 0 1 1.19-2.87 3.32 3.32 0 0 1 2.4-.95c1.88.05 3.4 1.82 3.4 3.94v24.32a1.96 1.96 0 0 0 3.93 0v-33.1a3.5 3.5 0 0 1 7 0v35.39a1.96 1.96 0 0 0 3.93 0v-.44c.05-2.05 1.6-3.7 3.49-3.7 1.93 0 3.5 1.7 3.5 3.82v5.63c0 .24.04.48.13.71l.1.26a1.97 1.97 0 0 0 3.76-.37c.33-1.78 1.77-3.07 3.43-3.07 1.9 0 3.45 1.67 3.5 3.74l-1.77 18.1zM77.39 51c-1.25 0-2.45.32-3.5.9v-.15c0-4.27-3.33-7.74-7.42-7.74-1.26 0-2.45.33-3.5.9V16.69a7.42 7.42 0 0 0-14.85 0v1.86a7 7 0 0 0-3.28-.94 7.21 7.21 0 0 0-5.26 2.07 7.92 7.92 0 0 0-2.38 5.67v37.9l-5.83-7.82a10.2 10.2 0 0 0-13.35-2.92 4.1 4.1 0 0 0-1.53 5.48C20 64.52 28.74 80.45 34.07 87.34c.72 1.04 9.02 12.59 23.4 12.59 7.96 0 14.66-2.84 19.38-8.2a26.06 26.06 0 0 0 6.18-14.6l1.78-18.2v-.2c0-4.26-3.32-7.73-7.42-7.73z"/><!--Created by AomAm from the Noun Project--></svg>\n';

// src/icons/mousewheel.svg
var mousewheel_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 17 79 79"><path fill="currentColor" d="M38.1 29.27c-.24 0-.44.2-.44.45v10.7a.45.45 0 00.9 0v-10.7c0-.25-.2-.45-.45-.45zm10.2 26.66a11.54 11.54 0 01-8.48-6.14.45.45 0 10-.8.41 12.45 12.45 0 009.22 6.62.45.45 0 00.07-.9zm24.55-13.08a23.04 23.04 0 00-22.56-23v7.07l-.01.05a2.83 2.83 0 012.39 2.78v14.03l.09-.02h8.84v-9.22a.45.45 0 11.9 0v9.22h10.35v-.9zm0 27.33V44.66H62.5c-.02 2.01-.52 4-1.47 5.76a.45.45 0 01-.61.18.45.45 0 01-.19-.61 11.54 11.54 0 001.36-5.33h-8.83l-.1-.01a2.83 2.83 0 01-2.83 2.84h-.04-.04a2.83 2.83 0 01-2.83-2.83v-14.9a2.82 2.82 0 012.47-2.8v-7.11a23.04 23.04 0 00-22.57 23v.91h14.72V29.88a8.2 8.2 0 015.02-7.57c.22-.1.5.01.59.24.1.23-.01.5-.24.6a7.3 7.3 0 00-4.47 6.73v13.88h3.9a.45.45 0 110 .9h-3.9v.15a7.32 7.32 0 0011.23 6.17.45.45 0 01.49.76 8.22 8.22 0 01-12.62-6.93v-.15H26.82v25.52a23.04 23.04 0 0023.01 23.01 23.04 23.04 0 0023.02-23.01zm1.8-27.33v27.33A24.85 24.85 0 0149.84 95a24.85 24.85 0 01-24.82-24.82V42.85a24.85 24.85 0 0124.82-24.82 24.85 24.85 0 0124.83 24.82zM57.98 29.88v9.36a.45.45 0 11-.9 0v-9.36a7.28 7.28 0 00-3.4-6.17.45.45 0 01.49-.76 8.18 8.18 0 013.8 6.93z"/><!-- Created by Icon Island from the Noun Project --></svg>\n';

// src/services/EventsHandler.ts
var EventsHandler = class extends AbstractService {
  constructor(viewer) {
    super(viewer);
    this.data = {
      step: 0 /* IDLE */,
      /** start x position of the click/touch */
      startMouseX: 0,
      /** start y position of the click/touch */
      startMouseY: 0,
      /** current x position of the cursor */
      mouseX: 0,
      /** current y position of the cursor */
      mouseY: 0,
      /** list of latest positions of the cursor, [time, x, y] */
      mouseHistory: [],
      /** distance between fingers when zooming */
      pinchDist: 0,
      /** when the Ctrl key is pressed */
      ctrlKeyDown: false,
      /** temporary storage of click data between two clicks */
      dblclickData: null,
      dblclickTimeout: null,
      longtouchTimeout: null,
      twofingersTimeout: null,
      ctrlZoomTimeout: null
    };
    this.keyHandler = new PressHandler();
    this.resizeObserver = new ResizeObserver(throttle(() => this.viewer.autoSize(), 50));
    this.moveThreshold = MOVE_THRESHOLD * SYSTEM.pixelRatio;
  }
  /**
   * @internal
   */
  init() {
    window.addEventListener("keydown", this, { passive: false });
    window.addEventListener("keyup", this);
    this.viewer.container.addEventListener("mousedown", this);
    window.addEventListener("mousemove", this, { passive: false });
    window.addEventListener("mouseup", this);
    this.viewer.container.addEventListener("touchstart", this, { passive: false });
    window.addEventListener("touchmove", this, { passive: false });
    window.addEventListener("touchend", this, { passive: false });
    this.viewer.container.addEventListener("wheel", this, { passive: false });
    document.addEventListener(SYSTEM.fullscreenEvent, this);
    this.resizeObserver.observe(this.viewer.container);
  }
  destroy() {
    window.removeEventListener("keydown", this);
    window.removeEventListener("keyup", this);
    this.viewer.container.removeEventListener("mousedown", this);
    window.removeEventListener("mousemove", this);
    window.removeEventListener("mouseup", this);
    this.viewer.container.removeEventListener("touchstart", this);
    window.removeEventListener("touchmove", this);
    window.removeEventListener("touchend", this);
    this.viewer.container.removeEventListener("wheel", this);
    document.removeEventListener(SYSTEM.fullscreenEvent, this);
    this.resizeObserver.disconnect();
    clearTimeout(this.data.dblclickTimeout);
    clearTimeout(this.data.longtouchTimeout);
    clearTimeout(this.data.twofingersTimeout);
    clearTimeout(this.data.ctrlZoomTimeout);
    super.destroy();
  }
  /**
   * @internal
   */
  handleEvent(evt) {
    switch (evt.type) {
      case "keydown":
        this.__onKeyDown(evt);
        break;
      case "keyup":
        this.__onKeyUp();
        break;
      case "mousemove":
        this.__onMouseMove(evt);
        break;
      case "mouseup":
        this.__onMouseUp(evt);
        break;
      case "touchmove":
        this.__onTouchMove(evt);
        break;
      case "touchend":
        this.__onTouchEnd(evt);
        break;
      case SYSTEM.fullscreenEvent:
        this.__onFullscreenChange();
        break;
    }
    if (!getClosest(evt.target, ".psv--capture-event")) {
      switch (evt.type) {
        case "mousedown":
          this.__onMouseDown(evt);
          break;
        case "touchstart":
          this.__onTouchStart(evt);
          break;
        case "wheel":
          this.__onMouseWheel(evt);
          break;
      }
    }
  }
  __isStep(...step) {
    return step.indexOf(this.data.step) !== -1;
  }
  /**
   * Handles keyboard events
   */
  __onKeyDown(e) {
    if (this.config.mousewheelCtrlKey) {
      this.data.ctrlKeyDown = e.key === KEY_CODES.Control;
      if (this.data.ctrlKeyDown) {
        clearTimeout(this.data.ctrlZoomTimeout);
        this.viewer.overlay.hide(IDS.CTRL_ZOOM);
      }
    }
    if (!this.viewer.dispatchEvent(new KeypressEvent(e.key))) {
      return;
    }
    if (!this.state.keyboardEnabled || !this.config.keyboard) {
      return;
    }
    const action = this.config.keyboardActions[e.key];
    if (typeof action === "function") {
      action(this.viewer);
      e.preventDefault();
    } else if (action && !this.keyHandler.pending) {
      if (action !== "ZOOM_IN" /* ZOOM_IN */ && action !== "ZOOM_OUT" /* ZOOM_OUT */) {
        this.viewer.stopAll();
      }
      switch (action) {
        case "ROTATE_UP" /* ROTATE_UP */:
          this.viewer.dynamics.position.roll({ pitch: false });
          break;
        case "ROTATE_DOWN" /* ROTATE_DOWN */:
          this.viewer.dynamics.position.roll({ pitch: true });
          break;
        case "ROTATE_RIGHT" /* ROTATE_RIGHT */:
          this.viewer.dynamics.position.roll({ yaw: false });
          break;
        case "ROTATE_LEFT" /* ROTATE_LEFT */:
          this.viewer.dynamics.position.roll({ yaw: true });
          break;
        case "ZOOM_IN" /* ZOOM_IN */:
          this.viewer.dynamics.zoom.roll(false);
          break;
        case "ZOOM_OUT" /* ZOOM_OUT */:
          this.viewer.dynamics.zoom.roll(true);
          break;
      }
      this.keyHandler.down();
      e.preventDefault();
    }
  }
  /**
   * Handles keyboard events
   */
  __onKeyUp() {
    this.data.ctrlKeyDown = false;
    if (!this.state.keyboardEnabled) {
      return;
    }
    this.keyHandler.up(() => {
      this.viewer.dynamics.position.stop();
      this.viewer.dynamics.zoom.stop();
      this.viewer.resetIdleTimer();
    });
  }
  /**
   * Handles mouse down events
   */
  __onMouseDown(evt) {
    this.data.step = 1 /* CLICK */;
    this.data.startMouseX = evt.clientX;
    this.data.startMouseY = evt.clientY;
  }
  /**
   *Handles mouse up events
   */
  __onMouseUp(evt) {
    if (this.__isStep(1 /* CLICK */, 2 /* MOVING */)) {
      this.__stopMove(evt.clientX, evt.clientY, evt.target, evt.button === 2);
    }
  }
  /**
   * Handles mouse move events
   */
  __onMouseMove(evt) {
    if (this.config.mousemove && this.__isStep(1 /* CLICK */, 2 /* MOVING */)) {
      evt.preventDefault();
      this.__doMove(evt.clientX, evt.clientY);
    }
    this.__handleObjectsEvents(evt);
  }
  /**
   * Handles touch events
   */
  __onTouchStart(evt) {
    if (evt.touches.length === 1) {
      this.data.step = 1 /* CLICK */;
      this.data.startMouseX = evt.touches[0].clientX;
      this.data.startMouseY = evt.touches[0].clientY;
      if (!this.data.longtouchTimeout) {
        this.data.longtouchTimeout = setTimeout(() => {
          const touch = evt.touches[0];
          this.__stopMove(touch.clientX, touch.clientY, touch.target, true);
          this.data.longtouchTimeout = null;
        }, LONGTOUCH_DELAY);
      }
    } else if (evt.touches.length === 2) {
      this.data.step = 0 /* IDLE */;
      this.__cancelLongTouch();
      if (this.config.mousemove) {
        this.__cancelTwoFingersOverlay();
        this.__startMoveZoom(evt);
        evt.preventDefault();
      }
    }
  }
  /**
   * Handles touch events
   */
  __onTouchEnd(evt) {
    this.__cancelLongTouch();
    if (this.__isStep(1 /* CLICK */, 2 /* MOVING */)) {
      evt.preventDefault();
      this.__cancelTwoFingersOverlay();
      if (evt.touches.length === 1) {
        this.__stopMove(this.data.mouseX, this.data.mouseY);
      } else if (evt.touches.length === 0) {
        const touch = evt.changedTouches[0];
        this.__stopMove(touch.clientX, touch.clientY, touch.target);
      }
    }
  }
  /**
   * Handles touch move events
   */
  __onTouchMove(evt) {
    this.__cancelLongTouch();
    if (!this.config.mousemove) {
      return;
    }
    if (evt.touches.length === 1) {
      if (this.config.touchmoveTwoFingers) {
        if (this.__isStep(1 /* CLICK */) && !this.data.twofingersTimeout) {
          this.data.twofingersTimeout = setTimeout(() => {
            this.viewer.overlay.show({
              id: IDS.TWO_FINGERS,
              image: gesture_default,
              title: this.config.lang.twoFingers
            });
          }, TWOFINGERSOVERLAY_DELAY);
        }
      } else if (this.__isStep(1 /* CLICK */, 2 /* MOVING */)) {
        evt.preventDefault();
        const touch = evt.touches[0];
        this.__doMove(touch.clientX, touch.clientY);
      }
    } else {
      this.__doMoveZoom(evt);
      this.__cancelTwoFingersOverlay();
    }
  }
  /**
   * Cancel the long touch timer if any
   */
  __cancelLongTouch() {
    if (this.data.longtouchTimeout) {
      clearTimeout(this.data.longtouchTimeout);
      this.data.longtouchTimeout = null;
    }
  }
  /**
   * Cancel the two fingers overlay timer if any
   */
  __cancelTwoFingersOverlay() {
    if (this.config.touchmoveTwoFingers) {
      if (this.data.twofingersTimeout) {
        clearTimeout(this.data.twofingersTimeout);
        this.data.twofingersTimeout = null;
      }
      this.viewer.overlay.hide(IDS.TWO_FINGERS);
    }
  }
  /**
   * Handles mouse wheel events
   */
  __onMouseWheel(evt) {
    if (!this.config.mousewheel) {
      return;
    }
    if (this.config.mousewheelCtrlKey && !this.data.ctrlKeyDown) {
      this.viewer.overlay.show({
        id: IDS.CTRL_ZOOM,
        image: mousewheel_default,
        title: this.config.lang.ctrlZoom
      });
      clearTimeout(this.data.ctrlZoomTimeout);
      this.data.ctrlZoomTimeout = setTimeout(() => this.viewer.overlay.hide(IDS.CTRL_ZOOM), CTRLZOOM_TIMEOUT);
      return;
    }
    evt.preventDefault();
    evt.stopPropagation();
    const delta = evt.deltaY / Math.abs(evt.deltaY) * 5 * this.config.zoomSpeed;
    if (delta !== 0) {
      this.viewer.dynamics.zoom.step(-delta, 5);
    }
  }
  /**
   * Handles fullscreen events
   */
  __onFullscreenChange() {
    const fullscreen = this.viewer.isFullscreenEnabled();
    if (this.config.keyboard === "fullscreen") {
      if (fullscreen) {
        this.viewer.startKeyboardControl();
      } else {
        this.viewer.stopKeyboardControl();
      }
    }
    this.viewer.dispatchEvent(new FullscreenEvent(fullscreen));
  }
  /**
   * Resets all state variables
   */
  __resetMove() {
    this.data.step = 0 /* IDLE */;
    this.data.mouseX = 0;
    this.data.mouseY = 0;
    this.data.startMouseX = 0;
    this.data.startMouseY = 0;
    this.data.mouseHistory.length = 0;
  }
  /**
   * Initializes the combines move and zoom
   */
  __startMoveZoom(evt) {
    this.viewer.stopAll();
    this.__resetMove();
    const touchData = getTouchData(evt);
    this.data.step = 2 /* MOVING */;
    ({
      distance: this.data.pinchDist,
      center: { x: this.data.mouseX, y: this.data.mouseY }
    } = touchData);
    this.__logMouseMove(this.data.mouseX, this.data.mouseY);
  }
  /**
   * Stops the movement
   * @description If the move threshold was not reached a click event is triggered, otherwise an animation is launched to simulate inertia
   */
  __stopMove(clientX, clientY, target, rightclick = false) {
    if (this.__isStep(2 /* MOVING */)) {
      if (this.config.moveInertia) {
        this.__logMouseMove(clientX, clientY);
        this.__stopMoveInertia(clientX, clientY);
      } else {
        this.__resetMove();
        this.viewer.resetIdleTimer();
      }
    } else if (this.__isStep(1 /* CLICK */)) {
      this.viewer.stopAnimation();
      this.__doClick(clientX, clientY, target, rightclick);
      this.__resetMove();
      this.viewer.resetIdleTimer();
    }
  }
  /**
   * Performs an animation to simulate inertia when the movement stops
   */
  __stopMoveInertia(clientX, clientY) {
    const curve = new SplineCurve(this.data.mouseHistory.map(([, x, y]) => new Vector2(x, y)));
    const direction = curve.getTangent(1);
    const speed = this.data.mouseHistory.reduce(({ total, prev }, curr) => ({
      total: !prev ? 0 : total + distance({ x: prev[1], y: prev[2] }, { x: curr[1], y: curr[2] }) / (curr[0] - prev[0]),
      prev: curr
    }), {
      total: 0,
      prev: null
    }).total / this.data.mouseHistory.length;
    if (!speed) {
      this.__resetMove();
      this.viewer.resetIdleTimer();
      return;
    }
    this.data.step = 3 /* INERTIA */;
    let currentClientX = clientX;
    let currentClientY = clientY;
    this.state.animation = new Animation({
      properties: {
        speed: { start: speed, end: 0 }
      },
      duration: 1e3,
      easing: "outQuad",
      onTick: (properties) => {
        currentClientX += properties.speed * direction.x * 3 * SYSTEM.pixelRatio;
        currentClientY += properties.speed * direction.y * 3 * SYSTEM.pixelRatio;
        this.__applyMove(currentClientX, currentClientY);
      }
    });
    this.state.animation.then((done) => {
      this.state.animation = null;
      if (done) {
        this.__resetMove();
        this.viewer.resetIdleTimer();
      }
    });
  }
  /**
   * Triggers an event with all coordinates when a simple click is performed
   */
  __doClick(clientX, clientY, target, rightclick = false) {
    const boundingRect = this.viewer.container.getBoundingClientRect();
    const viewerX = clientX - boundingRect.left;
    const viewerY = clientY - boundingRect.top;
    const intersections = this.viewer.renderer.getIntersections({ x: viewerX, y: viewerY });
    const sphereIntersection = intersections.find((i) => i.object.userData[VIEWER_DATA]);
    if (sphereIntersection) {
      const sphericalCoords = this.viewer.dataHelper.vector3ToSphericalCoords(sphereIntersection.point);
      const data = {
        rightclick,
        target,
        clientX,
        clientY,
        viewerX,
        viewerY,
        yaw: sphericalCoords.yaw,
        pitch: sphericalCoords.pitch,
        objects: intersections.map((i) => i.object).filter((o) => !o.userData[VIEWER_DATA])
      };
      try {
        const textureCoords = this.viewer.dataHelper.sphericalCoordsToTextureCoords(data);
        data.textureX = textureCoords.textureX;
        data.textureY = textureCoords.textureY;
      } catch (e) {
        data.textureX = NaN;
        data.textureY = NaN;
      }
      if (!this.data.dblclickTimeout) {
        this.viewer.dispatchEvent(new ClickEvent(data));
        this.data.dblclickData = clone(data);
        this.data.dblclickTimeout = setTimeout(() => {
          this.data.dblclickTimeout = null;
          this.data.dblclickData = null;
        }, DBLCLICK_DELAY);
      } else {
        if (Math.abs(this.data.dblclickData.clientX - data.clientX) < this.moveThreshold && Math.abs(this.data.dblclickData.clientY - data.clientY) < this.moveThreshold) {
          this.viewer.dispatchEvent(new DoubleClickEvent(this.data.dblclickData));
        }
        clearTimeout(this.data.dblclickTimeout);
        this.data.dblclickTimeout = null;
        this.data.dblclickData = null;
      }
    }
  }
  /**
   * Trigger events for observed THREE objects
   */
  __handleObjectsEvents(evt) {
    if (!isEmpty(this.state.objectsObservers) && hasParent(evt.target, this.viewer.container)) {
      const viewerPos = getPosition(this.viewer.container);
      const viewerPoint = {
        x: evt.clientX - viewerPos.x,
        y: evt.clientY - viewerPos.y
      };
      const intersections = this.viewer.renderer.getIntersections(viewerPoint);
      const emit = (object, key, evtCtor) => {
        this.viewer.dispatchEvent(new evtCtor(evt, object, viewerPoint, key));
      };
      for (const [key, object] of Object.entries(this.state.objectsObservers)) {
        const intersection = intersections.find((i) => i.object.userData[key]);
        if (intersection) {
          if (object && intersection.object !== object) {
            emit(object, key, ObjectLeaveEvent);
            this.state.objectsObservers[key] = null;
          }
          if (!object) {
            this.state.objectsObservers[key] = intersection.object;
            emit(intersection.object, key, ObjectEnterEvent);
          } else {
            emit(intersection.object, key, ObjectHoverEvent);
          }
        } else if (object) {
          emit(object, key, ObjectLeaveEvent);
          this.state.objectsObservers[key] = null;
        }
      }
    }
  }
  /**
   * Starts moving when crossing moveThreshold and performs movement
   */
  __doMove(clientX, clientY) {
    if (this.__isStep(1 /* CLICK */) && (Math.abs(clientX - this.data.startMouseX) >= this.moveThreshold || Math.abs(clientY - this.data.startMouseY) >= this.moveThreshold)) {
      this.viewer.stopAll();
      this.__resetMove();
      this.data.step = 2 /* MOVING */;
      this.data.mouseX = clientX;
      this.data.mouseY = clientY;
      this.__logMouseMove(clientX, clientY);
    } else if (this.__isStep(2 /* MOVING */)) {
      this.__applyMove(clientX, clientY);
      this.__logMouseMove(clientX, clientY);
    }
  }
  /**
   * Raw method for movement, called from mouse event and move inertia
   */
  __applyMove(clientX, clientY) {
    const rotation = {
      yaw: this.config.moveSpeed * ((clientX - this.data.mouseX) / this.state.size.width) * MathUtils6.degToRad(this.state.littlePlanet ? 90 : this.state.hFov),
      pitch: this.config.moveSpeed * ((clientY - this.data.mouseY) / this.state.size.height) * MathUtils6.degToRad(this.state.littlePlanet ? 90 : this.state.vFov)
    };
    const currentPosition = this.viewer.getPosition();
    this.viewer.rotate({
      yaw: currentPosition.yaw - rotation.yaw,
      pitch: currentPosition.pitch + rotation.pitch
    });
    this.data.mouseX = clientX;
    this.data.mouseY = clientY;
  }
  /**
   * Perfoms combined move and zoom
   */
  __doMoveZoom(evt) {
    if (this.__isStep(2 /* MOVING */)) {
      evt.preventDefault();
      const touchData = getTouchData(evt);
      const delta = (touchData.distance - this.data.pinchDist) / SYSTEM.pixelRatio * this.config.zoomSpeed;
      this.viewer.zoom(this.viewer.getZoomLevel() + delta);
      this.__doMove(touchData.center.x, touchData.center.y);
      this.data.pinchDist = touchData.distance;
    }
  }
  /**
   * Stores each mouse position during a mouse move
   * @description Positions older than "INERTIA_WINDOW" are removed<br>
   * Positions before a pause of "INERTIA_WINDOW" / 10 are removed
   */
  __logMouseMove(clientX, clientY) {
    const now = Date.now();
    const last = this.data.mouseHistory.length ? this.data.mouseHistory[this.data.mouseHistory.length - 1] : [0, -1, -1];
    if (last[1] === clientX && last[2] === clientY) {
      last[0] = now;
    } else if (now === last[0]) {
      last[1] = clientX;
      last[2] = clientY;
    } else {
      this.data.mouseHistory.push([now, clientX, clientY]);
    }
    let previous = null;
    for (let i = 0; i < this.data.mouseHistory.length; ) {
      if (this.data.mouseHistory[i][0] < now - INERTIA_WINDOW) {
        this.data.mouseHistory.splice(i, 1);
      } else if (previous && this.data.mouseHistory[i][0] - previous > INERTIA_WINDOW / 10) {
        this.data.mouseHistory.splice(0, i);
        i = 0;
        previous = this.data.mouseHistory[i][0];
      } else {
        previous = this.data.mouseHistory[i][0];
        i++;
      }
    }
  }
};

// src/services/Renderer.ts
import {
  Group,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Vector2 as Vector22,
  Vector3 as Vector33,
  WebGLRenderer,
  WebGLRenderTarget
} from "three";
var vector2 = new Vector22();
var Renderer = class extends AbstractService {
  /**
   * @internal
   */
  constructor(viewer) {
    super(viewer);
    this.renderer = new WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setPixelRatio(SYSTEM.pixelRatio);
    this.renderer.domElement.className = "psv-canvas";
    this.scene = this.viewer.scene || new Scene();
    this.camera = this.viewer.camera || new PerspectiveCamera(50, 16 / 9, 0.1, 2 * SPHERE_RADIUS);
    this.mesh = this.viewer.adapter.createMesh();
    this.mesh.userData = { [VIEWER_DATA]: true };
    this.meshContainer = this.viewer.meshContainer || new Group();
    this.meshContainer.add(this.mesh);
    this.scene.add(this.meshContainer);
    this.raycaster = new Raycaster();
    this.container = document.createElement("div");
    this.container.className = "psv-canvas-container";
    this.container.style.background = this.config.canvasBackground;
    this.container.appendChild(this.renderer.domElement);
    this.viewer.addEventListener(SizeUpdatedEvent.type, this);
    this.viewer.addEventListener(ZoomUpdatedEvent.type, this);
    this.viewer.addEventListener(PositionUpdatedEvent.type, this);
    this.viewer.addEventListener(ConfigChangedEvent.type, this);
    this.hide();
  }
  get panoramaPose() {
    return this.mesh.rotation;
  }
  get sphereCorrection() {
    return this.meshContainer.rotation;
  }
  /**
   * @internal
   */
  init() {
    if (this.config.mousemove) {
      this.container.style.cursor = "move";
    }
    this.show();
    this.renderer.setAnimationLoop((t) => this.__renderLoop(t));
  }
  /**
   * @internal
   */
  destroy() {
    this.renderer.setAnimationLoop(null);
    this.cleanScene(this.scene);
    this.viewer.container.removeChild(this.container);
    this.viewer.removeEventListener(SizeUpdatedEvent.type, this);
    this.viewer.removeEventListener(ZoomUpdatedEvent.type, this);
    this.viewer.removeEventListener(PositionUpdatedEvent.type, this);
    this.viewer.removeEventListener(ConfigChangedEvent.type, this);
    super.destroy();
  }
  /**
   * @internal
   */
  handleEvent(e) {
    switch (e.type) {
      case SizeUpdatedEvent.type:
        this.__onSizeUpdated();
        break;
      case ZoomUpdatedEvent.type:
        this.__onZoomUpdated();
        break;
      case PositionUpdatedEvent.type:
        this.__onPositionUpdated();
        break;
      case ConfigChangedEvent.type:
        if (e.containsOptions("fisheye")) {
          this.__onPositionUpdated();
        }
        if (e.containsOptions("mousemove")) {
          this.container.style.cursor = this.config.mousemove ? "move" : "default";
        }
        if (e.containsOptions("canvasBackground")) {
          this.container.style.background = this.config.canvasBackground;
        }
        break;
    }
  }
  /**
   * Hides the viewer
   */
  hide() {
    this.container.style.opacity = "0";
  }
  /**
   * Shows the viewer
   */
  show() {
    this.container.style.opacity = "1";
  }
  /**
   * Resets or replaces the THREE renderer by a custom one
   */
  setCustomRenderer(factory) {
    if (factory) {
      this.customRenderer = factory(this.renderer);
    } else {
      this.customRenderer = null;
    }
    this.viewer.needsUpdate();
  }
  /**
   * Updates the size of the renderer and the aspect of the camera
   */
  __onSizeUpdated() {
    this.renderer.setSize(this.state.size.width, this.state.size.height);
    this.viewer.needsUpdate();
  }
  /**
   * Updates the fov of the camera
   */
  __onZoomUpdated() {
    this.viewer.needsUpdate();
  }
  /**
   * Updates the position of the camera
   */
  __onPositionUpdated() {
    this.viewer.needsUpdate();
  }
  /**
   * Main event loop, performs a render if `state.needsUpdate` is true
   */
  __renderLoop(timestamp) {
    const elapsed = !this.timestamp ? 0 : timestamp - this.timestamp;
    this.timestamp = timestamp;
    this.viewer.dispatchEvent(new BeforeRenderEvent(timestamp, elapsed));
    this.viewer.dynamics.update(elapsed);
    if (this.state.needsUpdate) {
      (this.customRenderer || this.renderer).render(this.scene, this.camera);
      this.viewer.dispatchEvent(new RenderEvent());
      this.state.needsUpdate = false;
    }
  }
  /**
   * Applies the texture to the scene, creates the scene if needed
   * @internal
   */
  setTexture(textureData) {
    this.state.panoData = textureData.panoData;
    this.viewer.adapter.setTexture(this.mesh, textureData);
    this.viewer.needsUpdate();
  }
  /**
   * Applies the overlay to the mesh
   * @internal
   */
  setOverlay(textureData, opacity) {
    this.viewer.adapter.setOverlay(this.mesh, textureData, opacity);
    this.viewer.needsUpdate();
  }
  /**
   * Applies a panorama data pose to a Mesh
   * @internal
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setPanoramaPose(_panoData, _mesh = this.mesh) {
  }
  /**
   * Applies a SphereCorrection to a Group
   * @internal
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSphereCorrection(_sphereCorrection, _group = this.meshContainer) {
  }
  /**
   * Performs transition between the current and a new texture
   * @internal
   */
  transition(textureData, options) {
    const positionProvided = isExtendedPosition(options);
    const zoomProvided = "zoom" in options;
    const group = new Group();
    const mesh = this.viewer.adapter.createMesh(0.5);
    this.viewer.adapter.setTexture(mesh, textureData, true);
    this.viewer.adapter.setTextureOpacity(mesh, 0);
    this.setPanoramaPose(textureData.panoData, mesh);
    this.setSphereCorrection(options.sphereCorrection, group);
    if (positionProvided) {
      const cleanPosition = this.viewer.dataHelper.cleanPosition(options);
      const currentPosition = this.viewer.getPosition();
      const verticalAxis = new Vector33(0, 1, 0);
      group.rotateOnWorldAxis(verticalAxis, cleanPosition.yaw - currentPosition.yaw);
      const horizontalAxis = new Vector33(0, 1, 0).cross(this.camera.getWorldDirection(new Vector33())).normalize();
      group.rotateOnWorldAxis(horizontalAxis, cleanPosition.pitch - currentPosition.pitch);
    }
    group.add(mesh);
    this.scene.add(group);
    this.renderer.setRenderTarget(new WebGLRenderTarget());
    this.renderer.render(this.scene, this.camera);
    this.renderer.setRenderTarget(null);
    const animation = new Animation({
      properties: {
        opacity: { start: 0, end: 1 },
        zoom: zoomProvided ? { start: this.viewer.getZoomLevel(), end: options.zoom } : void 0
      },
      duration: options.transition,
      easing: "outCubic",
      onTick: (properties) => {
        this.viewer.adapter.setTextureOpacity(mesh, properties.opacity);
        this.viewer.adapter.setTextureOpacity(this.mesh, 1 - properties.opacity);
        if (zoomProvided) {
          this.viewer.zoom(properties.zoom);
        }
        this.viewer.needsUpdate();
      }
    });
    animation.then((completed) => {
      if (completed) {
        this.setTexture(textureData);
        this.viewer.adapter.setTextureOpacity(this.mesh, 1);
        this.setPanoramaPose(textureData.panoData);
        this.setSphereCorrection(options.sphereCorrection);
        if (positionProvided) {
          this.viewer.rotate(options);
        }
      } else {
        this.viewer.adapter.disposeTexture(textureData);
      }
      this.scene.remove(group);
      mesh.geometry.dispose();
      mesh.geometry = null;
    });
    return animation;
  }
  /**
   * Returns intersections with objects in the scene
   */
  getIntersections(viewerPoint) {
    vector2.x = 2 * viewerPoint.x / this.state.size.width - 1;
    vector2.y = -2 * viewerPoint.y / this.state.size.height + 1;
    this.raycaster.setFromCamera(vector2, this.camera);
    return this.raycaster.intersectObjects(this.scene.children, true).filter((i) => i.object.isMesh && !!i.object.userData);
  }
  /**
   * Adds an object to the THREE scene
   */
  addObject(object) {
    this.scene.add(object);
  }
  /**
   * Removes an object from the THREE scene
   */
  removeObject(object) {
    this.scene.remove(object);
  }
  /**
   * Calls `dispose` on all objects and textures
   * @internal
   */
  cleanScene(object) {
    object.traverse((item) => {
      if (item.geometry) {
        item.geometry.dispose();
      }
      if (item.material) {
        if (Array.isArray(item.material)) {
          item.material.forEach((material) => {
            if (material.map) {
              material.map.dispose();
            }
            material.dispose();
          });
        } else {
          if (item.material.map) {
            item.material.map.dispose();
          }
          item.material.dispose();
        }
      }
      if (item.dispose && !(item instanceof Scene)) {
        item.dispose();
      }
      if (item !== object) {
        this.cleanScene(item);
      }
    });
  }
};

// src/services/TextureLoader.ts
import { FileLoader } from "three";
var TextureLoader = class extends AbstractService {
  /**
   * @internal
   */
  constructor(viewer) {
    super(viewer);
    this.loader = new FileLoader();
    this.loader.setResponseType("blob");
    if (this.config.withCredentials) {
      this.loader.setWithCredentials(true);
    }
  }
  /**
   * @internal
   */
  destroy() {
    this.abortLoading();
    super.destroy();
  }
  /**
   * Cancels current HTTP requests
   * @internal
   */
  abortLoading() {
  }
  /**
   * Loads a Blob with FileLoader
   */
  loadFile(url, onProgress) {
    if (this.config.requestHeaders) {
      this.loader.setRequestHeader(this.config.requestHeaders(url));
    }
    return new Promise((resolve, reject) => {
      let progress = 0;
      onProgress?.(progress);
      this.loader.load(
        url,
        (result) => {
          progress = 100;
          onProgress?.(progress);
          resolve(result);
        },
        (e) => {
          if (e.lengthComputable) {
            const newProgress = e.loaded / e.total * 100;
            if (newProgress > progress) {
              progress = newProgress;
              onProgress?.(progress);
            }
          }
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  /**
   * Loads an Image using FileLoader to have progress events
   */
  loadImage(url, onProgress) {
    return this.loadFile(url, onProgress).then(
      (result) => new Promise((resolve, reject) => {
        const img = document.createElement("img");
        img.onload = () => {
          URL.revokeObjectURL(img.src);
          resolve(img);
        };
        img.onerror = reject;
        img.src = URL.createObjectURL(result);
      })
    );
  }
  /**
   * Preload a panorama file without displaying it
   */
  preloadPanorama(panorama) {
    if (this.viewer.adapter.supportsPreload(panorama)) {
      return this.viewer.adapter.loadTexture(panorama);
    } else {
      return Promise.reject(new PSVError("Current adapter does not support preload"));
    }
  }
};

// src/services/ViewerDynamics.ts
import { MathUtils as MathUtils7 } from "three";
var ViewerDynamics = class extends AbstractService {
  /**
   * @internal
   */
  constructor(viewer) {
    super(viewer);
    this.zoom = new Dynamic(
      (zoomLevel) => {
        this.viewer.state.vFov = this.viewer.dataHelper.zoomLevelToFov(zoomLevel);
        this.viewer.state.hFov = this.viewer.dataHelper.vFovToHFov(this.viewer.state.vFov);
        this.viewer.dispatchEvent(new ZoomUpdatedEvent(zoomLevel));
      },
      {
        defaultValue: this.viewer.config.defaultZoomLvl,
        min: 0,
        max: 100,
        wrap: false
      }
    );
    this.position = new MultiDynamic(
      (position) => {
        this.viewer.dataHelper.sphericalCoordsToVector3(position, this.viewer.state.direction);
        this.viewer.dispatchEvent(new PositionUpdatedEvent(position));
      },
      {
        yaw: new Dynamic(null, {
          defaultValue: this.config.defaultYaw,
          min: 0,
          max: 2 * Math.PI,
          wrap: true
        }),
        pitch: new Dynamic(null, {
          defaultValue: this.config.defaultPitch,
          min: !this.viewer.state.littlePlanet ? -Math.PI / 2 : 0,
          max: !this.viewer.state.littlePlanet ? Math.PI / 2 : Math.PI * 2,
          wrap: this.viewer.state.littlePlanet
        })
      }
    );
    this.updateSpeeds();
  }
  /**
   * @internal
   */
  updateSpeeds() {
    this.zoom.setSpeed(this.config.zoomSpeed * 50);
    this.position.setSpeed(MathUtils7.degToRad(this.config.moveSpeed * 50));
  }
  /**
   * @internal
   */
  update(elapsed) {
    this.zoom.update(elapsed);
    this.position.update(elapsed);
  }
};

// src/services/ViewerState.ts
import { Vector3 as Vector34 } from "three";
var ViewerState = class {
  /**
   * @internal
   */
  // eslint-disable-next-line  @typescript-eslint/no-empty-function
  constructor() {
    /**
     * when all components are loaded
     */
    this.ready = false;
    /**
     * if the view needs to be renderer
     */
    this.needsUpdate = false;
    /**
     * if the keyboard events are currently listened to
     */
    this.keyboardEnabled = false;
    /**
     * direction of the camera
     */
    this.direction = new Vector34(0, 0, SPHERE_RADIUS);
    /**
     * vertical FOV
     */
    this.vFov = 60;
    /**
     * horizontal FOV
     */
    this.hFov = 60;
    /**
     * renderer aspect ratio
     */
    this.aspect = 1;
    /**
     * currently running animation
     */
    this.animation = null;
    /**
     * currently running transition
     */
    this.transitionAnimation = null;
    /**
     * promise of the last "setPanorama()" call
     */
    this.loadingPromise = null;
    /**
     * special tweaks for LittlePlanetAdapter
     */
    this.littlePlanet = false;
    /**
     * time of the last user action
     */
    this.idleTime = -1;
    /**
     * registered THREE objects observer
     */
    this.objectsObservers = {};
    /**
     * size of the container
     */
    this.size = {
      width: 0,
      height: 0
    };
    /**
     *  panorama metadata, if supported
     */
    this.panoData = {
      fullWidth: 0,
      fullHeight: 0,
      croppedWidth: 0,
      croppedHeight: 0,
      croppedX: 0,
      croppedY: 0,
      poseHeading: 0,
      posePitch: 0,
      poseRoll: 0
    };
  }
};

// src/Viewer.ts
var Viewer = class extends TypedEventTarget {
  constructor(config) {
    super();
    /** @internal */
    this.plugins = {};
    SYSTEM.load();
    this.state = new ViewerState();
    this.config = getViewerConfig(config);
    this.parent = getElement(config.container);
    this.parent[VIEWER_DATA] = this;
    this.container = this.parent;
    this.camera = config.camera;
    this.meshContainer = config.meshContainer;
    this.scene = config.scene;
    this.adapter = new this.config.adapter[0](this, this.config.adapter[1]);
    this.renderer = new Renderer(this);
    this.textureLoader = new TextureLoader(this);
    this.eventsHandler = new EventsHandler(this);
    this.dataHelper = new DataHelper(this);
    this.dynamics = new ViewerDynamics(this);
    this.resize(this.config.size);
    resolveBoolean(SYSTEM.isTouchEnabled, (enabled) => {
      toggleClass(this.container, "psv--is-touch", enabled);
    });
    this.config.plugins.forEach(([plugin, opts]) => {
      this.plugins[plugin.id] = new plugin(this, opts);
    });
    for (const plugin of Object.values(this.plugins)) {
      plugin.init?.();
    }
    if (this.config.panorama) {
      this.setPanorama(this.config.panorama);
    } else {
    }
  }
  /**
   * Destroys the viewer
   */
  destroy() {
    this.stopAll();
    this.stopKeyboardControl();
    this.exitFullscreen();
    for (const [id, plugin] of Object.entries(this.plugins)) {
      plugin.destroy();
      delete this.plugins[id];
    }
    this.eventsHandler.destroy();
    this.renderer.destroy();
    this.textureLoader.destroy();
    this.dataHelper.destroy();
    this.adapter.destroy();
    this.dynamics.destroy();
    this.parent.removeChild(this.container);
    delete this.parent[VIEWER_DATA];
  }
  init() {
    this.eventsHandler.init();
    this.renderer.init();
    if (this.config.keyboard === "always") {
      this.startKeyboardControl();
    }
    this.resetIdleTimer();
    this.state.ready = true;
    this.dispatchEvent(new ReadyEvent());
  }
  /**
   * Restarts the idle timer
   * @internal
   */
  resetIdleTimer() {
    this.state.idleTime = performance.now();
  }
  /**
   * Stops the idle timer
   * @internal
   */
  disableIdleTimer() {
    this.state.idleTime = -1;
  }
  /**
   * Returns the instance of a plugin if it exists
   * @example By plugin identifier
   * ```js
   * viewer.getPlugin('markers')
   * ```
   * @example By plugin class with TypeScript support
   * ```ts
   * viewer.getPlugin<MarkersPlugin>(MarkersPlugin)
   * ```
   */
  getPlugin(pluginId) {
    if (typeof pluginId === "string") {
      return this.plugins[pluginId];
    } else {
      const pluginCtor = pluginInterop(pluginId);
      return pluginCtor ? this.plugins[pluginCtor.id] : null;
    }
  }
  /**
   * Returns the current position of the camera
   */
  getPosition() {
    return this.dataHelper.cleanPosition(this.dynamics.position.current);
  }
  /**
   * Returns the current zoom level
   */
  getZoomLevel() {
    return this.dynamics.zoom.current;
  }
  /**
   * Returns the current viewer size
   */
  getSize() {
    return { ...this.state.size };
  }
  /**
   * Checks if the viewer is in fullscreen
   */
  isFullscreenEnabled() {
    return isFullscreenEnabled(this.container);
  }
  /**
   * Request a new render of the scene
   */
  needsUpdate() {
    this.state.needsUpdate = true;
  }
  /**
   * Resizes the scene if the viewer is resized
   */
  autoSize() {
    if (this.container.clientWidth !== this.state.size.width || this.container.clientHeight !== this.state.size.height) {
      this.state.size.width = Math.round(this.container.clientWidth);
      this.state.size.height = Math.round(this.container.clientHeight);
      this.state.aspect = this.state.size.width / this.state.size.height;
      this.state.hFov = this.dataHelper.vFovToHFov(this.state.vFov);
      this.dispatchEvent(new SizeUpdatedEvent(this.getSize()));
    }
  }
  /**
   * Loads a new panorama file
   * @description Loads a new panorama file, optionally changing the camera position/zoom and activating the transition animation.<br>
   * If the "options" parameter is not defined, the camera will not move and the ongoing animation will continue.<br>
   * If another loading is already in progress it will be aborted.
   * @returns promise resolved with false if the loading was aborted by another call
   */
  setPanorama(path, options = {}) {
    this.textureLoader.abortLoading();
    this.state.transitionAnimation?.cancel();
    if (!this.state.ready) {
      ["sphereCorrection", "panoData", "overlay", "overlayOpacity"].forEach((opt) => {
        if (!(opt in options)) {
          options[opt] = this.config[opt];
        }
      });
    }
    if (options.transition === void 0 || options.transition === true) {
      options.transition = DEFAULT_TRANSITION;
    }
    if (options.showLoader === void 0) {
      options.showLoader = true;
    }
    if (options.caption === void 0) {
      options.caption = this.config.caption;
    }
    if (options.description === void 0) {
      options.description = this.config.description;
    }
    if (!options.panoData && typeof this.config.panoData === "function") {
      options.panoData = this.config.panoData;
    }
    const positionProvided = isExtendedPosition(options);
    const zoomProvided = "zoom" in options;
    if (positionProvided || zoomProvided) {
      this.stopAll();
    }
    this.hideError();
    this.resetIdleTimer();
    this.config.panorama = path;
    this.config.caption = options.caption;
    this.config.description = options.description;
    const done = (err) => {
      this.state.loadingPromise = null;
      if (isAbortError(err)) {
        return false;
      } else if (err) {
        console.error(err);
        throw err;
      } else {
        return true;
      }
    };
    if (options.showLoader || !this.state.ready) {
    }
    const loadingPromise = this.adapter.loadTexture(this.config.panorama, options.panoData).then((textureData) => {
      if (textureData.panorama !== this.config.panorama) {
        this.adapter.disposeTexture(textureData);
        throw getAbortError();
      }
      return textureData;
    });
    if (!options.transition || !this.state.ready || !this.adapter.supportsTransition(this.config.panorama)) {
      this.state.loadingPromise = loadingPromise.then((textureData) => {
        this.renderer.show();
        this.renderer.setTexture(textureData);
        this.renderer.setPanoramaPose(textureData.panoData);
        this.renderer.setSphereCorrection(options.sphereCorrection);
        this.dispatchEvent(new PanoramaLoadedEvent(textureData));
        if (zoomProvided) {
          this.zoom(options.zoom);
        }
        if (positionProvided) {
          this.rotate(options);
        }
        if (!this.state.ready) {
          this.init();
        }
      }).then(
        () => done(),
        (err) => done(err)
      );
    } else {
      this.state.loadingPromise = loadingPromise.then((textureData) => {
        this.dispatchEvent(new PanoramaLoadedEvent(textureData));
        this.state.transitionAnimation = this.renderer.transition(textureData, options);
        return this.state.transitionAnimation;
      }).then((completed) => {
        this.state.transitionAnimation = null;
        if (!completed) {
          throw getAbortError();
        }
      }).then(
        () => done(),
        (err) => done(err)
      );
    }
    return this.state.loadingPromise;
  }
  /**
   * Loads a new overlay
   */
  setOverlay(path, opacity = this.config.overlayOpacity) {
    const supportsOverlay = this.adapter.constructor.supportsOverlay;
    if (!path) {
      if (supportsOverlay) {
        this.renderer.setOverlay(null, 0);
      }
      return Promise.resolve();
    } else {
      if (!supportsOverlay) {
        return Promise.reject(new PSVError(`Current adapter does not supports overlay`));
      }
      return this.adapter.loadTexture(
        path,
        (image) => {
          const p = this.state.panoData;
          const r = image.width / p.croppedWidth;
          return {
            fullWidth: r * p.fullWidth,
            fullHeight: r * p.fullHeight,
            croppedWidth: r * p.croppedWidth,
            croppedHeight: r * p.croppedHeight,
            croppedX: r * p.croppedX,
            croppedY: r * p.croppedY
          };
        },
        false
      ).then((textureData) => {
        this.renderer.setOverlay(textureData, opacity);
      });
    }
  }
  /**
   * Update options
   * @throws {@link PSVError} if the configuration is invalid
   */
  setOptions(options) {
    const rawConfig = {
      ...this.config,
      ...options
    };
    for (let [key, value] of Object.entries(options)) {
      if (!(key in DEFAULTS)) {
        logWarn(`Unknown option ${key}`);
        continue;
      }
      if (key in READONLY_OPTIONS) {
        logWarn(READONLY_OPTIONS[key]);
        continue;
      }
      if (key in CONFIG_PARSERS) {
        value = CONFIG_PARSERS[key](value, {
          rawConfig,
          defValue: DEFAULTS[key]
        });
      }
      this.config[key] = value;
      switch (key) {
        case "caption":
          break;
        case "size":
          this.resize(this.config.size);
          break;
        case "sphereCorrection":
          this.renderer.setSphereCorrection(this.config.sphereCorrection);
          break;
        case "lang":
          break;
        case "moveSpeed":
        case "zoomSpeed":
          this.dynamics.updateSpeeds();
          break;
        case "minFov":
        case "maxFov":
          this.dynamics.zoom.setValue(this.dataHelper.fovToZoomLevel(this.state.vFov));
          this.dispatchEvent(new ZoomUpdatedEvent(this.getZoomLevel()));
          break;
        case "keyboard":
          if (this.config.keyboard === "always") {
            this.startKeyboardControl();
          } else {
            this.stopKeyboardControl();
          }
          break;
        default:
          break;
      }
    }
    this.needsUpdate();
    this.dispatchEvent(new ConfigChangedEvent(Object.keys(options)));
  }
  /**
   * Update options
   * @throws {@link PSVError} if the configuration is invalid
   */
  setOption(option, value) {
    this.setOptions({ [option]: value });
  }
  /**
   * Displays an error message over the viewer
   */
  showError() {
  }
  /**
   *  Hides the error message
   */
  hideError() {
  }
  /**
   * Rotates the view to specific position
   */
  rotate(position) {
    const e = new BeforeRotateEvent(this.dataHelper.cleanPosition(position));
    this.dispatchEvent(e);
    if (e.defaultPrevented) {
      return;
    }
    this.dynamics.position.setValue(e.position);
  }
  /**
   * Zooms to a specific level between `maxFov` and `minFov`
   */
  zoom(level) {
    this.dynamics.zoom.setValue(level);
  }
  /**
   * Increases the zoom level
   */
  zoomIn(step = 1) {
    this.dynamics.zoom.step(step);
  }
  /**
   * Decreases the zoom level
   */
  zoomOut(step = 1) {
    this.dynamics.zoom.step(-step);
  }
  /**
   * Rotates and zooms the view with a smooth animation
   */
  animate(options) {
    const positionProvided = isExtendedPosition(options);
    const zoomProvided = options.zoom !== void 0;
    const e = new BeforeAnimateEvent(
      positionProvided ? this.dataHelper.cleanPosition(options) : void 0,
      options.zoom
    );
    this.dispatchEvent(e);
    if (e.defaultPrevented) {
      return;
    }
    const cleanPosition = e.position;
    const cleanZoom = e.zoomLevel;
    this.stopAll();
    const animProperties = {};
    let duration;
    if (positionProvided) {
      const currentPosition = this.getPosition();
      const tOffset = getShortestArc(currentPosition.yaw, cleanPosition.yaw);
      animProperties.yaw = { start: currentPosition.yaw, end: currentPosition.yaw + tOffset };
      animProperties.pitch = { start: currentPosition.pitch, end: cleanPosition.pitch };
      duration = this.dataHelper.speedToDuration(options.speed, getAngle(currentPosition, cleanPosition));
    }
    if (zoomProvided) {
      const dZoom = Math.abs(cleanZoom - this.getZoomLevel());
      animProperties.zoom = { start: this.getZoomLevel(), end: cleanZoom };
      if (!duration) {
        duration = this.dataHelper.speedToDuration(options.speed, Math.PI / 4 * dZoom / 100);
      }
    }
    if (!duration) {
      if (positionProvided) {
        this.rotate(cleanPosition);
      }
      if (zoomProvided) {
        this.zoom(cleanZoom);
      }
      return new Animation(null);
    }
    this.state.animation = new Animation({
      properties: animProperties,
      duration: Math.max(ANIMATION_MIN_DURATION, duration),
      easing: "inOutSine",
      onTick: (properties) => {
        if (positionProvided) {
          this.dynamics.position.setValue({
            yaw: properties.yaw,
            pitch: properties.pitch
          });
        }
        if (zoomProvided) {
          this.dynamics.zoom.setValue(properties.zoom);
        }
      }
    });
    this.state.animation.then(() => {
      this.state.animation = null;
      this.resetIdleTimer();
    });
    return this.state.animation;
  }
  /**
   * Stops the ongoing animation
   * @description The return value is a Promise because the is no guaranty the animation can be stopped synchronously.
   */
  stopAnimation() {
    if (this.state.animation) {
      this.state.animation.cancel();
      return this.state.animation;
    } else {
      return Promise.resolve();
    }
  }
  /**
   * Resizes the viewer
   */
  resize(size) {
    const s = size;
    ["width", "height"].forEach((dim) => {
      if (size && s[dim]) {
        if (/^[0-9.]+$/.test(s[dim])) {
          s[dim] += "px";
        }
        this.parent.style[dim] = s[dim];
      }
    });
    this.autoSize();
  }
  /**
   * Enters the fullscreen mode
   */
  enterFullscreen() {
    if (!this.isFullscreenEnabled()) {
      requestFullscreen(this.container);
    }
  }
  /**
   * Exits the fullscreen mode
   */
  exitFullscreen() {
    if (this.isFullscreenEnabled()) {
      exitFullscreen();
    }
  }
  /**
   * Enters or exits the fullscreen mode
   */
  toggleFullscreen() {
    if (!this.isFullscreenEnabled()) {
      this.enterFullscreen();
    } else {
      this.exitFullscreen();
    }
  }
  /**
   * Enables the keyboard controls
   */
  startKeyboardControl() {
    this.state.keyboardEnabled = true;
  }
  /**
   * Disables the keyboard controls
   */
  stopKeyboardControl() {
    this.state.keyboardEnabled = false;
  }
  /**
   * Subscribes to events on objects in the three.js scene
   * @param userDataKey - only objects with the following `userData` will be observed
   */
  observeObjects(userDataKey) {
    this.state.objectsObservers[userDataKey] = null;
  }
  /**
   * Unsubscribes to events on objects
   */
  unobserveObjects(userDataKey) {
    delete this.state.objectsObservers[userDataKey];
  }
  /**
   * Stops all current animations
   * @internal
   */
  stopAll() {
    this.dispatchEvent(new StopAllEvent());
    this.disableIdleTimer();
    return this.stopAnimation();
  }
};
export {
  AbstractAdapter,
  AbstractConfigurablePlugin,
  AbstractPlugin,
  constants_exports as CONSTANTS,
  DEFAULTS,
  EquirectangularAdapter,
  PSVError,
  SYSTEM,
  TypedEvent,
  Viewer,
  events_exports as events,
  utils_exports as utils
};
//# sourceMappingURL=index.module.js.map