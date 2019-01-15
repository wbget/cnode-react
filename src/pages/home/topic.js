import React from 'react';

import Truncate from 'react-truncate';
import { format } from 'timeago.js';
import { tabs } from '../../utils/constant';
import { connect } from 'dva';
import router from 'umi/router';

import more from '../../assets/more.png';
import styles from './topic.less';

@connect(({ topic }) => ({
  current: topic.current,
}))
class Topic extends React.Component {
  onTopic() {
    const { dispatch, id } = this.props;
    console.log('on click');
    dispatch({
      type: 'topic/topic',
      payload: { id },
    });
    router.push('/detail');
  }
  render() {
    const {
      author,
      // author_id,
      content,
      create_at,
      good,
      // id,
      // last_reply_at,
      reply_count,
      tab,
      title,
      top,
      visit_count,
    } = this.props;
    const { avatar_url, loginname } = author;
    const pTab = tabs.find(t => t.key === tab);
    return (
      <div className={styles.index} onClick={this.onTopic.bind(this)}>
        <div className={styles.author}>
          <img className={styles.avatar} src={avatar_url} alt="" />
          {`${loginname} · ${format(create_at, 'zh_CN')}`}
        </div>
        <div>
          <div className={styles.title}>
            <div className={styles.topic}>{title}</div>
          </div>
          <Truncate
            lines={1}
            ellipsis={
              <div className={styles.more}>
                <div className={styles.tag}>
                  {top ? <div className={styles.top}>置顶</div> : null}
                  {good ? <div className={styles.good}>精品</div> : null}
                  {pTab ? <div className={styles.tab}>{pTab.title}</div> : null}
                </div>
                <div className={styles.detail}>
                  <div className={styles.count}>{`${visit_count} 访问 · ${reply_count} 评论`}</div>
                  <img className={styles.icon} src={more} alt="" />
                </div>
              </div>
            }
            trimWhitespace
          >
            {content}
          </Truncate>
        </div>
      </div>
    );
  }
}
export default Topic;
