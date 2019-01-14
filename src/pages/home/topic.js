import React from 'react';

import Truncate from 'react-truncate';
import { format } from 'timeago.js';
import { tabs } from '../../utils/constant';

import more from '../../assets/more.png';
import styles from './topic.less';

class Topic extends React.Component {
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
      <div className={styles.index}>
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
                  {good ? <div className={styles.good}>好！</div> : null}
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
