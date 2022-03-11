import { useState, forwardRef, useImperativeHandle, ChangeEvent } from 'react';
import { Input } from 'antd';
import { parseJsonByString } from '../../../../../common/utils';
import styles from './style.module.scss';

const { TextArea } = Input;

const schema = parseJsonByString(window.localStorage?.schema, {});

const PageSetting: React.ForwardRefRenderFunction<any, any> = (props, ref) => {
  const [title, setTitle] = useState<string>(schema?.children?.[0]?.attributes?.title || '');
  const [description, setDescription] = useState<string>(
    schema?.children?.[0]?.attributes?.description || ''
  );

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  useImperativeHandle(ref, () => ({ title, description }));

  return (
    <div>
      <div className={styles.row}>
        <span className={styles.label}>页面标题</span>
        <Input
          value={title}
          className={styles.content}
          placeholder="请输入页面标题"
          onChange={handleTitleChange}
        />
      </div>
      <div className={styles.row}>
        <span className={styles.label}>页面描述</span>
        <TextArea
          value={description}
          className={styles.content}
          rows={2}
          placeholder="请输入页面描述"
          onChange={handleDescriptionChange}
        />
      </div>
    </div>
  );
};

export default forwardRef(PageSetting);
