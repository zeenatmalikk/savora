import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Chip from './shared/chip';
import RecipeCard from './shared/recipe-card';
const categories = [
    'All Recipes',
    'Breakfast',
    'Lunch',
    'Dinner',
    'Desserts',
];
const MealType = () => {
    const [selectedCategory, setSelectedCategory] =
        useState('All Recipes');
    return (
        <View className='mt-8'>
            <Text className='section-title'>Meal Type</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    gap: 10,
                }}
            >
                {categories.map((category) => (
                    <Chip
                    variant='filled'
                        key={category}
                        label={category}
                        selected={selectedCategory === category}
                        onPress={() => setSelectedCategory(category)}
                    />
                ))}
            </ScrollView>
            <ScrollView horizontal className='mt-7' showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 20 }}>
                {
                    Array.from({ length: 5 }).map((_, i) => (
                        <RecipeCard key={i} />
                    ))
                }
            </ScrollView>
        </View>
    )
}

export default MealType