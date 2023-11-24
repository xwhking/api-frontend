import React, {useEffect, useRef, useState} from 'react';
import {Button, Checkbox, Form, FormInstance, Input, message} from 'antd';
import {updateInterfaceInfoUsingPost} from "@/services/yuapi/interfaceInfoController";
import {ProForm} from "@ant-design/pro-form";
import useForm = ProForm.useForm;


export type Props = {
  handleUpdateModalOpen?:any;
  actionRef?:any;
  record: API.InterfaceInfo;
}

const UpdateFrom: React.FC<Props> = (props) => {
  useEffect(
    ()=>{
      formRef.setFieldsValue(props.record);
    }
    , [props.record]
  )
  const [data,setData] = useState(props.record);
  const [formRef] = Form.useForm()
  const onFinish = async (values: any) => {
    values = {
      ...values,
      id : props.record?.id
    }
    const res = await updateInterfaceInfoUsingPost(values);
    if(res.code == 0){
      props.handleUpdateModalOpen(false);
      message.success("修改成功");
      props.actionRef.current.reload();
    }else{
      message.error(res.message);
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      name="更新接口"
      labelCol={{span: 8}}
      wrapperCol={{span: 16}}
      style={{maxWidth: 600}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={formRef}
    >
      <Form.Item
      >
        <h1>接口更新</h1>
      </Form.Item>
      <Form.Item
        label="接口名称"
        name="name"
        rules={[{required: true, message: '请输入接口名称'}]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="接口描述"
        name="description"
        rules={[{required: false, message: '请输入接口描述'}]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="接口地址"
        name="url"
        rules={[{required: true, message: '请输入接口地址'}]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="接口调用方法"
        name="method"
        rules={[{required: true, message: '请输入接口调用方法'}]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="接口参数信息"
        name="requestParams"
        rules={[{required: false, message: '请输入接口参数信息'}]}
      >
        <Input.TextArea  rows={5}/>
      </Form.Item>
      <Form.Item
        label="接口请求头信息"
        name="requestHeader"
        rules={[{required: false, message: '请输入接口请求头信息'}]}
      >
        <Input.TextArea rows={5}/>
      </Form.Item>
      <Form.Item
        label="接口响应头信息"
        name="responseHeader"
        rules={[{required: false, message: ''}]}
      >
        <Input.TextArea rows={5}/>
      </Form.Item>
      <Form.Item
        label="接口状态"
        name="status"
        rules={[{required: true, message: '请输入接口状态'}]}
      >
        <Input/>
      </Form.Item>


      <Form.Item wrapperCol={{offset: 8, span: 16}}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
export default UpdateFrom;
