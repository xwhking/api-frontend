import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, Drawer, Form, Input, message, Modal} from 'antd';
import React, {useRef, useState} from 'react';
import {SortOrder} from "antd/es/table/interface";
import {
  deleteInterfaceInfoUsingPost,
  listInterfaceInfoByPageUsingGet, onlineOrNotInterfaceUsingPost,
  updateInterfaceInfoUsingPost
} from "@/services/yuapi/interfaceInfoController";
import CreateInterfaceInfo from './components/CreateInterfaceInfo'
import UpdateFrom from "@/pages/Admin/InterfaceInfo/components/UpdateForm";
const InterfaceInfo: React.FC = () => {
  const [item,changeItem] = useState<any>();
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const onlineOrNot = async (id:any) => {
    const res = await onlineOrNotInterfaceUsingPost({
      "id" : id
    })
    if(res.data){
      message.success("接口状态更新成功");
      actionRef.current?.reload();
    }else{
      message.error("接口状态更新失败")
    }
  }
  const deleteInterfaceInfo  =  async (record : API.InterfaceInfo)=>{
    const res = await deleteInterfaceInfoUsingPost({
      id : record.id
    });
    if(res.data){
      message.success("删除成功") ;
      actionRef.current?.reload();
    }
    else{
      message.error("删除失败");
    }
  }

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.InterfaceInfo>[] = [
    {
      title: '接口名称',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '调用地址',
      dataIndex: 'url',
      valueType: 'text',
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'textarea',
    },
    {
      title: '调用方式',
      dataIndex: 'method',
      valueType: 'text'
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
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
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
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      hideInForm :true,
      render: (_, record) => [
        <a
          key="update"
          onClick={() => {
            changeItem(record)
            console.log("item",item)
            handleUpdateModalOpen(true);

          }}
        >
          更新
        </a>,
        <a key="delete" onClick={() => {
            deleteInterfaceInfo(record);
        }}>
          删除
        </a>,
        record.status == 0?<Button
        type={"primary"}
        onClick={() => {
          onlineOrNot(record.id);
        }}
        >
          发布
        </Button>: <Button
          type={"primary"}
        danger
          onClick={() => {
            onlineOrNot(record.id);
          }}
        >
          下线
        </Button>
      ],
    },
  ];
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined/> 新建
          </Button>,
        ]}
        request= {async (params: {
                     // query
                     /** 当前的页码 */
                     current?: number;
                     /** 页面的容量 */
                     pageSize?: number;
                     description?: string;
                     id?: string;
                     method?: string;
                     name?: string;
                     requestHeader?: string;
                     responseHeader?: string;
                     sortField?: string;
                     sortOrder?: string;
                     status?: number;
                     url?: string;
                     userId?: string;
                  },
                  sort: Record<string,SortOrder> , filter: Record<string,React.ReactText[] | null >) =>{
          // @ts-ignore
          const res:any = await listInterfaceInfoByPageUsingGet({
              ...params
            })
          if(res?.data){
            return {
              data: res?.data.records || [],
              success:true,
              total : res?.data.total
            }
          }else{
            return {
              data:  [],
              success:false ,
              total : 0
            }
          }
        }}
        columns={columns}
      />
      <Modal
        title={'新建接口'}
        width="400px"
        footer={null}
        open={createModalOpen}
        onCancel={(e)=>{
          handleModalOpen(false);
        }}
      >
        <CreateInterfaceInfo columns={columns} handleModalOpen={handleModalOpen}></CreateInterfaceInfo>
      </Modal>
      <Drawer
        width={600}
        open={updateModalOpen}
        onClose={() => {
          handleUpdateModalOpen(false);
        }}
        closable={false}
      >
        {/*更新表格*/}
        <UpdateFrom handleUpdateModalOpen={handleUpdateModalOpen} actionRef={actionRef} record={item}></UpdateFrom>
      </Drawer>
    </PageContainer>
  );
};
export default InterfaceInfo;
