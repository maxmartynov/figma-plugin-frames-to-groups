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
    createRectangleForFrame: YesNo.yes,
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
    const get = (key) => {
        const val = root.getPluginData(key);
        if (String(val) === 'undefined')
            return undefined;
        return val || undefined;
    };
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
        let val = String(newSettings[key]);
        if (val === 'undefined')
            val = '';
        root.setPluginData(key, val);
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
function createGroupFromFrame(frameNode, settings) {
    if (!frameNode || !frameNode.parent)
        return null;
    const isEmpty = !Array.isArray(frameNode.children) || !frameNode.children.length;
    if (isEmpty)
        return null;
    const parent = frameNode.parent;
    if (parent.type === 'INSTANCE')
        return null;
    const group = figma.group(frameNode.children, parent);
    if (frameNode.name)
        group.name = frameNode.name;
    // Create a background rectangle if enabled in settings
    if (settings.createRectangleForFrame === _types_SettingsMap__WEBPACK_IMPORTED_MODULE_0__.YesNo.yes) {
        let hasStyles = false;
        const rect = figma.createRectangle();
        // Copy corner radius from frame to rectangle
        if (typeof frameNode.cornerRadius === 'number' &&
            frameNode.cornerRadius > 0) {
            hasStyles = true;
            rect.cornerRadius = frameNode.cornerRadius;
        }
        else if (frameNode.topLeftRadius ||
            frameNode.topRightRadius ||
            frameNode.bottomLeftRadius ||
            frameNode.bottomRightRadius) {
            // Apply individual corner radii if they exist
            hasStyles = true;
            rect.topLeftRadius = frameNode.topLeftRadius || 0;
            rect.topRightRadius = frameNode.topRightRadius || 0;
            rect.bottomLeftRadius = frameNode.bottomLeftRadius || 0;
            rect.bottomRightRadius = frameNode.bottomRightRadius || 0;
        }
        if (frameNode.cornerSmoothing) {
            hasStyles = true;
            rect.cornerSmoothing = frameNode.cornerSmoothing;
        }
        // Copy background color from frame to rectangle
        if (frameNode.fills &&
            Array.isArray(frameNode.fills) &&
            frameNode.fills.length > 0) {
            hasStyles = true;
            rect.fills = JSON.parse(JSON.stringify(frameNode.fills));
            rect.fillStyleId = frameNode.fillStyleId;
        }
        if (frameNode.fillStyleId) {
            hasStyles = true;
            rect.fillStyleId = frameNode.fillStyleId;
        }
        // Copy stroke/border properties if they exist
        if (frameNode.strokes &&
            Array.isArray(frameNode.strokes) &&
            frameNode.strokes.length > 0) {
            hasStyles = true;
            rect.strokes = JSON.parse(JSON.stringify(frameNode.strokes));
            rect.strokeWeight = frameNode.strokeWeight;
            rect.strokeAlign = frameNode.strokeAlign;
            rect.strokeCap = frameNode.strokeCap;
            rect.strokeJoin = frameNode.strokeJoin;
            rect.strokeMiterLimit = frameNode.strokeMiterLimit;
            rect.dashPattern = frameNode.dashPattern;
        }
        if (frameNode.strokeStyleId) {
            hasStyles = true;
            rect.strokeStyleId = frameNode.strokeStyleId;
        }
        // Copy effects if they exist
        if (frameNode.effects &&
            Array.isArray(frameNode.effects) &&
            frameNode.effects.length > 0) {
            hasStyles = true;
            rect.effects = JSON.parse(JSON.stringify(frameNode.effects));
        }
        if (frameNode.effectStyleId) {
            hasStyles = true;
            rect.effectStyleId = frameNode.effectStyleId;
        }
        // Add the rectangle as the first child in the group (background)
        if (hasStyles) {
            rect.name = frameNode.name
                ? `${frameNode.name} Background`
                : 'Frame Background';
            rect.resize(frameNode.width, frameNode.height);
            rect.x = frameNode.x;
            rect.y = frameNode.y;
            rect.rotation = frameNode.rotation;
            // Copy layout properties
            rect.layoutAlign = frameNode.layoutAlign;
            rect.layoutGrow = frameNode.layoutGrow;
            // Copy visibility properties
            rect.visible = frameNode.visible;
            rect.locked = frameNode.locked;
            rect.opacity = frameNode.opacity;
            rect.blendMode = frameNode.blendMode;
            rect.isMask = frameNode.isMask;
            group.insertChild(0, rect);
        }
        else {
            rect.remove();
        }
    }
    return group;
}
function createGroupsFromFrames(items, settings) {
    const groups = [];
    if (!items.length)
        return groups;
    for (const node of items) {
        if (typeof node.findAll !== 'function')
            continue;
        if (settings.convertInnerFrames === _types_SettingsMap__WEBPACK_IMPORTED_MODULE_0__.YesNo.yes) {
            const _frames = node.findAll((n) => n.type === 'FRAME');
            for (const frame of _frames) {
                const group = createGroupFromFrame(frame, settings);
                if (group) {
                    groups.push(group);
                    if (!frame.children.length)
                        frame.remove();
                }
            }
        }
        if (node.type === 'FRAME' &&
            settings.rootFrame === _types_SettingsMap__WEBPACK_IMPORTED_MODULE_0__.RootFrameActions.turnIntoGroup) {
            const group = createGroupFromFrame(node, settings);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLDhFQUE4QjtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2ZpZ21hLXBsdWdpbi1mcmFtZXMtdG8tZ3JvdXBzLy4vc3JjL3R5cGVzL1NldHRpbmdzTWFwLnRzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1mcmFtZXMtdG8tZ3JvdXBzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1mcmFtZXMtdG8tZ3JvdXBzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tZnJhbWVzLXRvLWdyb3Vwcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1mcmFtZXMtdG8tZ3JvdXBzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLWZyYW1lcy10by1ncm91cHMvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHZhciBZZXNObztcbihmdW5jdGlvbiAoWWVzTm8pIHtcbiAgICBZZXNOb1tcInllc1wiXSA9IFwieWVzXCI7XG4gICAgWWVzTm9bXCJub1wiXSA9IFwibm9cIjtcbn0pKFllc05vIHx8IChZZXNObyA9IHt9KSk7XG4vLyBUT0RPOiBub3QgaW4gdXNlXG4vLyBUT0RPOiBVc2UgdGhpcyBjb2RlIHRvIGNvcHkgYSBmcmFtZSdzIHByb3BzXG4vLyBodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PWhCNFAwMEJXZjNFXG5leHBvcnQgdmFyIEVtcHR5RnJhbWVzQWN0aW9ucztcbihmdW5jdGlvbiAoRW1wdHlGcmFtZXNBY3Rpb25zKSB7XG4gICAgRW1wdHlGcmFtZXNBY3Rpb25zW1wicmVtb3ZlXCJdID0gXCJyZW1vdmVcIjtcbiAgICBFbXB0eUZyYW1lc0FjdGlvbnNbXCJ0dXJuSW50b1JlY3RhbmdsZVwiXSA9IFwidHVybkludG9SZWN0YW5nbGVcIjtcbn0pKEVtcHR5RnJhbWVzQWN0aW9ucyB8fCAoRW1wdHlGcmFtZXNBY3Rpb25zID0ge30pKTtcbmV4cG9ydCB2YXIgUm9vdEZyYW1lQWN0aW9ucztcbihmdW5jdGlvbiAoUm9vdEZyYW1lQWN0aW9ucykge1xuICAgIFJvb3RGcmFtZUFjdGlvbnNbXCJsZWF2ZUZyYW1lXCJdID0gXCJsZWF2ZUZyYW1lXCI7XG4gICAgUm9vdEZyYW1lQWN0aW9uc1tcInR1cm5JbnRvR3JvdXBcIl0gPSBcInR1cm5JbnRvR3JvdXBcIjtcbn0pKFJvb3RGcmFtZUFjdGlvbnMgfHwgKFJvb3RGcmFtZUFjdGlvbnMgPSB7fSkpO1xuZXhwb3J0IGNvbnN0IHNldHRpbmdzTWFwRGVmYXVsdHMgPSB7XG4gICAgY3JlYXRlUmVjdGFuZ2xlRm9yRnJhbWU6IFllc05vLnllcyxcbiAgICBlbXB0eUZyYW1lczogRW1wdHlGcmFtZXNBY3Rpb25zLnJlbW92ZSxcbiAgICByb290RnJhbWU6IFJvb3RGcmFtZUFjdGlvbnMubGVhdmVGcmFtZSxcbiAgICBjb252ZXJ0SW5uZXJGcmFtZXM6IFllc05vLnllcyxcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFJvb3RGcmFtZUFjdGlvbnMsIHNldHRpbmdzTWFwRGVmYXVsdHMsIFllc05vLCB9IGZyb20gJy4vdHlwZXMvU2V0dGluZ3NNYXAnO1xuY29uc3QgY3VycmVudFBhZ2UgPSBmaWdtYS5jdXJyZW50UGFnZTtcbmNvbnN0IHNlbGVjdGVkSXRlbXMgPSBjdXJyZW50UGFnZS5zZWxlY3Rpb247XG5jb25zdCByb290ID0gZmlnbWEucm9vdDtcbm1haW4oKTtcbmZ1bmN0aW9uIG1haW4oKSB7XG4gICAgc3dpdGNoIChmaWdtYS5jb21tYW5kKSB7XG4gICAgICAgIGNhc2UgJ2NvbnZlcnRGcmFtZXNUb0dyb3Vwcyc6IHtcbiAgICAgICAgICAgIHJldHVybiBjb252ZXJ0RnJhbWVzVG9Hcm91cHMoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdjb252ZXJ0Um9vdEZyYW1lVG9Hcm91cCc6IHtcbiAgICAgICAgICAgIHJldHVybiBjb252ZXJ0Um9vdEZyYW1lVG9Hcm91cCgpO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3ZpZXc6c2V0dGluZ3MnOiB7XG4gICAgICAgICAgICByZXR1cm4gb3BlbldpbmRvdygndmlldzpzZXR0aW5ncycpO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3ZpZXc6YWJvdXQnOiB7XG4gICAgICAgICAgICByZXR1cm4gb3BlbldpbmRvdygndmlldzphYm91dCcpO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCdFUlJPUjogVW5rbm93biBjb21tYW5kJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBvcGVuV2luZG93KGV2ZW50VHlwZSkge1xuICAgIHN3aXRjaCAoZXZlbnRUeXBlKSB7XG4gICAgICAgIGNhc2UgJ3ZpZXc6c2V0dGluZ3MnOiB7XG4gICAgICAgICAgICBmaWdtYS5zaG93VUkoX19odG1sX18sIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogMjk1LFxuICAgICAgICAgICAgICAgIGhlaWdodDogMjg1LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiBnZXRQbHVnaW5TZXR0aW5nc01hcCgpLFxuICAgICAgICAgICAgfSwgeyBvcmlnaW46ICcqJyB9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3ZpZXc6YWJvdXQnOiB7XG4gICAgICAgICAgICBmaWdtYS5zaG93VUkoX19odG1sX18sIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogMzIwLFxuICAgICAgICAgICAgICAgIGhlaWdodDogNDYwLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7IHR5cGU6IGV2ZW50VHlwZSB9LCB7IG9yaWdpbjogJyonIH0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZmlnbWEudWkub25tZXNzYWdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC50eXBlID09PSAnbWVzc2FnZScgJiYgZXZlbnQudGV4dCkge1xuICAgICAgICAgICAgZmlnbWEubm90aWZ5KGV2ZW50LnRleHQgfHwgJycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGV2ZW50LnR5cGUgPT09ICdjYW5jZWwnKSB7XG4gICAgICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGV2ZW50LnR5cGUgPT09ICdzYXZlOnNldHRpbmdzJykge1xuICAgICAgICAgICAgcGF0Y2hQbHVnaW5TZXR0aW5nc01hcChldmVudC5zZXR0aW5ncyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcbiAgICB9O1xufVxuZnVuY3Rpb24gZ2V0UGx1Z2luU2V0dGluZ3NNYXAoKSB7XG4gICAgY29uc3QgZ2V0ID0gKGtleSkgPT4ge1xuICAgICAgICBjb25zdCB2YWwgPSByb290LmdldFBsdWdpbkRhdGEoa2V5KTtcbiAgICAgICAgaWYgKFN0cmluZyh2YWwpID09PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiB2YWwgfHwgdW5kZWZpbmVkO1xuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlUmVjdGFuZ2xlRm9yRnJhbWU6IGdldCgnY3JlYXRlUmVjdGFuZ2xlRm9yRnJhbWUnKSB8fFxuICAgICAgICAgICAgc2V0dGluZ3NNYXBEZWZhdWx0cy5jcmVhdGVSZWN0YW5nbGVGb3JGcmFtZSxcbiAgICAgICAgLy8gVE9ETzogbm90IGluIHVzZVxuICAgICAgICBlbXB0eUZyYW1lczogZ2V0KCdlbXB0eUZyYW1lcycpIHx8IHNldHRpbmdzTWFwRGVmYXVsdHMuZW1wdHlGcmFtZXMsXG4gICAgICAgIHJvb3RGcmFtZTogZ2V0KCdyb290RnJhbWUnKSB8fCBzZXR0aW5nc01hcERlZmF1bHRzLnJvb3RGcmFtZSxcbiAgICAgICAgY29udmVydElubmVyRnJhbWVzOiBnZXQoJ2NvbnZlcnRJbm5lckZyYW1lcycpIHx8IHNldHRpbmdzTWFwRGVmYXVsdHMuY29udmVydElubmVyRnJhbWVzLFxuICAgIH07XG59XG5mdW5jdGlvbiBwYXRjaFBsdWdpblNldHRpbmdzTWFwKHNldHRpbmdzKSB7XG4gICAgY29uc3QgbmV3U2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHNldHRpbmdzTWFwRGVmYXVsdHMsIHNldHRpbmdzKTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhzZXR0aW5nc01hcERlZmF1bHRzKSkge1xuICAgICAgICBsZXQgdmFsID0gU3RyaW5nKG5ld1NldHRpbmdzW2tleV0pO1xuICAgICAgICBpZiAodmFsID09PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgIHZhbCA9ICcnO1xuICAgICAgICByb290LnNldFBsdWdpbkRhdGEoa2V5LCB2YWwpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNvbnZlcnRGcmFtZXNUb0dyb3VwcygpIHtcbiAgICBjb25zdCBzZXR0aW5ncyA9IGdldFBsdWdpblNldHRpbmdzTWFwKCk7XG4gICAgY29uc3QgZ3JvdXBzID0gY3JlYXRlR3JvdXBzRnJvbUZyYW1lcyhzZWxlY3RlZEl0ZW1zLmxlbmd0aCA/IHNlbGVjdGVkSXRlbXMgOiBjdXJyZW50UGFnZS5jaGlsZHJlbiwgc2V0dGluZ3MpO1xuICAgIGZpZ21hLmNsb3NlUGx1Z2luKGdyb3Vwcy5sZW5ndGhcbiAgICAgICAgPyBgJHtncm91cHMubGVuZ3RofSBGcmFtZShzKSBjb252ZXJ0ZWRgXG4gICAgICAgIDogJ1RoZXJlIGFyZSBubyBGcmFtZXMgdG8gY29udmVydCcpO1xufVxuZnVuY3Rpb24gY29udmVydFJvb3RGcmFtZVRvR3JvdXAoKSB7XG4gICAgY29uc3Qgc2V0dGluZ3MgPSBnZXRQbHVnaW5TZXR0aW5nc01hcCgpO1xuICAgIGNvbnN0IGdyb3VwcyA9IGNyZWF0ZUdyb3Vwc0Zyb21GcmFtZXMoc2VsZWN0ZWRJdGVtcy5sZW5ndGggPyBzZWxlY3RlZEl0ZW1zIDogY3VycmVudFBhZ2UuY2hpbGRyZW4sIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgc2V0dGluZ3MpLCB7IHJvb3RGcmFtZTogUm9vdEZyYW1lQWN0aW9ucy50dXJuSW50b0dyb3VwLCBjb252ZXJ0SW5uZXJGcmFtZXM6IFllc05vLm5vIH0pKTtcbiAgICBmaWdtYS5jbG9zZVBsdWdpbihncm91cHMubGVuZ3RoXG4gICAgICAgID8gYCR7Z3JvdXBzLmxlbmd0aH0gRnJhbWUocykgY29udmVydGVkYFxuICAgICAgICA6ICdUaGVyZSBhcmUgbm8gRnJhbWVzIHRvIGNvbnZlcnQnKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUdyb3VwRnJvbUZyYW1lKGZyYW1lTm9kZSwgc2V0dGluZ3MpIHtcbiAgICBpZiAoIWZyYW1lTm9kZSB8fCAhZnJhbWVOb2RlLnBhcmVudClcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgaXNFbXB0eSA9ICFBcnJheS5pc0FycmF5KGZyYW1lTm9kZS5jaGlsZHJlbikgfHwgIWZyYW1lTm9kZS5jaGlsZHJlbi5sZW5ndGg7XG4gICAgaWYgKGlzRW1wdHkpXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHBhcmVudCA9IGZyYW1lTm9kZS5wYXJlbnQ7XG4gICAgaWYgKHBhcmVudC50eXBlID09PSAnSU5TVEFOQ0UnKVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBncm91cCA9IGZpZ21hLmdyb3VwKGZyYW1lTm9kZS5jaGlsZHJlbiwgcGFyZW50KTtcbiAgICBpZiAoZnJhbWVOb2RlLm5hbWUpXG4gICAgICAgIGdyb3VwLm5hbWUgPSBmcmFtZU5vZGUubmFtZTtcbiAgICAvLyBDcmVhdGUgYSBiYWNrZ3JvdW5kIHJlY3RhbmdsZSBpZiBlbmFibGVkIGluIHNldHRpbmdzXG4gICAgaWYgKHNldHRpbmdzLmNyZWF0ZVJlY3RhbmdsZUZvckZyYW1lID09PSBZZXNOby55ZXMpIHtcbiAgICAgICAgbGV0IGhhc1N0eWxlcyA9IGZhbHNlO1xuICAgICAgICBjb25zdCByZWN0ID0gZmlnbWEuY3JlYXRlUmVjdGFuZ2xlKCk7XG4gICAgICAgIC8vIENvcHkgY29ybmVyIHJhZGl1cyBmcm9tIGZyYW1lIHRvIHJlY3RhbmdsZVxuICAgICAgICBpZiAodHlwZW9mIGZyYW1lTm9kZS5jb3JuZXJSYWRpdXMgPT09ICdudW1iZXInICYmXG4gICAgICAgICAgICBmcmFtZU5vZGUuY29ybmVyUmFkaXVzID4gMCkge1xuICAgICAgICAgICAgaGFzU3R5bGVzID0gdHJ1ZTtcbiAgICAgICAgICAgIHJlY3QuY29ybmVyUmFkaXVzID0gZnJhbWVOb2RlLmNvcm5lclJhZGl1cztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChmcmFtZU5vZGUudG9wTGVmdFJhZGl1cyB8fFxuICAgICAgICAgICAgZnJhbWVOb2RlLnRvcFJpZ2h0UmFkaXVzIHx8XG4gICAgICAgICAgICBmcmFtZU5vZGUuYm90dG9tTGVmdFJhZGl1cyB8fFxuICAgICAgICAgICAgZnJhbWVOb2RlLmJvdHRvbVJpZ2h0UmFkaXVzKSB7XG4gICAgICAgICAgICAvLyBBcHBseSBpbmRpdmlkdWFsIGNvcm5lciByYWRpaSBpZiB0aGV5IGV4aXN0XG4gICAgICAgICAgICBoYXNTdHlsZXMgPSB0cnVlO1xuICAgICAgICAgICAgcmVjdC50b3BMZWZ0UmFkaXVzID0gZnJhbWVOb2RlLnRvcExlZnRSYWRpdXMgfHwgMDtcbiAgICAgICAgICAgIHJlY3QudG9wUmlnaHRSYWRpdXMgPSBmcmFtZU5vZGUudG9wUmlnaHRSYWRpdXMgfHwgMDtcbiAgICAgICAgICAgIHJlY3QuYm90dG9tTGVmdFJhZGl1cyA9IGZyYW1lTm9kZS5ib3R0b21MZWZ0UmFkaXVzIHx8IDA7XG4gICAgICAgICAgICByZWN0LmJvdHRvbVJpZ2h0UmFkaXVzID0gZnJhbWVOb2RlLmJvdHRvbVJpZ2h0UmFkaXVzIHx8IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZyYW1lTm9kZS5jb3JuZXJTbW9vdGhpbmcpIHtcbiAgICAgICAgICAgIGhhc1N0eWxlcyA9IHRydWU7XG4gICAgICAgICAgICByZWN0LmNvcm5lclNtb290aGluZyA9IGZyYW1lTm9kZS5jb3JuZXJTbW9vdGhpbmc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ29weSBiYWNrZ3JvdW5kIGNvbG9yIGZyb20gZnJhbWUgdG8gcmVjdGFuZ2xlXG4gICAgICAgIGlmIChmcmFtZU5vZGUuZmlsbHMgJiZcbiAgICAgICAgICAgIEFycmF5LmlzQXJyYXkoZnJhbWVOb2RlLmZpbGxzKSAmJlxuICAgICAgICAgICAgZnJhbWVOb2RlLmZpbGxzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGhhc1N0eWxlcyA9IHRydWU7XG4gICAgICAgICAgICByZWN0LmZpbGxzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShmcmFtZU5vZGUuZmlsbHMpKTtcbiAgICAgICAgICAgIHJlY3QuZmlsbFN0eWxlSWQgPSBmcmFtZU5vZGUuZmlsbFN0eWxlSWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZyYW1lTm9kZS5maWxsU3R5bGVJZCkge1xuICAgICAgICAgICAgaGFzU3R5bGVzID0gdHJ1ZTtcbiAgICAgICAgICAgIHJlY3QuZmlsbFN0eWxlSWQgPSBmcmFtZU5vZGUuZmlsbFN0eWxlSWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ29weSBzdHJva2UvYm9yZGVyIHByb3BlcnRpZXMgaWYgdGhleSBleGlzdFxuICAgICAgICBpZiAoZnJhbWVOb2RlLnN0cm9rZXMgJiZcbiAgICAgICAgICAgIEFycmF5LmlzQXJyYXkoZnJhbWVOb2RlLnN0cm9rZXMpICYmXG4gICAgICAgICAgICBmcmFtZU5vZGUuc3Ryb2tlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBoYXNTdHlsZXMgPSB0cnVlO1xuICAgICAgICAgICAgcmVjdC5zdHJva2VzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShmcmFtZU5vZGUuc3Ryb2tlcykpO1xuICAgICAgICAgICAgcmVjdC5zdHJva2VXZWlnaHQgPSBmcmFtZU5vZGUuc3Ryb2tlV2VpZ2h0O1xuICAgICAgICAgICAgcmVjdC5zdHJva2VBbGlnbiA9IGZyYW1lTm9kZS5zdHJva2VBbGlnbjtcbiAgICAgICAgICAgIHJlY3Quc3Ryb2tlQ2FwID0gZnJhbWVOb2RlLnN0cm9rZUNhcDtcbiAgICAgICAgICAgIHJlY3Quc3Ryb2tlSm9pbiA9IGZyYW1lTm9kZS5zdHJva2VKb2luO1xuICAgICAgICAgICAgcmVjdC5zdHJva2VNaXRlckxpbWl0ID0gZnJhbWVOb2RlLnN0cm9rZU1pdGVyTGltaXQ7XG4gICAgICAgICAgICByZWN0LmRhc2hQYXR0ZXJuID0gZnJhbWVOb2RlLmRhc2hQYXR0ZXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmcmFtZU5vZGUuc3Ryb2tlU3R5bGVJZCkge1xuICAgICAgICAgICAgaGFzU3R5bGVzID0gdHJ1ZTtcbiAgICAgICAgICAgIHJlY3Quc3Ryb2tlU3R5bGVJZCA9IGZyYW1lTm9kZS5zdHJva2VTdHlsZUlkO1xuICAgICAgICB9XG4gICAgICAgIC8vIENvcHkgZWZmZWN0cyBpZiB0aGV5IGV4aXN0XG4gICAgICAgIGlmIChmcmFtZU5vZGUuZWZmZWN0cyAmJlxuICAgICAgICAgICAgQXJyYXkuaXNBcnJheShmcmFtZU5vZGUuZWZmZWN0cykgJiZcbiAgICAgICAgICAgIGZyYW1lTm9kZS5lZmZlY3RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGhhc1N0eWxlcyA9IHRydWU7XG4gICAgICAgICAgICByZWN0LmVmZmVjdHMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGZyYW1lTm9kZS5lZmZlY3RzKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZyYW1lTm9kZS5lZmZlY3RTdHlsZUlkKSB7XG4gICAgICAgICAgICBoYXNTdHlsZXMgPSB0cnVlO1xuICAgICAgICAgICAgcmVjdC5lZmZlY3RTdHlsZUlkID0gZnJhbWVOb2RlLmVmZmVjdFN0eWxlSWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWRkIHRoZSByZWN0YW5nbGUgYXMgdGhlIGZpcnN0IGNoaWxkIGluIHRoZSBncm91cCAoYmFja2dyb3VuZClcbiAgICAgICAgaWYgKGhhc1N0eWxlcykge1xuICAgICAgICAgICAgcmVjdC5uYW1lID0gZnJhbWVOb2RlLm5hbWVcbiAgICAgICAgICAgICAgICA/IGAke2ZyYW1lTm9kZS5uYW1lfSBCYWNrZ3JvdW5kYFxuICAgICAgICAgICAgICAgIDogJ0ZyYW1lIEJhY2tncm91bmQnO1xuICAgICAgICAgICAgcmVjdC5yZXNpemUoZnJhbWVOb2RlLndpZHRoLCBmcmFtZU5vZGUuaGVpZ2h0KTtcbiAgICAgICAgICAgIHJlY3QueCA9IGZyYW1lTm9kZS54O1xuICAgICAgICAgICAgcmVjdC55ID0gZnJhbWVOb2RlLnk7XG4gICAgICAgICAgICByZWN0LnJvdGF0aW9uID0gZnJhbWVOb2RlLnJvdGF0aW9uO1xuICAgICAgICAgICAgLy8gQ29weSBsYXlvdXQgcHJvcGVydGllc1xuICAgICAgICAgICAgcmVjdC5sYXlvdXRBbGlnbiA9IGZyYW1lTm9kZS5sYXlvdXRBbGlnbjtcbiAgICAgICAgICAgIHJlY3QubGF5b3V0R3JvdyA9IGZyYW1lTm9kZS5sYXlvdXRHcm93O1xuICAgICAgICAgICAgLy8gQ29weSB2aXNpYmlsaXR5IHByb3BlcnRpZXNcbiAgICAgICAgICAgIHJlY3QudmlzaWJsZSA9IGZyYW1lTm9kZS52aXNpYmxlO1xuICAgICAgICAgICAgcmVjdC5sb2NrZWQgPSBmcmFtZU5vZGUubG9ja2VkO1xuICAgICAgICAgICAgcmVjdC5vcGFjaXR5ID0gZnJhbWVOb2RlLm9wYWNpdHk7XG4gICAgICAgICAgICByZWN0LmJsZW5kTW9kZSA9IGZyYW1lTm9kZS5ibGVuZE1vZGU7XG4gICAgICAgICAgICByZWN0LmlzTWFzayA9IGZyYW1lTm9kZS5pc01hc2s7XG4gICAgICAgICAgICBncm91cC5pbnNlcnRDaGlsZCgwLCByZWN0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlY3QucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGdyb3VwO1xufVxuZnVuY3Rpb24gY3JlYXRlR3JvdXBzRnJvbUZyYW1lcyhpdGVtcywgc2V0dGluZ3MpIHtcbiAgICBjb25zdCBncm91cHMgPSBbXTtcbiAgICBpZiAoIWl0ZW1zLmxlbmd0aClcbiAgICAgICAgcmV0dXJuIGdyb3VwcztcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2YgaXRlbXMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBub2RlLmZpbmRBbGwgIT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgaWYgKHNldHRpbmdzLmNvbnZlcnRJbm5lckZyYW1lcyA9PT0gWWVzTm8ueWVzKSB7XG4gICAgICAgICAgICBjb25zdCBfZnJhbWVzID0gbm9kZS5maW5kQWxsKChuKSA9PiBuLnR5cGUgPT09ICdGUkFNRScpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBmcmFtZSBvZiBfZnJhbWVzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBjcmVhdGVHcm91cEZyb21GcmFtZShmcmFtZSwgc2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgIGlmIChncm91cCkge1xuICAgICAgICAgICAgICAgICAgICBncm91cHMucHVzaChncm91cCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZnJhbWUuY2hpbGRyZW4ubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWUucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdGUkFNRScgJiZcbiAgICAgICAgICAgIHNldHRpbmdzLnJvb3RGcmFtZSA9PT0gUm9vdEZyYW1lQWN0aW9ucy50dXJuSW50b0dyb3VwKSB7XG4gICAgICAgICAgICBjb25zdCBncm91cCA9IGNyZWF0ZUdyb3VwRnJvbUZyYW1lKG5vZGUsIHNldHRpbmdzKTtcbiAgICAgICAgICAgIGlmIChncm91cCkge1xuICAgICAgICAgICAgICAgIGdyb3Vwcy5wdXNoKGdyb3VwKTtcbiAgICAgICAgICAgICAgICBpZiAoIW5vZGUuY2hpbGRyZW4ubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBncm91cHM7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=