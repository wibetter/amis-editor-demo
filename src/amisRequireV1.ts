import { isPlainObject } from 'lodash'

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
    __amisCommonDepModules?: ICommonDepModules
    amisRequire: (moduleName: string) => any
  }
}

/**
 * Amis 共享出来的依赖模块
 * 备注：可在其他模块中通过 amisRequire 中使用，目前主要在自定义组件中使用
 */
const __amisCommonDepModules = {
  react: require('react'),
  'react-dom': require('react-dom'),
  mobx: require('mobx'),
  'mobx-react': require('mobx-react'),
  'mobx-state-tree': require('mobx-state-tree'),
  echarts: require('echarts'),
  axios: require('axios'),
  classnames: require('classnames'),
  qs: require('qs'),
  lodash: require('lodash'),
  amis: require('amis'),
  'amis-ui': require('amis-ui'),
  'amis-core': require('amis-core'),
  'amis-formula': require('amis-formula'),
  'amis-editor': require('amis-editor'),
  'amis-editor-core': require('amis-editor-core'),
}

/**
 * 用于添加共享的依赖模块
 * @param modules 要添加的模块对象
 */
const addAmisCommonModules = (modules: ICommonDepModules): void => {
  if (!window.__amisCommonDepModules) {
    window.__amisCommonDepModules = {}
  }
  if (isPlainObject(modules)) {
    const moduleIds = Object.keys(modules)

    if (moduleIds.length > 0) {
      window.__amisCommonDepModules = Object.assign(window.__amisCommonDepModules, modules)
    }
  }
}

// 初始化共享模块
addAmisCommonModules(__amisCommonDepModules)

/**
 * 用于加载 Amis 共享出来的依赖模块
 * @param moduleName 模块名称
 * @returns 模块对象或 undefined
 */
const amisRequire = (moduleName: string): any => {
  const defaultModule = { __esModule: true } // 默认模块
  if (!window.__amisCommonDepModules) {
    window.__amisCommonDepModules = {}
  }
  if (window.__amisCommonDepModules[moduleName]) {
    return window.__amisCommonDepModules[moduleName]
  }
  return defaultModule;
}

// 将 amisRequire 挂载到全局 window 对象
window.amisRequire = amisRequire

export { addAmisCommonModules }
