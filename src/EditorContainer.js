import React, { Component } from "react";
import html2canvas from "html2canvas";
import logo from "./logo.png";

//Creating dynamic link that automatically click
function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
    //after creating link you should delete dynamic link
    //clearDynamicLink(link);
    // "http://res.cloudinary.com/dub9ykyuq/image/upload/e_grayscale/v1536293773/20847751_wonwxg.jpg"
  }

class EditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        topline: "",
        bottomline: "",
        withBgColor: false,
        position: ""
    };
  }

  handleOnChange = evt => {
    this.setState({
      [evt.target.name]:
        evt.target.type === "checkbox" ? evt.target.checked : evt.target.value
    });
  };

  handleDownload = () => {
    let meme = document.querySelector("#edit-img");

    html2canvas(meme, {
      logging: true,
      useCORS: true
    }).then(canvas => {
      let myImage = canvas.toDataURL("image/png");
      downloadURI("data:" + myImage, "yourImage.png");
    });
  };

  render() {
    return (
      <div className="edit-container">
        <div
          crossOrigin="Anonymous"
          id="edit-img"
          style={{
            backgroundImage: `url(${this.props.uploadedFileCloudinaryUrl})`
          }}
          alt=""
        >
          <div className="edit-text" style={{}}>
            <h2>
              <span
                style={{
                    textShadow: this.state.withBgColor ? "3px 3px 12px black" : "none"
                }}
              >
                {this.state.topline}
              </span>
            </h2>
            <h2>
              <span
                style={{
                  textShadow: this.state.withBgColor ? "3px 3px 12px black" : "none"
                }}
              >
                {this.state.bottomline}
              </span>
            </h2>
          </div>
          <div className="edit-logo">
            <h2
              style={{
                textShadow: this.state.withBgColor ? "3px 3px 12px black" : "none"
              }}
            >
              Just Do It{" "}
              <img
                style={{
                  width: 35
                }}
                crossOrigin="Anonymous"
                src={logo}
                alt=""
              />
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
          <a href="#" onClick={this.handleDownload}>
            Download the Image
          </a>
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
    );
  }
}

export default EditorContainer;
