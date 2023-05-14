function reset(target, value) {
  Object.entries(target).forEach(([field, fieldObj]) => {
    if (typeof fieldObj !== 'function') {
      fieldObj.inputValue = value ? value[field] : ''
      fieldObj.errors.length = 0
    }
  })
}

function validate(target) {
  const validState = Object.entries(target).reduce((obj, [field, fieldObj]) => {
    const { inputValue, errors, validation } = fieldObj
    if (typeof fieldObj === 'function') return obj

    const isAllValid = validation.every((condition) => {
      const { regex, msg } = condition

      if (inputValue.match(regex)) {
        const index = errors.indexOf(msg)
        fieldObj.errors.splice(index, 1)
      } else if (!errors.includes(msg)) {
        fieldObj.errors.push(msg)
      }

      return inputValue.match(regex)
    })

    obj[field] = isAllValid
    return obj
  }, {})

  console.log('this', this)

  return validState
}

function checkNewContent(target, comparedTarget) {
  return Object.entries(target).some(([field, fieldObj]) => {
    if (typeof fieldObj !== 'function') {
      return fieldObj.inputValue !== comparedTarget[field]
    }
  })
}

export { reset, validate, checkNewContent }
