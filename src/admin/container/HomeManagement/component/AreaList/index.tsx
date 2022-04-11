import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Button } from 'antd';
import styles from './style.module.scss';
import AreaItem from '../AreaItem';

interface Props {
  children: any[];
}

const AreaList: React.ForwardRefRenderFunction<any, Props> = (props, ref) => {
  const [children, setChildren] = useState<Record<PropertyKey, any>[]>(props.children);

  const addItemToChildren = (): void => {
    setChildren([...children, {}]);
  };

  const removeItemFromChildren = (index: number): void => {
    setChildren(list => list.filter((item, i) => i !== index));
  };

  useImperativeHandle(ref, () => ({ children: children }));

  return (
    <div>
      <ul className={styles.list}>
        {children.map((item, index) => (
          <AreaItem
            key={index}
            index={index}
            item={item}
            removeItemFromChildren={removeItemFromChildren}
          />
        ))}
      </ul>
      <Button type="primary" ghost onClick={addItemToChildren}>
        新增页面区块
      </Button>
    </div>
  );
};

export default forwardRef(AreaList);
