import React, { useEffect, useState } from 'react';
import { Button, Modal, Select } from 'antd';
import useTypeSelector from '../../../../../hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
import { addChangePageChildAction, addDeletePageChildAction } from '../../store/action';
import { SortableElement } from 'react-sortable-hoc';
import Banner from './Component/Banner';
import Footer from './Component/Footer';
import List from './Component/List';
import styles from './style.module.scss';

const { Option } = Select;

const map = {
  'Banner 组件': Banner,
  'List 组件': List,
  'Footer 组件': Footer,
};

const SELECT_OPTIONS = ['Banner 组件', 'List 组件', 'Footer 组件'];
interface PropsType {
  value: number;
  index: number;
}

interface GetComponentPropsType {
  changeTempPageChildAttribute: (obj: Record<PropertyKey, string | number>) => void;
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
  const { value: index } = props;
  const { pageChild, changePageChild, removePageChild } = useStore(index);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [tempPageChild, setTempPageChild] = useState<Record<PropertyKey, any>>(pageChild);

  useEffect(() => {
    setTempPageChild(pageChild);
  }, [pageChild]);

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

  const changeTempPageChildAttribute = (Obj: Record<PropertyKey, string | number>): void => {
    const newTempPageChild: typeof tempPageChild = JSON.parse(JSON.stringify(tempPageChild));
    for (const k in Obj) {
      newTempPageChild.attributes[k] = Obj[k];
    }
    setTempPageChild(newTempPageChild);
  };

  const GetComponent: React.FC<GetComponentPropsType> = props => {
    const { name } = tempPageChild;
    const Component = map[name as keyof typeof map];
    return Component ? <Component {...props} /> : null;
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
        <GetComponent changeTempPageChildAttribute={changeTempPageChildAttribute} />
      </Modal>
    </li>
  );
};

export default SortableElement(AreaItem);
