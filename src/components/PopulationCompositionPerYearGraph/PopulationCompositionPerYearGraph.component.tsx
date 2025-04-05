import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PREFECTURE_COLORS } from "./PopulationCompositionPerYearGraph.constatns.ts";
import { usePopulationCompositionPerYearGraph } from "@/components/PopulationCompositionPerYearGraph/PopulationCompositionPerYearGraph.component.hooks.ts";
import { PopulationDataWithPrefCode } from "@/api/population/composition/perYear";
import { Prefecture } from "@/api/prefectures";

type Props = {
  prefCodes: number[];
  prefectures: Prefecture[];
  populationCompositionPerYears: PopulationDataWithPrefCode[];
};

export const PopulationCompositionPerYearGraphComponent = ({
  populationCompositionPerYears,
  prefCodes,
  prefectures,
}: Props) => {
  const { normalizedPopulationCompositionPerYears, prefectureNameByPrefCode } =
    usePopulationCompositionPerYearGraph({
      prefCodes,
      prefectures,
      populationCompositionPerYears,
    });

  return (
    <ResponsiveContainer width={"100%"} height={500}>
      <LineChart
        data={normalizedPopulationCompositionPerYears}
        margin={{
          top: 30,
          right: 50,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="year"
          axisLine={{ strokeWidth: 1, stroke: "#666" }}
          tickLine={{ strokeWidth: 1, stroke: "#666" }}
          label={{
            value: `年`,
            position: "insideBottomRight",
            offset: -35,
            dy: -45,
          }}
        />
        <YAxis
          domain={["dataMin", "dataMax"]}
          axisLine={{ strokeWidth: 1, stroke: "#666" }}
          tickLine={{ strokeWidth: 1, stroke: "#666" }}
          tickFormatter={(value) => {
            return value.toLocaleString();
          }}
          label={{
            value: `人口数`,
            position: "top",
            offset: 15,
          }}
        />
        <Tooltip
          labelFormatter={(year) => `${year}年`}
          formatter={(v) => v.toLocaleString() + "人"}
        />
        <Legend />
        {prefCodes.map((prefCode) => (
          <Line
            key={prefCode}
            type="monotone"
            name={prefectureNameByPrefCode[prefCode]}
            // todo 暫定で固定の区分を表示
            dataKey={`${prefCode}.elderlyPopulation.value`}
            // 都道府県コードは 1-47の範囲なので-1
            stroke={PREFECTURE_COLORS[prefCode - 1]}
            strokeDasharray="3 4 5 2"
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
