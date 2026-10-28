import { Text, View } from 'react-native'
import RecipeCard from './shared/recipe-card'

const Categories = () => {
  return (
    <View>
      <Text className='section-title'>Good food, your way.</Text>
      <Text className='desc'>Find a little more of what feels like you.</Text>
      <View className='flex-row flex-wrap justify-between gap-y-5 mt-5'>
        {
          Array.from({ length: 4 }).map((_, i) => (
            <RecipeCard variant='grid' />

          ))
        }
      </View>
    </View>
  )
}

export default Categories