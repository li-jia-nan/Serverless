import React from 'react';
import { parseJsonByString } from '../../../../../common/utils';
import styles from './style.module.scss';

const schema = parseJsonByString(window.localStorage?.schema, {});
const banerSchema = schema?.children?.[0] || {};

const Banner: React.FC = () => {
  const { title = '', description = '' } = banerSchema?.attributes || {};
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
