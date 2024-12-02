!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery","./grid.base","./jquery.fmatter","./grid.common"],i):"object"==typeof module&&module.exports?module.exports=function(e,t){return e||(e=window),void 0===t&&(t="undefined"!=typeof window?require("jquery"):require("jquery")(e)),require("./grid.base"),require("./jquery.fmatter"),require("./grid.common"),i(t),t}:i(jQuery)}(function(T){"use strict";var B=T.jgrid,N=B.fullBoolFeedback,p=B.hasOneFromClasses,t=T.fn.jqGrid,z=function(e){return t.getGuiStyles.call(this,"states."+e)},V=function(e){var t=T.makeArray(arguments).slice(1);return t.unshift(""),t.unshift("Inline"),t.unshift(e),B.feedback.apply(this,t)};B.inlineEdit=B.inlineEdit||{},B.extend({editRow:function(R,e,t,i,a,r,o,n,d,l){var g={},s=T.makeArray(arguments).slice(1);return"object"===T.type(s[0])?g=s[0]:(void 0!==e&&(g.keys=e),T.isFunction(t)&&(g.oneditfunc=t),T.isFunction(i)&&(g.successfunc=i),void 0!==a&&(g.url=a),null!=r&&(g.extraparam=r),T.isFunction(o)&&(g.aftersavefunc=o),T.isFunction(n)&&(g.errorfunc=n),T.isFunction(d)&&(g.afterrestorefunc=d),T.isFunction(l)&&(g.beforeEditRow=l)),this.each(function(){var u=this,o=T(u),f=u.p,m=0,v=null,p={},w={},e=f.colModel,t=f.prmNames;if(u.grid){var n=T.extend(!0,{keys:!1,oneditfunc:null,successfunc:null,url:null,extraparam:{},aftersavefunc:null,errorfunc:null,afterrestorefunc:null,restoreAfterError:!0,beforeEditRow:null,focusField:!0},B.inlineEdit,f.inlineEditing||{},g),d=o.jqGrid("getInd",R,!0),i=n.focusField,a="object"==typeof i&&null!=i?T(i.target||i).closest("tr.jqgrow>td")[0]:null;if(!1!==d&&(n.extraparam[t.oper]===t.addoper||V.call(u,n,"beforeEditRow",n,R))&&"0"===(T(d).attr("editable")||"0")&&!T(d).hasClass("not-editable-row")){var r=B.detectRowEditing.call(u,R);if(null!=r&&"cellEditing"===r.mode){var l=r.savedRow,s=u.rows[l.id],c=z.call(u,"select");o.jqGrid("restoreCell",l.id,l.ic),T(s.cells[l.ic]).removeClass("edit-cell "+c),T(s).addClass(c).attr({"aria-selected":"true",tabindex:"0"})}if(B.enumEditableCells.call(u,d,T(d).hasClass("jqgrid-new-row")?"add":"edit",function(e){var t,i,a,r=e.cm,o=T(e.dataElement),n=e.dataWidth,d=r.name,l=r.edittype,s=e.iCol,c=r.editoptions||{};if(w[d]=e.editable,"hidden"!==e.editable){try{t=T.unformat.call(this,e.td,{rowId:R,colModel:r},s)}catch(e){t="textarea"===l?o.text():o.html()}p[d]=t,o.html(""),i=T.extend({},c,{id:R+"_"+d,name:d,rowId:R,mode:e.mode,cm:r,iCol:s}),("&nbsp;"===t||"&#160;"===t||1===t.length&&160===t.charCodeAt(0))&&(t=""),a=B.createEl.call(u,l,i,t,!0,T.extend({},B.ajaxOptions,f.ajaxSelectOptions||{})),T(a).addClass("editable"),o.append(a),n&&T(a).width(e.dataWidth),B.bindEv.call(u,a,i),"select"===l&&!0===c.multiple&&void 0===c.dataUrl&&B.msie&&T(a).width(T(a).width()),null===v&&(v=s),m++}}),0<m){if(p.id=R,f.savedRow.push(p),f.editingInfo[R]={mode:"inlineEditing",savedRow:p,editable:w},T(d).attr("editable","1"),i&&("number"==typeof i&&parseInt(i,10)<=e.length?v=i:"string"==typeof i?v=f.iColByName[i]:null!=a&&(v=a.cellIndex),setTimeout(function(){var t=o.jqGrid("getNumberOfFrozenColumns"),e=function(e){return f.frozenColumns&&0<t&&v<t?u.grid.fbRows[d.rowIndex].cells[e]:d.cells[e]},i=function(e){return T(e).find("input,textarea,select,button,object,*[tabindex]").filter(":input:visible:not(:disabled)")},a=function(){return i(f.frozenColumns&&0<t?u.grid.fbRows[d.rowIndex]:d).first()},r=i(e(v));0<r.length?r.first().focus():"number"==typeof n.defaultFocusField||"string"==typeof n.defaultFocusField?(0===(r=i(e("number"==typeof n.defaultFocusField?n.defaultFocusField:f.iColByName[n.defaultFocusField]))).length&&(r=a()),r.first().focus()):a().focus()},0)),!0===n.keys){var h=T(d);f.frozenColumns&&(h=h.add(u.grid.fbRows[d.rowIndex])),h.on("keydown",function(e){return 27===e.keyCode?(o.jqGrid("restoreRow",R,n.afterrestorefunc),!1):13===e.keyCode?"TEXTAREA"===e.target.tagName||(o.jqGrid("saveRow",R,n),!1):void 0})}N.call(u,n.oneditfunc,"jqGridInlineEditRow",R,n)}}}})},saveRow:function(o,e,t,i,a,r,n,d){var l,s=T.makeArray(arguments).slice(1),c={},u=this[0],f=T(u),m=null!=u?u.p:null,v=B.info_dialog,p=T.isFunction,w=null!=B.defaults&&p(B.defaults.fatalError)?B.defaults.fatalError:alert;if(u.grid&&null!=m){"object"===T.type(s[0])?c=s[0]:(p(e)&&(c.successfunc=e),void 0!==t&&(c.url=t),void 0!==i&&(c.extraparam=i),p(a)&&(c.aftersavefunc=a),p(r)&&(c.errorfunc=r),p(n)&&(c.afterrestorefunc=n),p(d)&&(c.beforeSaveRow=d));var h=function(e){return f.jqGrid("getGridRes",e)};c=T.extend(!0,{successfunc:null,url:null,extraparam:{},aftersavefunc:null,errorfunc:null,afterrestorefunc:null,restoreAfterError:!0,beforeSaveRow:null,ajaxSaveOptions:{},serializeSaveData:null,mtype:"POST",saveui:"enable",savetext:h("defaults.savetext")||"Saving..."},B.inlineEdit,m.inlineEditing||{},c);var R,g,j,x,q,b,y,I,G={},E={},C={},P=f.jqGrid("getInd",o,!0),S=T(P),D=m.prmNames,k=h("errors.errcap"),F=h("edit.bClose"),A=function(t,e){try{var i=B.getRelativeRect.call(u,e);v.call(u,k,t,F,{top:i.top,left:i.left+T(u).closest(".ui-jqgrid").offset().left})}catch(e){w(t)}};if(!1!==P&&(l=c.extraparam[D.oper]===D.addoper?"add":"edit",V.call(u,c,"beforeSaveRow",c,o,l)&&(R=S.attr("editable"),c.url=c.url||m.editurl,y="clientArray"!==c.url,"1"===R))){if(b=T.jgrid.detectRowEditing.call(u,o),B.enumEditableCells.call(u,P,S.hasClass("jqgrid-new-row")?"add":"edit",function(e){var t=e.cm,i=t.formatter,a=t.editoptions||{},r=t.formatoptions||{},o={},n=B.getEditedValue.call(u,T(e.dataElement),t,o,e.editable);if("select"===t.edittype&&"select"!==t.formatter&&(E[t.name]=o.text),null!=(q=B.checkValues.call(u,n,e.iCol,void 0,void 0,T.extend(e,{oldValue:null!=b?b.savedRow[t.name]:null,newValue:n,oldRowData:null!=b?b.savedRow:null})))&&!1===q[0])return I=!0,A(q[1],e.td),!1;"date"===i&&!0!==r.sendFormatted&&(n=T.unformat.date.call(u,n,t)),y&&!0===a.NullIfEmpty&&""===n&&(n="null"),G[t.name]=n}),I)return;var _;D=m.prmNames,_=!1===m.keyName?D.id:m.keyName,G&&(G[D.oper]=D.editoper,void 0!==G[_]&&""!==G[_]||(G[_]=B.stripPref(m.idPrefix,o)),G=T.extend({},G,m.inlineData||{},c.extraparam));var O={options:c,rowid:o,tr:P,iRow:P.rowIndex,savedRow:b.savedRow,newData:G,mode:l};if(!V.call(u,c,"saveRowValidation",O))return void(O.errorText&&A(O.errorText,P));if(y)f.jqGrid("progressBar",{method:"show",loadtype:c.saveui,htmlcontent:c.savetext}),(C=T.extend({},G,C))[_]=B.stripPref(m.idPrefix,C[_]),m.autoEncodeOnEdit&&T.each(C,function(e,t){p(t)||(C[e]=B.oldEncodePostedData(t))}),P.id===m.idPrefix+C[_]||null==D.idold||C.hasOwnProperty(D.idold)||(C[D.idold]=B.stripPref(m.idPrefix,P.id)),T.ajax(T.extend({url:p(c.url)?c.url.call(u,C[_],l,C,c):c.url,data:B.serializeFeedback.call(u,p(c.serializeSaveData)?c.serializeSaveData:m.serializeRowData,"jqGridInlineSerializeSaveData",C),type:p(c.mtype)?c.mtype.call(u,l,c,C[_],C):c.mtype,complete:function(e,t){var i,a,r;if(f.jqGrid("progressBar",{method:"hide",loadtype:c.saveui}),(e.status<300||304===e.status)&&(0!==e.status||4!==e.readyState))if(null!=(a=f.triggerHandler("jqGridInlineSuccessSaveRow",[e,o,c,l,C]))&&!0!==a||(a=[!0,G]),a[0]&&p(c.successfunc)&&(a=c.successfunc.call(u,e,o,c,l,C)),T.isArray(a)?(i=a[0],G=a[1]||G):i=a,!0===i){for(m.autoEncodeOnEdit&&T.each(G,function(e,t){G[e]=B.oldDecodePostedData(t)}),G=T.extend({},G,E),f.jqGrid("setRowData",o,G),S.attr("editable","0"),r=0;r<m.savedRow.length;r++)if(String(m.savedRow[r].id)===String(o)){j=r;break}0<=j&&(m.savedRow.splice(j,1),delete m.editingInfo[o]),N.call(u,c.aftersavefunc,"jqGridInlineAfterSaveRow",o,e,G,c),null!=a[2]?f.jqGrid("changeRowid",o,m.idPrefix+a[2]):P.id!==m.idPrefix+G[_]&&f.jqGrid("changeRowid",P.id,m.idPrefix+G[_]),S.removeClass("jqgrid-new-row").off("keydown")}else N.call(u,c.errorfunc,"jqGridInlineErrorSaveRow",o,e,t,null,c),!0===c.restoreAfterError&&f.jqGrid("restoreRow",o,c.afterrestorefunc)},error:function(e,t,i){if(f.triggerHandler("jqGridInlineErrorSaveRow",[o,e,t,i,c]),p(c.errorfunc))c.errorfunc.call(u,o,e,t,i);else{var a=e.responseText||e.statusText;try{v.call(u,k,'<div class="'+z.call(u,"error")+'">'+a+"</div>",F,{buttonalign:"right"})}catch(e){w(a)}}!0===c.restoreAfterError&&f.jqGrid("restoreRow",o,c.afterrestorefunc)}},B.ajaxOptions,m.ajaxRowOptions,c.ajaxSaveOptions||{}));else{for(G=T.extend({},G,E),x=f.jqGrid("setRowData",o,G),S.attr("editable","0"),g=0;g<m.savedRow.length;g++)if(String(m.savedRow[g].id)===String(o)){j=g;break}0<=j&&(m.savedRow.splice(j,1),delete m.editingInfo[o]),N.call(u,c.aftersavefunc,"jqGridInlineAfterSaveRow",o,x,G,c),S.removeClass("jqgrid-new-row").off("keydown"),P.id!==m.idPrefix+G[_]&&f.jqGrid("changeRowid",P.id,m.idPrefix+G[_])}}}},restoreRow:function(l,e){var t=T.makeArray(arguments).slice(1),s={};return"object"===T.type(t[0])?s=t[0]:T.isFunction(e)&&(s.afterrestorefunc=e),this.each(function(){var e,t=this,i=T(t),a=t.p,r=-1,o={};if(t.grid){var n=T.extend(!0,{},B.inlineEdit,a.inlineEditing||{},s),d=i.jqGrid("getInd",l,!0);if(!1!==d&&V.call(t,n,"beforeCancelRow",n,l)){for(e=0;e<a.savedRow.length;e++)if(String(a.savedRow[e].id)===String(l)){r=e;break}if(0<=r){if(T.isFunction(T.fn.datepicker))try{T("input.hasDatepicker","#"+B.jqID(d.id)).datepicker("hide")}catch(e){}T.each(a.colModel,function(){var e=this.name;a.savedRow[r].hasOwnProperty(e)&&(o[e]=a.savedRow[r][e],!this.formatter||"date"!==this.formatter||null!=this.formatoptions&&!0===this.formatoptions.sendFormatted||(o[e]=T.unformat.date.call(t,o[e],this)))}),i.jqGrid("setRowData",l,o),T(d).attr("editable","0").off("keydown"),a.savedRow.splice(r,1),delete a.editingInfo[l],T("#"+B.jqID(l),t).hasClass("jqgrid-new-row")&&setTimeout(function(){i.jqGrid("delRowData",l),i.jqGrid("showAddEditButtons",!1)},0)}N.call(t,n.afterrestorefunc,"jqGridInlineAfterRestoreRow",l)}}})},addRow:function(n){return this.each(function(){if(this.grid){var t=this,e=T(t),i=t.p,a=T.extend(!0,{rowID:null,initdata:{},position:"first",useDefValues:!0,useFormatter:!1,beforeAddRow:null,addRowParams:{extraparam:{}}},B.inlineEdit,i.inlineEditing||{},n||{});if(V.call(t,a,"beforeAddRow",a.addRowParams))if(a.rowID=T.isFunction(a.rowID)?a.rowID.call(t,a):null!=a.rowID?a.rowID:B.randId(),!0===a.useDefValues&&T(i.colModel).each(function(){if(this.editoptions&&this.editoptions.defaultValue){var e=this.editoptions.defaultValue;a.initdata[this.name]=T.isFunction(e)?e.call(t,a):e}}),a.rowID=i.idPrefix+a.rowID,e.jqGrid("addRowData",a.rowID,a.initdata,a.position,a.srcRowid),T("#"+B.jqID(a.rowID),t).addClass("jqgrid-new-row"),a.useFormatter)T("#"+B.jqID(a.rowID)+" .ui-inline-edit",t).click();else{var r=i.prmNames,o=r.oper;a.addRowParams.extraparam[o]=r.addoper,e.jqGrid("editRow",a.rowID,a.addRowParams),e.jqGrid("setSelection",a.rowID)}}})},inlineNav:function(m,v){return"object"==typeof m&&(v=m,m=void 0),this.each(function(){var r=this,o=T(r),n=r.p;if(this.grid&&null!=n){var e,t=m===n.toppager?n.idSel+"_top":n.idSel,i=m===n.toppager?n.id+"_top":n.id,d=z.call(r,"disabled"),l=T.extend(!0,{edit:!0,editicon:"ui-icon-pencil",add:!0,addicon:"ui-icon-plus",save:!0,saveicon:"ui-icon-disk",cancel:!0,cancelicon:"ui-icon-cancel",commonIconClass:"ui-icon",iconsOverText:!1,addParams:{addRowParams:{extraparam:{}}},editParams:{},restoreAfterSelect:!0},o.jqGrid("getGridRes","nav"),B.nav||{},n.navOptions||{},B.inlineNav||{},n.inlineNavOptions||{},v||{}),s=function(){r.modalAlert()};if(void 0===m)if(n.pager){if(o.jqGrid("inlineNav",n.pager,l),!n.toppager)return;m=n.toppager,t=n.idSel+"_top",i=n.id+"_top"}else n.toppager&&(m=n.toppager,t=n.idSel+"_top",i=n.id+"_top");if(void 0!==m&&!((e=T(m)).length<=0)){if(e.find(".navtable").length<=0&&o.jqGrid("navGrid",m,{add:!1,edit:!1,del:!1,search:!1,refresh:!1,view:!1}),(n._inlinenav=!0)===l.addParams.useFormatter){var a,c,u,f=n.colModel;for(a=0;a<f.length;a++)if(f[a].formatter&&"actions"===f[a].formatter){f[a].formatoptions&&(c={keys:!1,onEdit:null,onSuccess:null,afterSave:null,onError:null,afterRestore:null,extraparam:{},url:null},u=T.extend(c,f[a].formatoptions),l.addParams.addRowParams={keys:u.keys,oneditfunc:u.onEdit,successfunc:u.onSuccess,url:u.url,extraparam:u.extraparam,aftersavefunc:u.afterSave,errorfunc:u.onError,afterrestorefunc:u.afterRestore});break}}l.add&&o.jqGrid("navButtonAdd",m,{caption:l.addtext,title:l.addtitle,commonIconClass:l.commonIconClass,buttonicon:l.addicon,iconsOverText:l.iconsOverText,id:i+"_iladd",onClickButton:function(){p(this,d)||o.jqGrid("addRow",l.addParams)}}),l.edit&&o.jqGrid("navButtonAdd",m,{caption:l.edittext,title:l.edittitle,commonIconClass:l.commonIconClass,buttonicon:l.editicon,iconsOverText:l.iconsOverText,id:i+"_iledit",onClickButton:function(){if(!p(this,d)){var e=n.selrow;e?o.jqGrid("editRow",e,l.editParams):s()}}}),l.save&&(o.jqGrid("navButtonAdd",m,{caption:l.savetext,title:l.savetitle,commonIconClass:l.commonIconClass,buttonicon:l.saveicon,iconsOverText:l.iconsOverText,id:i+"_ilsave",onClickButton:function(){if(!p(this,d)&&0<n.savedRow.length){var e=n.savedRow[0].id;if(e){var t=n.prmNames,i=t.oper,a=l.editParams;T("#"+B.jqID(e),r).hasClass("jqgrid-new-row")?(l.addParams.addRowParams.extraparam[i]=t.addoper,a=l.addParams.addRowParams):(l.editParams.extraparam||(l.editParams.extraparam={}),l.editParams.extraparam[i]=t.editoper),o.jqGrid("saveRow",e,a)}else s()}}}),T(t+"_ilsave").addClass(d)),l.cancel&&(o.jqGrid("navButtonAdd",m,{caption:l.canceltext,title:l.canceltitle,commonIconClass:l.commonIconClass,buttonicon:l.cancelicon,iconsOverText:l.iconsOverText,id:i+"_ilcancel",onClickButton:function(){if(!p(this,d)&&0<n.savedRow.length){var e=n.savedRow[0].id,t=l.editParams;e?(T("#"+B.jqID(e),r).hasClass("jqgrid-new-row")&&(t=l.addParams.addRowParams),o.jqGrid("restoreRow",e,t)):s()}}}),T(t+"_ilcancel").addClass(d)),!0===l.restoreAfterSelect&&o.on("jqGridSelectRow",function(e,t){if(0<n.savedRow.length&&!0===n._inlinenav){var i=n.savedRow[0].id;t!==i&&"number"!=typeof i&&o.jqGrid("restoreRow",i,l.editParams)}}),o.on("jqGridInlineAfterRestoreRow jqGridInlineAfterSaveRow",function(){o.jqGrid("showAddEditButtons",!1)}),o.on("jqGridInlineEditRow",function(e,t){o.jqGrid("showAddEditButtons",!0,t)})}}})},showAddEditButtons:function(o){return this.each(function(){if(this.grid){var e=this.p,t=e.idSel,i=z.call(this,"disabled"),a=t+"_ilsave,"+t+"_ilcancel"+(e.toppager?","+t+"_top_ilsave,"+t+"_top_ilcancel":""),r=t+"_iladd,"+t+"_iledit"+(e.toppager?","+t+"_top_iladd,"+t+"_top_iledit":"");T(o?r:a).addClass(i),T(o?a:r).removeClass(i)}})}})});
//# sourceMappingURL=grid.inlinedit.js.map