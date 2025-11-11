/**
 * LocalStorage 管理工具
 * 支持缓存 JSON 对象，并自动管理容量限制（默认100条）
 * 当超出容量时，自动删除最旧的数据
 */

const STORAGE_PREFIX = 'amis_storage_';
const DATA_INDEX_KEY = 'amis_storage_dataIndex';
const DEFAULT_MAX_SIZE = 100;

interface StorageDataIndex {
  keys: string[];
  maxSize: number;
}

/**
 * 获取缓存索引数据
 */
function getDataIndex(): StorageDataIndex {
  try {
    const dataIndexStr = localStorage.getItem(DATA_INDEX_KEY);
    if (dataIndexStr) {
      return JSON.parse(dataIndexStr);
    }
  } catch (error) {
    console.error('获取缓存索引数据失败:', error);
  }
  return { keys: [], maxSize: DEFAULT_MAX_SIZE };
}

/**
 * 保存缓存索引数据
 */
function setDataIndex(dataIndex: StorageDataIndex): void {
  try {
    localStorage.setItem(DATA_INDEX_KEY, JSON.stringify(dataIndex));
  } catch (error) {
    console.error('保存缓存索引数据失败:', error);
  }
}

/**
 * 删除最旧的数据项
 */
function removeOldestItem(dataIndex: StorageDataIndex): void {
  if (dataIndex.keys.length > 0) {
    const oldestKey = dataIndex.keys.shift();
    if (oldestKey) {
      try {
        localStorage.removeItem(STORAGE_PREFIX + oldestKey);
      } catch (error) {
        console.error('删除历史缓存数据失败:', error);
      }
    }
  }
}

/**
 * 将 JSON 对象数据缓存入 localStorage
 * @param key 缓存的键名
 * @param value 要缓存的 JSON 对象数据
 * @param maxSize 最大缓存条数，默认100条
 * @returns 是否缓存成功
 */
export function setStorageData<T = any>(
  key: string,
  value: T,
  maxSize: number = DEFAULT_MAX_SIZE
): boolean {
  if (!key) {
    console.error('缓存键名不能为空');
    return false;
  }

  try {
    const dataIndex = getDataIndex();
    dataIndex.maxSize = maxSize;

    // 如果 key 已存在，先从列表中移除（后面会重新添加到末尾）
    const existingIndex = dataIndex.keys.indexOf(key);
    if (existingIndex !== -1) {
      dataIndex.keys.splice(existingIndex, 1);
    }

    // 检查是否超出容量限制
    while (dataIndex.keys.length >= maxSize) {
      removeOldestItem(dataIndex);
    }

    // 缓存数据
    const storageKey = STORAGE_PREFIX + key;
    const dataStr = JSON.stringify(value);
    localStorage.setItem(storageKey, dataStr);

    // 将 key 添加到列表末尾（表示最新）
    dataIndex.keys.push(key);

    // 保存索引数据
    setDataIndex(dataIndex);

    return true;
  } catch (error) {
    // 处理 QuotaExceededError 等异常
    if (error instanceof Error && error.name === 'QuotaExceededError') {
      console.error('SessionStorage 容量已满，尝试清理旧数据');
      try {
        const dataIndex = getDataIndex();
        // 清理一半的旧数据
        const itemsToRemove = Math.ceil(dataIndex.keys.length / 2);
        for (let i = 0; i < itemsToRemove; i++) {
          removeOldestItem(dataIndex);
        }
        setDataIndex(dataIndex);
        // 重试缓存
        return setStorageData(key, value, maxSize);
      } catch (retryError) {
        console.error('清理后重试缓存失败:', retryError);
        return false;
      }
    }
    console.error('缓存数据失败:', error);
    return false;
  }
}

/**
 * 根据 key 从 localStorage 取出 JSON 对象数据
 * @param key 缓存的键名
 * @returns 取出的数据，如果不存在或解析失败则返回 null
 */
export function getStorageData<T = any>(key: string): T | null {
  if (!key) {
    console.error('缓存键名不能为空');
    return null;
  }

  try {
    const storageKey = STORAGE_PREFIX + key;
    const dataStr = localStorage.getItem(storageKey);

    if (dataStr === null) {
      return null;
    }

    return JSON.parse(dataStr) as T;
  } catch (error) {
    console.error('获取缓存数据失败:', error);
    return null;
  }
}

/**
 * 删除指定 key 的数据
 * @param key 缓存的键名
 * @returns 是否删除成功
 */
export function removeStorageData(key: string): boolean {
  if (!key) {
    console.error('缓存键名不能为空');
    return false;
  }

  try {
    const dataIndex = getDataIndex();
    const index = dataIndex.keys.indexOf(key);

    if (index !== -1) {
      dataIndex.keys.splice(index, 1); // 删除索引
      setDataIndex(dataIndex);
    }

    const storageKey = STORAGE_PREFIX + key;
    localStorage.removeItem(storageKey); // 删除对应缓存数据

    return true;
  } catch (error) {
    console.error('删除缓存数据失败:', error);
    return false;
  }
}

/**
 * 清空所有通过此工具存储的数据
 * @returns 是否清空成功
 */
export function clearStorageData(): boolean {
  try {
    const dataIndex = getDataIndex();

    // 删除所有数据项
    dataIndex.keys.forEach((key) => {
      try {
        localStorage.removeItem(STORAGE_PREFIX + key);
      } catch (error) {
        console.error(`删除数据项 ${key} 失败:`, error);
      }
    });

    // 清空索引数据
    localStorage.removeItem(DATA_INDEX_KEY);

    return true;
  } catch (error) {
    console.error('清空缓存数据失败:', error);
    return false;
  }
}

/**
 * 获取当前存储的数据条数
 * @returns 当前存储的数据条数
 */
export function getStorageCount(): number {
  try {
    const dataIndex = getDataIndex();
    return dataIndex.keys.length;
  } catch (error) {
    console.error('获取缓存数据条数失败:', error);
    return 0;
  }
}

/**
 * 获取所有存储的 key 列表
 * @returns key 列表（按时间顺序，最早的在前）
 */
export function getStorageKeys(): string[] {
  try {
    const dataIndex = getDataIndex();
    return [...dataIndex.keys];
  } catch (error) {
    console.error('获取缓存数据键列表失败:', error);
    return [];
  }
}
