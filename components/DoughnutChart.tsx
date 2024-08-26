'use client'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const data = {
    datasets: [
      {
        label: 'Banks',
        data: [1500, 2000, 2500],
        backgroundColor: ['#57c6e1', '#7ac5d8', '#bbc1bf']
      }
    ],
    labels: ['Bank 1', 'Bank 2', 'Bank 3']
  }
  return (
    <Doughnut 
      data={data}
      options={{
        cutout: '60%',
        plugins: {
          legend: {
            display: false
          }
        }
      }} 
    />
  )
}

export default DoughnutChart