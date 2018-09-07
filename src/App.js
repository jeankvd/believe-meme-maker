import React, { Component } from "react";
import Dropzone from "react-dropzone";
import request from "superagent";
import ImageEditor from "./ImageEditor";
import Nike from './Nike';

import "./App.css";

const CLOUDINARY_UPLOAD_PRESET = "fvsr5jia";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/dub9ykyuq/upload";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFileCloudinaryUrl: "",
      topline: "",
      bottomline: "",
    };
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== "") {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }

  render() {
    return (
      <div>
        <link href="https://fonts.googleapis.com/css?family=Nunito:400,700,800,900" rel="stylesheet"></link>
        <div className="FileUpload">
          <Dropzone
            multiple={false}
            accept="image/*"
            onDrop={this.onImageDrop.bind(this)}
          >
            <p>Drop an image or click to select a file to upload.</p>
          </Dropzone>
        </div>

        <div>
          {this.state.uploadedFileCloudinaryUrl === "" ? (
            <div>
            <div
              id="edit-img"
              style={{
                backgroundImage: `url('https://avatars0.githubusercontent.com/u/20847751?s=460&v=4')`
              }}
              alt=""
            >
              <div className="edit-text">
                <h2>{this.state.topline}</h2>
                <h2>{this.state.bottomline}</h2>
              </div>
              <div className="edit-logo">
                <h2>Just Do It <Nike/></h2>
              </div>
            </div>
            <div className="inputs">
              <input type="text" name="topline" id="topline" value={this.state.topline}/>
              <input type="text" name="bottomline" id="bottomline" value={this.state.bottomline}/>
            </div>
            </div>
          ) : (
            <ImageEditor
              uploadedFile={this.state.uploadedFile}
              uploadedFileCloudinaryUrl={this.state.uploadedFileCloudinaryUrl}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
