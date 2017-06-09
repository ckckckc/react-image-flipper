import React, { Component } from 'react';
import prefixAll from 'inline-style-prefixer/static';
import PropTypes from 'prop-types';

class Flipper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null,
      height: null,
      isMouseIn: false,
      isClicked: false,
    };

    const flipperStyle = this.props.flipperStyle || {};

    const { 
      outBound, 
      container, 
      flippingContainer, 
      back, 
      front 
    } = flipperStyle;

    this.flipperStyle = prefixAll({
      outBound: {
        perspective: '500px',
        display: 'inline-block',
        cursor: 'pointer',
        ...outBound
      },
      container: {
        OTransition: 'transform 0.6s',
        MozTransition: 'transform 0.6s',
        WebkitTransition: 'transform 0.6s',
        transition: 'transform 0.6s',
        position: 'relative',
        MozTransformStyle: 'preserve-3d',
        WebkitTransformStyle: 'preserve-3d',
        transformStyle: 'preserve-3d',
        OTransitionTimingFunction: 'ease-in-out',
        MozTransitionTimingFunction: 'ease-in-out',
        WebkitTransitionTimingFunction: 'ease-in-out',
        transitionTimingFunction: 'ease-in-out',
        ...container
      },
      flippingContainer: {
        Otransform: 'rotateY(-180deg)',
        MozTransform: 'rotateY(-180deg)',
        WebkitTransform: 'rotateY(-180deg)',
        transform: 'rotateY(-180deg)',
        ...flippingContainer,
      },
      back: {
        position: 'absolute',
        left: '0px',
        top: '0px',
        MozBackfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        OTransform: 'rotateY(0deg)',
        MozTransform: 'rotateY(0deg)',
        WebkitTransform: 'rotateY(0deg)',
        transform: 'rotateY(0deg)',
        zIndex: 1,
        ...back,
      },
      front: {
        position: 'absolute',
        left: '0px',
        top: '0px',
        MozBackfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        OTransform: 'rotateY(180deg)',
        MozTransform: 'rotateY(180deg)',
        WebkitTransform: 'rotateY(180deg)',
        transform: 'rotateY(180deg)',
        ...front
      },
    });

    this.imageOnLoad = this.imageOnLoad.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.toggleClick = this.toggleClick.bind(this);
  }

  onMouseEnter() {
    this.setState({
      isMouseIn: true,
    });
  }

  onMouseLeave() {
    this.setState({
      isMouseIn: false,
    });
  }

  imageOnLoad(e) {
    const { width, height } = e.target;
    this.setState({ width, height });
  }

  toggleClick() {
    this.setState({
      isClicked: !this.state.isClicked,
    });
  }

  render() {
    const { isMouseIn, isClicked, width, height } = this.state;
    const { 
      imgSrc, 
      imgAlt = { back: '', front: '' }, 
      enableHover = true, 
      enableClick = true, 
      forceFlip = null
    } = this.props;
    const { outBound, front, back, flippingContainer } = this.flipperStyle;
    let { container } = this.flipperStyle;

    container = width ? { ...container, width } : container;
    container = height ? { ...container, height } : container;

    if ( enableHover && forceFlip === null ) {
      container = isMouseIn
                ? {
                    ...container,
                    ...flippingContainer
                  }
                : container;
    }

    if ( enableClick && forceFlip === null ) {
      container = isClicked
                ? {
                    ...container, 
                    ...flippingContainer
                  }
                : container;
    }

    container = forceFlip 
              ? {
                  ...container, 
                  ...flippingContainer
                }
              : container;

    return (
      <div style={outBound} 
           onMouseEnter={enableHover && this.onMouseEnter} 
           onMouseLeave={enableHover && this.onMouseLeave}
           onClick={enableClick && this.toggleClick}>
        <div style={container}>
          <img src={ imgSrc.back } width={width} 
               height={height} alt={imgAlt.back} 
               style={back} onLoad={ this.imageOnLoad } />
          <img src={ imgSrc.front } width={width} 
               height={height} alt={imgAlt.front} 
               style={front} onLoad={ this.imageOnLoad } />
        </div>  
      </div>
    );
  }
}

Flipper.propTypes = {
  flipperStyle: PropTypes.object,
  imgSrc: PropTypes.object,
  imgAlt: PropTypes.object,
  enableHover: PropTypes.bool,
  enableClick: PropTypes.bool,
  forceFlip: PropTypes.bool,
};

export default Flipper;