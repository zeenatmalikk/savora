
import { Pressable, Text } from 'react-native';

type ChipProps = {
  label: string;
  selected?: boolean;
  onPress: () => void;
  variant: 'outlined' | 'filled';
};

export default function Chip({
  label,
  selected = false,
  onPress,
  variant,
}: ChipProps) {
  const isOutlined = variant === 'outlined';

  return (
    <Pressable
      onPress={onPress}
      className={`rounded-full px-4 py-2.5 ${
        isOutlined
          ? selected
            ? 'border border-[#49352A] bg-[#49352A]'
            : 'border border-[#D7C5A9] bg-[#F3E8D5]'
          : selected
            ? 'bg-[#49352A]'
            : 'bg-[#F3E8D5]'
      }`}
    >
      <Text
        className={`font-inter text-sm ${
          selected
            ? 'text-[#FFF8F0]'
            : 'text-[#796451]'
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}
