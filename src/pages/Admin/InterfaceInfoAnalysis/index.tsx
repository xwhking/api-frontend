import React, {useEffect, useState} from "react";
import ReactECharts from 'echarts-for-react';
import {getStatisticUsingGet} from "@/services/yuapi/userInterfaceInfoController";

const InterfaceInfoAnalysis: React.FC = () => {
  const [data, setData] = useState<any>([{value: 1048, name: 'Search Engine'},
    {value: 735, name: 'Direct'},
    {value: 580, name: 'Email'},
    {value: 484, name: 'Union Ads'},
    {value: 300, name: 'Video Ads'}]);
  const [originalData, setOriginalData] = useState([]);

  const getOriginalData = async () => {
    const res = await getStatisticUsingGet();
    if (res.data) {
      console.log(JSON.stringify(res.data))
      setOriginalData(res.data.perInterfacesStatistics)
    } else {

    }

  }

  const option = {
    title: {
      text: '接口使用情况统计',
      subtext: '所有接口使用情况',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '80%',
        center: ["50%", "50%"],
        data: originalData.map((item) => {
          return {
            name : item.name,
            value : item.totalNum
          }
        }),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
      }
    ]
  };

  useEffect(() => {
    getOriginalData();
  }, [])
  return (
    <div>
      <h1>Hello World</h1>
      <ReactECharts
        option={option}
        notMerge={true}
        lazyUpdate={true}
        style={{
          "width": "100%",
          "height": "800px"
        }}
        theme={"theme_name"}
      />
    </div>
  );
}
export default InterfaceInfoAnalysis;
