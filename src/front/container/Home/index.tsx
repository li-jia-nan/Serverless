import React from 'react';
import Banner from './component/Banner';
import Footer from './component/Footer';
import List from './component/List';
import { parseJsonByString } from '../../../common/utils';

const schema = parseJsonByString(localStorage.schema, {});

const child: any[] = schema.children || [];

const Render: React.FC<{ item: any }> = ({ item }) => {
  switch (item.name) {
    case 'Banner 组件':
      return <Banner schema={item} />;
    case 'Footer 组件':
      return <Footer />;
    case 'List 组件':
      return <List />;
    default:
      return null;
  }
};

const Home: React.FC = () => {
  return (
    <>
      {child.map((item, index) => (
        <Render item={item} key={index} />
      ))}
    </>
  );
};

export default Home;
