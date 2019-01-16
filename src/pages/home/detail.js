import React from 'react';
import { connect } from 'dva';
import { format } from 'timeago.js';
import { ListView } from 'antd-mobile';
import MarkDownRender from '../../components/MarkDownRender';

import Nav from '../../components/Nav';
import Reply from './reply';

import styles from './detail.less';

@connect(({ topic, loading }) => ({
  current: topic.current,
  loading,
}))
class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.current !== this.props.current) {
      const { replies } = nextProps.current;
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(replies),
      });
    }
  }
  render() {
    const isLoading = this.props.loading.effects['topic/topic'];
    const { current } = this.props;
    const {
      author,
      // author_id,
      content,
      create_at,
      // good,
      // id,
      // is_collect,
      // last_reply_at,
      // replies,
      // reply_count,
      // tab,
      title,
      // top,
      // visit_count,
    } = current;
    const { avatar_url, loginname } = author ? author : {};
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
      return <Reply key={rowData.id} {...rowData} />;
    };
    return (
      <Nav>
        <div className={styles.index}>
          <div className={styles.author}>
            <img className={styles.avatar} src={avatar_url} alt="" />
            {`${loginname} · ${format(create_at, 'zh_CN')}`}
          </div>
          <div className={styles.title}>
            <div className={styles.topic}>{title}</div>
          </div>
          <div className={styles.detail}>
            <MarkDownRender content={content} />
          </div>
          <ListView
            dataSource={this.state.dataSource}
            renderFooter={() => (
              <div style={{ padding: 30, textAlign: 'center' }}>
                {isLoading ? '加载中...' : '我是底线'}
              </div>
            )}
            renderRow={row}
            renderSeparator={separator}
            className="am-list"
            style={{ height: '100vh', width: '100vw' }}
            pageSize={4}
            scrollRenderAheadDistance={500}
            onEndReachedThreshold={10}
          />
        </div>
      </Nav>
    );
  }
}
export default Detail;
