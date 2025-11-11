/**
 * 动态加载外部脚本工具函数
 */

/**
 * 加载远程 JavaScript 文件
 * @param url 脚本的 URL 地址
 * @returns Promise，成功时 resolve，失败时 reject
 */
export function loadRemoteJsPromise(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // 检查脚本是否已经加载
    const existingScript = document.querySelector(`script[src="${url}"]`);
    if (existingScript) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.async = true;

    script.onload = () => {
      console.log(`外部脚本加载成功: ${url}`);
      resolve();
    };

    script.onerror = (error) => {
      console.error(`外部脚本加载失败: ${url}`, error);
      // document.head.removeChild(script);
      reject(new Error(`Failed to load script: ${url}`));
    };

    document.head.appendChild(script);
  });
}

/**
 * 批量加载外部资源（支持字符串URL或ExternalLink对象）
 * @param resources 资源列表，可以是字符串URL数组或ExternalLink对象数组
 * @returns Promise，所有资源加载完成后 resolve
 */
export async function loadExternalResources(
  resources: (string | {url: string; [key: string]: any})[]
): Promise<void> {
  if (!resources || resources.length === 0) {
    return;
  }

  try {
    // 提取URLs - 处理字符串和ExternalLink对象
    const urls = resources.map((resource) =>
      typeof resource === 'string' ? resource : resource.url
    );

    // 创建所有链接的加载 Promise
    const loadPromises = urls.map((url) =>
      loadRemoteJsPromise(url).catch((error) => {
        console.error(`外部资源加载失败: ${url}`, error);
        // 即使某个资源加载失败，也继续加载其他资源
        return Promise.resolve();
      })
    );

    // 等待所有链接加载完成
    await Promise.all(loadPromises);
    console.log('所有外部资源加载完成');
  } catch (error) {
    console.error('加载外部资源时发生错误:', error);
    throw error;
  }
}

