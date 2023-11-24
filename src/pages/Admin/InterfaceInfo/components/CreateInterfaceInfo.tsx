import React, {useRef, useState} from "react";
import {ActionType, ProColumns, ProForm, ProTable} from "@ant-design/pro-components";
import {Form, message} from "antd";
import {addInterfaceInfoUsingPost} from "@/services/yuapi/interfaceInfoController";

const CreateInterfaceInfo : React.FC<any> = (props) => {
  const createNewInterface = async (record:API.InterfaceInfo) => {
    const res = await addInterfaceInfoUsingPost(record);
    if(res?.code==0){
      message.success("新增成功");
    }else{
      message.error("新增失败");
    }
  }
  const formRef = useRef();
  const columns: ProColumns<API.InterfaceInfo>[] = [
    {
      title: '接口名称',
      dataIndex: 'name',
      valueType: 'text',
      formItemProps: () => {
        return {
          rules : [
            {
              required: true,
              message: "请输入接口名称"
            }
          ]
        }
      }
    },
    {
      title: '调用地址',
      dataIndex: 'url',
      valueType: 'text',
      formItemProps: () => {
        return {
          rules : [
            {
              required: true,
              message: "请输入调用地址"
            }
          ]
        }
      }
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'textarea',
    },
    {
      title: '调用方式',
      dataIndex: 'method',
      valueType: 'text',
      formItemProps: () => {
        return {
          rules : [
            {
              required: true,
              message: "请输入调用方式：GET、POST……"
            }
          ]
        }
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '运行中',
          status: 'Processing',
        },
      },
      formItemProps: () => {
        return {
          rules : [
            {
              required: true,
              message: "请选择接口状态"
            }
          ]
        }
      }
    },
    {
      title: '请求参数',
      dataIndex: 'requestParams',
      valueType: 'jsonCode'
    },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
      valueType: 'jsonCode'
    },
    {
      title: '响应头',
      dataIndex: 'responseHeader',
      valueType: 'jsonCode'
    },
  ];
  return (
    <ProTable
    type={"form"}
    formRef={formRef}
    columns={columns}
    onSubmit={(record)=>{
      console.log(record);
      props.handleModalOpen(false);
      createNewInterface(record);
      //@ts-ignore
      formRef.current.setFieldsValue({
        description: "",
        method : "",
        name: "" ,
        requestHeader : "",
        responseHeader : "" ,
        status : "",
        url : "" ,
              })
    }}
    ></ProTable>
  )
};
export default CreateInterfaceInfo;
