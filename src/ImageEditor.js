import React, { Component } from "react";

class ImageEditor extends Component {
    constructor (props) {
        super(props);
        this.state = {}
    }
  render() {
    return (
      <div>
        <p>{this.props.uploadedFile.name}</p>
        <img src={this.props.uploadedFileCloudinaryUrl} />
      </div>
    );
  }
}

export default ImageEditor;
