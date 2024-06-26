import { getChartLineIcon, getIconClockTime, iconCalendarDay, iconCalendarMonth, iconCalendarWeek } from "../../utils/icons"

// eslint-disable-next-line react/prop-types
const FrequencyPanel = ({ data }) => {
    return (
        <>
            {
                // eslint-disable-next-line react/prop-types
                data.map((item, i) => (
                    <div className={`stat border-r border-l-0 last:border-r-0 
                    ${i === 0 ? 'max-sm:order-1' :
                            i === 1 ? 'max-sm:order-3' :
                                i === 2 ? 'max-sm:order-5' :
                                    i === 3 ? 'max-sm:order-7' :
                                        i === 4 ? 'max-sm:order-2' :
                                            i === 5 ? 'max-sm:order-4' :
                                                i === 6 ? 'max-sm:order-6' :
                                                    i === 7 ? 'max-sm:order-8' :
                                                        ''}  }`} key={i + 1}>
                        <div className="stat-figure text-primary">
                            {
                                item.name === 'month' ? iconCalendarMonth :
                                    item.name === 'week' ? iconCalendarWeek :
                                        item.name === 'day' ? iconCalendarDay :
                                            item.name === 'hour' ? getIconClockTime(item.icon) : getChartLineIcon(item.icon)
                            }
                        </div>
                        <div className="stat-title text-base-content">{item.label}</div>
                        <div className="stat-value max-sm:font-medium max-md:text-xl text-primary">
                            {item.value}
                        </div>
                        <div className="stat-desc truncate">
                            {
                                item.value === 0 ? 'No available data' :
                                    <p className="truncate ...">
                                        {item.desc}
                                    </p>
                            }
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default FrequencyPanel