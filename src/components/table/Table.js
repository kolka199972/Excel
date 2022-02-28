import { ExcelComponent } from '@core/ExcelComponent'
import { $ } from '@core/dom'
import { isCell, matrix, shouldResize } from './table.functions'
import { resizeHandler } from './table.resize'
import { createTable } from './table.template'
import { TableSelection } from './TableSelection'

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
      ...options
    })
  }

  toHTML() {
    return createTable()
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    this.selectCell(this.$root.find(`[data-id="0:0"]`))

    this.$on('formula:input', text => {
      this.selection.current.text(text)
    })

    this.$on('formula:done', () => this.selection.current.focus())
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const cells = matrix($target, this.selection.current).map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup(cells)
      } else {
        this.selection.select($target)
      }
    }
  }

  onKeydown(event) {
    const keys = ['Tab', 'Enter', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown']
    const {key} = event

    if (keys.includes(key)) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }
}

function nextSelector(key, {row, col}) {
  const MIN_VALUE = 0
  switch (key) {
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
      break
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
      break
  }
  return `[data-id="${row}:${col}"]`
}
