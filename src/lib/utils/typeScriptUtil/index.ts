type World = {
  name: string
}

export const helloWorld  = (world: World) => {
  console.log('hello ' + world.name);
}
