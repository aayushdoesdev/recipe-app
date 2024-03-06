"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import axios from "axios";
import { useGetUserID } from "@/hooks/useGetUserID";
import { useEffect, useState } from "react";
import Image from "next/image";


const page = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, []);
  return (
    <section >
      <ul className="flex flex-wrap justify-center items-center gap-5">
      {savedRecipes.map((recipe) => (
        <li>
          <Card className="w-[350px]">
            <CardHeader>
              {/* @ts-ignore */}
              <CardTitle>{recipe.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* @ts-ignore */}
              <p>{recipe.description}</p>
            </CardContent>
            <CardContent>
              {/* @ts-ignore */}
              <Image src={recipe.imageUrl} alt="img" width={280} height={50}/>
            </CardContent>
            <CardContent>
              {/* @ts-ignore */}
              <p>{recipe.cookingTime} minutes</p>
            </CardContent>
          </Card>
        </li>
      ))}
      </ul>
    </section>
  );
};

export default page;
