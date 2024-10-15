import { fabric } from 'fabric'

// 定义 drawCurve 函数的参数类型
interface DrawCurveOptions {
  curve: number
  diameter: number
  fontSize: number
  charSpacing: number
  fill: string
  fontFamily: string
  fontWeight: string
  fontStyle: string
  text: string
}

// function getActualWidthOfChars(text, options = {}) {
//   const { fontSize = 14, fontFamily = 'Microsoft YaHei' } = options
//   const canvas = document.createElement('canvas')
//   const ctx = canvas.getContext('2d')
//   ctx.font = `${fontSize}px ${fontFamily}`
//   const metrics = ctx.measureText(text)
//   const actual =
//     Math.abs(metrics.actualBoundingBoxLeft) +
//     Math.abs(metrics.actualBoundingBoxRight)
//   return parseInt(Math.max(metrics.width, actual))
// }

// 扩展 fabric 曲线文字
function drawCurve(
  options: DrawCurveOptions,
  ctx: CanvasRenderingContext2D,
  that: fabric.Object
) {
  const {
    curve,
    diameter,
    fontSize,
    charSpacing,
    fill,
    fontFamily,
    fontWeight,
    fontStyle,
    text
  } = options

  const radius = diameter // 圆的半径
  /* const angleDecrement = curve / Math.max(text.length - 1, 1) */ // 每个字母占的弧度
  const angleDecrement = charSpacing
  let angle = curve

  ctx.save()
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // const textWidth = getActualWidthOfChars(text, options)

  const selectCanvasWidth =
    /* textWidth +  */ diameter * 2 + fontSize + charSpacing
  that.set('width', parseInt(selectCanvasWidth.toString()))
  that.set('height', parseInt(selectCanvasWidth.toString()))
  // that.setCoords()
  that.canvas?.requestRenderAll()

  for (let index = 0; index < text.length; index++) {
    const character = text.charAt(index)
    ctx.save()
    ctx.translate(
      Math.cos((Math.PI / 180) * angle) * radius,
      -Math.sin((Math.PI / 180) * angle) * radius
    )
    ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`
    ctx.rotate(Math.PI / 2 - (Math.PI / 180) * angle)
    ctx.fillStyle = fill
    ctx.fillText(character, 0, 0)
    angle -= angleDecrement
    ctx.restore()
  }
  ctx.restore()
}

// 定义 CurveText 类
interface CurveTextOptions extends fabric.ITextOptions {
  curve?: number
  diameter?: number
}

;(fabric as any).CurveText = fabric.util.createClass(fabric.IText, {
  type: 'curveText',
  initialize(text: string = '', options: CurveTextOptions = {}) {
    if (!text) {
      text = options.text || ''
    }
    this.callSuper('initialize', text, options)
    this.set('curve', options.curve || 0)
    this.set('diameter', options.diameter || 0)
  },

  // 将自定义属性添加到序列化对象中，方便canvas记录
  toObject() {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      curve: this.get('curve'),
      diameter: this.get('diameter')
    })
  },

  _render(ctx: CanvasRenderingContext2D) {
    if (this.curve > 0) {
      drawCurve({ ...this }, ctx, this)
    } else {
      this.set({ padding: 0 })
      this.callSuper('_render', ctx)
    }
    this.setCoords()
  }
}) // 静态方法，用于从对象创建 CurveText 实例
;(fabric as any).CurveText.fromObject = function (
  object: any,
  callback: (obj: fabric.Object) => void
) {
  return fabric.Object._fromObject('CurveText', object, callback, 'aProp')
}

export default fabric
