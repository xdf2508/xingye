/**
 * px转rem转换工具类
 * 在浏览器渲染时自动将px单位转换为rem单位，开发者在代码中仍可使用px单位
 */
export class PxToRemConverter {
  private static instance: PxToRemConverter;
  private baseWidth: number = 750; // 设计稿基准宽度
  private baseFontSize: number = 75; // 基准字体大小，1rem = 75px (当设计稿为750px时)
  
  private constructor() {
    this.init();
  }

  public static getInstance(): PxToRemConverter {
    if (!PxToRemConverter.instance) {
      PxToRemConverter.instance = new PxToRemConverter();
    }
    return PxToRemConverter.instance;
  }

  /**
   * 初始化转换器
   */
  private init(): void {
    this.setRootFontSize();
    this.overrideStyleSetter();
    this.overrideComputedStyle();
    this.addResizeListener();
  }

  /**
   * 设置根字体大小
   */
  private setRootFontSize(): void {
    const maxWidth = 1080; // 限制最大宽度
    const deviceWidth = Math.min(document.documentElement.clientWidth || document.body.clientWidth, maxWidth);
    const rootFontSize = deviceWidth / 10; // 1rem = 屏幕宽度/10
    document.documentElement.style.fontSize = rootFontSize + 'px';
  }

  /**
   * 重写CSSStyleDeclaration的setter，自动转换px为rem
   */
  private overrideStyleSetter(): void {
    const styleProto = CSSStyleDeclaration.prototype;
    
    // 保存原始的setter
    const originalSetProperty = styleProto.setProperty;
    
    // 重写setProperty方法
    styleProto.setProperty = function (this: CSSStyleDeclaration, property: string, value: string | null, priority?: string) {
      if (value && typeof value === 'string' && value.includes('px')) {
        value = PxToRemConverter.getInstance().convertPxToRemInString(value);
      }
      return originalSetProperty.call(this, property, value, priority);
    };

    // 对常用的样式属性进行重写
    this.overrideStyleProperty(styleProto, 'width');
    this.overrideStyleProperty(styleProto, 'height');
    this.overrideStyleProperty(styleProto, 'top');
    this.overrideStyleProperty(styleProto, 'left');
    this.overrideStyleProperty(styleProto, 'right');
    this.overrideStyleProperty(styleProto, 'bottom');
    this.overrideStyleProperty(styleProto, 'fontSize');
    this.overrideStyleProperty(styleProto, 'padding');
    this.overrideStyleProperty(styleProto, 'paddingTop');
    this.overrideStyleProperty(styleProto, 'paddingLeft');
    this.overrideStyleProperty(styleProto, 'paddingRight');
    this.overrideStyleProperty(styleProto, 'paddingBottom');
    this.overrideStyleProperty(styleProto, 'margin');
    this.overrideStyleProperty(styleProto, 'marginTop');
    this.overrideStyleProperty(styleProto, 'marginLeft');
    this.overrideStyleProperty(styleProto, 'marginRight');
    this.overrideStyleProperty(styleProto, 'marginBottom');
    this.overrideStyleProperty(styleProto, 'borderWidth');
    this.overrideStyleProperty(styleProto, 'borderTopWidth');
    this.overrideStyleProperty(styleProto, 'borderLeftWidth');
    this.overrideStyleProperty(styleProto, 'borderRightWidth');
    this.overrideStyleProperty(styleProto, 'borderBottomWidth');
    this.overrideStyleProperty(styleProto, 'lineHeight');
    this.overrideStyleProperty(styleProto, 'letterSpacing');
  }

  /**
   * 重写特定样式属性的getter和setter
   */
  private overrideStyleProperty(proto: CSSStyleDeclaration, property: string): void {
    const originalDescriptor = Object.getOwnPropertyDescriptor(proto, property);
    if (!originalDescriptor) return;

    const originalSetter = originalDescriptor.set;
    const originalGetter = originalDescriptor.get;

    if (originalSetter) {
      Object.defineProperty(proto, property, {
        get: originalGetter,
        set: function (this: CSSStyleDeclaration, value: string) {
          if (typeof value === 'string' && value.includes('px')) {
            value = PxToRemConverter.getInstance().convertPxToRemInString(value);
          }
          originalSetter.call(this, value);
        },
        configurable: true,
        enumerable: true
      });
    }
  }

  /**
   * 重写getComputedStyle方法，返回转换后的样式值
   */
  private overrideComputedStyle(): void {
    const originalGetComputedStyle = window.getComputedStyle;
    
    window.getComputedStyle = function (this: Window, element: Element, pseudoElt?: string | null) {
      const computedStyle = originalGetComputedStyle.call(this, element, pseudoElt);
      
      // 创建代理返回转换后的样式对象
      return new Proxy(computedStyle, {
        get: (target: CSSStyleDeclaration, property: string) => {
          const value = target[property as keyof CSSStyleDeclaration];
          
          if (typeof value === 'string' && value.includes('px')) {
            return PxToRemConverter.getInstance().convertPxToRemInString(value);
          }
          
          return value;
        }
      });
    };
  }

  /**
   * 为所有已存在的元素添加px到rem的转换
   */
  private convertExistingElements(): void {
    // 监听DOM变化，对新添加的元素也进行转换
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as HTMLElement;
              // 转换元素的样式
              this.convertElementStyle(element);
              
              // 转换所有子元素
              const allElements = element.querySelectorAll('*');
              allElements.forEach((el) => this.convertElementStyle(el as HTMLElement));
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /**
   * 转换单个元素的样式
   */
  private convertElementStyle(element: HTMLElement): void {
    const style = element.style;
    
    // 遍历所有样式属性并转换px为rem
    for (let i = 0; i < style.length; i++) {
      const property = style[i];
      const value = style.getPropertyValue(property);
      
      if (value.includes('px')) {
        const newValue = this.convertPxToRemInString(value);
        style.setProperty(property, newValue, style.getPropertyPriority(property));
      }
    }
  }

  /**
   * 将字符串中的px值转换为rem值
   * @param value 包含px单位的字符串
   * @returns 转换为rem单位的字符串
   */
  public convertPxToRemInString(value: string): string {
    // 使用正则表达式匹配数字+px的模式
    return value.replace(/(\d*\.?\d+)px/g, (match, pxValue) => {
      const pxNum = parseFloat(pxValue);
      if (isNaN(pxNum)) return match;
      
      // 根据基准字体大小计算rem值
      const remValue = pxNum / this.baseFontSize;
      return `${remValue}rem`;
    });
  }

  /**
   * 将px值转换为rem值
   * @param pxValue 像素值
   * @returns rem值
   */
  public convertPxToRem(pxValue: number): number {
    return pxValue / this.baseFontSize;
  }

  /**
   * 添加窗口大小变化监听器
   */
  private addResizeListener(): void {
    window.addEventListener('resize', () => {
      this.setRootFontSize();
    });
    
    window.addEventListener('orientationchange', () => {
      this.setRootFontSize();
    });
  }
}