import { connect } from "react-redux";
import Header from "./Header";
import React from "react";

class HeaderContainer extends React.Component {
  render() {
    return <Header currentTitle={this.props.currentTitle}/>
  }
}

const mapStateToProps = (state) => {
  return {
    currentTitle: state.navigate.currentTitle,
  }
}

export default connect(mapStateToProps, {})(HeaderContainer)