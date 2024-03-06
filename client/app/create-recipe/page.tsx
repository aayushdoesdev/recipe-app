"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useGetUserID } from "@/hooks/useGetUserID";
import axios from "axios";

const page = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:4000/recipes/create",
        { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Recipe Created");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex justify-center mt-12">
      <Card className="w-[350px] flex flex-col justify-center">
        <CardHeader>
          <CardTitle>Create your Recipes!</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={recipe.name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Description</Label>
                <Input
                  id="description"
                  name="description"
                  value={recipe.description}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Ingredients</Label>
                <Input
                  id="ingredients"
                  name="ingredients"
                  value={recipe.ingredients}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Instructions</Label>
                <Input
                  id="instructions"
                  name="instructions"
                  value={recipe.instructions}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Image Url</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={recipe.imageUrl}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Cooking Time</Label>
                <Input
                  id="cookingTime"
                  name="cookingTime"
                  value={recipe.cookingTime}
                  onChange={handleChange}
                />
              </div>
            </div>
            <CardFooter className="mt-5 flex justify-center">
              <Button type="submit">Create</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default page;
