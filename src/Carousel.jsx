import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div className="carousel">
        <img src={images[active]} alt="Animal hero" />
        <div className="carousel-smaller">
          {images.map((img, idx) => (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,
            <img
              className={idx == active ? "active" : ""}
              src={img}
              key={idx}
              alt="Thumb"
              onClick={() => this.setState({ active: idx })}
              onKeyUp={() => this.setState({ active: idx })}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
