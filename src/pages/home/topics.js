import React from 'react';
import { ListView } from 'antd-mobile';
import { connect } from 'dva';
import Topic from './topic';

@connect(({ topic, loading }) => ({ ...topic, loading }))
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1.id !== row2.id }),
    };
  }
  onEndReached = event => {
    if (this.props.loading.effects['topic/topics']) {
      return;
    }
    console.log('reach end', event);
    this.props.dispatch({
      type: 'topic/update',
      payload: { page: this.props.page + 1 },
    });
    this.props.dispatch({
      type: 'topic/topics',
    });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.list !== this.props.list) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.list),
      });
    }
  }
  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 6,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    const row = (rowData, sectionID, rowID) => {
      return <Topic key={rowData.id} {...rowData} />;
    };
    return (
      <ListView
        dataSource={this.state.dataSource}
        // dataSource={listSource}
        renderFooter={() => (
          <div style={{ padding: 30, textAlign: 'center' }}>
            {this.props.loading.effects['topic/topics'] ? '加载中...' : '我是底线'}
          </div>
        )}
        renderRow={row}
        renderSeparator={separator}
        className="am-list"
        style={{ height: '100vh' }}
        pageSize={4}
        // useBodyScroll
        // onScroll={() => {
        //   console.log('scroll');
        // }}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    );
  }
}

export default Demo;
