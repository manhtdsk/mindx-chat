export const stopClick = (root) => {
    const listStopClick = root.querySelectorAll('.js-stopClick')
    for (let i = 0; i < listStopClick.length; i++) {
        listStopClick[i].addEventListener('click', (event) => {
            event.stopPropagation()
        })
    }
}