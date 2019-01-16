import React from 'react';
import { format } from 'timeago.js';

import MarkDownRender from '../../components/MarkDownRender';

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
        <div className={styles.reply}>
          <MarkDownRender content={content} />
          <div className={styles.more}>
            <div className={styles.detail}>
              <div className={styles.count}>
                {`${ups.length} 赞同 · ${format(create_at, 'zh_CN')}`}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Topic;
