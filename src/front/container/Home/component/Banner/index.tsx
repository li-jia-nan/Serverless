import React from 'react';
import styles from './style.module.scss';

const Banner: React.FC<{ schema: any }> = ({ schema }) => {
  const { attributes = {} } = schema;
  const { title, description, showSmallPic, smallPicUrl, backgroundUrl, backgroundHeight } =
    attributes;
  return (
    <div style={{ backgroundImage: `url(${backgroundUrl})`, height: backgroundHeight }}>
      <div className={styles.banner}>
        <div className={styles.person}>
          {showSmallPic && smallPicUrl && (
            <img className={styles.avatar} src={smallPicUrl} alt="" />
          )}
          <div className={styles.content}>
            <div className={styles.title}>{title}</div>
            <div className={styles.description}>{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
