import React from 'react';
import { Tabs } from 'antd-mobile';
import { connect } from 'dva';
import Topics from './topics';
import { tabs } from '../../utils/constant';

@connect(({ topics }) => ({
  ...topics,
}))
class Index extends React.Component {
  componentDidMount() {
    console.log('aaa');
    this.props.dispatch({
      type: 'topic/topics',
    });
  }
  render() {
    const { dispatch } = this.props;
    return (
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <Tabs
          tabs={tabs}
          initialPage={0}
          onChange={(tab, index) => {
            console.log('onChange', index, tab);
            dispatch({
              type: 'topic/topics',
            });
          }}
          onTabClick={(tab, index) => {
            console.log('onTabClick', index, tab);
          }}
        >
          <Topics />
        </Tabs>
      </div>
    );
  }
}

export default Index;
