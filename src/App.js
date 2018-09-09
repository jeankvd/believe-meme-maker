import React, { Component } from "react";
import Dropzone from "react-dropzone";
import request from "superagent";
import "./App.css";

import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  RedditShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
  ViberShareButton,
  WorkplaceShareButton,
  EmailShareButton,
} from 'react-share';

import EditorContainer from "./EditorContainer";

import ReactGA from "react-ga";
ReactGA.initialize("UA-125435659-1");
ReactGA.pageview(window.location.pathname + window.location.search);

const CLOUDINARY_UPLOAD_PRESET = "fvsr5jia";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/dub9ykyuq/upload";

/*
"http://res.cloudinary.com/dub9ykyuq/image/upload/v1536293773/20847751_wonwxg.jpg";
*/

let shareUrl = "https://github.com/nygardk/react-share";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFileCloudinaryUrl:
        ""
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
    let uri = response.body.secure_url;
        this.setState({
          uploadedFileCloudinaryUrl: uri
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

      <div className="container">
        <div className="intro">
          <h2>Hey! Here are some pointers to use this app to its fullest</h2>

          <ul>
            <li>Drop an image or click on the box to select an image, then use the text editor to add content to the image.</li>
            <li>I recommned using text shadow first and only using text background when the contrast is too low</li>
            <li>Images will resize to roughly the same size as the original ad</li>
            <li>Any Feedback is welcome at my twitter <a href="https://twitter.com/jeankvd">@jeankvd</a> </li>
            <li>If you like this app, please share it 🤗😃</li>
          </ul>
        </div>

          <TwitterShareButton url={shareUrl} />
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
