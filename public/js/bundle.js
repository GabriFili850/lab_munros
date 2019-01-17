/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Munros = __webpack_require__(/*! ./models/munros.js */ \"./src/models/munros.js\");\nconst MunrosView = __webpack_require__(/*! ./views/munros_view.js */ \"./src/views/munros_view.js\");\nconst SelectView = __webpack_require__(/*! ./views/select_view.js */ \"./src/views/select_view.js\")\n\ndocument.addEventListener('DOMContentLoaded', () => {\n\n  const selected = document.querySelector('#munros');\n  const munrosView = new MunrosView(selected);\n  munrosView.bindEvent();\n\n  const munrosRegion = document.querySelector('#munros_region')\n  const selectView = new SelectView(munrosRegion)\n  selectView.bindEvent();\n\n  const munros = new Munros();\n  munros.bindEvent();\n\n});\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/helpers/pub_sub.js":
/*!********************************!*\
  !*** ./src/helpers/pub_sub.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const PubSub = {\n  publish: function (channel, payload) {\n    const event = new CustomEvent(channel, {\n      detail: payload\n    });\n    document.dispatchEvent(event);\n  },\n\n  subscribe: function (channel, callback) {\n    document.addEventListener(channel, callback);\n  }\n};\n\nmodule.exports = PubSub;\n\n\n//# sourceURL=webpack:///./src/helpers/pub_sub.js?");

/***/ }),

/***/ "./src/helpers/request_helper.js":
/*!***************************************!*\
  !*** ./src/helpers/request_helper.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const RequestHelper = function (url) {\n  this.url = url\n}\n\nRequestHelper.prototype.get = function (onComplete) {\n  return fetch(this.url)\n    .then(response => response.json());\n};\n\nmodule.exports = RequestHelper;\n\n\n//# sourceURL=webpack:///./src/helpers/request_helper.js?");

/***/ }),

/***/ "./src/models/munros.js":
/*!******************************!*\
  !*** ./src/models/munros.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\nconst RequestHelper = __webpack_require__(/*! ../helpers/request_helper.js */ \"./src/helpers/request_helper.js\")\n\nconst Munros = function(){\n  this.data = null;\n}\n\nMunros.prototype.bindEvent = function () {\n  this.getData();\n}\n\nMunros.prototype.getData = function (region){\n  const url = 'https://munroapi.herokuapp.com/munros';\n  const request = new RequestHelper(url);\n  request.get()\n  .then((data) => {\n    this.data = data;\n    PubSub.publish('Munros:data-ready', this.data);\n  })\n  .catch( (message) => {\n    console.error(message);\n  });\n\n}\n\nmodule.exports = Munros;\n\n\n//# sourceURL=webpack:///./src/models/munros.js?");

/***/ }),

/***/ "./src/views/individual_munro_view.js":
/*!********************************************!*\
  !*** ./src/views/individual_munro_view.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const IndividualMunroView = function(element, munro){\n\n  this.element = element;\n  this.munro = munro;\n\n}\n\nIndividualMunroView.prototype.render = function(){\n\n    const div = document.createElement('div');\n    div.textContent = this.munro.name;\n    div.id = this.munro.name;\n    div.classList.add('munro_box')\n\n    const list = document.createElement('ul');\n    const listItem1 = document.createElement('li');\n    listItem1.textContent = `Height: ${this.munro.height}`\n    list.appendChild(listItem1);\n\n    const listItem2 = document.createElement('li');\n    listItem2.textContent = `Meaning: ${this.munro.meaning}`\n    list.appendChild(listItem2);\n\n    const listItem3 = document.createElement('li');\n    listItem3.innerHTML = \"<a href='http://www.google.com'>Unbagged<a>\";\n    list.appendChild(listItem3);\n\n    div.appendChild(list)\n\n    this.element.appendChild(div);\n}\n\nmodule.exports = IndividualMunroView;\n\n\n//# sourceURL=webpack:///./src/views/individual_munro_view.js?");

/***/ }),

/***/ "./src/views/munros_view.js":
/*!**********************************!*\
  !*** ./src/views/munros_view.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\")\nconst IndividualMunroView = __webpack_require__(/*! ./individual_munro_view.js */ \"./src/views/individual_munro_view.js\")\n\nconst MunrosView = function(element) {\n  this.element = element;\n}\n\nMunrosView.prototype.bindEvent = function(){\n  PubSub.subscribe('Munros:data-ready', (event) => {\n    const munros = event.detail;\n    PubSub.subscribe('SelectView:region-chosen', (event) => {\n      const region = event.detail\n      const filtered = munros.filter((munro) => {\n        return munro.region === region;\n      })\n\n      this.render(filtered);\n    })\n  })\n}\n\nMunrosView.prototype.render = function(munros) {\n  this.clearMunros();\n\n  munros.forEach( (munro) => {\n\n    const individualMunroView = new IndividualMunroView(this.element, munro)\n    individualMunroView.render()\n\n  })\n}\n\nMunrosView.prototype.clearMunros = function() {\n  this.element.innerHTML = '';\n}\n\nmodule.exports = MunrosView;\n\n\n//# sourceURL=webpack:///./src/views/munros_view.js?");

/***/ }),

/***/ "./src/views/select_view.js":
/*!**********************************!*\
  !*** ./src/views/select_view.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\")\n\nconst SelectView = function(selector) {\n  this.selector = selector;\n}\n\nSelectView.prototype.bindEvent = function () {\n  PubSub.subscribe('Munros:data-ready', (event) => {\n    const munros = event.detail;\n    const regions = this.getRegions(munros);\n    this.populate(regions);\n\n    this.selector.addEventListener('change', (event) => {\n      event.preventDefault();\n      const region = event.target.value;\n      PubSub.publish('SelectView:region-chosen', regions[region]);\n    })\n\n  });\n\n}\n\nSelectView.prototype.getRegions = function(munros){\n  const regions = munros.map( (munro) => {\n    return munro.region;\n  })\n\n\n  const uniqueRegions = [...new Set(regions)];\n\n  return uniqueRegions;\n}\n\nSelectView.prototype.populate = function(uniqueRegions) {\n\n\n  uniqueRegions.forEach((region, index) => {\n    const option = document.createElement('option');\n    option.textContent = region;\n    option.value = index;\n    this.selector.appendChild(option);\n  })\n}\n\nmodule.exports = SelectView\n\n\n//# sourceURL=webpack:///./src/views/select_view.js?");

/***/ })

/******/ });