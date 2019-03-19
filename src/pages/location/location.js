import React, {Component} from 'react';
import './location.css'
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as locationActions from "../../store/location/actions";
export default class location extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }
    render() {
      return <div className="component-location">Hello! component location</div>;
    }
  }
// export default connect(
//     ({ location }) => ({ ...location }),
//     dispatch => bindActionCreators({ ...locationActions }, dispatch)
//   )( location );