import React from "react";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  Label,
  LabelList
} from "recharts";

const StackedAreaChart = React.memo(({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <Tooltip />
        <Area
          type="monotone"
          dataKey="minTemp"
          stackId="1"
          stroke="#cdcdcd"
          fill="#fff"
        >
          <LabelList dataKey="minTemp" position="inside" offset={5} />
        </Area>
        <Area
          type="monotone"
          dataKey="maxTemp"
          stackId="1"
          stroke="#82ca9d"
          fill="#ccc"
        >
          <LabelList dataKey="maxTemp" position="inside" offset={5} />
        </Area>
      </AreaChart>
    </ResponsiveContainer>
  );
});

export default StackedAreaChart;
