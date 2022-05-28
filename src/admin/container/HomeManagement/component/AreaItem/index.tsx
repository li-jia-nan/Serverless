import React, { useState } from 'react';
import { Button, Modal, Select } from 'antd';
import styles from './style.module.scss';
import useTypeSelector from '../../../../../hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
import { addChangePageChildAction, addDeletePageChildAction } from '../../store/action';

const { Option } = Select;

const SELECT_OPTIONS = ['Banner 组件', 'List 组件', 'Footer 组件'];
interface PropsType {
  index: number;
}

const AreaItem: React.FC<PropsType> = props => {
  const { index } = props;
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { schema } = useTypeSelector(state => state.HomeManagement);
  const [temp, setTemp] = useState<Record<PropertyKey, any>>(schema.children[index]);
  const showModal = (): void => {
    setIsModalVisible(true);
  };
  const handleOkClick = (): void => {
    setIsModalVisible(false);
    dispatch(addChangePageChildAction(temp, index));
  };
  const handleCancelClick = (): void => {
    setIsModalVisible(false);
    setTemp(schema);
  };
  const handleSelect = (value: any): void => {
    setTemp({ name: value, attributes: {}, children: [] });
  };
  const removePageChild = (i: number) => {
    dispatch(addDeletePageChildAction(i));
  };
  return (
    <li className={styles.item}>
      <span className={styles.content} onClick={showModal}>
        {schema.name || '当前区块内容为空'}
      </span>
      <span className={styles.delete}>
        <Button
          onClick={() => {
            removePageChild(index);
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
        <Select className="w-full" value={schema.name} onChange={handleSelect}>
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
