import { ArrowUpRight } from 'lucide-react-native'
import { useState } from 'react'
import { Text, View } from 'react-native'
import { cuisines } from '../../constants/data'
import Chip from './shared/chip'
const Cuisines = () => {
    const [selectedCuisine, setSelectedCuisine] = useState('')
    return (
        <View>
            <View className='flex-row items-center justify-between'>
                <Text className='section-title '>A Taste of somewhere</Text>
                <View className='flex-row items-center gap-1'>
                    <Text className='text-[#864332]'>View all</Text>
                    <ArrowUpRight size={17} />
                </View>
            </View>
            <View className='w-4/5 mt-4'>
                <View className='flex-row items-center gap-2 flex-wrap'>
                    {
                        cuisines.map((cuisine) => (
                            <Chip
                                variant='outlined'
                                key={cuisine}
                                label={cuisine}
                                selected={selectedCuisine === cuisine}
                                onPress={() => setSelectedCuisine(cuisine)}
                            />
                        ))
                    }
                </View>
            </View>
        </View>
    )
}

export default Cuisines