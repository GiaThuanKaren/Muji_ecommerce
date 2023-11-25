import React from "react";
import {
    MdArrowDropUp,
    MdOutlineCalendarToday,
    MdBarChart,
} from "react-icons/md";
import Card from "../Card";
import LineChart from "../Charts/LineChart";
import { lineChartDataTotalSpent, lineChartOptionsTotalSpent } from "src/utils/constant";
import { RevenueInMonth, RevenueInWeek } from "src/services/api/statistic";
import { RevenueInMonthResponeModel, RevenueInWeekResponeModel } from "src/Model/apiModel";

interface LineChartDataSpentsProps {
    name: string,
    data: number[],
    color: string
}

interface LineChartOptionSpentProps {
    legend: {
        show: false,
    },

    theme: {
        mode: "light",
    },
    chart: {
        type: "line",

        toolbar: {
            show: false,
        },
    },

    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: "smooth",
    },

    tooltip: {
        style: {
            fontSize: "12px",
            fontFamily: undefined,
            backgroundColor: "#000000"
        },
        theme: 'dark',
        x: {
            format: "dd/MM/yy HH:mm",
        },
    },
    grid: {
        show: false,
    },
    xaxis: {
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
        labels: {
            style: {
                colors: "#A3AED0",
                fontSize: "12px",
                fontWeight: "500",
            },
        },
        type: "text",
        range: undefined,
        categories: string[],
    },

    yaxis: {
        show: false,
    },
}

const TotalSpent: React.FC = () => {

    const [totalSpentMonth, setTotalSpentMonth] = React.useState<LineChartDataSpentsProps>({
        name: "Revenue",
        data: [699],
        color: "#4318FF"
    });
    const [optionTotalSpentMonth, setOptionTotalSpentMonth] = React.useState<LineChartOptionSpentProps>({
        legend: {
            show: false,
        },

        theme: {
            mode: "light",
        },
        chart: {
            type: "line",

            toolbar: {
                show: false,
            },
        },

        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
        },

        tooltip: {
            style: {
                fontSize: "12px",
                fontFamily: undefined,
                backgroundColor: "#000000"
            },
            theme: 'dark',
            x: {
                format: "dd/MM/yy HH:mm",
            },
        },
        grid: {
            show: false,
        },
        xaxis: {
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                style: {
                    colors: "#A3AED0",
                    fontSize: "12px",
                    fontWeight: "500",
                },
            },
            type: "text",
            range: undefined,
            categories: ["SEP", "OCT", "NOV", "DEC", "JAN", "FEB"],
        },

        yaxis: {
            show: false,
        },
    });

    const [totalSpentWeek, setTotalSpentWeek] = React.useState<LineChartDataSpentsProps>({
        name: "Revenue",
        data: [699],
        color: "#4318FF"
    });
    const [optionTotalSpentWeek, setOptionTotalSpentWeek] = React.useState<LineChartOptionSpentProps>({
        legend: {
            show: false,
        },

        theme: {
            mode: "light",
        },
        chart: {
            type: "line",

            toolbar: {
                show: false,
            },
        },

        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
        },

        tooltip: {
            style: {
                fontSize: "12px",
                fontFamily: undefined,
                backgroundColor: "#000000"
            },
            theme: 'dark',
            x: {
                format: "dd/MM/yy HH:mm",
            },
        },
        grid: {
            show: false,
        },
        xaxis: {
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                style: {
                    colors: "#A3AED0",
                    fontSize: "12px",
                    fontWeight: "500",
                },
            },
            type: "text",
            range: undefined,
            categories: ["SEP", "OCT", "NOV", "DEC", "JAN", "FEB"],
        },

        yaxis: {
            show: false,
        },
    });
    const [weekAndMonth, setWeekAndMonth] = React.useState('month');

    const HandleSwitchChart = () => {
        setWeekAndMonth(weekAndMonth === 'month' ? 'week' : 'month')
    }

    async function FetchApi() {
        try {
            let revenueInMonth = await RevenueInMonth()
            let revenueInWeek = await RevenueInWeek()
            const updateDataTotalSpentMonth: LineChartDataSpentsProps = revenueInMonth?.data.map((item: RevenueInMonthResponeModel) => item.total_price)
            const updateOptionTotalSpentMonth: LineChartOptionSpentProps = revenueInMonth?.data.map((item: RevenueInMonthResponeModel) => item.order_month + "." + item.order_year)

            const updateDataTotalSpentWeek: LineChartDataSpentsProps = revenueInWeek?.data.map((item: RevenueInWeekResponeModel) => item.total_price)
            const updateOptionTotalSpentWeek: LineChartDataSpentsProps = revenueInWeek?.data.map((item: RevenueInWeekResponeModel) => item.order_day_of_week)

            setTotalSpentMonth((prev) => ({
                ...prev,
                data: updateDataTotalSpentMonth
            }))

            setOptionTotalSpentMonth((prev) => ({
                ...prev,
                xaxis: {
                    ...prev.xaxis,
                    categories: updateOptionTotalSpentMonth
                }
            }))

            setTotalSpentWeek((prev) => ({
                ...prev,
                data: updateDataTotalSpentWeek
            }))

            setOptionTotalSpentWeek((prev) => ({
                ...prev,
                xaxis: {
                    ...prev.xaxis,
                    categories: updateOptionTotalSpentWeek
                }
            }))

        } catch (error) {

        }
    }

    React.useEffect(() => {
        FetchApi()
    }, [])

    return (
        <Card extra="!p-[20px] text-center">
            <div className="flex justify-between">
                <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80">
                    <MdOutlineCalendarToday />
                    <span className="text-sm font-medium text-gray-600">{weekAndMonth === 'month' ? 'This month' : 'This weekly'}</span>
                </button>
                <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
                    <MdBarChart className="h-6 w-6" onClick={HandleSwitchChart} />
                </button>
            </div>

            <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
                {/* <div className="flex flex-col">
          <p className="mt-[20px] text-3xl font-bold text-navy-700 dark:text-white">
            $37.5K
          </p>
          <div className="flex flex-col items-start">
            <p className="mt-2 text-sm text-gray-600">Total Spent</p>
            <div className="flex flex-row items-center justify-center">
              <MdArrowDropUp className="font-medium text-green-500" />
              <p className="text-sm font-bold text-green-500"> +2.45% </p>
            </div>
          </div>
        </div> */}
                <div className="h-full w-full">
                    {weekAndMonth === 'month' ? (
                        <LineChart
                            options={optionTotalSpentMonth}
                            series={[totalSpentMonth]}
                        />
                    ) : (
                        <LineChart
                            options={optionTotalSpentWeek}
                            series={[totalSpentWeek]}
                        />
                    )}
                </div>
            </div>
        </Card>
    );
};

export default TotalSpent;