import React, { Component } from "react";
import Dropzone from "react-dropzone";
import request from "superagent";
import ImageEditor from "./ImageEditor";
import Nike from "./Nike";

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
      withBgColor: false,
      position: ""
    };
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleOnChange = evt => {
    this.setState({
      [evt.target.name]:
        evt.target.type === "checkbox" ? evt.target.checked : evt.target.value
    });
  };

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
        <link
          href="https://fonts.googleapis.com/css?family=Nunito:400,700,800,900"
          rel="stylesheet"
        />

        <div className="nav">
          <h1>Believe in Something Meme Generator</h1>
          <p>Made By <a style={{color: "inherit"}} href="https://twitter.com/jeankvd">@jeankvd</a></p>
        </div>

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
            <div className="edit-container">
              <div
                id="edit-img"
                style={{
                  backgroundImage: `url('https://avatars0.githubusercontent.com/u/20847751?s=460&v=4')`
                }}
                alt=""
              >
                <div className="edit-text" style={{}}>
                  <h2>
                    <span
                      style={{
                        background: this.state.withBgColor ? "black" : "none"
                      }}
                    >
                      {this.state.topline}
                    </span>
                  </h2>
                  <h2>
                    <span
                      style={{
                        background: this.state.withBgColor ? "black" : "none"
                      }}
                    >
                      {this.state.bottomline}
                    </span>
                  </h2>
                </div>
                <div className="edit-logo">
                  <h2
                    style={{
                      background: this.state.withBgColor ? "black" : "none"
                    }}
                  >
                    Just Do It <Nike />
                  </h2>
                </div>
              </div>
              <div className="inputs">
                <h2>Edit The Text</h2>
                <div className="input">
                  <input
                    type="text"
                    name="topline"
                    id="topline"
                    onChange={this.handleOnChange}
                    value={this.state.topline}
                    placeholder="Top Line"
                  />
                </div>
                <div className="input">
                  <input
                    type="text"
                    name="bottomline"
                    id="bottomline"
                    onChange={this.handleOnChange}
                    value={this.state.bottomline}
                    placeholder="Bottom Line"
                  />
                </div>
                <div className="input">
                  <label htmlFor="checkbox">Dark Text Background</label>
                  <input
                    type="checkbox"
                    name="withBgColor"
                    id="withBgColor"
                    onChange={this.handleOnChange}
                    value={this.state.withBgColor}
                  />
                </div>
                <a href="#">Download the Image</a>
                {/* <select
                  name="position"
                  id="position"
                  onChange={this.handleOnChange}
                  value={this.state.position}
                >
                  <option value="Top">Top</option>
                  <option value="Center">Center</option>
                  <option value="Bottom">Bottom</option>
                </select> */}
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
