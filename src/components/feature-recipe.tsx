
import { ArrowRight, Sprout } from 'lucide-react-native';
import { ImageBackground, Pressable, Text, View } from 'react-native';
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

const FeatureRecipe = () => {
    const getIngredients = (ing: string[]) => {
        if (ing.length > 3) {
            return ing.slice(0, 3).join(', ') + ' and more.';
        } else {
            return ing.join(', ');
        }


    }
    return (
        <View className="w-full overflow-hidden rounded-[20px] bg-[#F3E8D5]">

            {/* Drink photography */}
            <ImageBackground
                source={{ uri: dummy.image }}
                resizeMode="cover"
                style={{ height: 302, width: '100%' }}
            >
                {/* Alcohol-free badge */}
                <View className="absolute left-4 top-4 flex-row items-center gap-[5px] rounded-full bg-[#FAF5EC] px-3 py-2">
                    <Sprout size={12} color="#864332" strokeWidth={1.6} />
                    <Text className="font-inter-bold text-[9px] text-[#864332]">
                        {dummy.difficulty}
                    </Text>
                </View>
            </ImageBackground>

            {/* Drink details */}
            <View className="gap-[10px] p-5">
                <Text
                    className="font-display text-[25px] leading-[28px] text-[#3F2E24]"
                    numberOfLines={2}
                >
                    {dummy.name}
                </Text>

                <Text className="font-inter text w-4/5 leading-[18px] text-[#796451]">
                    {getIngredients(dummy.ingredients)}
                </Text>

                {/* Recipe action */}
                <View className="flex-row items-center justify-between pt-1">
                    <Text className="font-inter text-md text-[#796451] ">
                        {dummy.prepTimeMinutes} min | {dummy.ingredients.length} ingredients
                    </Text>

                    <Pressable
                        // onPress={onPress}
                        accessibilityRole="button"
                        accessibilityLabel={`View ${dummy.name} recipe`}
                        className="h-[42px] w-[42px] items-center justify-center rounded-full bg-[#864332] active:opacity-80"
                    >
                        <ArrowRight size={25} color="#FAF5EC" strokeWidth={2} />
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default FeatureRecipe