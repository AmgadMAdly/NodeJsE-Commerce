const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    minlength: 3, 
    maxlength: 255 
  },
  description: { 
    type: String, 
    default: '', 
    required: false 
  },
  price: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  quantity: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  image: { 
    type: String, 
    default: '', 
    required: false 
  },
  categoryId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
