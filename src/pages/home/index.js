import React from 'react';
import { Tabs } from 'antd-mobile';
import { connect } from 'dva';
import Topics from './topics';
import Detail from './detail';
import { tabs } from '../../utils/constant';

@connect(({ topic }) => ({ isDetail: topic.isDetail }))
class Index extends React.Component {
  render() {
    const { isDetail } = this.props;
    return (
      <div>
        {isDetail ? <Detail /> : null}
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
