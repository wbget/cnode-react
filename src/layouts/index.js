import React from 'react';
import { connect } from 'dva';
import { TabBar, Icon } from 'antd-mobile';
import router from 'umi/router';
import styles from './index.less';

const tabs = [
  {
    title: '首页',
    key: 'home',
    route: '/',
  },
  {
    title: '未读消息',
    key: 'new',
    route: '/new',
  },
  {
    title: '关于',
    key: 'about',
    route: '/about',
  },
  {
    title: '我的',
    key: 'setting',
    route: '/setting',
  },
];

@connect(({ user }) => ({
  ...user,
}))
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
      hidden: false,
    };
  }

  renderTab(tab) {
    const { title, key, route } = tab;
    return (
      <TabBar.Item
        title={title}
        key={key}
        icon={<Icon />}
        selectedIcon={<Icon />}
        selected={this.state.selectedTab === key}
        onPress={() => {
          this.setState({
            selectedTab: key,
          });
          router.replace(route);
        }}
      />
    );
  }
  render() {
    return (
      <div>
        <div className={styles.tabbar}>
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            hidden={this.state.hidden}
          >
            {tabs.map(this.renderTab.bind(this))}
          </TabBar>
        </div>
        <div className={styles.content}>{this.props.children}</div>
      </div>
    );
  }
}

export default Index;
