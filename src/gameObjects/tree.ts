import { GameObject } from '@eva/eva.js';
import createImg from './base';
import { homeStore } from '../store/homeStore';
import { Render } from '@eva/plugin-renderer-render';
import { Transition } from '@eva/plugin-transition';

export default function createTree() {
  // 树的容器（锚点设为底部中心，方便定位）
  const treeContainer = new GameObject('treeContainer', {
    position: { x: window.innerWidth / 2 + 35, y: 550 }, // 树的位置（对应截图中树苗位置）
    origin: { x: 0.5, y: 1 }, // 锚点：底部中心
    size: { width: 120, height: 120 } // 树的容器尺寸
  });

  // 根据等级获取对应树的资源（需提前准备不同生长阶段的树图片）
  const getTreeResource = (level: number) => {
    // 等级1→小芽，等级2→小苗，...，等级7→成熟树
    switch (Math.min(level, 7)) { // 等级最多到7
      case 0: return 'tree1';
      case 1: return 'tree2';
      case 2: return 'tree3';
      case 3: return 'tree4';
      case 4: return 'tree5';
      case 5: return 'tree6';
      case 6: return 'tree7';
      case 7: return 'tree8'; // 成熟树资源名
      default: return 'tree1';
    }
  };

  // 跨越等级时候展示出高亮树干图后消失


  // 根据树的成长阶段设置图片大小
  const getTreeSize = (level: string) => {
    let w: number;
    let h: number;
    let x: number;
    let y: number;
    if (level === 'tree1') {
      w = 115;
      h = 120;
      x = 10;
      y = 0;
    } else if (level === 'tree2') {
      w = 92;
      h = 155;
      x = 5;
      y = -30;
    } else if (level === 'tree3') {
      w = 101;
      h = 200;
      x = -15;
      y = -70;
    } if (level === 'tree4') {
      w = 144;
      h = 200;
      x = -30;
      y = -70;
    } if (level === 'tree5') {
      w = 173;
      h = 250;
      x = -40;
      y = -90;
    } if (level === 'tree6') {
      w = 197;
      h = 250;
      x = -60;
      y = -120;
    } if (level === 'tree7') {
      w = 241;
      h = 250;
      x = -90;
      y = -100;
    } else if (level === 'tree8') {
      w = 250;
      h = 292;
      x = -90;
      y = -140;
    }
    console.log('等级', level);
    return { w, h, x, y };
  };

  // 创建初始树图片
  const level = getTreeResource(homeStore.getLeftLevel());
  const { w, h, x, y } = getTreeSize(level);
  let currentTree = createImg(
    level,
    w, h, // 树的宽高
    x, y, // 相对容器的位置
    treeContainer
  );

  // 监听等级变化，切换树的生长状态
  const onLevelChange = (key: string, value: number) => {
    if (key === 'level') {
      // 销毁旧树图片
      currentTree.destroy();
      // 创建对应等级的新树图片
      const level = getTreeResource(homeStore.getLeftLevel());
      console.log('受到', level);
      const { w, h, x, y } = getTreeSize(level);
      // 先展示发光树干图，渐隐后显示对应树干图
      const currenTreeTem = createImg(
        getTreeResource(value) + 'Light',
        w, h, // 树的宽高
        x, y, // 相对容器的位置
        treeContainer
      );
      const render = currenTreeTem.addComponent(
        new Render({
          alpha: 0,
        }),
      );
      const currenTreeTemTrans = currenTreeTem.addComponent(new Transition());
      currenTreeTemTrans.group = {
        alpha: [
          {
            name: 'alpha',
            component: render,
            values: [
              {
                time: 0,
                value: 0,
                tween: 'ease-in',
              },
              {
                time: 100,
                value: 1,
                tween: 'ease-in',
              },
              {
                time: 2000,
                value: 1,
                tween: 'ease-out',
              },
              {
                time: 2500,
                value: 0,
                tween: 'ease-out',
              },
            ],
          },
        ],
        // move: [
        //   // 初始化旋转30°后再平移
        //   {
        //     name: 'rotation',
        //     component: waterCan.transform,
        //     values: [
        //       { time: 0, value: 0, tween: 'ease-out' },
        //       { time: 200, value: calcRadiu(10), tween: 'ease-out' },
        //       { time: 800, value: calcRadiu(15), tween: 'ease-out' },
        //     ],
        //   },
        //   {
        //     name: 'position.x',
        //     component: waterCan.transform,
        //     values: [
        //       { time: 0, value: 120, tween: 'linear' },                      // 初始 X 坐标
        //       { time: 800, value: 120, tween: 'linear' },                    // 等待旋转完成 (800ms) 开始移动
        //       { time: 1500, value: 220, tween: 'linear' },  // 800ms-2000ms: 向右平移到 320 (移动了200距离)
        //     ],
        //   },
        // ],
      };
      // 执行水壶渐显和渐隐动画
      currenTreeTemTrans.play('alpha', 1);
      // 销毁水壶
      currenTreeTemTrans.on('finish', () => {
        currenTreeTem.destroy();
        // 高亮树干销毁成功后显示新的树干
        currentTree = createImg(
          getTreeResource(value),
          w, h, // 树的宽高
          x, y, // 相对容器的位置
          treeContainer
        );
      });
    }
  };
  homeStore.onDataChange(onLevelChange);

  return treeContainer;
}