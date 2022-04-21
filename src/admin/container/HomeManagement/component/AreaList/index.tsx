import React, {
  useState,
  useEffect,
  forwardRef,
  createRef,
  useMemo,
  useImperativeHandle,
} from 'react';
import { Button } from 'antd';
import { ReactSortable, ItemInterface } from 'react-sortablejs';
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
  useEffect(() => {
    setChildren(props.children);
  }, [props.children]);
  useImperativeHandle<
    { getSchema: () => Record<PropertyKey, any> },
    { getSchema: () => Record<PropertyKey, any> }
  >(ref, () => {
    return {
      getSchema(): Record<PropertyKey, any> {
        return children.map((_, i) => refs?.[i]?.current?.getSchema?.());
      },
    };
  });
  const addItemToChildren = (): void => {
    setChildren([...children, {}]);
  };

  const changeAreaItem = (index: number, item: Record<PropertyKey, any>): void => {
    const newChildren = [...children];
    newChildren.splice(index, 1, item);
    setChildren(newChildren);
  };

  const removeItemFromChildren = (index: number): void => {
    setChildren(list => list.filter((item, i) => i !== index));
  };

  return (
    <div>
      <ul className={styles.list}>
        <ReactSortable list={children as unknown as ItemInterface[]} setList={setChildren}>
          {children.map((item, index) => (
            <AreaItem
              key={index}
              index={index}
              item={item}
              removeItemFromChildren={removeItemFromChildren}
              changeAreaItem={changeAreaItem}
              ref={refs[index]}
            />
          ))}
        </ReactSortable>
      </ul>
      <Button type="primary" ghost onClick={addItemToChildren}>
        新增页面区块
      </Button>
    </div>
  );
};

export default forwardRef(AreaList);
