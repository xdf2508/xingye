// ./base.ts
import { GameObject } from '@eva/eva.js';
import { Event } from '@eva/plugin-renderer-event';
import { Img } from '@eva/plugin-renderer-img';

/**
 * 通用创建图片节点的基础方法
 * @param resource 图片资源名
 * @param width 图片宽度
 * @param height 图片高度
 * @param x 相对父容器的x坐标
 * @param y 相对父容器的y坐标
 * @param parentContainer 可选：挂载的父容器（不传则不挂载）
 * @param callback 可选：点击事件回调（不传则不绑定点击）
 * @returns 返回创建的图片GameObject（可直接修改transform/size等属性）
 */
export default function createImg(
  resource: string,
  width: number,
  height: number,
  x: number,
  y: number,
  parentContainer?: GameObject,
  callback?: () => void // 不传则为undefined，避免空函数导致的逻辑误判
): GameObject {
  // 1. 创建图片核心节点（无冗余全屏容器，轻量）
  const imgNode = new GameObject(`img-${resource}-${Date.now()}`, {
    size: { width, height }, // 初始尺寸
    position: { x, y },      // 相对父容器的坐标（核心：不再强制全屏）
    origin: { x: 0, y: 0 },  // 锚点默认左上角，符合常规绘图习惯
    // anchor: { x: 0.5, y: 0.5 },
  });

  // 2. 添加图片组件
  imgNode.addComponent(new Img({ resource }));

  // 3. 可选：绑定点击事件
  if (callback) {
    const eventComponent = imgNode.addComponent(new Event());
    eventComponent.on('tap', callback); // 移动端tap/PC端click可按需调整
  }

  // 4. 可选：挂载到父容器
  if (parentContainer) {
    parentContainer.addChild(imgNode);
  }

  // 5. 核心：返回图片节点本身（而非冗余容器），方便调用方修改尺寸/位置
  return imgNode;
}