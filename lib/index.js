import postcssJs from 'postcss-js'
import autoprefixer from 'autoprefixer'

const prefixer = postcssJs.sync([ autoprefixer ])

const isStyle = node => node.name.name === 'style'

export default function({ types: t }) {
  return {
    visitor: {
      JSXAttribute: function(path) {
        if(isStyle(path.node)) {
          const { properties } = path.node.value.expression

          let styles = []
          for(let property of properties) {
            let { key, value } = property

            const prefixed = prefixer({ [key.name]: value.value })

            for(let name in prefixed) {
              let value = prefixed[name]

              styles.push(t.ObjectProperty(t.identifier(name), t.stringLiteral(value)))
            }
          }

          path.node.value = t.jSXExpressionContainer(t.objectExpression(styles))
        }
      }
    }
  }
}
