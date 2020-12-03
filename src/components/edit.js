import React from 'react';
import axios from 'axios';
class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeMovieName = this.onChangeMovieName.bind(this);
        this.onChangeMovieYear = this.onChangeMovieYear.bind(this);
        this.onChangeMoviePoster = this.onChangeMoviePoster.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            Title: '',
            Year: '',
            Poster: ''
        }
    }
    onChangeMovieName(e) {
        this.setState({
            Title: e.target.value
        });
    }
    onChangeMovieYear(e) {
        this.setState({
            Year: e.target.value
        })
    }
    onChangeMoviePoster(e) {
        this.setState({
            Poster: e.target.value
        })
    }
    componentDidMount() {
        axios.get('http://localhost:4000/api/movies/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    _id: response.data._id,
                    Title: response.data.title,
                    Year: response.data.year,
                    Poster: response.data.poster
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    onSubmit(e) {
        e.preventDefault();
        console.log(`button clicked
${this.state.Title},
${this.state.Year},
${this.state.Poster}`);
        this.setState({
            Title: '',
            Year: '',
            Poster: ''
        })
        const newMovie = {
            title: this.state.Title,
            year: this.state.Year,
            poster: this.state.Poster
        };
        axios.put('http://localhost:4000/api/movies/' + this.state._id, newMovie)
            .then(res => console.log(res.data));
    }
    render() {
        return (
            <div className="App">
                <h2>This is the Create component.</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Add Movie Name: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.Title}
                            onChange={this.onChangeMovieName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Add Release Year: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.Year}
                            onChange={this.onChangeMovieYear}
                        />
                    </div>
                    <div className="form-group">
                        <label>Add Poster Url: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.Poster}
                            onChange={this.onChangeMoviePoster}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Movie" className="btn btn-primary" />
                    </div>
                </form>
            </div >
        );
    }
}
export default Edit;