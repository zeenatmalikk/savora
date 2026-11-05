
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';

type SearchBarProps = {
  onFilterPress?: () => void;
  onSearchChange?: (value: string) => void;
};

export default function SearchBar({
  onFilterPress,
  onSearchChange,
}: SearchBarProps) {
  const [search, setSearch] = useState('');

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange?.(value);
  };

  return (
    <View className="h-[52px] w-full flex-row items-center gap-[10px] rounded-full border border-[#D7C5A9] bg-[#F3E8D5] px-4">
      {/* Search icon */}
      <Search size={17} color="#864332" strokeWidth={1.6}
/>

      {/* Input */}
      <TextInput
        value={search}
        onChangeText={handleSearchChange}
        placeholder="A dish, an ingredient, a craving…"
        placeholderTextColor="#796451"
        className="flex-1 font-inter text-[13px] text-[#3F2E24]"
        style={{
          paddingVertical: 0,
          height: '100%',
        }}
        returnKeyType="search"
        accessibilityLabel="Search recipes"
      />

      {/* Filter button */}
      <Pressable
        onPress={onFilterPress}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="Filter recipes"
        className="items-center justify-center"
      >
        <SlidersHorizontal
          size={17}
          color="#864332"
          strokeWidth={1.6}
        />
      </Pressable>
    </View>
  );
}
