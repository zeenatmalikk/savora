
import { FlatList, Image, View } from 'react-native';

const items = [
    {
        id: '1',
        image: require('../../assets/images/carousel-1.png'),
    },
    {
        id: '2',
        image: require('../../assets/images/carousel-2.png'),
    },

];

export default function Carousel() {
    return (
        <FlatList
            horizontal
            data={items}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                // paddingHorizontal: 16,
                gap: 12,
            }}
            renderItem={({ item }) => (
                <View
                    style={{
                        width: 300,
                        height: 200,
                        borderRadius: 16,
                        overflow: 'hidden',
                    }}
                >
                    <Image
                        source={item.image}
                        resizeMode="cover"
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    />
                </View>
            )}
        />
    );
}
