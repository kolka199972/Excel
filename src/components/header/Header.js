import { ExcelComponent } from '@core/ExcelComponent'

export class Header extends ExcelComponent {
  static className = 'excel__header'
  constructor($root) {
    super($root, {
      name: 'Header',
      listeners: []
    })
  }

  toHTML() {
    return `
    <input type="text" class="input" value="Новая Таблица" />

      <div>

        <div class="button">
          <span class="material-icons">delete</span>
        </div>

        <div class="button">
          <span class="material-icons">logout</span>
        </div>
      </div>
    `
  }
}
