import React from 'react';
import { Input, Switch } from 'antd';
import styles from './style.module.scss';
import { SwitchChangeEventHandler } from 'antd/lib/switch';

const { TextArea } = Input;

const Banner: React.FC<Record<PropertyKey, any>> = props => {
  const { attributes = {}, changeTempPageChildAttribute } = props;
  const { title, description, showSmallPic, smallPicUrl, backgroundUrl, backgroundHeight } =
    attributes;

  const handleShowSmallPicChange: SwitchChangeEventHandler = checked => {
    if (!checked) {
      changeTempPageChildAttribute({ showSmallPic: checked, smallPicUrl: '' });
    } else {
      changeTempPageChildAttribute({ showSmallPic: checked });
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <span className={styles.label}>页面标题</span>
        <Input
          value={title}
          className={styles.content}
          placeholder="请输入页面标题"
          onChange={e => {
            changeTempPageChildAttribute({ title: e.target.value });
          }}
        />
      </div>
      <div className={styles.row}>
        <span className={styles.label}>页面描述</span>
        <TextArea
          value={description}
          className={styles.content}
          rows={2}
          placeholder="请输入页面描述"
          onChange={e => {
            changeTempPageChildAttribute({ description: e.target.value });
          }}
        />
      </div>
      <div className={styles.row}>
        <span className={styles.label}>展示小图</span>
        <Switch checked={showSmallPic} onChange={handleShowSmallPicChange} />
      </div>
      {showSmallPic && (
        <div className={styles.row}>
          <span className={styles.label}>小图链接</span>
          <Input
            value={smallPicUrl}
            className={styles.content}
            placeholder="请输入图片链接的url地址"
            onChange={e => {
              changeTempPageChildAttribute({ smallPicUrl: e.target.value });
            }}
          />
        </div>
      )}

      <div className={styles.row}>
        <span className={styles.label}>背景链接</span>
        <Input
          value={backgroundUrl}
          className={styles.content}
          placeholder="请输入背景图片链接的url地址"
          onChange={e => {
            changeTempPageChildAttribute({ backgroundUrl: e.target.value });
          }}
        />
      </div>
      <div className={styles.row}>
        <span className={styles.label}>背景高度</span>
        <Input
          value={backgroundHeight}
          className={styles.content}
          placeholder="请输入背景高度的像素值"
          onChange={e => {
            changeTempPageChildAttribute({ backgroundHeight: e.target.value });
          }}
        />
      </div>
    </div>
  );
};

export default Banner;
