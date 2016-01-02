/******/!function(t){function e(i){if(n[i])return n[i].exports;var a=n[i]={exports:{},id:i,loaded:!1};return t[i].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}// webpackBootstrap
/******/
var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(1),r=i(a),o=n(3),u=i(o),s=n(6),l=i(s),c=n(12),f=i(c),p=n(13),d=i(p),m=n(14),h=i(m),v=n(24),g=i(v),x=n(25),b=i(x),y=angular.module("naGaussianEliminationApp",["ui.router","katex",r["default"].name,u["default"].name,l["default"].name,h["default"].name]).config(f["default"]).config(d["default"]).controller("SolutionController",g["default"]).controller("StepsController",b["default"]);e["default"]=y,t.exports=e["default"]},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(2),r=i(a),o=angular.module("naGaussianEliminationApp.matrixUtil",[]).constant("MatrixUtil",r["default"]);e["default"]=o,t.exports=e["default"]},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=function(){function t(e){n(this,t),this.matrix=e}return i(t,[{key:"toLatex",value:function(e){return t.toLatex(this.matrix,e)}},{key:"transpose",value:function(){return this.matrix=t.transpose(this.matrix),this}},{key:"splitColumns",value:function(e){return t.splitColumns(this.matrix,e)}},{key:"sliceColumns",value:function(e,n){return this.matrix=t.sliceColumns(this.matrix,e,n),this}}],[{key:"toLatex",value:function(e,n){return n?t._toAugmentedLatex(e,n):t._toSingleLatex(e)}},{key:"_toSingleLatex",value:function(e){var n="\\begin{pmatrix}",i="\\end{pmatrix}",a=t._getLatexContent(e);return n+" "+a+" "+i}},{key:"_toAugmentedLatex",value:function(e,n){var i="\\left( \\begin{array}{}",a="\\end{array} \\right)",r="\\end{array} \\right| \\left. \\begin{array}{}",o=t._getLatexContent(e),u=t._getLatexContent(n);return i+" "+o+" "+r+" "+u+" "+a}},{key:"transpose",value:function(t){var e=t[0].map(function(){return[]});return t.forEach(function(t){t.forEach(function(t,n){e[n].push(t)})}),e}},{key:"_getLatexContent",value:function(t){return t.map(function(t){return t.join(" & ")}).join(" \\\\ ")}},{key:"splitColumns",value:function(e,n){var i=[t.sliceColumns(e,0,n),t.sliceColumns(e,n)];return i}},{key:"sliceColumns",value:function(t,e,n){var i=[];return t.forEach(function(t){var a=t.slice(e,n);i.push(a)}),i}}]),t}();e["default"]=a,t.exports=e["default"]},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(4),r=i(a),o=n(5),u=i(o),s=angular.module("naGaussianEliminationApp.gaussianElimination",[r["default"].name]).factory("gaussianElimination",u["default"]);e["default"]=s,t.exports=e["default"]},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),GaussianElimination.setEventEmitter(EventEmitter2),e["default"]=angular.module("naGaussianElimination",[]).constant("GaussianElimination",GaussianElimination),t.exports=e["default"]},function(t,e){"use strict";function n(t,e){"ngInject";var n=new t;return n.on("error",function(t){e.error(t)}),n}Object.defineProperty(e,"__esModule",{value:!0}),n.$inject=["GaussianElimination","$log"],e["default"]=n,t.exports=e["default"]},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(7),r=i(a),o=n(8),u=i(o),s=n(11),l=i(s),c=angular.module("naGaussianEliminationApp.numbers",[r["default"].name,u["default"].name]).service("numbers",l["default"]);e["default"]=c,t.exports=e["default"]},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=angular.module("bigRational",[]).constant("bigRational",bigRat);var n=Object.getPrototypeOf(bigRat.one);n.cmp=n.compare,n.div=n.divide,n.neg=n.negate,n.sub=n.subtract,n._toString=n.toString,n.toString=function(){var t=this._toString.apply(this,arguments);return t.replace(/\/1$/,"")},t.exports=e["default"]},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(9),r=i(a),o=n(10),u=i(o),s=angular.module("naGaussianEliminationApp.fixedBigNumber",[r["default"].name]).factory("createFixedBigNumberClass",u["default"]);e["default"]=s,t.exports=e["default"]},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=angular.module("bigNumber",[]).constant("BigNumber",BigNumber),t.exports=e["default"]},function(t,e){"use strict";function n(t){"ngInject";return function(e,n){var i=t.another({DECIMAL_PLACES:e,ROUNDING_MODE:n,POW_PRECISION:e}),a=i.prototype,r=["dividedBy","div","dividedToIntegerBy","divToInt","minus","sub","plus","add","squareRoot","sqrt","times","mul","toPower","pow"];return r.forEach(function(t){var n="_"+t;a[n]=a[t],a[t]=function(t){var i=this[n](t);return i.toDigits(e)}}),i}}Object.defineProperty(e,"__esModule",{value:!0}),n.$inject=["BigNumber"],e["default"]=n,t.exports=e["default"]},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=function(){function t(e,i){"ngInject";n(this,t),this._bigRational=e,this._createFixedBigNumberClass=i,this.parse=this.parseFraction.bind(this)}return t.$inject=["bigRational","createFixedBigNumberClass"],i(t,[{key:"changeType",value:function(t,e,n){if("fraction"===t)this.parse=this.parseFraction.bind(this);else{if("decimal"!==t)throw new Error("Unknown type");this.parse=this.createDecimalParser(e,n)}}},{key:"parseFraction",value:function(t){return this._bigRational(t)}},{key:"createDecimalParser",value:function(t,e){var n=this._createFixedBigNumberClass(t,e);return function(t){var e=this.parseFraction(t),i=e.numerator.toString(),a=e.denominator.toString(),r=new n(i).div(a);return r}.bind(this)}}]),t}();e["default"]=a,t.exports=e["default"]},function(t,e){"use strict";function n(t,e){"ngInject";t.debugEnabled(!0),e.defaultOptions.displayMode=!0}Object.defineProperty(e,"__esModule",{value:!0}),n.$inject=["$logProvider","katexConfigProvider"],e["default"]=n,t.exports=e["default"]},function(t,e){"use strict";function n(t,e){"ngInject";t.state("gaussianElimination",{url:"/",views:{input:{templateUrl:"app/input/input.html",controller:"InputController",controllerAs:"inputCtrl"},solution:{templateUrl:"app/solution/solution.html",controller:"SolutionController",controllerAs:"solutionCtrl"},steps:{templateUrl:"app/steps/steps.html",controller:"StepsController",controllerAs:"stepsCtrl"}}}),e.otherwise("/")}Object.defineProperty(e,"__esModule",{value:!0}),n.$inject=["$stateProvider","$urlRouterProvider"],e["default"]=n,t.exports=e["default"]},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(15),r=i(a),o=n(1),u=i(o),s=n(3),l=i(s),c=n(6),f=i(c),p=n(22),d=i(p),m=n(23),h=i(m),v=angular.module("naGaussianEliminationApp.input",["ui.validate","puElasticInput",r["default"].name,u["default"].name,l["default"].name,f["default"].name]).controller("InputController",d["default"]).service("inputData",h["default"]);e["default"]=v,t.exports=e["default"]},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(16),r=i(a),o=n(18),u=i(o),s=angular.module("matrixInputComponent",["monospaced.elastic",u["default"].name]).directive("matrixInput",r["default"]);e["default"]=s,t.exports=e["default"]},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function a(){"ngInject";var t={restrict:"E",template:u,scope:{ctrl:"=",showCells:"=cells",tableMatrix:"=initialMatrix",defaultMatrixSize:"=",inputNamePrefix:"@",valueParser:"="},controller:o["default"],controllerAs:"vm",bindToController:!0};return t}Object.defineProperty(e,"__esModule",{value:!0});var r=n(17),o=i(r),u='\n<matrix-table bind="vm.tableMatrix"\n              ng-if="vm.showCells"\n              input-name-prefix="{{vm.inputNamePrefix}}"\n              value-parser="vm.valueParser"\n              class="form-group form-inline"\n              ></matrix-table>\n<div ng-if="!vm.showCells" class="form-group form-inline matrix-table">\n  <textarea ng-model="vm.matrixText" msd-elastic class="form-control"></textarea>\n</div>\n<div class="form-group form-inline">\n  <div class="btn-group">\n    <button type="button"\n            ng-click="vm.toggleCells()"\n            name="{{vm.inputNamePrefix}}ToggleCellsButton"\n            class="btn btn-default btn-sm"\n            ng-class="{active: vm.showCells}"\n            >cells</button>\n    <button type="button" name="{{vm.inputNamePrefix}}ClearButton"\n        ng-click="vm.clear()" class="btn btn-default btn-sm">clear</button>\n    <button type="button" name="{{vm.inputNamePrefix}}IncreaseButton"\n        ng-click="vm.increaseMatrix()" class="btn btn-default btn-sm">+</button>\n    <button type="button" name="{{vm.inputNamePrefix}}DecreaseButton"\n        ng-click="vm.decreaseMatrix()" class="btn btn-default btn-sm">-</button>\n  </div>\n</div>\n';e["default"]=a,t.exports=e["default"]},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=3,r=function(){function t(e){"ngInject";n(this,t),this.$element=e,this.ctrl=this,this.activate()}return t.$inject=["$element"],i(t,[{key:"activate",value:function(){angular.isUndefined(this.showCells)&&(this.showCells=!0),this.tableMatrix||(this.tableMatrix=this.initializeEmptyMatrix()),this.matrixText=null,this.valueParser||(this.valueParser=function(t){return+t}),this.showCells?this.activateCellsMode():this.changeToTextareaMode()}},{key:"initializeEmptyMatrix",value:function(){for(var t=this.defaultMatrixSize,e=t?t[0]||t:a,n=t?t[1]||t:a,i=[],r=0;e>r;r++){for(var o=[],u=0;n>u;u++)o.push({value:""});i.push(o)}return i}},{key:"toggleCells",value:function(){this.showCells?this.changeToTextareaMode():this.changeToCellsMode()}},{key:"activateCellsMode",value:function(){this.clear=this.clearCells,this.increaseMatrix=this.increaseCells,this.decreaseMatrix=this.decreaseCells,this.getMatrix=this.getMatrixFromCells}},{key:"activateTextareaMode",value:function(){this.clear=this.clearTextarea,this.increaseMatrix=angular.noop,this.decreaseMatrix=angular.noop,this.getMatrix=this.getMatrixFromTextarea}},{key:"changeToCellsMode",value:function(){this.showCells=!0,this.tableMatrix=this.transformFromTextareaToCells(),this.matrixText=null,this.activateCellsMode()}},{key:"changeToTextareaMode",value:function(){this.showCells=!1,this.matrixText=this.transformFromCellsToTextarea(),this.tableMatrix=null,this.activateTextareaMode()}},{key:"transformFromTextareaToCells",value:function(){return""===this.matrixText?this.initializeEmptyMatrix():this.matrixText.split("\n").map(function(t){return t.split(/\s*,\s*|\s+/).map(function(t){return{value:t}})})}},{key:"transformFromCellsToTextarea",value:function(){return this.tableMatrix.map(function(t){return t.map(function(t){return t.value}).join(", ")}).join("\n")}},{key:"clearCells",value:function(){this.tableMatrix=this.initializeEmptyMatrix()}},{key:"clearTextarea",value:function(){this.matrixText=""}},{key:"_getMatrixTableCtrl",value:function(){return this.$element.find("matrix-table").controller("matrixTable")}},{key:"increaseCells",value:function(){var t=this._getMatrixTableCtrl();t.addRow(),t.addColumn()}},{key:"decreaseCells",value:function(){var t=this._getMatrixTableCtrl();t.popRow(),t.popColumn()}},{key:"getMatrixFromCells",value:function(){return this.toPlainMatrix(this.tableMatrix)}},{key:"getMatrixFromTextarea",value:function(){var t=this.transformFromTextareaToCells();return this.toPlainMatrix(t)}},{key:"toPlainMatrix",value:function(t){var e=this;return t.map(function(t){return t.map(function(t){return e.valueParser(t.value)})})}}]),t}();e["default"]=r,t.exports=e["default"]},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(19),r=i(a),o=angular.module("matrixTableComponent",["puElasticInput"]).directive("matrixTable",r["default"]);e["default"]=o,t.exports=e["default"]},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function a(){"ngInject";var t={restrict:"E",template:u,scope:{matrix:"=bind",inputNamePrefix:"@",valueParser:"="},controller:o["default"],controllerAs:"vm",bindToController:!0};return t}Object.defineProperty(e,"__esModule",{value:!0});var r=n(20),o=i(r),u='\n<table class="matrix-table">\n  <tr ng-repeat="row in vm.matrix" ng-init="rowScope = this">\n    <td ng-repeat="cell in row">\n      <input ng-model="cell.value"\n             name="{{vm.inputNamePrefix + \'_\' + rowScope.$index + \',\' + $index}}"\n             ng-keydown="vm.keyListener($event, this)"\n             class="form-control input-sm"\n             ui-validate="{invalidMatrixValue: \'vm.isValueValid($value)\'}"\n             pu-elastic-input>\n    </td>\n  </tr>\n</table>\n';e["default"]=a,t.exports=e["default"]},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),o=n(21),u=i(o),s=function(){function t(e,n){"ngInject";a(this,t),this.$element=e,this.$timeout=n,this.valueParser=this.valueParser||t.defaultValueParser,this.inputNamePrefix=this.inputNamePrefix||"matrix-table"}return r(t,null,[{key:"defaultValueParser",value:function(t){return t}}]),t.$inject=["$element","$timeout"],r(t,[{key:"keyListener",value:function(e,n){var i=this,a=e.target,r=!1;if(!(e.ctrlKey||e.shiftKey||e.altKey||e.metaKey)){switch(e.keyCode){case u["default"].BACKSPACE:case u["default"].LEFT:t._hasCaretAtStart(a)&&(this._focusRelativeInput(n,0,-1),r=!0);break;case u["default"].UP:this._focusRelativeInput(n,-1,0),r=!0;break;case u["default"].SPACE:case u["default"].RIGHT:t._hasCaretAtEnd(a)&&(this._isLastColumn(n)?(this.addColumn(),this.$timeout(function(){i._focusRelativeInput(n,0,1)})):this._focusRelativeInput(n,0,1),r=!0);break;case u["default"].DOWN:this._isLastRow(n)?(this.addRow(),this.$timeout(function(){i._focusRelativeInput(n,1,0)})):this._focusRelativeInput(n,1,0),r=!0;break;case u["default"].ENTER:this._isLastRow(n)?(this.addRow(),this.$timeout(function(){i._focusNextRowFirstInput(n)})):this._focusNextRowFirstInput(n),r=!0}r&&e.preventDefault()}}},{key:"addColumn",value:function(){this.matrix.forEach(function(t){t.push({value:""})})}},{key:"addRow",value:function(){for(var t=this.matrix.length>0?this.matrix[0].length:0,e=[],n=0;t>n;n++)e.push({value:""});this.matrix.push(e)}},{key:"popColumn",value:function(){this.matrix.forEach(function(t){t.pop()})}},{key:"popRow",value:function(){this.matrix.pop()}},{key:"isValueValid",value:function(t){try{return this.valueParser(t),!0}catch(e){return!1}}},{key:"_focusRelativeInput",value:function(t,e,n){var i=t.rowScope.$index+e,a=t.$index+n,r=this.$element.find("tr").eq(i),o=r.find("input").eq(a);o[0].focus()}},{key:"_focusNextRowFirstInput",value:function(t){var e=t.rowScope.$index+1,n=this.$element.find("tr").eq(e),i=n.find("input").eq(0);i[0].focus()}},{key:"_isLastColumn",value:function(t){var e=t.$index,n=this.matrix[0];return e===n.length-1}},{key:"_isLastRow",value:function(t){var e=t.rowScope.$index;return e===this.matrix.length-1}}],[{key:"_hasCaretAtStart",value:function(t){var e=t.selectionStart;return e===t.selectionEnd&&0===e}},{key:"_hasCaretAtEnd",value:function(t){var e=t.selectionStart;return e===t.selectionEnd&&e===t.value.length}}]),t}();e["default"]=s,t.exports=e["default"]},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={BACKSPACE:8,ENTER:13,ESCAPE:27,SPACE:32,LEFT:37,UP:38,RIGHT:39,DOWN:40};e["default"]=n,t.exports=e["default"]},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=function(){function t(e,i){"ngInject";n(this,t),this.valueParser=function(t){return e.parse(t)},this.data=i}return t.$inject=["numbers","inputData"],i(t,[{key:"keydownListener",value:function(t){t.ctrlKey&&13===t.keyCode&&this.submit()}},{key:"submit",value:function(){var t=this.matrixCtrl.getMatrix();this.data.solve(t)}}]),t}();e["default"]=a,t.exports=e["default"]},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=function(){function t(e,i,a,r){"ngInject";n(this,t),this._numbers=e,this._MatrixUtil=i,this._gaussianElimination=a,this._BigNumber=r,this.pivotingMethodNames=["none","avoid zero","partial","scaled","complete"],this.roundingModeNames=["up","down","ceil","floor","half up","half down","half even","half ceil","half floor"],this.defaultPrecision=20,this.form={pivoting:"partial",luFlag:!1,numberType:"fraction",precision:null,roundingMode:"half up"}}return t.$inject=["numbers","MatrixUtil","gaussianElimination","BigNumber"],i(t,[{key:"solve",value:function(t){var e=this._MatrixUtil.splitColumns(t,-1),n=e[0],i=this._MatrixUtil.transpose(e[1])[0];this._gaussianElimination.solve(n,i)}},{key:"numberTypeChanged",value:function(){var t=this._getRoundingMode(),e=this.form.precision||this.defaultPrecision;this._numbers.changeType(this.form.numberType,e,t)}},{key:"pivotingChanged",value:function(){this._gaussianElimination.setPivoting(this.form.pivoting)}},{key:"luFlagChanged",value:function(){this._gaussianElimination.setLuFlag(this.form.luFlag)}},{key:"_getRoundingMode",value:function(){var t=this.form.roundingMode,e="ROUND_"+t.toUpperCase().replace(" ","_");return this._BigNumber[e]}}]),t}();e["default"]=a,t.exports=e["default"]},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=function(){function t(e,i){"ngInject";n(this,t),this._MatrixUtil=i,this.clear(),e.on("solveStart",this.clear.bind(this)),e.on("solveEnd",this.setSolution.bind(this)),e.on("error",this.setError.bind(this))}return t.$inject=["gaussianElimination","MatrixUtil"],i(t,[{key:"clear",value:function(){this.latexSolution="",this.infiniteSolutions=!1,this.solutionError=null}},{key:"setSolution",value:function(t){var e=new this._MatrixUtil([t.solution]).transpose().toLatex();this.latexSolution="x = "+e,this.infiniteSolutions=t.infiniteSolutions}},{key:"setError",value:function(t){this.solutionError=t}}]),t}();e["default"]=a,t.exports=e["default"]},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=function(){function t(e,i){"ngInject";n(this,t),this._MatrixUtil=i,this._clear(),e.on("solveStart",this._solveStartListener.bind(this)),e.on("eliminationReduceRowEnd",this._eliminationStepListener.bind(this)),e.on("swapRows",this._swapRowsListener.bind(this)),e.on("swapColumns",this._swapColumnsListener.bind(this)),e.on("substitutionOperationEnd",this._substitutionStepListener.bind(this)),e.on("substitutionEnd",this._clearAuxProperties.bind(this)),e.on("error",this._clearAuxProperties.bind(this))}return t.$inject=["gaussianElimination","MatrixUtil"],i(t,[{key:"_clear",value:function(){this.steps=[],this._clearAuxProperties()}},{key:"_clearAuxProperties",value:function(){this.system=null,this.transformationVector=null,this.swappedColumns=!1}},{key:"_solveStartListener",value:function(t){this._clear(),this.system=t;var e=this._getAugmentedMatrixLatex(this.system);this.steps.push({type:"matrix",matrixLatex:e})}},{key:"_eliminationStepListener",value:function(t){var e=t.i+1,n=t.k+1,i=t.m.toString(),a="m_{"+e+","+n+"} = \\frac{a_{"+e+","+n+"}}{a_{"+n+","+n+"}} = "+i,r=this._getAugmentedMatrixLatex(this.system);this.steps.push({type:"elimination",mCoefficientEquation:a,matrixLatex:r})}},{key:"_substitutionStepListener",value:function(t){for(var e=t.i+1,n=t.value.toString(),i=this.swappedColumns?"^*":"",a=this.swappedColumns?"x_{"+(this.transformationVector[t.i]+1)+"} = ":"",r=[],o=e;o<this.system.matrix[0].length;o++){var u=o+1;r.push(" - a_{"+e+","+u+"} \\cdot x_{"+u+"}"+i)}var s=r.join(""),l=a+"x_{"+e+"}"+i+" = \\frac{b_{"+e+"}"+s+"}{a_{"+e+","+e+"}} = "+n;this.steps.push({type:"equation",equation:l})}},{key:"_swapRowsListener",value:function(t){var e=this._getAugmentedMatrixLatex(this.system);this.steps.push({type:"swapRows",i:t.i,j:t.j,matrixLatex:e})}},{key:"_swapColumnsListener",value:function(t){var e=this._MatrixUtil.toLatex(this.system.matrix),n=t.transformationVector.map(function(t){return"x_{"+(t+1)+"}"}),i=new this._MatrixUtil([n]).transpose().toLatex();this.swappedColumns=!0,this.transformationVector=t.transformationVector,this.steps.push({type:"swapColumns",i:t.i,j:t.j,matrixLatex:e,solutionLatex:i})}},{key:"_getAugmentedMatrixLatex",value:function(t){var e=this._MatrixUtil.transpose([t.result]),n=this._MatrixUtil.toLatex(t.matrix,e);return n}}]),t}();e["default"]=a,t.exports=e["default"]}]),angular.module("naGaussianEliminationApp").run(["$templateCache",function(t){t.put("app/input/input.html",'<form name="inputForm" ng-submit="inputForm.$valid && inputCtrl.submit()" ng-keydown="inputCtrl.keydownListener($event)" class="input-view"><matrix-input ctrl="::inputCtrl.matrixCtrl" input-name-prefix="matrix" value-parser="::inputCtrl.valueParser" default-matrix-size="[3, 4]" class="augmented-matrix-table"></matrix-input><div class="form-group form-inline"><label>Pivoting method<select name="pivoting" class="form-control input-sm" ng-model="inputCtrl.data.form.pivoting" ng-options="name for name in inputCtrl.data.pivotingMethodNames" ng-change="inputCtrl.data.pivotingChanged()"></select></label></div><div class="form-group form-inline">Number type <label class="radio-inline"><input type="radio" ng-model="inputCtrl.data.form.numberType" value="fraction" name="exactNumberType" ng-change="inputCtrl.data.numberTypeChanged()"> fraction</label> <label class="radio-inline"><input type="radio" ng-model="inputCtrl.data.form.numberType" value="decimal" name="decimalNumberType" ng-change="inputCtrl.data.numberTypeChanged()"> decimal</label></div><div class="form-group form-inline"><label>Precision <input type="number" class="form-control input-sm" placeholder="{{inputCtrl.data.defaultPrecision}}" ng-model="inputCtrl.data.form.precision" name="decimalPrecisionNumber" ng-change="inputCtrl.data.numberTypeChanged()" ng-disabled="inputCtrl.data.form.numberType !== \'decimal\'" min="1" pu-elastic-input=""></label> <label>with rounding mode<select name="roundingMode" class="form-control input-sm" ng-model="inputCtrl.data.form.roundingMode" ng-options="name for name in inputCtrl.data.roundingModeNames" ng-change="inputCtrl.data.numberTypeChanged()" ng-disabled="inputCtrl.data.form.numberType !== \'decimal\'"></select></label></div><div class="form-group form-inline">Fill lower triangle with <label class="radio-inline"><input type="radio" name="luFlagFalse" ng-model="inputCtrl.data.form.luFlag" ng-value="false" ng-change="inputCtrl.data.luFlagChanged()"> zeros</label> <label class="radio-inline"><input type="radio" name="luFlagTrue" ng-model="inputCtrl.data.form.luFlag" ng-value="true" ng-change="inputCtrl.data.luFlagChanged()"> LU values</label></div><button type="submit" class="btn btn-primary">Solve</button> <span ng-show="inputForm.$error.invalidMatrixValue" class="text-danger">Matrix has an invalid value</span></form>'),t.put("app/solution/solution.html",'<span class="solution-view"><div katex-bind="solutionCtrl.latexSolution" class="solution-equation"></div><p ng-if="solutionCtrl.infiniteSolutions" class="text-info">This is one of the infinite solutions for the system</p><p ng-if="solutionCtrl.solutionError" class="text-danger">{{solutionCtrl.solutionError.message || solutionCtrl.solutionError}}</p></span>'),t.put("app/steps/steps.html",'<span class="steps-view"><div ng-repeat="step in stepsCtrl.steps" ng-switch="step.type" class="row"><span ng-switch-when="matrix"><span katex-bind="::step.matrixLatex"></span></span> <span ng-switch-when="elimination"><span katex-bind="::step.matrixLatex"></span> <span katex-bind="::step.mCoefficientEquation"></span></span> <span ng-switch-when="equation"><span katex-bind="::step.equation"></span></span> <span ng-switch-when="swapRows"><span katex-bind="::step.matrixLatex"></span> <span>Swap rows {{::step.i+1}} and {{::step.j+1}}</span></span> <span ng-switch-when="swapColumns"><span katex-bind="::step.matrixLatex"></span> <span katex-bind="::step.solutionLatex"></span> <span>Swap columns {{::step.i+1}} and {{::step.j+1}}</span></span></div></span>')}]);
//# sourceMappingURL=../maps/scripts/app-dee35c3878.js.map