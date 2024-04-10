import { useEffect, useState } from "react";
import getMonthsArray from "../../utils/getMonthsArray";
import useLeftSideFilter from "../../zustand/useLeftSideFilter";
import SelectYearList from "./SelectYearList";
import SelectMonthList from "./SelectMonthList";
import getDaysArray from "../../utils/getDaysArray";
import SelectDayList from "./SelectDayList";
import getLastFiveYearsArray from "../../utils/getFiveYearArray";
import SelectInputList from "./SelectInputList";
import SkeletonSelectInputList from "../../skeleton/SkeletonSelectInputList";

// eslint-disable-next-line react/prop-types
const LeftSideFilter = ({ categoryOption }) => {

    const [isLoading, setIsLoading] = useState(true);

    const {
        setSelectedYear,
        setSelectedMonth,
        setSelectedDay,
        setSelectedCategory,
        selectedYear,
        selectedMonth,
    } = useLeftSideFilter();

    const handleChangeYear = (value) => {
        setSelectedYear(value);
    };

    const handleChangeMonth = (value) => {
        setSelectedMonth(value);
    };

    const handleChangeDay = (value) => {
        setSelectedDay(value);
    };

    const handleChangeCategory = (value) => {
        setSelectedCategory(value);
    }

    const years = getLastFiveYearsArray();
    const months = getMonthsArray();
    const findMonthValue = months.find(month => month.label === selectedMonth);
    const days = getDaysArray(parseInt(selectedYear), parseInt(findMonthValue?.value));

    useEffect(() => {

        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timeoutId);

    }, [setIsLoading]);

    return (
        <>
            <div className="flex flex-col justify-between 2xl:flex-row max-sm:flex-row gap-2 pb-5">

                {
                    isLoading && (
                        <>
                            <div className="pt-3 w-full">
                                <SkeletonSelectInputList />
                            </div>
                            <div className="pt-3 w-full">
                                <SkeletonSelectInputList />
                            </div>
                            <div className="pt-3 w-full">
                                <SkeletonSelectInputList />
                            </div>
                        </>
                    )
                }
                {
                    !isLoading && (
                        <>
                            <div>
                                <SelectYearList options={years} onChange={handleChangeYear} defaultValue={years[0].value} />
                            </div>
                            <div>
                                <SelectMonthList options={months} onChange={handleChangeMonth} />
                            </div>
                            <div>
                                <SelectDayList options={days} onChange={handleChangeDay} />
                            </div>
                        </>
                    )
                }
            </div>
            <div className="flex gap-2 justify-between">
                <div className="w-full">
                    {
                        !isLoading && categoryOption && (
                            <SelectInputList options={categoryOption} onChange={handleChangeCategory} labelText={'Category'} />
                        )
                    }
                    {
                        isLoading && (
                            <div className="pt-3">
                                <SkeletonSelectInputList />
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default LeftSideFilter