import React, {useEffect, useState} from "react";
import {contentHtml} from "@/pages/Developer/constant";
import {Card, Divider} from "antd";
const Developer: React.FC = () => {
    const [html, setHtml] = useState('');

    useEffect(() => {
      setHtml(contentHtml)
    }, []);

    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <Card title={"联系我"}>
          <span>请注意你的accessKey 和 secretKey 都在个人中心</span>
          <Divider></Divider>
          <span>QQ:2837468248</span>
          <Divider></Divider>
          <span>我的博客 <a href="https://blog.csdn.net/Go_ahead_forever">IDIOT_IDIOT</a> </span>
          <Divider></Divider>
          <span>欢迎加入<a href="https://t.zsxq.com/13TAC7RO0">编程导航</a>和我一起学习</span>
        </Card>
      </div>

    );
}
export default Developer;
