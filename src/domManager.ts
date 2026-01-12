/**
 * HTML DOM元素管理器
 * 用于创建和管理HTML元素，同时保留Eva.js的动画功能
 */

export interface HTMLElementOptions {
  id?: string;
  className?: string;
  style?: Partial<CSSStyleDeclaration>;
  attributes?: Record<string, string>;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
}

export class DOMManager {
  private static instance: DOMManager;
  private container: HTMLElement;
  private elements: Map<string, HTMLElement> = new Map();

  private constructor() {
    // 使用页面中的UI层作为DOM元素的容器
    this.container = document.getElementById('ui-layer') || document.body;
    
    // 为交互元素设置pointer-events
    this.setupPointerEvents();
  }
  
  /**
   * 设置容器中所有元素的pointer-events属性
   */
  private setupPointerEvents(): void {
    if (this.container) {
      // 遍历容器中的所有子元素
      const elements = this.container.querySelectorAll('*');
      elements.forEach(element => {
        this.setElementPointerEvents(element as HTMLElement);
      });
    }
  }
  
  /**
   * 为单个元素设置pointer-events属性
   * @param element 要设置的DOM元素
   */
  private setElementPointerEvents(element: HTMLElement): void {
    // 检查元素是否有data-interactive属性
    if (element.hasAttribute('data-interactive')) {
      element.style.pointerEvents = 'auto';
    } else {
      element.style.pointerEvents = 'none';
    }
  }

  public static getInstance(): DOMManager {
    if (!DOMManager.instance) {
      DOMManager.instance = new DOMManager();
    }
    return DOMManager.instance;
  }

  private ensureElementExists(id: string): HTMLElement {
    let element = document.getElementById(id);
    if (!element) {
      // 如果静态元素不存在，创建一个临时元素作为备用
      element = document.createElement('div');
      element.id = id;
      this.container.appendChild(element);
    }
    return element;
  }

  public createImageElement(
    id: string,
    src: string,
    options: HTMLElementOptions = {}
  ): HTMLElement {
    // 获取已存在的静态元素或创建新元素作为备用
    let imgElement = document.getElementById(id) as HTMLImageElement;
    if (!imgElement) {
      imgElement = document.createElement('img');
      imgElement.id = id;
      imgElement.src = src;
      this.container.appendChild(imgElement);
    }
    
    // 应用位置和尺寸（仅在动态创建的元素上设置）
    if (options.position) {
      imgElement.style.left = `${options.position.x}px`;
      imgElement.style.top = `${options.position.y}px`;
    }
    
    if (options.size) {
      imgElement.style.width = `${options.size.width}px`;
      imgElement.style.height = `${options.size.height}px`;
    }
    
    // 应用额外样式（仅用于动态元素）
    if (options.style) {
      Object.assign(imgElement.style, options.style);
    }
    
    // 应用其他属性
    if (options.attributes) {
      Object.entries(options.attributes).forEach(([key, value]) => {
        imgElement.setAttribute(key, value);
      });
    }
    
    // 对于静态背景图片，允许事件穿透，对于按钮等交互元素，保持事件
    if (options.attributes && options.attributes['data-interactive']) {
      // 对于交互元素，设置在UI层中显示
      imgElement.style.pointerEvents = 'auto'; // 让交互元素可以接收鼠标事件
    } else {
      imgElement.style.pointerEvents = 'none'; // 让背景图片不拦截鼠标事件
    }
    
    // 存储引用
    this.elements.set(id, imgElement);
    
    return imgElement;
  }

  public createDivElement(
    id: string,
    options: HTMLElementOptions = {}
  ): HTMLElement {
    // 获取已存在的静态元素或创建新元素作为备用
    let divElement = document.getElementById(id) as HTMLDivElement;
    if (!divElement) {
      divElement = document.createElement('div');
      divElement.id = id;
      // 对于动态创建的元素，设置基本样式以支持动画
      divElement.style.position = 'absolute';
      this.container.appendChild(divElement);
    }
    
    // 应用位置和尺寸（仅在动态创建的元素上设置或覆盖静态样式）
    if (options.position) {
      divElement.style.left = `${options.position.x}px`;
      divElement.style.top = `${options.position.y}px`;
    }
    
    if (options.size) {
      divElement.style.width = `${options.size.width}px`;
      divElement.style.height = `${options.size.height}px`;
    }
    
    // 应用额外样式（用于动画和特殊效果）
    if (options.style) {
      Object.assign(divElement.style, options.style);
    }
    
    // 应用其他属性
    if (options.attributes) {
      Object.entries(options.attributes).forEach(([key, value]) => {
        divElement.setAttribute(key, value);
      });
    }
    
    // 对于静态div元素，允许事件穿透，对于按钮等交互元素，保持事件
    if (!options.attributes || !options.attributes['data-interactive']) {
      divElement.style.pointerEvents = 'none'; // 让静态div不拦截鼠标事件
    }
    
    // 存储引用
    this.elements.set(id, divElement);
    
    return divElement;
  }

  public createElement(
    id: string,
    tagName: string,
    options: HTMLElementOptions = {}
  ): HTMLElement {
    // 获取已存在的静态元素或创建新元素作为备用
    let element = document.getElementById(id);
    if (!element) {
      element = document.createElement(tagName);
      element.id = id;
      // 对于动态创建的元素，设置基本样式以支持动画
      element.style.position = 'absolute';
      this.container.appendChild(element);
    }
    
    // 应用位置和尺寸（仅在动态创建的元素上设置或覆盖静态样式）
    if (options.position) {
      element.style.left = `${options.position.x}px`;
      element.style.top = `${options.position.y}px`;
    }
    
    if (options.size) {
      element.style.width = `${options.size.width}px`;
      element.style.height = `${options.size.height}px`;
    }
    
    // 应用额外样式（用于动画和特殊效果）
    if (options.style) {
      Object.assign(element.style, options.style);
    }
    
    // 应用其他属性
    if (options.attributes) {
      Object.entries(options.attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    }
    
    // 对于静态元素，允许事件穿透，对于按钮等交互元素，保持事件
    if (!options.attributes || !options.attributes['data-interactive']) {
      element.style.pointerEvents = 'none'; // 让静态元素不拦截鼠标事件
    }
    
    // 存储引用
    this.elements.set(id, element);
    
    return element;
  }

  public updateElementPosition(id: string, x: number, y: number): void {
    const element = this.elements.get(id);
    if (element) {
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
    }
  }

  public updateElementSize(id: string, width: number, height: number): void {
    const element = this.elements.get(id);
    if (element) {
      element.style.width = `${width}px`;
      element.style.height = `${height}px`;
    }
  }

  public setElementVisibility(id: string, visible: boolean): void {
    const element = this.elements.get(id);
    if (element) {
      element.style.display = visible ? 'block' : 'none';
    }
  }

  public removeElement(id: string): void {
    const element = this.elements.get(id);
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
      this.elements.delete(id);
    }
  }

  public getContainer(): HTMLElement {
    return this.container;
  }

  public getElement(id: string): HTMLElement | null {
    return this.elements.get(id) || null;
  }

  public clear(): void {
    this.elements.forEach((element, id) => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });
    this.elements.clear();
  }
}