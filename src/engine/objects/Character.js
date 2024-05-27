const chunk = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
  arr.slice(i * size, i * size + size)
)

export const onCharacterSpawn = ({ content, layers, mapFrame }) => {
  for (let i = 0; i < content.layers.length; i++) {
    mapFrame[i].push(...chunk(content.layers[i], 32))

    // Server side
    mapFrame[i].forEach((row, rowIndex) => {
      row.forEach((tile, tileIndex) => {
        if (tile == 0) mapFrame[i][rowIndex][tileIndex] = -1
      })
    })

    layers[i].putTilesAt(mapFrame[i], 0, 0)
  }
}

export const onCharacterMove = ({ content, layers, mapFrame }) => {
  for (let i = 0; i < content.layers.length; i++) {
    if (content.direction === 'right') {
      // ADD ROW TO THE RIGHT
      mapFrame[i].forEach((row, index) => {
        mapFrame[i][index].push(content.layers[i][index])
      })

      // REMOVE FIRST ROW
      mapFrame[i].forEach((row, index) => {
        mapFrame[i][index].shift()
      })
    }

    if (content.direction === 'left') {
      // ADD ROW TO THE LEFT
      mapFrame[i].forEach((row, index) => {
        mapFrame[i][index].unshift(content.layers[i][index])
      })

      // REMOVE LAST ROW
      mapFrame[i].forEach((row, index) => {
        mapFrame[i][index].pop()
      })
    }

    if (content.direction === 'up') {
      // ADD ROW TO THE TOP
      mapFrame[i].unshift(content.layers[i])

      // REMOVE LAST ROW
      mapFrame[i].pop()
    }

    if (content.direction === 'down') {
      // ADD ROW TO THE BOTTOM
      mapFrame[i].push(content.layers[i])

      // REMOVE FIRST ROW
      mapFrame[i].shift()
    }

    mapFrame[i].forEach((row, rowIndex) => {
      row.forEach((tile, tileIndex) => {
        if (tile == 0) mapFrame[i][rowIndex][tileIndex] = -1
      })
    })

    layers[i].putTilesAt(mapFrame[i], 0, 0)
  }
}