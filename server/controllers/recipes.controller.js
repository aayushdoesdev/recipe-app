import { recipes } from "../models/recipes.js";
import { users } from "../models/users.js";

export const getRecipes = async (req, res) => {
  try {
    const response = await recipes.find({});
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createRecipe = async (req, res) => {
  try {
    const recipe = new recipes(req.body);
    await recipe.save();
    res.json(recipe);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const saveRecipes = async (req, res) => {
  const recipe = await recipes.findById(req.body.recipeID);
  const user = await users.findById(req.body.userID);
  try {
    user.savedRecipes.push(recipe);
    await user.save();
    res.status(201).json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.status(500).json(err);
  }
};



export const recipeID = async (req, res) => {
    try{
        const user = await users.findById(req.params.userID);
        const savedRecipes = await recipes.find({
            _id: {$in: user.savedRecipes},
        })
        
        res.status(201).json({savedRecipes: user?.savedRecipes})
    }catch(err){
        res.status(500).json(err)
    }
};

export const getsavedRecipes = async (req, res) => {
  try {
    const user = await users.findById(req.params.userID);
    const savedRecipes = await recipes.find({
      _id: { $in: user.savedRecipes },
    });

    console.log(savedRecipes);
    res.status(201).json({ savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

