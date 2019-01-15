import { Component } from 'react';
import withRouter from 'umi/withRouter';

class Layout extends Component {
  render() {
    return this.props.children;
    // return (
    //   <div>
    //     {this.props.children}
    //     <div style={{ position: 'fixed', bottom: '10vh', right: '10vw' }}>反反复复</div>
    //   </div>
    // );
  }
}

export default withRouter(Layout);
