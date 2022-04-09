import React from 'react';
import { Button } from 'antd';
import styles from './style.module.scss';

interface Props {
  index: number;
  removeItemFromChildren: (index: number) => void;
}

const AreaItem: React.FC<Props> = ({ index, removeItemFromChildren }) => {
  return (
    <li className={styles.item}>
      <span className={styles.content}>当前区块内容为空</span>
      <span className={styles.delete}>
        <Button onClick={() => removeItemFromChildren(index)} size="small" type="dashed" danger>
          删除
        </Button>
      </span>
    </li>
  );
};

export default AreaItem;
