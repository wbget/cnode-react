import { NavBar, Icon, Toast } from 'antd-mobile';
import router from 'umi/router';
import styles from './Nav.less';

const onShare = () => {
  Toast.show('感谢你的支持！', 3);
};
export default ({ children }) => {
  return (
    <div>
      <NavBar
        className={styles.navbar}
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => {
          router.goBack();
        }}
        rightContent={[
          // <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
          <Icon key="1" type="ellipsis" onClick={onShare} />,
        ]}
      />
      {children}
    </div>
  );
};
