import React, {Component} from 'react';
import './error404.css'
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as error404Actions from "../../store/error404/actions";
export default class error404 extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }
    render() {
      return <div className="component-error404">Hello! component error404</div>;
    }
  }
// export default connect(
//     ({ error404 }) => ({ ...error404 }),
//     dispatch => bindActionCreators({ ...error404Actions }, dispatch)
//   )( error404 );