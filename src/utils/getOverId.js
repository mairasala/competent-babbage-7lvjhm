export const getNewPosition = (over, items)=> {
  const dndOverId = over.id
  const dndOverIndex = over.data.current?.sortable.index

  const dndOverCheckedIndex = items.indexOf(dndOverId)

  const rectId = document.elementFromPoint(over.rect.offsetLeft,over.rect.offsetTop).id
  const rectIndex = items.indexOf(rectId)

  console.log(`dndkit: over ${dndOverId} [${dndOverIndex}] verified at [${dndOverCheckedIndex}]. rect: over: ${items[rectIndex]} at [${rectIndex}] `)
  //console.log(`list: ${items.join(', ')}`)

  if(rectIndex === -1){
    if(dndOverIndex !== -1){
      return dndOverIndex
    }
  } else {
    return rectIndex
  }

}
