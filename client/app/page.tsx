"use client"

import React, { useEffect, useState } from "react";
import { useGetUserID } from "@/hooks/useGetUserID";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID();

  const fetchRecipes = async() =>{
    try {
      const response = await axios.get("http://localhost:4000/recipes/")
      setRecipes(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchSavedRecipes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/recipes/savedRecipes/ids/${userID}`
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRecipes()
    fetchSavedRecipes()
  },[])

  const saveRecipe = async (recipeID: any) => {
    try {
      const response = await axios.put("http://localhost:4000/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };
  {/* @ts-ignore */}
  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
   <main>
      <div className="text-center text-5xl font-bold mt-4">
        <h1>Recipes</h1>
      </div>
      <ul className="flex flex-wrap justify-center gap-12 mt-8">
        {recipes.map((recipe) => (
          //@ts-ignore
          <li key={recipe._id}>
            <Card className="max-w-[350px]">
          <CardHeader>
            {/* @ts-ignore */}
            <CardTitle>{recipe.name}</CardTitle>
            {/* @ts-ignore */}
            <CardDescription>{recipe.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {/* @ts-ignore */}
            <Image src={recipe.imageUrl} alt="img" width={280} height={50} />
          </CardContent>
          <CardContent>
            {/* @ts-ignore */}
            <p>{recipe.instruction}</p>
          </CardContent>
          <CardContent>
            {/* @ts-ignore */}
            <p>Cooking Time: {recipe.cookingTime} mins</p>
          </CardContent>
          <CardFooter>
            {/* @ts-ignore */}
            <Button onClick={() => saveRecipe(recipe._id)}
            //@ts-ignore
            disabled={isRecipeSaved(recipe._id)}>
              {/* @ts-ignore */}
              {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
            </Button>
          </CardFooter>
        </Card>
          </li>
        ))}
      </ul>
   </main>
  );
}
