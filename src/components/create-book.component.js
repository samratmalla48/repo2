import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateBook extends Component {
  constructor(props) {
    super(props);

    this.onChangeAuthorname = this.onChangeAuthorname.bind(this);
    this.onChangeCategoryname= this.onChangeCategoryname.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeBookname = this.onChangeBookname.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      authorname: '',
      categoryname: '',
      description: '',
      bookname: '',
      duration: 0,
      date: new Date(),
      authors: [],
      categorys: [],
      image:'',
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/authors/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            authors: response.data.map(author => author.authorname),
            authorname: response.data[0].authorname
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })


    axios.get('https://backend-hepw.onrender.com/categorys/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            categorys: response.data.map(category => category.categoryname),
            categoryname: response.data[0].categoryname
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeAuthorname(e) {
    this.setState({
      authorname: e.target.value
    })
  }
  onChangeCategoryname(e) {
    this.setState({
      categoryname: e.target.value
    })
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeImage(e) {
    console.log(e.target.files[0])
    this.setState({
      image: e.target.files[0]
    })
  }

  onChangeBookname(e) {
    this.setState({
      bookname : e.target.value
    })
  }
  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const book = {
      authorname: this.state.authorname,
      categoryname: this.state.categoryname,
      description: this.state.description,
      bookname: this.state.bookname,
      duration: this.state.duration,
      date: this.state.date,
      image: this.state.image,
    }

    console.log(book.image);

    axios.post('https://backend-hepw.onrender.com/books/add', book)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Create New Book Log</h3>
      <form onSubmit={this.onSubmit} method="post" encType="multipart/form-data">
      <div className="form-group"> 
<label>Authorname: </label>
<select ref="authorInput"
    required
    className="form-control"
    value={this.state.authorname}
    onChange={this.onChangeAuthorname}>
    {
      this.state.authors.map(function(author) {
        return <option 
          key={author}
          value={author}>{author}
          </option>;
      })
    }
</select>
</div>
        <div className="form-group"> 
        <label>Categoryname: </label>
        <select ref="categoryInput"
            required
            className="form-control"
            value={this.state.categoryname}
            onChange={this.onChangeCategoryname}>
            {
              this.state.categorys.map(function(category) {
                return <option 
                  key={category}
                  value={category}>{category}
                  </option>;
              })
            }
        </select>
      </div>
      <div className="form-group"> 
          <label>Bookname: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.bookname}
              onChange={this.onChangeBookname}
              />
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        
        <div className="form-group"> 
          <label>Image: </label>
          <input  type="file"
           
              name="image"
              className="form-control"
              onChange={this.onChangeImage}
              />
        </div>

        <div className="form-group">
          <label>Price: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Publication date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Book Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
