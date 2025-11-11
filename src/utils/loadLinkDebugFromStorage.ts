import {toast} from 'amis';
// 引入工具函数
import {getStorageData} from './localStorage';
import {loadExternalResources} from './loadScript';


interface ExternalLink {
  id: string;
  url: string;
  description?: string;
  createdAt: number;
}

const LINK_DEBUG_STORAGE_KEY = 'amis-editor-designer-external-links';

// 从 localStorage 加载外链脚本
const loadLinkDebugFromStorage = async () => {
  try {
    const savedLinks = getStorageData<ExternalLink[]>(LINK_DEBUG_STORAGE_KEY);
    if (savedLinks && Array.isArray(savedLinks) && savedLinks.length > 0) {
      // 加载所有外部链接脚本
      await loadExternalResources(savedLinks)
      .then(() => {
        console.log('所有外部资源加载完成');
      })
      .catch((error) => {
        console.error('加载外部资源时发生错误:', error);
        toast.error('加载外部资源时发生错误', '提示');
      });
    }
  } catch (error) {
    console.error('加载外部链接数据失败:', error);
    toast.error('加载外部链接数据失败', '提示');
  }
};

export default loadLinkDebugFromStorage;