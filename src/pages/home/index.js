import React from 'react';
import { Tabs } from 'antd-mobile';
import Topics from './topics';
import { tabs } from '../../utils/constant';

class Index extends React.Component {
  render() {
    return (
      <Tabs
        tabs={tabs}
        initialPage={0}
        onChange={(tab, index) => {
          console.log('onChange', index, tab);
        }}
        onTabClick={(tab, index) => {
          console.log('onTabClick', index, tab);
        }}
      >
        {tabs.map(tab => (
          <Topics key={tab.key} tab={tab} />
        ))}
      </Tabs>
    );
  }
}

export default Index;
