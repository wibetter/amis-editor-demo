/**
 * @file 编辑器扩展, 增加 外部链接 管理面板
 */
import React from 'react';
import {
  BaseEventContext,
  BasicPanelItem
} from 'amis-editor';
import {Icon} from 'amis';
import {BasePlugin} from 'amis-editor';
import LinkDebugPanel from './linkDebugPanel';

export default class LinkDebugPlugin extends BasePlugin {
  order = -9999;

  buildEditorPanel(context: BaseEventContext, panels: Array<BasicPanelItem>) {
    panels.push({
      key: 'widgetTemplate',
      icon: 'fa fa-cog',
      // tooltip: '外部链接',
      title: (
        <span className="editor-tab-icon" editor-tooltip="外部链接">
          <Icon icon="linkDebug" style={{width: '18px'}} />
        </span>
      ),
      component: LinkDebugPanel,
      position: 'left',
      order: 3
    });
  }
}
