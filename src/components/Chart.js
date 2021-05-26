import { useState } from "react";
import { Bar } from "react-chartjs-2";
export default function Chart(props) {
  const { micro } = props;

  const data = micro.DataChart();
  const [stateChart] = useState({
    chartData: {
      labels: data[0].name,
      datasets: data[0].dataSets,
    },
  });

  return <Bar data={stateChart.chartData} />;
}
