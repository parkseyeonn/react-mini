import ApexChart from "react-apexcharts";
import {useQuery} from "react-query";
import {useParams} from "react-router-dom";
import {fetchCoinHistory} from "../../api";
import {useRecoilValue} from "recoil";
import {isDarkAtom} from "../../atoms";

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function Chart() {
    const isDark = useRecoilValue(isDarkAtom);
    const {coinId} = useParams<'coinId'>();
    const {isLoading, data} = useQuery<IHistorical[]>(
        ['ohlcv', coinId],
        () => fetchCoinHistory(coinId)
    );
    console.log(isLoading, data)
    return (
        <div>
            {
                isLoading && !data ?
                    "loading..."
                    :
                    <ApexChart
                        type="line"
                        series={[
                            {
                                name: "price",
                                data: data ? data.map(price => price.close) : []
                            },
                        ]}
                        options={{
                            theme: {
                                mode: isDark ? "dark" : 'light'
                            },
                            chart: {
                                height: 300,
                                width: 500,
                                toolbar: {
                                    show: false,
                                },
                                background: "transparent"
                            },
                            grid: {show : false},
                            stroke: {
                                curve: "smooth",
                                width: 4,
                            },
                            yaxis: {show: false},
                            xaxis: {
                                axisBorder: {show: false},
                                axisTicks: {show: false},
                                labels: {show: false},
                                type: "datetime",
                                categories: data?.map(price => price.time_close)
                            },
                            fill: {
                                type: "gradient",
                                gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
                            },
                            colors: ["#0fbcf9"],
                            tooltip: {
                                y : {
                                    formatter: value => `$${value.toFixed(2)}`
                                }
                            }
                        }}
                    />
            }
        </div>
    );
}

export default Chart;
