import React, { useState } from 'react';
import { Button, Modal, Select } from 'antd';
import styles from './style.module.scss';

const { Option } = Select;

const SELECT_OPTIONS = ['Banner 组件', 'List 组件', 'Footer 组件'];
interface Props {
  index: number;
  item: Record<PropertyKey, any>;
  removeItemFromChildren: (index: number) => void;
}

const AreaItem: React.FC<Props> = ({ index, item, removeItemFromChildren }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const showModal = (): void => {
    setIsModalVisible(true);
  };
  const handleOkClick = (): void => {
    setIsModalVisible(false);
  };
  const handleCancelClick = (): void => {
    setIsModalVisible(false);
  };
  const handleSelect = (value: any): void => {
    console.log(value);
  };
  return (
    <li className={styles.item}>
      <span className={styles.content} onClick={showModal}>
        当前区块内容为空
      </span>
      <span className={styles.delete}>
        <Button
          onClick={() => {
            removeItemFromChildren(index);
          }}
          size="small"
          type="dashed"
          danger
        >
          删除
        </Button>
      </span>
      <Modal
        title="选择组件"
        visible={isModalVisible}
        onOk={handleOkClick}
        onCancel={handleCancelClick}
      >
        <Select className="w-full" onChange={handleSelect}>
          {SELECT_OPTIONS.map(item => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </Modal>
    </li>
  );
};

export default AreaItem;
