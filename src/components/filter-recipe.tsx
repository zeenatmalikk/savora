
import Slider from '@react-native-community/slider';
import { X } from 'lucide-react-native';
import { useState } from 'react';
import {
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native';

type RecipeFilterModalProps = {
    visible: boolean;
    onClose: () => void;
};

const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts', 'Drinks'];
const cuisines = ['Indian', 'Italian', 'Chinese', 'Mexican', 'Japanese', 'Thai'];
const difficulties = ['Easy', 'Medium', 'Hard'];
const availableItems = ['Tomato', 'Mushroom', 'Spinach', 'Lemon', 'Basil']
type FilterSectionProps = {
    title: string;
    desc?: string;
    extra?: React.ReactNode
    options: string[];
    selected: string[];
    onToggle: (option: string) => void;
};




const MIN_TIME = 20;
const MAX_TIME = 120;

const SliderExample = () => {
  const [min, setMin] = useState(MIN_TIME);
  const [max, setMax] = useState(MAX_TIME);
  const [value, setValue] = useState(MIN_TIME);

  const handleMinChange = (text: string) => {
    if (!/^\d+$/.test(text)) return;

    const nextMin = Math.max(
      MIN_TIME,
      Math.min(Number(text), max - 5),
    );

    setMin(nextMin);
    setValue((current) => Math.max(current, nextMin));
  };

  const handleMaxChange = (text: string) => {
    if (!/^\d+$/.test(text)) return;

    const nextMax = Math.min(
      MAX_TIME,
      Math.max(Number(text), min + 5),
    );

    setMax(nextMax);
    setValue((current) => Math.min(current, nextMax));
  };

  return (
    <View>
      <View className="flex-row items-center justify-between">
        <Text className="section-title">Time on your hands.</Text>
        <Text className="font-inter-bold text-sm text-[#864332]">
          {value} min
        </Text>
      </View>

      <View className="mb-5 flex-row justify-between">
        <View className="h-24 w-[48%] gap-2 rounded-3xl bg-[#F3E8D5] p-4">
          <Text className="desc">From</Text>
          <TextInput
            value={String(min)}
            onChangeText={handleMinChange}
            keyboardType="number-pad"
            className="font-inter text-base text-[#3F2E24]"
          />
        </View>

        <View className="h-24 w-[48%] gap-2 rounded-3xl bg-[#F3E8D5] p-4">
          <Text className="desc">To</Text>
          <TextInput
            value={String(max)}
            onChangeText={handleMaxChange}
            keyboardType="number-pad"
            className="font-inter text-base text-[#3F2E24]"
          />
        </View>
      </View>

     <View className="my-3 w-full">
  <Slider
    minimumValue={min}
    maximumValue={max}
    step={5}
    value={value}
    onValueChange={setValue}
    minimumTrackTintColor="#864332"
    maximumTrackTintColor="#D7C5A9"
    thumbTintColor="#864332"
    style={{ width: '100%', height: 40 }}
  />
</View>

      <View className="flex-row justify-between">
        <Text className="font-inter text-xs text-[#796451]">
          {min} min
        </Text>
        <Text className="font-inter text-xs text-[#796451]">
          {max} min
        </Text>
      </View>
    </View>
  );
};


const FilterSection = ({
    title,
    desc,
    extra,
    options,
    selected,
    onToggle,
}: FilterSectionProps) => (
    <View className="gap-3">
        <View>
            <Text className="section-title">
                {title}
            </Text>
            {desc?.length && <Text className="desc">{desc}</Text>}
        </View>
        <View className="flex-row flex-wrap gap-3">
            {options.map((option) => {
                const isSelected = selected.includes(option);

                return (
                    <Pressable
                        key={option}
                        onPress={() => onToggle(option)}
                        className={`rounded-full border px-4 py-3 ${isSelected
                            ? 'border-[#864332] bg-[#864332]'
                            : 'border-[#D7C5A9] bg-[#F3E8D5]'
                            }`}
                    >
                        <Text
                            className={`font-inter text-sm ${isSelected ? 'text-[#FFF8F0]' : 'text-[#796451]'
                                }`}
                        >
                            {option}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    </View>
);

export default function RecipeFilterModal({
    visible,
    onClose,
}: RecipeFilterModalProps) {
    const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
    const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
    const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
    const [selectedAvailableItems, setSelectedAvailableItems] = useState<string[]>([]);
    const toggleOption = (
        option: string,
        selected: string[],
        setSelected: (value: string[]) => void,
    ) => {
        setSelected(
            selected.includes(option)
                ? selected.filter((item) => item !== option)
                : [...selected, option],
        );
    };

    const clearFilters = () => {
        setSelectedMeals([]);
        setSelectedCuisines([]);
        setSelectedDifficulties([]);
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="fullScreen"
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-[#FFF8F0]">
                {/* Header */}
                <View className="flex-row items-center justify-between border-b border-[#E8DCC9] px-6 pb-5 pt-14">
                    <View>
                        <Text className="font-display text-3xl text-[#3F2E24]">
                            Filters
                        </Text>
                        <Text className="mt-1 font-inter text-sm text-[#796451]">
                            Find something you’ll love.
                        </Text>
                    </View>

                    <Pressable
                        onPress={onClose}
                        accessibilityRole="button"
                        accessibilityLabel="Close filters"
                        hitSlop={10}
                        className="h-10 w-10 items-center justify-center rounded-full bg-[#F3E8D5]"
                    >
                        <X size={21} color="#3F2E24" />
                    </Pressable>
                </View>

                {/* Filter options */}
                <ScrollView
                    className="flex-1"
                    contentContainerClassName="gap-8 p-6 pb-8"
                    showsVerticalScrollIndicator={false}
                >
                    <FilterSection
                        title="What’s the occasion?"
                        options={mealTypes}
                        selected={selectedMeals}
                        onToggle={(option) =>
                            toggleOption(option, selectedMeals, setSelectedMeals)
                        }
                    />


                    <View>
                        <FilterSection
                            title="A little less of…"
                            desc='Avoid ingredients or allergens. Choose any.'
                            options={difficulties}
                            selected={selectedDifficulties}
                            onToggle={(option) =>
                                toggleOption(option, selectedDifficulties, setSelectedDifficulties)
                            }
                        />
                        <Text className='desc mt-4'>Always check ingredient labels for your dietary needs.</Text>
                    </View>
                    <FilterSection
                        title="What’s in your kitchen?"
                        desc='Include ingredients you’d love to use.'
                        extra={
                            <View>
                                <TextInput />
                            </View>
                        }
                        options={availableItems}
                        selected={selectedAvailableItems}
                        onToggle={(option) =>
                            toggleOption(option, selectedCuisines, setSelectedCuisines)
                        }
                    />

                    <SliderExample />
                </ScrollView>

                {/* Bottom actions */}
                <View className="flex-row gap-3 border-t border-[#E8DCC9] bg-[#FFF8F0] p-6 pb-8">
                    <Pressable
                        onPress={clearFilters}
                        className="flex-1 items-center justify-center rounded-full border border-[#D7C5A9] py-4"
                    >
                        <Text className="font-inter-bold text-sm text-[#864332]">
                            Clear all
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={onClose}
                        className="flex-1 items-center justify-center rounded-full bg-[#864332] py-4"
                    >
                        <Text className="font-inter-bold text-sm text-[#FFF8F0]">
                            Show recipes
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}
