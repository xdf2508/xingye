import createImg from './base';
import { homeStore } from '../store/homeStore';
import { GameObject, } from '@eva/eva.js';
import { Render } from '@eva/plugin-renderer-render';
import { Transition } from '@eva/plugin-transition';
export default function water() {
  // 浇灌背景容器
  const bgContainer = new GameObject('waterContainer', {
    size: { width: window.innerWidth, height: window.innerHeight },
    origin: { x: 0, y: 0 },
    position: { x: 0, y: 0 },
  });
  // 水壶对象
  let waterCan: GameObject;
  // 浇灌按钮
  createImg(
    'water',
    135, 65,
    window.innerWidth / 2 - 67.5,
    600,
    bgContainer,
    () => {
      // 调用浇水接口todo...
      // 发送接口后成功后调用以下动画方法:
      // 正在浇水提示
      if (waterCan) {
        return;
      }
      // 增加进度
      homeStore.addProgress(250);
      // 水壶动画
      waterCanAnimation();
    }
  );

  // 浇水壶动画
  const waterCanAnimation = () => {
    // 动画计数器
    let animationCount = 0;
    // 水壶起始位置
    const canStartX = window.innerWidth / 2 - 20;
    // 创建水壶图像
    waterCan = createImg(
      'wateringCan',
      50, 50,
      canStartX,
      // 360,
      250,
      bgContainer
    );
    const render = waterCan.addComponent(
      new Render({
        alpha: 0,
      }),
    );
    const waterCanTrans = waterCan.addComponent(new Transition());
    // 计算水壶出现后要旋转的角度
    const calcRadiu = (degree: number) => {
      return degree * (Math.PI / 180);
    };
    waterCanTrans.group = {
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
      move: [
        // 初始化旋转30°后再平移
        {
          name: 'rotation',
          component: waterCan.transform,
          values: [
            { time: 0, value: 0, tween: 'ease-out' },
            { time: 200, value: calcRadiu(10), tween: 'ease-out' },
            { time: 800, value: calcRadiu(15), tween: 'ease-out' },
          ],
        },
        {
          name: 'position.x',
          component: waterCan.transform,
          values: [
            { time: 0, value: 120, tween: 'linear' },                      // 初始 X 坐标
            { time: 800, value: 120, tween: 'linear' },                    // 等待旋转完成 (800ms) 开始移动
            { time: 1500, value: 220, tween: 'linear' },  // 800ms-2000ms: 向右平移到 320 (移动了200距离)
          ],
        },
      ],
    };
    // 执行水壶旋转角度和移动动画
    waterCanTrans.play('move', 1);
    // 执行水壶渐显和渐隐动画
    waterCanTrans.play('alpha', 1);
    // 销毁水壶
    waterCanTrans.on('finish', () => {
      animationCount++;
      // 当两个动画都结束时候才执行销毁
      if (animationCount >= 2) {
        waterCan.destroy();
        // 重置水壶对象
        waterCan = null;
        // 冒泡动画
        bubbleAnimation();
      }
    });
  };

  // 冒泡动画
  const bubbleAnimation = () => {
    // 泡泡个数 随机1-3个
    const starCount = Math.floor(Math.random() * 3) + 1;
    // 草地位置
    const grassArea = {
      xStart: window.innerWidth / 2 - 50,
      xEnd: window.innerWidth / 2 + 50,
      y: 500
    };
    // 循环设置泡泡初始位置和冒泡动画
    for (let i = 0; i < starCount; i++) {
      const randomX = grassArea.xStart + Math.random() * (grassArea.xEnd - grassArea.xStart);
      const duration = 1500 + Math.random() * 500;
      const bubble = createImg(
        'bubble',
        20, 20,
        randomX,
        grassArea.y,
        bgContainer
      );
      const render = bubble.addComponent(
        new Render({
          alpha: 0,
        }),
      );
      const bubbleTrans = bubble.addComponent(new Transition());
      bubbleTrans.group = {
        alpha: [
          {
            name: 'alpha',
            component: render,
            values: [
              { time: 0, value: 1, tween: 'ease-out' },
              { time: duration, value: 0, tween: 'ease-out' }
            ]
          }
        ],
        bubble: [
          {
            name: 'position.y',
            component: bubble.transform,
            values: [
              { time: 0, value: grassArea.y, tween: 'linear' },
              { time: duration, value: grassArea.y - 100, tween: 'ease-out' }
            ]
          }
        ]
      };
      // 执行泡泡动画
      bubbleTrans.play('bubble', 1);
      // 执行泡泡渐显和渐隐动画
      bubbleTrans.play('alpha', 1);
      // 销毁泡泡
      bubbleTrans.on('finish', () => {
        bubble.destroy();
      });
    }
  };
  return bgContainer;
}