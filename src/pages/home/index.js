import React from 'react';
import { Tabs } from 'antd-mobile';
import Topics from './topics';
import { tabs } from '../../utils/constant';

class Index extends React.Component {
  render() {
    return (
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
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
      </div>
    );
  }
}

export default Index;
