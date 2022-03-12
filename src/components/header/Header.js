import { ExcelComponent } from '@core/ExcelComponent'
import { $ } from '@core/dom'
import { changeTitle } from '@/redux/actions'
import { defaultStyles } from '@/constants'
import { debounce } from '@core/utils'
import { ActiveRoute } from '@core/routes/ActiveRoute'

export class Header extends ExcelComponent {
  static className = 'excel__header'
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    })
  }

  toHTML() {
    const title = this.store.getState().title
    return `
    <input type="text" class="input" value="${title || defaultStyles}" />

      <div>

        <div class="button" data-button="remove">
          <span class="material-icons" data-button="remove">delete</span>
        </div>

        <div class="button" data-button="exit">
          <span class="material-icons" data-button="exit">logout</span>
        </div>
      </div>
    `
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.button === 'remove') {
      const decision = confirm('Вы действительно хотите удалить таблицу?')
      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }
}
