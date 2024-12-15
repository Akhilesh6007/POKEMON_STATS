let input = document.getElementById('input')
let btn = document.getElementById('btn')
let img = document.getElementById('img')
let ability = document.getElementById('ability')
let stat = document.getElementById('stat')

btn.addEventListener('click', onClick)
// img.addEventListener('click', () => {
//     console.log('img')
//     img.classList.remove('shrink')
//     img.classList.add('scale')
//     ability.classList.remove('scale')
//     ability.classList.add('shrink')
//     stat.classList.remove('scale')
//     stat.classList.add('shrink')
// })
// ability.addEventListener('click', () => {
//     console.log('ability')
//     img.classList.remove('scale')
//     img.classList.add('shrink')
//     img.classList.add('')
//     ability.classList.remove('shrink')
//     ability.classList.add('scale')
//     stat.classList.remove('scale')
//     stat.classList.add('shrink')
// })
// stat.addEventListener('click', () => {
//     console.log('stat')
//     stat.classList.remove('shrink')
//     stat.classList.add('scale')
//     img.classList.remove('scale')
//     img.classList.add('shrink')
//     ability.classList.remove('scale')
//     ability.classList.add('shrink')
// })

async function onClick () {
    let pokemon = input.value

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        const data = await res.json()
        img.innerHTML = `<img src=${data.sprites.other.dream_world.front_default} alt="">`
        console.log(data)
        ability.innerHTML = `
        <h1>${data.abilities[0].ability.name}</h1>
        <p>${await fetchAbility(data.abilities[0].ability.url).then(data => data)}</p>
        `
        let s = '<h1>Stats</h1>'
        for (let i = 0; i < 6; i++) {
            s += '<div><span><strong>' + data.stats[i].stat.name + ' :</strong></span><span>' + data.stats[i].base_stat + '</span></div>'
        }
        stat.innerHTML = s

    } catch (error) {
        console.log(error)
    }
}

async function fetchAbility (url) {
    console.log(url)
    try {
        const res = await fetch(url)
        const data = await res.json()
        console.log(data)
        return data.effect_entries[1].effect
    } catch (error) {
        console.log(error)
    }
}