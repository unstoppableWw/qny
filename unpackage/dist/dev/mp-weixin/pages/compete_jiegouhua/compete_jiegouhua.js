(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/compete_jiegouhua/compete_jiegouhua"],{

/***/ 101:
/*!*******************************************************************************************************************!*\
  !*** C:/c_writing/工作/面试帮/my-learning/小新前版本/Test/main.js?{"page":"pages%2Fcompete_jiegouhua%2Fcompete_jiegouhua"} ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _compete_jiegouhua = _interopRequireDefault(__webpack_require__(/*! ./pages/compete_jiegouhua/compete_jiegouhua.vue */ 102));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_compete_jiegouhua.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 102:
/*!************************************************************************************************!*\
  !*** C:/c_writing/工作/面试帮/my-learning/小新前版本/Test/pages/compete_jiegouhua/compete_jiegouhua.vue ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _compete_jiegouhua_vue_vue_type_template_id_3f7ae972___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./compete_jiegouhua.vue?vue&type=template&id=3f7ae972& */ 103);
/* harmony import */ var _compete_jiegouhua_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./compete_jiegouhua.vue?vue&type=script&lang=js& */ 105);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _compete_jiegouhua_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _compete_jiegouhua_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _compete_jiegouhua_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./compete_jiegouhua.vue?vue&type=style&index=0&lang=css& */ 107);
/* harmony import */ var _c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs





/* normalize component */

var component = Object(_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _compete_jiegouhua_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _compete_jiegouhua_vue_vue_type_template_id_3f7ae972___WEBPACK_IMPORTED_MODULE_0__["render"],
  _compete_jiegouhua_vue_vue_type_template_id_3f7ae972___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _compete_jiegouhua_vue_vue_type_template_id_3f7ae972___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/compete_jiegouhua/compete_jiegouhua.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 103:
/*!*******************************************************************************************************************************!*\
  !*** C:/c_writing/工作/面试帮/my-learning/小新前版本/Test/pages/compete_jiegouhua/compete_jiegouhua.vue?vue&type=template&id=3f7ae972& ***!
  \*******************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_compete_jiegouhua_vue_vue_type_template_id_3f7ae972___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./compete_jiegouhua.vue?vue&type=template&id=3f7ae972& */ 104);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_compete_jiegouhua_vue_vue_type_template_id_3f7ae972___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_compete_jiegouhua_vue_vue_type_template_id_3f7ae972___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_compete_jiegouhua_vue_vue_type_template_id_3f7ae972___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_compete_jiegouhua_vue_vue_type_template_id_3f7ae972___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 104:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/c_writing/工作/面试帮/my-learning/小新前版本/Test/pages/compete_jiegouhua/compete_jiegouhua.vue?vue&type=template&id=3f7ae972& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    uniPopup: function () {
      return __webpack_require__.e(/*! import() | uni_modules/uni-popup/components/uni-popup/uni-popup */ "uni_modules/uni-popup/components/uni-popup/uni-popup").then(__webpack_require__.bind(null, /*! @/uni_modules/uni-popup/components/uni-popup/uni-popup.vue */ 478))
    },
    uniPopupMessage: function () {
      return Promise.all(/*! import() | uni_modules/uni-popup/components/uni-popup-message/uni-popup-message */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uni-popup/components/uni-popup-message/uni-popup-message")]).then(__webpack_require__.bind(null, /*! @/uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.vue */ 584))
    },
    uniSteps: function () {
      return __webpack_require__.e(/*! import() | uni_modules/uni-steps/components/uni-steps/uni-steps */ "uni_modules/uni-steps/components/uni-steps/uni-steps").then(__webpack_require__.bind(null, /*! @/uni_modules/uni-steps/components/uni-steps/uni-steps.vue */ 592))
    },
    uniPopupDialog: function () {
      return Promise.all(/*! import() | uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog")]).then(__webpack_require__.bind(null, /*! @/uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.vue */ 599))
    },
    uniDataSelect: function () {
      return Promise.all(/*! import() | uni_modules/uni-data-select/components/uni-data-select/uni-data-select */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uni-data-select/components/uni-data-select/uni-data-select")]).then(__webpack_require__.bind(null, /*! @/uni_modules/uni-data-select/components/uni-data-select/uni-data-select.vue */ 499))
    },
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 105:
/*!*************************************************************************************************************************!*\
  !*** C:/c_writing/工作/面试帮/my-learning/小新前版本/Test/pages/compete_jiegouhua/compete_jiegouhua.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _c_software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_compete_jiegouhua_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./compete_jiegouhua.vue?vue&type=script&lang=js& */ 106);
