import { homeStore } from '../store/homeStore';
import { GameObject } from '@eva/eva.js';
import { Graphics } from '@eva/plugin-renderer-graphics';
import { Text } from '@eva/plugin-renderer-text';

export default function createCount() {
  // 当前克数
  let currentCount: number = 0;
  // 请求接口获取剩余克数
  currentCount = 50;
  // 将剩余克数数据设置到服务中
  homeStore.setWaterRemainSize(currentCount);
  // 设置圆圈容器
  const outter = new GameObject('outter', {
    position: {
      x: homeStore.getScreeSize().baseW / 2 + 45,
      y: 605,
    },
    size: {
      width: 20,
      height: 20,
    },
  });

  const outterGraphics = outter.addComponent(new Graphics());
  outterGraphics.graphics.beginFill(0xde3249, 1);
  outterGraphics.graphics.drawRoundedRect(0, 0, 20, 20, 10);
  outterGraphics.graphics.endFill();
  const text = new GameObject("text", {
    position: {
      x: 0,
      y: 0
    },
    origin: {
      x: 0.5,
      y: 0.5
    },
    anchor: {
      x: 0.5,
      y: 0.5
    }
  });
  // 将剩余克数添加到剩余克数容器中
  let newCount = new Text({
    text: `${currentCount}克`,
    style: {
      fill: '#ffffff', // gradient
      wordWrap: true,
      breakWords: true,
      wordWrapWidth: 35,
      fontSize: 12,
      align: 'center'
    }
  });

  // 动态数字处理
  const dataChangeListener = (key: string, value: any) => {
    if (key === 'count') {
      console.log('触发');
      newCount.text = value + `克`;
    }
  };
  homeStore.onDataChange(dataChangeListener);
  text.addComponent(newCount);

  // 监听等级变化，切换树的生长状态
  // const onLevelChange = (key: string, value: number) => {
  //   if (key === 'level') {
  //     // 销毁旧树图片
  //     currentTree.destroy();
  //     // 创建对应等级的新树图片
  //     currentTree = createImg(
  //       getTreeResource(value),
  //       80, 120,
  //       0, 0,
  //       treeContainer
  //     );
  //   }
  // };
  // homeStore.onDataChange(onLevelChange);
  outter.addChild(text);
  return outter;
}