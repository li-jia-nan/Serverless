import React from 'react';
import { Button } from 'antd';
import styles from './style.module.scss';
import AreaItem from '../AreaItem';
import useTypeSelector from '../../../../../hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
import { addPageChildrenAction, getChangePageChildPositionAction } from '../../store/action';
import { SortableContainer, SortEndHandler } from 'react-sortable-hoc';

const SortableList = SortableContainer(({ list }: { list: any[] }) => {
  return (
    <ul className={styles.list}>
      {list.map((_, index) => (
        <AreaItem key={index} value={index} index={index} />
      ))}
    </ul>
  );
});

const AreaList: React.FC = () => {
  const dispatch = useDispatch();
  const { schema } = useTypeSelector(state => state.HomeManagement);
  const addPageChildren = (): void => {
    dispatch(addPageChildrenAction());
  };

  const onSortEnd: SortEndHandler = ({ oldIndex, newIndex }) => {
    dispatch(getChangePageChildPositionAction(oldIndex, newIndex));
  };
  return (
    <div>
      <SortableList lockAxis="y" distance={5} list={schema.children} onSortEnd={onSortEnd} />
      <Button type="primary" ghost onClick={addPageChildren}>
        新增页面区块
      </Button>
    </div>
  );
};

export default AreaList;
