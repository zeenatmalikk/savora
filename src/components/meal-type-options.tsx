import { CakeSlice, Cookie, CookingPot, Egg, Martini, Salad } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

const MealTypeOptions = () => {
    const categories = [{ name: 'Breakfast', icon: <Egg size={26} color={'#864332'} /> }, { name: 'Lunch', icon: <Salad size={26} color={'#864332'} /> }, { name: 'Dinner', icon: <CookingPot size={26} color={'#864332'} /> }, { name: 'Desserts', icon: <CakeSlice size={26} color={'#864332'} /> }, { name: 'Snacks', icon: <Cookie size={26} color={'#864332'} /> }, { name: 'Drinks', icon: <Martini size={26} color={'#864332'} /> }];

    return (
        <View>
            <Text className='section-title'>
                Every kind of moment.
            </Text>
            <View className="flex-row flex-wrap justify-between gap-y-5 gap-x-2 mt-5">
                {categories.map((category) => (
                    <Pressable
                        key={category.name}
                        onPress={() => console.log(category.name)}
                        accessibilityRole="button"
                        className="rounded-3xl bg-[#F3E8D5] p-4 h-24 w-[48%] flex-row items-center justify-center gap-2"
                    >
                        <View>
                            {category.icon}
                        </View>
                        <Text className="font-display text-2xl text-[#3F2E24]">
                            {category.name}
                        </Text>
                    </Pressable>
                ))}
            </View>

        </View>
    )
}

export default MealTypeOptions