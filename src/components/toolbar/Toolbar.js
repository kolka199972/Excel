import { ExcelStateComponent } from '@core/ExcelStateComponent'
import { createToolbar } from './toolbar.template'
import { $ } from '@core/dom'
import { defaultStyles } from '@/constants'

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    })
  }

  toHTML() {
    return this.template
  }

  get template() {
    return createToolbar(this.state)
  }

  prepare() {
    this.initState(defaultStyles)
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles)
    console.log('Koly', changes)
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)
      this.$emit('toolbar:applyStyles', value)
      // const key = Object.keys(value)[0]
      // this.setState({[key]: value[key]})
    }
  }
}
