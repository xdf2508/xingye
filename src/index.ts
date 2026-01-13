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
import { MaskSystem } from '@eva/plugin-renderer-mask';
import Toast from './utils/toast';

resource.addResource(resources);

const game = new Game({
  systems: [
    new RendererSystem({
      canvas: document.querySelector('#canvas'),
      width: homeStore.getScreeSize().baseW, // 屏幕宽度
      height: homeStore.getScreeSize().baseH, // 屏幕高度
      antialias: true,
    }),
    new ImgSystem(),
    new TransitionSystem(),
    new SpriteAnimationSystem(),
    new RenderSystem(),
    new EventSystem(),
    new GraphicsSystem(),
    new TextSystem(),
    new MaskSystem()
  ],
});

// game.scene.transform.size.width = homeStore.getScreeSize().baseW;
// game.scene.transform.size.height = homeStore.getScreeSize().baseH;

game.scene.addChild(createBackground());
game.scene.addChild(createProgress());
game.scene.addChild(createBtns());
game.scene.addChild(createWater());
game.scene.addChild(createCount());
game.scene.addChild(createTree());
Toast.init(game);
window.game = game;