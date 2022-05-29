import React from 'react';
import { Input } from 'antd';
import styles from './style.module.scss';

const { TextArea } = Input;

const Banner: React.FC<Record<PropertyKey, any>> = props => {
  const { attributes = {} } = props;
  const { title, description } = attributes;
  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <span className={styles.label}>页面标题</span>
        <Input
          value={title}
          className={styles.content}
          placeholder="请输入页面标题"
          // onChange={handleTitleChange}
        />
      </div>
      <div className={styles.row}>
        <span className={styles.label}>页面描述</span>
        <TextArea
          value={description}
          className={styles.content}
          rows={2}
          placeholder="请输入页面描述"
          // onChange={handleDescriptionChange}
        />
      </div>
    </div>
  );
};

export default Banner;
