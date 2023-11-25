import dynamic from "next/dynamic";
import React from "react";
import Chart from "react-apexcharts";

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface LineChartProps {
  series: any[]; 
  options: any;
}

const LineChart: React.FC<LineChartProps> = ({ series, options }) => {
  return (
    <ApexChart
      options={options}
      type="line"
      width="100%"
      height="100%"
      series={series}
    />
  );
};

export default LineChart;