import { DOMManager } from '../domManager';
import { homeStore } from '../store/homeStore';

// 注意：这个文件可能用于特定的弹窗/提示功能
// 根据文件名，它应该是一个弹窗组件，而不是按钮组件
export default function createAlert() {
  const domManager = DOMManager.getInstance();
  const screen = homeStore.getScreeSize();
  
  // 创建弹窗容器
  const alertContainerId = 'alertContainer';
  const alertContainer = domManager.createDivElement(alertContainerId, {
    position: { x: 0, y: 0 },
    size: { width: screen.baseW, height: screen.baseH },
    style: {
      position: 'absolute',
      overflow: 'hidden',
      display: 'none', // 默认隐藏
      zIndex: '100', // 确保弹窗在最上层
      backgroundColor: 'rgba(0, 0, 0, 0.5)' // 半透明背景
    }
  });

  return alertContainer;
}
