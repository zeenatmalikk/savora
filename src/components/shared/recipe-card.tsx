import { Image, Pressable, Text, View } from 'react-native';
const dummy = {
    "id": 1,
    "name": "Classic Margherita Pizza",
    "ingredients": [
        "Pizza dough",
        "Tomato sauce",
        "Fresh mozzarella cheese",
        "Fresh basil leaves",
        "Olive oil",
        "Salt and pepper to taste"
    ],
    "instructions": [
        "Preheat the oven to 475°F (245°C).",
        "Roll out the pizza dough and spread tomato sauce evenly.",
        "Top with slices of fresh mozzarella and fresh basil leaves.",
        "Drizzle with olive oil and season with salt and pepper.",
        "Bake in the preheated oven for 12-15 minutes or until the crust is golden brown.",
        "Slice and serve hot."
    ],
    "prepTimeMinutes": 20,
    "cookTimeMinutes": 15,
    "servings": 4,
    "difficulty": "Easy",
    "cuisine": "Italian",
    "caloriesPerServing": 300,
    "tags": [
        "Pizza",
        "Italian"
    ],
    "userId": 166,
    "image": "https://cdn.dummyjson.com/recipe-images/1.webp",
    "rating": 4.6,
    "reviewCount": 98,
    "mealType": [
        "Dinner"
    ]
}

import { ChefHat, Clock3, Heart, Star } from 'lucide-react-native';
import { useState } from 'react';
type RecipeCardProps = {
    variant?: 'grid' | 'list';
}
const RecipeCard = ({ variant }: RecipeCardProps) => {
      const [isLiked, setIsLiked] = useState(false);

  return (
 <View className={`overflow-hidden rounded-2xl bg-[#F3E8D5] ${
        variant === 'grid' ? 'w-[48%]' : 'w-64'
      }`}>
      {/* Recipe image */}
      <View className="relative">
        <Image
          source={{ uri: dummy.image }}
          resizeMode="cover"
          className="h-44 w-full"
        />

        {/* Rating badge - top left */}
        <View className="absolute left-3 top-3 flex-row items-center gap-1 rounded-full bg-[#FFF8F0] px-2.5 py-1.5">
          <Star size={14} color="#D69A32" fill="#D69A32" />
          <Text className="font-inter-bold text-xs text-[#3F2E24]">
            {dummy.rating}
          </Text>
        </View>

        {/* Like button - top right */}
        <Pressable
          onPress={() => setIsLiked((previous) => !previous)}
          accessibilityRole="button"
          accessibilityLabel={isLiked ? 'Unlike recipe' : 'Like recipe'}
          className="absolute right-3 top-3 h-9 w-9 items-center justify-center rounded-full bg-[#FFF8F0]"
        >
          <Heart
            size={19}
            color={isLiked ? '#C85555' : '#3F2E24'}
            fill={isLiked ? '#C85555' : 'transparent'}
          />
        </Pressable>
      </View>

      {/* Recipe details */}
      <View className="gap-3 p-4">
        <Text
          className="font-display text-xl text-[#3F2E24]"
          numberOfLines={2}
        >
          {dummy.name}
        </Text>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-1.5">
            <Clock3 size={16} color="#796451" />
            <Text className="font-inter text-xs text-[#796451]">
              {dummy.prepTimeMinutes} min
            </Text>
          </View>

          <View className="flex-row items-center gap-1.5">
            <ChefHat size={16} color="#796451" />
            <Text className="font-inter text-xs text-[#796451]">
              {dummy.difficulty}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RecipeCard;

