import bookModel from "../Models/book-model.js";

export const insertBook = async (req, res) => {
  try {
    //check image
    let file = "N/A";
    if (req.file) {
      file = req.file.filename;
    }
    const data = req.body;
    const newBook = new bookModel({
      ISBN_No: data.isbn,
      Book_name: data.name,
      Author: data.author,
      Description: data.description,
      Qty: data.qty,
      Price: data.price,
      Book_image: file,
    });

    const insertbook = await newBook.save();
    if (insertbook) {
      const refresh = await bookModel.find();
      res.status(201).json({
        message: "Book inserted successfully..!",
        payload: refresh,
      });
    } else {
      res.status(400).json({
        message: "Somthing went wrong in book inserting..!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Not Responding..!",
      error: error,
    });
  }
};

export const fetchBooks = async (req, res) => {
  try {
    const allbooks = await bookModel.find();
    if (allbooks) {
      res.status(200).json({
        message: "Books fetched successsfully..!",
        payload: allbooks,
      });
    } else {
      res.status(400).json({
        message: "Somthing went wrong in book fetching..!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Not Responding..!",
      error: error,
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    console.log(req.body)
    const success = await bookModel.findOneAndDelete({ _id: req.body.id });
    if (success) {
      const refresh = await bookModel.find();
      res.status(200).json({
        message: "Books deleted successfully..!",
        payload: refresh,
      });
    } else {
      res.status(400).json({
        message: "Somthing went wrong in book deleting..!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Not Responding..!",
      error: error,
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    let file = "N/A";
    if (req.file) {
      file = req.file.filename;
    }

    const data = req.body;
    const id = data.id;

    console.log(data)

    const newbook = {
      ISBN_No: data.isbn,
      Book_name: data.name,
      Author: data.author,
      Description: data.description,
      Qty: data.qty,
      Price: data.price,
      Book_image: file,
    };
    const update = await bookModel.findByIdAndUpdate(id, newbook, {
      new: true,
    });

    if (update) {
      const refresh = await bookModel.find();
      res.status(201).json({
        message: "Book updated successfully..!",
        payload: refresh,
      });
    } else {
      res.status(400).json({
        message: "Somthing went wrong in book updating..!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Not Responding..!",
      error: error,
    });
  }
};
