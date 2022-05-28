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

const useStore = (index: number) => {
  const dispatch = useDispatch();
  const pageChild = useTypeSelector(state => state.HomeManagement.schema.children[index]);
  const changePageChild = (temp: any) => {
    dispatch(addChangePageChildAction(temp, index));
  };
  const removePageChild = () => {
    dispatch(addDeletePageChildAction(index));
  };
  return { pageChild, changePageChild, removePageChild } as const;
};

const AreaItem: React.FC<PropsType> = props => {
  const { index } = props;
  const { pageChild, changePageChild, removePageChild } = useStore(index);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [tempPageChild, setTempPageChild] = useState<Record<PropertyKey, any>>(pageChild);
  const showModal = (): void => {
    setIsModalVisible(true);
  };
  const handleOkClick = (): void => {
    setIsModalVisible(false);
    changePageChild(tempPageChild);
  };
  const handleCancelClick = (): void => {
    setIsModalVisible(false);
    setTempPageChild(pageChild);
  };
  const handleSelect = (value: any): void => {
    setTempPageChild({ name: value, attributes: {}, children: [] });
  };

  return (
    <li className={styles.item}>
      <span className={styles.content} onClick={showModal}>
        {tempPageChild.name || '当前区块内容为空'}
      </span>
      <span className={styles.delete}>
        <Button onClick={removePageChild} size="small" type="dashed" danger>
          删除
        </Button>
      </span>
      <Modal
        title="选择组件"
        visible={isModalVisible}
        onOk={handleOkClick}
        onCancel={handleCancelClick}
      >
        <Select className="w-full" value={tempPageChild.name} onChange={handleSelect}>
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
