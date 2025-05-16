
import  { Component } from "react";
import { ShimmerPostList } from "react-shimmer-effects";

class ShimmerEffect extends Component {
  render() {
    return <ShimmerPostList postStyle="STYLE_FOUR" col={4} row={1} gap={10} />;
  }
}

export default ShimmerEffect;
