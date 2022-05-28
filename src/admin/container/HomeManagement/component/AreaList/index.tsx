import React from 'react';
import { Button } from 'antd';
import styles from './style.module.scss';
import AreaItem from '../AreaItem';
import useTypeSelector from '../../../../../hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
import { addPageChildrenAction } from '../../store/action';

const AreaList: React.FC = () => {
  const dispatch = useDispatch();
  const { schema } = useTypeSelector(state => state.HomeManagement);
  const addPageChildren = (): void => {
    dispatch(addPageChildrenAction());
  };

  return (
    <div>
      <ul className={styles.list}>
        {schema.children.map((_, index) => (
          <AreaItem key={index} index={index} />
        ))}
      </ul>
      <Button type="primary" ghost onClick={addPageChildren}>
        新增页面区块
      </Button>
    </div>
  );
};

export default AreaList;
