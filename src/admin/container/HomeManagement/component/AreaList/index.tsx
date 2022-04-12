import React, { useState, useImperativeHandle, forwardRef, createRef, useMemo } from 'react';
import { Button } from 'antd';
import styles from './style.module.scss';
import AreaItem from '../AreaItem';

interface PropsType {
  children: Record<PropertyKey, any>[];
}

interface RefType {
  getSchema: () => Record<PropertyKey, any>[];
}

const AreaList: React.ForwardRefRenderFunction<RefType, PropsType> = (props, ref) => {
  const [children, setChildren] = useState<Record<PropertyKey, any>[]>(props.children);
  const refs = useMemo(
    () => children.map(item => createRef<{ getSchema: () => Record<PropertyKey, any> }>()),
    [children]
  );
  console.log(refs);
  const addItemToChildren = (): void => {
    setChildren([...children, {}]);
  };

  const removeItemFromChildren = (index: number): void => {
    setChildren(list => list.filter((item, i) => i !== index));
  };

  useImperativeHandle<
    { getSchema: Record<PropertyKey, any> },
    { getSchema: Record<PropertyKey, any> }
  >(ref, () => {
    return {
      getSchema() {
        return children.map((item, i) => refs?.[i]?.current?.getSchema());
      },
    };
  });

  return (
    <div>
      <ul className={styles.list}>
        {children.map((item, index) => (
          <AreaItem
            key={index}
            index={index}
            item={item}
            removeItemFromChildren={removeItemFromChildren}
            ref={refs[index]}
            // changeChildrenItem={changeChildrenItem}
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
