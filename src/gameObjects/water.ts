import createImg from './base';
import { homeStore } from '../store/homeStore';
import { GameObject, } from '@eva/eva.js';
import { Render } from '@eva/plugin-renderer-render';
import { Transition } from '@eva/plugin-transition';
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
      const canStartX = window.innerWidth / 2 - 20;
      const canTargetX = window.innerWidth / 2 + 30;

      const wateringCan = createImg(
        'wateringCan',
        50, 50,
        canStartX,
        360,
        bgContainer
      );
      const render = wateringCan.addComponent(
        new Render({
          alpha: 0,
        }),
      );
      const animation = wateringCan.addComponent(new Transition());
      animation.group = {
        idle: [
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
                time: 500,
                value: 1,
                tween: 'ease-in',
              },
              {
                time: 2500,
                value: 0,
                tween: 'ease-out',
              },
            ],
          },
        ],
        alpha: [
          {
            name: 'alpha', // 直接使用"alpha"作为属性名
            component: wateringCan.transform,
            values: [
              { time: 0, value: 0, tween: 'ease-out' }, // 初始：完全透明
              { time: 1000, value: 1, tween: 'ease-in' }, // 500ms时：不透明
              { time: 1500, value: 0 } // 1500ms时：回到透明
            ]
          }
        ],
        move: [
          {
            name: 'position.x',
            component: wateringCan.transform,
            values: [
              {
                time: 100,
                value: 120,
                tween: 'ease-in',
              },
              {
                time: 1500,
                value: 220,
                tween: 'ease-out',
              },
            ],
          },
          // {
          //   name: 'rotation.z', // 2D旋转核心属性：z轴旋转
          //   component: wateringCan.transform,
          //   values: [
          //     { time: 0, value: 0, tween: 'ease-out' }, // 初始角度0°（无旋转）
          //     { time: 300, value: 30, tween: 'ease-in' }, // 300ms时旋转到30°（向右）
          //   ],
          // },
        ],
      };
      animation.play('move', 1);
      animation.play('idle', 1);

      // ==========================================
      // 小太阳冒泡动画
      // ==========================================
      const starCount = 5;
      const grassArea = {
        xStart: window.innerWidth / 2 - 100,
        xEnd: window.innerWidth / 2 + 100,
        y: 650
      };

      // for (let i = 0; i < starCount; i++) {
      //   const randomX = grassArea.xStart + Math.random() * (grassArea.xEnd - grassArea.xStart);
      //   const duration = 1500 + Math.random() * 500;

      //   const star = createImg(
      //     'starMini',
      //     20, 20,
      //     randomX,
      //     grassArea.y,
      //     bgContainer
      //   );

      //   const starTrans = star.addComponent(
      //     new Transition({
      //       group: {
      //         bubble: [
      //           {
      //             name: 'position.y',
      //             // 核心修改 2：使用 as any
      //             component: Transform as any,
      //             values: [
      //               { time: 0, value: grassArea.y },
      //               { time: duration, value: grassArea.y - 100, tween: 'EaseOut' }
      //             ]
      //           },
      //           {
      //             name: 'alpha',
      //             // 核心修改 3：使用 as any
      //             component: Img as any,
      //             values: [
      //               { time: 0, value: 1 },
      //               { time: duration, value: 0, tween: 'EaseOut' }
      //             ]
      //           }
      //         ]
      //       }
      //     })
      //   );

      //   starTrans.play('bubble', 1);

      //   starTrans.on('finish', () => {
      //     star.destroy();
      //   });
      // }
    }
  );
  return bgContainer;
}