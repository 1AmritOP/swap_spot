import mongoose, { model, models } from "mongoose";

export interface IProduct {
  price: number;
  img: string;
  name: string;
  details: string;
  contactDetail: number; // or string
  sellerUsername: string;
  location: string;
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    price: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    contactDetail: {
      type: Number,
      required: true,
    },
    sellerUsername: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


const Product=models?.Product || model<IProduct>("Product",productSchema)

export default Product;