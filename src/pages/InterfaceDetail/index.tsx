import {PageContainer} from "@ant-design/pro-components";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {getInterfaceInfoByIdUsingGet, invokeUsingPost} from "@/services/yuapi/interfaceInfoController";
import {Badge, Button, Card, Descriptions, DescriptionsProps, Divider, Form, Input, message} from "antd";

const InterfaceDetail: React.FC = () => {
  const [invokeLoading,setInvokeLoading] = useState(false);
  const [invokeRes ,setInvokeRes] = useState<any>();
  const [interfaceDetailInfo, setInterfaceDetailInfo] = useState<API.InterfaceInfo>({});
  const [formRef] = Form.useForm();
  const onFinish = async (values:any) => {
    setInvokeLoading(true);
    const res = await invokeUsingPost({
      "id" : params.id,
      ...values
    })
    if(res.data){
      setInvokeRes(res.data);
      message.success("接口测试调用成功");
    }else{
      message.error("接口测试调用失败");
    }
    setInvokeLoading(false);
  }
  const loadInterfaceDetailInfo = async (id: string) => {
    const res = await getInterfaceInfoByIdUsingGet({id});
    if(res.data){
      message.success("获取接口详细信息成功");
      setInterfaceDetailInfo(res.data);
    }else{
      message.error("获取接口详细信息失败");
    }
  }
  useEffect(() => {
    loadInterfaceDetailInfo(String(params.id));
  }, [])
  const params = useParams();
  const items: DescriptionsProps['items'] = [
    {
      label: '接口名称',
      children: interfaceDetailInfo.name,
    },
    {
      label: '接口描述',
      children: interfaceDetailInfo.description,
    },
    {
      label: '接口地址',
      children: interfaceDetailInfo.url ,
    },
    {
      label: '接口创建时间',
      children: interfaceDetailInfo.createTime ,
    },
    {
      label: '接口状态',
      children: (<>
        {interfaceDetailInfo.status==0?<Badge status="error" text="关闭"/>:<Badge status="processing" text="运行中" />}
      </>),
    },
    {
      label: '接口请求方法',
      children: interfaceDetailInfo.method ,
    },
    {
      label: '接口请求参数',
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
      children: interfaceDetailInfo.requestParams,
    },
    {
      label: '接口请求头',
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
      children: interfaceDetailInfo.requestHeader,
    },
    {
      label: '接口响应头',
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
      children: interfaceDetailInfo.responseHeader,
    },
  ];
  formRef.setFieldsValue({
    "url" : interfaceDetailInfo.url,
    "userRequestParams":interfaceDetailInfo.requestParams
  })
  return (
    <PageContainer>
      <Card>
        <Descriptions
          title="接口详细信息"
          bordered
          column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
          items={items}
        />
      </Card>
      <Divider/>
      <Card title="在线测试">
        <Form name="invoke" layout="vertical" form={formRef} onFinish={onFinish}>
          <Form.Item label="请求地址" name="url">
            <Input disabled/>
          </Form.Item>
          <Form.Item label="请求参数" name="userRequestParams">
            <Input.TextArea rows={8}/>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16 }}>
            <Button type="primary" htmlType="submit">
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Divider />
      <Card title="返回结果" loading={invokeLoading}>
        {invokeRes}
      </Card>
    </PageContainer>
  );
};
export default InterfaceDetail;
