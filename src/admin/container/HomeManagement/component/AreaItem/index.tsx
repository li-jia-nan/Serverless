import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Button, Modal, Select } from 'antd';
import styles from './style.module.scss';

const { Option } = Select;
let prevScheam = {};

const SELECT_OPTIONS = ['Banner 组件', 'List 组件', 'Footer 组件'];
interface Props {
  index: number;
  item: Record<PropertyKey, any>;
  removeItemFromChildren: (index: number) => void;
}

const AreaItem: React.ForwardRefRenderFunction<
  { getSchema: () => Record<PropertyKey, any> },
  Props
> = (props, ref) => {
  const { index, item, removeItemFromChildren } = props;
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [schema, setSchema] = useState<Record<PropertyKey, any>>(item);

  useImperativeHandle<
    { getSchema: () => Record<PropertyKey, any> },
    { getSchema: () => Record<PropertyKey, any>; resetSchema: () => void }
  >(ref, () => {
    return {
      getSchema(): Record<PropertyKey, any> {
        return schema;
      },
      resetSchema(): void {
        setSchema(item);
        prevScheam = {};
      },
    };
  });

  const showModal = (): void => {
    setIsModalVisible(true);
  };
  const handleOkClick = (): void => {
    setIsModalVisible(false);
    prevScheam = {};
  };
  const handleCancelClick = (): void => {
    setSchema(prevScheam);
    setIsModalVisible(false);
    prevScheam = {};
  };
  const handleSelect = (value: any): void => {
    prevScheam = { ...schema };
    setSchema({ name: value, attributes: {}, children: [] });
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

export default forwardRef(AreaItem);
