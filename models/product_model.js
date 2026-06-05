// //ti create a schema
// const mongoose=require('mongoose')
// let productschema=new mongoose.Schema(
//     {
//         title:{type:String,require:true},
//         image:{type:String,require:true},
//         price:{type:Number,require:true}
//     }
// )
// //we will create a model
// let products=mongoose.model('products',productschema)//(table name,schema name)

// //export the model
// module.exports=products;

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title:  { type: String, required: true },
  price:  { type: Number, required: true },
  image:  { type: String, required: true },
  description: { type: String },
  category:    { type: String },
  rating: {
    rate:  { type: Number },
    count: { type: Number }
  }
}, { timestamps: true });

module.exports = mongoose.model('products', productSchema);
module.exports=products;