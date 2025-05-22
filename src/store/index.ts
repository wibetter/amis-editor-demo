import {types, getEnv, applySnapshot, getSnapshot} from 'mobx-state-tree';
import {PageStore} from './Page';
import {when, reaction} from 'mobx';

// @ts-ignore
import pageSchema from '../mock/pageSchema';

let pagIndex = 1;

export const MainStore = types
  .model('MainStore', {
    pages: types.optional(types.array(PageStore), [
      {
        id: `${pagIndex}`,
        path: 'amis-reports',
        label: '大屏报表示例',
        icon: 'fa fa-file',
        schema: pageSchema
      },
      {
        id: `${pagIndex}`,
        path: 'form1',
        label: '表单页-缓存功能',
        icon: 'fa fa-file',
        schema: {
          type: 'page',
          title: '表单页-缓存功能',
          body: [
            {
              type: 'page',
              title: '表单页-缓存功能',
              body: [
                {
                  type: 'tabs',
                  tabs: [
                    {
                      title: '选项卡1',
                      body: [
                        {
                          type: 'form',
                          initApi: '/api/mock/form/initData1',
                          title: '编辑用户信息',
                          persistData: 'myForm1',
                          body: [
                            {
                              type: 'input-text',
                              name: 'name',
                              label: '姓名',
                              id: 'u:28f28d398fcc'
                            },
                            {
                              type: 'input-text',
                              name: 'email',
                              label: '邮箱',
                              id: 'u:c107dbb3d362'
                            }
                          ],
                          id: 'u:7a5230cffb1e',
                          actions: [
                            {
                              type: 'submit',
                              label: '提交',
                              primary: true,
                              id: 'u:d9cf978e4639'
                            }
                          ],
                          feat: 'View',
                          dsType: 'api',
                          labelAlign: 'left'
                        }
                      ],
                      id: 'u:ff1f9b087f1d'
                    },
                    {
                      title: '选项卡2',
                      body: [
                        {
                          type: 'form',
                          initApi: '/api/mock/form/initData2',
                          title: '编辑用户信息',
                          persistData: 'myForm2',
                          body: [
                            {
                              type: 'input-text',
                              name: 'name',
                              label: '姓名',
                              id: 'u:d49f4ac8cff8'
                            },
                            {
                              type: 'input-text',
                              name: 'email',
                              label: '邮箱',
                              id: 'u:f5ccbf2b6a8b'
                            }
                          ],
                          id: 'u:904c7815d8c2',
                          actions: [
                            {
                              type: 'submit',
                              label: '提交',
                              primary: true,
                              id: 'u:b2d9d11d1233'
                            }
                          ],
                          feat: 'View',
                          dsType: 'api',
                          labelAlign: 'left'
                        }
                      ],
                      id: 'u:3bf36c808255'
                    }
                  ],
                  mountOnEnter: true,
                  id: 'u:1e44084bd635'
                }
              ],
              id: 'u:6638769f899a',
              asideResizor: false,
              pullRefresh: {
                disabled: true
              }
            }
          ]
        }
      }
    ]),
    theme: 'cxd',
    asideFixed: true,
    asideFolded: false,
    offScreen: false,
    addPageIsOpen: false,
    preview: false,
    isMobile: false,
    schema: types.frozen()
  })
  .views(self => ({
    get fetcher() {
      return getEnv(self).fetcher;
    },
    get notify() {
      return getEnv(self).notify;
    },
    get alert() {
      return getEnv(self).alert;
    },
    get copy() {
      return getEnv(self).copy;
    }
  }))
  .actions(self => {
    function toggleAsideFolded() {
      self.asideFolded = !self.asideFolded;
    }

    function toggleAsideFixed() {
      self.asideFixed = !self.asideFixed;
    }

    function toggleOffScreen() {
      self.offScreen = !self.offScreen;
    }

    function setAddPageIsOpen(isOpened: boolean) {
      self.addPageIsOpen = isOpened;
    }

    function addPage(data: {
      label: string;
      path: string;
      icon?: string;
      schema?: any;
    }) {
      self.pages.push(
        PageStore.create({
          ...data,
          id: `${++pagIndex}`
        })
      );
    }

    function removePageAt(index: number) {
      self.pages.splice(index, 1);
    }

    function updatePageSchemaAt(index: number) {
      self.pages[index].updateSchema(self.schema);
    }

    function updateSchema(value: any) {
      self.schema = value;
    }

    function setPreview(value: boolean) {
      self.preview = value;
    }

    function setIsMobile(value: boolean) {
      self.isMobile = value;
    }

    return {
      toggleAsideFolded,
      toggleAsideFixed,
      toggleOffScreen,
      setAddPageIsOpen,
      addPage,
      removePageAt,
      updatePageSchemaAt,
      updateSchema,
      setPreview,
      setIsMobile,
      afterCreate() {
        // persist store
        if (typeof window !== 'undefined' && window.localStorage) {
          const storeData = window.localStorage.getItem('store');
          if (storeData) applySnapshot(self, JSON.parse(storeData));

          reaction(
            () => getSnapshot(self),
            json => {
              window.localStorage.setItem('store', JSON.stringify(json));
            }
          );
        }
      }
    };
  });

export type IMainStore = typeof MainStore.Type;
