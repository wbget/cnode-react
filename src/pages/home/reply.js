import React from 'react';

import Truncate from 'react-truncate';
import { format } from 'timeago.js';
import styles from './reply.less';

class Topic extends React.Component {
  render() {
    const {
      author,
      content,
      create_at,
      // id,
      // last_reply_at,
      //   is_uped,
      //   reply_id,
      ups,
    } = this.props;
    const { avatar_url, loginname } = author;
    return (
      <div className={styles.index}>
        <div className={styles.author}>
          <img className={styles.avatar} src={avatar_url} alt="" />
          {`${loginname}`}
        </div>
        <div>
          <Truncate
            lines={1}
            ellipsis={
              <div className={styles.more}>
                <div className={styles.detail}>
                  <div className={styles.count}>{`${ups.length} 赞同 · ${format(
                    create_at,
                    'zh_CN'
                  )}`}</div>
                  {/* <img className={styles.icon} src={more} alt="" /> */}
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
