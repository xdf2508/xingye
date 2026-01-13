import { Game, GameObject } from '@eva/eva.js';
import { Text } from '@eva/plugin-renderer-text';
import { Graphics } from '@eva/plugin-renderer-graphics';
import { Transition } from '@eva/plugin-transition';
import { homeStore } from '../store/homeStore';
import { Render } from '@eva/plugin-renderer-render';

export default class Toast {
  /** 全局 Game 实例 */
  private static game: Game | null = null;
  /** 当前正在显示的 Toast 实例（用于防重叠，可选） */
  private static currentToast: GameObject | null = null;

  // 默认配置（基于750设计稿）
  private static readonly DESIGN_WIDTH = homeStore.getScreeSize().baseW;
  private static readonly DESIGN_HEIGHT = homeStore.getScreeSize().baseH;
  // ✅ 新增：Toast 样式常量抽离，方便统一修改
  private static readonly PADDING_X = 15; // 左右内边距，文字和背景的间距，推荐20
  private static readonly PADDING_Y = 5;  // 上下内边距，可选
  private static readonly BG_HEIGHT = 30; // toast背景固定高度
  private static readonly FONT_SIZE = 16; // 文字大小

  /**
   * 初始化 Toast 工具（只需在 index.ts 调用一次）
   * @param game Eva.js 的 Game 实例
   */
  public static init(game: Game) {
    this.game = game;
  }

  /**
   * 显示 Toast
   * @param msg 文字内容
   * @param duration 停留时间（毫秒），默认 2000ms
   */
  public static show(msg: string, duration: number = 2000) {
    if (!this.game) {
      console.error('Toast error: 请先在入口文件调用 Toast.init(game)');
      return;
    }

    // 策略：如果有上一个 Toast 还没消失，直接销毁它，显示新的（防止堆叠）
    if (this.currentToast && !this.currentToast.destroyed) {
      this.currentToast.destroy();
    }

    // 1. 创建容器 GameObject (⚠️ 这里宽高先设0，后续自适应修改)
    const toast = new GameObject('toast', {
      position: {
        x: this.DESIGN_WIDTH / 2, // ✅ 修改：先居中x坐标，后续配合锚点完美居中
        y: this.DESIGN_HEIGHT / 2, // 屏幕中心
      },
      size: { width: 0, height: this.BG_HEIGHT }, // 宽0自适应，高固定
      origin: { x: 0.5, y: 0.5 }, // ✅ 核心：锚点设为中心，宽度变化后自动居中，不用手动算偏移
      anchor: { x: 0.5, y: 0.5 },
    });

    // 记录当前实例
    this.currentToast = toast;

    // 2. 创建文字组件（✅ 必须先创建文字，后续拿宽度）
    const textContainer = new GameObject("text", {
      position: { x: 0, y: 0 },
      origin: { x: 0.5, y: 0.5 },
      anchor: { x: 0.5, y: 0.5 }
    });
    const text = new Text({
      text: msg,
      style: {
        fontSize: this.FONT_SIZE,
        fill: '#ffffff',
        align: 'center',
        breakWords: true, // ✅ 关键2：垂直居中，同时保证wordWrap生效
        wordWrap: true, // 强制换行
        // ✅ 关键3：wordWrapWidth = 背景最大宽度 - 左右padding，精准限制换行宽度
        wordWrapWidth: this.DESIGN_WIDTH - 80,
      },
    });
    textContainer.addComponent(text);
    toast.addChild(textContainer);

    // 3. 绘制自适应宽度的背景 (✅ 核心自适应逻辑)
    const graphics = toast.addComponent(new Graphics());
    // 关键：Eva的Text组件渲染后才能拿到真实宽度，这里用nextTick等渲染完成
    setTimeout(() => {
      // ✅ 获取文本真实渲染宽度
      const textRealWidth = textContainer.transform.size.width;
      // ✅ 计算背景最终宽度 = 文字宽度 + 左右padding，完美包裹文字
      const bgWidth = textRealWidth + this.PADDING_X * 2;
      const bgHeight = this.BG_HEIGHT + this.PADDING_Y * 2;

      // ✅ 清空画布，重新绘制【自适应宽度】的黑色半透圆角背景
      graphics.graphics.clear();
      graphics.graphics.beginFill(0x000000, 0.7);
      // 绘制起点x=-bgWidth/2，让背景在容器中居中
      graphics.graphics.drawRoundedRect(0, 0, bgWidth, bgHeight, 10);
      graphics.graphics.endFill();

      // ✅ 更新Toast容器的实际宽高
      toast.transform.size.width = bgWidth;
      toast.transform.size.height = bgHeight;
    }, 0);

    // 4. 透明渲染组件
    const render = toast.addComponent(
      new Render({ alpha: 0 }),
    );

    // 5. 动画逻辑（保留你的原有逻辑，无修改）
    const transition = toast.addComponent(new Transition({
      group: {
        'alpha': [
          {
            name: 'alpha',
            component: render,
            values: [
              { time: 0, value: 0, tween: 'ease-in' },
              { time: 100, value: 1, tween: 'ease-in' },
            ],
          },
        ],
        'fadeOut': [{
          name: 'alpha',
          component: render,
          values: [
            { time: duration, value: 1, tween: 'ease-out' },
            { time: duration + 500, value: 0, tween: 'ease-out' },
          ]
        }]
      }
    }));

    // 6. 添加到场景
    this.game.scene.addChild(toast);

    // 7. 播放动画
    transition.play('alpha', 1);

    // ✅ 补充：自动消失逻辑（修复你原代码没有销毁的问题）
    setTimeout(() => {
      if (!toast.destroyed) {
        // 消失时加个渐隐动画更丝滑
        transition.play('fadeOut', 1);
        setTimeout(() => {
          toast.destroy();
          this.currentToast = null;
        }, 200);
      }
    }, duration + 500);
  }
}