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
import createCount from './gameObjects/count';
import { homeStore } from './store/homeStore';
import { DOMManager } from './domManager';
import { PxToRemConverter } from './utils/pxToRemConverter';

// 添加资源
resource.addResource(resources);

// 创建DOM管理器实例，初始化HTML容器
const domManager = DOMManager.getInstance();

// 创建Eva.js游戏实例 - 保留动画系统用于复杂动画效果
const game = new Game({
  systems: [
    new RendererSystem({
      canvas: document.querySelector('#canvas'),
      width: homeStore.getScreeSize().baseW, // 屏幕宽度
      height: homeStore.getScreeSize().baseH, // 屏幕高度
      antialias: true,
    }),
    new ImgSystem(),
    new TransitionSystem(), // 保留过渡动画系统
    new SpriteAnimationSystem(), // 保留精灵动画系统
    new RenderSystem(), // 保留渲染系统
    new EventSystem(), // 保留事件系统
    new GraphicsSystem(), // 保留图形系统
    new TextSystem(), // 保留文本系统
  ],
});

// 确保canvas在DOM元素下方，但可以接收事件
const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
if (canvas) {
  canvas.style.zIndex = '1'; // 确保canvas在HTML元素下方
  canvas.style.position = 'relative';
  canvas.style.pointerEvents = 'auto'; // 确保canvas接收鼠标事件
}

// 添加游戏对象到场景中（主要用于处理动画和事件，而不是渲染DOM元素）
// 保留Eva.js场景用于复杂动画效果，而将普通的UI元素使用HTML DOM呈现
// createBackground();
// createProgress();
// createBtns();
createWater();
// createCount();
// createTree();

// 初始化px转rem转换器，实现移动端适配
PxToRemConverter.getInstance();

// 将游戏实例暴露到全局，以便调试
window.game = game;