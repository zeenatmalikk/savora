
import { RangeSlider } from '@sharcoux/slider';
import { useState } from 'react';
import {
    Text,
    TextInput,
    View,
} from 'react-native';

type RangeFilterProps = {
    title: string;
    minValue: number;
    maxValue: number;
    step?: number;
    unit: string;
    minGap?: number;
};

const RangeFilter = ({
    title,
    minValue,
    maxValue,
    step = 10,
    unit,
    minGap = step,
}: RangeFilterProps) => {
    const [range, setRange] = useState<[number, number]>([
        minValue,
        maxValue,
    ]);

    const [minInput, setMinInput] = useState(String(minValue));
    const [maxInput, setMaxInput] = useState(String(maxValue));

    const handleMinChange = (text: string) => {
        setMinInput(text);

        if (!/^\d+$/.test(text)) return;

        const nextMin = Math.max(
            minValue,
            Math.min(Number(text), range[1] - minGap),
        );

        setRange([nextMin, range[1]]);
    };

    const handleMaxChange = (text: string) => {
        setMaxInput(text);

        if (!/^\d+$/.test(text)) return;

        const nextMax = Math.min(
            maxValue,
            Math.max(Number(text), range[0] + minGap),
        );

        setRange([range[0], nextMax]);
    };

    const handleSliderChange = (values: number[]) => {
        const nextRange: [number, number] = [
            values[0],
            values[1],
        ];

        setRange(nextRange);
        setMinInput(String(nextRange[0]));
        setMaxInput(String(nextRange[1]));
    };

    const CustomThumb = () => (
        <View className="h-7 w-7 items-center justify-center rounded-full bg-[#864332]" />
    );

    return (
        <View>
            <Text className="section-title mb-3">
                {title}
            </Text>

            {/* Min and Max inputs */}
            <View className="mb-5 flex-row justify-between">
                <View className="w-[48%] gap-2 rounded-2xl border border-[#D7C5A9] bg-[#F3E8D5] p-4">
                    <Text className="desc">From</Text>

                    <TextInput
                        value={minInput}
                        onChangeText={handleMinChange}
                        keyboardType="number-pad"
                        className="font-inter-bold text-base text-[#3F2E24]"
                    />
                </View>

                <View className="w-[48%] gap-2 rounded-2xl border border-[#D7C5A9] bg-[#F3E8D5] p-4">
                    <Text className="desc">To</Text>

                    <TextInput
                        value={maxInput}
                        onChangeText={handleMaxChange}
                        keyboardType="number-pad"
                        className="font-inter-bold text-base text-[#3F2E24]"
                    />
                </View>
            </View>

            {/* Range Slider */}
            <View className="m-3">
                <RangeSlider
                    minimumValue={minValue}
                    maximumValue={maxValue}
                    range={range}
                    step={step}
                    minimumRange={minGap}
                    CustomThumb={CustomThumb}
                    onValueChange={handleSliderChange}
                    outboundColor="#D7C5A9"
                    inboundColor="#864332"
                />
            </View>

            {/* Slider boundaries */}
            <View className="flex-row justify-between">
                <Text className="font-inter text-xs text-[#796451]">
                    {minValue} {unit}
                </Text>

                <Text className="font-inter text-xs text-[#796451]">
                    {maxValue}+ {unit}
                </Text>
            </View>
        </View>
    );
};

export default RangeFilter;
