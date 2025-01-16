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
/* harmony export */   "RootFrameActions": () => (/* binding */ RootFrameActions),
/* harmony export */   "YesNo": () => (/* binding */ YesNo),
/* harmony export */   "settingsMapDefaults": () => (/* binding */ settingsMapDefaults)
/* harmony export */ });
var YesNo;
(function (YesNo) {
    YesNo["yes"] = "yes";
    YesNo["no"] = "no";
})(YesNo || (YesNo = {}));
// TODO: not in use
// TODO: Use this code to copy a frame's props
// https://www.youtube.com/watch?v=hB4P00BWf3E
var EmptyFramesActions;
(function (EmptyFramesActions) {
    EmptyFramesActions["remove"] = "remove";
    EmptyFramesActions["turnIntoRectangle"] = "turnIntoRectangle";
})(EmptyFramesActions || (EmptyFramesActions = {}));
var RootFrameActions;
(function (RootFrameActions) {
    RootFrameActions["leaveFrame"] = "leaveFrame";
    RootFrameActions["turnIntoGroup"] = "turnIntoGroup";
})(RootFrameActions || (RootFrameActions = {}));
const settingsMapDefaults = {
    createRectangleForFrame: YesNo.no,
    emptyFrames: EmptyFramesActions.remove,
    rootFrame: RootFrameActions.leaveFrame,
    convertInnerFrames: YesNo.yes,
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
main();
function main() {
    switch (figma.command) {
        case 'convertFramesToGroups': {
            return convertFramesToGroups();
        }
        case 'convertRootFrameToGroup': {
            return convertRootFrameToGroup();
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
                width: 320,
                height: 460,
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
    const get = (key) => root.getPluginData(key) || undefined;
    return {
        createRectangleForFrame: get('createRectangleForFrame') ||
            _types_SettingsMap__WEBPACK_IMPORTED_MODULE_0__.settingsMapDefaults.createRectangleForFrame,
        // TODO: not in use
        emptyFrames: get('emptyFrames') || _types_SettingsMap__WEBPACK_IMPORTED_MODULE_0__.settingsMapDefaults.emptyFrames,
        rootFrame: get('rootFrame') || _types_SettingsMap__WEBPACK_IMPORTED_MODULE_0__.settingsMapDefaults.rootFrame,
        convertInnerFrames: get('convertInnerFrames') || _types_SettingsMap__WEBPACK_IMPORTED_MODULE_0__.settingsMapDefaults.convertInnerFrames,
    };
}
function patchPluginSettingsMap(settings) {
    const newSettings = Object.assign(_types_SettingsMap__WEBPACK_IMPORTED_MODULE_0__.settingsMapDefaults, settings);
    for (const key of Object.keys(_types_SettingsMap__WEBPACK_IMPORTED_MODULE_0__.settingsMapDefaults)) {
        root.setPluginData(key, String(newSettings[key]));
    }
}
function convertFramesToGroups() {
    const settings = getPluginSettingsMap();
    const groups = createGroupsFromFrames(selectedItems.length ? selectedItems : currentPage.children, settings);
    figma.closePlugin(groups.length
        ? `${groups.length} Frame(s) converted`
        : 'There are no Frames to convert');
}
function convertRootFrameToGroup() {
    const settings = getPluginSettingsMap();
    const groups = createGroupsFromFrames(selectedItems.length ? selectedItems : currentPage.children, Object.assign(Object.assign({}, settings), { rootFrame: _types_SettingsMap__WEBPACK_IMPORTED_MODULE_0__.RootFrameActions.turnIntoGroup, convertInnerFrames: _types_SettingsMap__WEBPACK_IMPORTED_MODULE_0__.YesNo.no }));
    figma.closePlugin(groups.length
        ? `${groups.length} Frame(s) converted`
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
function createGroupsFromFrames(items, settings) {
    const groups = [];
    if (!items.length)
        return groups;
    for (const node of items) {
        if (typeof node.findAll !== 'function')
            continue;
        console.log('settings.convertInnerFrames: ', settings.convertInnerFrames);
        if (settings.convertInnerFrames === _types_SettingsMap__WEBPACK_IMPORTED_MODULE_0__.YesNo.yes) {
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
        if (node.type === 'FRAME' &&
            settings.rootFrame === _types_SettingsMap__WEBPACK_IMPORTED_MODULE_0__.RootFrameActions.turnIntoGroup) {
            const group = createGroupFromFrame(node);
            if (group) {
                groups.push(group);
                if (!node.children.length)
                    node.remove();
            }
        }
    }
    return groups;
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLENBQUMsc0JBQXNCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxnREFBZ0Q7QUFDMUM7QUFDUDtBQUNBO0FBQ0E7QUFDQSxDQUFDLDRDQUE0QztBQUN0QztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUN2QkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05vRjtBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWEsSUFBSSxhQUFhO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixtQ0FBbUMsaUJBQWlCLElBQUksYUFBYTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSwyRkFBMkM7QUFDdkQ7QUFDQSwyQ0FBMkMsK0VBQStCO0FBQzFFLHVDQUF1Qyw2RUFBNkI7QUFDcEUseURBQXlELHNGQUFzQztBQUMvRjtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsbUVBQW1CO0FBQ3pELGtDQUFrQyxtRUFBbUI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGVBQWU7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxSUFBcUksZUFBZSxXQUFXLDhFQUE4QixzQkFBc0Isd0RBQVEsRUFBRTtBQUM3TjtBQUNBLGFBQWEsZUFBZTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLHlEQUFTO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsOEVBQThCO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLWZyYW1lcy10by1ncm91cHMvLi9zcmMvdHlwZXMvU2V0dGluZ3NNYXAudHMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLWZyYW1lcy10by1ncm91cHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLWZyYW1lcy10by1ncm91cHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1mcmFtZXMtdG8tZ3JvdXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLWZyYW1lcy10by1ncm91cHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tZnJhbWVzLXRvLWdyb3Vwcy8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgdmFyIFllc05vO1xuKGZ1bmN0aW9uIChZZXNObykge1xuICAgIFllc05vW1wieWVzXCJdID0gXCJ5ZXNcIjtcbiAgICBZZXNOb1tcIm5vXCJdID0gXCJub1wiO1xufSkoWWVzTm8gfHwgKFllc05vID0ge30pKTtcbi8vIFRPRE86IG5vdCBpbiB1c2Vcbi8vIFRPRE86IFVzZSB0aGlzIGNvZGUgdG8gY29weSBhIGZyYW1lJ3MgcHJvcHNcbi8vIGh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9aEI0UDAwQldmM0VcbmV4cG9ydCB2YXIgRW1wdHlGcmFtZXNBY3Rpb25zO1xuKGZ1bmN0aW9uIChFbXB0eUZyYW1lc0FjdGlvbnMpIHtcbiAgICBFbXB0eUZyYW1lc0FjdGlvbnNbXCJyZW1vdmVcIl0gPSBcInJlbW92ZVwiO1xuICAgIEVtcHR5RnJhbWVzQWN0aW9uc1tcInR1cm5JbnRvUmVjdGFuZ2xlXCJdID0gXCJ0dXJuSW50b1JlY3RhbmdsZVwiO1xufSkoRW1wdHlGcmFtZXNBY3Rpb25zIHx8IChFbXB0eUZyYW1lc0FjdGlvbnMgPSB7fSkpO1xuZXhwb3J0IHZhciBSb290RnJhbWVBY3Rpb25zO1xuKGZ1bmN0aW9uIChSb290RnJhbWVBY3Rpb25zKSB7XG4gICAgUm9vdEZyYW1lQWN0aW9uc1tcImxlYXZlRnJhbWVcIl0gPSBcImxlYXZlRnJhbWVcIjtcbiAgICBSb290RnJhbWVBY3Rpb25zW1widHVybkludG9Hcm91cFwiXSA9IFwidHVybkludG9Hcm91cFwiO1xufSkoUm9vdEZyYW1lQWN0aW9ucyB8fCAoUm9vdEZyYW1lQWN0aW9ucyA9IHt9KSk7XG5leHBvcnQgY29uc3Qgc2V0dGluZ3NNYXBEZWZhdWx0cyA9IHtcbiAgICBjcmVhdGVSZWN0YW5nbGVGb3JGcmFtZTogWWVzTm8ubm8sXG4gICAgZW1wdHlGcmFtZXM6IEVtcHR5RnJhbWVzQWN0aW9ucy5yZW1vdmUsXG4gICAgcm9vdEZyYW1lOiBSb290RnJhbWVBY3Rpb25zLmxlYXZlRnJhbWUsXG4gICAgY29udmVydElubmVyRnJhbWVzOiBZZXNOby55ZXMsXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBSb290RnJhbWVBY3Rpb25zLCBzZXR0aW5nc01hcERlZmF1bHRzLCBZZXNObywgfSBmcm9tICcuL3R5cGVzL1NldHRpbmdzTWFwJztcbmNvbnN0IGN1cnJlbnRQYWdlID0gZmlnbWEuY3VycmVudFBhZ2U7XG5jb25zdCBzZWxlY3RlZEl0ZW1zID0gY3VycmVudFBhZ2Uuc2VsZWN0aW9uO1xuY29uc3Qgcm9vdCA9IGZpZ21hLnJvb3Q7XG5tYWluKCk7XG5mdW5jdGlvbiBtYWluKCkge1xuICAgIHN3aXRjaCAoZmlnbWEuY29tbWFuZCkge1xuICAgICAgICBjYXNlICdjb252ZXJ0RnJhbWVzVG9Hcm91cHMnOiB7XG4gICAgICAgICAgICByZXR1cm4gY29udmVydEZyYW1lc1RvR3JvdXBzKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnY29udmVydFJvb3RGcmFtZVRvR3JvdXAnOiB7XG4gICAgICAgICAgICByZXR1cm4gY29udmVydFJvb3RGcmFtZVRvR3JvdXAoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICd2aWV3OnNldHRpbmdzJzoge1xuICAgICAgICAgICAgcmV0dXJuIG9wZW5XaW5kb3coJ3ZpZXc6c2V0dGluZ3MnKTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICd2aWV3OmFib3V0Jzoge1xuICAgICAgICAgICAgcmV0dXJuIG9wZW5XaW5kb3coJ3ZpZXc6YWJvdXQnKTtcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbignRVJST1I6IFVua25vd24gY29tbWFuZCcpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gb3BlbldpbmRvdyhldmVudFR5cGUpIHtcbiAgICBzd2l0Y2ggKGV2ZW50VHlwZSkge1xuICAgICAgICBjYXNlICd2aWV3OnNldHRpbmdzJzoge1xuICAgICAgICAgICAgZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDI5NSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDI4NSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczogZ2V0UGx1Z2luU2V0dGluZ3NNYXAoKSxcbiAgICAgICAgICAgIH0sIHsgb3JpZ2luOiAnKicgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICd2aWV3OmFib3V0Jzoge1xuICAgICAgICAgICAgZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDMyMCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDQ2MCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoeyB0eXBlOiBldmVudFR5cGUgfSwgeyBvcmlnaW46ICcqJyB9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZpZ21hLnVpLm9ubWVzc2FnZSA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ21lc3NhZ2UnICYmIGV2ZW50LnRleHQpIHtcbiAgICAgICAgICAgIGZpZ21hLm5vdGlmeShldmVudC50ZXh0IHx8ICcnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChldmVudC50eXBlID09PSAnY2FuY2VsJykge1xuICAgICAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChldmVudC50eXBlID09PSAnc2F2ZTpzZXR0aW5ncycpIHtcbiAgICAgICAgICAgIHBhdGNoUGx1Z2luU2V0dGluZ3NNYXAoZXZlbnQuc2V0dGluZ3MpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGdldFBsdWdpblNldHRpbmdzTWFwKCkge1xuICAgIGNvbnN0IGdldCA9IChrZXkpID0+IHJvb3QuZ2V0UGx1Z2luRGF0YShrZXkpIHx8IHVuZGVmaW5lZDtcbiAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGVSZWN0YW5nbGVGb3JGcmFtZTogZ2V0KCdjcmVhdGVSZWN0YW5nbGVGb3JGcmFtZScpIHx8XG4gICAgICAgICAgICBzZXR0aW5nc01hcERlZmF1bHRzLmNyZWF0ZVJlY3RhbmdsZUZvckZyYW1lLFxuICAgICAgICAvLyBUT0RPOiBub3QgaW4gdXNlXG4gICAgICAgIGVtcHR5RnJhbWVzOiBnZXQoJ2VtcHR5RnJhbWVzJykgfHwgc2V0dGluZ3NNYXBEZWZhdWx0cy5lbXB0eUZyYW1lcyxcbiAgICAgICAgcm9vdEZyYW1lOiBnZXQoJ3Jvb3RGcmFtZScpIHx8IHNldHRpbmdzTWFwRGVmYXVsdHMucm9vdEZyYW1lLFxuICAgICAgICBjb252ZXJ0SW5uZXJGcmFtZXM6IGdldCgnY29udmVydElubmVyRnJhbWVzJykgfHwgc2V0dGluZ3NNYXBEZWZhdWx0cy5jb252ZXJ0SW5uZXJGcmFtZXMsXG4gICAgfTtcbn1cbmZ1bmN0aW9uIHBhdGNoUGx1Z2luU2V0dGluZ3NNYXAoc2V0dGluZ3MpIHtcbiAgICBjb25zdCBuZXdTZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oc2V0dGluZ3NNYXBEZWZhdWx0cywgc2V0dGluZ3MpO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHNldHRpbmdzTWFwRGVmYXVsdHMpKSB7XG4gICAgICAgIHJvb3Quc2V0UGx1Z2luRGF0YShrZXksIFN0cmluZyhuZXdTZXR0aW5nc1trZXldKSk7XG4gICAgfVxufVxuZnVuY3Rpb24gY29udmVydEZyYW1lc1RvR3JvdXBzKCkge1xuICAgIGNvbnN0IHNldHRpbmdzID0gZ2V0UGx1Z2luU2V0dGluZ3NNYXAoKTtcbiAgICBjb25zdCBncm91cHMgPSBjcmVhdGVHcm91cHNGcm9tRnJhbWVzKHNlbGVjdGVkSXRlbXMubGVuZ3RoID8gc2VsZWN0ZWRJdGVtcyA6IGN1cnJlbnRQYWdlLmNoaWxkcmVuLCBzZXR0aW5ncyk7XG4gICAgZmlnbWEuY2xvc2VQbHVnaW4oZ3JvdXBzLmxlbmd0aFxuICAgICAgICA/IGAke2dyb3Vwcy5sZW5ndGh9IEZyYW1lKHMpIGNvbnZlcnRlZGBcbiAgICAgICAgOiAnVGhlcmUgYXJlIG5vIEZyYW1lcyB0byBjb252ZXJ0Jyk7XG59XG5mdW5jdGlvbiBjb252ZXJ0Um9vdEZyYW1lVG9Hcm91cCgpIHtcbiAgICBjb25zdCBzZXR0aW5ncyA9IGdldFBsdWdpblNldHRpbmdzTWFwKCk7XG4gICAgY29uc3QgZ3JvdXBzID0gY3JlYXRlR3JvdXBzRnJvbUZyYW1lcyhzZWxlY3RlZEl0ZW1zLmxlbmd0aCA/IHNlbGVjdGVkSXRlbXMgOiBjdXJyZW50UGFnZS5jaGlsZHJlbiwgT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBzZXR0aW5ncyksIHsgcm9vdEZyYW1lOiBSb290RnJhbWVBY3Rpb25zLnR1cm5JbnRvR3JvdXAsIGNvbnZlcnRJbm5lckZyYW1lczogWWVzTm8ubm8gfSkpO1xuICAgIGZpZ21hLmNsb3NlUGx1Z2luKGdyb3Vwcy5sZW5ndGhcbiAgICAgICAgPyBgJHtncm91cHMubGVuZ3RofSBGcmFtZShzKSBjb252ZXJ0ZWRgXG4gICAgICAgIDogJ1RoZXJlIGFyZSBubyBGcmFtZXMgdG8gY29udmVydCcpO1xufVxuZnVuY3Rpb24gY3JlYXRlR3JvdXBGcm9tRnJhbWUoZnJhbWVOb2RlKSB7XG4gICAgaWYgKCFmcmFtZU5vZGUgfHwgIWZyYW1lTm9kZS5wYXJlbnQpXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShmcmFtZU5vZGUuY2hpbGRyZW4pIHx8ICFmcmFtZU5vZGUuY2hpbGRyZW4ubGVuZ3RoKVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBwYXJlbnQgPSBmcmFtZU5vZGUucGFyZW50O1xuICAgIGlmIChwYXJlbnQudHlwZSA9PT0gJ0lOU1RBTkNFJylcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgZ3JvdXAgPSBmaWdtYS5ncm91cChmcmFtZU5vZGUuY2hpbGRyZW4sIHBhcmVudCk7XG4gICAgaWYgKGZyYW1lTm9kZS5uYW1lKVxuICAgICAgICBncm91cC5uYW1lID0gZnJhbWVOb2RlLm5hbWU7XG4gICAgcmV0dXJuIGdyb3VwO1xufVxuZnVuY3Rpb24gY3JlYXRlR3JvdXBzRnJvbUZyYW1lcyhpdGVtcywgc2V0dGluZ3MpIHtcbiAgICBjb25zdCBncm91cHMgPSBbXTtcbiAgICBpZiAoIWl0ZW1zLmxlbmd0aClcbiAgICAgICAgcmV0dXJuIGdyb3VwcztcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2YgaXRlbXMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBub2RlLmZpbmRBbGwgIT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgY29uc29sZS5sb2coJ3NldHRpbmdzLmNvbnZlcnRJbm5lckZyYW1lczogJywgc2V0dGluZ3MuY29udmVydElubmVyRnJhbWVzKTtcbiAgICAgICAgaWYgKHNldHRpbmdzLmNvbnZlcnRJbm5lckZyYW1lcyA9PT0gWWVzTm8ueWVzKSB7XG4gICAgICAgICAgICBjb25zdCBfZnJhbWVzID0gbm9kZS5maW5kQWxsKChuKSA9PiBuLnR5cGUgPT09ICdGUkFNRScpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBmcmFtZSBvZiBfZnJhbWVzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBjcmVhdGVHcm91cEZyb21GcmFtZShmcmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKGdyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIGdyb3Vwcy5wdXNoKGdyb3VwKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmcmFtZS5jaGlsZHJlbi5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFtZS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ0ZSQU1FJyAmJlxuICAgICAgICAgICAgc2V0dGluZ3Mucm9vdEZyYW1lID09PSBSb290RnJhbWVBY3Rpb25zLnR1cm5JbnRvR3JvdXApIHtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gY3JlYXRlR3JvdXBGcm9tRnJhbWUobm9kZSk7XG4gICAgICAgICAgICBpZiAoZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBncm91cHMucHVzaChncm91cCk7XG4gICAgICAgICAgICAgICAgaWYgKCFub2RlLmNoaWxkcmVuLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZ3JvdXBzO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9