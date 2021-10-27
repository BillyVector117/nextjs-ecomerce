import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    /*  id: { type: String, required: false },  */
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: false, default: "https://static.wikia.nocookie.net/residentevil/images/0/08/Tricell.jpg/revision/latest/scale-to-width-down/350?cb=20110304143336&path-prefix=es" },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true, default: 0 },
},
    { timestamps: true }
)
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
