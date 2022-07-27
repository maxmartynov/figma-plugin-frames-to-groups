/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/types/SettingsMap.ts":
/*!**********************************!*\
  !*** ./src/types/SettingsMap.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EmptyFramesActions": () => (/* binding */ EmptyFramesActions),
/* harmony export */   "YesNo": () => (/* binding */ YesNo),
/* harmony export */   "settingsMapDefaults": () => (/* binding */ settingsMapDefaults)
/* harmony export */ });
var YesNo;
(function (YesNo) {
    YesNo["yes"] = "yes";
    YesNo["no"] = "no";
})(YesNo || (YesNo = {}));
var EmptyFramesActions;
(function (EmptyFramesActions) {
    EmptyFramesActions["remove"] = "remove";
    EmptyFramesActions["turnIntoRectangle"] = "turnIntoRectangle";
})(EmptyFramesActions || (EmptyFramesActions = {}));
const settingsMapDefaults = {
    createRectangleForFrame: YesNo.no,
    emptyFrames: EmptyFramesActions.remove,
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _types_SettingsMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types/SettingsMap */ "./src/types/SettingsMap.ts");

const currentPage = figma.currentPage;
const selectedItems = currentPage.selection;
const root = figma.root;
// Use this code to copy a frame's props
// https://www.youtube.com/watch?v=hB4P00BWf3E
main();
function main() {
    switch (figma.command) {
        case 'convertFramesToGroups': {
            return convertFramesToGroups();
        }
        case 'view:settings': {
            return openWindow('view:settings');
        }
        case 'view:about': {
            return openWindow('view:about');
        }
        default: {
            figma.closePlugin('ERROR: Unknown command');
        }
    }
}
function openWindow(eventType) {
    switch (eventType) {
        case 'view:settings': {
            figma.showUI(__html__, {
                width: 295,
                height: 285,
            });
            figma.ui.postMessage({
                type: eventType,
                settings: getPluginSettingsMap(),
            }, { origin: '*' });
            break;
        }
        case 'view:about': {
            figma.showUI(__html__, {
                width: 282,
                height: 380,
            });
            figma.ui.postMessage({ type: eventType }, { origin: '*' });
            break;
        }
    }
    figma.ui.onmessage = (event) => {
        if (event.type === 'message' && event.text) {
            figma.notify(event.text || '');
            return;
        }
        else if (event.type === 'cancel') {
            figma.closePlugin();
            return;
        }
        else if (event.type === 'save:settings') {
            patchPluginSettingsMap(event.settings);
            return;
        }
        figma.closePlugin();
    };
}
function getPluginSettingsMap() {
    const get = (key) => root.getPluginData(key);
    return Object.assign(_types_SettingsMap__WEBPACK_IMPORTED_MODULE_0__.settingsMapDefaults, {
        createRectangleForFrame: get('createRectangleForFrame'),
        emptyFrames: get('emptyFrames'),
    });
}
function patchPluginSettingsMap(settings) {
    const newSettings = Object.assign(_types_SettingsMap__WEBPACK_IMPORTED_MODULE_0__.settingsMapDefaults, settings);
    for (const key in Object.keys(_types_SettingsMap__WEBPACK_IMPORTED_MODULE_0__.settingsMapDefaults)) {
        root.setPluginData(key, String(newSettings[key]));
    }
}
function convertFramesToGroups() {
    const groups = createGroupsFromFrames(selectedItems.length ? selectedItems : currentPage.children);
    figma.closePlugin(groups.length
        ? `${groups.length} Frames converted`
        : 'There are no Frames to convert');
}
function createGroupFromFrame(frameNode) {
    if (!frameNode || !frameNode.parent)
        return null;
    if (!Array.isArray(frameNode.children) || !frameNode.children.length)
        return null;
    const parent = frameNode.parent;
    if (parent.type === 'INSTANCE')
        return null;
    const group = figma.group(frameNode.children, parent);
    if (frameNode.name)
        group.name = frameNode.name;
    return group;
}
function createGroupsFromFrames(items) {
    const groups = [];
    if (!items.length)
        return groups;
    for (const node of items) {
        if (typeof node.findAll !== 'function')
            continue;
        const _frames = node.findAll((n) => n.type === 'FRAME');
        for (const frame of _frames) {
            const group = createGroupFromFrame(frame);
            if (group) {
                groups.push(group);
                if (!frame.children.length)
                    frame.remove();
            }
        }
    }
    return groups;
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxzQkFBc0I7QUFDaEI7QUFDUDtBQUNBO0FBQ0E7QUFDQSxDQUFDLGdEQUFnRDtBQUMxQztBQUNQO0FBQ0E7QUFDQTs7Ozs7OztVQ2JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOMEQ7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYSxJQUFJLGFBQWE7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLG1DQUFtQyxpQkFBaUIsSUFBSSxhQUFhO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixtRUFBbUI7QUFDNUM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0Esc0NBQXNDLG1FQUFtQjtBQUN6RCxrQ0FBa0MsbUVBQW1CO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsZUFBZTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2ZpZ21hLXBsdWdpbi1mcmFtZXMtdG8tZ3JvdXBzLy4vc3JjL3R5cGVzL1NldHRpbmdzTWFwLnRzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1mcmFtZXMtdG8tZ3JvdXBzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1mcmFtZXMtdG8tZ3JvdXBzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tZnJhbWVzLXRvLWdyb3Vwcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1mcmFtZXMtdG8tZ3JvdXBzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLWZyYW1lcy10by1ncm91cHMvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHZhciBZZXNObztcbihmdW5jdGlvbiAoWWVzTm8pIHtcbiAgICBZZXNOb1tcInllc1wiXSA9IFwieWVzXCI7XG4gICAgWWVzTm9bXCJub1wiXSA9IFwibm9cIjtcbn0pKFllc05vIHx8IChZZXNObyA9IHt9KSk7XG5leHBvcnQgdmFyIEVtcHR5RnJhbWVzQWN0aW9ucztcbihmdW5jdGlvbiAoRW1wdHlGcmFtZXNBY3Rpb25zKSB7XG4gICAgRW1wdHlGcmFtZXNBY3Rpb25zW1wicmVtb3ZlXCJdID0gXCJyZW1vdmVcIjtcbiAgICBFbXB0eUZyYW1lc0FjdGlvbnNbXCJ0dXJuSW50b1JlY3RhbmdsZVwiXSA9IFwidHVybkludG9SZWN0YW5nbGVcIjtcbn0pKEVtcHR5RnJhbWVzQWN0aW9ucyB8fCAoRW1wdHlGcmFtZXNBY3Rpb25zID0ge30pKTtcbmV4cG9ydCBjb25zdCBzZXR0aW5nc01hcERlZmF1bHRzID0ge1xuICAgIGNyZWF0ZVJlY3RhbmdsZUZvckZyYW1lOiBZZXNOby5ubyxcbiAgICBlbXB0eUZyYW1lczogRW1wdHlGcmFtZXNBY3Rpb25zLnJlbW92ZSxcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHNldHRpbmdzTWFwRGVmYXVsdHMgfSBmcm9tICcuL3R5cGVzL1NldHRpbmdzTWFwJztcbmNvbnN0IGN1cnJlbnRQYWdlID0gZmlnbWEuY3VycmVudFBhZ2U7XG5jb25zdCBzZWxlY3RlZEl0ZW1zID0gY3VycmVudFBhZ2Uuc2VsZWN0aW9uO1xuY29uc3Qgcm9vdCA9IGZpZ21hLnJvb3Q7XG4vLyBVc2UgdGhpcyBjb2RlIHRvIGNvcHkgYSBmcmFtZSdzIHByb3BzXG4vLyBodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PWhCNFAwMEJXZjNFXG5tYWluKCk7XG5mdW5jdGlvbiBtYWluKCkge1xuICAgIHN3aXRjaCAoZmlnbWEuY29tbWFuZCkge1xuICAgICAgICBjYXNlICdjb252ZXJ0RnJhbWVzVG9Hcm91cHMnOiB7XG4gICAgICAgICAgICByZXR1cm4gY29udmVydEZyYW1lc1RvR3JvdXBzKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAndmlldzpzZXR0aW5ncyc6IHtcbiAgICAgICAgICAgIHJldHVybiBvcGVuV2luZG93KCd2aWV3OnNldHRpbmdzJyk7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAndmlldzphYm91dCc6IHtcbiAgICAgICAgICAgIHJldHVybiBvcGVuV2luZG93KCd2aWV3OmFib3V0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oJ0VSUk9SOiBVbmtub3duIGNvbW1hbmQnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIG9wZW5XaW5kb3coZXZlbnRUeXBlKSB7XG4gICAgc3dpdGNoIChldmVudFR5cGUpIHtcbiAgICAgICAgY2FzZSAndmlldzpzZXR0aW5ncyc6IHtcbiAgICAgICAgICAgIGZpZ21hLnNob3dVSShfX2h0bWxfXywge1xuICAgICAgICAgICAgICAgIHdpZHRoOiAyOTUsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAyODUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBldmVudFR5cGUsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IGdldFBsdWdpblNldHRpbmdzTWFwKCksXG4gICAgICAgICAgICB9LCB7IG9yaWdpbjogJyonIH0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAndmlldzphYm91dCc6IHtcbiAgICAgICAgICAgIGZpZ21hLnNob3dVSShfX2h0bWxfXywge1xuICAgICAgICAgICAgICAgIHdpZHRoOiAyODIsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAzODAsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgdHlwZTogZXZlbnRUeXBlIH0sIHsgb3JpZ2luOiAnKicgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBmaWdtYS51aS5vbm1lc3NhZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICdtZXNzYWdlJyAmJiBldmVudC50ZXh0KSB7XG4gICAgICAgICAgICBmaWdtYS5ub3RpZnkoZXZlbnQudGV4dCB8fCAnJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXZlbnQudHlwZSA9PT0gJ2NhbmNlbCcpIHtcbiAgICAgICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXZlbnQudHlwZSA9PT0gJ3NhdmU6c2V0dGluZ3MnKSB7XG4gICAgICAgICAgICBwYXRjaFBsdWdpblNldHRpbmdzTWFwKGV2ZW50LnNldHRpbmdzKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgIH07XG59XG5mdW5jdGlvbiBnZXRQbHVnaW5TZXR0aW5nc01hcCgpIHtcbiAgICBjb25zdCBnZXQgPSAoa2V5KSA9PiByb290LmdldFBsdWdpbkRhdGEoa2V5KTtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihzZXR0aW5nc01hcERlZmF1bHRzLCB7XG4gICAgICAgIGNyZWF0ZVJlY3RhbmdsZUZvckZyYW1lOiBnZXQoJ2NyZWF0ZVJlY3RhbmdsZUZvckZyYW1lJyksXG4gICAgICAgIGVtcHR5RnJhbWVzOiBnZXQoJ2VtcHR5RnJhbWVzJyksXG4gICAgfSk7XG59XG5mdW5jdGlvbiBwYXRjaFBsdWdpblNldHRpbmdzTWFwKHNldHRpbmdzKSB7XG4gICAgY29uc3QgbmV3U2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHNldHRpbmdzTWFwRGVmYXVsdHMsIHNldHRpbmdzKTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBPYmplY3Qua2V5cyhzZXR0aW5nc01hcERlZmF1bHRzKSkge1xuICAgICAgICByb290LnNldFBsdWdpbkRhdGEoa2V5LCBTdHJpbmcobmV3U2V0dGluZ3Nba2V5XSkpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNvbnZlcnRGcmFtZXNUb0dyb3VwcygpIHtcbiAgICBjb25zdCBncm91cHMgPSBjcmVhdGVHcm91cHNGcm9tRnJhbWVzKHNlbGVjdGVkSXRlbXMubGVuZ3RoID8gc2VsZWN0ZWRJdGVtcyA6IGN1cnJlbnRQYWdlLmNoaWxkcmVuKTtcbiAgICBmaWdtYS5jbG9zZVBsdWdpbihncm91cHMubGVuZ3RoXG4gICAgICAgID8gYCR7Z3JvdXBzLmxlbmd0aH0gRnJhbWVzIGNvbnZlcnRlZGBcbiAgICAgICAgOiAnVGhlcmUgYXJlIG5vIEZyYW1lcyB0byBjb252ZXJ0Jyk7XG59XG5mdW5jdGlvbiBjcmVhdGVHcm91cEZyb21GcmFtZShmcmFtZU5vZGUpIHtcbiAgICBpZiAoIWZyYW1lTm9kZSB8fCAhZnJhbWVOb2RlLnBhcmVudClcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGZyYW1lTm9kZS5jaGlsZHJlbikgfHwgIWZyYW1lTm9kZS5jaGlsZHJlbi5sZW5ndGgpXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHBhcmVudCA9IGZyYW1lTm9kZS5wYXJlbnQ7XG4gICAgaWYgKHBhcmVudC50eXBlID09PSAnSU5TVEFOQ0UnKVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBncm91cCA9IGZpZ21hLmdyb3VwKGZyYW1lTm9kZS5jaGlsZHJlbiwgcGFyZW50KTtcbiAgICBpZiAoZnJhbWVOb2RlLm5hbWUpXG4gICAgICAgIGdyb3VwLm5hbWUgPSBmcmFtZU5vZGUubmFtZTtcbiAgICByZXR1cm4gZ3JvdXA7XG59XG5mdW5jdGlvbiBjcmVhdGVHcm91cHNGcm9tRnJhbWVzKGl0ZW1zKSB7XG4gICAgY29uc3QgZ3JvdXBzID0gW107XG4gICAgaWYgKCFpdGVtcy5sZW5ndGgpXG4gICAgICAgIHJldHVybiBncm91cHM7XG4gICAgZm9yIChjb25zdCBub2RlIG9mIGl0ZW1zKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygbm9kZS5maW5kQWxsICE9PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIGNvbnN0IF9mcmFtZXMgPSBub2RlLmZpbmRBbGwoKG4pID0+IG4udHlwZSA9PT0gJ0ZSQU1FJyk7XG4gICAgICAgIGZvciAoY29uc3QgZnJhbWUgb2YgX2ZyYW1lcykge1xuICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBjcmVhdGVHcm91cEZyb21GcmFtZShmcmFtZSk7XG4gICAgICAgICAgICBpZiAoZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBncm91cHMucHVzaChncm91cCk7XG4gICAgICAgICAgICAgICAgaWYgKCFmcmFtZS5jaGlsZHJlbi5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIGZyYW1lLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBncm91cHM7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=