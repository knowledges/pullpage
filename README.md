# pullpage
全屏翻页
<h1>detail与wheelDelta</h1>
判断滚轮向上或向下在浏览器中也要考虑兼容性，现在五大浏览器（IE、Opera、Safari、Firefox、Chrome）中Firefox 使用detail，其余四类使用wheelDelta；两者只在取值上不一致，代表含义一致，detail与wheelDelta只各取两个 值，detail只取±3，wheelDelta只取±120，其中正数表示为向上，负数表示向下。

<h1>注意点：Firefox使用addEventListener添加滚轮事件</h1>
<h3>我这边弄的别的方法兼容如果有问题直接留言</h3>