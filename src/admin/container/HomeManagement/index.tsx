import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { useDispatch } from 'react-redux';
import AreaList from './component/AreaList';
import styles from './style.module.scss';
import { HomeOutlined, RollbackOutlined } from '@ant-design/icons';
import { parseJsonByString } from '../../../common/utils';
import useTypeSelector from '../../../hooks/useTypeSelector';

const { Header, Sider, Content } = Layout;

const useCollapsed = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return { collapsed, toggleCollapsed };
};

const useStore = () => {
  const dispatch = useDispatch();
  const { schema } = useTypeSelector(state => state.HomeManagement);
  const changeSchema = (schema: any) => {
    const action = {
      type: 'CHANGE_SCHEMA',
      value: schema,
    };
    dispatch(action);
  };
  return { schema, changeSchema };
};

const HomeManagement: React.FC = () => {
  const { collapsed, toggleCollapsed } = useCollapsed();
  const { schema, changeSchema } = useStore();
  const handleHomePageRedirect = () => {
    window.location.href = '/';
  };

  const handleSaveBtnClick = (): void => {
    window.localStorage.schema = JSON.stringify(schema);
  };

  const handleResetBtnClick = (): void => {
    changeSchema(parseJsonByString<Record<PropertyKey, any>>(window.localStorage.schema, {}));
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider className={styles.sidebar} trigger={null} collapsible collapsed={collapsed}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['admin-home']}>
          <Menu.Item key="admin-home">
            <HomeOutlined style={{ fontSize: 16, marginRight: 8 }} />
            首页内容管理
          </Menu.Item>
          <Menu.Item key="admin-back" onClick={handleHomePageRedirect}>
            <RollbackOutlined style={{ fontSize: 16, marginRight: 8 }} />
            返回用户页面
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className={styles.header}>
          {collapsed ? (
            <span className="iconfont" onClick={toggleCollapsed}>
              bb
            </span>
          ) : (
            <span className="iconfont" onClick={toggleCollapsed}>
              aa
            </span>
          )}
        </Header>
        <Content className={styles.content}>
          <AreaList children={schema.children || []} />
          <div className={styles.save}>
            <Button type="primary" onClick={handleSaveBtnClick}>
              保存区块配置
            </Button>
            <Button type="primary" onClick={handleResetBtnClick}>
              重置区块配置
            </Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomeManagement;
