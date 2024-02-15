// {
//     function insertService(element, array) {
//         const elementNode = {
//             element,
//             children: element.node ? [] : null,
//         }
//         for (let i = 0; i < array.length; i++) {
//             if (element.sorthead > array[i].element.sorthead) continue
//             array.splice(i, 0, elementNode)
//             return
//         }
//         array.push(elementNode)
//     }

//     const transformedData = []
//     const sortedChildren = {}
//     requestData.services.forEach((service) => {
//         if (service.head === null) {
//             insertService(service, transformedData)
//             return
//         }
//         if (!sortedChildren[service.head]) {
//             sortedChildren[service.head] = []
//         }
//         insertService(service, sortedChildren[service.head])
//     })
//     console.log(sortedChildren)
// }

const requestData = {
    services: [
        {
            id: 1,
            head: null,
            name: 'Проф.осмотр',
            node: 0,
            price: 100.0,
            sorthead: 20,
        },
        {
            id: 2,
            head: null,
            name: 'Хирургия',
            node: 1,
            price: 0.0,
            sorthead: 10,
        },
        {
            id: 3,
            head: 2,
            name: 'Удаление зубов',
            node: 1,
            price: 0.0,
            sorthead: 10,
        },
        {
            id: 4,
            head: 3,
            name: 'Удаление зуба',
            node: 0,
            price: 800.0,
            sorthead: 10,
        },
        {
            id: 5,
            head: 3,
            name: 'Удаление 8ого зуба',
            node: 0,
            price: 1000.0,
            sorthead: 30,
        },
        {
            id: 6,
            head: 3,
            name: 'Удаление осколка зуба',
            node: 0,
            price: 2000.0,
            sorthead: 20,
        },
        {
            id: 7,
            head: 2,
            name: 'Хирургические вмешательство',
            node: 0,
            price: 200.0,
            sorthead: 10,
        },
        {
            id: 8,
            head: 2,
            name: 'Имплантация зубов',
            node: 1,
            price: 0.0,
            sorthead: 20,
        },
        {
            id: 9,
            head: 8,
            name: 'Коронка',
            node: 0,
            price: 3000.0,
            sorthead: 10,
        },
        {
            id: 10,
            head: 8,
            name: 'Слепок челюсти',
            node: 0,
            price: 500.0,
            sorthead: 20,
        },
    ],
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

function createChildrenContainer() {
    const childrenContainer = document.createElement('div')
    childrenContainer.classList.add('children')
    return childrenContainer
}

const treeRoot = document.getElementsByClassName('tree')[0]
const transformedData = transformData()
transformedData.forEach((serviceObj) => insertNode(serviceObj, treeRoot))

console.log(transformedData)
