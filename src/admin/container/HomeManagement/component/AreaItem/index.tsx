import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Button, Modal, Select } from 'antd';
import styles from './style.module.scss';

const { Option } = Select;

const SELECT_OPTIONS = ['Banner 组件', 'List 组件', 'Footer 组件'];
interface PropsType {
  index: number;
  item: Record<PropertyKey, any>;
  removeItemFromChildren: (index: number) => void;
  changeAreaItem: (i: number, item: Record<PropertyKey, any>) => void;
}

interface RefType {
  getSchema: () => Record<PropertyKey, any>;
}

const AreaItem: React.ForwardRefRenderFunction<RefType, PropsType> = (props, ref) => {
  const { index, item, removeItemFromChildren, changeAreaItem } = props;
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [schema, setSchema] = useState<Record<PropertyKey, any>>(item);
  const [temp, setTemp] = useState<Record<PropertyKey, any>>(item);

  useEffect(() => {
    setSchema(props.item);
    setTemp(props.item);
  }, [props.item]);

  useImperativeHandle<
    { getSchema: () => Record<PropertyKey, any> },
    { getSchema: () => Record<PropertyKey, any> }
  >(ref, () => {
    return {
      getSchema(): Record<PropertyKey, any> {
        return schema;
      },
    };
  });

  const showModal = (): void => {
    setIsModalVisible(true);
  };
  const handleOkClick = (): void => {
    setIsModalVisible(false);
    setSchema(temp);
    changeAreaItem(index, temp);
  };
  const handleCancelClick = (): void => {
    setIsModalVisible(false);
    setTemp(schema);
  };
  const handleSelect = (value: any): void => {
    setTemp({ name: value, attributes: {}, children: [] });
  };

  return (
    <li className={styles.item}>
      <span className={styles.content} onClick={showModal}>
        {schema.name || '当前区块内容为空'}
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
        <Select className="w-full" value={temp.name} onChange={handleSelect}>
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

export default forwardRef(AreaItem);
