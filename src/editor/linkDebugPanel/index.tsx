/**
 * 外部链接 管理面板
 */
import React, { Component } from 'react';
import {
  Form,
  Input,
  Button,
  List,
  Popconfirm,
  message,
  Space,
  Typography,
  Empty,
  Modal,
  Tooltip,
} from 'antd';
import { PlusOutlined, DeleteOutlined, LinkOutlined } from '@ant-design/icons';
import { setStorageData, getStorageData } from '../../utils/localStorage';
import loadLinkDebugFromStorage from '../../utils/loadLinkDebugFromStorage';
import './style.scss';

const { Text } = Typography;

interface ExternalLink {
  id: string;
  url: string;
  description?: string;
  createdAt: number;
}

interface IProps {
  [key: string]: any;
}

interface LinkDebugPanelState {
  links: ExternalLink[];
  loading: boolean;
  modalVisible: boolean;
}

class LinkDebugPanel extends Component<IProps, LinkDebugPanelState> {
  private formRef = React.createRef<any>();
  STORAGE_KEY = 'amis-editor-designer-external-links'; // 存储外部链接的 localStorage 键名

  constructor(props: IProps) {
    super(props);

    this.state = {
      links: [],
      loading: false,
      modalVisible: false,
    };
  }

  componentDidMount() {
    // 从 localStorage 加载数据
    const savedLinks = getStorageData<ExternalLink[]>(this.STORAGE_KEY);
    if (savedLinks && Array.isArray(savedLinks)) {
      this.setState({ links: savedLinks });
    }
  }

  // 保存数据到 localStorage
  private saveToStorage = (newLinks: ExternalLink[]) => {
    const success = setStorageData(this.STORAGE_KEY, newLinks);
    if (!success) {
      message.error('保存外部链接数据失败');
    }
  };

  // 显示添加链接弹窗
  private showAddModal = () => {
    this.setState({ modalVisible: true });
  };

  // 隐藏添加链接弹窗
  private hideAddModal = () => {
    this.setState({ modalVisible: false });
    this.formRef.current?.resetFields();
  };

  // 添加外部链接
  private handleAddLink = async () => {
    console.log('handleAddLink:', this.props);
    try {
      const values = await this.formRef.current?.validateFields();
      const { links } = this.state;
      this.setState({ loading: true });

      if (links.find((link) => link.url === values.url)) {
        message.error(
          '外部链接已存在，请勿重复添加。'
        );
        return;
      } else if (links.length >= 10) {
        message.error(
          '外部链接最多添加10个。'
        );
        return;
      }

      const newLink: ExternalLink = {
        id: Date.now().toString(),
        url: values.url,
        description: values.description || '',
        createdAt: Date.now(),
      };

      const updatedLinks = [...links, newLink];
      this.setState({ links: updatedLinks });
      this.saveToStorage(updatedLinks);

      this.formRef.current?.resetFields();
      this.setState({ modalVisible: false });
      message.success(
        '外部链接添加成功'
      );

      // 添加完成后，加载外链脚本
      loadLinkDebugFromStorage();
    } catch (error) {
      message.error(
        '外部链接添加失败'
      );
    } finally {
      this.setState({ loading: false });
    }
  };

  // 删除外部链接
  private handleDeleteLink = (id: string) => {
    const updatedLinks = this.state.links.filter((link) => link.id !== id);
    this.setState({ links: updatedLinks });
    this.saveToStorage(updatedLinks);
    message.success(
      '外部链接删除成功'
    );
  };

  // 验证URL格式
  private validateUrl = (_: any, value: string) => {
    if (!value) return Promise.resolve();

    try {
      new URL(value);
      return Promise.resolve();
    } catch {
      return Promise.reject(new Error('请输入有效的URL地址'));
    }
  };

  render() {
    const { links, loading, modalVisible } = this.state;

    return (
      <div className="link-debug-panel">
        {/* 链接列表 */}
        <div className="link-debug-list">
          {links.length > 0 ? (
            <List
              dataSource={links}
              renderItem={(link: ExternalLink) => (
                <List.Item
                  actions={[
                    <Popconfirm
                      title="确定要删除这个外部链接吗？"
                      onConfirm={() => this.handleDeleteLink(link.id)}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Tooltip
                        placement="top"
                        title="删除"
                      >
                        <Button
                          type="link"
                          danger
                          className="delete-link-btn"
                          icon={<DeleteOutlined />}
                        />
                      </Tooltip>
                    </Popconfirm>,
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <Space>
                        <Text className="link-debug-text strong">
                          {link.url}
                        </Text>
                      </Space>
                    }
                    description={
                      <Space direction="vertical" size={4}>
                        {link.description && (
                          <Text type="secondary" className="link-debug-text">
                            {link.description}
                          </Text>
                        )}
                        <Text type="secondary" style={{ fontSize: '11px' }}>
                          {new Date(link.createdAt).toLocaleString()}
                        </Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          ) : (
            <Empty
              description="暂无外部链接"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </div>
        <div className="link-debug-footer">
          {/* 统计信息 */}
          {links.length > 0 && (
            <div
              style={{
                marginTop: 16,
                padding: '8px 0',
                borderTop: '1px solid #f0f0f0',
              }}
            >
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {`共${links.length}个外部链接`}
              </Text>
            </div>
          )}

          {/* 添加链接按钮 */}
          <div style={{ marginBottom: 16 }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={this.showAddModal}
              block
            >
              添加外部链接
            </Button>
          </div>

          {/* 添加链接弹窗 */}
          <Modal
            title={
              <Space>
                <LinkOutlined />
                添加外部链接
              </Space>
            }
            visible={modalVisible}
            onCancel={this.hideAddModal}
            footer={[
              <Button key="cancel" onClick={this.hideAddModal}>
                  取消
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={loading}
                onClick={this.handleAddLink}
              >
                  添加
              </Button>,
            ]}
            width={500}
          >
            <Form
              ref={this.formRef}
              layout="vertical"
              style={{ marginTop: 16 }}
            >
              <Form.Item
                name="url"
                label="链接地址"
                rules={[
                  {
                    required: true,
                    message: '请输入linkDebug 外部链接地址',
                  },
                  { validator: this.validateUrl },
                ]}
              >
                <Input
                  placeholder="请输入完整的URL地址，如：https://example.com"
                />
              </Form.Item>

              <Form.Item
                name="description"
                label="描述（非必填）"
              >
                <Input.TextArea
                  placeholder="请输入链接描述"
                  rows={3}
                  maxLength={200}
                  showCount
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    );
  }
}

export default LinkDebugPanel;
