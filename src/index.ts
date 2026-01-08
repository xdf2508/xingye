import createBackground from './gameObjects/background';
import resources from './resources';

import { Game, resource } from '@eva/eva.js';
import { RendererSystem } from '@eva/plugin-renderer';
import { ImgSystem } from '@eva/plugin-renderer-img';
import { EventSystem } from '@eva/plugin-renderer-event';
import { SpriteAnimationSystem } from '@eva/plugin-renderer-sprite-animation';
import { RenderSystem } from '@eva/plugin-renderer-render';
import { TransitionSystem } from '@eva/plugin-transition';
import { GraphicsSystem } from '@eva/plugin-renderer-graphics';
import { TextSystem } from '@eva/plugin-renderer-text';
import createBtns from './gameObjects/btns';
import createProgress from './gameObjects/progress';
import createTree from './gameObjects/tree';
import createWater from './gameObjects/water';

resource.addResource(resources);

const game = new Game({
  systems: [
    new RendererSystem({
      canvas: document.querySelector('#canvas'),
      width: window.innerWidth, // 屏幕宽度
      height: window.innerHeight, // 屏幕高度
      antialias: true,
    }),
    new ImgSystem(),
    new TransitionSystem(),
    new SpriteAnimationSystem(),
    new RenderSystem(),
    new EventSystem(),
    new GraphicsSystem(),
    new TextSystem(),
  ],
});

// game.scene.transform.size.width = window.innerWidth;
// game.scene.transform.size.height = window.innerHeight;

game.scene.addChild(createBackground());
game.scene.addChild(createProgress());
game.scene.addChild(createBtns());
game.scene.addChild(createWater());
game.scene.addChild(createTree());
window.game = game;

const canvas: any = document.querySelector('#canvas');
// 适配高清屏的分辨率
const dpr = window.devicePixelRatio || 1;

function updateCanvasSize() {
  // 视觉尺寸：占满屏幕
  const screenW = window.innerWidth;
  const screenH = window.innerHeight;

  // 绘制分辨率：乘以dpr避免模糊
  canvas.width = screenW * dpr;
  canvas.height = screenH * dpr;

  // 视觉尺寸样式（抵消dpr的影响）
  canvas.style.width = `${screenW}px`;
  canvas.style.height = `${screenH}px`;

  return { width: screenW, height: screenH };
}

// 窗口变化时同步更新场景+元素
window.addEventListener('resize', () => {
  // const { width: newW, height: newH } = updateCanvasSize();
  // 更新场景尺寸
  // game.scene.transform.size.width = newW;
  // game.scene.transform.size.height = newH;
  // 更新场景内元素（如背景图）
  // const bg1 = game.scene.gameObjects[1];
  // if (bg1) {
  //   bg1.scene.transform.size.width = newW;
  //   bg1.scene.transform.size.height = newH;
  // }
});
