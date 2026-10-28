import Categories from '@/components/categories'
import Cuisines from '@/components/cuisines'
import RecipeFilterModal from '@/components/filter-recipe'
import MealTypeOptions from '@/components/meal-type-options'
import SearchBar from '@/components/search-bar'
import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
const Explore = () => {
  const [filtersVisible, setFiltersVisible] = useState(false);

    return (
        <SafeAreaView className="flex-1" edges={['top']}>
            <ScrollView className="flex-1"
                contentContainerClassName="p-6 pb-8"
                showsVerticalScrollIndicator={false}>
                <Text className='font-inter text-[#864332] text-sm'>A WORLD OF GOOD FOOD</Text>
                <Text className='section-title text-[36px]'>Follow your craving.</Text>
                <Text className='text-[#796451] font-inter text-sm'>Something familiar. Or a delicious first.</Text>
                <View className='mt-7 gap-7'>
                    <SearchBar  onFilterPress={() => setFiltersVisible(true)}/>
                    <RecipeFilterModal
                            visible={filtersVisible}
                            onClose={() => setFiltersVisible(false)}
                          />
                    <Cuisines />
                    <Categories />
                    <MealTypeOptions />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Explore