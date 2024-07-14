const chunk = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
  arr.slice(i * size, i * size + size)
)

export const onCharacterSpawn = ({ content, game }) => {
  const cache = game.mapCache.cache

  const { layers, others } = content

  /*others.forEach((other) => {
    game.otherPlayers[other.characterId] = game.physics.add.sprite(other.coords.x * 32, other.coords.y * 32, 'atlas', 'misa-front').setSize(32, 32).setOffset(0, 24)
  })*/

  for (let i = 0; i < layers.length; i++) {
    cache[i].push(...chunk(layers[i], 32))

    // Server side
    cache[i].forEach((row, rowIndex) => {
      row.forEach((tile, tileIndex) => {
        if (tile == 0) cache[i][rowIndex][tileIndex] = -1
      })
    })

    game.layers[i].putTilesAt(cache[i], 0, 0)
  }
}

export const onCharacterMove = ({ content, game }) => {
  const cache = game.mapCache.cache
  const { layers, direction } = content

  for (let i = 0; i < layers.length; i++) {
    if (direction === 'right') {
      // ADD ROW TO THE RIGHT
      cache[i].forEach((row, index) => {
        cache[i][index].push(layers[i][index])
      })

      // REMOVE FIRST ROW
      cache[i].forEach((row, index) => {
        cache[i][index].shift()
      })
    }

    if (direction === 'left') {
      // ADD ROW TO THE LEFT
      cache[i].forEach((row, index) => {
        cache[i][index].unshift(layers[i][index])
      })

      // REMOVE LAST ROW
      cache[i].forEach((row, index) => {
        cache[i][index].pop()
      })
    }

    if (direction === 'up') {
      // ADD ROW TO THE TOP
      cache[i].unshift(layers[i])

      // REMOVE LAST ROW
      cache[i].pop()
    }

    if (direction === 'down') {
      // ADD ROW TO THE BOTTOM
      cache[i].push(layers[i])

      // REMOVE FIRST ROW
      cache[i].shift()
    }

    cache[i].forEach((row, rowIndex) => {
      row.forEach((tile, tileIndex) => {
        if (tile == 0) cache[i][rowIndex][tileIndex] = -1
      })
    })

    game.layers[i].putTilesAt(cache[i], 0, 0)
  }
}