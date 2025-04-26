const category = require("../models/Category");
const { validateCreatCategory } = require("../validation/CategoryValidation");

async function getAllCategories(req, res, next) {
  const Categories = await category.find();

  if (Categories) {
    res.status(200).json({
      message: "Products has been fetched",
      Data: Categories,
    });
  } else {
    // const Error = new APIError("Couldn't fetching product",400);
    // next(Error);
  }
}
async function getCategorybyId(req, res, next) {
  const { id } = req.params;

  const fetchedcategory = await category.findOne({ _id: id });

  if (fetchedcategory) {
    res.status(200).json({
      message: "Catrgory has been fetched",
      Data: fetchedcategory,
    });
  } else {
    // const Error = new APIError("Couldn't fetching product",400);
    // next(Error);
  }
}

async function createCategory(req, res) {
  const { name } = req.body;

  const found = await category.findOne({ name: name });
  if (found) {
    // const Error = new APIError("The category is already created",409 );
    // next(Error);
    return res.status(409).json({ message: "The category already exists" });
  } else {
    const Added = await category.create({ name });
    if (Added) {
      res.status(201).json({
        message: "category has been Added",
      });
    } else {
      // const Error = new APIError("Couldn't adding category",400);
      // next(Error);
    }
  }
}

async function updateCategory(req, res, next) {
  const { id } = req.params;

  const Edited = await category.updateOne({ _id: id }, { $set: req.body });

  if (Edited.modifiedCount === 1) {
    res.status(200).json({ message: "Category has been Edited" });
  } else {
    const Error = new APIError("Invalid deleting Category",400);
    next(Error);
  }
}
async function deleteCategory(req, res, next) {
  const { id } = req.params;

  const Deleted = await category.deleteOne({ _id: id });
  if (Deleted.deletedCount === 1) {
    res.status(200).json({ message: "Category has been deleted" });
  } else {
    // const Error = new APIError("Invalid deleting Category",400);
    // next(Error);
  }
}

module.exports = {
  getAllCategories,
  getCategorybyId,
  createCategory,
  updateCategory,
  deleteCategory,
};