/* harmony import */ var _c_software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_compete_jiegouhua_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_c_software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_compete_jiegouhua_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _c_software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_compete_jiegouhua_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _c_software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_compete_jiegouhua_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_c_software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_compete_jiegouhua_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 106:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/c_writing/工作/面试帮/my-learning/小新前版本/Test/pages/compete_jiegouhua/compete_jiegouhua.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, wx) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mian_store = _interopRequireDefault(__webpack_require__(/*! @/store/mian_store.js */ 33));
var _config = _interopRequireDefault(__webpack_require__(/*! @/common/config.js */ 35));
var _webSocket = _interopRequireDefault(__webpack_require__(/*! @/webSocket/webSocket.js */ 45));
var _index = _interopRequireDefault(__webpack_require__(/*! @/NERtcUniappSDK-JS/lib/index */ 88));
var _permission = _interopRequireDefault(__webpack_require__(/*! @/NERtcUniappSDK-JS/permission.js */ 91));
var _NERtcDefines = __webpack_require__(/*! @/NERtcUniappSDK-JS/lib/NERtcDefines */ 90);
var _TrainChatMessage = _interopRequireDefault(__webpack_require__(/*! @/components/common/TrainChatMessage.vue */ 92));
var uniNavBar = function uniNavBar() {
  __webpack_require__.e(/*! require.ensure | components/uni-ui/uni-nav-bar/uni-nav-bar */ "components/uni-ui/uni-nav-bar/uni-nav-bar").then((function () {
    return resolve(__webpack_require__(/*! @/components/uni-ui/uni-nav-bar/uni-nav-bar.vue */ 527));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var commonList = function commonList() {
  Promise.all(/*! require.ensure | components/common/common-list */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/common/common-list")]).then((function () {
    return resolve(__webpack_require__(/*! @/components/common/common-list.vue */ 534));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var loadMore = function loadMore() {
  __webpack_require__.e(/*! require.ensure | components/common/load-more */ "components/common/load-more").then((function () {
    return resolve(__webpack_require__(/*! @/components/common/load-more.vue */ 541));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var noThing = function noThing() {
  __webpack_require__.e(/*! require.ensure | components/common/no-thing */ "components/common/no-thing").then((function () {
    return resolve(__webpack_require__(/*! @/components/common/no-thing.vue */ 473));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var recorderManager = uni.getRecorderManager();
var innerAudioContext = uni.createInnerAudioContext();
var _default = {
  components: {
    uniNavBar: uniNavBar,
    commonList: commonList,
    loadMore: loadMore,
    TrainChatMessage: _TrainChatMessage.default,
    noThing: noThing
  },
  //数据
  data: function data() {
    return {
      // 连接websocket的数据
      userId: null,
      //当前用户ID
      userImage: null,
      roomId: null,
      //当前房间ID
      webscoket: null,
      //websocket对象
      //邀请的人

      yaoqingList: [],
      yaoqingText: "有空吗，诚挚地邀请你加入咱的训练房间，和我一起提高面试技巧吧~",
      sessionId: 0,
      toId: 0,
      is_dianji: true,
      // 音频通讯相关数据
      engine: undefined,
      selfTalking: false,
      //设置相关
      zongBofang: true,
      zongZhendong: true,
      volumeSize: null,
      contentSize: 30,
      voicePath: '',
      //他的信息
      hisId: 0,
      //用户信息弹窗的具体信息
      userPopup_message: {
        follow: "关注",
        userId: null,
        userImg: null,
        userName: null,
        sex: null,
        area: null,
        description: null,
        articleNum: null,
        followNum: null,
        fansNum: null
      },
      // 房间信息
      roomInfo: {
        "roomId": 0,
        "userId": 0,
        "roomName": "无领导",
        "roomState": 1,
        "roomType": 1,
        "realNumber": 3,
        "maxNumber": 12,
        "area": "地区",
        "preference": "偏好"
      },
      //房间用户信息
      roomUsers: [{
        roomId: -1,
        userImg: '../../static/compete/wait_circle_3.png',
        userName: "空闲位置",
        userId: -1,
        //初始化为-1，代表空闲
        userState: 0
      }, {
        roomId: -1,
        userImg: '../../static/compete/wait_circle_3.png',
        userName: "空闲位置",
        userId: -1,
        userState: 0
      }],
      //不会改变的用户信息（用于赋值）
      roomUsers_nochange: [{
        roomId: -1,
        userImg: '../../static/compete/wait_circle_3.png',
        userName: "空闲位置",
        userId: -1,
        //初始化为-1，代表空闲
        userState: 0
      }, {
        roomId: -1,
        userImg: '../../static/compete/wait_circle_3.png',
        userName: "空闲位置",
        userId: -1,
        userState: 0
      }],
      //聊天信息
      red_point: false,
      inputText: "",
      messages: [],
      // 题目信息
      book_id: null,
      //题目Id
      book_area_range: [{
        value: "不限",
        text: "不限"
      }, {
        value: "广东省",
        text: "广东省"
      }, {
        value: "河北省",
        text: "河北省"
      }, {
        value: "山西省",
        text: "山西省"
      }, {
        value: "吉林省",
        text: "吉林省"
      }, {
        value: "辽宁省",
        text: "辽宁省"
      }, {
        value: "黑龙江省",
        text: "黑龙江省"
      }, {
        value: "陕西省",
        text: "陕西省"
      }, {
        value: "甘肃省",
        text: "甘肃省"
      }, {
        value: "青海省",
        text: "青海省"
      }, {
        value: "山东省",
        text: "山东省"
      }, {
        value: "福建省",
        text: "福建省"
      }, {
        value: "浙江省",
        text: "浙江省"
      }, {
        value: "河南省",
        text: "河南省"
      }, {
        value: "湖北省",
        text: "湖北省"
      }, {
        value: "湖南省",
        text: "湖南省"
      }, {
        value: "江西省",
        text: "江西省"
      }, {
        value: "江苏省",
        text: "江苏省"
      }, {
        value: "安徽省",
        text: "安徽省"
      }, {
        value: "海南省",
        text: "海南省"
      }, {
        value: "四川省",
        text: "四川省"
      }, {
        value: "贵州省",
        text: "贵州省"
      }, {
        value: "云南省",
        text: "云南省"
      }, {
        value: "北京市",
        text: "北京市"
      }, {
        value: "上海市",
        text: "上海市"
      }, {
        value: "天津市",
        text: "天津市"
      }, {
        value: "重庆市",
        text: "重庆市"
      }, {
        value: "内蒙古",
        text: "内蒙古"
      }, {
        value: "新疆",
        text: "新疆"
      }, {
        value: "宁夏回族",
        text: "宁夏回族"
      }, {
        value: "广西",
        text: "广西"
      }, {
        value: "西藏",
        text: "西藏"
      }],
      book_describe_range: [{
        value: "不限",
        text: "不限"
      }, {
        value: "人际关系",
        text: "人际关系"
      }, {
        value: "组织管理",
        text: "组织管理"
      }, {
        value: "应急处理",
        text: "应急处理"
      }, {
        value: "综合分析",
        text: "综合分析"
      }, {
        value: "套题",
        text: "套题"
      }],
      book_list: [],
      //题目
      shaixuan_book_area: "不限",
      //选题地区
      shaixuan_book_describe: "不限",
      //选题题型
      book_name: "广东省省考第一套",
      //选题名字
      book_content: "asdfasd",
      //选题内容
      isChooseBook: false,
      xuanti_scrollTop: 0,
      readBookList: [],
      //权限信息
      is_host: true,
      //是否是房主
      is_ready: false,
      //当前该用户是否准备
      is_all_ready: false,
      //所有用户都准备
      is_book: false,
      //选题弹窗能否显示
      is_pause: false,
      //是否暂停
      is_chating: true,
      //是否打开聊天窗口
      is_start: false,
      //是否开始
      is_connect: false,
      //是否连接RTC
      loading: false,
      //是否开始
      // 阶段信息
      compete_state: 0,
      //处于什么阶段
      jieduan_active1: 0,
      //主页的阶段
      jieduan_active2: 0,
      //对练页的阶段
      //对练页的阶段
      jieduan_list: [{
        title: '选题阶段'
      }, {
        title: "答题阶段"
      }, {
        title: "复盘阶段"
      }],
      //主页的阶段
      zhuyejieduan_list: [{
        title: '准备阶段'
      }, {
        title: "对练阶段"
      }],
      //计时功能
      all_change_time: 120,
      compete_time: 0,
      start_time: 0,
      this_time: 0,
      timer: null,
      //定时器
      zheng_timer: null,
      percentage: 0,
      //圆环百分比
      endMin: 0,
      endTen: 0,
      endOne: 0,
      //页面相关
      scrollTop: 0,
      //聊天页面滑动到的位置
      tabIndex: 0,
      time_button_show: "A",
      index: 0,
      //哪个页面
      pipei_message: "停止匹配",
      //显示匹配
      button_big: false,
      //按钮变大
      user_talking: [{
        Num: 0,
        userImage: "null",
        is_user: false
      }, {
        Num: 0,
        userImage: "null",
        is_user: false
      }, {
        Num: 0,
        userImage: "null",
        is_user: false
      }],
      //提示相关
      tishiType: 'success',
      tishiText: '这是一条成功提示',
      tishiTime: 2000,
      //网络相关
      is_wangluo: true
      //
    };
  },

  computed: {
    contentHeight: function contentHeight() {
      return this.rpxTopx(uni.getSystemInfoSync().windowHeight * 0.63);
    },
    // 键盘弹起来的高度+发送框高度
    inputHeight: function inputHeight() {
      return this.bottomHeight;
    }
  },
  onLoad: function onLoad(option) {
    var _this2 = this;
    console.log(option);
    //更新当前用户ID和房间ID
    this.roomId = option.roomId;
    this.userId = option.userId;
    var _this = this;

    //监测网络变化

    uni.onNetworkStatusChange(function (res) {
      if (!res.isConnected) {
        _this.is_wangluo = false;
        console.log("没网络！");
        uni.showToast({
          icon: 'loading',
          title: '网络错误',
          duration: 200000
        });
      } else {
        _this.is_wangluo = true;
        uni.showToast({
          icon: 'success',
          title: '网络恢复',
          duration: 2000
        });
      }
      return false;
    });
    //录音设备
    recorderManager.onStop(function (res) {
      console.log('recorder stop' + JSON.stringify(res));
      _this.voicePath = res.tempFilePath;
    });
    //创建webscoket对象
    var token;
    if (_mian_store.default.state.token) {
      token = _mian_store.default.state.token;
    } else {
      token = uni.getStorageSync('token');
    }
    var name = 'trainWebsocket';
    var url = "".concat(_config.default.webUrl_vuex, "/ws/structure_train?roomId=").concat(this.roomId, "&token=").concat(token);
    var time = 30;
    this.webscoket = new _webSocket.default(name, url, time);
    this.webscoket.initSocket();
    //初始化邀请list
    this.$H.post("/room/friend_list").then(function (res) {
      console.log(res);
      var data = res.data;
      if (data.code == 200) {
        for (var i = 0; i < data.data.length; i++) {
          _this2.yaoqingList.push({
            "name": data.data[i].userName,
            "image": data.data[i].userImg,
            "sessionId": data.data[i].sessionId,
            "userId": data.data[i].userId,
            "isNike": false
          });
        }
        console.log(_this2.yaoqinglist);
      } else {
        console.log("初始化邀请失败");
      }
    });
  },
  onBackPress: function onBackPress(options) {
    this.go_out();
    return true;
  },
  beforeMount: function beforeMount() {
    //开启监听事件
    uni.$on('trainWebsocketMessage', this.handleMessage);
  },
  beforeDestroy: function beforeDestroy() {
    //关闭监听事件
    uni.$off('trainWebsocketMessage', this.handleMessage);

    //关闭所有计时器
    clearInterval(this.timer);
  },
  methods: {
    // 处理信息
    handleMessage: function handleMessage(res) {
      var _this3 = this;
      var message = JSON.parse(res.data);
      //用户进入房间事件
      if (message.type == 'register') {
        console.log("用户进入房间事件");
        this.bofang("door.mp3");
        this.roomInfo = message.data.roomInfo;
        //roomUsers赋值
        for (var i = 0; i < this.roomUsers.length; i++) {
          this.roomUsers[i].userId = this.roomUsers_nochange[i].userId;
          this.roomUsers[i].userName = this.roomUsers_nochange[i].userName;
          this.roomUsers[i].userImg = this.roomUsers_nochange[i].userImg;
          this.roomUsers[i].userState = this.roomUsers_nochange[i].userState;
          this.roomUsers[i].roomId = this.roomUsers_nochange[i].roomId;
        }
        for (var _i = 0; _i < message.data.roomUsers.length; _i++) {
          this.roomUsers[_i].userId = message.data.roomUsers[_i].userId;
          this.roomUsers[_i].userName = message.data.roomUsers[_i].userName;
          this.roomUsers[_i].userImg = message.data.roomUsers[_i].userImg;
          this.roomUsers[_i].userState = message.data.roomUsers[_i].userState;
          this.roomUsers[_i].roomId = message.data.roomUsers[_i].roomId;
        }

        // console.log(this.roomUsers_nochange);
        // console.log(this.roomUsers);
        //inch：获得房间号，渲染用户信息，判断用户id是否是房主
        if (this.userId == this.roomInfo.userId) {
          this.is_host = true;
        } else {
          this.is_host = false;
        }
      }
      //用户退出房间事件
      else if (message.type == 'logout') {
        console.log("用户退出房间事件");
        this.roomInfo = message.data.roomInfo;
        //roomUsers赋值
        for (var _i2 = 0; _i2 < this.roomUsers.length; _i2++) {
          this.roomUsers[_i2].userId = this.roomUsers_nochange[_i2].userId;
          this.roomUsers[_i2].userName = this.roomUsers_nochange[_i2].userName;
          this.roomUsers[_i2].userImg = this.roomUsers_nochange[_i2].userImg;
          this.roomUsers[_i2].userState = this.roomUsers_nochange[_i2].userState;
          this.roomUsers[_i2].roomId = this.roomUsers_nochange[_i2].roomId;
        }
        for (var _i3 = 0; _i3 < message.data.roomUsers.length; _i3++) {
          this.roomUsers[_i3].userId = message.data.roomUsers[_i3].userId;
          this.roomUsers[_i3].userName = message.data.roomUsers[_i3].userName;
          this.roomUsers[_i3].userImg = message.data.roomUsers[_i3].userImg;
          this.roomUsers[_i3].userState = message.data.roomUsers[_i3].userState;
          this.roomUsers[_i3].roomId = message.data.roomUsers[_i3].roomId;
        }
      }
      //房主销毁房间事件
      else if (message.type == 'destory') {
        console.log("房主销毁房间事件");
        this.go_out();
      }
      //踢人事件
      else if (message.type == 'kick') {
        console.log("踢人事件");
        this.roomInfo = message.data.roomInfo;
        //roomUsers赋值
        for (var _i4 = 0; _i4 < this.roomUsers.length; _i4++) {
          this.roomUsers[_i4].userId = this.roomUsers_nochange[_i4].userId;
          this.roomUsers[_i4].userName = this.roomUsers_nochange[_i4].userName;
          this.roomUsers[_i4].userImg = this.roomUsers_nochange[_i4].userImg;
          this.roomUsers[_i4].userState = this.roomUsers_nochange[_i4].userState;
          this.roomUsers[_i4].roomId = this.roomUsers_nochange[_i4].roomId;
        }
        for (var _i5 = 0; _i5 < message.data.roomUsers.length; _i5++) {
          this.roomUsers[_i5].userId = message.data.roomUsers[_i5].userId;
          this.roomUsers[_i5].userName = message.data.roomUsers[_i5].userName;
          this.roomUsers[_i5].userImg = message.data.roomUsers[_i5].userImg;
          this.roomUsers[_i5].userState = message.data.roomUsers[_i5].userState;
          this.roomUsers[_i5].roomId = message.data.roomUsers[_i5].roomId;
        }
        for (var _i6 = 0; _i6 < this.roomUsers.length; _i6++) {
          if (this.roomUsers[_i6].userId == this.userId) {
            return;
          }
        }
        this.webscoket.closeSocket();
        // 关闭rtc的操作
        if (this.is_connect) {
          this.leaveChannel();
          this.closeRTC();
        }
        uni.switchTab({
          url: "/pages/index/index"
        });
      }
      //交换房主权限
      else if (message.type == 'change') {
        console.log("交换房主权限");
        this.roomInfo = message.data.roomInfo;
        if (this.userId == this.roomInfo.userId) {
          this.is_host = true;
        } else {
          this.is_host = false;
        }
      }
      //交换房主权限失败事件
      else if (message.type == 'changeFail') {
        console.log("交换房主权限失败事件");
        this.tishi_popup('error', "交换权限失败");
      }
      //文字交流事件（未完成）
      else if (message.type == 'chat') {
        console.log("文字交流事件");
        this.red_point = true;
        var isMyMessage = false;
        if (message.data.userId == this.userId) {
          isMyMessage = true;
        }
        if (message.data.userId == -1) {
          this.messages.push({
            userImg: "../../static/head/mianshibang.png",
            userName: '系统通知',
            text: message.data.content,
            isMyMessage: isMyMessage,
            isXitong: true
          });
          this.scrollToBottom();
          return;
        }
        this.messages.push({
          userId: message.data.userId,
          userImg: message.data.userImg,
          userName: message.data.userName,
          text: message.data.content,
          isMyMessage: isMyMessage,
          isXitong: false
        });
        this.scrollToBottom();
      }
      //组员准备事件
      else if (message.type == 'ready') {
        console.log("组员准备事件");
        //roomUsers赋值
        for (var _i7 = 0; _i7 < this.roomUsers.length; _i7++) {
          this.roomUsers[_i7].userId = this.roomUsers_nochange[_i7].userId;
          this.roomUsers[_i7].userName = this.roomUsers_nochange[_i7].userName;
          this.roomUsers[_i7].userImg = this.roomUsers_nochange[_i7].userImg;
          this.roomUsers[_i7].userState = this.roomUsers_nochange[_i7].userState;
          this.roomUsers[_i7].roomId = this.roomUsers_nochange[_i7].roomId;
        }
        for (var _i8 = 0; _i8 < message.data.roomUsers.length; _i8++) {
          this.roomUsers[_i8].userId = message.data.roomUsers[_i8].userId;
          this.roomUsers[_i8].userName = message.data.roomUsers[_i8].userName;
          this.roomUsers[_i8].userImg = message.data.roomUsers[_i8].userImg;
          this.roomUsers[_i8].userState = message.data.roomUsers[_i8].userState;
          this.roomUsers[_i8].roomId = message.data.roomUsers[_i8].roomId;
        }
        // console.log(this.roomUsers_nochange);
        // console.log(this.roomUsers);

        //判断是否全员准备
        for (var _i9 = 0; _i9 < this.roomUsers.length; _i9++) {
          if (this.roomUsers[_i9].userId != this.roomInfo.userId) {
            if (this.roomUsers[_i9].userState != 1) {
              return;
            }
          }
        }
        this.is_all_ready = true;
        if (this.is_host == true) {
          this.bofang('all_ready.mp3');
        }
      }
      //组员取消准备事件
      else if (message.type == 'noReady') {
        console.log("组员取消准备事件");
        //roomUsers赋值
        for (var _i10 = 0; _i10 < this.roomUsers.length; _i10++) {
          this.roomUsers[_i10].userId = this.roomUsers_nochange[_i10].userId;
          this.roomUsers[_i10].userName = this.roomUsers_nochange[_i10].userName;
          this.roomUsers[_i10].userImg = this.roomUsers_nochange[_i10].userImg;
          this.roomUsers[_i10].userState = this.roomUsers_nochange[_i10].userState;
          this.roomUsers[_i10].roomId = this.roomUsers_nochange[_i10].roomId;
        }
        for (var _i11 = 0; _i11 < message.data.roomUsers.length; _i11++) {
          this.roomUsers[_i11].userId = message.data.roomUsers[_i11].userId;
          this.roomUsers[_i11].userName = message.data.roomUsers[_i11].userName;
          this.roomUsers[_i11].userImg = message.data.roomUsers[_i11].userImg;
          this.roomUsers[_i11].userState = message.data.roomUsers[_i11].userState;
          this.roomUsers[_i11].roomId = message.data.roomUsers[_i11].roomId;
        }
        // console.log(this.roomUsers_nochange);
        // console.log(this.roomUsers);

        this.is_all_ready = false;
      }
      //开始匹配事件
      else if (message.type == 'startMatch') {
        console.log("开始匹配事件");
        this.pipei_message = "匹配中...";
        this.tishi_popup('success', "开启匹配");
      }
      //停止匹配事件
      else if (message.type == 'stopMatch') {
        console.log("停止匹配事件");
        this.pipei_message = "停止匹配";
        this.tishi_popup('success', "停止匹配");
      }
      //开始训练事件
      else if (message.type == 'startSuccess') {
        this.tishi_popup("success", "对练阶段");
        console.log("开始训练事件");
        //获取音量
        console.log("音量是啥！！！！！！！！！！");
        console.log(10 * plus.device.getVolume());
        this.volumeSize = Math.round(plus.device.getVolume() * 10);
        this.book_id = message.data.book.bookId;
        this.book_name = message.data.book.bookName;
        this.book_content = message.data.book.content;
        this.change_book_attribute();
        this.is_start = true;
        this.timeFn();
        this.self_update();
        this.right_slip();

        //启动rtc
        setTimeout(function () {
          _this3.jieduan_active1 = 1;
          _this3.is_connect = true;
          _this3.startRTC();
          _this3.joinChannel(_this3.roomId, _this3.userId);

          //设置间隔为500ms的人声音量提示
          _this3.engine.enableAudioVolumeIndication({
            enable: true,
            interval: 500,
            enableVad: true
          });
        }, 4000);
      } else if (message.type == 'startFail') {
        console.log("没够人准备");
      }
    },
    //发送聊天信息
    sendChatMessage: function sendChatMessage() {
      if (this.inputText.trim() === "") {
        return;
      }
      this.webscoket.sendMsg({
        type: 'chat',
        data: this.inputText
      });
      this.inputText = "";
      this.scrollToBottom();
    },
    //设置文本大小
    sliderChange: function sliderChange(e) {
      this.contentSize = e.detail.value;
      console.log('value 发生变化：' + e.detail.value);
    },
    //设置音频大小
    sliderChange_volume: function sliderChange_volume(e) {
      this.volumeSize = e.detail.value;
      plus.device.setVolume(this.volumeSize * 0.1);
      console.log('value 发生变化：' + e.detail.value);
    },
    // 滚动至聊天底部
    scrollToBottom: function scrollToBottom(e) {
      var _this4 = this;
      setTimeout(function () {
        var query = uni.createSelectorQuery().in(_this4);
        query.select('.scrollview').boundingClientRect();
        query.select('.msglistview').boundingClientRect();
        query.exec(function (res) {
          console.log("滚");
          console.log(res);
          if (res[1].height > res[0].height) {
            _this4.scrollTop = _this4.rpxTopx(res[1].height - res[0].height);
            console.log(_this4.scrollTop);
          }
        });
      }, 500);
    },
    // px转换成rpx
    rpxTopx: function rpxTopx(px) {
      var deviceWidth = wx.getSystemInfoSync().windowWidth;
      var rpx = 750 / deviceWidth * Number(px);
      return Math.floor(rpx);
    },
    //右滑按钮
    right_slip: function right_slip() {
      this.index++;
    },
    // 开始按钮
    start: function start() {
      this.ready();
      if (this.loading == true) {
        return;
      }
      this.loading = true;
      this.webscoket.sendMsg({
        type: 'start'
      });
    },
    self_update: function self_update() {
      console.log("现在信息锁定了");
      console.log(this.roomInfo);
      for (var i = 0; i < this.roomUsers.length; i++) {
        if (this.roomUsers[i].userId == this.userId) {
          console.log("你是这个号码");
          console.log(i + 1);
          this.userImage = this.roomUsers[i].userImg;
          return;
        }
      }
    },
    //左滑按钮
    left_slip: function left_slip() {
      this.index--;
    },
    // 滑动自动调用
    onChangeTab: function onChangeTab(e) {
      this.tabIndex = e.detail.current;
    },
    //全场倒计时
    timeFn: function timeFn() {
      var _this5 = this;
      this.all_change_time = 120;
      this.timer = setInterval(function () {
        console.log("allchangetime");
        console.log(_this5.all_change_time);
        if (_this5.all_change_time > 0) {
          _this5.all_change_time -= 1;

          // console.log('打印', this.countdown / this.countdownNum)
        } else {
          uni.showToast({
            title: "感谢您的面试",
            icon: "success",
            duration: 2000
          });
          clearInterval(_this5.timer);
          uni.switchTab({
            url: '../index/index'
          });
        }
      }, 60000);
    },
    //正向计时器开始
    time_start: function time_start() {
      var _this6 = this;
      this.tishi_popup('success', "开始计时");
      uni.showToast({
        title: "开始计时",
        icon: "none",
        duration: 2000
      });
      this.jieduan_active2 = 1;
      this.start_time = new Date().getTime();
      this.time_button_show = "B";
      var min = 60000;
      this.zheng_timer = setInterval(function () {
        _this6.compete_time = Math.floor((new Date().getTime() - _this6.start_time) / min).toLocaleString();
        _this6.percentage = ((new Date().getTime() - _this6.start_time) / min).toFixed(2) * 100 % 100;
      }, 1000);
    },
    //正向计时器暂停
    time_pulse: function time_pulse() {
      this.tishi_popup('success', "暂停计时");
      uni.showToast({
        title: "暂停计时",
        icon: "none",
        duration: 2000
      });
      clearInterval(this.zheng_timer);
      this.this_time = new Date().getTime();
      this.time_button_show = "C";
    },
    //正向计时器继续
    time_continue: function time_continue() {
      var _this7 = this;
      this.tishi_popup('success', "继续计时");
      uni.showToast({
        title: "继续计时",
        icon: "none",
        duration: 2000
      });
      var min = 60000;
      this.start_time = this.start_time + (new Date().getTime() - this.this_time);
      this.zheng_timer = setInterval(function () {
        _this7.compete_time = Math.floor((new Date().getTime() - _this7.start_time) / min).toLocaleString();
        _this7.percentage = ((new Date().getTime() - _this7.start_time) / min).toFixed(2) * 100 % 100;
      }, 1000);
      this.time_button_show = "B";
    },
    //正向计时器结束
    time_end: function time_end() {
      this.tishi_popup('success', "结束计时");
      uni.showToast({
        title: "结束计时",
        icon: "none",
        duration: 2000
      });
      var totalTime = (((new Date().getTime() - this.start_time) / 60000).toFixed(2) * 60).toFixed(0);
      this.endMin = Math.floor(totalTime / 60);
      this.endTen = Math.floor(totalTime % 60 / 10);
      this.endOne = Math.floor(totalTime % 60 % 10);
      console.log(this.endMin + ":" + this.endTen + this.endOne);
      clearInterval(this.zheng_timer);
      this.compete_time = 0;
      this.percentage = 0;
      this.time_button_show = "A";
      this.jieduan_active2 = 2;
    },
    //开关聊天弹窗
    //左边弹窗
    open_chat_left: function open_chat_left() {
      this.red_point = false;
      console.log(this.is_chating);
      this.is_chating = false;
      this.$refs.left_chating.open("center");
      this.scrollToBottom();
    },
    close_chat_left: function close_chat_left() {
      this.red_point = false;
      console.log(this.is_chating);
      this.is_chating = true;
      this.$refs.left_chating.close();
    },
    //右边弹窗
    open_chat_right: function open_chat_right() {
      this.red_point = false;
      console.log(this.is_chating);
      this.is_chating = false;
      this.scrollToBottom();
      this.$refs.right_chating.open("center");
    },
    close_chat_right: function close_chat_right() {
      this.red_point = false;
      console.log(this.is_chating);
      this.is_chating = true;
      this.$refs.right_chating.close();
    },
    // 退出房间
    go_out: function go_out() {
      //如果还没开始，直接退出
      if (this.is_start == false) {
        if (this.is_host == true && this.roomInfo.realNumber != 1) {
          console.log(this.roomInfo.realNumber);
          console.log("你是房主别退出");
          this.host_goout_alert();
          return;
        }
        this.webscoket.sendMsg({
          type: "logout"
        });
        console.log("退出房间2");
        this.webscoket.closeSocket();
        // 关闭rtc的操作
        console.log("退出房间3");
        if (this.is_connect) {
          this.leaveChannel();
          this.closeRTC();
        }
        console.log("退出房间4");
        uni.switchTab({
          url: "/pages/index/index"
        });
      } else {
        //如果已经开始了
        //存储readBookList
        this.webscoket.sendMsg({
          type: "result",
          readBookList: this.readBookList
        });
        this.$refs.goout_popup.open("center");
      }
    },
    //取消出去
    goout_close: function goout_close() {
      this.goout_popup.close();
    },
    goout_confirm: function goout_confirm() {
      //先存入readBookList
      this.webscoket.sendMsg({
        type: "logout"
      });
      console.log("退出房间2");
      this.webscoket.closeSocket();
      // 关闭rtc的操作
      console.log("退出房间3");
      if (this.is_connect) {
        this.leaveChannel();
        this.closeRTC();
      }
      console.log("退出房间4");
      uni.navigateTo({
        url: "/pages/result_analyze/jiegouhua_result_analyze?roomId=".concat(this.roomId, "&first_come=true")
      });
    },
    //改变匹配状态
    change_pipei: function change_pipei(e) {
      var _this8 = this;
      //inch:修改
      console.log(e.detail.value);
      if (e.detail.value == true) {
        console.log(this.roomId);
        this.$H.post("/room/start_match.do", {
          "roomId": this.roomId
        }).then(function (res) {
          var data = res.data;
          if (data.code == 200) {
            console.log("改变成功");
          } else {
            console.log("改变失败");
            _this8.tishi_popup('error', "开启匹配失败");
          }
        });
      } else {
        this.$H.post("/room/stop_match.do", {
          "roomId": this.roomId
        }).then(function (res) {
          var data = res.data;
          if (data.code == 200) {
            console.log("改变成功");
            _this8.tishi_popup('success', "停止匹配");
          } else {
            console.log("改变失败");
            _this8.tishi_popup('error', "停止匹配失败");
          }
        });
      }
    },
    //准备
    ready: function ready() {
      this.is_ready = true;
      //inch:写准备代码，并渲染到每一个user_state
      this.webscoket.sendMsg({
        type: "ready"
      });
    },
    //取消准备
    disready: function disready() {
      this.is_ready = false;
      //inch:写准备代码，并渲染到每一个user_state
      this.webscoket.sendMsg({
        type: "noReady"
      });
    },
    //选题
    choose_book: function choose_book() {
      this.jieduan_active2 = 0;
      this.is_book = true;
      this.$refs.is_book.open("center");
      this.isChooseBook = true;
    },
    hide_choosebook: function hide_choosebook() {
      this.is_book = false;
      this.$refs.is_book.close();
    },
    //确定题目
    determine_book: function determine_book(book_Id) {
      var _this9 = this;
      console.log(book_Id);
      this.getScrollPosition();
      this.$H.post("/room/show_book.do", {
        "bookId": book_Id
      }).then(function (res) {
        var data = res.data;
        console.log(data);
        _this9.book_area = data.data.area;
        _this9.book_name = data.data.bookName;
        _this9.book_content = data.data.content;
        _this9.is_book = false;
      });
      clearTimeout(this.addTime);
      this.addTime = setTimeout(function () {
        _this9.readBookList.push(book_Id);
      }, 5000);
      console.log("看看你练了啥题 ");
      console.log(this.readBookList);
      this.hide_choosebook();
    },
    //改变筛选器地区
    change_book_area: function change_book_area(e) {
      this.shaixuan_book_area = e;
      this.change_book_attribute();
    },
    //改变筛选器题型
    change_book_describe: function change_book_describe(e) {
      this.shaixuan_book_describe = e;
      this.change_book_attribute();
    },
    //改变题目属性
    change_book_attribute: function change_book_attribute() {
      var _this10 = this;
      this.xuanti_scrollTop = 0;
      console.log(this.shaixuan_book_area);
      console.log(this.shaixuan_book_describe);
      var area;
      var describe;
      if (this.shaixuan_book_area == "不限") {
        area = "";
      } else {
        area = this.shaixuan_book_area;
      }
      if (this.shaixuan_book_describe == "不限") {
        describe = "";
      } else {
        describe = this.shaixuan_book_describe;
      }
      this.page_index = 1;
      this.$H.post("/book/getThemeAreaBooks.do", {
        "keyword": "",
        "page": this.page_index,
        "type": "结构化",
        "area": area,
        "describe": describe
      }).then(function (res) {
        var data = res.data;
        console.log(data);
        _this10.book_list = data.data;
      });
    },
    //选题下拉刷新
    onPulling: function onPulling(e) {
      var _this11 = this;
      console.log("onpulling", e);
      console.log(this.shaixuan_book_area);
      console.log(this.shaixuan_book_describe);
      var area;
      var describe;
      if (this.shaixuan_book_area == "不限") {
        area = "";
      } else {
        area = this.shaixuan_book_area;
      }
      if (this.shaixuan_book_describe == "不限") {
        describe = "";
      } else {
        describe = this.shaixuan_book_describe;
      }
      this.page_index++;
      this.$H.post("/book/getThemeAreaBooks.do", {
        "keyword": "",
        "page": this.page_index,
        "type": "无领导",
        "area": area,
        "describe": describe
      }).then(function (res) {
        var data = res.data;
        console.log(data);
        data.data.forEach(function (item, index) {
          _this11.book_list.push(item);
        });
        console.log(_this11.book_list);
      });
    },
    //获取选题位置
    getScrollPosition: function getScrollPosition() {
      var _this = this;
      // 使用uni.createSelectorQuery获取scroll-view的滚动位置
      uni.createSelectorQuery().in(this).select('.xuanti') // 选择scroll-view的class或选择器
      .scrollOffset(function (res) {
        console.log(res);
        console.log('scroll-top: ' + res.scrollTop);
        _this.xuanti_scrollTop = res.scrollTop;
        // 这里的res.scrollTop就是滚动位置的垂直偏移量
      }).exec();
    },
    //说话
    //长按按钮 开始
    button_start: function button_start() {
      this.button_big = true;
      this.selfTalking = true;
      this.openAudio();
      console.log('开始录音');
    },
    //长按按钮 结束
    button_end: function button_end() {
      this.button_big = false;
      this.selfTalking = false;
      this.closeAudio();
      console.log('录音结束');
      console.log('播放录音');
    },
    //召唤
    zhaohuan: function zhaohuan() {
      this.$H.post("/room/room_match_request.do", {
        "roomId": this.roomId
      }).then(function (res) {
        data = res.data;
        //还没确定逻辑
      });
    },
    //点击用户头像弹窗
    touxiang_popup: function touxiang_popup(touxiang_userId) {
      console.log(touxiang_userId);
      console.log(this.userId);
      //获取用户信息并渲染到弹窗上
      this.hisId = touxiang_userId;
      if (this.userId == touxiang_userId) {
        console.log("你点自己干嘛");
        return;
      } else if (touxiang_userId == -1) {
        console.log("分享去咯");
        this.$refs.yaoqing.open("bottom");
        return;
      } else if (this.is_start == false) {
        if (this.is_host == true) {
          //弹出房主专属弹窗
          this.host_toggle();
        } else {
          //弹出用户资料
          this.user_toggle();
        }
      } else {
        this.user_toggle();
        //都弹出用户资料
      }
    },
    //出现房主弹窗
    host_toggle: function host_toggle() {
      console.log("房主弹窗");
      // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
      this.$refs.host_doing.open('center');
    },
    //出现房主退出警告弹窗
    host_goout_alert: function host_goout_alert() {
      console.log("房主警告弹窗");
      // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
      this.$refs.host_goout_alert.open('center');
    },
    //关闭房主退出警告弹窗
    guanbi_host_goout_alert: function guanbi_host_goout_alert() {
      console.log("关闭弹窗");
      this.$refs.host_goout_alert.close();
    },
    //弹出用户信息
    user_toggle: function user_toggle() {
      var _this12 = this;
      console.log("用户弹窗");
      this.$refs.host_doing.close();
      //在此填入用户信息
      this.$H.post("/user/he", {
        "userId": this.hisId
      }).then(function (res) {
        console.log(res);
        if (res.data.data.follow == 1) {
          _this12.userPopup_message.follow = "已关注";
        } else {
          _this12.userPopup_message.follow = "关注";
        }
        _this12.userPopup_message.userId = res.data.data.userId;
        _this12.userPopup_message.userName = res.data.data.userName;
        _this12.userPopup_message.userImg = res.data.data.userImg;
        _this12.userPopup_message.sex = res.data.data.sex;
        _this12.userPopup_message.area = res.data.data.area;
        _this12.userPopup_message.description = res.data.data.description;
        _this12.userPopup_message.followNum = res.data.data.followNum;
        _this12.userPopup_message.fansNum = res.data.data.fansNum;
        _this12.userPopup_message.articleNum = res.data.data.articleNum;
      });
      // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
      this.$refs.roomUsers.open('center');
    },
    //关注
    guanzhu: function guanzhu() {
      var _this13 = this;
      console.log("关注");
      console.log(this.hisId);
      var bodyData = {
        "followId": this.hisId
      };
      if (this.userPopup_message.follow == "关注") {
        console.log(bodyData);
        this.$H.post('/article/follow.do', bodyData).then(function (response) {
          console.log("实施关注");
          _this13.userPopup_message.follow = "已关注";
        });
      } else {
        this.$H.post('/article/cancle_follow.do', bodyData).then(function (response) {
          console.log("取消关注");
          _this13.userPopup_message.follow = "关注";
        });
      }
    },
    //踢出房间
    tichu: function tichu() {
      this.webscoket.sendMsg({
        target: this.hisId,
        type: "kick"
      });
      this.$refs.host_doing.close();
    },
    //交换房主权限
    jiaohuan: function jiaohuan() {
      this.webscoket.sendMsg({
        "target": this.hisId,
        "type": "change"
      });
      this.$refs.host_doing.close();
    },
    // 启动音频通讯
    startRTC: function startRTC() {
      var _this14 = this;
      // 初始化 engine
      this.engine = _index.default.setupEngineWithContext({
        appKey: 'c7926083a145206400d05516babf6641',
        logDir: '',
        // expected log directory
        logLevel: _NERtcDefines.NERTCLogLevel.INFO
      });

      // 判断权限
      if (uni.getSystemInfoSync().platform === "android") {
        _permission.default.requestAndroidPermission("android.permission.RECORD_AUDIO");
        _permission.default.requestAndroidPermission("android.permission.CAMERA");
      }
      ;

      // 注册监听事件
      this.engine.addEventListener("onsetupEngineWithContext", function (message) {
        var imessage = "onsetupEngineWithContext\u901A\u77E5\uFF1Amessage = ".concat(message);
        console.log(imessage);
      });
      this.engine.addEventListener("onJoinChannel", function (result, channelId, elapsed, userID) {
        var message = "onJoinChannel\u901A\u77E5\uFF1A\u52A0\u5165\u623F\u95F4\u72B6\u51B5\uFF0Cresult = ".concat(result, ", channelId = ").concat(channelId, ", elapsed = ").concat(elapsed, ", userID = ").concat(userID);
        console.log(message);

        //加入房间后设置音频profile
        _this14.engine.setAudioProfile({
          profile: _NERtcDefines.NERTCAudioProfile.STANDARD,
          //设置profile为标准模式
          scenario: _NERtcDefines.NERTCAudioScenario.SPEECH //scenario为语音场景
        });

        //设置采集音量
        _this14.engine.adjustRecordingSignalVolume(0);
        _this14.engine.enableMediaPub(false);
        var connectState = _this14.engine.getConnectionState();
        message = "getConnectionState\uFF1A\u83B7\u53D6\u94FE\u63A5\u72B6\u6001\uFF0CconnectState = ".concat(connectState);
        console.log(message);
      });
      this.engine.addEventListener("onRemoteAudioVolumeIndication", function (volumeList, totalVolume) {
        var message = "onRemoteAudioVolumeIndication\u901A\u77E5\uFF1A\u603B\u97F3\u91CFtotalVolume = ".concat(totalVolume);
        console.log(message);
        console.log(volumeList);
        // volumeList.forEach((user)=>{
        // 	console.log(`用户 ${user.userID} 的音频音量为: ${user.volume},音频辅流的音量为: ${user.subStreamVolume} `)
        // 	//音频显示
        // 	for(let i=0;i<this.roomUsers.length;i++){
        // 		if(user.userID==this.roomUsers[i].userID){
        // 			this.user_talking.Num=i
        // 			this.user
        // 		}
        // 	}
        // })
        //谁在说话显示

        for (var j = 0; j < _this14.user_talking.length; j++) {
          _this14.user_talking[j].is_user = false;
        }
        console.log("hahah0");
        if (totalVolume != 0) {
          console.log("hahah1");
          for (var _j = 0; _j < volumeList.length; _j++) {
            console.log("hahah2");
            for (var i = 0; i < _this14.roomUsers.length; i++) {
              console.log("hahah3");
              console.log(_this14.osName);
              if (_this14.osName != "ios") {
                console.log("安卓的如下");
                console.log(volumeList[_j].userID);
                console.log(_this14.roomUsers[i].userId);
                //console.log(volumeList[j].volume);
                if (volumeList[_j].userID == _this14.roomUsers[i].userId && volumeList[_j].volume != 0) {
                  console.log("现在是安卓的这个人在说话");
                  console.log(i + 1);
                  _this14.user_talking[_j].Num = i + 1;
                  _this14.user_talking[_j].userImage = _this14.roomUsers[i].userImg;
                  _this14.user_talking[_j].is_user = true;
                }
              } else {
                console.log("苹果的如下");
                console.log(volumeList[_j].uerID);
                console.log(_this14.roomUsers[i].userId);
                if (volumeList[_j].uerID == _this14.roomUsers[i].userId && volumeList[_j].volume != 0) {
                  console.log("现在是苹果的这个人在说话");
                  console.log(i + 1);
                  _this14.user_talking[_j].Num = i + 1;
                  _this14.user_talking[_j].userImage = _this14.roomUsers[i].userImg;
                  _this14.user_talking[_j].is_user = true;
                }
              }
            }
          }
        }

        // setTimeout(function() {
        // 	for(let j=0;j<this.user_talking.length;j++){
        // 		this.user_talking[j].is_user=false
        // 	}
        // }, 500)
        // for(let j=0;j<this.user_talking.length;j++){
        // 	this.user_talking[j].is_user=false
        // }
      });
    },
    // 加入房间
    joinChannel: function joinChannel(roomId, userId) {
      this.engine.joinChannel({
        token: '',
        channelName: roomId,
        myUid: parseInt(userId)
      });
    },
    // 离开房间
    leaveChannel: function leaveChannel() {
      this.engine.leaveChannel();
    },
    // 销毁引擎
    closeRTC: function closeRTC() {
      var _this$engine, _this$engine2;
      console.log('销毁引擎');
      (_this$engine = this.engine) === null || _this$engine === void 0 ? void 0 : _this$engine.removeAllEventListener();
      (_this$engine2 = this.engine) === null || _this$engine2 === void 0 ? void 0 : _this$engine2.destroyEngine();
      this.engine = null;
    },
    // 开麦控制
    openAudio: function openAudio() {
      this.engine.enableMediaPub(true);
      this.engine.adjustRecordingSignalVolume(100);
      //this.engine.enableLocalAudio(true)
    },
    closeAudio: function closeAudio() {
      // this.engine.enableMediaPub(false)
      this.engine.adjustRecordingSignalVolume(0);
      //this.engine.enableMediaPub(false)
      //this.engine.enableLocalAudio(false)
    },
    //播放提示声音
    bofang: function bofang(src) {
      if (this.zongBofang == false) {
        return;
      }
      var innerAudioContext = uni.createInnerAudioContext();
      innerAudioContext.autoplay = true;
      innerAudioContext.src = '../../static/competejiegouhua_audio/' + src;
      innerAudioContext.onPlay(function () {
        console.log('开始播放');
      });
      innerAudioContext.onError(function (res) {
        console.log(res.errMsg);
        console.log(res.errCode);
      });
    },
    //复制题本
    copyBtn: function copyBtn() {
      var _this = this;
      uni.setClipboardData({
        data: '需要复制的内容',
        showToast: false,
        success: function success() {
          _this.isChooseBook = false;
          _this.tishi_popup('success', "复制成功");
        },
        fail: function fail() {
          _this.isChooseBook = false;
          _this.tishi_popup('success', "复制失败");
        }
      });
    },
    //弹出提示信息，msgType是提示颜色类型，type是什么提示
    tishi_popup: function tishi_popup(msgType, type) {
      this.tishiType = msgType;
      console.log("进来了");
      //第一页的
      if (type == "交换权限失败") {
        this.tishiText = "该组员已经离开,交换权限失败";
        this.open_close_tishi1();
      } else if (type == "开启匹配") {
        this.tishiText = "成功开启匹配，请稍等";
        this.open_close_tishi1();
      } else if (type == "开启匹配失败") {
        this.tishiText = "开启匹配失败，请查看网络连接";
        this.open_close_tishi1();
      } else if (type == "停止匹配") {
        this.tishiText = "成功关闭匹配";
        this.open_close_tishi1();
      } else if (type == "停止匹配失败") {
        this.tishiText = "关闭匹配失败，请查看网络连接";
        this.open_close_tishi1();
      }
      //第二页的
      else if (type == "对练阶段") {
        this.bofang("1duilianjieduan.mp3");
        this.tishiText = "进入对练阶段，请考生相互找出问题，刻意训练";
        this.open_close_tishi2();
      } else if (type == '复制成功') {
        this.tishiText = "已将该题本的题目链接复制到手机剪贴板，您可以用另一台设备打开该链接浏览题目";
        this.open_close_tishi2();
      } else if (type == '复制失败') {
        this.tishiText = "链接复制失败，请检查手机使用权限";
        this.open_close_tishi2();
      } else if (type == '开始计时') {
        this.bofang("click.mp3");
        if (this.zongZhendong) {
          uni.vibrateShort({
            success: function success() {
              console.log('success');
            }
          });
        }
      } else if (type == '暂停计时') {
        this.bofang("click.mp3");
        if (this.zongZhendong) {
          uni.vibrateShort({
            success: function success() {
              console.log('success');
            }
          });
        }
      } else if (type == '继续计时') {
        this.bofang("click.mp3");
        if (this.zongZhendong) {
          uni.vibrateShort({
            success: function success() {
              console.log('success');
            }
          });
        }
      } else if (type == '结束计时') {
        this.bofang("click.mp3");
        if (this.zongZhendong) {
          uni.vibrateShort({
            success: function success() {
              console.log('success');
            }
          });
        }
      }
    },
    //打开提示信息1，两秒后关闭
    open_close_tishi1: function open_close_tishi1() {
      var _this15 = this;
      if (this.zongZhendong) {
        uni.vibrateShort({
          success: function success() {
            console.log('success');
          }
        });
      }
      this.$refs.tishi_1.open();
      setTimeout(function () {
        _this15.$refs.tishi_1.close();
      }, 1500);
    },
    //打开提示信息2，两秒后关闭
    open_close_tishi2: function open_close_tishi2() {
      var _this16 = this;
      if (this.zongZhendong) {
        uni.vibrateShort({
          success: function success() {
            console.log('success');
          }
        });
      }
      this.$refs.tishi_2.open();
      setTimeout(function () {
        _this16.$refs.tishi_2.close();
      }, 1500);
    },
    open_setting: function open_setting() {
      this.$refs.setting.open();
    },
    open_jianjie: function open_jianjie() {
      this.$refs.jianjie.open();
    },
    change_shezhi1: function change_shezhi1(e) {
      console.log(e);
      this.zongBofang = false;
      for (var i = 0; i < e.detail.value.length; i++) {
        if (e.detail.value[i] == 'tishiMusic') {
          this.zongBofang = true;
        } else if (e.detail.value[i] == 'bgMusic') {}
      }
    },
    change_shezhi2: function change_shezhi2(e) {
      console.log(e);
      this.zongZhendong = false;
      for (var i = 0; i < e.detail.value.length; i++) {
        if (e.detail.value[i] == 'tishiZhendong') {
          this.zongZhendong = true;
        } else if (e.detail.value[i] == 'anzhuTalk') {}
      }
    },
    yaoqing_send: function yaoqing_send() {
      var _this17 = this;
      this.$H.post("/chat_message/send", {
        "sessionId": this.sessionId,
        //可以为空,跟用户一开始聊天可为空
        "toId": this.toId,
        "content": "结构化_" + this.roomId,
        "type": 1
      }).then(function (res) {
        console.log(res);
        var data = res.data;
        if (data.code == 200) {
          _this17.$refs.yaoqing.close();
          uni.showToast({
            icon: "success",
            title: "已发送邀请",
            duration: 2000
          });
        } else {
          console.log("初始化邀请失败");
        }
      });
    },
    Nike_yes: function Nike_yes(index) {
      for (var i = 0; i < this.yaoqingList.length; i++) {
        this.yaoqingList[i].isNike = false;
      }
      this.yaoqingList[index].isNike = true;
      this.sessionId = this.yaoqingList[index].sessionId;
      this.toId = this.yaoqingList[index].userId;
      this.is_dianji = false;
    },
    Nike_no: function Nike_no(index) {
      this.yaoqingList[index].isNike = false;
      this.is_dianji = true;
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"]))

/***/ }),

/***/ 107:
/*!*********************************************************************************************************************************!*\
  !*** C:/c_writing/工作/面试帮/my-learning/小新前版本/Test/pages/compete_jiegouhua/compete_jiegouhua.vue?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _c_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_c_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_c_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_compete_jiegouhua_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./compete_jiegouhua.vue?vue&type=style&index=0&lang=css& */ 108);
/* harmony import */ var _c_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_c_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_c_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_compete_jiegouhua_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_c_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_c_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_c_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_compete_jiegouhua_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _c_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_c_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_c_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_compete_jiegouhua_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _c_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_c_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_c_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_compete_jiegouhua_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_c_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_c_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_c_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_compete_jiegouhua_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 108:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/c_writing/工作/面试帮/my-learning/小新前版本/Test/pages/compete_jiegouhua/compete_jiegouhua.vue?vue&type=style&index=0&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 92:
/*!*****************************************************************************************!*\
  !*** C:/c_writing/工作/面试帮/my-learning/小新前版本/Test/components/common/TrainChatMessage.vue ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TrainChatMessage_vue_vue_type_template_id_857a6980_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TrainChatMessage.vue?vue&type=template&id=857a6980&scoped=true& */ 93);
/* harmony import */ var _TrainChatMessage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TrainChatMessage.vue?vue&type=script&lang=js& */ 95);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _TrainChatMessage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _TrainChatMessage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _TrainChatMessage_vue_vue_type_style_index_0_id_857a6980_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TrainChatMessage.vue?vue&type=style&index=0&id=857a6980&scoped=true&lang=css& */ 97);
/* harmony import */ var _c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs





/* normalize component */

var component = Object(_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _TrainChatMessage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TrainChatMessage_vue_vue_type_template_id_857a6980_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TrainChatMessage_vue_vue_type_template_id_857a6980_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "857a6980",
  null,
  false,
  _TrainChatMessage_vue_vue_type_template_id_857a6980_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/common/TrainChatMessage.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 93:
/*!************************************************************************************************************************************!*\
  !*** C:/c_writing/工作/面试帮/my-learning/小新前版本/Test/components/common/TrainChatMessage.vue?vue&type=template&id=857a6980&scoped=true& ***!
  \************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_TrainChatMessage_vue_vue_type_template_id_857a6980_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./TrainChatMessage.vue?vue&type=template&id=857a6980&scoped=true& */ 94);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_TrainChatMessage_vue_vue_type_template_id_857a6980_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_TrainChatMessage_vue_vue_type_template_id_857a6980_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_TrainChatMessage_vue_vue_type_template_id_857a6980_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_TrainChatMessage_vue_vue_type_template_id_857a6980_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 94:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/c_writing/工作/面试帮/my-learning/小新前版本/Test/components/common/TrainChatMessage.vue?vue&type=template&id=857a6980&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 95:
/*!******************************************************************************************************************!*\
  !*** C:/c_writing/工作/面试帮/my-learning/小新前版本/Test/components/common/TrainChatMessage.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _c_software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_TrainChatMessage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./TrainChatMessage.vue?vue&type=script&lang=js& */ 96);
/* harmony import */ var _c_software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_TrainChatMessage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_c_software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_TrainChatMessage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _c_software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_TrainChatMessage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _c_software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_TrainChatMessage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_c_software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_TrainChatMessage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 96:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/c_writing/工作/面试帮/my-learning/小新前版本/Test/components/common/TrainChatMessage.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  props: {
    message: {
      type: Object,
      required: true
    },
    isMyMessage: {
      type: Boolean,
      default: false
    },
    isXitong: {
      type: Boolean,
      default: false
    }
  },
  methods: {}
};
exports.default = _default;

/***/ }),

/***/ 97:
/*!**************************************************************************************************************************************************!*\
  !*** C:/c_writing/工作/面试帮/my-learning/小新前版本/Test/components/common/TrainChatMessage.vue?vue&type=style&index=0&id=857a6980&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _c_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_c_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_c_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_TrainChatMessage_vue_vue_type_style_index_0_id_857a6980_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../../c_software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./TrainChatMessage.vue?vue&type=style&index=0&id=857a6980&scoped=true&lang=css& */ 98);
/* harmony import */ var _c_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_c_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_c_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_TrainChatMessage_vue_vue_type_style_index_0_id_857a6980_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_c_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_c_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_c_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_TrainChatMessage_vue_vue_type_style_index_0_id_857a6980_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _c_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_c_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_c_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_TrainChatMessage_vue_vue_type_style_index_0_id_857a6980_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _c_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_c_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_c_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_TrainChatMessage_vue_vue_type_style_index_0_id_857a6980_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_c_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_c_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_c_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_TrainChatMessage_vue_vue_type_style_index_0_id_857a6980_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 98:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/c_writing/工作/面试帮/my-learning/小新前版本/Test/components/common/TrainChatMessage.vue?vue&type=style&index=0&id=857a6980&scoped=true&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[101,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/compete_jiegouhua/compete_jiegouhua.js.map