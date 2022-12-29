import Products from "../models/ProductModel.js"

export const getProducts = async(req, res) =>{
    try {
        let response;
        response = await Products.findAll();
        console.log(response)
        res.status(201).send(response)

        return response
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
   

}

export const getProductById = (req, res) =>{
    
}
export const createProduct = async(req, res) =>{
    const{name, price} = req.body
    try {
        await Products.create({
            name:name,
            price:price,
            
        }

        );

        res.status(201).json({msg: "product created succesfully"})
        
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const updateProducts = async(req, res) =>{
        try {
            const product = await Products.findOne();
            if(!product) return res.status(404).json({msg: "product not found"})
            const{name, price} = req.body
            await Products.update({name, price},{
                where:{
                    id : product.id
                }
            })
            res.status(200).json({msg: "Product succesfully updated!"})
            // return product;
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
}

export const deleteProducts = async(req, res) =>{
    try {
        const product = await Products.findOne(
            {
                where:
                {
                    uuid:req.params.id
                }
            }
        );
        if(!product) return res.status(404).json({msg: "product not found"})
        const{name, price} = req.body
        await Products.destroy({
            where:{
                id : product.id
            }
        })
        res.status(200).json({msg: "Product deleted sucessfully!"})
        // return product;
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}