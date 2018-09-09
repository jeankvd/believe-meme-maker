import React, { Component } from "react";
import Dropzone from "react-dropzone";
import request from "superagent";
import html2canvas from "html2canvas";
import logo from "./logo.png";

import ImageEditor from "./ImageEditor";
import Nike from "./Nike";
import "./App.css";

import EditorContainer from "./EditorContainer";

import ReactGA from "react-ga";
ReactGA.initialize("UA-125435659-1");
ReactGA.pageview(window.location.pathname + window.location.search);

const CLOUDINARY_UPLOAD_PRESET = "fvsr5jia";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/dub9ykyuq/upload";

/* 
  var uri= "http://res.cloudinary.com/dub9ykyuq/image/upload/v1536293773/20847751_wonwxg.jpg";
  var lastslashindex = uri.lastIndexOf('/');
  var result= uri.substring(uri.lastIndexOf('/')).replace("/","/e_grayscale/");
  console.log(result);
  */
class App extends Component {
  constructor(props) {
    super(props);
    let uri = "http://res.cloudinary.com/dub9ykyuq/image/upload/v1536293773/20847751_wonwxg.jpg";
    let result = uri.substring(0, uri.lastIndexOf('/')) + uri.substring(uri.lastIndexOf('/')).replace("/","/e_grayscale/")
    this.state = {
      uploadedFileCloudinaryUrl:
        result
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
        <link
          href="https://fonts.googleapis.com/css?family=Nunito:400,700,800,900"
          rel="stylesheet"
        />

        <div className="nav">
          <h1>Believe in Something Meme Generator</h1>
          <p>
            Made By{" "}
            <a style={{ color: "inherit" }} href="https://twitter.com/jeankvd">
              @jeankvd
            </a>
          </p>
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
          {this.state.uploadedFileCloudinaryUrl === "" ? null : (
            <EditorContainer
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
