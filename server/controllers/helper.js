import main from "../configs/gemini.js";

export const generatecontent = async (req,res)=>{
  try {
    const {prompt} = req.body;
    const content = await main(prompt+ `You are a cooking assistant. Given the name of a dish and its ingredients, categorize the ingredients into: Fruits, Vegetables, Masalas (Spices), and Other Ingredients.

✅ Only include a category if it has ingredients used in the dish.  
❌ Do not mention categories with no ingredients.  
✅ mention what is optional 
✅ Format the output like:

To Prepare: <Dish Name> 

you need:

Fruits:
- Item 1
- Item 2

Masalas (Spices):
- Item 1

Other Ingredients:
- Item 1
- Item 2
`)
    res.json({success: true, content})
  } catch (error) {
    res.json({success: false, message: error.message})   
  }
}