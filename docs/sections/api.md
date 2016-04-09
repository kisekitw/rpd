---
title: API
id: api
level: 1
---

### `Rpd`

The `Rpd` namespace is a single entry point for your _patch network_, independently on the place where every patch is rendered. It provides you with the ability to append new patches to your own network and <!-- scurpolously --> control the overall rendering process.

Every patch lays over its own _canvas_, several canvases may be attached to the same _target element_, this will be covered in details below.

> It's important to notice that the whole API is based on processing event streams, same way as Reactive Programming concepts work. All the created instances are immutable, they only react on user actions, with no modifications to the initial state. It guarantees the safety and reversability for all the operations and also allows you to create streams of data of any complexity, intended to flow between the nodes.

<!-- schematic picture of a network -->

From this point and below, let's consider some example to illustrate the practical usage of the described methods. Say, we want to draw the Solar System in static (not that RPD is unable to do it in dynamic, but it's better to consider simple examples at start, isn't it?). We won't do it step-by-step like tutorials do, rather we'll say which method fits particular situation better. For these needs, for every API method there will be a section marked as _Example_. If you really want, the complete code of this example is accessible [here] <!-- TODO -->.

<!-- schematic picture of an example -->

#### `Rpd.renderNext(renderers, targets, config)`

#### `Rpd.stopRendering()`

#### `Rpd.addPatch([title], [def]) -> Patch`

Adds new patch to the network. Patch is a container for a set of nodes and connections between them. Every patch added this way is _opened_ by default, which means that it is rendered right away, and reacts immediately to every following change. You may set a patch title here and, also optionally, define handlers for the [events happening inside](./events.md#Patch), this way:

#### `Rpd.addClosedPatch(title, [def])`

Adds new patch to the network almost the same way as `addPatch` above, but this patch is closed when you add it, so you need to explicitly call its `open()` method when you want this patch to render.

This method becomes useful when you have some dependent patch you don't want to be displayed until requested. This type of patches I'd recommend to call _Procedure Patch_, which is, unlike the _Root Patch_, treated as secondary.

_Example:_

### `Patch`

Patch contains a set of nodes and could be rendered on its own _canvas_, which is an invisible boundind box where this patch is drawn.

Nodes are connected with links going from outputs of one node to inputs of another. This way data dynamically flows through the patch.

<!-- schematic picture of a patch -->

#### `patch.render(renderers, targets, config)`

#### `patch.addNode(type, title, [def])`

Add a node, which represents any process over some inputs (inlets) and sends result of the process to its outputs (outlets). A node can have no inputs or no outputs at all, or even both, so in the latter case this node is called self-sufficient.

The type of the node is some previously registered type, for example, `core/empty`. Usually it has the form `toolkit/definition`. You may use a prepared one from the [toolkits](TODO) or easily create your own types for the nodes with [`Rpd.nodetype`](TODO).

You may specify a custom title, if you want, or the engine will fall back to the type name.

_Definition:_

#### `patch.removeNode(node)`

Remove the previously added node, just pass the one you need no more.

#### `patch.open()`

Opening the patch triggers it to be put into the rendering flow, so it listens for all the following actions and renders them accordingly. If patch yet has no canvas to be drawn onto, engine adds this canvas to the root element before.

All the patches are opened by default, unless they were added with `Rpd.addClosedPatch` method.

Opening and closing patches helps when you have a complex network and you want to isolate some parts of it by moving them in the background. So, you may add the patches you want to hide with `Rpd.addClosedPatch` and open them later (or not open them at all). Also, you may create a special node which refers to some closed patch, passes data inside and then takes the processed data in return. Then, if you want, you may add a button to this node, which, in its turn, opens this closed patch. This approach is decscribed in details together with the `patch.project(node)` method below.

#### `patch.close()`

Closing the patch means that the canvas of this patch is hidden and moved to the background, so user sees no process happening there. Currently the rendering still goes there, yet staying invinsible, but in the future versions it meant to be cached and reduced to the latest changes before opening instead.

#### `patch.project(node)`

#### `patch.inputs(inlets)`

#### `patch.outputs(outlets)`

#### `patch.moveCanvas(x, y)`

Move the canvas of the patch to the given position, relatively to the root element's top left corner.

#### `patch.resizeCanvas(width, height)`

Resize the canvas of the patch. This means all the visuals belonging to this patch and happened to be outside of given bounds, become hidden.

### `Node`

Node represents the thing we call procedure in programming: it receives data through its inputs (inlets), does something using that data and returns either the same data, modified or not, or completely different data in response using outputs (outlets). But from this point, it goes beyond, since it may visualize the process inside its body or add some complex visual controls for additional inputs. On the other hand, it may stay in a boring state and have no inputs, no outputs and even no content at all. Everything depends only on yours decision.

#### `node.addInlet(type, alias, [def])`

Add

#### `node.addOutlet(type, alias, [def])`

#### `node.removeInlet(inlet)`

#### `node.removeOutlet(outlet)`

#### `node.move(x, y)`

#### `node.turnOn()`

#### `node.turnOff()`

### `Inlet`

#### `inlet.receive(value)`

#### `inlet.stream(stream)`

#### `inlet.toDefault()`

#### `inlet.allows(outlet)`

### `Outlet`

#### `outlet.connect(inlet)`

#### `outlet.disconnect(link)`

#### `outlet.send(value)`

#### `outlet.stream(stream)`

#### `outlet.toDefault()`

### `Link`

#### `link.enable()`

#### `link.disable()`

#### `link.disconnect()`

### modules

#### `history`

##### `Rpd.history.undo()`

##### `Rpd.history.redo()`

#### `io`

#### `navigation`