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
/* harmony export */   "ChildlessFrameActions": () => (/* binding */ ChildlessFrameActions),
/* harmony export */   "RootFrameActions": () => (/* binding */ RootFrameActions),
/* harmony export */   "YesNo": () => (/* binding */ YesNo),
/* harmony export */   "settingsMapDefaults": () => (/* binding */ settingsMapDefaults)
/* harmony export */ });
var YesNo;
(function (YesNo) {
    YesNo["yes"] = "yes";
    YesNo["no"] = "no";
})(YesNo || (YesNo = {}));
var ChildlessFrameActions;
(function (ChildlessFrameActions) {
    // - if has styles or children - turn into rectangle
    // - else - remove
    ChildlessFrameActions["auto"] = "auto";
    ChildlessFrameActions["remove"] = "remove";
    ChildlessFrameActions["turnIntoRectangle"] = "turnIntoRectangle";
})(ChildlessFrameActions || (ChildlessFrameActions = {}));
var RootFrameActions;
(function (RootFrameActions) {
    RootFrameActions["leaveFrame"] = "leaveFrame";
    RootFrameActions["turnIntoGroup"] = "turnIntoGroup";
})(RootFrameActions || (RootFrameActions = {}));
const settingsMapDefaults = {
    createRectangleForFrame: YesNo.yes,
    childlessFrames: ChildlessFrameActions.auto,
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
                height: 320,
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
        else if (event.type === 'view:about') {
            openWindow('view:about');
            return;
        }
        else if (event.type === 'view:settings') {
            openWindow('view:settings');
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
        childlessFrames: get('childlessFrames') || _types_SettingsMap__WEBPACK_IMPORTED_MODULE_0__.settingsMapDefaults.childlessFrames,
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
    if (isEmpty && settings.childlessFrames === _types_SettingsMap__WEBPACK_IMPORTED_MODULE_0__.ChildlessFrameActions.remove) {
        return null;
    }
    const parent = frameNode.parent;
    if (parent.type === 'INSTANCE')
        return null;
    let group = null;
    // Create a background rectangle if enabled in settings
    if (settings.createRectangleForFrame === _types_SettingsMap__WEBPACK_IMPORTED_MODULE_0__.YesNo.yes) {
        let hasStyles = false;
        const bgRect = figma.createRectangle();
        // Copy corner radius from frame to rectangle
        if (typeof frameNode.cornerRadius === 'number' &&
            frameNode.cornerRadius > 0) {
            hasStyles = true;
            bgRect.cornerRadius = frameNode.cornerRadius;
        }
        else if (frameNode.topLeftRadius ||
            frameNode.topRightRadius ||
            frameNode.bottomLeftRadius ||
            frameNode.bottomRightRadius) {
            // Apply individual corner radii if they exist
            hasStyles = true;
            bgRect.topLeftRadius = frameNode.topLeftRadius || 0;
            bgRect.topRightRadius = frameNode.topRightRadius || 0;
            bgRect.bottomLeftRadius = frameNode.bottomLeftRadius || 0;
            bgRect.bottomRightRadius = frameNode.bottomRightRadius || 0;
        }
        if (frameNode.cornerSmoothing) {
            hasStyles = true;
            bgRect.cornerSmoothing = frameNode.cornerSmoothing;
        }
        // Copy background color from frame to rectangle
        if (frameNode.fills &&
            Array.isArray(frameNode.fills) &&
            frameNode.fills.length > 0) {
            hasStyles = true;
            bgRect.fills = JSON.parse(JSON.stringify(frameNode.fills));
        }
        if (frameNode.fillStyleId) {
            hasStyles = true;
            bgRect.setFillStyleIdAsync(String(frameNode.fillStyleId));
        }
        // Copy stroke/border properties if they exist
        if (frameNode.strokes &&
            Array.isArray(frameNode.strokes) &&
            frameNode.strokes.length > 0) {
            hasStyles = true;
            bgRect.strokes = JSON.parse(JSON.stringify(frameNode.strokes));
            bgRect.strokeWeight = frameNode.strokeWeight;
            bgRect.strokeAlign = frameNode.strokeAlign;
            bgRect.strokeCap = frameNode.strokeCap;
            bgRect.strokeJoin = frameNode.strokeJoin;
            bgRect.strokeMiterLimit = frameNode.strokeMiterLimit;
            bgRect.dashPattern = frameNode.dashPattern;
        }
        if (frameNode.strokeStyleId) {
            hasStyles = true;
            bgRect.setStrokeStyleIdAsync(frameNode.strokeStyleId);
        }
        // Copy effects if they exist
        if (frameNode.effects &&
            Array.isArray(frameNode.effects) &&
            frameNode.effects.length > 0) {
            hasStyles = true;
            bgRect.effects = JSON.parse(JSON.stringify(frameNode.effects));
        }
        if (frameNode.effectStyleId) {
            hasStyles = true;
            bgRect.setEffectStyleIdAsync(frameNode.effectStyleId);
        }
        // Add the rectangle as the first child in the group (background)
        if (hasStyles) {
            bgRect.name = frameNode.name
                ? `${frameNode.name} Background`
                : 'Frame Background';
            bgRect.resize(frameNode.width, frameNode.height);
            bgRect.x = frameNode.x;
            bgRect.y = frameNode.y;
            bgRect.rotation = frameNode.rotation;
            // Copy layout properties
            bgRect.layoutAlign = frameNode.layoutAlign;
            bgRect.layoutGrow = frameNode.layoutGrow;
            // Copy visibility properties
            bgRect.visible = frameNode.visible;
            bgRect.locked = frameNode.locked;
            bgRect.opacity = frameNode.opacity;
            bgRect.blendMode = frameNode.blendMode;
            bgRect.isMask = frameNode.isMask;
            const frameChildren = frameNode.children;
            if (frameChildren.length) {
                group = figma.group(frameNode.children, parent);
                group.insertChild(0, bgRect);
            }
            else {
                bgRect.x = 0;
                bgRect.y = 0;
                bgRect.rotation = 0;
                frameNode.insertChild(0, bgRect);
                group = figma.group(frameNode.children, parent);
            }
            if (frameNode.name)
                group.name = frameNode.name;
        }
        else {
            bgRect.remove();
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
                if (group)
                    groups.push(group);
                frame.remove();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0Qyx5REFBUztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsOEVBQThCO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLWZyYW1lcy10by1ncm91cHMvLi9zcmMvdHlwZXMvU2V0dGluZ3NNYXAudHMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLWZyYW1lcy10by1ncm91cHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLWZyYW1lcy10by1ncm91cHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1mcmFtZXMtdG8tZ3JvdXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLWZyYW1lcy10by1ncm91cHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tZnJhbWVzLXRvLWdyb3Vwcy8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgdmFyIFllc05vO1xuKGZ1bmN0aW9uIChZZXNObykge1xuICAgIFllc05vW1wieWVzXCJdID0gXCJ5ZXNcIjtcbiAgICBZZXNOb1tcIm5vXCJdID0gXCJub1wiO1xufSkoWWVzTm8gfHwgKFllc05vID0ge30pKTtcbmV4cG9ydCB2YXIgQ2hpbGRsZXNzRnJhbWVBY3Rpb25zO1xuKGZ1bmN0aW9uIChDaGlsZGxlc3NGcmFtZUFjdGlvbnMpIHtcbiAgICAvLyAtIGlmIGhhcyBzdHlsZXMgb3IgY2hpbGRyZW4gLSB0dXJuIGludG8gcmVjdGFuZ2xlXG4gICAgLy8gLSBlbHNlIC0gcmVtb3ZlXG4gICAgQ2hpbGRsZXNzRnJhbWVBY3Rpb25zW1wiYXV0b1wiXSA9IFwiYXV0b1wiO1xuICAgIENoaWxkbGVzc0ZyYW1lQWN0aW9uc1tcInJlbW92ZVwiXSA9IFwicmVtb3ZlXCI7XG4gICAgQ2hpbGRsZXNzRnJhbWVBY3Rpb25zW1widHVybkludG9SZWN0YW5nbGVcIl0gPSBcInR1cm5JbnRvUmVjdGFuZ2xlXCI7XG59KShDaGlsZGxlc3NGcmFtZUFjdGlvbnMgfHwgKENoaWxkbGVzc0ZyYW1lQWN0aW9ucyA9IHt9KSk7XG5leHBvcnQgdmFyIFJvb3RGcmFtZUFjdGlvbnM7XG4oZnVuY3Rpb24gKFJvb3RGcmFtZUFjdGlvbnMpIHtcbiAgICBSb290RnJhbWVBY3Rpb25zW1wibGVhdmVGcmFtZVwiXSA9IFwibGVhdmVGcmFtZVwiO1xuICAgIFJvb3RGcmFtZUFjdGlvbnNbXCJ0dXJuSW50b0dyb3VwXCJdID0gXCJ0dXJuSW50b0dyb3VwXCI7XG59KShSb290RnJhbWVBY3Rpb25zIHx8IChSb290RnJhbWVBY3Rpb25zID0ge30pKTtcbmV4cG9ydCBjb25zdCBzZXR0aW5nc01hcERlZmF1bHRzID0ge1xuICAgIGNyZWF0ZVJlY3RhbmdsZUZvckZyYW1lOiBZZXNOby55ZXMsXG4gICAgY2hpbGRsZXNzRnJhbWVzOiBDaGlsZGxlc3NGcmFtZUFjdGlvbnMuYXV0byxcbiAgICByb290RnJhbWU6IFJvb3RGcmFtZUFjdGlvbnMubGVhdmVGcmFtZSxcbiAgICBjb252ZXJ0SW5uZXJGcmFtZXM6IFllc05vLnllcyxcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IENoaWxkbGVzc0ZyYW1lQWN0aW9ucywgUm9vdEZyYW1lQWN0aW9ucywgc2V0dGluZ3NNYXBEZWZhdWx0cywgWWVzTm8sIH0gZnJvbSAnLi90eXBlcy9TZXR0aW5nc01hcCc7XG5jb25zdCBjdXJyZW50UGFnZSA9IGZpZ21hLmN1cnJlbnRQYWdlO1xuY29uc3Qgc2VsZWN0ZWRJdGVtcyA9IGN1cnJlbnRQYWdlLnNlbGVjdGlvbjtcbmNvbnN0IHJvb3QgPSBmaWdtYS5yb290O1xubWFpbigpO1xuZnVuY3Rpb24gbWFpbigpIHtcbiAgICBzd2l0Y2ggKGZpZ21hLmNvbW1hbmQpIHtcbiAgICAgICAgY2FzZSAnY29udmVydEZyYW1lc1RvR3JvdXBzJzoge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnZlcnRGcmFtZXNUb0dyb3VwcygpO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2NvbnZlcnRSb290RnJhbWVUb0dyb3VwJzoge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnZlcnRSb290RnJhbWVUb0dyb3VwKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAndmlldzpzZXR0aW5ncyc6IHtcbiAgICAgICAgICAgIHJldHVybiBvcGVuV2luZG93KCd2aWV3OnNldHRpbmdzJyk7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAndmlldzphYm91dCc6IHtcbiAgICAgICAgICAgIHJldHVybiBvcGVuV2luZG93KCd2aWV3OmFib3V0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oJ0VSUk9SOiBVbmtub3duIGNvbW1hbmQnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIG9wZW5XaW5kb3coZXZlbnRUeXBlKSB7XG4gICAgc3dpdGNoIChldmVudFR5cGUpIHtcbiAgICAgICAgY2FzZSAndmlldzpzZXR0aW5ncyc6IHtcbiAgICAgICAgICAgIGZpZ21hLnNob3dVSShfX2h0bWxfXywge1xuICAgICAgICAgICAgICAgIHdpZHRoOiAyOTUsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAzMjAsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBldmVudFR5cGUsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IGdldFBsdWdpblNldHRpbmdzTWFwKCksXG4gICAgICAgICAgICB9LCB7IG9yaWdpbjogJyonIH0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAndmlldzphYm91dCc6IHtcbiAgICAgICAgICAgIGZpZ21hLnNob3dVSShfX2h0bWxfXywge1xuICAgICAgICAgICAgICAgIHdpZHRoOiAzMjAsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA0NjAsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgdHlwZTogZXZlbnRUeXBlIH0sIHsgb3JpZ2luOiAnKicgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBmaWdtYS51aS5vbm1lc3NhZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICdtZXNzYWdlJyAmJiBldmVudC50ZXh0KSB7XG4gICAgICAgICAgICBmaWdtYS5ub3RpZnkoZXZlbnQudGV4dCB8fCAnJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXZlbnQudHlwZSA9PT0gJ2NhbmNlbCcpIHtcbiAgICAgICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXZlbnQudHlwZSA9PT0gJ3NhdmU6c2V0dGluZ3MnKSB7XG4gICAgICAgICAgICBwYXRjaFBsdWdpblNldHRpbmdzTWFwKGV2ZW50LnNldHRpbmdzKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChldmVudC50eXBlID09PSAndmlldzphYm91dCcpIHtcbiAgICAgICAgICAgIG9wZW5XaW5kb3coJ3ZpZXc6YWJvdXQnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChldmVudC50eXBlID09PSAndmlldzpzZXR0aW5ncycpIHtcbiAgICAgICAgICAgIG9wZW5XaW5kb3coJ3ZpZXc6c2V0dGluZ3MnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgIH07XG59XG5mdW5jdGlvbiBnZXRQbHVnaW5TZXR0aW5nc01hcCgpIHtcbiAgICBjb25zdCBnZXQgPSAoa2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbCA9IHJvb3QuZ2V0UGx1Z2luRGF0YShrZXkpO1xuICAgICAgICBpZiAoU3RyaW5nKHZhbCkgPT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIHZhbCB8fCB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGVSZWN0YW5nbGVGb3JGcmFtZTogZ2V0KCdjcmVhdGVSZWN0YW5nbGVGb3JGcmFtZScpIHx8XG4gICAgICAgICAgICBzZXR0aW5nc01hcERlZmF1bHRzLmNyZWF0ZVJlY3RhbmdsZUZvckZyYW1lLFxuICAgICAgICBjaGlsZGxlc3NGcmFtZXM6IGdldCgnY2hpbGRsZXNzRnJhbWVzJykgfHwgc2V0dGluZ3NNYXBEZWZhdWx0cy5jaGlsZGxlc3NGcmFtZXMsXG4gICAgICAgIHJvb3RGcmFtZTogZ2V0KCdyb290RnJhbWUnKSB8fCBzZXR0aW5nc01hcERlZmF1bHRzLnJvb3RGcmFtZSxcbiAgICAgICAgY29udmVydElubmVyRnJhbWVzOiBnZXQoJ2NvbnZlcnRJbm5lckZyYW1lcycpIHx8IHNldHRpbmdzTWFwRGVmYXVsdHMuY29udmVydElubmVyRnJhbWVzLFxuICAgIH07XG59XG5mdW5jdGlvbiBwYXRjaFBsdWdpblNldHRpbmdzTWFwKHNldHRpbmdzKSB7XG4gICAgY29uc3QgbmV3U2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHNldHRpbmdzTWFwRGVmYXVsdHMsIHNldHRpbmdzKTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhzZXR0aW5nc01hcERlZmF1bHRzKSkge1xuICAgICAgICBsZXQgdmFsID0gU3RyaW5nKG5ld1NldHRpbmdzW2tleV0pO1xuICAgICAgICBpZiAodmFsID09PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgIHZhbCA9ICcnO1xuICAgICAgICByb290LnNldFBsdWdpbkRhdGEoa2V5LCB2YWwpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNvbnZlcnRGcmFtZXNUb0dyb3VwcygpIHtcbiAgICBjb25zdCBzZXR0aW5ncyA9IGdldFBsdWdpblNldHRpbmdzTWFwKCk7XG4gICAgY29uc3QgZ3JvdXBzID0gY3JlYXRlR3JvdXBzRnJvbUZyYW1lcyhzZWxlY3RlZEl0ZW1zLmxlbmd0aCA/IHNlbGVjdGVkSXRlbXMgOiBjdXJyZW50UGFnZS5jaGlsZHJlbiwgc2V0dGluZ3MpO1xuICAgIGZpZ21hLmNsb3NlUGx1Z2luKGdyb3Vwcy5sZW5ndGhcbiAgICAgICAgPyBgJHtncm91cHMubGVuZ3RofSBGcmFtZShzKSBjb252ZXJ0ZWRgXG4gICAgICAgIDogJ1RoZXJlIGFyZSBubyBGcmFtZXMgdG8gY29udmVydCcpO1xufVxuZnVuY3Rpb24gY29udmVydFJvb3RGcmFtZVRvR3JvdXAoKSB7XG4gICAgY29uc3Qgc2V0dGluZ3MgPSBnZXRQbHVnaW5TZXR0aW5nc01hcCgpO1xuICAgIGNvbnN0IGdyb3VwcyA9IGNyZWF0ZUdyb3Vwc0Zyb21GcmFtZXMoc2VsZWN0ZWRJdGVtcy5sZW5ndGggPyBzZWxlY3RlZEl0ZW1zIDogY3VycmVudFBhZ2UuY2hpbGRyZW4sIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgc2V0dGluZ3MpLCB7IHJvb3RGcmFtZTogUm9vdEZyYW1lQWN0aW9ucy50dXJuSW50b0dyb3VwLCBjb252ZXJ0SW5uZXJGcmFtZXM6IFllc05vLm5vIH0pKTtcbiAgICBmaWdtYS5jbG9zZVBsdWdpbihncm91cHMubGVuZ3RoXG4gICAgICAgID8gYCR7Z3JvdXBzLmxlbmd0aH0gRnJhbWUocykgY29udmVydGVkYFxuICAgICAgICA6ICdUaGVyZSBhcmUgbm8gRnJhbWVzIHRvIGNvbnZlcnQnKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUdyb3VwRnJvbUZyYW1lKGZyYW1lTm9kZSwgc2V0dGluZ3MpIHtcbiAgICBpZiAoIWZyYW1lTm9kZSB8fCAhZnJhbWVOb2RlLnBhcmVudClcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgaXNFbXB0eSA9ICFBcnJheS5pc0FycmF5KGZyYW1lTm9kZS5jaGlsZHJlbikgfHwgIWZyYW1lTm9kZS5jaGlsZHJlbi5sZW5ndGg7XG4gICAgaWYgKGlzRW1wdHkgJiYgc2V0dGluZ3MuY2hpbGRsZXNzRnJhbWVzID09PSBDaGlsZGxlc3NGcmFtZUFjdGlvbnMucmVtb3ZlKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBwYXJlbnQgPSBmcmFtZU5vZGUucGFyZW50O1xuICAgIGlmIChwYXJlbnQudHlwZSA9PT0gJ0lOU1RBTkNFJylcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgbGV0IGdyb3VwID0gbnVsbDtcbiAgICAvLyBDcmVhdGUgYSBiYWNrZ3JvdW5kIHJlY3RhbmdsZSBpZiBlbmFibGVkIGluIHNldHRpbmdzXG4gICAgaWYgKHNldHRpbmdzLmNyZWF0ZVJlY3RhbmdsZUZvckZyYW1lID09PSBZZXNOby55ZXMpIHtcbiAgICAgICAgbGV0IGhhc1N0eWxlcyA9IGZhbHNlO1xuICAgICAgICBjb25zdCBiZ1JlY3QgPSBmaWdtYS5jcmVhdGVSZWN0YW5nbGUoKTtcbiAgICAgICAgLy8gQ29weSBjb3JuZXIgcmFkaXVzIGZyb20gZnJhbWUgdG8gcmVjdGFuZ2xlXG4gICAgICAgIGlmICh0eXBlb2YgZnJhbWVOb2RlLmNvcm5lclJhZGl1cyA9PT0gJ251bWJlcicgJiZcbiAgICAgICAgICAgIGZyYW1lTm9kZS5jb3JuZXJSYWRpdXMgPiAwKSB7XG4gICAgICAgICAgICBoYXNTdHlsZXMgPSB0cnVlO1xuICAgICAgICAgICAgYmdSZWN0LmNvcm5lclJhZGl1cyA9IGZyYW1lTm9kZS5jb3JuZXJSYWRpdXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZnJhbWVOb2RlLnRvcExlZnRSYWRpdXMgfHxcbiAgICAgICAgICAgIGZyYW1lTm9kZS50b3BSaWdodFJhZGl1cyB8fFxuICAgICAgICAgICAgZnJhbWVOb2RlLmJvdHRvbUxlZnRSYWRpdXMgfHxcbiAgICAgICAgICAgIGZyYW1lTm9kZS5ib3R0b21SaWdodFJhZGl1cykge1xuICAgICAgICAgICAgLy8gQXBwbHkgaW5kaXZpZHVhbCBjb3JuZXIgcmFkaWkgaWYgdGhleSBleGlzdFxuICAgICAgICAgICAgaGFzU3R5bGVzID0gdHJ1ZTtcbiAgICAgICAgICAgIGJnUmVjdC50b3BMZWZ0UmFkaXVzID0gZnJhbWVOb2RlLnRvcExlZnRSYWRpdXMgfHwgMDtcbiAgICAgICAgICAgIGJnUmVjdC50b3BSaWdodFJhZGl1cyA9IGZyYW1lTm9kZS50b3BSaWdodFJhZGl1cyB8fCAwO1xuICAgICAgICAgICAgYmdSZWN0LmJvdHRvbUxlZnRSYWRpdXMgPSBmcmFtZU5vZGUuYm90dG9tTGVmdFJhZGl1cyB8fCAwO1xuICAgICAgICAgICAgYmdSZWN0LmJvdHRvbVJpZ2h0UmFkaXVzID0gZnJhbWVOb2RlLmJvdHRvbVJpZ2h0UmFkaXVzIHx8IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZyYW1lTm9kZS5jb3JuZXJTbW9vdGhpbmcpIHtcbiAgICAgICAgICAgIGhhc1N0eWxlcyA9IHRydWU7XG4gICAgICAgICAgICBiZ1JlY3QuY29ybmVyU21vb3RoaW5nID0gZnJhbWVOb2RlLmNvcm5lclNtb290aGluZztcbiAgICAgICAgfVxuICAgICAgICAvLyBDb3B5IGJhY2tncm91bmQgY29sb3IgZnJvbSBmcmFtZSB0byByZWN0YW5nbGVcbiAgICAgICAgaWYgKGZyYW1lTm9kZS5maWxscyAmJlxuICAgICAgICAgICAgQXJyYXkuaXNBcnJheShmcmFtZU5vZGUuZmlsbHMpICYmXG4gICAgICAgICAgICBmcmFtZU5vZGUuZmlsbHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaGFzU3R5bGVzID0gdHJ1ZTtcbiAgICAgICAgICAgIGJnUmVjdC5maWxscyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZnJhbWVOb2RlLmZpbGxzKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZyYW1lTm9kZS5maWxsU3R5bGVJZCkge1xuICAgICAgICAgICAgaGFzU3R5bGVzID0gdHJ1ZTtcbiAgICAgICAgICAgIGJnUmVjdC5zZXRGaWxsU3R5bGVJZEFzeW5jKFN0cmluZyhmcmFtZU5vZGUuZmlsbFN0eWxlSWQpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDb3B5IHN0cm9rZS9ib3JkZXIgcHJvcGVydGllcyBpZiB0aGV5IGV4aXN0XG4gICAgICAgIGlmIChmcmFtZU5vZGUuc3Ryb2tlcyAmJlxuICAgICAgICAgICAgQXJyYXkuaXNBcnJheShmcmFtZU5vZGUuc3Ryb2tlcykgJiZcbiAgICAgICAgICAgIGZyYW1lTm9kZS5zdHJva2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGhhc1N0eWxlcyA9IHRydWU7XG4gICAgICAgICAgICBiZ1JlY3Quc3Ryb2tlcyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZnJhbWVOb2RlLnN0cm9rZXMpKTtcbiAgICAgICAgICAgIGJnUmVjdC5zdHJva2VXZWlnaHQgPSBmcmFtZU5vZGUuc3Ryb2tlV2VpZ2h0O1xuICAgICAgICAgICAgYmdSZWN0LnN0cm9rZUFsaWduID0gZnJhbWVOb2RlLnN0cm9rZUFsaWduO1xuICAgICAgICAgICAgYmdSZWN0LnN0cm9rZUNhcCA9IGZyYW1lTm9kZS5zdHJva2VDYXA7XG4gICAgICAgICAgICBiZ1JlY3Quc3Ryb2tlSm9pbiA9IGZyYW1lTm9kZS5zdHJva2VKb2luO1xuICAgICAgICAgICAgYmdSZWN0LnN0cm9rZU1pdGVyTGltaXQgPSBmcmFtZU5vZGUuc3Ryb2tlTWl0ZXJMaW1pdDtcbiAgICAgICAgICAgIGJnUmVjdC5kYXNoUGF0dGVybiA9IGZyYW1lTm9kZS5kYXNoUGF0dGVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZnJhbWVOb2RlLnN0cm9rZVN0eWxlSWQpIHtcbiAgICAgICAgICAgIGhhc1N0eWxlcyA9IHRydWU7XG4gICAgICAgICAgICBiZ1JlY3Quc2V0U3Ryb2tlU3R5bGVJZEFzeW5jKGZyYW1lTm9kZS5zdHJva2VTdHlsZUlkKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDb3B5IGVmZmVjdHMgaWYgdGhleSBleGlzdFxuICAgICAgICBpZiAoZnJhbWVOb2RlLmVmZmVjdHMgJiZcbiAgICAgICAgICAgIEFycmF5LmlzQXJyYXkoZnJhbWVOb2RlLmVmZmVjdHMpICYmXG4gICAgICAgICAgICBmcmFtZU5vZGUuZWZmZWN0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBoYXNTdHlsZXMgPSB0cnVlO1xuICAgICAgICAgICAgYmdSZWN0LmVmZmVjdHMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGZyYW1lTm9kZS5lZmZlY3RzKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZyYW1lTm9kZS5lZmZlY3RTdHlsZUlkKSB7XG4gICAgICAgICAgICBoYXNTdHlsZXMgPSB0cnVlO1xuICAgICAgICAgICAgYmdSZWN0LnNldEVmZmVjdFN0eWxlSWRBc3luYyhmcmFtZU5vZGUuZWZmZWN0U3R5bGVJZCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWRkIHRoZSByZWN0YW5nbGUgYXMgdGhlIGZpcnN0IGNoaWxkIGluIHRoZSBncm91cCAoYmFja2dyb3VuZClcbiAgICAgICAgaWYgKGhhc1N0eWxlcykge1xuICAgICAgICAgICAgYmdSZWN0Lm5hbWUgPSBmcmFtZU5vZGUubmFtZVxuICAgICAgICAgICAgICAgID8gYCR7ZnJhbWVOb2RlLm5hbWV9IEJhY2tncm91bmRgXG4gICAgICAgICAgICAgICAgOiAnRnJhbWUgQmFja2dyb3VuZCc7XG4gICAgICAgICAgICBiZ1JlY3QucmVzaXplKGZyYW1lTm9kZS53aWR0aCwgZnJhbWVOb2RlLmhlaWdodCk7XG4gICAgICAgICAgICBiZ1JlY3QueCA9IGZyYW1lTm9kZS54O1xuICAgICAgICAgICAgYmdSZWN0LnkgPSBmcmFtZU5vZGUueTtcbiAgICAgICAgICAgIGJnUmVjdC5yb3RhdGlvbiA9IGZyYW1lTm9kZS5yb3RhdGlvbjtcbiAgICAgICAgICAgIC8vIENvcHkgbGF5b3V0IHByb3BlcnRpZXNcbiAgICAgICAgICAgIGJnUmVjdC5sYXlvdXRBbGlnbiA9IGZyYW1lTm9kZS5sYXlvdXRBbGlnbjtcbiAgICAgICAgICAgIGJnUmVjdC5sYXlvdXRHcm93ID0gZnJhbWVOb2RlLmxheW91dEdyb3c7XG4gICAgICAgICAgICAvLyBDb3B5IHZpc2liaWxpdHkgcHJvcGVydGllc1xuICAgICAgICAgICAgYmdSZWN0LnZpc2libGUgPSBmcmFtZU5vZGUudmlzaWJsZTtcbiAgICAgICAgICAgIGJnUmVjdC5sb2NrZWQgPSBmcmFtZU5vZGUubG9ja2VkO1xuICAgICAgICAgICAgYmdSZWN0Lm9wYWNpdHkgPSBmcmFtZU5vZGUub3BhY2l0eTtcbiAgICAgICAgICAgIGJnUmVjdC5ibGVuZE1vZGUgPSBmcmFtZU5vZGUuYmxlbmRNb2RlO1xuICAgICAgICAgICAgYmdSZWN0LmlzTWFzayA9IGZyYW1lTm9kZS5pc01hc2s7XG4gICAgICAgICAgICBjb25zdCBmcmFtZUNoaWxkcmVuID0gZnJhbWVOb2RlLmNoaWxkcmVuO1xuICAgICAgICAgICAgaWYgKGZyYW1lQ2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZ3JvdXAgPSBmaWdtYS5ncm91cChmcmFtZU5vZGUuY2hpbGRyZW4sIHBhcmVudCk7XG4gICAgICAgICAgICAgICAgZ3JvdXAuaW5zZXJ0Q2hpbGQoMCwgYmdSZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGJnUmVjdC54ID0gMDtcbiAgICAgICAgICAgICAgICBiZ1JlY3QueSA9IDA7XG4gICAgICAgICAgICAgICAgYmdSZWN0LnJvdGF0aW9uID0gMDtcbiAgICAgICAgICAgICAgICBmcmFtZU5vZGUuaW5zZXJ0Q2hpbGQoMCwgYmdSZWN0KTtcbiAgICAgICAgICAgICAgICBncm91cCA9IGZpZ21hLmdyb3VwKGZyYW1lTm9kZS5jaGlsZHJlbiwgcGFyZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmcmFtZU5vZGUubmFtZSlcbiAgICAgICAgICAgICAgICBncm91cC5uYW1lID0gZnJhbWVOb2RlLm5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBiZ1JlY3QucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGdyb3VwO1xufVxuZnVuY3Rpb24gY3JlYXRlR3JvdXBzRnJvbUZyYW1lcyhpdGVtcywgc2V0dGluZ3MpIHtcbiAgICBjb25zdCBncm91cHMgPSBbXTtcbiAgICBpZiAoIWl0ZW1zLmxlbmd0aClcbiAgICAgICAgcmV0dXJuIGdyb3VwcztcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2YgaXRlbXMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBub2RlLmZpbmRBbGwgIT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgaWYgKHNldHRpbmdzLmNvbnZlcnRJbm5lckZyYW1lcyA9PT0gWWVzTm8ueWVzKSB7XG4gICAgICAgICAgICBjb25zdCBfZnJhbWVzID0gbm9kZS5maW5kQWxsKChuKSA9PiBuLnR5cGUgPT09ICdGUkFNRScpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBmcmFtZSBvZiBfZnJhbWVzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBjcmVhdGVHcm91cEZyb21GcmFtZShmcmFtZSwgc2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgIGlmIChncm91cClcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBzLnB1c2goZ3JvdXApO1xuICAgICAgICAgICAgICAgIGZyYW1lLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdGUkFNRScgJiZcbiAgICAgICAgICAgIHNldHRpbmdzLnJvb3RGcmFtZSA9PT0gUm9vdEZyYW1lQWN0aW9ucy50dXJuSW50b0dyb3VwKSB7XG4gICAgICAgICAgICBjb25zdCBncm91cCA9IGNyZWF0ZUdyb3VwRnJvbUZyYW1lKG5vZGUsIHNldHRpbmdzKTtcbiAgICAgICAgICAgIGlmIChncm91cCkge1xuICAgICAgICAgICAgICAgIGdyb3Vwcy5wdXNoKGdyb3VwKTtcbiAgICAgICAgICAgICAgICBpZiAoIW5vZGUuY2hpbGRyZW4ubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBncm91cHM7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=