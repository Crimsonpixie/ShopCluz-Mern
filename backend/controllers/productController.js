import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

const getProducts = asyncHandler(async (req, res) => {
	const pageSize = 8;
	const page = Number(req.query.pageNumber) || 1;
	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: "i",
				},
		  }
		: {};
	const count = await Product.countDocuments({ ...keyword });
	const products = await Product.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1));
	res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

const getTopProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({}).sort({ rating: -1 }).limit(3);
	res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		res.json(product);
	} else {
		res.status(404).json({ message: "Product not found" });
	}
});

const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		await product.remove();
		res.json({ message: "Product removed successfully" });
	} else {
		res.status(404).json({ message: "Product not found" });
	}
});

const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: "Sample name",
		price: 0,
		user: req.user._id,
		image: "/images/sample.jpg",
		brand: "Sample brand",
		category: "Sample category",
		description: "Sample description",
		countInStock: 0,
		numReviews: 0,
	});
	const newProduct = await product.save();
	res.status(201).json(newProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
	const { name, price, description, image, brand, category, countInStock } =
		req.body;
	const product = await Product.findById(req.params.id);
	if (product) {
		product.name = name;
		product.price = price;
		product.description = description;
		product.image = image;
		product.category = category;
		product.brand = brand;
		product.countInStock = countInStock;

		const updatedProduct = await product.save();
		res.json(updatedProduct);
	} else {
		res.status(404).json({ message: "Product not found" });
	}
});

const addReviews = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body;
	const product = await Product.findById(req.params.id);
	if (product) {
		const alreadyReviewed = product.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
		);
		console.log(alreadyReviewed);
		if (alreadyReviewed) {
			res.status(400);
			throw new Error("Product already reviewed");
		}
		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		};
		product.reviews.push(review);
		product.numReviews = product.reviews.length;
		product.rating =
			product.reviews.reduce((acc, item) => acc + item.rating, 0) /
			product.reviews.length;
		await product.save();
		res.status(201).json({ message: "Review added" });
	} else {
		res.status(404).json({ message: "Product not found" });
	}
});

export {
	getProducts,
	getTopProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
	addReviews,
};
