import React, { Component } from 'react';
import { Upload } from 'antd';
import axios from "axios";
import ImgCrop from 'antd-img-crop';

class AddImage extends Component {

  constructor(props) {
    super(props);

    this.state = {
    fileList: [],
    }
  }

    onChange =({ fileList}) => {
    this.setState({ fileList });
  
    };
 
 doImgUpload = (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const reader = new FileReader();
    reader.readAsDataURL(file); 
    reader.onload = (file) => {
    var base64Image = file.target.result.split(';base64,').pop();
    var mySubString = file.target.result.substring(
    file.target.result.indexOf("/") + 1, 
    file.target.result.indexOf(";")
);
  
         axios.post("https://trulylittlethings.herokuapp.com/uploadImage-api",{imgBase64:base64Image,filename:options.file.name,dir:this.props.src})
        .then( (response) =>{  

        if (response.data.status===true){
        var filepop=this.state.fileList.pop()
        filepop.status="done";
        filepop.url="./resources/productphoto/"+options.file.name;
        var fileListCopy= this.state.fileList.slice(0,);
        fileListCopy.push(filepop);
        this.setState({fileList:fileListCopy});
        }
        else{
         var filepop=this.state.fileList.pop()
        filepop.status="error";
        var fileListCopy= this.state.fileList.slice(0,);
        fileListCopy.push(filepop);
        this.setState({fileList:fileListCopy});
        }
        })
    
      };
      }
  render() {
    const uploadButton = (
      <div>
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <div className="price-page" style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
            <ImgCrop rotate={true} aspect={this.props.ratio} >
        <Upload
        customRequest={this.doImgUpload}
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        fileList={this.state.fileList}
        showUploadList={true}
        onChange={this.onChange}

      >
        { uploadButton}
      </Upload>
    </ImgCrop>
     
      </div>

    )
  }
}
export default AddImage;