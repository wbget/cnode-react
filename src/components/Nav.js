import React from 'react';
import { NavBar, Icon, Toast } from 'antd-mobile';
import { connect } from 'dva';
import styles from './Nav.less';

const onShare = () => {
  Toast.show('感谢你的支持！', 3);
};
@connect(({ topic }) => ({ ...topic }))
class Nav extends React.Component {
  render() {
    return (
      <div>
        <NavBar
          className={styles.navbar}
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.dispatch({
              type: 'topic/update',
              payload: {
                isDetail: false,
              },
            });
          }}
          rightContent={[
            // <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <Icon key="1" type="ellipsis" onClick={onShare} />,
          ]}
        />
        {this.props.children}
      </div>
    );
  }
}
export default Nav;
