import React from 'react';
import { ListView } from 'antd-mobile';
import { connect } from 'dva';
import Topic from './topic';

@connect(({ topic, loading }) => ({ ...topic, loading }))
class Topics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'topic/onPage',
      payload: { tab: this.props.tab, page: 0 },
    });
  }
  onEndReached = event => {
    const { loading, tab } = this.props;
    if (loading.effects['topic/topics']) {
      return;
    }
    const page = this.props[tab.key + 'Page'];
    console.log('reach end', event);
    this.props.dispatch({
      type: 'topic/onPage',
      payload: { tab: this.props.tab, page: page + 1 },
    });
  };
  componentWillReceiveProps(nextProps) {
    const { tab } = this.props;
    const listKey = tab.key + 'List';
    if (nextProps[listKey] !== this.props[listKey]) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps[listKey]),
      });
    }
  }
  render() {
    const isLoading = this.props.loading.effects['topic/topics'];
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
            {isLoading ? '加载中...' : '我是底线'}
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
        onEndReachedThreshold={30}
      />
    );
  }
}

export default Topics;
