import React, { useEffect, useState } from 'react'
import AgriFeatures from './Features'
import Banner from '../../component/banner'



function HomePage() {
    const [array, setArray] = useState([{ heading: "Crop Management", paragraph: "Crop management refers to a set of agricultural practices aimed at maximizing crop yield, quality, andsustainability. It involves the efficient utilization of resources like soil, water, nutrients, and technology to enhance agricultural productivity.", icon: "img/crops-analytics.png" },
    { heading: "Expense Tracking", paragraph: "Expense tracking in agriculture involves recording and monitoring all costs incurred during farmingactivities to manage budgets, improve profitability, and ensure financial stability.", icon:"img/expense.png" },
    { heading: "Weather Forecast", paragraph: "Weather forecasting is the process of predicting atmospheric conditions at a specific location and time using scientific data and tools. It helps in planning daily activities, disaster management, and agricultural operations.", icon: "img/rainy.png"},
    { heading: "Task Scheduler", paragraph: "A task scheduler in farming is a tool used to plan, organize, and automate agricultural activities. It helps manage tasks like planting, irrigation, fertilization, and harvesting efficiently based on crop cycles and weather forecasts.", icon: "img/project.png"}


    ])

    const handleCLick = () => {
        const newObject =
            { heading: "Expense Tracking", paragraph: "paragraklmjd" }
        setArray(() => [...array, newObject])
        console.log(newObject, 'newObject')
    }


    useEffect(() => {
        console.log("Useeffect")
    }, [array])

    return (
        <>
            <Banner />
            <AgriFeatures aggriArray={array} />
            <button onClick={handleCLick}>click</button>
        </>
    )
}

export default HomePage
