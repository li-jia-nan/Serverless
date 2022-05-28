import React from 'react';
import styles from './style.module.scss';

const Banner: React.FC<{ schema: any }> = ({ schema }) => {
  const { title = '', description = '' } = schema?.attributes || {};
  return (
    <div className="wrapper">
      <div className={styles.banner}>
        <div className={styles.person}>
          <img
            className={styles.avatar}
            src="https://serverless-project-static-files.oss-cn-beijing.aliyuncs.com/images/avatar.jpeg"
            alt=""
          />
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
