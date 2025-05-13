
import  { Component } from "react";
import { ShimmerPostList } from "react-shimmer-effects";

class ShimmerEffect extends Component {
  render() {
    return <ShimmerPostList postStyle="STYLE_FOUR" col={3} row={2} gap={30} />;
  }
}

export default ShimmerEffect;
