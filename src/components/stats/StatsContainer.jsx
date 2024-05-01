import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import StatsPanel from './StatsPanel';
import useGetMCIFeatureCount from '../../hooks/useGetMCIFeatureCount';
import useGetAttributeUniqueValues from '../../hooks/useGetAttributeUniqueValues';
import createLeftSideFilter from '../../zustand/createLeftSideFilter';
import SkeletonStatsPanel from '../../skeleton/SkeletonStatsPanel';
import { API_MCI_CATEGORY, API_MCI_ENDPOINT } from '../../utils/constants';

const StatsContainer = () => {

    const { loading, attributeValues, zeroAttributeValues } = useGetAttributeUniqueValues(API_MCI_CATEGORY, API_MCI_ENDPOINT);
    const { featureCount } = useGetMCIFeatureCount(API_MCI_ENDPOINT)
    const { selectedCategories } = createLeftSideFilter(useShallow((state) => ({ selectedCategories: state.selectedCategories })));
    const [data, setData] = useState([]);

    useEffect(() => {

        if (selectedCategories.length > 0) {

            for (let index = 0; index < zeroAttributeValues.length; index++) {
                const element = zeroAttributeValues[index];
                const selectedCategory = selectedCategories.find(item => item.value === element.value);

                if (selectedCategory !== undefined) {
                    const findSelectedCategory = attributeValues.find(item => item.value === selectedCategory.value);
                    zeroAttributeValues[index].count = findSelectedCategory.count;
                }

            }
            setData(zeroAttributeValues);

        } else {

            if (attributeValues.length === 0) {
                setData(zeroAttributeValues);
            } else {
                setData(attributeValues);
            }

        }

    }, [attributeValues, zeroAttributeValues, selectedCategories]);

    return (
        <div className="shadow max-[1800px]:grid max-md:grid-cols-2 max-2xl:grid-cols-3 max-[1800px]:grid-cols-3 min-[1800px]:stats min-[1800px]:flex min-[1800px]:justify-between">

            {
                loading && (<SkeletonStatsPanel data={data} />)
            }
            {
                !loading && data.length > 0 && (<StatsPanel data={data} featureCount={featureCount} />)
            }

        </div>
    )
}

export default StatsContainer