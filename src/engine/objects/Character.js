const chunk = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
  arr.slice(i * size, i * size + size)
)

export const onCharacterSpawn = ({ content, layer, mapFrame }) => {
  const { map_frame } = content

  mapFrame.push(...chunk(map_frame, 32))

  layer.putTilesAt(mapFrame, 0, 0)
}

export const onCharacterMove = ({ content, layer, mapFrame }) => {
  const { direction, map_part } = content

  console.log(map_part)

  if (direction === 'right') {
    // ADD ROW TO THE RIGHT
    mapFrame.forEach((row, index) => {
      mapFrame[index].push(map_part[index])
    })

    // REMOVE FIRST ROW
    mapFrame.forEach((row, index) => {
      mapFrame[index].shift()
    })
  }

  if (direction === 'left') {
    // ADD ROW TO THE LEFT
    mapFrame.forEach((row, index) => {
      mapFrame[index].unshift(map_part[index])
    })

    // REMOVE LAST ROW
    mapFrame.forEach((row, index) => {
      mapFrame[index].pop()
    })
  }

  if (direction === 'up') {
    // ADD ROW TO THE TOP
    mapFrame.unshift(map_part)

    // REMOVE LAST ROW
    mapFrame.pop()
  }

  if (direction === 'down') {
    // ADD ROW TO THE BOTTOM
    mapFrame.push(map_part)

    // REMOVE FIRST ROW
    mapFrame.shift()
  }

  console.log(mapFrame)

  layer.putTilesAt(mapFrame, 0, 0)
}