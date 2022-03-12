import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Button } from 'antd';
import styles from './style.module.scss';

interface Props {
  children: any[];
}

const AreaList: React.ForwardRefRenderFunction<any, Props> = (props, ref) => {
  const [children, setChildren] = useState<any[]>(props.children);

  const handleAddBtnClick = () => {
    const newChildren = [...children];
    newChildren.push({});
    setChildren(newChildren);
  };

  const handleDeleteBtnClick = (index: number) => {
    const newList = [...children];
    newList.splice(index, 1);
    setChildren(newList);
  };

  useImperativeHandle(ref, () => ({ children: children }));

  return (
    <div>
      <ul className={styles.list}>
        {children.map((item, index) => (
          <li key={index} className={styles.item}>
            <span className={styles.content}>当前区块内容为空</span>
            <span className={styles.delete}>
              <Button
                onClick={() => {
                  handleDeleteBtnClick(index);
                }}
                size="small"
                type="dashed"
                danger
              >
                删除
              </Button>
            </span>
          </li>
        ))}
      </ul>
      <Button type="primary" ghost onClick={handleAddBtnClick}>
        新增页面区块
      </Button>
    </div>
  );
};

export default forwardRef(AreaList);
