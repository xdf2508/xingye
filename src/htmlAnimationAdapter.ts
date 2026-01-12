/**
 * HTML元素动画适配器
 * 用于将Eva.js的动画功能应用到HTML DOM元素上
 */

import { Transition, TransitionComponent } from '@eva/plugin-transition';
import { Render, RenderComponent } from '@eva/plugin-renderer-render';
import { GameObject } from '@eva/eva.js';
import { DOMManager } from './domManager';

export class HTMLAnimationAdapter {
  private domManager: DOMManager;
  private elementAnimations: Map<string, { transition?: TransitionComponent; render?: RenderComponent; gameObject: GameObject }> = new Map();

  constructor() {
    this.domManager = DOMManager.getInstance();
  }

  /**
   * 创建动画适配器，将Eva.js动画组件应用到HTML元素
   */
  public applyAnimationToElement(
    elementId: string, 
    transitionGroup: any, // TransitionGroup类型
    loop: number = 1
  ): void {
    const element = this.domManager.getElement(elementId);
    if (!element) {
      console.warn(`Element with id ${elementId} not found`);
      return;
    }

    // 创建一个虚拟的GameObject用于处理动画
    const gameObject = new GameObject(`animation-adapter-${elementId}`, {
      position: { x: 0, y: 0 },
      size: { width: 0, height: 0 }
    });

    // 添加过渡组件
    const transition = gameObject.addComponent(new Transition());
    transition.group = transitionGroup;

    // 添加渲染组件用于处理透明度等
    const render = gameObject.addComponent(new Render({ alpha: 1 }));

    // 存储动画组件引用
    this.elementAnimations.set(elementId, {
      transition,
      render,
      gameObject
    });

    // 监听动画变化，同步到HTML元素
    this.syncAnimationToHTMLElement(elementId, gameObject, transition, render);

    // 开始动画
    transition.play('default', loop);
  }

  /**
   * 将动画状态同步到HTML元素
   */
  private syncAnimationToHTMLElement(
    elementId: string,
    gameObject: GameObject,
    transition: TransitionComponent,
    render: RenderComponent
  ): void {
    const element = this.domManager.getElement(elementId);
    if (!element) return;

    // 使用requestAnimationFrame定期同步动画状态
    const syncFrame = () => {
      // 同步位置
      if (gameObject.transform) {
        const { x, y } = gameObject.transform.position;
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
      }

      // 同步透明度
      if (render) {
        element.style.opacity = render.alpha.toString();
      }

      // 同步旋转
      if (gameObject.transform) {
        const rotation = gameObject.transform.rotation;
        element.style.transform = `rotate(${rotation}rad)`;
      }

      // 继续同步
      requestAnimationFrame(syncFrame);
    };

    syncFrame();
  }

  /**
   * 应用透明度动画到HTML元素
   */
  public applyAlphaAnimation(
    elementId: string,
    startAlpha: number,
    endAlpha: number,
    duration: number,
    loop: number = 1
  ): void {
    const element = this.domManager.getElement(elementId);
    if (!element) return;

    // 设置初始透明度
    element.style.opacity = startAlpha.toString();

    // 创建动画组
    const transitionGroup = {
      alpha: [
        {
          name: 'alpha',
          values: [
            { time: 0, value: startAlpha, tween: 'linear' },
            { time: duration, value: endAlpha, tween: 'linear' }
          ]
        }
      ]
    };

    this.applyAnimationToElement(elementId, transitionGroup, loop);
  }

  /**
   * 应用位置动画到HTML元素
   */
  public applyPositionAnimation(
    elementId: string,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    duration: number,
    loop: number = 1
  ): void {
    const element = this.domManager.getElement(elementId);
    if (!element) return;

    // 设置初始位置
    element.style.left = `${startX}px`;
    element.style.top = `${startY}px`;

    // 创建动画组
    const transitionGroup = {
      position: [
        {
          name: 'position.x',
          values: [
            { time: 0, value: startX, tween: 'linear' },
            { time: duration, value: endX, tween: 'linear' }
          ]
        },
        {
          name: 'position.y',
          values: [
            { time: 0, value: startY, tween: 'linear' },
            { time: duration, value: endY, tween: 'linear' }
          ]
        }
      ]
    };

    this.applyAnimationToElement(elementId, transitionGroup, loop);
  }

  /**
   * 移除元素的动画
   */
  public removeAnimation(elementId: string): void {
    const animationData = this.elementAnimations.get(elementId);
    if (animationData) {
      if (animationData.transition) {
        animationData.transition.destroy();
      }
      if (animationData.render) {
        animationData.render.destroy();
      }
      if (animationData.gameObject) {
        animationData.gameObject.destroy();
      }
      this.elementAnimations.delete(elementId);
    }
  }

  /**
   * 获取元素当前的动画组件
   */
  public getAnimation(elementId: string) {
    return this.elementAnimations.get(elementId);
  }
}