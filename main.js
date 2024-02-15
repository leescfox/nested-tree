import requestData from './data.js'

const treeRoot = document.getElementsByClassName('tree')[0]
buildTree()

function buildTree() {
    const transformedData = transformData()
    transformedData.forEach((serviceObj) => insertNode(serviceObj, treeRoot))
}

function transformData() {
    const sortedChildren = {}
    requestData.services.forEach((service) => {
        sortedChildren[service.head] = sortedChildren[service.head] || []
        sortedChildren[service.id] = sortedChildren[service.id] || []
        insertService(
            service,
            sortedChildren[service.head],
            sortedChildren[service.id]
        )
    })
    return sortedChildren.null || []
}

function insertService(service, array, childrenArray) {
    const serviceObj = {
        service,
        children: service.node ? childrenArray : null,
    }
    for (let i = 0; i < array.length; i++) {
        if (service.sorthead > array[i].service.sorthead) continue
        array.splice(i, 0, serviceObj)
        return
    }
    array.push(serviceObj)
}

function insertNode(serviceObj, parentTag) {
    const nodeObj = createNode(serviceObj.service)
    parentTag.appendChild(nodeObj.node)
    if (!nodeObj.childrenContainer) return
    serviceObj.children.forEach((service) =>
        insertNode(service, nodeObj.childrenContainer)
    )
}

function createNode(service) {
    const node = document.createElement('div')
    node.classList.add('service')
    const returnObj = { node, childrenContainer: null }
    const nodeText = `${service.name} (${service.price})`
    if (!service.node) {
        node.innerHTML = /*html*/ `
            <p class="service-name">
                ${nodeText}
            </p>
        `
    } else {
        node.innerHTML = /*html*/ `
            <p class="service-name">
                <a class="toggle-btn"></a>
                <span>${nodeText}</span>
            </p>
            <div class="children"></div>
        `
        const toggleBtn = node.getElementsByClassName('toggle-btn')[0]
        toggleBtn.addEventListener('click', () => {
            node.classList.toggle('hide-options')
        })
        const childrenContainer = node.getElementsByClassName('children')[0]
        returnObj.childrenContainer = childrenContainer
    }
    return returnObj
}
