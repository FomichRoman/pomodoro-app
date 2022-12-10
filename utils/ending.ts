export const Ending = (count: number) => {
  let text
  if (count === 1) {
    text = 'помидор'
  } else if (count > 1 && count < 5) {
    text = 'помидора'
  } else {
    text = 'помидоров'
  }
  return text
}
