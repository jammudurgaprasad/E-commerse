//EComcontroller.js
const Products = require('../models/Product')

module.exports.getProduct = async(req,res) =>{
    const product = await Products.find();
    res.send(product)
}


module.exports.saveProduct = async (req, res) => {
        try{
            const {
                category, 
                subcategory,
                subsubcategory,
                weartype,
                sizes,
                brandname,
                title,
                actualprice,
                discount,
                finalprice,
                minquantity,
                images,
                description} = req.body;
            const product = Products.create({category,subcategory,subsubcategory,weartype,sizes,brandname,title,actualprice,discount,finalprice,minquantity,images,description})
            res.json(product)
    }
    catch(err){
        console.log(err)
    }

};

module.exports.updateProduct = async (req, res) => {
    const {
        _id,
        category, 
        subcategory,
        subsubcategory,
        weartype,
        sizes,
        brandname,
        title,
        actualprice,
        discount,
        finalprice,
        minquantity,
        images,
        description
    } = req.body;
    
    try {
        const updatedProduct = await Products.findByIdAndUpdate(
            _id,
            {
                category, 
                subcategory,
                subsubcategory,
                weartype,
                sizes,
                brandname,
                title,
                actualprice,
                discount,
                finalprice,
                minquantity,
                images,
                description
            },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating product....." });
    }
};
module.exports.deleteProduct = async (req, res) => {
    const { _id } = req.params;
  
    try {
      const deletedProduct = await Products.findByIdAndDelete(_id);
  
      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      res.status(200).json({ message: "Deleted successfully..." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error deleting product" });
    }
  };
  

// module.exports.getProductDetails = async (req,res) =>{
//     try{
//         const {_id} = req.params;
//         const product = Products.findById(_id);

//         if (!product) {
//             return res.status(404).json({ error: "Product not found" });
//         }

//         res.status(200).json(product);
//     }catch(err){
//         console.error(err);
//         res.status(500).json({ error: "Error fetching product details" });
//     }
// }


module.exports.getProductDetails = async (req, res) => {
    try {
        const { _id } = req.params; // Get product ID from request parameters
        if (!_id) {
            return res.status(400).json({ error: "Product ID is required" });
        }

        const product = await Products.findById(_id).lean(); // Convert to plain JSON object

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching product details" });
    }
};
