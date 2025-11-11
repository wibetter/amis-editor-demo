import { isPlainObject } from 'lodash';
// 导入需要共享的依赖模块，使用 es module 方式导入
import * as reactModule from 'react';
import * as reactDomModule from 'react-dom';
import * as mobxModule from 'mobx';
import * as mobxReactModule from 'mobx-react';
import * as mobxStateTreeModule from 'mobx-state-tree';
import * as amisModule from 'amis';
import * as amisUiModule from 'amis-ui';
import * as amisCoreModule from 'amis-core';
import * as amisFormulaModule from 'amis-formula';
import * as amisEditorModule from 'amis-editor';
import * as amisEditorCoreModule from 'amis-editor-core';
import * as classnamesModule from 'classnames';
import * as axiosModule from 'axios';
import * as qsModule from 'qs';
import * as lodashModule from 'lodash';
import * as echartsModule from 'echarts';
/**
 * 共享模块类型定义
 */
interface ICommonDepModules {
  [depName: string]: any
}

/**
 * 全局 window 对象扩展
 */
declare global {
  interface Window {
    __AmisCommonModules?: ICommonDepModules
    amisRequire: (moduleName: string) => any
  }
}

/**
 * Amis 共享出来的依赖模块
 * 备注：可在其他模块中通过 amisRequire 中使用，目前主要在自定义组件中使用
 */
const __AmisCommonModules = {
  react: reactModule,
  'react-dom': reactDomModule,
  mobx: mobxModule,
  'mobx-react': mobxReactModule,
  'mobx-state-tree': mobxStateTreeModule,
  amis: amisModule,
  'amis-core': amisCoreModule,
  'amis-ui': amisUiModule,
  'amis-formula': amisFormulaModule,
  'amis-editor': amisEditorModule,
  'amis-editor-core': amisEditorCoreModule,
  classnames: classnamesModule,
  axios: axiosModule,
  qs: qsModule,
  lodash: lodashModule,
  echarts: echartsModule,
}

/**
 * 用于添加共享的依赖模块
 * @param modules 要添加的模块对象
 */
const addAmisCommonModules = (modules: ICommonDepModules): void => {
  if (!window.__AmisCommonModules) {
    window.__AmisCommonModules = {}
  }
  if (isPlainObject(modules)) {
    const moduleIds = Object.keys(modules)

    if (moduleIds.length > 0) {
      window.__AmisCommonModules = Object.assign(window.__AmisCommonModules, modules)
    }
  }
}

// 初始化共享模块
addAmisCommonModules(__AmisCommonModules)

/**
 * 用于加载 Amis 共享出来的依赖模块
 * @param moduleName 模块名称
 * @returns 模块对象或 undefined
 */
const amisRequire = (moduleName: string): any => {
  const defaultModule = { __esModule: true } // 默认模块
  if (!window.__AmisCommonModules) {
    window.__AmisCommonModules = {}
  }
  if (window.__AmisCommonModules[moduleName]) {
    return window.__AmisCommonModules[moduleName]
  }
  return defaultModule;
}

// 将 amisRequire 挂载到全局 window 对象
window.amisRequire = amisRequire

export { addAmisCommonModules }
