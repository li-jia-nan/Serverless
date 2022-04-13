import React, { useState, forwardRef, createRef, useMemo, useImperativeHandle } from 'react';
import { Button } from 'antd';
import styles from './style.module.scss';
import AreaItem from '../AreaItem';

const AreaList: React.ForwardRefRenderFunction<
  { getSchema: () => Record<PropertyKey, any>[]; resetSchema: () => void },
  { children: Record<PropertyKey, any>[] }
> = (props, ref) => {
  const [children, setChildren] = useState<Record<PropertyKey, any>[]>(props.children);
  const refs = useMemo(
    () =>
      children.map(() =>
        createRef<{ getSchema: () => Record<PropertyKey, any>; resetSchema: () => void }>()
      ),
    [children]
  );
  useImperativeHandle<
    { getSchema: () => Record<PropertyKey, any>; resetSchema: () => void },
    { getSchema: () => Record<PropertyKey, any>; resetSchema: () => void }
  >(ref, () => {
    return {
      getSchema(): Record<PropertyKey, any> {
        return children.map((_, i) => refs?.[i]?.current?.getSchema?.());
      },
      resetSchema(): void {
        setChildren(props.children);
        children.forEach((clild, i) => {
          refs?.[i]?.current?.resetSchema();
        });
      },
    };
  });
  const addItemToChildren = (): void => {
    setChildren([...children, {}]);
  };

  const removeItemFromChildren = (index: number): void => {
    setChildren(list => list.filter((item, i) => i !== index));
  };

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
