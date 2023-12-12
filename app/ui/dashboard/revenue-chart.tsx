import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue } from "@/app/lib/data";

export default async function RevenueChart() {
  const revenue = await fetchRevenue()
  const chartHeight = 350; // Altura do Gráfico (px)

  const { yAxisLabels, topLabel } = generateYAxis(revenue); // Destructuring da função generateYAxis()

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  } //* Retorna o parágrafo se não existir os dados ou se for igual a 0 

  return (
    <div className="w-full md:col-span-4">

      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 sm:grid-cols-13 md:gap-4">
          <div
            className="hidden sm:flex mb-6 flex-col justify-between text-gray-400 text-sm"
            style={{ height: `${chartHeight}px` }} // Tamanho do gráfico
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p> // Valores no eixo Y
            ))}
          </div>

          {revenue.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-300"
                style={{ height: `${(chartHeight / topLabel) * month.revenue}px` }} // Tamanho das barras 
              ></div>
              <p className="-rotate-90 text-gray-400 text-sm sm:rotate-0">{month.month}</p> {/* Meses */}
            </div>
          ))}
        </div>

        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="text-gray-500 text-sm ml-2">Last 12 Months</h3>
        </div>

      </div>

    </div>
  );
}
