import { Categories } from "./category.model.js";
export async function createCategory (req, res){
    try {

        const{name}=req.body;
        if(!name || (Array.isArray(name) && name.length===0 )) {
            return res.status(400).json({
                message:"name of the category is missing"
            });
        }

        const namesArray = Array.isArray(name)? name:[name];
        
        // Trim and remove empty/duplicate names
        const trimmedNames = [...new Set(
        namesArray.map(n => n.trim()).filter(n => n !== "")
        )];

        if(trimmedNames.length === 0){
            return res.status(400).json({
                message:"no valid name category provided",
            })
        }

        const existingCategories = await Categories.find({ name: { $in: trimmedNames } });
        const existingNames = existingCategories.map(n => n.name);

        const newNames = trimmedNames.filter(name=>!(existingNames).includes(name))

        const categoriesToInsert = newNames.map(n => ({ name: n }));

        let createdCategories = [];
        if (categoriesToInsert.length > 0) {
        createdCategories = await Categories.insertMany(categoriesToInsert);
        }

        res.status(200).json({
            success:true,
            message:"category created successfully",
            createdCategories
        })
        
    } catch (error) {
        console.log("error while create category:",error)
        res.status(500).json({
            message:"error while create category ",
            error
        })
    }
}

export async function getAllCategory (req, res){
    try {

       const categories = await Categories.find();//return an array
       console.log(`categories: ${categories}`)
       res.status(200).json({
        message:"categories fetched successfully",
        categories
       })
        
    } catch (error) {
        console.log("error while fetching all categories:",error)
        res.status(500).json({
            message:"error while fetching all categories ",
            error
        })
    }
}