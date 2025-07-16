/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

type SeriesItem = {
  name: string;
  data: number[];
};

type SplineLineChartProps = {
  categories: string[];
  series: SeriesItem[];
  colors?: string[]; // Optional override for line colors
};

// 
const SplineLineChart = ({ categories, series, colors }: SplineLineChartProps) => {
  const options: ApexOptions = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: { show: false },
    },
    stroke: {
      curve: 'straight',
      width: 3,
    },
   
// yaxis: [
//   {
//     seriesName: 'Revenue',
//     axisTicks: { show: true },
//     axisBorder: { show: true, color: '#247BA0' },
//     labels: { style: { colors: '#FF1654' } },
//     title: { text: 'Revenue ($)' },
//     min: 0,
//   },
//   {
//     seriesName: 'Expenses',
//     opposite: true,  // Puts this axis on the right side
//     axisTicks: { show: true },
//     axisBorder: { show: true, color: '#247BA0' },
//     labels: { style: { colors: '#247BA0' } },
//     title: { text: 'Expenses ($)' },
//     min: 0,
//   },
// ],
// this will show dot 
markers: {
        // fill color inside dot
  strokeColors: "white",      // border color per series
  strokeWidth: 2,
  size: 9,                   // base size 0 for all (overridden by series markers)
  hover: { size: 8 },        // hover size
},
    xaxis: {
      categories,
    }, 
    // legend show the box with chart details
    // legend have property like show:false to hide it or position to where it display
    legend: { position: 'left', show:false },
    dataLabels: { enabled: false },
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <ApexCharts options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default SplineLineChart;
