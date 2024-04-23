const { modelsDB } = require('../config/db');

const Product = modelsDB.products;
const Review = modelsDB.reviews;

const addProduct = async (req, res) => {
    try {

        let info = {
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            published: req.body.published ? req.body.published : false
        }

        const product = await Product.create(info)
        res.status(200).send(product)
    } catch (err) {
        res.status(500).send("internel server error")
    }
}

const getProduct = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 8;
        const offset = (page - 1) * limit;

        let products = await Product.findAll({
            order: [['createdAt', 'ASC']], // Sort by createdAt in descending order
            // limit: limit,
            // offset: offset
        });

        return res.status(200).json({
            success: true,
            products,
            limit: req.query.limit
        });
    } catch (err) {
        res.status(500).send("internel server error")
    }
}


const getSingle = async (req, res) => {
    try {
        let id = req.params.id

        let product = await Product.findOne({ where: { id: id } })

        return res.status(200).json({
            success: true,
            product
        });
    } catch (err) {
        res.status(500).send("internel server error")
    }
}

const updateProduct = async (req, res) => {
    try {
        let id = req.params.id

        let product = await Product.update(req.body, { where: { id: id } })

        return res.status(200).json({
            success: true,
            product
        });
    } catch (err) {
        res.status(500).send("internel server error")
    }
}


const destroyProduct = async (req, res) => {
    try {
        let id = req.params.id
        await Product.destroy({ where: { id: id } })
        return res.status(200).send('Product is deleted !')
    } catch (err) {
        res.status(500).send("internel server error")
    }
}


const addReview = async (req, res) => {
    try {
        const id = req.params.id;

        let data = {
            product_id: id,
            rating: req.body.rating,
            description: req.body.description
        };

        const review = await Review.create(data);
        return res.status(200).send("Review has been added.");
    } catch (err) {
        return res.status(500).send("Internal server error: " + err);
    }
};


const getAllReviews = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Product.findAll({
            include: [{
                model: Review,
                as: 'review'
            }]
        })

        res.status(200).send(data)
    } catch (err) {
        return res.status(500).send("Internal server error: " + err);
    }
};

const getPublishedProduct = async (req, res) => {
    try {
        const products =  await Product.findAll({ where: { published: true }})
        res.status(200).send(products)
    } catch (err) {
        return res.status(500).send("Internal server error: " + err);
    }
};

module.exports = { addProduct, getProduct, getSingle, updateProduct, destroyProduct, addReview, getAllReviews, getPublishedProduct }