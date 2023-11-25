import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import dynamic from 'next/dynamic';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface BarChartProps {
  chartData: any[]; 
  chartOptions: any; 
}

const BarChart: React.FC<BarChartProps> = ({ chartData, chartOptions }) => {
  const [data, setData] = useState<any[]>([]);
  const [options, setOptions] = useState<any>({});

  useEffect(() => {
    setData(chartData);
    setOptions(chartOptions);
  }, [chartData, chartOptions]);

  return (
    <ApexChart
      options={options}
      series={data}
      type="bar"
      width="100%"
      height="100%"
    />
  );
};

export default BarChart;