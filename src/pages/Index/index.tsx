import {PageContainer} from "@ant-design/pro-components";
import React from "react";
import { useEffect, useState } from 'react';
import { List, message} from 'antd';
import {listInterfaceInfoByPageUsingGet} from "@/services/yuapi/interfaceInfoController";
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  const [total,setTotal] = useState<number>(0);
  const [current,setCurrent] = useState<number>(1);
  const [pageSize,setPageSize] = useState<number>(8)
  const loadDataList = async (current = '1',pageSize = '5') => {
    setLoading(true);
    try{
      const res = await listInterfaceInfoByPageUsingGet({
        current,
        pageSize,
        "status" : 1
      })
      //@ts-ignore
      setList(res.data.records);
      //@ts-ignore
      setTotal(res.data.total)
      message.success("获取接口信息成功");
    }catch (e){
      message.error("请求错误");
      console.log(e)
    }
    setLoading(false);
  }
  useEffect( () => {
    loadDataList(String(current),String(pageSize));
  }, []);

  return (
    <PageContainer>
      <List
        className="demo-loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={list}
        pagination={{
          showTotal(total:number){
            return "数据总条数：" + total;
          },
          onChange: (page) => {
            loadDataList(String(page),String(pageSize))
          },
          pageSize: pageSize,
          total
        }}
        renderItem={(item) => {
          const interfaceDetailUrl = '/interfaceDetail/' + item.id;
          return (
            <List.Item
              actions={[<a key={item.id} href={interfaceDetailUrl}>More Detail</a>]}
            >
              <List.Item.Meta
                title={<a href="https://ant.design">{item.name}</a>}
                description={item.description}
              />
              <div>{item.url}</div>
            </List.Item>
          )
        }
        }
      />
    </PageContainer>
  );
};
export default Index;
