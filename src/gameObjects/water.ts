import { GameObject, Transform } from '@eva/eva.js'; // 引入 Component 类型以便断言(可选)，直接用 any 最简单
import { Img } from '@eva/plugin-renderer-img';
import { Transition } from '@eva/plugin-transition';
import createImg from './base';
import { homeStore } from '../store/homeStore';

export default function water() {
  const bgContainer = new GameObject('waterContainer', {
    size: { width: window.innerWidth, height: window.innerHeight },
    origin: { x: 0, y: 0 },
    position: { x: 0, y: 0 },
  });

  // 浇灌按钮
  createImg(
    'water',
    135, 65,
    window.innerWidth / 2 - 67.5,
    600,
    bgContainer,
    () => {
      homeStore.addProgress(50);

      // ==========================================
      // 水壶动画
      // ==========================================
      const canStartX = window.innerWidth / 2 - 80;
      const canTargetX = window.innerWidth / 2 + 30;

      const wateringCan = createImg(
        'wateringCan',
        50, 50,
        canStartX,
        420,
        bgContainer
      );

      const canTrans = wateringCan.addComponent(
        new Transition({
          group: {
            moveRight: [
              {
                name: 'position.x',
                // 核心修改 1：使用 as any 规避类型检查，传入类本身
                component: Transform as any, 
                values: [
                  { time: 0, value: canStartX },
                  { time: 1000, value: canTargetX, tween: 'Linear' }
                ]
              }
            ]
          }
        })
      );

      canTrans.play('moveRight', 1);

      canTrans.on('finish', (name) => {
        if (name === 'moveRight') {
          wateringCan.destroy();
        }
      });

      // ==========================================
      // 小太阳冒泡动画
      // ==========================================
      const starCount = 5;
      const grassArea = {
        xStart: window.innerWidth / 2 - 100,
        xEnd: window.innerWidth / 2 + 100,
        y: 650
      };

      for (let i = 0; i < starCount; i++) {
        const randomX = grassArea.xStart + Math.random() * (grassArea.xEnd - grassArea.xStart);
        const duration = 1500 + Math.random() * 500;

        const star = createImg(
          'starMini',
          20, 20,
          randomX,
          grassArea.y,
          bgContainer
        );

        const starTrans = star.addComponent(
          new Transition({
            group: {
              bubble: [
                {
                  name: 'position.y',
                  // 核心修改 2：使用 as any
                  component: Transform as any,
                  values: [
                    { time: 0, value: grassArea.y },
                    { time: duration, value: grassArea.y - 100, tween: 'EaseOut' }
                  ]
                },
                {
                  name: 'alpha',
                  // 核心修改 3：使用 as any
                  component: Img as any,
                  values: [
                    { time: 0, value: 1 },
                    { time: duration, value: 0, tween: 'EaseOut' }
                  ]
                }
              ]
            }
          })
        );

        starTrans.play('bubble', 1);

        starTrans.on('finish', () => {
          star.destroy();
        });
      }
    }
  );

  return bgContainer;
}