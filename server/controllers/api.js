const Movie = require("../models/movies");
const fs = require("fs");

module.exports = class API {
  //fetch all movies
  static async fetchAllMovies(req, res) {
    try {
      const movies = await Movie.find();
      res.status(200).json(movies);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  //fetch movie by ID
  static async fetchMovieById(req, res) {
    const id = req.params.id;
    try {
      const movie = await Movie.findById(id);
      res.status(200).json(movie);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  //create a movie
  static async createMovie(req, res) {
    const movie = req.body;
    const imagename = req.file.filename;
    movie.image = imagename;
    try {
      await Movie.create(movie);
      res.status(201).json({ message: "Post created successfully!" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  //update movie
  static async updateMovie(req, res) {
    const id = req.params.id;
    let new_image = "";
    if (req.file) {
      new_image = req.file.filename;
      try {
        fs.unlinkSync("./uploads/" + req.body.old_image);
      } catch (err) {
        console.log(err);
      }
    } else {
      new_image = req.body.old_image;
    }
    const newMovie = req.body;
    newMovie.image = new_image;
    try {
      await Movie.findByIdAndUpdate(id, newMovie);
      res.status(200).json({ message: "Movie updated successfully!" });
    } catch (error) {
      res.status(404).json({ message: err.message });
    }
  }
  //delete movie
  static async deleteMovie(req, res) {
    const id = req.params.id;
    try {
      const result = await Movie.findByIdAndDelete(id);
      if (result.image != "") {
        try {
          fs.unlinkSync("./uploads/" + result.image);
        } catch (error) {
          console.log(error);
        }
      }
      res.status(200).json({ message: "Post deleted successfully!" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
};
